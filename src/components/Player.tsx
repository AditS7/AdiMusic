import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { Song } from '../data';

interface PlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  progress: number;
  currentTime: number;
  duration: number;
  volume: number;
  onPlayPause: () => void;
  onSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
  onPrevious: () => void;
  onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
  onPlayPause,
  onSeek,
  onNext,
  onPrevious,
  onVolumeChange,
}) => {
  return (
    <div className="fixed bottom-[64px] md:bottom-0 left-0 right-0 bg-neutral-900 border-t border-neutral-800 text-white p-2 md:p-4 h-16 md:h-24 flex items-center justify-between z-50">
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
          <button onClick={onPrevious} disabled={!currentSong} className="text-neutral-400 hover:text-white disabled:opacity-50 disabled:hover:text-neutral-400 transition group">
            <SkipBack className="w-5 h-5 group-active:scale-95" />
          </button>
          <button
            onClick={onPlayPause}
            disabled={!currentSong}
            className="w-8 h-8 md:w-8 md:h-8 flex items-center justify-center bg-white text-black rounded-full hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed transition active:scale-95 shadow-md flex-shrink-0"
          >
            {isPlaying ? (
               <Pause className="w-4 h-4 fill-black" />
            ) : (
               <Play className="w-4 h-4 fill-black translate-x-[1px]" />
            )}
          </button>
          <button onClick={onNext} disabled={!currentSong} className="text-neutral-400 hover:text-white disabled:opacity-50 disabled:hover:text-neutral-400 transition group">
            <SkipForward className="w-5 h-5 group-active:scale-95" />
          </button>
        </div>
        
        <div className="flex items-center w-full space-x-2 md:space-x-3 text-[10px] md:text-xs text-neutral-400">
          <span>{currentSong ? formatTime(currentTime) : '-:--'}</span>
          <div className="flex-1 group relative flex items-center h-4">
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

      {/* Right: Extra Controls (Volume) */}
      <div className="flex items-center justify-end w-1/3 space-x-3 text-neutral-400 hidden sm:flex">
         <Volume2 className="w-5 h-5" />
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
  );
};
