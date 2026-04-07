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

// ─── Real Verified News by Region ────────────────────────────────────────────
export const REAL_NEWS = {
  world: [
    { id: 'w1', source: 'Reuters', timeAgo: '10 min', trust_score: 96, category: 'Technology', headline: 'OpenAI releases GPT-5 with multimodal reasoning capabilities', summary: 'The new model can process text, image, audio, and video simultaneously with unprecedented accuracy.', },
    { id: 'w2', source: 'BBC', timeAgo: '1 hr', trust_score: 93, category: 'Climate', headline: 'Global CO₂ levels reach record high in 2025, scientists warn', summary: 'International climate agencies urge immediate action as emissions monitoring stations worldwide confirm new records.', },
    { id: 'w3', source: 'AP News', timeAgo: '3 hr', trust_score: 97, category: 'Economy', headline: 'IMF raises global growth forecast to 3.4% for 2025', summary: 'Improved inflation control and resilient labor markets in major economies drive revised outlook.', },
  ],
  india: [
    { id: 'i1', source: 'The Hindu', timeAgo: '25 min', trust_score: 94, category: 'Space', headline: 'ISRO sets launch date for Chandrayaan-4 mission', summary: 'India\'s next lunar mission targets sample return capability, slated for late 2026.', },
    { id: 'i2', source: 'NDTV', timeAgo: '2 hr', trust_score: 89, category: 'Economy', headline: 'RBI holds repo rate steady at 6.5%, focuses on inflation control', summary: 'The monetary policy committee voted unanimously to maintain current rates citing food price pressures.', },
    { id: 'i3', source: 'Indian Express', timeAgo: '4 hr', trust_score: 91, category: 'Technology', headline: 'India launches ₹10,000 Cr AI Mission for national infrastructure', summary: 'Funds allocated to build sovereign AI computing capacity and support 5,000 AI startups.', },
    { id: 'i4', source: 'Mint', timeAgo: '6 hr', trust_score: 88, category: 'Finance', headline: 'UPI transactions cross ₹20 lakh crore in March 2025, new record', summary: 'India\'s digital payment ecosystem continues to dominate globally with 14 billion monthly transactions.', },
  ],
  state: [
    { id: 's1', source: 'Maharashtra Times', timeAgo: '1 hr', trust_score: 87, category: 'Infrastructure', headline: 'Mumbai Metro Line 3 Phase 2 fully operational, cuts travel time by 40%', summary: 'The new underground corridor connects Andheri to Thane reducing peak hour commute significantly.', },
    { id: 's2', source: 'Loksatta', timeAgo: '3 hr', trust_score: 85, category: 'Environment', headline: 'Maharashtra bans single-use plastic in all government offices from May 2025', summary: 'State government orders immediate compliance with extended EPR rules.', },
    { id: 's3', source: 'Pune Mirror', timeAgo: '5 hr', trust_score: 90, category: 'Education', headline: 'Pune University launches AI & ML undergraduate degree program', summary: 'Four-year program developed in partnership with TCS, Infosys, and Wipro starts this semester.', },
  ],
  city: [
    { id: 'c1', source: 'Mumbai Mirror', timeAgo: '30 min', trust_score: 83, category: 'Civic', headline: 'BMC completes pothole repair drive — 12,000 potholes fixed this monsoon season', summary: 'Municipal corporation uses AI-based pothole mapping for the first time to prioritize repairs.', },
    { id: 'c2', source: 'Mid-Day', timeAgo: '2 hr', trust_score: 86, category: 'Health', headline: 'Mumbai air quality improves — AQI drops below 100 for first time this winter', summary: 'Anti-smog initiatives and reduced stubble burning cited as key factors.', },
  ],
}

// ─── Debunked Fake News by Region ────────────────────────────────────────────
export const REGIONAL_FAKE_NEWS = {
  world: [
    { id: 'rf1', platform: 'Telegram', shares: '2.4M', headline: 'WHO secretly approved Covid-26 vaccine for mandatory global rollout', debunk: 'WHO has made no such announcement. This originated from a known conspiracy channel.', severity: 'high' },
    { id: 'rf2', platform: 'Twitter/X', shares: '890K', headline: 'Scientists confirm 5G towers cause cancer, EU to ban them', debunk: '5G technology is non-ionizing radiation. No peer-reviewed study supports this claim.', severity: 'medium' },
  ],
  india: [
    { id: 'ri1', platform: 'WhatsApp', shares: '5.1M', headline: 'New income tax rule: All UPI transactions above ₹500 to be taxed 18%', debunk: 'Finance Ministry and CBDT have made no such announcement. This is completely fabricated.', severity: 'high' },
    { id: 'ri2', platform: 'Facebook', shares: '1.2M', headline: 'PM announces ₹50,000 free gas cylinder scheme — apply before Sunday', debunk: 'No such scheme exists. The link in circulation leads to a phishing page.', severity: 'high' },
    { id: 'ri3', platform: 'Instagram', shares: '430K', headline: 'AI-generated video of Virat Kohli endorsing cryptocurrency goes viral', debunk: 'Video is deepfake. Kohli has not endorsed any cryptocurrency. Cyber Cell alerted.', severity: 'medium' },
  ],
  state: [
    { id: 'rs1', platform: 'WhatsApp', shares: '750K', headline: 'Maharashtra government to shut down private schools — classes move fully online', debunk: 'State education department confirmed no such policy exists.', severity: 'medium' },
    { id: 'rs2', platform: 'Facebook', shares: '320K', headline: 'Flood warning: Pune dam overflowing — evacuate western areas immediately', debunk: 'IMD and Pune district authorities confirm dams are at normal levels. No evacuation order issued.', severity: 'high' },
  ],
  city: [
    { id: 'rc1', platform: 'WhatsApp', shares: '95K', headline: 'Water supply suspended in South Mumbai for 10 days — stock up now', debunk: 'BMC confirmed no such suspension is planned. Misinformation causing panic buying.', severity: 'medium' },
  ],
}

// ─── Viral Shorts / Reels Fact-Check Data ────────────────────────────────────
export const VIRAL_SHORTS = [
  { id: 'sh1', title: 'Man claims to charge phone using lemon battery', platform: 'YouTube Shorts', views: '14M', verdict: 'MISLEADING', trust_score: 22, category: 'Science', summary: 'While a lemon battery produces ~0.9V, it cannot charge a modern smartphone (5V required). Video is staged.' },
  { id: 'sh2', title: 'Viral reel: "100% natural remedy cures cancer in 3 days"', platform: 'Instagram Reels', views: '8.7M', verdict: 'FAKE', trust_score: 3, category: 'Health', summary: 'No natural remedy cures cancer. Video removed by Instagram but mirrors circulate. Dangerous misinformation.' },
  { id: 'sh3', title: 'Deepfake of Barack Obama making offensive statements', platform: 'Twitter/X', views: '22M', verdict: 'AI-GENERATED', trust_score: 8, category: 'Politics', summary: 'Confirmed deepfake using FaceSwap technology. Obama\'s office issued a statement denying the video.' },
  { id: 'sh4', title: 'SpaceX Starship successfully landing on Mars (preview)', platform: 'YouTube Shorts', views: '31M', verdict: 'FAKE', trust_score: 11, category: 'Space', summary: 'Footage is from a VFX artist who clearly labeled it as fan-made. Media shared it without context.' },
  { id: 'sh5', title: 'Indian Army rescue operation during Uttarakhand floods', platform: 'Instagram Reels', views: '4.2M', verdict: 'REAL', trust_score: 89, category: 'News', summary: 'Verified by Indian Army official accounts and NDRF press releases. Real rescue footage from 2024.' },
  { id: 'sh6', title: 'AI robot "becomes conscious" and refuses commands', platform: 'YouTube Shorts', views: '19M', verdict: 'MISLEADING', trust_score: 29, category: 'Technology', summary: 'Video is of a scripted demonstration. The robot followed programmed responses, not independent thought.' },
]