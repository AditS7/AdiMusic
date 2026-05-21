import React from 'react';
import { Album, Song } from '../data';
import { Play, Pause } from 'lucide-react';

interface AlbumGridProps {
  albums: Album[];
  onAlbumClick: (album: Album) => void;
  onPlayAlbumClick: (album: Album) => void;
  currentSong: Song | null;
  isPlaying: boolean;
}

export const AlbumGrid: React.FC<AlbumGridProps> = ({ 
  albums, 
  onAlbumClick, 
  onPlayAlbumClick,
  currentSong,
  isPlaying,
}) => {
  return (
    <div className="px-4 md:px-6 py-6 md:py-8">
      <h2 className="text-2xl font-bold text-white mb-4 md:mb-6">Home</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
        {albums.map((album) => {
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
                <div className="hidden md:block absolute right-2 bottom-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
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
              <p className="text-sm text-neutral-400 truncate">{album.artist} • {album.releaseYear}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
