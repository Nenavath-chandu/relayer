# Reality Layer 🧠

> **AI-Powered Misinformation Detection Platform**  
> Built with Google Gemini (multimodal AI), FastAPI, and React.

Reality Layer analyzes text, images, and videos to detect fake news, misleading content, and AI-generated media — then breaks it down claim-by-claim with a 0-100 Credibility Score.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔍 **AI Fact-Checking** | Powered by Google Gemini 2.5 Flash with live internet search grounding |
| 📊 **Reality Score** | Animated 0-100 credibility ring with color coding |
| 🧬 **X-Ray Analysis** | Breaks content into individual claims and fact-checks each one |
| 🖼️ **Image/Video Detection** | Upload media to detect AI-generated artifacts |
| 🌍 **Regional News Feed** | Live verified news by World / India / State / City |
| 🚨 **Fake News Radar** | Shows top viral fake stories debunked in your area |
| 📱 **Shorts Checker** | Fact-check viral reels and YouTube Shorts |
| 📄 **PDF Export** | Download a professional Intelligence Brief of any result |

---

## 🚀 Quick Start

### 1. Clone the project
```bash
git clone https://github.com/YOUR_USERNAME/reality-layer.git
cd reality-layer
```

### 2. Set up the Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
```

**Create your environment file:**
```bash
copy .env.example .env
```
Then open `backend/.env` and fill in your API keys (see below).

**Start the backend:**
```bash
uvicorn main:app --reload --host 0.0.0.0
```

### 3. Set up the Frontend

```bash
cd ..              # back to project root
npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## 🔑 API Keys (Where to Get Them)

All keys go in `backend/.env`. The file already has examples — just replace the placeholder values.

| Key | Required? | What it does | Get it free |
|---|---|---|---|
| `GEMINI_API_KEY` | ✅ **Yes** | Powers all AI analysis | [aistudio.google.com](https://aistudio.google.com/app/apikey) |
| `NEWS_API_KEY` | ⚠️ Optional | Live news on Home screen (otherwise shows demo data) | [newsapi.org/register](https://newsapi.org/register) |
| `GOOGLE_FACTCHECK_KEY` | ⚠️ Optional | Cross-references journalist fact-check databases | [console.cloud.google.com](https://console.cloud.google.com) → Enable "Fact Check Tools API" |

---

## 🏗️ Tech Stack

**Backend:** Python · FastAPI · Google Gemini 2.5 Flash · NewsAPI · Google Fact Check Tools  
**Frontend:** React (Vite) · Vanilla CSS

---

## 📁 Project Structure

```
reality-layer/
├── backend/
│   ├── main.py          ← FastAPI server + all AI logic
│   ├── .env             ← Your API keys (NOT committed to GitHub)
│   ├── .env.example     ← Template showing what keys to add
│   └── requirements.txt
├── src/
│   ├── screens/
│   │   ├── FeedScreen.jsx      ← Home: regional news + fake news radar
│   │   ├── AnalyzeScreen.jsx   ← Check: text/image/video/reel analyzer
│   │   ├── ExploreScreen.jsx   ← Explore: regional misinformation map
│   │   ├── ShortsScreen.jsx    ← Shorts: viral reel fact-checker
│   │   ├── DetailScreen.jsx    ← Results: intelligence dashboard
│   │   └── HistoryScreen.jsx   ← Past analyses
│   ├── data/
│   │   ├── mockData.js         ← Demo data used when APIs are offline
│   │   └── history.js          ← localStorage history manager
│   └── styles/app.css
└── package.json
```

---

## 🌐 Deployment

### Frontend → Vercel (Free)
1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import repo
3. Done! You get a live URL like `reality-layer.vercel.app`

### Backend → Railway (Free $5/month credit)
1. Go to [railway.app](https://railway.app) → New Project → Deploy from repo
2. Set **Root Directory** to `backend/`
3. Add your environment variables in Railway's dashboard
4. Update the API base URL in `src/screens/FeedScreen.jsx` and `src/screens/AnalyzeScreen.jsx` to point to your Railway URL

---

## 📝 License
MIT — Free to use, modify, and distribute.
