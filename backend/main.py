"""
=============================================================
  REALITY LAYER — Backend API  (FastAPI + Google Gemini)
=============================================================

HOW TO SET UP YOUR API KEYS
─────────────────────────────────────────────────────────────
All keys go in the  backend/.env  file (NEVER commit this file).
See backend/.env.example for the template.

  1. GEMINI_API_KEY    → https://aistudio.google.com/app/apikey
                          (free, no credit card needed)

  2. NEWS_API_KEY      → https://newsapi.org/register
                          (free tier: 100 requests/day, enough for demos)

  3. GOOGLE_FACTCHECK_KEY → https://console.cloud.google.com
                              Enable "Fact Check Tools API", then
                              create an API key under Credentials.
                              (100% free, no billing needed)

─────────────────────────────────────────────────────────────
"""

from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from google import genai
from google.genai import types
import os, shutil, time, json, requests
from dotenv import load_dotenv

load_dotenv()

# ─── App Setup ────────────────────────────────────────────────────────────────
app = FastAPI(title="Reality Layer API", version="2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          # Restrict to your domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── API Key Setup ─────────────────────────────────────────────────────────────
# ① Put your Gemini key in backend/.env as:  GEMINI_API_KEY=your_key_here
GEMINI_KEY       = os.getenv("GEMINI_API_KEY")

# ② Put your NewsAPI key in backend/.env as:  NEWS_API_KEY=your_key_here
NEWS_API_KEY     = os.getenv("NEWS_API_KEY")

# ③ Put your Google Fact Check API key in backend/.env as:  GOOGLE_FACTCHECK_KEY=your_key_here
FACTCHECK_KEY    = os.getenv("GOOGLE_FACTCHECK_KEY")

client = genai.Client()           # Automatically picks up GEMINI_API_KEY from env

# ─── Startup Log ──────────────────────────────────────────────────────────────
print("─── Reality Layer API Starting ───")
print(f"  {'✅' if GEMINI_KEY    else '❌'}  Gemini AI         {'(ready)' if GEMINI_KEY    else '← Add GEMINI_API_KEY to backend/.env'}")
print(f"  {'✅' if NEWS_API_KEY  else '⚠️ '}  NewsAPI           {'(ready)' if NEWS_API_KEY  else '← Add NEWS_API_KEY to backend/.env  (newsapi.org)'}")
print(f"  {'✅' if FACTCHECK_KEY else '⚠️ '}  Google FactCheck  {'(ready)' if FACTCHECK_KEY else '← Add GOOGLE_FACTCHECK_KEY to backend/.env'}")
print("──────────────────────────────────")

# ──────────────────────────────────────────────────────────────────────────────
# ENDPOINT 1 — Health Check
# ──────────────────────────────────────────────────────────────────────────────
@app.get("/")
def root():
    return {
        "status": "Reality Layer API is running 🚀",
        "gemini_ready":    bool(GEMINI_KEY),
        "newsapi_ready":   bool(NEWS_API_KEY),
        "factcheck_ready": bool(FACTCHECK_KEY),
    }


# ──────────────────────────────────────────────────────────────────────────────
# ENDPOINT 2 — AI Analysis  (text / image / video)
# ──────────────────────────────────────────────────────────────────────────────
@app.post("/analyze")
def analyze(text: str = Form(None), file: UploadFile = File(None)):
    """
    Accepts:
      - text  (str, optional) — claim, headline, URL, or social media post
      - file  (UploadFile, optional) — image (.jpg/.png) or video (.mp4/.mov)
    Returns:
      JSON with: label, trust_score, verdict_short, reasoning,
                 analysis_breakdown, x_ray_claims
    """
    temp_file_path = None
    gemini_file    = None
    try:
        contents = []

        # ① If a file was uploaded — send it to Gemini File API
        if file and file.filename:
            temp_file_path = f"temp_{file.filename}"
            with open(temp_file_path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)

            print(f"📤 Uploading {file.filename} to Gemini...")
            gemini_file = client.files.upload(file=temp_file_path)

            # Videos need processing time
            if file.content_type and "video" in file.content_type.lower():
                print("⏳ Waiting for Gemini to process video...")
                while gemini_file.state.name == "PROCESSING":
                    time.sleep(2)
                    gemini_file = client.files.get(name=gemini_file.name)

            contents.append(gemini_file)

        # ② If text was provided — add it to the multimodal input
        if text and text.strip():
            # Step A: Pre-check using Google Fact Check API (if key exists)
            factcheck_context = ""
            if FACTCHECK_KEY:
                factcheck_context = _query_factcheck(text)

            contents.append(
                f"Content to analyze:\n{text}"
                + (f"\n\nExisting fact-checks found:\n{factcheck_context}" if factcheck_context else "")
            )

        if not contents:
            return {"label": "EMPTY_INPUT", "trust_score": 0,
                    "verdict_short": "No content provided", "reasoning": "Please paste text or upload a file."}

        # ③ Build the AI prompt
        prompt = """
You are an elite Cyber-Intelligence fact-checking and media analysis engine.
Analyze the provided content (text/image/video) carefully and respond ONLY with
a valid JSON object matching this exact structure (no markdown, no extra text):

{
    "label": "FAKE | REAL | MISLEADING | AI-GENERATED | UNKNOWN",
    "trust_score": <integer 0-100 — 0=completely false, 100=fully verified>,
    "verdict_short": "One sentence summary of the verdict",
    "reasoning": "Detailed professional explanation of the verdict",
    "analysis_breakdown": {
        "rhetorical_bias": "Describe emotional tone or political bias",
        "logical_fallacies": ["Fallacy 1", "Fallacy 2"],
        "manipulation_tactics": ["Tactic 1", "Tactic 2"]
    },
    "x_ray_claims": [
        {
            "claim": "A specific factual claim or visual artifact",
            "verdict": "TRUE | FALSE | UNVERIFIED | AI-ARTIFACT",
            "correction": "The real truth or technical explanation"
        }
    ]
}
"""
        contents.append(prompt)

        # ④ Call Gemini with Google Search grounding for live fact-checking
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=contents,
            config=types.GenerateContentConfig(
                temperature=0.0,
                tools=[{"google_search": {}}]   # Live web search grounding
            )
        )

        if not response.text:
            return {"label": "UNKNOWN", "trust_score": 0,
                    "verdict_short": "No response from AI", "reasoning": "Gemini returned an empty response."}

        # ⑤ Parse the JSON response
        clean = response.text.strip()
        if clean.startswith("```json"):
            clean = clean[7:]
        elif clean.startswith("```"):
            clean = clean[3:]
        if clean.endswith("```"):
            clean = clean[:-3]

        return json.loads(clean.strip())

    except Exception as e:
        print(f"❌ Error in /analyze: {e}")
        return {
            "label": "ERROR", "trust_score": 0,
            "verdict_short": "Analysis failed",
            "reasoning": str(e),
            "analysis_breakdown": {"rhetorical_bias": "N/A", "logical_fallacies": [], "manipulation_tactics": []},
            "x_ray_claims": []
        }
    finally:
        if temp_file_path and os.path.exists(temp_file_path):
            os.remove(temp_file_path)
        if gemini_file:
            try:
                client.files.delete(name=gemini_file.name)
            except Exception:
                pass


# ──────────────────────────────────────────────────────────────────────────────
# ENDPOINT 3 — Live News Feed
# Requires: NEWS_API_KEY in backend/.env
# Get free key at: https://newsapi.org/register
# ──────────────────────────────────────────────────────────────────────────────
COUNTRY_MAP = {
    "world":  ("", "general"),          # Top global headlines
    "india":  ("in", "general"),         # India top headlines
    "state":  ("in", "technology"),      # Fallback: India tech/local
    "city":   ("in", "health"),          # Fallback: India health/local
}

@app.get("/news")
def get_news(region: str = "india"):
    """
    Returns live news headlines for the given region.
    Falls back to mock data if NEWS_API_KEY is not set.

    Usage: GET /news?region=india
    Regions: world, india, state, city
    """
    if not NEWS_API_KEY:
        return {
            "status": "api_key_missing",
            "message": "Add NEWS_API_KEY to backend/.env (free at newsapi.org)",
            "articles": []
        }

    try:
        country, category = COUNTRY_MAP.get(region, ("in", "general"))
        params = {
            "apiKey": NEWS_API_KEY,
            "pageSize": 10,
            "language": "en",
        }
        if country:
            params["country"] = country
            params["category"] = category
            url = "https://newsapi.org/v2/top-headlines"
        else:
            params["q"] = "world news"
            url = "https://newsapi.org/v2/everything"

        resp = requests.get(url, params=params, timeout=8)
        data = resp.json()

        if data.get("status") != "ok":
            return {"status": "api_error", "message": data.get("message", "Unknown error"), "articles": []}

        articles = [
            {
                "id":        a.get("url", str(i)),
                "headline":  a.get("title", ""),
                "summary":   a.get("description", ""),
                "source":    a.get("source", {}).get("name", "Unknown"),
                "url":       a.get("url", ""),
                "image":     a.get("urlToImage", ""),
                "timeAgo":   a.get("publishedAt", "")[:10],
                "trust_score": 85,   # NewsAPI sources are verified publishers
            }
            for i, a in enumerate(data.get("articles", []))
            if a.get("title") and "[Removed]" not in a.get("title", "")
        ]
        return {"status": "ok", "region": region, "articles": articles}

    except Exception as e:
        print(f"❌ Error in /news: {e}")
        return {"status": "error", "message": str(e), "articles": []}


# ──────────────────────────────────────────────────────────────────────────────
# ENDPOINT 4 — Google Fact Check Lookup
# Requires: GOOGLE_FACTCHECK_KEY in backend/.env
# Get free key at: https://console.cloud.google.com → Enable "Fact Check Tools API"
# ──────────────────────────────────────────────────────────────────────────────
@app.get("/factcheck")
def factcheck_search(query: str):
    """
    Searches Google's Fact Check Tools API database of journalist fact-checks.
    Usage: GET /factcheck?query=your+claim+here
    """
    if not FACTCHECK_KEY:
        return {
            "status": "api_key_missing",
            "message": "Add GOOGLE_FACTCHECK_KEY to backend/.env (free at console.cloud.google.com)",
            "claims": []
        }
    result = _query_factcheck(query)
    return {"status": "ok", "results": result}


def _query_factcheck(query: str) -> str:
    """Internal helper: queries Google Fact Check API and returns a formatted string."""
    if not FACTCHECK_KEY:
        return ""
    try:
        resp = requests.get(
            "https://factchecktools.googleapis.com/v1alpha1/claims:search",
            params={"query": query, "key": FACTCHECK_KEY, "pageSize": 3},
            timeout=5
        )
        data = resp.json()
        claims = data.get("claims", [])
        if not claims:
            return ""

        lines = []
        for c in claims:
            reviews = c.get("claimReview", [{}])
            review  = reviews[0] if reviews else {}
            lines.append(
                f"• Claim: {c.get('text', '')}\n"
                f"  Verdict: {review.get('textualRating', 'N/A')}\n"
                f"  Source: {review.get('publisher', {}).get('name', 'Unknown')}"
            )
        return "\n".join(lines)
    except Exception as e:
        print(f"FactCheck API error: {e}")
        return ""