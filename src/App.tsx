/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Home, Library, Search } from 'lucide-react';
import { AlbumGrid } from './components/AlbumGrid';
import { AlbumDetail } from './components/AlbumDetail';
import { Player } from './components/Player';
import { Search as SearchView } from './components/Search';
import { albums, Album, Song } from './data';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'album' | 'search'>('home');
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  
  // Player state
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [currentPlaylist, setCurrentPlaylist] = useState<Song[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    const audio = audioRef.current;
    audio.volume = volume;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };

    const updateDuration = () => setDuration(audio.duration);
    
    const handleEnded = () => handleNext();

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, [currentIndex, currentPlaylist]); // Re-bind handleEnded with fresh state

  // Handle playing a new song
  useEffect(() => {
    if (currentSong && audioRef.current) {
      const isSrcChanged = audioRef.current.src !== currentSong.audioUrl;
      
      if (isSrcChanged) {
        audioRef.current.src = currentSong.audioUrl;
        setCurrentTime(0);
        setProgress(0);
      }
      
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentSong, isPlaying]);

  const handlePlayPause = () => {
    if (!currentSong && currentPlaylist.length > 0) {
      setCurrentSong(currentPlaylist[0]);
      setIsPlaying(true);
      return;
    }
    
    if (currentSong && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(e => console.error("Playback failed", e));
        setIsPlaying(true);
      }
    }
  };

  const handleNext = () => {
    if (currentPlaylist.length > 0) {
      const nextIndex = (currentIndex + 1) % currentPlaylist.length;
      setCurrentIndex(nextIndex);
      setCurrentSong(currentPlaylist[nextIndex]);
      setIsPlaying(true);
    }
  };

  const handlePrevious = () => {
    if (currentPlaylist.length > 0) {
      if (currentTime > 3 && audioRef.current) {
        // If more than 3 seconds in, just restart song
        audioRef.current.currentTime = 0;
      } else {
        const prevIndex = currentIndex === 0 ? currentPlaylist.length - 1 : currentIndex - 1;
        setCurrentIndex(prevIndex);
        setCurrentSong(currentPlaylist[prevIndex]);
        setIsPlaying(true);
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
    setSelectedAlbum(album);
    setCurrentView('album');
  };

  const handlePlayAlbum = (album: Album) => {
    if (album.songs.length > 0) {
      const isAlreadyPlayingThisAlbum = currentPlaylist.length === album.songs.length &&
        currentPlaylist.every((song, idx) => song.id === album.songs[idx].id);

      if (isAlreadyPlayingThisAlbum && currentSong) {
        handlePlayPause();
      } else {
        setCurrentPlaylist(album.songs);
        setCurrentIndex(0);
        setCurrentSong(album.songs[0]);
        setIsPlaying(true);
      }
    }
  };

  const handleSongClick = (song: Song, index: number, albumSongs: Song[]) => {
    setCurrentPlaylist(albumSongs);
    setCurrentIndex(index);
    
    if (currentSong?.id === song.id) {
      handlePlayPause();
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex h-screen bg-black text-white font-sans overflow-hidden">
      {/* Sidebar - Desktop Only */}
      <div className="hidden md:flex flex-col w-64 bg-black p-6 gap-6">
        <div className="space-y-4">
          <a href="#" onClick={() => setCurrentView('home')} className={`flex items-center gap-4 font-semibold hover:text-white transition ${currentView === 'home' ? 'text-white' : 'text-neutral-400'}`}>
            <Home className="w-6 h-6" /> Home
          </a>
          <a href="#" onClick={() => setCurrentView('search')} className={`flex items-center gap-4 font-semibold hover:text-white transition ${currentView === 'search' ? 'text-white' : 'text-neutral-400'}`}>
            <Search className="w-6 h-6" /> Search
          </a>
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
                className="text-sm text-neutral-400 hover:text-white cursor-pointer truncate"
              >
                {album.title}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-neutral-900 md:bg-neutral-900 md:rounded-lg overflow-y-auto pb-32 md:pb-0 mb-0 md:mb-24 md:m-2">
        {currentView === 'home' ? (
          <AlbumGrid 
            albums={albums} 
            onAlbumClick={handleAlbumClick} 
            onPlayAlbumClick={handlePlayAlbum}
            currentSong={currentSong}
            isPlaying={isPlaying}
          />
        ) : currentView === 'search' ? (
          <SearchView 
            albums={albums} 
            onAlbumClick={handleAlbumClick} 
            onPlayAlbumClick={handlePlayAlbum}
            onSongClick={(song, index, playlist) => handleSongClick(song, index, playlist)}
            currentSong={currentSong}
            isPlaying={isPlaying}
          />
        ) : selectedAlbum ? (
          <AlbumDetail 
            album={selectedAlbum} 
            onBack={() => setCurrentView('home')} 
            onSongClick={(song, index) => handleSongClick(song, index, selectedAlbum.songs)}
            currentSong={currentSong}
            isPlaying={isPlaying}
          />
        ) : null}
      </div>

      {/* Sticky Player */}
      <Player 
        currentSong={currentSong}
        isPlaying={isPlaying}
        progress={progress}
        currentTime={currentTime}
        duration={duration}
        onPlayPause={handlePlayPause}
        onSeek={handleSeek}
        onNext={handleNext}
        onPrevious={handlePrevious}
        volume={volume}
        onVolumeChange={handleVolumeChange}
      />

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-[64px] bg-neutral-900/95 backdrop-blur-md border-t border-neutral-800 flex justify-around items-center z-50 px-2 pb-safe">
        <button onClick={() => setCurrentView('home')} className={`flex flex-col items-center gap-1.5 ${currentView === 'home' ? 'text-white' : 'text-neutral-500'} hover:text-white transition-colors`}>
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-medium leading-none">Home</span>
        </button>
        <button onClick={() => setCurrentView('search')} className={`flex flex-col items-center gap-1.5 ${currentView === 'search' ? 'text-white' : 'text-neutral-500'} hover:text-white transition-colors`}>
          <Search className="w-6 h-6" />
          <span className="text-[10px] font-medium leading-none">Search</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-neutral-500 hover:text-white transition-colors">
          <Library className="w-6 h-6" />
          <span className="text-[10px] font-medium leading-none">Library</span>
        </button>
      </div>
    </div>
  );
}
