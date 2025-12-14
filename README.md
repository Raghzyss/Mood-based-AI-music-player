# 🎧 Moodify – AI-Powered Mood-Based Music Player

Moodify is an AI-powered music player that understands how you feel and curates a playlist to match your mood.  
Instead of selecting genres or playlists manually, users simply describe their emotions, and the app generates music accordingly.

---

## 🚀 Features

- 🎶 Mood-based playlist generation
- 🤖 AI-powered mood analysis using Google Gemini
- 🔁 Graceful fallback when AI quota is exceeded
- ▶️ Fully functional music player
  - Play / Pause
  - Next / Previous
  - Seek bar with duration
- 🎨 Spotify-inspired UI
- 🌌 Animated background with cinematic reveal
- 📱 Responsive and clean design

---

## 🧠 How It Works

1. The user describes their mood in natural language.
2. Gemini AI analyzes the text and classifies it into one of four moods:
   - Happy
   - Sad
   - Energetic
   - Chill
3. Based on the detected mood, a playlist is generated from a local song library.
4. The built-in music player plays the selected playlist seamlessly.

If the AI API quota is exceeded, the system automatically falls back to a keyword-based mood detection to ensure uninterrupted functionality.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router), React
- **Styling:** Tailwind CSS
- **AI Integration:** Google Gemini API
- **Audio:** HTML5 Audio API
- **State Management:** React Hooks

---

## 📂 Project Structure

```
src/
├── app/
│   ├── page.js
│   ├── layout.js
│   └── api/
│       └── analyze/
│           └── route.js
├── components/
│   └── MusicPlayer.jsx
├── data/
│   └── songs.js
public/
├── music/
├── covers/
└── bg/
```
D:\Desktop\webdev_ projects\AI-mood-music-player\ai-mood-music-player\Mood-based-AI-music-player\screenshots
## 📸 Screenshots

<p align="center">
  <img src="screenshots/home.png" width="80%" />
</p>

<p align="center">
  <img src="screenshots/chill.png" width="80%" />
</p>

<p align="center">
  <img src="screenshots/sad.png" width="80%" />
</p>



## ⚙️ Setup Instructions

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/moodify.git

2. Install dependencies
    - bash
    - Copy code
    - npm install

3. Create a .env.local file in the root directory
    - env
    - Copy code
    - GEMINI_API_KEY=your_api_key_here

 4. Run the development server
      - bash
      - Copy code
      - npm run dev

  5. Open http://localhost:3000 in your browser
