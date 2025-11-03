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
  TEAL: ["#20C997", "#167a5fff", "#5ce8bbff"],
  ORANGE: ["#FFA500", "#b37400ff", "#ffc966ff"],
  INDIGO: ["#6610F2", "#4a0bacff", "#9d68f5ff"],
  PINK: ["#E83E8C", "#a12b63ff", "#f27cb1ff"],
  CYAN: ["#17A2B8", "#10707fff", "#4cd4eaff"],
  EMERALD: ["#28A745", "#1c7530ff", "#5cd977ff"],
  VIOLET: ["#6F42C1", "#4f2e87ff", "#9d75e5ff"],
  AMBER: ["#FD7E14", "#b1580eff", "#feae6bff"],
  SKY: ["#6CB2EB", "#4c7ca5ff", "#a3d1f8ff"],
  LIME: ["#94D82D", "#699720ff", "#b9e86bff"],
  FUCHSIA: ["#E83E8C", "#a12b63ff", "#f27cb1ff"],
  SLATE: ["#6C757D", "#4c535aff", "#9fa6adff"],
  RUBY: ["#E83E8C", "#a12b63ff", "#f27cb1ff"],
  JADE: ["#00A86B", "#00754aff", "#33d395ff"],
  SAPPHIRE: ["#0D6EFD", "#094db3ff", "#5d9bfeff"],
  PEACH: ["#FFE5B4", "#b3a07dff", "#fff1d9ff"],
  CREAM: ["#FFFDD0", "#b3b292ff", "#fffee8ff"],
  MIDNIGHT: ["#191970", "#11114eff", "#3d3da6ff"],
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
    gradient: GRADIENTS.TEAL,
  },
  {
    id: "14",
    content: "I have not failed. I've just found 10,000 ways that won't work.",
    gradient: GRADIENTS.ORANGE,
  },
  {
    id: "15",
    content: "The way to get started is to quit talking and begin doing.",
    gradient: GRADIENTS.INDIGO,
  },
  {
    id: "16",
    content: "Don't let yesterday take up too much of today.",
    gradient: GRADIENTS.PINK,
  },
  {
    id: "17",
    content:
      "You are never too old to set another goal or to dream a new dream.",
    gradient: GRADIENTS.CYAN,
  },
  {
    id: "18",
    content: "It always seems impossible until it's done.",
    gradient: GRADIENTS.EMERALD,
  },
  {
    id: "19",
    content:
      "The only limit to our realization of tomorrow will be our doubts of today.",
    gradient: GRADIENTS.VIOLET,
  },
  {
    id: "20",
    content:
      "Life is what happens to you while you're busy making other plans.",
    gradient: GRADIENTS.AMBER,
  },
  {
    id: "21",
    content: "The purpose of our lives is to be happy.",
    gradient: GRADIENTS.SKY,
  },
  {
    id: "22",
    content: "Get busy living or get busy dying.",
    gradient: GRADIENTS.LIME,
  },
  {
    id: "23",
    content: "You only live once, but if you do it right, once is enough.",
    gradient: GRADIENTS.FUCHSIA,
  },
  {
    id: "24",
    content: "Turn your wounds into wisdom.",
    gradient: GRADIENTS.SLATE,
  },
  {
    id: "25",
    content: "The purpose of our lives is to be happy.",
    gradient: GRADIENTS.RUBY,
  },
  {
    id: "26",
    content: "Life is either a daring adventure or nothing at all.",
    gradient: GRADIENTS.JADE,
  },
  {
    id: "27",
    content: "May you live all the days of your life.",
    gradient: GRADIENTS.SAPPHIRE,
  },
  {
    id: "28",
    content: "Life itself is the most wonderful fairy tale.",
    gradient: GRADIENTS.PEACH,
  },
  {
    id: "29",
    content: "Do not let making a living prevent you from making a life.",
    gradient: GRADIENTS.CREAM,
  },
  {
    id: "30",
    content: "Go confidently in the direction of your dreams.",
    gradient: GRADIENTS.MIDNIGHT,
  },
  {
    id: "31",
    content: "The journey of a thousand miles begins with one step.",
    gradient: GRADIENTS.NATURE,
  },
  {
    id: "32",
    content: "That which does not kill us makes us stronger.",
    gradient: GRADIENTS.ROYAL,
  },
  {
    id: "33",
    content: "Life is 10% what happens to us and 90% how we react to it.",
    gradient: GRADIENTS.PURPLE,
  },
  {
    id: "34",
    content: "The only true wisdom is in knowing you know nothing.",
    gradient: GRADIENTS.CORAL,
  },
  {
    id: "35",
    content: "Quality is not an act, it is a habit.",
    gradient: GRADIENTS.OCEAN,
  },
  {
    id: "36",
    content: "The unexamined life is not worth living.",
    gradient: GRADIENTS.SUNSET,
  },
  {
    id: "37",
    content: "Where there is love there is life.",
    gradient: GRADIENTS.FOREST,
  },
  {
    id: "38",
    content: "Change your thoughts and you change your world.",
    gradient: GRADIENTS.GOLD,
  },
  {
    id: "39",
    content:
      "Happiness is not something ready made. It comes from your own actions.",
    gradient: GRADIENTS.BERRY,
  },
  {
    id: "40",
    content: "The secret of getting ahead is getting started.",
    gradient: GRADIENTS.MINT,
  },
  {
    id: "41",
    content: "If you tell the truth, you don't have to remember anything.",
    gradient: GRADIENTS.LAVENDER,
  },
  {
    id: "42",
    content:
      "To live is the rarest thing in the world. Most people exist, that is all.",
    gradient: GRADIENTS.ROSE,
  },
  {
    id: "43",
    content: "That which does not kill us makes us stronger.",
    gradient: GRADIENTS.TEAL,
  },
  {
    id: "44",
    content: "Be who you are and say what you feel.",
    gradient: GRADIENTS.ORANGE,
  },
  {
    id: "45",
    content: "We accept the love we think we deserve.",
    gradient: GRADIENTS.INDIGO,
  },
  {
    id: "46",
    content: "Without music, life would be a mistake.",
    gradient: GRADIENTS.PINK,
  },
  {
    id: "47",
    content: "We don't see things as they are, we see them as we are.",
    gradient: GRADIENTS.CYAN,
  },
  {
    id: "48",
    content: "Be the change that you wish to see in the world.",
    gradient: GRADIENTS.EMERALD,
  },
  {
    id: "49",
    content:
      "Live as if you were to die tomorrow. Learn as if you were to live forever.",
    gradient: GRADIENTS.VIOLET,
  },
  {
    id: "50",
    content: "No one can make you feel inferior without your consent.",
    gradient: GRADIENTS.AMBER,
  },
  {
    id: "51",
    content:
      "Great minds discuss ideas; average minds discuss events; small minds discuss people.",
    gradient: GRADIENTS.SKY,
  },
  {
    id: "52",
    content: "Do what you can, with what you have, where you are.",
    gradient: GRADIENTS.LIME,
  },
  {
    id: "53",
    content: "The only thing we have to fear is fear itself.",
    gradient: GRADIENTS.FUCHSIA,
  },
  {
    id: "54",
    content:
      "Keep your face always toward the sunshine - and shadows will fall behind you.",
    gradient: GRADIENTS.SLATE,
  },
  {
    id: "55",
    content: "Whoever is happy will make others happy too.",
    gradient: GRADIENTS.RUBY,
  },
  {
    id: "56",
    content: "You must be the change you wish to see in the world.",
    gradient: GRADIENTS.JADE,
  },
  {
    id: "57",
    content: "What we think, we become.",
    gradient: GRADIENTS.SAPPHIRE,
  },
  {
    id: "58",
    content: "The power of imagination makes us infinite.",
    gradient: GRADIENTS.PEACH,
  },
  {
    id: "59",
    content: "Happiness depends upon ourselves.",
    gradient: GRADIENTS.CREAM,
  },
  {
    id: "60",
    content: "The only real mistake is the one from which we learn nothing.",
    gradient: GRADIENTS.MIDNIGHT,
  },
  {
    id: "61",
    content: "Time you enjoy wasting is not wasted time.",
    gradient: GRADIENTS.NATURE,
  },
  {
    id: "62",
    content:
      "Life isn't about finding yourself. Life is about creating yourself.",
    gradient: GRADIENTS.ROYAL,
  },
  {
    id: "63",
    content: "Dream big and dare to fail.",
    gradient: GRADIENTS.PURPLE,
  },
  {
    id: "64",
    content:
      "Do not go where the path may lead, go instead where there is no path and leave a trail.",
    gradient: GRADIENTS.CORAL,
  },
  {
    id: "65",
    content:
      "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    gradient: GRADIENTS.OCEAN,
  },
  {
    id: "66",
    content: "The harder I work, the more luck I seem to have.",
    gradient: GRADIENTS.SUNSET,
  },
  {
    id: "67",
    content: "The best revenge is massive success.",
    gradient: GRADIENTS.FOREST,
  },
  {
    id: "68",
    content: "I find that the harder I work, the more luck I seem to have.",
    gradient: GRADIENTS.GOLD,
  },
  {
    id: "69",
    content: "Don't be afraid to give up the good to go for the great.",
    gradient: GRADIENTS.BERRY,
  },
  {
    id: "70",
    content:
      "Success usually comes to those who are too busy to be looking for it.",
    gradient: GRADIENTS.MINT,
  },
  {
    id: "71",
    content: "The way to get started is to quit talking and begin doing.",
    gradient: GRADIENTS.LAVENDER,
  },
  {
    id: "72",
    content:
      "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.",
    gradient: GRADIENTS.ROSE,
  },
  {
    id: "73",
    content: "The future depends on what you do today.",
    gradient: GRADIENTS.TEAL,
  },
  {
    id: "74",
    content: "It's not whether you get knocked down, it's whether you get up.",
    gradient: GRADIENTS.ORANGE,
  },
  {
    id: "75",
    content:
      "If you are not willing to risk the usual, you will have to settle for the ordinary.",
    gradient: GRADIENTS.INDIGO,
  },
  {
    id: "76",
    content:
      "People who are crazy enough to think they can change the world, are the ones who do.",
    gradient: GRADIENTS.PINK,
  },
  {
    id: "77",
    content:
      "Failure will never overtake me if my determination to succeed is strong enough.",
    gradient: GRADIENTS.CYAN,
  },
  {
    id: "78",
    content: "What you do today can improve all your tomorrows.",
    gradient: GRADIENTS.EMERALD,
  },
  {
    id: "79",
    content:
      "The only place where success comes before work is in the dictionary.",
    gradient: GRADIENTS.VIOLET,
  },
  {
    id: "80",
    content: "Don't let what you cannot do interfere with what you can do.",
    gradient: GRADIENTS.AMBER,
  },
  {
    id: "81",
    content: "You miss 100% of the shots you don't take.",
    gradient: GRADIENTS.SKY,
  },
  {
    id: "82",
    content: "The mind is not a vessel to be filled but a fire to be kindled.",
    gradient: GRADIENTS.LIME,
  },
  {
    id: "83",
    content:
      "The best time to plant a tree was 20 years ago. The second best time is now.",
    gradient: GRADIENTS.FUCHSIA,
  },
  {
    id: "84",
    content: "Your attitude, not your aptitude, will determine your altitude.",
    gradient: GRADIENTS.SLATE,
  },
  {
    id: "85",
    content: "If you want to lift yourself up, lift up someone else.",
    gradient: GRADIENTS.RUBY,
  },
  {
    id: "86",
    content: "Light tomorrow with today.",
    gradient: GRADIENTS.JADE,
  },
  {
    id: "87",
    content: "The secret of getting ahead is getting started.",
    gradient: GRADIENTS.SAPPHIRE,
  },
  {
    id: "88",
    content:
      "You can't cross the sea merely by standing and staring at the water.",
    gradient: GRADIENTS.PEACH,
  },
  {
    id: "89",
    content: "The only way to have a friend is to be one.",
    gradient: GRADIENTS.CREAM,
  },
  {
    id: "90",
    content:
      "In three words I can sum up everything I've learned about life: it goes on.",
    gradient: GRADIENTS.MIDNIGHT,
  },
  {
    id: "91",
    content: "You cannot shake hands with a clenched fist.",
    gradient: GRADIENTS.NATURE,
  },
  {
    id: "92",
    content: "Learn from yesterday, live for today, hope for tomorrow.",
    gradient: GRADIENTS.ROYAL,
  },
  {
    id: "93",
    content: "Peace begins with a smile.",
    gradient: GRADIENTS.PURPLE,
  },
  {
    id: "94",
    content: "The time is always right to do what is right.",
    gradient: GRADIENTS.CORAL,
  },
  {
    id: "95",
    content:
      "The meaning of life is to find your gift. The purpose of life is to give it away.",
    gradient: GRADIENTS.OCEAN,
  },
  {
    id: "96",
    content: "The purpose of life is a life of purpose.",
    gradient: GRADIENTS.SUNSET,
  },
  {
    id: "97",
    content: "Life is really simple, but we insist on making it complicated.",
    gradient: GRADIENTS.FOREST,
  },
  {
    id: "98",
    content:
      "Life is a succession of lessons which must be lived to be understood.",
    gradient: GRADIENTS.GOLD,
  },
  {
    id: "99",
    content:
      "Your life does not get better by chance, it gets better by change.",
    gradient: GRADIENTS.BERRY,
  },
  {
    id: "100",
    content:
      "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    gradient: GRADIENTS.MINT,
  },
];

// NOTE:Fisher-Yates shuffle
function shuffleQuotes<T>(quotes: T[]): T[] {
  const shuffled = [...quotes];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const SHUFFLED_QUOTES = shuffleQuotes(QUOTES_REELS);

const getRandomQuotes = (count: number = 10) => {
  const shuffled = shuffleQuotes(QUOTES_REELS);
  return shuffled.slice(0, count);
};

export const getQuoteById = (id:string):QuoteReel | undefined =>{
  return QUOTES_REELS.find(quote => quote.id == id)
}

// Get 10 random quotes
const randomQuotes = getRandomQuotes();

