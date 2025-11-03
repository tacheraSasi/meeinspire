export interface QuoteReel {
  id: string;
  content: string;
  gradient: string[]; // [light,dark,lighter]
  //TODO: Add diff fonts for every reel
}

export const QUOTES_REELS = [
  {
    id: "1",
    content: "Best way to predict the future is by creating it",
    gradient: ["#96CEB4", "#5c7e6eff", "#afefd1ff"],
  },
  {
    id: "2",
    content: "Best way to predict the future is by creating it",
    gradient: ["#4f43aaff", "#4f4686ff", "#7362f2ff"],
  },
  {
    id: "3",
    content: "Best way to predict the future is by creating it",
    gradient: ["#ac45d1ff", "#7b3d8cff", "#dc83faff"],
  },
  {
    id: "4",
    content: "Best way to predict the future is by creating it",
    gradient: ["#FF6B6B", "#8a4e4eff", "#f99a9aff"],
  },
  {
    id: "5",
    content: "Best way to predict the future is by creating it",
    gradient: ["#45B7D1", "#3f8593ff", "#53d5f2ff"],
  },
];
