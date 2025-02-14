// Mood-based compliments
const moodCompliments = {
  happy: [
    "Your joy is contagious like a viral JavaScript library!",
    "You're radiating more positivity than a successful deployment!",
    "Your happiness makes my code compile with pure delight!"
  ],
  down: [
    "Even the best code has bugs sometimes, but you're amazing no matter what!",
    "You're stronger than a production-grade server, and twice as reliable!",
    "Like after a good debug session, things will get better!"
  ],
  loved: [
    "You're the perfect pair programming partner for life!",
    "Our love is like perfectly synchronized git commits!",
    "You make my heart race faster than a well-optimized algorithm!"
  ],
  needHug: [
    "Sending you a bug-free virtual hug!",
    "You deserve more hugs than there are lines of code in the world!",
    "Consider this a pull request for a virtual hug!"
  ]
};

// General compliments
export const compliments = [
  "You light up my world brighter than a full-stack developer debugging at 3 AM!",
  "Your smile is like perfectly formatted code - it makes everything better!",
  "If you were a CSS property, you'd be display: perfect!",
  "You're the semicolon to my JavaScript - absolutely essential!",
  "Your presence makes my heart float like a CSS animation!",
  "You're more special than a unique database index!",
  "If life were a git repository, I'd always want to merge with your branch!",
  "You make my heart spin like a loading animation!",
  "You're the responsive design of my dreams - perfect at any size!",
  "Your love compiles perfectly in my heart!",
  "You're the constant in my ever-changing variables!",
  "Together, we make the perfect pair programming team!",
  "You're the solution to all my error messages!",
  "Your love has no bugs, only features!",
  "You're the API to my happiness!"
];

export function getMoodCompliment(mood) {
  return moodCompliments[mood]?.[Math.floor(Math.random() * moodCompliments[mood].length)];
}