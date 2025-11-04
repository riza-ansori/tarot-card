const shuffleBtn = document.getElementById('shuffle-btn');
const deck = document.getElementById('card-deck');
const hand = document.getElementById('hand');

const cards = [
  { name: "The Fool", url: "https://example.com/fool", img: "./img/theFool.png" },
  { name: "The Magician", url: "https://example.com/magician", img: "./img/theMagician.png" },
  { name: "The High Priestess", url: "https://example.com/high-priestess", img: "./img/thePopess.png" },
  { name: "The Empress", url: "https://example.com/empress", img: "./img/theEmpress.png" },
  { name: "The Emperor", url: "https://example.com/emperor", img: "./img/theEmperor.png" },
  { name: "The Hierophant", url: "https://example.com/hierophant", img: "./img/thePope.png" },
  { name: "The Lovers", url: "https://example.com/lovers", img: "./img/theLovers.png" },
  { name: "The Chariot", url: "https://example.com/chariot", img: "./img/theChariot.png" },
  { name: "Strength", url: "https://example.com/strength", img: "./img/strength.png" },
  { name: "The Hermit", url: "https://example.com/hermit", img: "./img/theHermit.png" },
  { name: "Wheel of Fortune", url: "https://example.com/wheel-of-fortune", img: "./img/wheelOfFortune.png" },
  { name: "Justice", url: "https://example.com/justice", img: "./img/justice.png" },
  { name: "The Hanged Man", url: "https://example.com/hanged-man", img: "./img/theHangedMan.png" },
  { name: "Death", url: "https://example.com/death", img: "./img/death.png" },
  { name: "Temperance", url: "https://example.com/temperance", img: "./img/temperance.png" },
  { name: "The Devil", url: "https://example.com/devil", img: "./img/theDevil.png" },
  { name: "The Tower", url: "https://example.com/tower", img: "./img/theTower.png" },
  { name: "The Star", url: "https://example.com/star", img: "./img/theStar.png" },
  { name: "The Moon", url: "https://example.com/moon", img: "./img/theMoon.png" },
  { name: "The Sun", url: "https://example.com/sun", img: "./img/theSun.png" },
  { name: "Judgement", url: "https://example.com/judgement", img: "./img/judgement.png" },
  { name: "The World", url: "https://example.com/world", img: "./img/theWorld.png" }
];

let isShuffled = false;

function createCard(card, isBack = false) {
  const cardWrapper = document.createElement('div');
  cardWrapper.classList.add('card-wrapper');

  const link = document.createElement('a');
  link.href = card.url;
  link.style.display = 'block';

  const cardDiv = document.createElement('div');
  cardDiv.classList.add('card');

  const img = document.createElement('img');
  img.src = isBack ? './img/card-back.png' : card.img;
  img.alt = card.name;

  cardDiv.appendChild(img);
  link.appendChild(cardDiv);
  cardWrapper.appendChild(link);

  link.addEventListener('click', (event) => {
    if (!isShuffled) {
      event.preventDefault();
      alert('Please click Start button first!');
    } else {
      event.preventDefault();
      const clickedLink = event.currentTarget;
      clickedLink.style.zIndex = 1000;

      gsap.to(clickedLink, {
        scale: 1.2,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          setTimeout(() => {
            window.location.href = card.url;
          }, 300);
        }
      });
    }
  });

  return cardWrapper;
}

function displayCards() {
  deck.innerHTML = '';
  cards.forEach((card) => {
    const cardElement = createCard(card, true);
    deck.appendChild(cardElement);
  });

  const deckCards = document.querySelectorAll('#card-deck .card-wrapper');
  gsap.set(deckCards, {
    position: 'absolute',
    left: '50%',
    top: '50%',
    xPercent: -50,
    yPercent: -50,
    rotation: () => Math.random() * 6 - 3,
    y: (i) => -i * 0.5
  });
}

function shuffleDeck() {
  const shuffledCards = [...cards].sort(() => Math.random() - 0.5);
  shuffleBtn.style.display = 'none';
  hand.innerHTML = '';
  hand.style.display = 'grid';
  hand.style.gridTemplateColumns = 'repeat(8, 79px)';
  hand.style.justifyContent = 'center';
  hand.style.gap = '10px';

  const deckCards = Array.from(deck.querySelectorAll('.card-wrapper'));
  if (deckCards.length === 0) return;

  const tl = gsap.timeline({
    onComplete: () => {
      isShuffled = true;
      shuffleBtn.style.display = 'block';
    }
  });

  tl.to(deck, {
    duration: 0.8,
    y: 150,
    ease: 'power3.inOut'
  });

  const startYOffset = -100;

  shuffledCards.forEach((card, index) => {
    const deckTop = deckCards[deckCards.length - 1 - (index % deckCards.length)];
    if (!deckTop) return;

    gsap.set(deckTop, {
      y: 150 + startYOffset,
      zIndex: 100 + index,
    });

    const newCard = createCard(card, true);
    newCard.style.opacity = 0;
    hand.appendChild(newCard);

    const handRect = hand.getBoundingClientRect();
    const cardRect = newCard.getBoundingClientRect();
    const targetX = cardRect.left - handRect.left;
    const targetY = cardRect.top - handRect.top;

    tl.to(deckTop, {
      duration: 0.4,
      x: targetX - 200,
      y: targetY - 250,
      rotation: Math.random() * 10 - 5,
      ease: 'power2.out',
      onStart: () => {
        deckTop.style.zIndex = 200 + index;
      },
      onComplete: () => {
        newCard.style.opacity = 1;
        deckTop.remove();
      }
    }, '-=0.2');
  });
}

window.addEventListener('load', () => {
  displayCards();

  gsap.set(deck, {
    y: 0,
    xPercent: -50,
    left: '50%',
    top: '10%',
    position: 'absolute',
  });
});

shuffleBtn.addEventListener('click', () => {
  if (!isShuffled) {
    shuffleDeck();
  } else {
    location.reload();
  }
});
