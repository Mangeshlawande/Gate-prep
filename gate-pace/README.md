# ⚡ GATE-Pace Web Application

This folder contains the Next.js 16 Progressive Web Application (PWA) for **GATE-Pace: 90-Day PSU Velocity Engine**.

For the complete project documentation, syllabus weightages, and 90-day blueprint, see the [Root README](../README.md).

---

## 🚀 Quick Start

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production
```bash
npm run build
npm run start
```

### Run Linter
```bash
npm run lint
```

---

## 🛠️ Tech Stack Inside `gate-pace`
- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS v4**
- **Zustand 5** (with `persist` middleware for offline-first local storage)
- **Lucide Icons**
- **Canvas Confetti**
- **Web Audio API** (in-browser synthesized audio cues and soundscapes)
- **In-Memory Graph-RAG Engine** (Vector DB + Knowledge Graph DB)

---

## 🌐 Deploy to Vercel
- When deploying the repo via Vercel Web Dashboard, set **Root Directory** to `gate-pace`.
- Or deploy via CLI: `vercel` or `vercel --prod` from within this directory.
- No environment variables required.

