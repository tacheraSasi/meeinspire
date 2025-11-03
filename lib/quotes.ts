export interface QuoteReel {
  id: string;
  content: string;
  gradient: string[]; // [light,dark,lighter]
  //TODO: Add diff fonts for every reel
}

export const GRADIENTS = {
  NATURE: ["#96CEB4", "#5c7e6eff", "#afefd1ff"],
  ROYAL: ["#4f43aaff", "#4f4686ff", "#7362f2ff"],
  PURPLE: ["#ac45d1ff", "#7b3d8cff", "#dc83faff"],
  CORAL: ["#FF6B6B", "#8a4e4eff", "#f99a9aff"],
  OCEAN: ["#45B7D1", "#3f8593ff", "#53d5f2ff"],
  SUNSET: ["#FF9A8B", "#ff6b6b", "#ffaaaaff"],
  FOREST: ["#4ECDC4", "#2a7a74ff", "#7af0e8ff"],
  GOLD: ["#FFD93D", "#b3972bff", "#ffeaa7ff"],
  BERRY: ["#6A11CB", "#4a0c8fff", "#9d4eddff"],
  MINT: ["#20B2AA", "#167c77ff", "#5ce8deff"],
  LAVENDER: ["#E6E6FA", "#a9a9bcff", "#f3f3fdff"],
  ROSE: ["#FFB6C1", "#b38088ff", "#ffdde3ff"],
};

export const QUOTES_REELS = [
  {
    id: "1",
    content: "The best way to predict the future is to create it.",
    gradient: GRADIENTS.NATURE,
  },
  {
    id: "2",
    content: "Don't watch the clock; do what it does. Keep going.",
    gradient: GRADIENTS.ROYAL,
  },
  {
    id: "3",
    content: "The only way to do great work is to love what you do.",
    gradient: GRADIENTS.PURPLE,
  },
  {
    id: "4",
    content: "It does not matter how slowly you go as long as you do not stop.",
    gradient: GRADIENTS.CORAL,
  },
  {
    id: "5",
    content: "Everything you've ever wanted is on the other side of fear.",
    gradient: GRADIENTS.OCEAN,
  },
  {
    id: "6",
    content:
      "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    gradient: GRADIENTS.SUNSET,
  },
  {
    id: "7",
    content: "The mind is everything. What you think you become.",
    gradient: GRADIENTS.FOREST,
  },
  {
    id: "8",
    content: "The only impossible journey is the one you never begin.",
    gradient: GRADIENTS.GOLD,
  },
  {
    id: "9",
    content: "In the middle of difficulty lies opportunity.",
    gradient: GRADIENTS.BERRY,
  },
  {
    id: "10",
    content: "Believe you can and you're halfway there.",
    gradient: GRADIENTS.MINT,
  },
  {
    id: "11",
    content:
      "Your time is limited, so don't waste it living someone else's life.",
    gradient: GRADIENTS.LAVENDER,
  },
  {
    id: "12",
    content:
      "The future belongs to those who believe in the beauty of their dreams.",
    gradient: GRADIENTS.ROSE,
  },
  {
    id: "13",
    content: "Strive not to be a success, but rather to be of value.",
    gradient: GRADIENTS.NATURE,
  },
  {
    id: "14",
    content: "I have not failed. I've just found 10,000 ways that won't work.",
    gradient: GRADIENTS.PURPLE,
  },
  {
    id: "15",
    content: "The way to get started is to quit talking and begin doing.",
    gradient: GRADIENTS.OCEAN,
  },
  {
    id: "16",
    content: "Don't let yesterday take up too much of today.",
    gradient: GRADIENTS.SUNSET,
  },
  {
    id: "17",
    content:
      "You are never too old to set another goal or to dream a new dream.",
    gradient: GRADIENTS.GOLD,
  },
  {
    id: "18",
    content: "It always seems impossible until it's done.",
    gradient: GRADIENTS.BERRY,
  },
  {
    id: "19",
    content:
      "The only limit to our realization of tomorrow will be our doubts of today.",
    gradient: GRADIENTS.MINT,
  },
  {
    id: "20",
    content:
      "Life is what happens to you while you're busy making other plans.",
    gradient: GRADIENTS.LAVENDER,
  },
];
