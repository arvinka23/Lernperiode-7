const gameboard = document.querySelector("#gameboard");
const playerDisplay = document.querySelector("#player");
const infoDisplay = document.querySelector("#info-display");
const width = 8;

let currentPlayer = "Weiß";
let selectedSquare = null;

// Spielfeld erstellen
function createBoard() {
    startPieces.forEach((piece, i) => {
        const square = document.createElement("div");
        square.classList.add("square");
        square.innerHTML = piece;
        square.setAttribute("square-id", i);

        // Alternierende Farben
        if ((Math.floor(i / width) + i) % 2 === 0) {
            square.classList.add("beige");
        } else {
            square.classList.add("brown");
        }

        square.addEventListener("click", () => handleSquareClick(square, i));
        gameboard.append(square);
    });
}

// Spieler wechseln
function switchPlayer() {
    currentPlayer = currentPlayer === "Weiß" ? "Schwarz" : "Weiß";
    playerDisplay.textContent = currentPlayer;
    infoDisplay.textContent = `Es ist ${currentPlayer}s Zug.`;
}

// Klick-Handler für Felder
function handleSquareClick(square, index) {
    if (selectedSquare === null) {
        // Auswahl einer Figur
        if (square.innerHTML.trim() !== "") {
            if (
                (currentPlayer === "Weiß" && square.innerHTML.charCodeAt(0) > 9817) ||
                (currentPlayer === "Schwarz" && square.innerHTML.charCodeAt(0) < 9818)
            ) {
                infoDisplay.textContent = "Falsche Farbe! Wähle eine gültige Figur.";
                return;
            }
            selectedSquare = { square, index };
            square.classList.add("selected");
            infoDisplay.textContent = "Figur ausgewählt. Wähle ein Ziel.";
        }
    } else {
        // Ziehen der Figur
        const targetSquare = square;

        // Grundlegende Zugvalidierung
        if (validateMove(selectedSquare.index, index, selectedSquare.square.innerHTML)) {
            targetSquare.innerHTML = selectedSquare.square.innerHTML;
            selectedSquare.square.innerHTML = "";
            selectedSquare.square.classList.remove("selected");
            selectedSquare = null;
            switchPlayer();
        } else {
            infoDisplay.textContent = "Ungültiger Zug. Wähle erneut.";
        }
    }
}

// Validierung von Zügen (sehr einfach)
function validateMove(fromIndex, toIndex, piece) {
    const fromRow = Math.floor(fromIndex / width);
    const fromCol = fromIndex % width;
    const toRow = Math.floor(toIndex / width);
    const toCol = toIndex % width;

    // Bewegungsmuster für jede Figur
    switch (piece) {
        case "♙": // Weißer Bauer
            return toRow === fromRow - 1 && toCol === fromCol;
        case "♟": // Schwarzer Bauer
            return toRow === fromRow + 1 && toCol === fromCol;
        case "♖": // Turm
        case "♜":
            return toRow === fromRow || toCol === fromCol;
        case "♘": // Springer
        case "♞":
            return (
                (Math.abs(toRow - fromRow) === 2 && Math.abs(toCol - fromCol) === 1) ||
                (Math.abs(toRow - fromRow) === 1 && Math.abs(toCol - fromCol) === 2)
            );
        case "♗": // Läufer
        case "♝":
            return Math.abs(toRow - fromRow) === Math.abs(toCol - fromCol);
        case "♕": // Dame
        case "♛":
            return (
                Math.abs(toRow - fromRow) === Math.abs(toCol - fromCol) || // Diagonal
                toRow === fromRow || toCol === fromCol // Gerade
            );
        case "♔": // König
        case "♚":
            return Math.abs(toRow - fromRow) <= 1 && Math.abs(toCol - fromCol) <= 1;
        default:
            return false;
    }
}

// Initialisieren
createBoard();
playerDisplay.textContent = currentPlayer;
infoDisplay.textContent = `Es ist ${currentPlayer}s Zug.`;
