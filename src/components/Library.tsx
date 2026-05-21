import React, { useState, useEffect } from 'react';
import { Album, Song } from '../data';
import { Play, Pause, Shuffle, Clock3, Music, ArrowUpDown } from 'lucide-react';

interface LibraryProps {
  albums: Album[];
  onSongClick: (song: Song, index: number, playlist: Song[]) => void;
  currentSong: Song | null;
  isPlaying: boolean;
}

export const LibraryView: React.FC<LibraryProps> = ({
  albums,
  onSongClick,
  currentSong,
  isPlaying,
}) => {
  const [songDurations, setSongDurations] = useState<Record<string, string>>({});
  const [sortBy, setSortBy] = useState<'alphabetical' | 'releaseDate'>('alphabetical');

  // Exact album release dates lookup map
  const ALBUM_RELEASE_DATES: Record<string, Date> = React.useMemo(() => ({
    "Woolwich to Brixton": new Date("2026-04-21"),
    "2 A.M. With Her": new Date("2026-01-26"),
    "Still in Silence": new Date("2025-11-24"),
    "All or Nothing": new Date("2025-11-04"),
    "Eternal Flame": new Date("2025-10-28"),
    "Celestial Blaze": new Date("2025-10-06"),
    "Mr. Fahrenheit": new Date("2025-09-15"),
  }), []);

  // Map to store track index within its respective album for maintaining track-listing order when grouped/sorted
  const songAlbumOrderMap = React.useMemo(() => {
    const map = new Map<string, number>();
    albums.forEach(album => {
      album.songs.forEach((song, idx) => {
        map.set(song.id, idx);
      });
    });
    return map;
  }, [albums]);

  // Mixed Cover Images (collage) of the first 4 unique album covers
  const mixedCovers = React.useMemo(() => {
    const covers = albums.map(album => album.coverUrl).filter(Boolean);
    const unique = Array.from(new Set(covers));
    return unique.slice(0, 4);
  }, [albums]);

  // Compile and sort all songs based on current sort settings
  const sortedSongs = React.useMemo(() => {
    const songs = albums.flatMap(album => album.songs);
    
    if (sortBy === 'alphabetical') {
      return [...songs].sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: 'base' }));
    } else {
      return [...songs].sort((a, b) => {
        const dateA = ALBUM_RELEASE_DATES[a.album] || new Date(0);
        const dateB = ALBUM_RELEASE_DATES[b.album] || new Date(0);
        
        // Sort newest releases first
        if (dateB.getTime() !== dateA.getTime()) {
          return dateB.getTime() - dateA.getTime();
        }
        
        // Tie-breaker: keep the original album tracklist index ordering
        const idxA = songAlbumOrderMap.get(a.id) ?? 0;
        const idxB = songAlbumOrderMap.get(b.id) ?? 0;
        return idxA - idxB;
      });
    }
  }, [albums, sortBy, ALBUM_RELEASE_DATES, songAlbumOrderMap]);

  // Handle playing a song from the library
  const handleTrackClick = (song: Song, index: number) => {
    onSongClick(song, index, sortedSongs);
  };

  // Shuffle play the sorted list (shuffling does random play)
  const handleShufflePlay = () => {
    if (sortedSongs.length === 0) return;
    
    const shuffled = [...sortedSongs];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    onSongClick(shuffled[0], 0, shuffled);
  };

  // Calculate durations dynamically
  useEffect(() => {
    const audioObjects: HTMLAudioElement[] = [];
    sortedSongs.forEach(song => {
      if (song.duration) {
        setSongDurations(prev => ({ ...prev, [song.id]: song.duration! }));
      } else {
        const audio = new Audio(song.audioUrl);
        audioObjects.push(audio);
        audio.addEventListener('loadedmetadata', () => {
          const minutes = Math.floor(audio.duration / 60);
          const seconds = Math.floor(audio.duration % 60);
          setSongDurations(prev => ({
            ...prev,
            [song.id]: `${minutes}:${seconds.toString().padStart(2, '0')}`
          }));
        });
      }
    });

    return () => {
      audioObjects.forEach(audio => {
        audio.pause();
        audio.src = '';
      });
    };
  }, [sortedSongs]);

  return (
    <div className="bg-neutral-900 min-h-full pb-6 md:pb-8 relative w-full select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center md:items-end px-4 md:px-6 pt-12 md:pt-16 pb-6 relative z-10 gap-6">
        {/* Collage Artwork Cover */}
        <div className="w-52 h-52 md:w-56 md:h-56 bg-neutral-900 shadow-2xl rounded overflow-hidden relative group shrink-0 grid grid-cols-2 grid-rows-2 gap-0.5 border border-neutral-800">
          {mixedCovers.length >= 4 ? (
            mixedCovers.map((cover, i) => (
              <img 
                key={i} 
                src={cover} 
                className="w-full h-full object-cover select-none pointer-events-none" 
                alt="" 
                referrerPolicy="no-referrer" 
              />
            ))
          ) : (
            <div className="col-span-2 row-span-2 flex items-center justify-center bg-gradient-to-br from-green-500 to-emerald-950">
              <Music className="w-24 h-24 text-white" />
            </div>
          )}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
        </div>
        
        <div className="flex flex-col justify-end text-center md:text-left w-full">
          <p className="text-xs uppercase font-bold tracking-wider text-green-400 mb-2">All Songs</p>
          <h1 className="text-3xl md:text-6xl font-black mb-3 tracking-tight drop-shadow-md text-white">
            Library
          </h1>
          <p className="text-neutral-400 text-sm font-medium">
            <span className="text-white font-bold">{sortedSongs.length} songs</span> • Sorted by {sortBy === 'alphabetical' ? 'alphabetical title order' : 'album release date'}
          </p>
        </div>
      </div>

      {/* Sort Options and Action Bar */}
      <div className="px-4 md:px-6 py-2 md:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative z-10 border-b border-neutral-900 pb-6">
        <button
          onClick={handleShufflePlay}
          className="px-6 py-3 bg-green-500 rounded-full flex items-center justify-center gap-2 text-black hover:scale-105 hover:bg-green-400 active:scale-95 transition-all shadow-xl font-bold text-sm uppercase tracking-wider"
        >
          <Shuffle className="w-4 h-4 fill-black" />
          Shuffle Play
        </button>

        {/* Sort Controls */}
        <div className="flex items-center gap-2 self-center sm:self-auto bg-neutral-900 p-1.5 rounded-full border border-neutral-800">
          <span className="text-neutral-400 text-xs pl-3 pr-1 flex items-center gap-1 font-semibold select-none">
            <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
            Sort by:
          </span>
          <button
            onClick={() => setSortBy('alphabetical')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              sortBy === 'alphabetical' 
                ? 'bg-neutral-800 text-white shadow-sm' 
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Title (A-Z)
          </button>
          <button
            onClick={() => setSortBy('releaseDate')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              sortBy === 'releaseDate' 
                ? 'bg-neutral-800 text-white shadow-sm' 
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Release Date
          </button>
        </div>
      </div>

      {/* Tracklist */}
      <div className="px-2 md:px-6 mt-4 relative z-10">
        {/* Tracklist Header */}
        <div className="hidden md:grid grid-cols-[auto_1fr_1fr_auto] gap-4 px-4 py-2 border-b border-neutral-800 text-neutral-500 text-xs font-bold uppercase tracking-wider mb-2">
          <div className="w-6 text-center">#</div>
          <div>Title</div>
          <div>Album</div>
          <div className="w-12 text-right"><Clock3 className="w-4 h-4 inline-block" /></div>
        </div>

        {/* Tracks */}
        <div className="flex flex-col space-y-1">
          {sortedSongs.map((song, index) => {
            const isThisSongPlaying = currentSong?.id === song.id;

            return (
              <div
                key={song.id}
                onClick={() => handleTrackClick(song, index)}
                className="flex md:grid md:grid-cols-[auto_1fr_1fr_auto] gap-3 md:gap-4 px-2 md:px-4 py-3 rounded-md hover:bg-neutral-800/60 group cursor-pointer text-white items-center transition-colors"
                id={`track-${song.id}`}
              >
                {/* Visual Indicator of Track playing or not */}
                <div className="w-6 text-center text-neutral-400 block md:group-hover:hidden hidden md:block">
                  {isThisSongPlaying && isPlaying ? (
                    <img src="https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f5eb96f2.gif" alt="playing" className="w-3 h-3 mx-auto" />
                  ) : (
                    <span className={isThisSongPlaying ? "text-green-500 font-bold" : "font-medium"}>{index + 1}</span>
                  )}
                </div>
                <div className="w-6 text-center hidden md:group-hover:block text-white">
                  {isThisSongPlaying && isPlaying ? (
                    <Pause className="w-4 h-4 mx-auto fill-white" />
                  ) : (
                    <Play className="w-4 h-4 mx-auto fill-white" />
                  )}
                </div>

                {/* Cover and details */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <img src={song.coverUrl} className="w-10 h-10 object-cover rounded shadow" alt={song.title} />
                  <div className="flex flex-col min-w-0 pr-4">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`truncate text-sm font-semibold tracking-wide ${isThisSongPlaying ? 'text-green-500' : 'text-neutral-100'}`}>
                        {song.title}
                      </span>
                      {isThisSongPlaying && isPlaying && (
                        <img src="https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f5eb96f2.gif" alt="playing" className="w-3 h-3 flex-shrink-0 md:hidden" />
                      )}
                    </div>
                    <span className="text-neutral-400 text-xs font-medium">
                      {song.artist}
                    </span>
                  </div>
                </div>

                {/* Album title (hidden on mobile, column on desktop) */}
                <div className="hidden md:block truncate text-neutral-400 text-sm font-medium pr-4">
                  {song.album}
                </div>

                {/* Duration */}
                <div className="w-12 text-right text-neutral-400 text-xs font-bold font-mono flex-shrink-0 flex items-center justify-end">
                  {songDurations[song.id] || "..."}
                </div>
              </div>
            );
          })}

          {sortedSongs.length === 0 && (
            <div className="text-center py-20 text-neutral-400">
              <p className="text-lg font-semibold text-white mb-2">No songs found in Library</p>
              <p>Add some albums first to populate your library.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
