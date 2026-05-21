import React, { useState, useEffect } from 'react';
import { Album, Song } from '../data';
import { ArrowLeft, Play, Pause, Clock3, Share2 } from 'lucide-react';
import { FastAverageColor } from 'fast-average-color';

interface AlbumDetailProps {
  album: Album;
  onBack: () => void;
  onSongClick: (song: Song, index: number) => void;
  currentSong: Song | null;
  isPlaying: boolean;
}

export const AlbumDetail: React.FC<AlbumDetailProps> = ({
  album,
  onBack,
  onSongClick,
  currentSong,
  isPlaying,
}) => {
  const isAlbumPlaying = currentSong?.album === album.title && isPlaying;
  
  const [songDurations, setSongDurations] = useState<Record<string, string>>({});
  const [songDurationsSec, setSongDurationsSec] = useState<Record<string, number>>({});
  const [shared, setShared] = useState<string | null>(null);
  const [dominantColor, setDominantColor] = useState<string>('rgba(38, 38, 38, 1)'); // Default to neutral-800

  useEffect(() => {
    let isMounted = true;
    const fac = new FastAverageColor();
    
    // Proxy through wsrv.nl to avoid CORS issues with R2 buckets that don't have CORS configured
    const proxyUrl = `https://wsrv.nl/?url=${encodeURIComponent(album.coverUrl)}&w=100`; // Requesting a small width makes it faster

    fac.getColorAsync(proxyUrl, {
      crossOrigin: 'anonymous'
    })
      .then(color => {
        if (isMounted) setDominantColor(color.rgba);
      })
      .catch(e => {
        // Silently fail if proxy or image fails
        if (isMounted) setDominantColor('rgba(38, 38, 38, 1)');
      });
      
    return () => {
      isMounted = false;
      fac.destroy();
    };
  }, [album.coverUrl]);


  const handleShare = (e: React.MouseEvent, type: 'album' | 'song', id?: string) => {
    e.stopPropagation();
    let url = window.location.origin;
    if (type === 'album') {
      url += `/album/${encodeURIComponent(album.id)}`;
    } else if (type === 'song' && id) {
      url += `/album/${encodeURIComponent(album.id)}/song/${encodeURIComponent(id)}`;
    }
    
    navigator.clipboard.writeText(url);
    setShared(type === 'album' ? 'album' : id || null);
    setTimeout(() => setShared(null), 2000);
  };


  useEffect(() => {
    setSongDurations({});
    setSongDurationsSec({});
    album.songs.forEach(song => {
      if (song.duration) {
        setSongDurations(prev => ({ ...prev, [song.id]: song.duration! }));
        const [mins, secs] = song.duration.split(':').map(Number);
        setSongDurationsSec(prev => ({ ...prev, [song.id]: mins * 60 + secs }));
      } else {
        const audio = new Audio(song.audioUrl);
        audio.addEventListener('loadedmetadata', () => {
          const minutes = Math.floor(audio.duration / 60);
          const seconds = Math.floor(audio.duration % 60);
          setSongDurations(prev => ({
            ...prev,
            [song.id]: `${minutes}:${seconds.toString().padStart(2, '0')}`
          }));
          setSongDurationsSec(prev => ({
            ...prev,
            [song.id]: audio.duration
          }));
        });
      }
    });
  }, [album]);

  const formatTotalDuration = () => {
    if (Object.keys(songDurationsSec).length !== album.songs.length) return '';
    let totalSecs = 0;
    Object.values(songDurationsSec).forEach(sec => {
      totalSecs += Number(sec);
    });
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = Math.floor(totalSecs % 60);
    
    if (hrs > 0) {
      return `, ${hrs} hr ${mins} min`;
    }
    return `, ${mins} min ${secs} sec`;
  };

  return (
    <div className="bg-black min-h-full pb-6 md:pb-8 relative w-full">
      {/* Dynamic Background Gradient overlay */}
      <div 
        className="absolute top-0 left-0 right-0 h-[400px] md:h-[500px] z-0 opacity-80 pointer-events-none transition-colors duration-700"
        style={{ background: `linear-gradient(to bottom, ${dominantColor} 0%, rgba(0,0,0,0) 100%)` }}
      />
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center md:items-end px-4 md:px-6 pt-12 md:pt-16 pb-6 relative z-10">
        <button
          onClick={onBack}
          className="absolute top-4 left-4 md:top-6 md:left-6 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/80 transition text-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <img
          src={album.coverUrl}
          alt={album.title}
          className="w-56 h-56 md:w-56 md:h-56 shadow-2xl rounded object-cover mb-4 md:mb-0 mt-4 md:mt-0"
        />
        <div className="md:ml-6 flex flex-col justify-end text-center md:text-left w-full">
          <p className="text-sm font-semibold mb-2 hidden md:block">{album.type || "Album"}</p>
          <h1 className="text-3xl md:text-6xl font-black mb-2 md:mb-4 tracking-tight drop-shadow-md">
            {album.title}
          </h1>
          <p className="text-neutral-400 text-sm font-medium md:mb-0 mb-2 flex items-center justify-center md:justify-start gap-1">
            <span className="text-white font-bold">{album.artist}</span> • {album.releaseYear} • {album.songs.length} {album.songs.length === 1 ? 'song' : 'songs'}{formatTotalDuration()}
          </p>
        </div>
      </div>

      {/* Action Bar */}
      <div className="px-4 md:px-6 py-2 md:py-4 flex items-center justify-center md:justify-start space-x-6 relative z-10">
        <button
           onClick={() => onSongClick(album.songs[0], 0)}
           className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-black hover:scale-105 hover:bg-green-400 transition shadow-xl"
        >
          {isAlbumPlaying ? (
             <Pause className="w-7 h-7 fill-black" />
          ) : (
             <Play className="w-7 h-7 fill-black translate-x-[2px]" />
          )}
        </button>
        <button 
          onClick={(e) => handleShare(e, 'album')} 
          className="text-neutral-400 hover:text-white transition flex items-center justify-center w-10 h-10 rounded-full hover:bg-neutral-800"
          title={album.type === 'Single' ? "Share Single" : "Share Album"}
        >
          {shared === 'album' ? <span className="text-sm font-medium text-green-500">Copied!</span> : <Share2 className="w-6 h-6" />}
        </button>
      </div>

      {/* Tracklist */}
      <div className="px-2 md:px-6 mt-4 relative z-10">
        {/* Tracklist Header */}
        <div className="hidden md:grid grid-cols-[auto_1fr_auto_auto] gap-4 px-4 py-2 border-b border-neutral-800 text-neutral-400 text-sm font-medium mb-3">
          <div className="w-6 text-center">#</div>
          <div>Title</div>
          <div className="w-12 text-center"></div>
          <div className="w-12 text-right"><Clock3 className="w-4 h-4 inline-block" /></div>
        </div>

        {/* Tracks */}
        <div className="flex flex-col space-y-1">
          {album.songs.map((song, index) => {
            const isThisSongPlaying = currentSong?.id === song.id;

            return (
              <div
                key={song.id}
                onClick={() => onSongClick(song, index)}
                className="flex md:grid md:grid-cols-[auto_1fr_auto_auto] gap-3 md:gap-4 px-2 md:px-4 py-3 rounded-md hover:bg-neutral-800 group cursor-pointer text-white items-center transition"
              >
                
                <div className="w-6 text-center text-neutral-400 block md:group-hover:hidden hidden md:block">
                    {isThisSongPlaying && isPlaying ? (
                       <img src="https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f5eb96f2.gif" alt="playing" className="w-3 h-3 mx-auto" />
                    ) : (
                       <span className={isThisSongPlaying ? "text-green-500" : ""}>{index + 1}</span>
                    )}
                </div>
                <div className="w-6 text-center hidden md:group-hover:block text-white">
                  {isThisSongPlaying && isPlaying ? (
                    <Pause className="w-4 h-4 mx-auto fill-white" />
                  ) : (
                    <Play className="w-4 h-4 mx-auto fill-white" />
                  )}
                </div>

                <div className="flex flex-col justify-center flex-1 min-w-0 pr-4">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`truncate text-base ${isThisSongPlaying ? 'text-green-500' : ''}`}>
                      {song.title}
                    </span>
                    {isThisSongPlaying && isPlaying && (
                       <img src="https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f5eb96f2.gif" alt="playing" className="w-3 h-3 flex-shrink-0 md:hidden" />
                    )}
                  </div>
                  <span className="text-neutral-400 text-sm truncate">
                    {song.artist}
                  </span>
                </div>

                <div className="w-12 flex items-center justify-center">
                  <button 
                    onClick={(e) => handleShare(e, 'song', song.id)}
                    className="text-neutral-400 hover:text-white transition opacity-100 md:opacity-0 md:group-hover:opacity-100 p-2"
                  >
                    {shared === song.id ? <span className="text-[10px] text-green-500 font-bold uppercase">Copied</span> : <Share2 className="w-4 h-4" />}
                  </button>
                </div>

                <div className="w-12 text-right text-neutral-400 text-sm flex-shrink-0 flex items-center justify-end">
                  {songDurations[song.id] || "..."}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
