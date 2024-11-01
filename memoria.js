const cardImages = [
    'imagensG/laptop.png',
    'imagensG/computador.png',
    'imagensG/gabinete.png',
    'imagensG/headset.png',
    'imagensG/mouse.png',
    'imagensG/caixadesom2.png',
    'imagensG/Impressora.png',
    'imagensG/teclado.png'
];

let cardArray = [...cardImages, ...cardImages]; // Duplicar as imagens
let flippedCards = [];
let matchedCards = [];
const gameBoard = document.getElementById('game-board');

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    shuffle(cardArray);
    cardArray.forEach(image => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-image', image);
        card.innerHTML = `<img src="${image}" alt="Card image">`;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    const [firstCard, secondCard] = flippedCards;
    if (firstCard.getAttribute('data-image') === secondCard.getAttribute('data-image')) {
        matchedCards.push(firstCard, secondCard);
        flippedCards = [];
    } else {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        flippedCards = [];
    }

    if (matchedCards.length === cardArray.length) {
        window.location.href = 'parabens.html'; // Redireciona para a página de parabéns
    }
}

document.getElementById('restart').addEventListener('click', () => {
    gameBoard.innerHTML = '';
    cardArray = [...cardImages, ...cardImages];
    matchedCards = [];
    createBoard();
});

createBoard();
