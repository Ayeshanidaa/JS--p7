const ROWS = 5;
const COLS = 5;
const MAX_NUM = 25;

let currentPlayer = 1;
let player1Card, player2Card;
let player1Name, player2Name;

function createBingoCard() {
    const card = [];
    const usedNumbers = new Set();

    while (usedNumbers.size < ROWS * COLS) {
        const num = Math.floor(Math.random() * MAX_NUM) + 1;
        if (!usedNumbers.has(num)) {
            usedNumbers.add(num);
        }
    }

    const numbersArray = Array.from(usedNumbers);
    for (let i = 0; i < ROWS; i++) {
        card.push(numbersArray.slice(i * COLS, (i + 1) * COLS));
    }

    return card;
}

function displayBingoCard(card, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            const cell = document.createElement('div');
            cell.textContent = card[i][j];
            if (card[i][j] === 'X') {
                cell.classList.add('marked');
            }
            container.appendChild(cell);
        }
    }
}

function markNumber(card, number) {
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            if (card[i][j] === number) {
                card[i][j] = 'X';
                return true;
            }
        }
    }
    return false;
}

function checkWin(card) {
    for (let i = 0; i < ROWS; i++) {
        let rowFilled = true;
        let colFilled = true;
        for (let j = 0; j < COLS; j++) {
            if (card[i][j] !== 'X') {
                rowFilled = false;
            }
            if (card[j][i] !== 'X') {
                colFilled = false;
            }
        }
        if (rowFilled || colFilled) {
            return true;
        }
    }

    let diagonal1Filled = true;
    let diagonal2Filled = true;
    for (let i = 0; i < ROWS; i++) {
        if (card[i][i] !== 'X') {
            diagonal1Filled = false;
        }
        if (card[i][COLS - 1 - i] !== 'X') {
            diagonal2Filled = false;
        }
    }
    if (diagonal1Filled || diagonal2Filled) {
        return true;
    }

    return false;
}

document.getElementById('startButton').addEventListener('click', () => {
    player1Name = document.getElementById('player1Name').value || 'Player 1';
    player2Name = document.getElementById('player2Name').value || 'Player 2';
    
    document.getElementById('player1Heading').textContent = `${player1Name}'s Card`;
    document.getElementById('player2Heading').textContent = `${player2Name}'s Card`;

    player1Card = createBingoCard();
    player2Card = createBingoCard();
    displayBingoCard(player1Card, 'player1Card');
    displayBingoCard(player2Card, 'player2Card');
    
    document.getElementById('markButton').disabled = false;
    document.getElementById('startButton').disabled = true;
    document.getElementById('resetButton').disabled = false;
    document.getElementById('numberInput').disabled = false;
    document.getElementById('turnDisplay').textContent = `${player1Name}'s Turn`;
});

document.getElementById('resetButton').addEventListener('click', () => {
    player1Card = null;
    player2Card = null;
    document.getElementById('player1Card').innerHTML = '';
    document.getElementById('player2Card').innerHTML = '';
    document.getElementById('winDisplay').textContent = '';
    document.getElementById('turnDisplay').textContent = '';
    document.getElementById('player1Name').value = '';
    document.getElementById('player2Name').value = '';
    document.getElementById('numberInput').value = '';
    document.getElementById('startButton').disabled = false;
    document.getElementById('markButton').disabled = true;
    document.getElementById('resetButton').disabled = true;
    document.getElementById('numberInput').disabled = true;
});

document.getElementById('markButton').addEventListener('click', () => {
    const number = parseInt(document.getElementById('numberInput').value);
    if (currentPlayer === 1 && markNumber(player1Card, number)) {
        displayBingoCard(player1Card, 'player1Card');
        if (checkWin(player1Card)) {
            document.getElementById('winDisplay').textContent = `${player1Name} Wins!`;
            return;
        }
        currentPlayer = 2;
        document.getElementById('turnDisplay').textContent = `${player2Name}'s Turn`;
    } else if (currentPlayer === 2 && markNumber(player2Card, number)) {
        displayBingoCard(player2Card, 'player2Card');
        if (checkWin(player2Card)) {
            document.getElementById('winDisplay').textContent = `${player2Name} Wins!`;
            return;
        }
        currentPlayer = 1;
        document.getElementById('turnDisplay').textContent = `${player1Name}'s Turn`;
    }
});
