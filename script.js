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
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');

    const linkElement = document.createElement('a');
    linkElement.href = card.url;
    linkElement.style.display = "block";

    linkElement.addEventListener('click', (event) => {
        if (!isShuffled) {
            event.preventDefault();
            alert('Please Click Start Button');
        } else {
            event.preventDefault();
            const clickedLink = event.currentTarget;

            clickedLink.style.zIndex = 1000;

            gsap.to(clickedLink, {
                scale: 1,
                duration: 0.5,
                ease: "power2.out",
                onComplete: () => {
                    setTimeout(() => {
                        window.location.href = card.url;
                    }, 500);
                }
            });
        }
    });

    const imageElement = document.createElement('img');
    imageElement.src = isBack ? "img/card-back.png" : card.img;
    imageElement.alt = card.name;

    cardElement.appendChild(imageElement);

    linkElement.appendChild(cardElement);
    return linkElement;
}

function displayCards() {
    cards.forEach(card => {
        const cardElement = createCard(card, true);
        deck.appendChild(cardElement);
    });
}

function shuffleDeck() {
    hand.style.display = 'none';
    shuffleBtn.style.display = 'none';
    deck.innerHTML = '';
    hand.innerHTML = '';

    cards.forEach(card => {
        const cardElement = createCard(card, true);
        deck.appendChild(cardElement);
    });

    const cardElements = document.querySelectorAll('.card');
    const shuffledCards = [...cards].sort(() => Math.random() - 0.5);

    gsap.fromTo(cardElements, {
        x: 0,
        y: 0,
        z: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        opacity: 1,
    }, {
        duration: 2,
        x: () => Math.random() * 500 - 250,
        y: () => Math.random() * 500 - 250,
        z: () => Math.random() * 500 - 250,
        rotationX: () => Math.random() * 720 - 360,
        rotationY: () => Math.random() * 720 - 360,
        rotationZ: () => Math.random() * 720 - 360,
        opacity: 0,
        stagger: 0.1,
        onComplete: () => {
            isShuffled = true;

            deck.remove();

            hand.style.display = 'flex';

            shuffledCards.forEach((card, index) => {
                const cardElement = createCard(card, true);
                hand.appendChild(cardElement);

                gsap.from(cardElement, {
                    duration: 0.5,
                    x: index * 70,
                    y: 0,
                    stagger: 0.1,
                    ease: "power2.out",
                });

                cardElement.addEventListener('click', () => {
                    const openedCard = cardElement.querySelector('.card');
                    openedCard.querySelector('img').src = card.img;
                });
            });
        }
    });
}

shuffleBtn.addEventListener('click', () => {
    if (!isShuffled) {
        shuffleDeck();
    } else {
        hand.innerHTML = '';
        shuffleDeck();
    }
});

window.addEventListener('load', () => {
    displayCards();
});