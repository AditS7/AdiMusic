export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  audioUrl: string;
  duration?: string;
  coverUrl: string;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  releaseYear: string;
  songs: Song[];
}

export const albums: Album[] = [
  {
    id: "album-1",
    title: "Woolwich to Brixton",
    artist: "Adit",
    coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Woolwich%20to%20Brixton/Woolwich%20To%20Brixton.png",
    releaseYear: "2026",
    songs: [
      {
        id: "song-1",
        title: "London raised me",
        artist: "Adit",
        album: "Woolwich to Brixton",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Woolwich%20to%20Brixton/London%20raised%20me.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Woolwich%20to%20Brixton/Woolwich%20To%20Brixton.png",
      },
      {
        id: "song-2",
        title: "Cold In The Ends",
        artist: "Adit",
        album: "Woolwich to Brixton",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Woolwich%20to%20Brixton/Cold%20In%20The%20Ends.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Woolwich%20to%20Brixton/Woolwich%20To%20Brixton.png",
      },
      {
        id: "song-3",
        title: "Off These Chains",
        artist: "Adit",
        album: "Woolwich to Brixton",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Woolwich%20to%20Brixton/Off%20These%20Chains.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Woolwich%20to%20Brixton/Woolwich%20To%20Brixton.png",
      },
      {
        id: "song-4",
        title: "Late Shift Profits",
        artist: "Adit",
        album: "Woolwich to Brixton",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Woolwich%20to%20Brixton/Late%20Shift%20Profits.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Woolwich%20to%20Brixton/Woolwich%20To%20Brixton.png",
      },
      {
        id: "song-5",
        title: "South of the River Riddim",
        artist: "Adit",
        album: "Woolwich to Brixton",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Woolwich%20to%20Brixton/South%20of%20the%20River%20Riddim.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Woolwich%20to%20Brixton/Woolwich%20To%20Brixton.png",
      },
      {
        id: "song-6",
        title: "Cold Shoulders, Closed Heart",
        artist: "Adit",
        album: "Woolwich to Brixton",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Woolwich%20to%20Brixton/Cold%20Shoulders%2C%20Closed%20Heart.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Woolwich%20to%20Brixton/Woolwich%20To%20Brixton.png",
      },
      {
        id: "song-7",
        title: "Ice on Quiet Roads",
        artist: "Adit",
        album: "Woolwich to Brixton",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Woolwich%20to%20Brixton/Ice%20on%20Quiet%20Roads.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Woolwich%20to%20Brixton/Woolwich%20To%20Brixton.png",
      }
    ]
  }
];
