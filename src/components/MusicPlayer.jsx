"use client";

import { useEffect, useRef, useState } from "react";

export default function MusicPlayer({ songs, currentIndex, setCurrentIndex }) {
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Stop audio when playlist changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setCurrentTime(0);
    }
    setIsPlaying(false);
  }, [songs]);

  // Attach audio listeners ONCE
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  if (!songs || songs.length === 0) return null;

  const song = songs[currentIndex];

  const play = async () => {
    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch {
      console.log("Play blocked by browser");
    }
  };

  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) pause();
    else play();
  };

  const nextSong = () => {
    setCurrentIndex((prev) => (prev + 1) % songs.length);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const prevSong = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? songs.length - 1 : prev - 1
    );
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleSeek = (e) => {
    const time = Number(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-xl bg-[#181818] rounded-xl p-4 shadow-xl">
      <audio ref={audioRef} src={song.src} preload="metadata" />

      {/* Song Info */}
      <div className="flex items-center gap-4">
        <img
          src={song.cover || "/covers/default.jpg"}
          className="w-14 h-14 rounded-lg object-cover"
          alt={song.title}
        />

        <div className="flex-1">
          <p className="font-semibold text-sm">{song.title}</p>
          <p className="text-xs text-gray-400">{song.artist}</p>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={prevSong}>⏮</button>

          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-green-500 text-black font-bold flex items-center justify-center"
          >
            {isPlaying ? "⏸" : "▶"}
          </button>

          <button onClick={nextSong}>⏭</button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-3">
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          className="w-full accent-green-500"
        />

        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}
