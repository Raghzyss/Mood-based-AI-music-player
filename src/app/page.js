"use client";

import { useState } from "react";
import { songs } from "../data/songs";
import MusicPlayer from "../components/MusicPlayer";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [text, setText] = useState("");
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [playlistName, setPlaylistName] = useState("");

  const handleAnalyze = async () => {
    if (!text.trim()) return;

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    if (!data.mood) return;

    const matched = songs.filter((song) => song.mood === data.mood);

    setFilteredSongs(matched);
    setPlaylistName(
      data.mood === "sad"
        ? "Late Night Feels 🌙"
        : data.mood === "happy"
        ? "Good Vibes Only ✨"
        : data.mood === "energetic"
        ? "Beast Mode 🔥"
        : "Chill & Unwind 🎧"
    );
  };

  return (
    <main className="min-h-screen relative text-white">
      {/* Background */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-animate"
        style={{ backgroundImage: "url('/bg/bg2.png')" }}
      ></div>


      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      

      {/* Content */}
      <div className="relative z-10 flex justify-center px-4 pb-40">
        <div className="w-full max-w-xl pt-20">
          {/* Hero */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-3">
              How are you feeling today?
            </h1>
            <p className="text-gray-300 text-sm">
              Tell Moodify what’s on your mind.
            </p>
          </div>

          {/* Chat-style input */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-10">
            <textarea
              rows={2}
              placeholder="I feel exhausted but calm..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full bg-transparent resize-none outline-none text-white placeholder-gray-400"
            />

            <div className="flex justify-end mt-3">
              <button
                onClick={handleAnalyze}
                className="px-5 py-2 rounded-full bg-green-500 text-black font-semibold hover:scale-105 transition"
              >
                Generate Playlist
              </button>
            </div>
          </div>

          {/* Playlist */}
          {playlistName && (
            <>
              <h2 className="text-xl font-semibold mb-4">
                {playlistName}
              </h2>

              <div className="space-y-3 mb-10">
                {filteredSongs.map((song, index) => (
                  <div
                    key={song.id}
                    className={`flex items-center gap-3 p-3 rounded-lg transition cursor-pointer
                      ${index === currentIndex
                        ? "bg-green-500/20 ring-1 ring-green-500"
                        : "hover:bg-white/10"
                      }`}
                    onClick={() => setCurrentIndex(index)}
                  >

                    <img
                      src={song.cover}
                      className="w-12 h-12 rounded object-cover"
                      alt={song.title}
                    />

                    <div>
                      <p className="text-sm font-medium">
                        {song.title}
                      </p>
                      <p className="text-xs text-gray-400">
                        {song.artist}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* About */}
          <div className="mt-16 bg-white/5 backdrop-blur-md rounded-2xl p-6 text-sm text-gray-300">
            <h3 className="text-white font-semibold mb-2">
              What is Moodify?
            </h3>
            <p className="mb-4">
              Moodify is an AI-powered music player that understands emotions,
              not keywords. Describe how you feel, and the music adapts instantly.
            </p>

            <h3 className="text-white font-semibold mb-2">
              How it works
            </h3>
            <ul className="space-y-2">
              <li>• You describe your mood naturally</li>
              <li>• AI understands the emotion behind it</li>
              <li>• Music is curated and played seamlessly</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Player */}
      <MusicPlayer
        songs={filteredSongs}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />

    </main>
  );
}
