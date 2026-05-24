# 🎵 AdiMusic
A personal music streaming web app with a clean Spotify-inspired UI and real-time audio playback.

---

## Features
- 🎧 Full audio player with play/pause, skip, seek, volume control and spatial audio
- 🔀 Shuffle and repeat modes (none / all / one)
- 📀 Album and song browsing with a grid layout
- 🔍 Search across albums and tracks
- 📋 Playlist / Library view
- 📃 Lyrics View — View lyrics for any track
- 🔗 Deep linking — shareable URLs for songs and albums
- 🖥️ OS media session integration (lock screen controls)
- 📱 Fully responsive with mobile bottom navigation

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/adits7/AdiMusic.git
   cd AdiMusic
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.


---

## Tech Stack

- **Frontend:** React 19 + TypeScript
- **Bundler:** Vite
- **Routing:** React Router v7
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Audio & Lyrics Hosting:** Cloudflare R2


---

## Deployment

Configured for [Vercel](https://vercel.com/) via `vercel.json`. To build for production:

```bash
npm run build
```

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## License

[MIT](LICENSE)
