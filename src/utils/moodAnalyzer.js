export function analyzeMood(text) {
  const input = text.toLowerCase();

  if (input.includes("sad") || input.includes("tired") || input.includes("down")) {
    return "sad";
  }

  if (input.includes("happy") || input.includes("excited") || input.includes("good")) {
    return "happy";
  }

  if (input.includes("gym") || input.includes("energy") || input.includes("workout")) {
    return "energetic";
  }

  if (input.includes("relax") || input.includes("calm") || input.includes("peace")) {
    return "chill";
  }

  return "chill";
}

export function generatePlaylistName(mood) {
  const names = {
    happy: "Good Vibes Only ✨",
    sad: "Late Night Feels 🌙",
    energetic: "Beast Mode 🔥",
    chill: "Chill & Unwind 🎧",
  };

  return names[mood] || "Your Mood Mix";
}
