# 🚀 Deployment Guide — Reality Layer

Follow these steps to deploy your full-stack AI platform to the web.

---

## 1. Backend Deployment (FastAPI)
We recommend **Render** or **Railway** for the backend.

### Steps for Render:
1.  **Create a New Web Service**: Link your GitHub repository.
2.  **Root Directory**: `backend`
3.  **Environment**: `Docker` (Render will automatically detect the `Dockerfile`).
4.  **Environment Variables**: Add the following in the "Env Vars" section:
    - `GEMINI_API_KEY`: Your Google AI Studio key.
    - `NEWS_API_KEY`: Your NewsAPI key.
    - `GOOGLE_FACTCHECK_KEY`: Your Google Fact Check API key.
5.  **Deploy**: Render will build the Docker container and give you a URL (e.g., `https://reality-layer-api.onrender.com`).

---

## 2. Frontend Deployment (React + Vite)
We recommend **Vercel** or **Netlify** for the frontend.

### Steps for Vercel:
1.  **Create a New Project**: Link your GitHub repository.
2.  **Framework Preset**: Select `Vite`.
3.  **Root Directory**: `./` (the root of the repo).
4.  **Environment Variables**: Add the following:
    - `VITE_API_URL`: The URL of your deployed backend (from Step 1).
      *Example: `https://reality-layer-api.onrender.com`*
5.  **Deploy**: Vercel will build the project and give you a public URL (e.g., `https://reality-layer.vercel.app`).

---

## 3. Post-Deployment Checks
- **CORS**: The backend is currently configured to allow all origins (`allow_origins=["*"]`). For better security, once you have your Vercel URL, update `backend/main.py` to only allow that specific domain.
- **SSL**: Both Render and Vercel provide automatic SSL (HTTPS), which is required for features like camera and microphone access.

---

## 🛠️ Local Testing with Environment Variables
To test the production-ready code locally:
1. Create a `.env.local` file in the root directory.
2. Add `VITE_API_URL=http://localhost:8000`.
3. Run `npm run dev`.

---

> [!TIP]
> **Pro Tip**: If your backend goes to "sleep" on a free tier (like Render), the first request might take 30-60 seconds. Consider a "Starter" plan if you need instant response times.