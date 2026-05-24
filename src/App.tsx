/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Home, Library, Search, Disc, ListMusic, Headphones, Sparkles } from 'lucide-react';
import { Routes, Route, Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { AlbumGrid } from './components/AlbumGrid';
import { AlbumDetail } from './components/AlbumDetail';
import { Player } from './components/Player';
import { Search as SearchView } from './components/Search';
import { LibraryView } from './components/Library';
import { SplashScreen } from './components/SplashScreen';
import { albums, Album, Song } from './data';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Player state
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [currentPlaylist, setCurrentPlaylist] = useState<Song[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMobilePlayerOpen, setIsMobilePlayerOpen] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'none' | 'all' | 'one'>('all');
  const [isSpatial, setIsSpatial] = useState(false);
  const [spatialToast, setSpatialToast] = useState<{ show: boolean; enabled: boolean } | null>(null);
  const spatialTimeoutRef = useRef<any>(null);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const spatialBypassRef = useRef<GainNode | null>(null);
  const spatialEffectRef = useRef<GainNode | null>(null);
  const isAudioSetupRef = useRef(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isShuffleRef = useRef(false);
  const repeatModeRef = useRef<'none' | 'all' | 'one'>('all');
  const currentIndexRef = useRef(0);
  const currentPlaylistRef = useRef<Song[]>([]);
  const currentSongRef = useRef<Song | null>(null);
  const handleEndedTriggerRef = useRef<() => void>(() => {});

  // Synchronize state values to refs for the Audio callbacks
  useEffect(() => { isShuffleRef.current = isShuffle; }, [isShuffle]);
  useEffect(() => { repeatModeRef.current = repeatMode; }, [repeatMode]);
  useEffect(() => { currentIndexRef.current = currentIndex; }, [currentIndex]);
  useEffect(() => { currentPlaylistRef.current = currentPlaylist; }, [currentPlaylist]);
  useEffect(() => { currentSongRef.current = currentSong; }, [currentSong]);

  useEffect(() => {
    return () => {
      if (spatialTimeoutRef.current) clearTimeout(spatialTimeoutRef.current);
    };
  }, []);

  const handleEndedTrigger = () => {
    const loopMode = repeatModeRef.current;
    const shuffleOn = isShuffleRef.current;
    const playlist = currentPlaylistRef.current;
    const idx = currentIndexRef.current;

    if (playlist.length === 0) return;

    if (loopMode === 'one') {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(err => console.error(err));
        setCurrentTime(0);
        setProgress(0);
      }
    } else if (shuffleOn) {
      let nextIndex = idx;
      if (playlist.length > 1) {
        while (nextIndex === idx) {
          nextIndex = Math.floor(Math.random() * playlist.length);
        }
      }
      if (nextIndex === idx) {
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(err => console.error(err));
          setCurrentTime(0);
          setProgress(0);
        }
      } else {
        setCurrentIndex(nextIndex);
        setCurrentSong(playlist[nextIndex]);
        setIsPlaying(true);
      }
    } else {
      let nextIndex = idx;
      if (idx === playlist.length - 1) {
        if (loopMode === 'none') {
          setIsPlaying(false);
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }
          setCurrentTime(0);
          setProgress(0);
          return;
        } else {
          nextIndex = 0;
        }
      } else {
        nextIndex = idx + 1;
      }
      
      if (nextIndex === idx) {
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(err => console.error(err));
          setCurrentTime(0);
          setProgress(0);
        }
      } else {
        setCurrentIndex(nextIndex);
        setCurrentSong(playlist[nextIndex]);
        setIsPlaying(true);
      }
    }
  };

  useEffect(() => {
    handleEndedTriggerRef.current = handleEndedTrigger;
  });

  // Initialize audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
      
      if ('mediaSession' in navigator && !isNaN(audio.duration) && isFinite(audio.duration)) {
        try {
          navigator.mediaSession.setPositionState({
            duration: audio.duration,
            playbackRate: audio.playbackRate || 1,
            position: audio.currentTime
          });
        } catch (e) {
          // ignore
        }
      }
    };

    const updateDuration = () => setDuration(audio.duration);
    
    const handleEnded = () => {
      handleEndedTriggerRef.current();
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, []); // Bind listeners exactly once on mount

  // Handle playing a new song
  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused';
    }
    
    if (currentSong && audioRef.current) {
      const isSrcChanged = audioRef.current.getAttribute('src') !== (currentSong.audioUrl + '?v=2') && audioRef.current.src !== (currentSong.audioUrl + '?v=2');
      
      if (isSrcChanged) {
        audioRef.current.src = currentSong.audioUrl + '?v=2';
        setCurrentTime(0);
        setProgress(0);
      }
      
      if (isPlaying) {
        if (audioRef.current.paused) {
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch(e => {
              if (e.name !== 'AbortError') {
                console.error("Playback failed", e);
              }
            });
          }
        }
      } else {
        if (!audioRef.current.paused) {
          audioRef.current.pause();
        }
      }
    }
  }, [currentSong, isPlaying]);

  useEffect(() => {
    if ('mediaSession' in navigator && currentSong) {
      const artworkType = currentSong.coverUrl.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg';
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentSong.title,
        artist: currentSong.artist,
        album: currentSong.album,
        artwork: [
          { src: currentSong.coverUrl, sizes: '96x96', type: artworkType },
          { src: currentSong.coverUrl, sizes: '128x128', type: artworkType },
          { src: currentSong.coverUrl, sizes: '192x192', type: artworkType },
          { src: currentSong.coverUrl, sizes: '256x256', type: artworkType },
          { src: currentSong.coverUrl, sizes: '384x384', type: artworkType },
          { src: currentSong.coverUrl, sizes: '512x512', type: artworkType },
        ]
      });

      navigator.mediaSession.setActionHandler('play', () => setIsPlaying(true));
      navigator.mediaSession.setActionHandler('pause', () => setIsPlaying(false));
      navigator.mediaSession.setActionHandler('previoustrack', handlePrevious);
      navigator.mediaSession.setActionHandler('nexttrack', handleNext);
      navigator.mediaSession.setActionHandler('seekbackward', null);
      navigator.mediaSession.setActionHandler('seekforward', null);
      navigator.mediaSession.setActionHandler('seekto', (details) => {
        if (details.seekTime !== undefined && details.seekTime !== null && audioRef.current) {
          audioRef.current.currentTime = details.seekTime;
          setCurrentTime(details.seekTime);
        }
      });
      navigator.mediaSession.setActionHandler('stop', () => {
        setIsPlaying(false);
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          setCurrentTime(0);
          setProgress(0);
        }
      });
    }
  }, [currentSong, currentIndex, currentPlaylist]);

  const initWebAudio = () => {
    if (isAudioSetupRef.current || !audioRef.current) return;
    isAudioSetupRef.current = true;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;
      const source = ctx.createMediaElementSource(audioRef.current);
      
      const bypassGain = ctx.createGain();
      bypassGain.gain.value = 1;
      
      const effectGain = ctx.createGain();
      effectGain.gain.value = 0;
      
      // Basic stereo widening
      const splitter = ctx.createChannelSplitter(2);
      const merger = ctx.createChannelMerger(2);
      
      const delayL = ctx.createDelay();
      const delayR = ctx.createDelay();
      delayL.delayTime.value = 0.015;
      delayR.delayTime.value = 0.025;
      
      const gainLtoR = ctx.createGain(); gainLtoR.gain.value = 0.4;
      const gainRtoL = ctx.createGain(); gainRtoL.gain.value = 0.4;
      
      const makeupGain = ctx.createGain();
      makeupGain.gain.value = 1.2;
      
      source.connect(bypassGain);
      bypassGain.connect(ctx.destination);
      
      source.connect(effectGain);
      effectGain.connect(splitter);
      
      splitter.connect(merger, 0, 0); // L -> L
      splitter.connect(delayL, 0);
      delayL.connect(gainLtoR);
      gainLtoR.connect(merger, 0, 1); // Delayed L -> R
      
      splitter.connect(merger, 1, 1); // R -> R
      splitter.connect(delayR, 1);
      delayR.connect(gainRtoL);
      gainRtoL.connect(merger, 0, 0); // Delayed R -> L
      
      merger.connect(makeupGain);
      makeupGain.connect(ctx.destination);
      
      spatialBypassRef.current = bypassGain;
      spatialEffectRef.current = effectGain;
    } catch (e) {
      console.error("Web Audio API setup failed", e);
    }
  };

  const handleToggleSpatial = () => {
    initWebAudio();
    setIsSpatial(prev => {
      const next = !prev;
      if (spatialBypassRef.current && spatialEffectRef.current) {
         spatialBypassRef.current.gain.setTargetAtTime(next ? 0 : 1, audioContextRef.current?.currentTime || 0, 0.1);
         spatialEffectRef.current.gain.setTargetAtTime(next ? 1 : 0, audioContextRef.current?.currentTime || 0, 0.1);
      }
      
      // Set spatial sound toggle toast
      if (spatialTimeoutRef.current) {
        clearTimeout(spatialTimeoutRef.current);
      }
      
      setSpatialToast({ show: true, enabled: next });
      
      spatialTimeoutRef.current = setTimeout(() => {
        setSpatialToast(null);
      }, 2500);

      return next;
    });
    if (audioContextRef.current?.state === 'suspended') {
       audioContextRef.current.resume();
    }
  };

  const handlePlayPause = () => {
    if (!currentSong && currentPlaylist.length > 0) {
      const firstSong = currentPlaylist[0];
      if (audioRef.current) {
        if (audioRef.current.src !== firstSong.audioUrl + '?v=2' && audioRef.current.getAttribute('src') !== firstSong.audioUrl + '?v=2') {
          audioRef.current.src = firstSong.audioUrl + '?v=2';
        }
        audioRef.current.play().catch(console.error);
      }
      setCurrentSong(firstSong);
      setIsPlaying(true);
      return;
    }
    
    if (currentSong && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    if (currentPlaylist.length > 0) {
      if (isShuffle) {
        let nextIndex = currentIndex;
        if (currentPlaylist.length > 1) {
          while (nextIndex === currentIndex) {
            nextIndex = Math.floor(Math.random() * currentPlaylist.length);
          }
        }
        if (nextIndex === currentIndex) {
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(err => console.error(err));
            setCurrentTime(0);
            setProgress(0);
          }
        } else {
          if (audioRef.current) {
            audioRef.current.src = currentPlaylist[nextIndex].audioUrl + '?v=2';
            audioRef.current.play().catch(console.error);
          }
          setCurrentIndex(nextIndex);
          setCurrentSong(currentPlaylist[nextIndex]);
          setIsPlaying(true);
        }
      } else {
        let nextIndex = currentIndex;
        if (currentIndex === currentPlaylist.length - 1) {
          if (repeatMode === 'none') {
            setIsPlaying(false);
            if (audioRef.current) {
              audioRef.current.pause();
              audioRef.current.currentTime = 0;
            }
            setCurrentTime(0);
            setProgress(0);
            return;
          } else {
            nextIndex = 0;
          }
        } else {
          nextIndex = currentIndex + 1;
        }
        
        if (nextIndex === currentIndex) {
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(err => console.error(err));
            setCurrentTime(0);
            setProgress(0);
          }
        } else {
          if (audioRef.current) {
            audioRef.current.src = currentPlaylist[nextIndex].audioUrl + '?v=2';
            audioRef.current.play().catch(console.error);
          }
          setCurrentIndex(nextIndex);
          setCurrentSong(currentPlaylist[nextIndex]);
          setIsPlaying(true);
        }
      }
    }
  };

  const handlePrevious = () => {
    if (currentPlaylist.length > 0) {
      if (currentTime > 3 && audioRef.current) {
        // If more than 3 seconds in, just restart song
        audioRef.current.currentTime = 0;
        setCurrentTime(0);
        setProgress(0);
      } else if (isShuffle) {
        let prevIndex = currentIndex;
        if (currentPlaylist.length > 1) {
          while (prevIndex === currentIndex) {
            prevIndex = Math.floor(Math.random() * currentPlaylist.length);
          }
        }
        if (prevIndex === currentIndex) {
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(console.error);
            setCurrentTime(0);
            setProgress(0);
          }
        } else {
          if (audioRef.current) {
            audioRef.current.src = currentPlaylist[prevIndex].audioUrl + '?v=2';
            audioRef.current.play().catch(console.error);
          }
          setCurrentIndex(prevIndex);
          setCurrentSong(currentPlaylist[prevIndex]);
          setIsPlaying(true);
        }
      } else {
        const prevIndex = currentIndex === 0 ? currentPlaylist.length - 1 : currentIndex - 1;
        if (prevIndex === currentIndex) {
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(console.error);
            setCurrentTime(0);
            setProgress(0);
          }
        } else {
          if (audioRef.current) {
            audioRef.current.src = currentPlaylist[prevIndex].audioUrl + '?v=2';
            audioRef.current.play().catch(console.error);
          }
          setCurrentIndex(prevIndex);
          setCurrentSong(currentPlaylist[prevIndex]);
          setIsPlaying(true);
        }
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (audioRef.current && duration) {
      const seekTime = (value / 100) * duration;
      audioRef.current.currentTime = seekTime;
      setProgress(value);
      setCurrentTime(seekTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleAlbumClick = (album: Album) => {
    navigate(`/album/${album.id}`);
  };

  const handlePlayAlbum = (album: Album) => {
    if (album.songs.length > 0) {
      const isAlreadyPlayingThisAlbum = currentPlaylist.length === album.songs.length &&
        currentPlaylist.every((song, idx) => song.id === album.songs[idx].id);

      if (isAlreadyPlayingThisAlbum && currentSong) {
        handlePlayPause();
      } else {
        if (audioRef.current) {
          audioRef.current.src = album.songs[0].audioUrl + '?v=2';
          audioRef.current.play().catch(console.error);
        }
        setCurrentPlaylist(album.songs);
        setCurrentIndex(0);
        setCurrentSong(album.songs[0]);
        setIsPlaying(true);
        openMobilePlayer();
      }
    }
  };

  const handleSongClick = (song: Song, index: number, albumSongs: Song[]) => {
    setCurrentPlaylist(albumSongs);
    setCurrentIndex(index);
    
    if (currentSong?.id === song.id) {
      handlePlayPause();
    } else {
      if (audioRef.current) {
        audioRef.current.src = song.audioUrl + '?v=2';
        audioRef.current.play().catch(console.error);
      }
      setCurrentSong(song);
      setIsPlaying(true);
      if (location.pathname.startsWith('/album/')) {
        navigate(`/album/${encodeURIComponent(song.album)}/song/${encodeURIComponent(song.id)}`, { replace: true });
      }
    }
    openMobilePlayer();
  };

  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (e.state?.mobilePlayer) {
        setIsMobilePlayerOpen(true);
      } else {
        setIsMobilePlayerOpen(false);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const openMobilePlayer = () => {
    if (window.innerWidth < 768 && !isMobilePlayerOpen) {
      window.history.pushState({ mobilePlayer: true }, "");
      setIsMobilePlayerOpen(true);
    }
  };

  const closeMobilePlayer = () => {
    if (isMobilePlayerOpen) {
      if (window.history.state?.lyrics) {
        window.history.go(-2);
      } else if (window.history.state?.mobilePlayer) {
        window.history.back();
      } else {
        setIsMobilePlayerOpen(false);
      }
    }
  };

  useEffect(() => {
    if (currentSong) {
      if (location.pathname.startsWith('/album/')) {
        const currentAlbumEncoded = encodeURIComponent(currentSong.album);
        const currentSongEncoded = encodeURIComponent(currentSong.id);
        const expectedPath = `/album/${currentAlbumEncoded}/song/${currentSongEncoded}`;
        if (location.pathname !== expectedPath) {
          navigate(expectedPath, { replace: true });
        }
      }
    }
  }, [currentSong, currentIndex]);

  useEffect(() => {
    const match = location.pathname.match(/^\/album\/([^/]+)\/song\/([^/]+)$/);
    if (match && !currentSong) {
      const albumId = decodeURIComponent(match[1]);
      const songId = decodeURIComponent(match[2]);
      const album = albums.find(a => a.id === albumId);
      if (album) {
        const songIndex = album.songs.findIndex(s => s.id === songId);
        if (songIndex !== -1) {
          setCurrentPlaylist(album.songs);
          setCurrentIndex(songIndex);
          setCurrentSong(album.songs[songIndex]);
        }
      }
    }
  }, []); // Run on mount to check if direct song link

  return (
    <>
      <SplashScreen />
      <div className="flex flex-col h-[100dvh] bg-black text-white font-sans overflow-hidden">
        <audio ref={audioRef} preload="auto" crossOrigin="anonymous" />
        <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Desktop Only */}
        <div className="hidden md:flex flex-col w-64 bg-black p-6 gap-6">
          <div className="space-y-4">
            <Link to="/" className={`flex items-center gap-4 font-semibold hover:text-white transition ${location.pathname === '/' ? 'text-white' : 'text-neutral-400'}`}>
              <Home className="w-6 h-6" /> Home
            </Link>
            <Link to="/search" className={`flex items-center gap-4 font-semibold hover:text-white transition ${location.pathname === '/search' ? 'text-white' : 'text-neutral-400'}`}>
              <Search className="w-6 h-6" /> Search
            </Link>
            <Link to="/library" className={`flex items-center gap-4 font-semibold hover:text-white transition ${location.pathname === '/library' ? 'text-white' : 'text-neutral-400'}`}>
              <ListMusic className="w-6 h-6" /> Playlist
            </Link>
          </div>
          
          <div className="mt-4 pt-4 border-t border-neutral-800">
            <h2 className="px-1 text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4 flex items-center gap-2 select-none">
              <Disc className="w-4 h-4 text-neutral-400" /> Albums
            </h2>
            {/* Library list placeholder */}
            <div className="space-y-3 overflow-y-auto max-h-64 scrollbar-hide">
              {albums.map(album => (
                <p 
                  key={`lib-${album.id}`}
                  onClick={() => handleAlbumClick(album)} 
                  className={`text-sm hover:text-white cursor-pointer truncate ${location.pathname.startsWith(`/album/${encodeURIComponent(album.id)}`) ? 'text-white font-medium' : 'text-neutral-400'}`}
                >
                  {album.title}
                </p>
              ))}
            </div>
          </div>
        </div>
  
        {/* Main Content */}
        <div 
          id="main-scroll-container"
          className="flex-1 bg-neutral-900 md:bg-neutral-900 md:rounded-lg overflow-y-auto mb-0 md:m-2"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <Routes>
            <Route path="/" element={
              <AlbumGrid 
                albums={albums} 
                onAlbumClick={handleAlbumClick} 
                onPlayAlbumClick={handlePlayAlbum}
                currentSong={currentSong}
                isPlaying={isPlaying}
              />
            } />
            <Route path="/search" element={
              <SearchView 
                albums={albums} 
                onAlbumClick={handleAlbumClick} 
                onPlayAlbumClick={handlePlayAlbum}
                onSongClick={(song, index, playlist) => handleSongClick(song, index, playlist)}
                currentSong={currentSong}
                isPlaying={isPlaying}
              />
            } />
            <Route path="/library" element={
              <LibraryView 
                albums={albums}
                onSongClick={(song, index, playlist) => handleSongClick(song, index, playlist)}
                currentSong={currentSong}
                isPlaying={isPlaying}
              />
            } />
            <Route path="/album/:id" element={
              <AlbumDetailWrapper 
                albums={albums}
                onBack={() => navigate(-1)} 
                onSongClick={(song, index, albumSongs) => handleSongClick(song, index, albumSongs)}
                currentSong={currentSong}
                isPlaying={isPlaying}
              />
            } />
            <Route path="/album/:id/song/:songId" element={
              <AlbumDetailWrapper 
                albums={albums}
                onBack={() => navigate(-1)} 
                onSongClick={(song, index, albumSongs) => handleSongClick(song, index, albumSongs)}
                currentSong={currentSong}
                isPlaying={isPlaying}
              />
            } />
          </Routes>
        </div>
      </div>

      {/* Bottom Control Section */}
      <div className="shrink-0 flex flex-col z-50 bg-black">
        {/* Sticky Player */}
        <Player 
          currentSong={currentSong}
          isPlaying={isPlaying}
          progress={progress}
          currentTime={currentTime}
          duration={duration}
          isShuffle={isShuffle}
          onToggleShuffle={() => setIsShuffle(prev => !prev)}
          repeatMode={repeatMode}
          onToggleRepeat={() => {
            setRepeatMode(prev => {
              if (prev === 'none') return 'all';
              if (prev === 'all') return 'one';
              return 'none';
            });
          }}
          onPlayPause={handlePlayPause}
          onSeek={handleSeek}
          onNext={handleNext}
          onPrevious={handlePrevious}
          volume={volume}
          onVolumeChange={handleVolumeChange}
          isMobilePlayerOpen={isMobilePlayerOpen}
          setIsMobilePlayerOpen={(open) => open ? openMobilePlayer() : closeMobilePlayer()}
          isSpatial={isSpatial}
          onToggleSpatial={handleToggleSpatial}
        />
  
        {/* Mobile Bottom Nav */}
        <div className="md:hidden flex h-[64px] bg-neutral-900/95 backdrop-blur-md border-t border-neutral-800 justify-around items-center px-2 pb-safe shrink-0">
          <Link to="/" className={`flex flex-col items-center gap-1.5 ${location.pathname === '/' ? 'text-white' : 'text-neutral-500'} hover:text-white transition-colors`}>
            <Home className="w-6 h-6" />
            <span className="text-[10px] font-medium leading-none">Home</span>
          </Link>
          <Link to="/search" className={`flex flex-col items-center gap-1.5 ${location.pathname === '/search' ? 'text-white' : 'text-neutral-500'} hover:text-white transition-colors`}>
            <Search className="w-6 h-6" />
            <span className="text-[10px] font-medium leading-none">Search</span>
          </Link>
          <Link to="/library" className={`flex flex-col items-center gap-1.5 ${location.pathname === '/library' ? 'text-white' : 'text-neutral-500'} hover:text-white transition-colors`}>
            <ListMusic className="w-6 h-6" />
            <span className="text-[10px] font-medium leading-none">Playlist</span>
          </Link>
        </div>
      </div>
      </div>

      {/* Toast Notification for Spatial Audio */}
      <AnimatePresence>
        {spatialToast && spatialToast.show && (
          <div className="fixed top-12 md:top-8 left-0 right-0 z-[1000] flex justify-center pointer-events-none px-4">
            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 350, damping: 26 }}
              className="flex items-center gap-3 bg-neutral-900/95 border border-neutral-800/80 backdrop-blur-md px-4 py-2.5 md:px-5 md:py-3.5 rounded-full shadow-2xl shadow-black/90 max-w-xs md:max-w-sm w-auto pointer-events-auto"
            >
              <div className={`flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full shrink-0 ${spatialToast.enabled ? 'bg-green-500/10 text-green-500' : 'bg-neutral-800 text-neutral-400'}`}>
                <Headphones className={`w-4.5 h-4.5 md:w-5 md:h-5 ${spatialToast.enabled ? 'animate-pulse' : ''}`} />
              </div>
              <div className="flex flex-col min-w-0 pr-1">
                <span className="text-xs md:text-sm font-semibold text-white tracking-wide leading-snug">
                  Spatial Audio {spatialToast.enabled ? 'Enabled' : 'Disabled'}
                </span>
                <span className="text-[10px] md:text-xs text-neutral-400 font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-[180px] md:max-w-none">
                  {spatialToast.enabled ? (
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-green-400 inline shrink-0" />
                      3D soundstage active
                    </span>
                  ) : (
                    'Standard stereo active'
                  )}
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

// Helper wrapper component for AlbumDetail to grab the :id from params

function AlbumDetailWrapper({ albums, onBack, onSongClick, currentSong, isPlaying }: { albums: Album[], onBack: () => void, onSongClick: (song: Song, index: number, albumSongs: Song[]) => void, currentSong: Song | null, isPlaying: boolean }) {
  const { id } = useParams<{ id: string }>();
  const album = albums.find(a => a.id === id);

  if (!album) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-neutral-400">
        <p>Album not found</p>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-white text-black rounded-full text-sm font-semibold hover:scale-105 transition">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <AlbumDetail 
      album={album} 
      onBack={onBack} 
      onSongClick={(song, index) => onSongClick(song, index, album.songs)}
      currentSong={currentSong}
      isPlaying={isPlaying}
    />
  );
}
