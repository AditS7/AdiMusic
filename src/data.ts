export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  audioUrl: string;
  duration?: string;
  coverUrl: string;
  canvasUrl?: string;
  lyrics?: string;
  lyricsUrl?: string;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  releaseYear: string;
  songs: Song[];
  type?: 'Album' | 'Single';
  canvasUrl?: string;
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
        lyricsUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/lyrics/Woolwich%20to%20Brixton/London%20raised%20me.txt"
      },
      {
        id: "Cold In The Ends",
        title: "Cold In The Ends",
        artist: "Adit",
        album: "Woolwich to Brixton",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Woolwich%20to%20Brixton/Cold%20In%20The%20Ends.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Woolwich%20to%20Brixton/Woolwich%20To%20Brixton.png",
        lyricsUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/lyrics/Woolwich%20to%20Brixton/Cold%20in%20the%20ends.txt"
      },
      {
        id: "Off These Chains",
        title: "Off These Chains",
        artist: "Adit",
        album: "Woolwich to Brixton",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Woolwich%20to%20Brixton/Off%20These%20Chains.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Woolwich%20to%20Brixton/Woolwich%20To%20Brixton.png",
        lyricsUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/lyrics/Woolwich%20to%20Brixton/off%20these%20chains.txt"
      },
      {
        id: "Late Shift Profits",
        title: "Late Shift Profits",
        artist: "Adit",
        album: "Woolwich to Brixton",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Woolwich%20to%20Brixton/Late%20Shift%20Profits.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Woolwich%20to%20Brixton/Woolwich%20To%20Brixton.png",
        lyricsUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/lyrics/Woolwich%20to%20Brixton/Late%20shift%20profit.txt"
      },
      {
        id: "South of the River Riddim",
        title: "South of the River Riddim",
        artist: "Adit",
        album: "Woolwich to Brixton",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Woolwich%20to%20Brixton/South%20of%20the%20River%20Riddim.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Woolwich%20to%20Brixton/Woolwich%20To%20Brixton.png",
        lyricsUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/lyrics/Woolwich%20to%20Brixton/South%20of%20the%20river%20riddim.txt"
      },
      {
        id: "Cold Shoulders, Closed Heart",
        title: "Cold Shoulders, Closed Heart",
        artist: "Adit",
        album: "Woolwich to Brixton",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Woolwich%20to%20Brixton/Cold%20Shoulders%2C%20Closed%20Heart.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Woolwich%20to%20Brixton/Woolwich%20To%20Brixton.png",
        lyricsUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/lyrics/Woolwich%20to%20Brixton/Cold%20Shoulders%2C%20Closed%20Heart.txt"
      },
      {
        id: "Ice on Quiet Roads",
        title: "Ice on Quiet Roads",
        artist: "Adit",
        album: "Woolwich to Brixton",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Woolwich%20to%20Brixton/Ice%20on%20Quiet%20Roads.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Woolwich%20to%20Brixton/Woolwich%20To%20Brixton.png",
        lyricsUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/lyrics/Woolwich%20to%20Brixton/ice%20on%20quiet%20road.txt"
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
        lyricsUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/lyrics/2%20A.M.%20With%20Her/2%20a.m.%20on%20your%20street.txt",
      },
      {
        id: "Don't make me one of the girls",
        title: "Don't make me one of the girls",
        artist: "Adit",
        album: "2 A.M. With Her",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/2%20A.M.%20With%20Her/Don't%20make%20me%20one%20of%20the%20girls.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/2%20A.M.%20With%20Her/2am.jpeg",
        lyricsUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/lyrics/2%20A.M.%20With%20Her/Don't%20make%20me%20one%20of%20the%20girls.txt",
      },
      {
        id: "Under My Skin",
        title: "Under My Skin",
        artist: "Adit",
        album: "2 A.M. With Her",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/2%20A.M.%20With%20Her/Under%20My%20Skin.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/2%20A.M.%20With%20Her/2am.jpeg",
        lyricsUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/lyrics/2%20A.M.%20With%20Her/Under%20the%20skin.txt",
      },
      {
        id: "Lose Myself In You",
        title: "Lose Myself In You",
        artist: "Adit",
        album: "2 A.M. With Her",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/2%20A.M.%20With%20Her/Lose%20Myself%20In%20You.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/2%20A.M.%20With%20Her/2am.jpeg",
        lyricsUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/lyrics/2%20A.M.%20With%20Her/Lose%20myself%20in%20you.txt",
      },
      {
        id: "No More Daylight",
        title: "No More Daylight",
        artist: "Adit",
        album: "2 A.M. With Her",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/2%20A.M.%20With%20Her/No%20More%20Daylight.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/2%20A.M.%20With%20Her/2am.jpeg",
        lyricsUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/lyrics/2%20A.M.%20With%20Her/No%20More%20Daylight.txt",
      },
      {
        id: "Late Night Edges",
        title: "Late Night Edges",
        artist: "Adit",
        album: "2 A.M. With Her",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/2%20A.M.%20With%20Her/Late%20Night%20Edges.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/2%20A.M.%20With%20Her/2am.jpeg",
        lyricsUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/lyrics/2%20A.M.%20With%20Her/Late%20night%20edges.txt",
      },
      {
        id: "Safe With You",
        title: "Safe With You",
        artist: "Adit",
        album: "2 A.M. With Her",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/2%20A.M.%20With%20Her/Safe%20With%20You.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/2%20A.M.%20With%20Her/2am.jpeg",
        lyricsUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/lyrics/2%20A.M.%20With%20Her/Safe%20with%20you.txt",
      },
      {
        id: "After the Lights Go Out",
        title: "After the Lights Go Out",
        artist: "Adit",
        album: "2 A.M. With Her",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/2%20A.M.%20With%20Her/After%20the%20Lights%20Go%20Out.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/2%20A.M.%20With%20Her/2am.jpeg",
        lyricsUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/lyrics/2%20A.M.%20With%20Her/After%20the%20lights%20go%20out.txt",
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
        lyricsUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/lyrics/Still%20in%20Silence.txt",
      }
    ]
  },
  {
    id: "All or Nothing",
    title: "All or Nothing",
    artist: "Adit",
    coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/All%20Or%20Nothing/All%20or%20Nothing.jpg",
    releaseYear: "2025",
    type: "Album",
    songs: [
      {
        id: "Song of a breaking heart",
        title: "Song of a breaking heart",
        artist: "Adit",
        album: "All or Nothing",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/All%20Or%20Nothing/Song%20of%20a%20breaking%20heart.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/All%20Or%20Nothing/All%20or%20Nothing.jpg",
        lyricsUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/lyrics/All%20or%20Nothing/song%20of%20a%20breaking%20heart.txt",
      },
      {
        id: "I Will Take It All",
        title: "I Will Take It All",
        artist: "Adit",
        album: "All or Nothing",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/All%20Or%20Nothing/I%20Will%20Take%20It%20All.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/All%20Or%20Nothing/All%20or%20Nothing.jpg",
        lyricsUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/lyrics/All%20or%20Nothing/I%20will%20take%20it%20all.txt",
      },
      {
        id: "Far Apart",
        title: "Far Apart",
        artist: "Adit",
        album: "All or Nothing",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/All%20Or%20Nothing/Far%20Apart.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/All%20Or%20Nothing/All%20or%20Nothing.jpg",
        lyricsUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/lyrics/All%20or%20Nothing/Far%20apart.txt",
      },
      {
        id: "Lighting Up the Heavens",
        title: "Lighting Up the Heavens",
        artist: "Adit",
        album: "All or Nothing",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/All%20Or%20Nothing/Lighting%20Up%20the%20Heavens.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/All%20Or%20Nothing/All%20or%20Nothing.jpg",
        lyricsUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/lyrics/All%20or%20Nothing/lighting%20up%20the%20heavens.txt",
      },
      {
        id: "Underneath the Neon Glow",
        title: "Underneath the Neon Glow",
        artist: "Adit",
        album: "All or Nothing",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/All%20Or%20Nothing/Underneath%20the%20Neon%20Glow.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/All%20Or%20Nothing/All%20or%20Nothing.jpg",
        lyricsUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/lyrics/All%20or%20Nothing/Underneath%20the%20neon%20glow.txt",
      },
      {
        id: "Between Love and Rejection",
        title: "Between Love and Rejection",
        artist: "Adit",
        album: "All or Nothing",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/All%20Or%20Nothing/Between%20Love%20and%20Rejection.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/All%20Or%20Nothing/All%20or%20Nothing.jpg",
        lyricsUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/lyrics/All%20or%20Nothing/between%20love%20and%20rejection.txt",
      },
      {
        id: "Set me alive",
        title: "Set me alive",
        artist: "Adit",
        album: "All or Nothing",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/All%20Or%20Nothing/Set%20me%20alive.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/All%20Or%20Nothing/All%20or%20Nothing.jpg",
        lyricsUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/lyrics/All%20or%20Nothing/Set%20me%20alive.txt"
      }
    ]
  },
  {
    id: "Eternal Flame",
    title: "Eternal Flame",
    artist: "Adit",
    coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Eternal%20Flame/Eternal%20Flame.jpg",
    releaseYear: "2025",
    type: "Single",
    songs: [
      {
        id: "Eternal Flame",
        title: "Eternal Flame",
        artist: "Adit",
        album: "Eternal Flame",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Eternal%20Flame/Eternal%20Flame.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Eternal%20Flame/Eternal%20Flame.jpg",
        lyricsUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/lyrics/Eternal%20Flame.txt",
      }
    ]
  },
  {
    id: "Celestial Blaze",
    title: "Celestial Blaze",
    artist: "Adit",
    coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Celestial%20Blaze/Celestial%20Blaze.jpg",
    releaseYear: "2025",
    type: "Album",
    canvasUrl: "/celestial blaze.mp4",
    songs: [
      {
        id: "Alone Together",
        title: "Alone Together",
        artist: "Adit",
        album: "Celestial Blaze",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Celestial%20Blaze/Alone%20Together.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Celestial%20Blaze/Celestial%20Blaze.jpg",
        lyricsUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/lyrics/Celestial%20Blaze/Alone%20together.txt",
        canvasUrl: "/celestial blaze.mp4",
      },
      {
        id: "Follow You Anywhere",
        title: "Follow You Anywhere",
        artist: "Adit",
        album: "Celestial Blaze",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Celestial%20Blaze/Follow%20You%20Anywhere.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Celestial%20Blaze/Celestial%20Blaze.jpg",
        lyricsUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/lyrics/Celestial%20Blaze/Follow%20you%20anywhere.txt",
        canvasUrl: "/celestial blaze.mp4",
      },
      {
        id: "The Devil in Disguise",
        title: "The Devil in Disguise",
        artist: "Adit",
        album: "Celestial Blaze",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Celestial%20Blaze/The%20Devil%20in%20Disguise.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Celestial%20Blaze/Celestial%20Blaze.jpg",
        lyricsUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/lyrics/Celestial%20Blaze/The%20Devil%20in%20Disguise.txt",
        canvasUrl: "/celestial blaze.mp4",
      },
      {
        id: "Somewhere between",
        title: "Somewhere between",
        artist: "Adit",
        album: "Celestial Blaze",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Celestial%20Blaze/Somewhere%20between.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Celestial%20Blaze/Celestial%20Blaze.jpg",
        lyricsUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/lyrics/Celestial%20Blaze/Somewhere%20between.txt",
        canvasUrl: "/celestial blaze.mp4",
      },
      {
        id: "Fading Light",
        title: "Fading Light",
        artist: "Adit",
        album: "Celestial Blaze",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Celestial%20Blaze/Fading%20Light.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Celestial%20Blaze/Celestial%20Blaze.jpg",
        lyricsUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/lyrics/Celestial%20Blaze/Fading%20light.txt",
        canvasUrl: "/celestial blaze.mp4",
      },
      {
        id: "Leaving All Behind",
        title: "Leaving All Behind",
        artist: "Adit",
        album: "Celestial Blaze",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Celestial%20Blaze/Leaving%20All%20Behind.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Celestial%20Blaze/Celestial%20Blaze.jpg",
        lyricsUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/lyrics/Celestial%20Blaze/Leaving%20all%20behind.txt",
        canvasUrl: "/celestial blaze.mp4",
      },
      {
        id: "Where You Used To Be",
        title: "Where You Used To Be",
        artist: "Adit",
        album: "Celestial Blaze",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Celestial%20Blaze/Where%20You%20Used%20To%20Be.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Celestial%20Blaze/Celestial%20Blaze.jpg",
        lyricsUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/lyrics/Celestial%20Blaze/Where%20you%20used%20to%20be.txt",
        canvasUrl: "/celestial blaze.mp4",
      },
      {
        id: "The Chosen One",
        title: "The Chosen One",
        artist: "Adit",
        album: "Celestial Blaze",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Celestial%20Blaze/The%20Chosen%20One.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Celestial%20Blaze/Celestial%20Blaze.jpg",
        lyricsUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/lyrics/Celestial%20Blaze/The%20chosen%20one.txt",
        canvasUrl: "/celestial blaze.mp4",
      },
      {
        id: "I Won't Let Go",
        title: "I Won't Let Go",
        artist: "Adit",
        album: "Celestial Blaze",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Celestial%20Blaze/I%20Won't%20Let%20Go.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Celestial%20Blaze/Celestial%20Blaze.jpg",
        lyricsUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/lyrics/Celestial%20Blaze/I%20won't%20let%20go.txt",
        canvasUrl: "/celestial blaze.mp4",
      },
      {
        id: "Fade Into the Blue",
        title: "Fade Into the Blue",
        artist: "Adit",
        album: "Celestial Blaze",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Celestial%20Blaze/Fade%20Into%20the%20Blue.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Celestial%20Blaze/Celestial%20Blaze.jpg",
        lyricsUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/lyrics/Celestial%20Blaze/Fade%20into%20the%20blue.txt",
        canvasUrl: "/celestial blaze.mp4",
      },
      {
        id: "Velvet Rain",
        title: "Velvet Rain",
        artist: "Adit",
        album: "Celestial Blaze",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Celestial%20Blaze/Velvet%20Rain.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Celestial%20Blaze/Celestial%20Blaze.jpg",
        lyricsUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/lyrics/Celestial%20Blaze/Velvet%20rain.txt",
        canvasUrl: "/celestial blaze.mp4",
      },
      {
        id: "Your Truths are Lies",
        title: "Your Truths are Lies",
        artist: "Adit",
        album: "Celestial Blaze",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Celestial%20Blaze/Your%20Truths%20are%20Lies.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Celestial%20Blaze/Celestial%20Blaze.jpg",
        lyricsUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/lyrics/Celestial%20Blaze/Your%20truth%20are%20lies.txt",
        canvasUrl: "/celestial blaze.mp4",
      },
      {
        id: "Neon Dreams",
        title: "Neon Dreams",
        artist: "Adit",
        album: "Celestial Blaze",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Celestial%20Blaze/Neon%20Dreams.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Celestial%20Blaze/Celestial%20Blaze.jpg",
        lyricsUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/lyrics/Celestial%20Blaze/Neon%20Dreams.txt",
        canvasUrl: "/celestial blaze.mp4",
      },
      {
        id: "Into the Nightfall",
        title: "Into the Nightfall",
        artist: "Adit",
        album: "Celestial Blaze",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Celestial%20Blaze/Into%20the%20Nightfall.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Celestial%20Blaze/Celestial%20Blaze.jpg",
        lyricsUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/lyrics/Celestial%20Blaze/Into%20the%20nightfall.txt",
        canvasUrl: "/celestial blaze.mp4",
      },
      {
        id: "I Will Walk With You",
        title: "I Will Walk With You",
        artist: "Adit",
        album: "Celestial Blaze",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Celestial%20Blaze/I%20Will%20Walk%20With%20You.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Celestial%20Blaze/Celestial%20Blaze.jpg",
        lyricsUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/lyrics/Celestial%20Blaze/i%20will%20walk%20with%20you.txt",
        canvasUrl: "/celestial blaze.mp4",
      },
      {
        id: "Lost Without Your Light",
        title: "Lost Without Your Light",
        artist: "Adit",
        album: "Celestial Blaze",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Celestial%20Blaze/Lost%20Without%20Your%20Light.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Celestial%20Blaze/Celestial%20Blaze.jpg",
        lyricsUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/lyrics/Celestial%20Blaze/Lost%20without%20your%20light.txt",
        canvasUrl: "/celestial blaze.mp4",
      },
      {
        id: "Unstoppable Heart",
        title: "Unstoppable Heart",
        artist: "Adit",
        album: "Celestial Blaze",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Celestial%20Blaze/Unstoppable%20Heart.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Celestial%20Blaze/Celestial%20Blaze.jpg",
        lyricsUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/lyrics/Celestial%20Blaze/Unstoppable%20Heart.txt",
        canvasUrl: "/celestial blaze.mp4",
      },
      {
        id: "Don't Let Me Fade Away",
        title: "Don't Let Me Fade Away",
        artist: "Adit",
        album: "Celestial Blaze",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Celestial%20Blaze/Don%E2%80%99t%20Let%20Me%20Fade%20Away.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Celestial%20Blaze/Celestial%20Blaze.jpg",
        lyricsUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/lyrics/Celestial%20Blaze/Don't%20let%20me%20fade%20away.txt",
        canvasUrl: "/celestial blaze.mp4",
      },
      {
        id: "Phantom of Tomorrow",
        title: "Phantom of Tomorrow",
        artist: "Adit",
        album: "Celestial Blaze",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Celestial%20Blaze/Phantom%20of%20Tomorrow.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Celestial%20Blaze/Celestial%20Blaze.jpg",
        lyricsUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/lyrics/Celestial%20Blaze/Phantom%20of%20Tomorrow.txt",
        canvasUrl: "/celestial blaze.mp4",
      }
    ]
  },
  {
    id: "Mr. Fahrenheit",
    title: "Mr. Fahrenheit",
    artist: "Adit",
    coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Mr.%20Fahrenheit/Mr.%20Fahrenheit.png",
    releaseYear: "2025",
    type: "Single",
    canvasUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Mr.%20Fahrenheit/Mr.%20Fahrenheit.mp4",
    songs: [
      {
        id: "Mr. Fahrenheit",
        title: "Mr. Fahrenheit",
        artist: "Adit",
        album: "Mr. Fahrenheit",
        audioUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Mr.%20Fahrenheit/Mr.%20Fahrenheit.mp3",
        coverUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Mr.%20Fahrenheit/Mr.%20Fahrenheit.png",
        canvasUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/Mr.%20Fahrenheit/Mr.%20Fahrenheit.mp4",
        lyricsUrl: "https://pub-6003e25bc91a40379fa70d99357abd1c.r2.dev/lyrics/Mr.%20Fahrenheit.txt",
      }
    ]
  }
];
