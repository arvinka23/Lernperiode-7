const gameboard = document.querySelector("#gameboard");
const playerDisplay = document.querySelector("#player");
const infoDisplay = document.querySelector("#info-display");
const width = 8;

const startPieces = [
  rock, knight, bishop, queen, king, bishop, knight, rock,
  pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
  '', '', '', '', '', '', '', '', 
  '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '',
  pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
  rock, knight, bishop, queen, king, bishop, knight, rock
];

let currentPlayer = "Weiß";

function createBoard() {
    startPieces.forEach((piece, i) => {
        const square = document.createElement("div");
        square.classList.add("square");
        square.innerHTML = piece;
        square.setAttribute("square-id", i);

        // Alternating color for chessboard squares
        if ((Math.floor(i / width) + i) % 2 === 0) {
            square.classList.add("beige");
        } else {
            square.classList.add("brown");
        }

        gameboard.append(square);
    });
}

function switchPlayer() {
    currentPlayer = currentPlayer === "Weiß" ? "Schwarz" : "Weiß";
    playerDisplay.textContent = currentPlayer;
    infoDisplay.textContent = `Es ist ${currentPlayer}s Zug.`;
}

// Initial setup
createBoard();
playerDisplay.textContent = currentPlayer;
infoDisplay.textContent = `Es ist ${currentPlayer}s Zug.`;

// Beispiel für das Wechseln des Spielers nach einem Zug
document.querySelectorAll('.square').forEach(square => {
    square.addEventListener('click', switchPlayer); // Einfacher Click-Handler für den Wechsel (kann erweitert werden)
});
