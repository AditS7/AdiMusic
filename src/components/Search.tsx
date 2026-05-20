import React, { useState } from 'react';
import { Search as SearchIcon, Play, Pause } from 'lucide-react';
import { Album, Song } from '../data';

interface SearchProps {
  albums: Album[];
  onAlbumClick: (album: Album) => void;
  onPlayAlbumClick: (album: Album) => void;
  onSongClick: (song: Song, index: number, playlist: Song[]) => void;
  currentSong: Song | null;
  isPlaying: boolean;
}

export const Search: React.FC<SearchProps> = ({
  albums,
  onAlbumClick,
  onPlayAlbumClick,
  onSongClick,
  currentSong,
  isPlaying,
}) => {
  const [query, setQuery] = useState('');

  const allSongs = albums.flatMap(album => album.songs);
  
  const filteredAlbums = query
    ? albums.filter(album => 
        album.title.toLowerCase().includes(query.toLowerCase()) || 
        album.artist.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const filteredSongs = query
    ? allSongs.filter(song => 
        song.title.toLowerCase().includes(query.toLowerCase()) || 
        song.artist.toLowerCase().includes(query.toLowerCase()) ||
        song.album.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="px-4 md:px-6 py-6 md:py-8 pb-32">
      <div className="mb-6 md:mb-8">
        <div className="relative max-w-md w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-neutral-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border-transparent rounded-full leading-5 bg-neutral-800 text-white placeholder-neutral-400 focus:outline-none focus:bg-white focus:text-black focus:ring-0 sm:text-sm transition-colors"
            placeholder="What do you want to listen to?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {query && (
        <div className="space-y-12">
          {/* Albums Section */}
          {filteredAlbums.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Albums</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {filteredAlbums.map((album) => {
                  const isThisAlbumPlaying = isPlaying && currentSong && album.songs.some(s => s.id === currentSong.id);
                  return (
                    <div
                      key={album.id}
                      onClick={() => onAlbumClick(album)}
                      className="group bg-neutral-900 hover:bg-neutral-800 p-4 rounded-xl cursor-pointer transition flex flex-col relative"
                    >
                      <div className="relative mb-4 w-full aspect-square shadow-lg overflow-hidden rounded-md">
                        <img
                          src={album.coverUrl}
                          alt={album.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute right-2 bottom-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                          <button
                            className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-black hover:scale-105 hover:bg-green-400 shadow-xl"
                            onClick={(e) => {
                              e.stopPropagation();
                              onPlayAlbumClick(album);
                            }}
                          >
                            {isThisAlbumPlaying ? (
                              <Pause className="w-6 h-6 fill-black" />
                            ) : (
                              <Play className="w-6 h-6 fill-black translate-x-[2px]" />
                            )}
                          </button>
                        </div>
                      </div>
                      <h3 className="text-white font-semibold line-clamp-2 pb-1">{album.title}</h3>
                      <p className="text-sm text-neutral-400 truncate">{album.artist}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Songs Section */}
          {filteredSongs.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Songs</h2>
              <div className="flex flex-col space-y-1">
                {filteredSongs.map((song) => {
                  const isThisSongPlaying = currentSong?.id === song.id;
                  const album = albums.find(a => a.title === song.album);
                  const trackIndex = album ? album.songs.findIndex(s => s.id === song.id) : 0;
                  const playlist = album ? album.songs : filteredSongs;

                  return (
                    <div
                      key={song.id}
                      onClick={() => onSongClick(song, trackIndex, playlist)}
                      className="flex items-center gap-4 px-4 py-3 rounded-md hover:bg-neutral-800 group cursor-pointer text-white transition"
                    >
                      <div className="relative w-12 h-12 flex-shrink-0">
                        <img src={song.coverUrl} className="w-full h-full object-cover rounded" alt={song.title} />
                        <div className="absolute inset-0 bg-black/50 invisible group-hover:visible flex items-center justify-center rounded">
                           {isThisSongPlaying && isPlaying ? (
                             <Pause className="w-5 h-5 fill-white" />
                           ) : (
                             <Play className="w-5 h-5 fill-white" />
                           )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col min-w-0 pr-4 flex-1 justify-center">
                        <span className={`truncate text-base mb-0.5 ${isThisSongPlaying ? 'text-green-500' : 'text-white'}`}>
                          {song.title}
                        </span>
                        <span className="text-neutral-400 text-sm truncate">
                          {song.artist}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {filteredAlbums.length === 0 && filteredSongs.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-xl font-bold text-white mb-2">No results found for "{query}"</h3>
              <p className="text-neutral-400">Please make sure your words are spelled correctly or use less or different keywords.</p>
            </div>
          )}
        </div>
      )}

      {!query && (
         <div className="text-neutral-400 mt-10">
           <h2 className="text-xl font-bold text-white mb-4">Browse all</h2>
           <p>Search for songs or albums.</p>
         </div>
      )}
    </div>
  );
};
