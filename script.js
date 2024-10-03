document.addEventListener('DOMContentLoaded', () => {
    const cardArray = [
        { name: '⚡️', id: 1 },
        { name: '⚡️', id: 2 },
        { name: '🎮', id: 3 },
        { name: '🎮', id: 4 },
        { name: '🌙', id: 5 },
        { name: '🌙', id: 6 },
        { name: '💎', id: 7 },
        { name: '💎', id: 8 },
        { name: '✨', id: 9 },
        { name: '✨', id: 10 },
        { name: '🔒', id: 11 },
        { name: '🔒', id: 12 },
        { name: '☢️', id: 13 },
        { name: '☢️', id: 14 },
        { name: '🧿', id: 15 },
        { name: '🧿', id: 16 }
    ];

    cardArray.sort(() => 0.5 - Math.random());

    const gameBoard = document.getElementById('game-board');
    const restartBtn = document.getElementById('restart-btn');
    const startBtn = document.getElementById('start-btn');
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];

    
    function createBoard() {
        cardArray.forEach((item, i) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        });
    }

  
    function flipCard() {
        const cardId = this.getAttribute('data-id');
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);
        this.classList.add('flipped');
        this.textContent = cardArray[cardId].name;

        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }

    
    function checkForMatch() {
        const cards = document.querySelectorAll('.card');
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];

        if (cardsChosen[0] === cardsChosen[1] && optionOneId !== optionTwoId) {
            alert('¡Encontraste una coincidencia!');
            cards[optionOneId].removeEventListener('click', flipCard);
            cards[optionTwoId].removeEventListener('click', flipCard);
            cardsWon.push(cardsChosen);
        } else {
            cards[optionOneId].classList.remove('flipped');
            cards[optionTwoId].classList.remove('flipped');
            cards[optionOneId].textContent = '';
            cards[optionTwoId].textContent = '';
        }

        cardsChosen = [];
        cardsChosenId = [];

        if (cardsWon.length === cardArray.length / 2) {
            alert('¡Felicidades, encontraste todas las coincidencias!');
        }
    }

    
    startBtn.addEventListener('click', () => {
        gameBoard.style.display = 'grid';
        startBtn.classList.add('hidden'); 
        restartBtn.classList.remove('hidden');  
        createBoard();
    });

    
    restartBtn.addEventListener('click', () => {
        gameBoard.innerHTML = '';
        cardsWon = [];
        cardArray.sort(() => 0.5 - Math.random());
        createBoard();
    });
});
