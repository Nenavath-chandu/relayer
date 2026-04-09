// ─── Existing Fact-Checked Posts ────────────────────────────────────────────
export const MOCK_POSTS = [
  {
    id: '1', label: 'FAKE', trust_score: 6, platform: 'WhatsApp', timeAgo: '2 min ago',
    content: '"Drinking onion juice with hot water every morning cures dengue in 24 hours!! Share this before WhatsApp deletes it — doctors don\'t want you to know this!!"',
    verdict_short: 'Dangerous health misinformation with no medical basis',
    reasoning: 'There is no scientific or medical evidence that onion juice treats dengue fever.',
    red_flags: ['No medical citation', '"Share before WhatsApp deletes" — urgency manipulation', 'Classic viral health hoax'],
    verified_info: 'Dengue treatment: rest, fluids, paracetamol. Consult a doctor immediately.',
    x_ray_claims: [{ claim: 'Onion juice cures dengue in 24 hours', verdict: 'FALSE', correction: 'No scientific evidence exists for this claim.' }],
  },
  {
    id: '2', label: 'MISLEADING', trust_score: 41, platform: 'Twitter/X', timeAgo: '18 min ago',
    content: '"BREAKING: India\'s inflation hits a 3-year low! Economy is booming under current government policies. Share the good news! 🇮🇳"',
    verdict_short: 'Headline CPI stat is real but critical context is missing',
    reasoning: 'Post omits that food inflation — impacting most Indian households — remained elevated.',
    red_flags: ['Cherry-picks one economic indicator', 'Political framing added', 'Missing source link'],
    verified_info: 'Headline CPI moderated. However, food inflation for vegetables/pulses remained high.',
    x_ray_claims: [{ claim: 'Economy is booming', verdict: 'UNVERIFIED', correction: 'GDP growth slowed in Q2; food prices rose 8.5%.' }],
  },
  {
    id: '3', label: 'AI-GENERATED', trust_score: 13, platform: 'Facebook', timeAgo: '1 hr ago',
    content: '[Image] "Viral photo showing PM Modi and Elon Musk signing a deal at the Taj Mahal"',
    verdict_short: 'AI-generated image — no such meeting occurred',
    reasoning: 'Lighting artifacts, geometry distortions, and no credible news source confirm this.',
    red_flags: ['No credible news source', 'AI lighting artifacts', 'No EXIF metadata'],
    verified_info: 'No such meeting occurred. Image is AI-generated.',
    x_ray_claims: [{ claim: 'Modi and Musk met at the Taj Mahal', verdict: 'FALSE', correction: 'No official record or credible report of this meeting exists.' }],
  },
  {
    id: '4', label: 'REAL', trust_score: 91, platform: 'Instagram', timeAgo: '3 hr ago',
    content: '"ISRO successfully completed the Gaganyaan TV-D1 test flight — India is one step closer to sending astronauts to space! 🚀"',
    verdict_short: 'Verified — ISRO confirmed this test flight',
    reasoning: 'Confirmed by ISRO press releases and multiple credible news outlets.',
    red_flags: [], verified_info: null,
    x_ray_claims: [{ claim: 'ISRO completed Gaganyaan TV-D1 test', verdict: 'TRUE', correction: 'Officially confirmed by ISRO on Oct 21, 2023.' }],
  },
  {
    id: '5', label: 'FAKE', trust_score: 4, platform: 'WhatsApp', timeAgo: '5 hr ago',
    content: '"URGENT: New WhatsApp update will charge ₹250/month starting next week!! Forward to all contacts!!"',
    verdict_short: 'Classic WhatsApp chain hoax — completely false',
    reasoning: 'WhatsApp has been free since Facebook acquired it. This hoax has circulated since 2014.',
    red_flags: ['"URGENT: forward" — chain manipulation', 'No official source', 'Debunked multiple times since 2014'],
    verified_info: 'WhatsApp is and will remain free for personal use.',
    x_ray_claims: [{ claim: 'WhatsApp will charge ₹250/month', verdict: 'FALSE', correction: 'WhatsApp is free. No such announcement was ever made by Meta.' }],
  },
  {
    id: '6', label: 'MISLEADING', trust_score: 38, platform: 'Instagram', timeAgo: '8 hr ago',
    content: '"New study proves that eating rice daily causes diabetes!! Switch to roti immediately!!"',
    verdict_short: 'Oversimplifies nuanced nutrition research',
    reasoning: 'Some studies found associations with high refined-rice consumption. No study "proves" causation.',
    red_flags: ['"Proves" overstates correlation', 'No specific journal cited', 'Blanket recommendation ignores individual needs'],
    verified_info: 'High refined rice may increase risk but depends on portion size, diet, and genetics.',
    x_ray_claims: [{ claim: 'Rice causes diabetes', verdict: 'FALSE', correction: 'Correlation ≠ causation. Diet is complex and individual.' }],
  },
]

export const SOCIAL_FEED = [
  { 
    id: 's1', type: 'scam', domain: 'Finance', platform: 'YouTube', shares: '2.1M', user: '@TruthSeeker',
    headline: 'Elon Musk promoting new Quantum AI trading platform with guaranteed returns',
    content: 'DEEPFAKE SCAM DETECTED: Cloned audio used over stolen footage. Do not click links.',
    image: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?auto=format&fit=crop&q=80&w=800',
    severity: 'high', label: 'DEEPFAKE SCAM', trust_score: 4, isRemixable: false 
  },
  { 
    id: 's2', type: 'creative', domain: 'Art', platform: 'CreativeSpace', shares: '11K', user: '@NeonDreamer',
    headline: 'Cyberpunk Tokyo street aesthetic generated in RealTime 🌆',
    content: 'This lighting model is insane. I used the new geometry diffusion engine to create this.',
    image: 'https://images.unsplash.com/photo-1542931287-023b922fa89b?auto=format&fit=crop&q=80&w=800',
    severity: 'low', label: 'AI CREATION', trust_score: 100, isRemixable: true 
  },
  { 
    id: 's3', type: 'audio', domain: 'Scam', platform: 'WhatsApp', shares: 'Undisclosed', user: '@ScamAlerts',
    headline: 'Voice note from Bank Manager requesting immediate OTP for account securing',
    content: 'SYNTHETIC AUDIO: Voice cloning attack targeting elderly users. Banks never ask for OTPs via voice note.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
    severity: 'high', label: 'SYNTHETIC AUDIO', trust_score: 9, isRemixable: false 
  },
  { 
    id: 's4', type: 'creative', domain: 'Dance', platform: 'Instagram', shares: '800K', user: '@DanceBotX',
    headline: 'AI generates impossible breakdance moves! 🤖🕺',
    content: 'Put yourself in this video! The physics engine perfectly maps your face onto the dancer.',
    image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&q=80&w=800',
    severity: 'low', label: 'AI CREATION', trust_score: 98, isRemixable: true 
  },
  { 
    id: 's5', type: 'image', domain: 'Politics', platform: 'Twitter/X', shares: '4.5M', user: '@PolitiCheck',
    headline: 'Viral photo of political candidate accepting bribes in a dark alley',
    content: 'AI-GENERATED IMAGE: Notice the six fingers on hands and mismatched shadows.',
    image: 'https://images.unsplash.com/photo-1605335697204-edcf04b78ae6?auto=format&fit=crop&q=80&w=800',
    severity: 'medium', label: 'AI-GENERATED', trust_score: 11, isRemixable: false 
  }
]

// ─── Viral Shorts / Reels Fact-Check Data ────────────────────────────────────
export const VIRAL_SHORTS = [
  { id: 'sh1', title: 'Man claims to charge phone using lemon battery', platform: 'YouTube Shorts', views: '14M', verdict: 'MISLEADING', trust_score: 22, category: 'Science', summary: 'While a lemon battery produces ~0.9V, it cannot charge a modern smartphone (5V required). Video is staged.' },
  { id: 'sh2', title: 'Viral reel: "100% natural remedy cures cancer in 3 days"', platform: 'Instagram Reels', views: '8.7M', verdict: 'FAKE', trust_score: 3, category: 'Health', summary: 'No natural remedy cures cancer. Video removed by Instagram but mirrors circulate. Dangerous misinformation.' },
  { id: 'sh3', title: 'Deepfake of Barack Obama making offensive statements', platform: 'Twitter/X', views: '22M', verdict: 'AI-GENERATED', trust_score: 8, category: 'Politics', summary: 'Confirmed deepfake using FaceSwap technology. Obama\'s office issued a statement denying the video.' },
  { id: 'sh4', title: 'SpaceX Starship successfully landing on Mars (preview)', platform: 'YouTube Shorts', views: '31M', verdict: 'FAKE', trust_score: 11, category: 'Space', summary: 'Footage is from a VFX artist who clearly labeled it as fan-made. Media shared it without context.' },
  { id: 'sh5', title: 'Indian Army rescue operation during Uttarakhand floods', platform: 'Instagram Reels', views: '4.2M', verdict: 'REAL', trust_score: 89, category: 'News', summary: 'Verified by Indian Army official accounts and NDRF press releases. Real rescue footage from 2024.' },
  { id: 'sh6', title: 'AI robot "becomes conscious" and refuses commands', platform: 'YouTube Shorts', views: '19M', verdict: 'MISLEADING', trust_score: 29, category: 'Technology', summary: 'Video is of a scripted demonstration. The robot followed programmed responses, not independent thought.' },
]

// ─── Gamification: Fact or Fiction Daily Challenges ──────────────────────────
export const DAILY_CHALLENGES = [
  {
    id: 'game1',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    headline: 'Researchers invent a new material that heals its own scractches within an hour',
    answer: 'REAL',
    explanation: 'Self-healing polymers have been successfully demonstrated in lab environments for clear coats and screens.',
    points: 5,
  },
  {
    id: 'game2',
    image: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&q=80&w=800',
    headline: 'Viral photo of an incredible massive purple meteor over Mount Everest',
    answer: 'FAKE',
    explanation: 'AI-generated image. Lighting artifacts on the snow and lack of star trails give it away as synthetic media.',
    points: 5,
  }
]

// ─── Community Posts ────────────────────────────────────────────────────────
export const COMMUNITY_POSTS = [
  {
    id: 'cp1',
    user: { name: 'Priya Sharma', handle: '@priya_factcheck', avatar: '👩‍💻', score: 92 },
    content: '"Viral message claiming Indian railways will be fully privatized by 2026" — Checked this and it\'s FALSE. Railways Minister clarified no privatization plans exist.',
    label: 'FAKE', trust_score: 8, timeAgo: '12 min ago', platform: 'WhatsApp',
    upvotes: 247, downvotes: 3, comments: 18, shares: 64,
    userVote: null,
  },
  {
    id: 'cp2',
    user: { name: 'Arjun Mehta', handle: '@arjun_ai', avatar: '👨‍🔬', score: 78 },
    content: '"Video showing "flying car" launch in Dubai" — AI-Generated content confirmed. Reverse image search + GAN artifact detection reveals this is synthetic media.',
    label: 'AI-GENERATED', trust_score: 9, timeAgo: '34 min ago', platform: 'Instagram',
    upvotes: 189, downvotes: 7, comments: 31, shares: 42,
    userVote: null,
  },
  {
    id: 'cp3',
    user: { name: 'Kavya Reddy', handle: '@kavya_truth', avatar: '👩‍⚖️', score: 85 },
    content: 'Breaking claim: "Petrol price cut by ₹15/litre announced" — MISLEADING. Only a ₹2 reduction was announced, applicable only to certain states.',
    label: 'MISLEADING', trust_score: 35, timeAgo: '1 hr ago', platform: 'Twitter/X',
    upvotes: 312, downvotes: 14, comments: 47, shares: 89,
    userVote: null,
  },
  {
    id: 'cp4',
    user: { name: 'Rahul Gupta', handle: '@rahul_verifies', avatar: '🧑‍💼', score: 71 },
    content: '"ISRO Aditya-L1 spacecraft reached Lagrange Point 1 successfully" — REAL. Confirmed via ISRO official press release and ESA observation data.',
    label: 'REAL', trust_score: 97, timeAgo: '2 hr ago', platform: 'News',
    upvotes: 456, downvotes: 2, comments: 23, shares: 211,
    userVote: null,
  },
]

// ─── Leaderboard ────────────────────────────────────────────────────────────
export const LEADERBOARD = [
  { rank: 1, name: 'Priya Sharma', handle: '@priya_factcheck', avatar: '👩‍💻', score: 92, checks: 487, streak: '🔥 14 days', badge: 'Truth Champion' },
  { rank: 2, name: 'Rahul Gupta', handle: '@rahul_verifies', avatar: '🧑‍💼', score: 88, checks: 341, streak: '🔥 9 days', badge: 'Fact Hunter' },
  { rank: 3, name: 'Kavya Reddy', handle: '@kavya_truth', avatar: '👩‍⚖️', score: 85, checks: 298, streak: '🔥 7 days', badge: 'AI Detector' },
  { rank: 4, name: 'Arjun Mehta', handle: '@arjun_ai', avatar: '👨‍🔬', score: 78, checks: 214, streak: '🔥 5 days', badge: 'Reality Guard' },
  { rank: 5, name: 'Sneha Patel', handle: '@sneha_checks', avatar: '👩‍🎓', score: 74, checks: 179, streak: '3 days', badge: 'News Ranger' },
]

// ─── Trending Hashtags ───────────────────────────────────────────────────────
export const TRENDING_TAGS = [
  { tag: '#FakeAlert', count: '14.2K' },
  { tag: '#DeepfakeDetected', count: '8.7K' },
  { tag: '#AIGenerated', count: '6.1K' },
  { tag: '#FactCheck', count: '22.4K' },
  { tag: '#MisleadingNews', count: '5.3K' },
  { tag: '#Debunked', count: '11.8K' },
]

// ─── Trending Lies Leaderboard ───────────────────────────────────────────────
export const TRENDING_LIES = [
  { rank: 1, headline: 'UPI transactions above ₹500 to be taxed 18%', spread: '5.1M shares', domain: 'Finance', severity: 'high' },
  { rank: 2, headline: 'WHO approved mandatory global vaccine rollout', spread: '2.4M shares', domain: 'Health', severity: 'high' },
  { rank: 3, headline: 'SpaceX Starship lands on Mars (viral video)', spread: '1.9M shares', domain: 'Space', severity: 'medium' },
  { rank: 4, headline: 'Free gas cylinder scheme — apply before Sunday', spread: '1.2M shares', domain: 'Politics', severity: 'high' },
  { rank: 5, headline: 'AI robot becomes conscious and refuses commands', spread: '890K shares', domain: 'Technology', severity: 'medium' },
]