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
  type?: 'Album' | 'Single';
}

export const albums: Album[] = [
  {
    id: "Woolwich to Brixton",
    title: "Woolwich to Brixton",
    artist: "Adit",
    coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Woolwich%20to%20Brixton/Woolwich%20To%20Brixton.png",
    releaseYear: "2026",
    songs: [
      {
        id: "London raised me",
        title: "London raised me",
        artist: "Adit",
        album: "Woolwich to Brixton",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Woolwich%20to%20Brixton/London%20raised%20me.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Woolwich%20to%20Brixton/Woolwich%20To%20Brixton.png",
      },
      {
        id: "Cold In The Ends",
        title: "Cold In The Ends",
        artist: "Adit",
        album: "Woolwich to Brixton",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Woolwich%20to%20Brixton/Cold%20In%20The%20Ends.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Woolwich%20to%20Brixton/Woolwich%20To%20Brixton.png",
      },
      {
        id: "Off These Chains",
        title: "Off These Chains",
        artist: "Adit",
        album: "Woolwich to Brixton",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Woolwich%20to%20Brixton/Off%20These%20Chains.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Woolwich%20to%20Brixton/Woolwich%20To%20Brixton.png",
      },
      {
        id: "Late Shift Profits",
        title: "Late Shift Profits",
        artist: "Adit",
        album: "Woolwich to Brixton",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Woolwich%20to%20Brixton/Late%20Shift%20Profits.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Woolwich%20to%20Brixton/Woolwich%20To%20Brixton.png",
      },
      {
        id: "South of the River Riddim",
        title: "South of the River Riddim",
        artist: "Adit",
        album: "Woolwich to Brixton",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Woolwich%20to%20Brixton/South%20of%20the%20River%20Riddim.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Woolwich%20to%20Brixton/Woolwich%20To%20Brixton.png",
      },
      {
        id: "Cold Shoulders, Closed Heart",
        title: "Cold Shoulders, Closed Heart",
        artist: "Adit",
        album: "Woolwich to Brixton",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Woolwich%20to%20Brixton/Cold%20Shoulders%2C%20Closed%20Heart.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Woolwich%20to%20Brixton/Woolwich%20To%20Brixton.png",
      },
      {
        id: "Ice on Quiet Roads",
        title: "Ice on Quiet Roads",
        artist: "Adit",
        album: "Woolwich to Brixton",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Woolwich%20to%20Brixton/Ice%20on%20Quiet%20Roads.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Woolwich%20to%20Brixton/Woolwich%20To%20Brixton.png",
      }
    ]
  },
  {
    id: "2 A.M. With Her",
    title: "2 A.M. With Her",
    artist: "Adit",
    coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/2%20A.M.%20With%20Her/2am.jpeg",
    releaseYear: "2026",
    songs: [
      {
        id: "2 A.M. On Your Street",
        title: "2 A.M. On Your Street",
        artist: "Adit",
        album: "2 A.M. With Her",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/2%20A.M.%20With%20Her/2%20A.M.%20On%20Your%20Street.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/2%20A.M.%20With%20Her/2am.jpeg",
      },
      {
        id: "Don't make me one of the girls",
        title: "Don't make me one of the girls",
        artist: "Adit",
        album: "2 A.M. With Her",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/2%20A.M.%20With%20Her/Don't%20make%20me%20one%20of%20the%20girls.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/2%20A.M.%20With%20Her/2am.jpeg",
      },
      {
        id: "Under My Skin",
        title: "Under My Skin",
        artist: "Adit",
        album: "2 A.M. With Her",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/2%20A.M.%20With%20Her/Under%20My%20Skin.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/2%20A.M.%20With%20Her/2am.jpeg",
      },
      {
        id: "Lose Myself In You",
        title: "Lose Myself In You",
        artist: "Adit",
        album: "2 A.M. With Her",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/2%20A.M.%20With%20Her/Lose%20Myself%20In%20You.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/2%20A.M.%20With%20Her/2am.jpeg",
      },
      {
        id: "No More Daylight",
        title: "No More Daylight",
        artist: "Adit",
        album: "2 A.M. With Her",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/2%20A.M.%20With%20Her/No%20More%20Daylight.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/2%20A.M.%20With%20Her/2am.jpeg",
      },
      {
        id: "Late Night Edges",
        title: "Late Night Edges",
        artist: "Adit",
        album: "2 A.M. With Her",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/2%20A.M.%20With%20Her/Late%20Night%20Edges.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/2%20A.M.%20With%20Her/2am.jpeg",
      },
      {
        id: "Safe With You",
        title: "Safe With You",
        artist: "Adit",
        album: "2 A.M. With Her",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/2%20A.M.%20With%20Her/Safe%20With%20You.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/2%20A.M.%20With%20Her/2am.jpeg",
      },
      {
        id: "After the Lights Go Out",
        title: "After the Lights Go Out",
        artist: "Adit",
        album: "2 A.M. With Her",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/2%20A.M.%20With%20Her/After%20the%20Lights%20Go%20Out.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/2%20A.M.%20With%20Her/2am.jpeg",
      }
    ]
  },
  {
    id: "Still in Silence",
    title: "Still in Silence",
    artist: "Adit",
    coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Still%20in%20Silence/Still%20in%20Silence.jpg",
    releaseYear: "2025",
    type: "Single",
    songs: [
      {
        id: "Still in Silence",
        title: "Still in Silence",
        artist: "Adit",
        album: "Still in Silence",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Still%20in%20Silence/Still%20in%20Silence.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Still%20in%20Silence/Still%20in%20Silence.jpg",
      }
    ]
  }
];
