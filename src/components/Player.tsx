import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, ChevronDown, Share2, Shuffle, Repeat, MessageSquareText, Headphones } from 'lucide-react';
import { Song } from '../data';
import { FastAverageColor } from 'fast-average-color';

interface PlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  progress: number;
  currentTime: number;
  duration: number;
  volume: number;
  isShuffle: boolean;
  onToggleShuffle: () => void;
  repeatMode: 'none' | 'all' | 'one';
  onToggleRepeat: () => void;
  onPlayPause: () => void;
  onSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
  onPrevious: () => void;
  onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isMobilePlayerOpen: boolean;
  setIsMobilePlayerOpen: (open: boolean) => void;
  isSpatial: boolean;
  onToggleSpatial: () => void;
}

const formatTime = (time: number) => {
  if (isNaN(time)) return '0:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export const Player: React.FC<PlayerProps> = ({
  currentSong,
  isPlaying,
  progress,
  currentTime,
  duration,
  volume,
  isShuffle,
  onToggleShuffle,
  repeatMode,
  onToggleRepeat,
  onPlayPause,
  onSeek,
  onNext,
  onPrevious,
  onVolumeChange,
  isMobilePlayerOpen,
  setIsMobilePlayerOpen,
  isSpatial,
  onToggleSpatial,
}) => {
  const [copied, setCopied] = useState(false);
  const [dominantColor, setDominantColor] = useState<string>('rgba(38, 38, 38, 1)'); // Default to neutral-800
  const [showLyrics, setShowLyrics] = useState(false);
  const [fetchedLyrics, setFetchedLyrics] = useState<string | null>(null);

  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (e.state?.lyrics) {
        setShowLyrics(true);
      } else {
        setShowLyrics(false);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const toggleLyrics = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (showLyrics) {
      if (window.history.state?.lyrics) {
        window.history.back();
      } else {
        setShowLyrics(false);
      }
    } else {
      if (window.innerWidth < 768) {
        window.history.replaceState({ ...window.history.state, mobilePlayer: true }, "");
      }
      window.history.pushState({ lyrics: true }, "");
      setShowLyrics(true);
    }
  };

  useEffect(() => {
    setFetchedLyrics(null);
    if (currentSong?.lyricsUrl) {
      // Use codetabs proxy bypass CORS since Vercel static deployment does not run server.ts
      fetch(`https://api.codetabs.com/v1/proxy?quest=${currentSong.lyricsUrl}`)
        .then((res) => {
          if (!res.ok) throw new Error('Network response was not ok');
          return res.text();
        })
        .then((text) => setFetchedLyrics(text))
        .catch((err) => {
          console.error('Failed to fetch lyrics via codetabs, trying allorigins:', err);
          fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(currentSong.lyricsUrl!)}`)
            .then(res => {
              if (!res.ok) throw new Error('Network response was not ok');
              return res.text();
            })
            .then(text => setFetchedLyrics(text))
            .catch(err => console.error('Failed to fetch lyrics completely:', err));
        });
    } else if (currentSong?.lyrics) {
      setFetchedLyrics(currentSong.lyrics);
    }
  }, [currentSong]);

  useEffect(() => {
    if (!currentSong?.coverUrl) return;
    
    let isMounted = true;
    const fac = new FastAverageColor();
    
    // Proxy through wsrv.nl to avoid CORS issues
    const proxyUrl = `https://wsrv.nl/?url=${encodeURIComponent(currentSong.coverUrl)}&w=100`;

    fac.getColorAsync(proxyUrl, {
      crossOrigin: 'anonymous'
    })
      .then(color => {
        if (isMounted) setDominantColor(color.rgba);
      })
      .catch(() => {
        // Silently fail if proxy or image fails
        if (isMounted) setDominantColor('rgba(38, 38, 38, 1)');
      });
      
    return () => {
      isMounted = false;
      fac.destroy();
    };
  }, [currentSong?.coverUrl]);

  const handleShare = (e: React.MouseEvent) => {

    e.stopPropagation();
    if (!currentSong) return;
    const url = `${window.location.origin}/album/${encodeURIComponent(currentSong.album)}/song/${encodeURIComponent(currentSong.id)}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <>
      <div 
        onClick={() => {
          if (window.innerWidth < 768 && currentSong) {
            setIsMobilePlayerOpen(true);
          }
        }}
        className="relative bg-neutral-900 border-t border-neutral-800 text-white p-2 md:p-4 h-16 md:h-24 flex items-center justify-between z-50 transition-transform w-full"
        style={{ transform: isMobilePlayerOpen && window.innerWidth < 768 ? 'translateY(100%)' : 'translateY(0)' }}
      >
        {/* Left: Song Info */}
      <div className="flex items-center space-x-3 md:space-x-4 w-[45%] md:w-1/3 min-w-0">
        {currentSong ? (
          <>
            <img
              src={currentSong.coverUrl}
              alt={currentSong.title}
              className="w-12 h-12 md:w-14 md:h-14 rounded object-cover flex-shrink-0"
            />
            <div className="truncate">
              <h4 className="font-semibold text-sm truncate">{currentSong.title}</h4>
              <p className="text-xs text-neutral-400 truncate">{currentSong.artist}</p>
            </div>
          </>
        ) : (
          <>
            <div className="w-12 h-12 md:w-14 md:h-14 rounded bg-neutral-800 flex-shrink-0" />
            <div className="truncate flex flex-col space-y-2">
               <div className="h-3 w-24 bg-neutral-800 rounded"></div>
               <div className="h-2 w-16 bg-neutral-800 rounded"></div>
            </div>
          </>
        )}
      </div>

      {/* Center: Controls & Progress */}
      <div className="flex flex-col items-center w-[50%] md:w-1/3 max-w-xl">
        <div className="flex items-center space-x-4 md:space-x-6 mb-1 md:mb-2">
          <button 
            onClick={(e) => { e.stopPropagation(); onToggleShuffle(); }} 
            disabled={!currentSong} 
            className={`transition group active:scale-95 disabled:opacity-50 disabled:hover:text-neutral-400 ${isShuffle ? 'text-green-500 hover:text-green-400' : 'text-neutral-400 hover:text-white'}`}
            title={isShuffle ? "Shuffle on" : "Shuffle off"}
          >
            <Shuffle className="w-5 h-5" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onPrevious(); }} 
            disabled={!currentSong} 
            className="text-neutral-400 hover:text-white disabled:opacity-50 disabled:hover:text-neutral-400 transition group"
            title="Previous"
          >
            <SkipBack className="w-5 h-5 group-active:scale-95" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPlayPause();
            }}
            disabled={!currentSong}
            className="w-8 h-8 md:w-8 md:h-8 flex items-center justify-center bg-white text-black rounded-full hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed transition active:scale-95 shadow-md flex-shrink-0"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
               <Pause className="w-4 h-4 fill-black" />
            ) : (
               <Play className="w-4 h-4 fill-black translate-x-[1px]" />
            )}
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onNext(); }} 
            disabled={!currentSong} 
            className="text-neutral-400 hover:text-white disabled:opacity-50 disabled:hover:text-neutral-400 transition group"
            title="Next"
          >
            <SkipForward className="w-5 h-5 group-active:scale-95" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onToggleRepeat(); }} 
            disabled={!currentSong} 
            className={`relative transition group active:scale-95 disabled:opacity-50 disabled:hover:text-neutral-400 ${repeatMode !== 'none' ? 'text-green-500 hover:text-green-400' : 'text-neutral-400 hover:text-white'}`}
            title={repeatMode === 'none' ? 'Repeat off' : repeatMode === 'all' ? 'Repeat all' : 'Repeat one'}
          >
            <Repeat className="w-5 h-5" />
            {repeatMode === 'one' && (
              <span className="absolute -top-1.5 -right-1.5 text-[8px] font-extrabold bg-green-500 text-black border border-black rounded-full w-3.5 h-3.5 flex items-center justify-center">
                1
              </span>
            )}
          </button>
        </div>
        
        <div className="flex items-center w-full space-x-2 md:space-x-3 text-[10px] md:text-xs text-neutral-400">
          <span>{currentSong ? formatTime(currentTime) : '-:--'}</span>
          <div className="flex-1 group relative flex items-center h-4" onClick={(e) => e.stopPropagation()}>
            <input
              type="range"
              min="0"
              max="100"
              value={progress || 0}
              onChange={onSeek}
              disabled={!currentSong}
              className="w-full h-1 bg-neutral-700 rounded-full appearance-none cursor-pointer outline-none sm:[&::-webkit-slider-thumb]:hidden sm:group-hover:[&::-webkit-slider-thumb]:block [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full z-10 disabled:cursor-not-allowed"
              style={{
                background: `linear-gradient(to right, #ffffff ${progress || 0}%, #404040 ${progress || 0}%)`
              }}
            />
          </div>
          <span>{currentSong ? formatTime(duration) : '-:--'}</span>
        </div>
      </div>

      {/* Right: Extra Controls (Volume & Lyrics & Spatial) */}
      <div className="flex items-center justify-end w-1/3 space-x-3 text-neutral-400 hidden sm:flex">
         <button
           onClick={(e) => { e.stopPropagation(); onToggleSpatial(); }}
           className={`transition-colors hover:text-white ${isSpatial ? 'text-green-500 hover:text-green-400' : ''}`}
           title="Spatial Audio"
         >
           <Headphones className="w-5 h-5" />
         </button>
         <button
           onClick={toggleLyrics}
           className={`transition-colors hover:text-white ${showLyrics ? 'text-green-500 hover:text-green-400' : ''}`}
           title="Lyrics"
         >
           <MessageSquareText className="w-5 h-5" />
         </button>
         <div className="flex items-center" title="Volume">
           <Volume2 className="w-5 h-5 mr-3" />
           <div className="w-24 group relative flex items-center h-4">
             <input
               type="range"
               min="0"
               max="1"
               step="0.01"
               value={volume}
               onChange={onVolumeChange}
               className="w-full h-1 bg-neutral-700 rounded-full appearance-none cursor-pointer outline-none group-hover:[&::-webkit-slider-thumb]:block [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:hidden z-10"
               style={{
                 background: `linear-gradient(to right, #ffffff ${volume * 100}%, #404040 ${volume * 100}%)`
               }}
             />
           </div>
         </div>
      </div>
      </div>

      {/* Desktop/Tablet Lyrics Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-neutral-900 pb-24 px-8 pt-12 transition-opacity pointer-events-auto ${showLyrics && currentSong ? 'hidden sm:block' : 'hidden'}`}
        style={{ height: '100dvh' }}
      >
        {currentSong && (
           <div className="max-w-5xl mx-auto h-full flex mt-6">
             <div className="w-1/3 shrink-0 flex flex-col pt-8">
                <img src={currentSong.coverUrl} alt={currentSong.title} className="w-full aspect-square object-cover rounded-lg shadow-2xl mb-6" />
                <h2 className="text-3xl font-black text-white mb-2">{currentSong.title}</h2>
                <h3 className="text-xl font-medium text-neutral-400">{currentSong.artist}</h3>
             </div>
             <div key={currentSong.id} className="w-2/3 pl-16 flex flex-col justify-start overflow-y-auto pb-32 pt-8 scrollbar-hide">
                {fetchedLyrics ? (
                   <p className="whitespace-pre-wrap text-[32px] md:text-[40px] font-bold leading-snug text-white tracking-tight">
                     {fetchedLyrics}
                   </p>
                ) : (
                   <div className="flex bg-neutral-800/40 rounded-xl p-8 items-center justify-center mt-12 w-full max-w-lg mx-auto">
                     <p className="text-neutral-400 text-lg font-medium">Looks like we don't have the lyrics for this song.</p>
                   </div>
                )}
             </div>
           </div>
        )}
      </div>

      {/* Full Screen Mobile Player */}
      <div 
        className={`fixed inset-0 bg-black z-[100] transition-transform duration-300 md:hidden overflow-hidden ${isMobilePlayerOpen ? 'translate-y-0' : 'translate-y-full'}`}
        style={{ height: '100dvh' }}
      >
        {currentSong?.canvasUrl ? (
          <>
            <video 
              src={currentSong.canvasUrl} 
              poster={currentSong.coverUrl} 
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-0" 
            />
            <div className="absolute inset-0 bg-black/20 bg-gradient-to-t from-black/90 via-transparent to-black/60 z-10 pointer-events-none" />
          </>
        ) : (
          <div 
            className="absolute inset-0 z-0 pointer-events-none transition-colors duration-700" 
            style={{
              background: `linear-gradient(to bottom, ${dominantColor} 0%, rgba(0,0,0,1) 100%)`
            }}
          />
        )}

        {currentSong && (
          <div className="relative z-20 flex flex-col h-full px-6 pt-6 pb-8">
            {/* Header */}
            <div className="flex items-center justify-between shrink-0 mb-2">
              <button onClick={() => setIsMobilePlayerOpen(false)} className="text-white p-2 -ml-2">
                <ChevronDown className="w-8 h-8" />
              </button>
              <span className="text-[10px] sm:text-xs font-bold tracking-widest text-white uppercase text-center truncate px-2">{currentSong.album}</span>
              <div className="flex items-center space-x-1">
                <button 
                  onClick={(e) => { e.stopPropagation(); onToggleSpatial(); }}
                  className={`w-8 h-8 flex shrink-0 items-center justify-center transition-colors ${isSpatial ? 'text-green-500' : 'text-neutral-300'}`}
                  title="Spatial Audio"
                >
                  <Headphones className="w-5 h-5" />
                </button>
                <button 
                  onClick={toggleLyrics}
                  className={`w-8 h-8 flex shrink-0 items-center justify-center transition-colors ${showLyrics ? 'text-green-500' : 'text-neutral-300'}`}
                  title="Lyrics"
                >
                  <MessageSquareText className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Artwork / Lyrics */}
            <div key={currentSong.id} className={`flex-1 flex flex-col min-h-0 w-full mb-6 mt-4 overflow-y-auto scrollbar-hide ${showLyrics ? '' : 'hidden'}`}>
              {fetchedLyrics ? (
                <p className="whitespace-pre-wrap text-2xl font-bold leading-relaxed text-white tracking-tight pb-4">
                  {fetchedLyrics}
                </p>
              ) : (
                <div className="flex-1 flex items-center justify-center text-center">
                  <p className="text-neutral-400 text-base font-medium">Looks like we don't have the lyrics for this song.</p>
                </div>
              )}
            </div>
            
            <div className={`flex-1 flex items-center justify-center min-h-0 w-full mb-6 mt-2 ${!showLyrics && !currentSong.canvasUrl ? '' : 'hidden'}`}>
              <img 
                src={currentSong.coverUrl} 
                alt={currentSong.title} 
                className="w-full h-full max-w-full max-h-full aspect-square flex-shrink object-cover rounded-lg shadow-2xl" 
              />
            </div>

            <div className={`flex-1 min-h-0 w-full mb-6 mt-2 ${!showLyrics && currentSong.canvasUrl ? '' : 'hidden'}`}></div>

            {/* Bottom part */}
            <div className="shrink-0 flex flex-col">
              {/* Song Info */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col overflow-hidden pr-4 flex-1">
                  <h2 className="text-2xl font-bold text-white truncate mb-1">{currentSong.title}</h2>
                  <p className="text-lg text-neutral-400 truncate">{currentSong.artist}</p>
                </div>
                <button
                  onClick={handleShare}
                  className="flex items-center justify-center text-neutral-400 hover:text-white transition p-2.5 bg-neutral-800/40 active:bg-neutral-800 rounded-full w-12 h-12 flex-shrink-0"
                  title="Share Song"
                >
                  {copied ? (
                    <span className="text-[10px] text-green-500 font-bold uppercase tracking-wider">Copied</span>
                  ) : (
                    <Share2 className="w-6 h-6" />
                  )}
                </button>
              </div>

              {/* Progress */}
              <div className="mb-6">
                <div className="w-full group relative flex items-center h-4 mb-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress || 0}
                    onChange={onSeek}
                    className="w-full h-1.5 bg-neutral-700/50 rounded-full appearance-none cursor-pointer outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full z-10"
                    style={{
                      background: `linear-gradient(to right, #ffffff ${progress || 0}%, rgba(255,255,255,0.2) ${progress || 0}%)`
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-neutral-400 font-medium tracking-wide">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between px-4 mt-4 sm:mt-6 pb-4 sm:pb-8 w-full max-w-sm mx-auto">
                <button 
                  onClick={onToggleShuffle} 
                  disabled={!currentSong}
                  className={`transition active:scale-95 disabled:opacity-50 ${isShuffle ? 'text-green-500' : 'text-neutral-400 hover:text-white'}`}
                  title={isShuffle ? "Shuffle on" : "Shuffle off"}
                >
                  <Shuffle className="w-6 h-6" />
                </button>
                <button onClick={onPrevious} disabled={!currentSong} className="text-white active:scale-95 disabled:opacity-50 transition">
                  <SkipBack className="w-8 h-8 fill-white" />
                </button>
                <button
                  onClick={onPlayPause}
                  disabled={!currentSong}
                  className="w-16 h-16 flex items-center justify-center bg-white text-black rounded-full active:scale-95 disabled:opacity-50 transition"
                >
                  {isPlaying ? (
                     <Pause className="w-8 h-8 fill-black" />
                  ) : (
                     <Play className="w-8 h-8 fill-black translate-x-[2px]" />
                  )}
                </button>
                <button onClick={onNext} disabled={!currentSong} className="text-white active:scale-95 disabled:opacity-50 transition">
                  <SkipForward className="w-8 h-8 fill-white" />
                </button>
                <button 
                  onClick={onToggleRepeat} 
                  disabled={!currentSong}
                  className={`relative p-1 transition active:scale-95 disabled:opacity-50 ${repeatMode !== 'none' ? 'text-green-500' : 'text-neutral-400 hover:text-white'}`}
                  title={repeatMode === 'none' ? 'Repeat off' : repeatMode === 'all' ? 'Repeat all' : 'Repeat one'}
                >
                  <Repeat className="w-6 h-6" />
                  {repeatMode === 'one' && (
                    <span className="absolute -top-1 -right-1 text-[8px] font-extrabold bg-green-500 text-black border border-black rounded-full w-3.5 h-3.5 flex items-center justify-center">
                      1
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
