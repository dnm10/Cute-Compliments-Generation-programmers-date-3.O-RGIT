import './style.css';
import { compliments, getMoodCompliment } from './src/compliments.js';

// Audio setup
const bgMusic = new Audio('src/Assests/love-story-music-romantic-piano-wedding-bright-background-intro-259699.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.3;

const chimeSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-fairy-magic-sparkle-871.mp3');
chimeSound.volume = 0.4;

let isMusicEnabled = false;

// GIF fallback
const wholesomeGifs = [
  'https://media.tenor.com/snFoLI-S9CQAAAAj/milk-and-mocha.gif',
  'https://media1.tenor.com/m/kKQxAIakqIkAAAAd/lpg.gif',
  'https://media1.tenor.com/m/_fcpCS_liv8AAAAd/te-amo-alessio-alan-and-alex.gif',
  'https://media.tenor.com/yhaQmm7IWzYAAAAj/milk-and-mocha.gif',
  'https://media1.tenor.com/m/YvGjzzOlvHsAAAAd/mintyai4.gif',
  'https://media1.tenor.com/m/jCPW5UQVUSgAAAAd/mintyai4.gif',
];

function toggleMusic() {
  const musicButton = document.querySelector('.music-toggle');
  if (isMusicEnabled) {
    bgMusic.pause();
    musicButton.innerHTML = '🔇 Music Off';
  } else {
    bgMusic.play().catch(() => console.log('Audio playback requires user interaction.'));
    musicButton.innerHTML = '🎵 Music On';
  }
  isMusicEnabled = !isMusicEnabled;
}

function playChime() {
  if (isMusicEnabled) {
    chimeSound.currentTime = 0;
    chimeSound.play().catch(() => {});
  }
}

function createFloatingEmoji(emoji) {
  const element = document.createElement('div');
  element.className = 'floating-emoji';
  element.innerHTML = emoji;
  element.style.left = Math.random() * 100 + 'vw';
  document.body.appendChild(element);

  element.addEventListener('animationend', () => element.remove());
}

function shareCompliment() {
  const complimentText = document.querySelector('.compliment').textContent.trim();

  if (!complimentText || complimentText === 'Create a lovely compliment below!') {
    alert('Please generate a compliment first!');
    return;
  }

  const shareUrl = `${window.location.origin}${window.location.pathname}?compliment=${encodeURIComponent(complimentText)}`;

  navigator.clipboard.writeText(shareUrl).then(() => {
    alert('Link copied to clipboard!');
  }).catch(err => {
    console.error('Could not copy text: ', err);
  });
}

window.shareCompliment = shareCompliment;


function createConfetti() {
  const colors = ['#ff4b6e', '#ff6b6b', '#ffc6c6', '#ff2d55', '#ffb3c1'];
  const confetti = document.createElement('div');
  confetti.className = 'confetti';
  confetti.style.left = Math.random() * 100 + 'vw';
  confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  document.body.appendChild(confetti);

  confetti.addEventListener('animationend', () => confetti.remove());
}

function createSparkle() {
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  sparkle.innerHTML = '✨';
  sparkle.style.left = Math.random() * 100 + 'vw';
  sparkle.style.top = Math.random() * 100 + 'vh';
  document.body.appendChild(sparkle);

  sparkle.addEventListener('animationend', () => sparkle.remove());
}

function showThankYouHug() {
  const hug = document.createElement('div');
  hug.className = 'thank-you-hug';
  hug.innerHTML = '🤗';
  document.body.appendChild(hug);

  setTimeout(() => hug.classList.add('show'), 100);
  setTimeout(() => {
    hug.classList.remove('show');
    setTimeout(() => hug.remove(), 500);
  }, 2000);
}

function triggerAnimations() {
  for (let i = 0; i < 5; i++) setTimeout(() => createFloatingEmoji('❤️'), i * 200);
  for (let i = 0; i < 3; i++) setTimeout(() => createFloatingEmoji('🥰'), i * 300 + 150);
  for (let i = 0; i < 15; i++) setTimeout(createConfetti, i * 100);
  for (let i = 0; i < 8; i++) setTimeout(createSparkle, i * 200 + 100);
}

function rateCompliment(rating) {
  const ratingButtons = document.querySelectorAll('.rating-button');
  ratingButtons.forEach(btn => btn.classList.remove('active'));
  document.querySelector(`[data-rating="${rating}"]`).classList.add('active');

  if (rating === 'loved') for (let i = 0; i < 10; i++) setTimeout(() => createFloatingEmoji('💖'), i * 100);
  else if (rating === 'blushing') for (let i = 0; i < 5; i++) setTimeout(() => createFloatingEmoji('😊'), i * 200);
}

function generateCompliment() {
  const name = document.querySelector('.name-input').value.trim();
  const customCompliment = document.querySelector('.custom-compliment-input').value.trim();
  const mood = document.querySelector('.mood-select').value;
  const imageInput = document.querySelector('.upload-image');
  const gifElement = document.querySelector('.compliment-gif');

  let compliment = customCompliment || getMoodCompliment(mood) || compliments[Math.floor(Math.random() * compliments.length)];
  if (name) compliment = `${name}, ${compliment.charAt(0).toLowerCase()}${compliment.slice(1)}`;

  const complimentElement = document.querySelector('.compliment');
  complimentElement.style.opacity = 0;

  setTimeout(() => {
    complimentElement.textContent = compliment;
    complimentElement.style.opacity = 1;

    if (imageInput.files.length > 0) {
      const reader = new FileReader();
      reader.onload = e => {
        gifElement.src = e.target.result;
        gifElement.style.display = 'block';
      };
      reader.readAsDataURL(imageInput.files[0]);
    } else {
      gifElement.src = wholesomeGifs[Math.floor(Math.random() * wholesomeGifs.length)];
      gifElement.style.display = 'block';
    }

    playChime();
    triggerAnimations();
  }, 200);
}

document.querySelector('#app').innerHTML = `
  <div class="container" style="font-family: 'Satisfy', serif;">
  <h1>✨ Heart Strings ✨</h1>
  <div class="compliment fade-in">Create a lovely compliment below!</div>

  <div class="mood-section">
    <select class="mood-select " style="background: #ff4b6e; font-family: 'Satisfy', serif;">
      <option value="any">Any Mood</option>
      <option value="happy">Feeling Happy</option>
      <option value="down">Feeling Down</option>
      <option value="loved">Feeling Loved</option>
      <option value="needHug">Need a Hug</option>
    </select>
  </div>

  <div class="input-section">
    <input type="text" class="name-input" placeholder="Enter their name (optional)" style="background-color: #ffc0cb; font-family: 'Satisfy', serif;" />
    <textarea class="custom-compliment-input" placeholder="Write your own compliment (optional)" rows="3" style=" background-color: #ffc0cb; font-family: 'Satisfy', serif;"></textarea>
    <input type="file" class="upload-image" accept="image/*" style="font-family: 'Satisfy', serif;" />
  </div>

  <button onclick="window.generateCompliment()" class="generate-button fancy-button" style="font-family: 'Satisfy', serif;">Generate Compliment 💝</button>
  <button onclick="window.toggleMusic()" class="music-toggle fancy-button" style="font-family: 'Satisfy', serif;">🔇 Music Off</button>

  <div class="gif-container" style="display: flex; justify-content: center; align-items: center;">
    <img class="compliment-gif" src="" alt="Wholesome Image/GIF" style="display:none; max-width:300px; margin-top:10px; border-radius:8px;" />
  </div>

  <div class="rating-section">
    <button onclick="window.rateCompliment('loved')" class="rating-button fancy-button" data-rating="loved" style="font-family: 'Satisfy', serif;">Loved it 💖</button>
    <button onclick="window.rateCompliment('blushing')" class="rating-button fancy-button" data-rating="blushing" style="font-family: 'Satisfy', serif;">Blushed 😊</button>
    <button onclick="window.rateCompliment('aww')" class="rating-button fancy-button" data-rating="aww" style="font-family: 'Satisfy', serif;">Aww 🥰</button>
  </div>
  <button onclick="window.shareCompliment()" class="share-button fancy-button" style="font-family: 'Satisfy', serif;">🔗 Share Compliment</button>

</div>
`;

window.generateCompliment = generateCompliment;
window.toggleMusic = toggleMusic;
window.rateCompliment = rateCompliment;
