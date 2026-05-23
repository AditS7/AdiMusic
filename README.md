# 🎵 AdiMusic
A personal music streaming web app with a clean Spotify-inspired UI and real-time audio playback.

---

## Features
- 🎧 Full audio player with play/pause, skip, seek, and volume control
- 🔀 Shuffle and repeat modes (none / all / one)
- 📀 Album and song browsing with a grid layout
- 🔍 Search across albums and tracks
- 📋 Playlist / Library view
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

> **No API key required!** AdiMusic streams audio directly from Cloudflare R2 — just clone and run.

---

## Tech Stack

- **Frontend:** React 19 + TypeScript
- **Bundler:** Vite
- **Routing:** React Router v7
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Audio Hosting:** Cloudflare R2

---

## Project Structure

```
src/
├── components/
│   ├── AlbumGrid.tsx     # Home screen album grid
│   ├── AlbumDetail.tsx   # Album page with tracklist
│   ├── Player.tsx        # Audio player bar
│   ├── Search.tsx        # Search view
│   └── Library.tsx       # Playlist / library view
├── App.tsx               # Root component, routing & player state
├── data.ts               # Album and song data
└── main.tsx              # Entry point
```

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
