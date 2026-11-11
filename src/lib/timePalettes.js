// Live mode palettes. Values are "R G B" triplets used by the CSS variables.
export const palettes = {
  morning: {
    label: "Morning", icon: "🌅",
    vars: { "--bg": "255 244 230", "--fg": "58 36 24", "--muted": "128 96 74", "--card": "255 252 246", "--line": "240 214 184", "--accent": "214 98 20" },
  },
  afternoon: {
    label: "Afternoon", icon: "☀️",
    vars: { "--bg": "232 244 255", "--fg": "15 35 60", "--muted": "75 100 130", "--card": "255 255 255", "--line": "196 222 245", "--accent": "10 110 210" },
  },
  evening: {
    label: "Evening", icon: "🌇",
    vars: { "--bg": "42 22 54", "--fg": "255 236 224", "--muted": "215 170 175", "--card": "64 34 76", "--line": "110 62 100", "--accent": "255 122 96" },
  },
  night: {
    label: "Night", icon: "🌙",
    vars: { "--bg": "8 12 30", "--fg": "226 232 255", "--muted": "140 152 190", "--card": "16 22 50", "--line": "36 46 90", "--accent": "129 140 248" },
  },
};

export const getPhase = (hour) =>
  hour >= 5 && hour < 11 ? "morning" : hour >= 11 && hour < 17 ? "afternoon" : hour >= 17 && hour < 20 ? "evening" : "night";