/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Home, Library, Search } from 'lucide-react';
import { Routes, Route, Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { AlbumGrid } from './components/AlbumGrid';
import { AlbumDetail } from './components/AlbumDetail';
import { Player } from './components/Player';
import { Search as SearchView } from './components/Search';
import { albums, Album, Song } from './data';

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
    if (currentSong && audioRef.current) {
      const isSrcChanged = audioRef.current.getAttribute('src') !== currentSong.audioUrl && audioRef.current.src !== currentSong.audioUrl;
      
      if (isSrcChanged) {
        audioRef.current.src = currentSong.audioUrl;
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
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentSong.title,
        artist: currentSong.artist,
        album: currentSong.album,
        artwork: [
          { src: currentSong.coverUrl, sizes: '96x96', type: 'image/png' },
          { src: currentSong.coverUrl, sizes: '128x128', type: 'image/png' },
          { src: currentSong.coverUrl, sizes: '192x192', type: 'image/png' },
          { src: currentSong.coverUrl, sizes: '256x256', type: 'image/png' },
          { src: currentSong.coverUrl, sizes: '384x384', type: 'image/png' },
          { src: currentSong.coverUrl, sizes: '512x512', type: 'image/png' },
        ]
      });

      navigator.mediaSession.setActionHandler('play', () => setIsPlaying(true));
      navigator.mediaSession.setActionHandler('pause', () => setIsPlaying(false));
      navigator.mediaSession.setActionHandler('previoustrack', handlePrevious);
      navigator.mediaSession.setActionHandler('nexttrack', handleNext);
      navigator.mediaSession.setActionHandler('seekto', (details) => {
        if (details.seekTime && audioRef.current) {
          audioRef.current.currentTime = details.seekTime;
          setCurrentTime(details.seekTime);
        }
      });
    }
  }, [currentSong, currentIndex, currentPlaylist]);

  const handlePlayPause = () => {
    if (!currentSong && currentPlaylist.length > 0) {
      const firstSong = currentPlaylist[0];
      if (audioRef.current) {
        if (audioRef.current.src !== firstSong.audioUrl && audioRef.current.getAttribute('src') !== firstSong.audioUrl) {
          audioRef.current.src = firstSong.audioUrl;
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
            audioRef.current.src = currentPlaylist[nextIndex].audioUrl;
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
            audioRef.current.src = currentPlaylist[nextIndex].audioUrl;
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
            audioRef.current.src = currentPlaylist[prevIndex].audioUrl;
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
            audioRef.current.src = currentPlaylist[prevIndex].audioUrl;
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
          audioRef.current.src = album.songs[0].audioUrl;
          audioRef.current.play().catch(console.error);
        }
        setCurrentPlaylist(album.songs);
        setCurrentIndex(0);
        setCurrentSong(album.songs[0]);
        setIsPlaying(true);
        if (window.innerWidth < 768) setIsMobilePlayerOpen(true);
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
        audioRef.current.src = song.audioUrl;
        audioRef.current.play().catch(console.error);
      }
      setCurrentSong(song);
      setIsPlaying(true);
      if (location.pathname.startsWith('/album/')) {
        navigate(`/album/${encodeURIComponent(song.album)}/song/${encodeURIComponent(song.id)}`, { replace: true });
      }
    }
    if (window.innerWidth < 768) setIsMobilePlayerOpen(true);
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
    <div className="flex flex-col h-[100dvh] bg-black text-white font-sans overflow-hidden">
      <audio ref={audioRef} preload="auto" />
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
          </div>
          
          <div className="mt-4 pt-4 border-t border-neutral-800">
            <a href="#" className="flex items-center gap-4 font-semibold text-neutral-400 hover:text-white transition mb-4">
              <Library className="w-6 h-6" /> Your Library
            </a>
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
          setIsMobilePlayerOpen={setIsMobilePlayerOpen}
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
          <button className="flex flex-col items-center gap-1.5 text-neutral-500 hover:text-white transition-colors">
            <Library className="w-6 h-6" />
            <span className="text-[10px] font-medium leading-none">Library</span>
          </button>
        </div>
      </div>
    </div>
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
