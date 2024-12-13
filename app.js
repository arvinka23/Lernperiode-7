const gameboard = document.querySelector("#gameboard");
const playerDisplay = document.querySelector("#player");
const infoDisplay = document.querySelector("#info-display");
const whiteClockDisplay = document.querySelector(".white-clock");
const blackClockDisplay = document.querySelector(".black-clock");
const width = 8;

let currentPlayer = "Weiß";
let selectedSquare = null;

// Zeit für jeden Spieler (10 Minuten = 600 Sekunden)
let whiteTime = 600;
let blackTime = 600;
let gameTimer;

// Timer starten
function startTimer() {
    gameTimer = setInterval(() => {
        if (currentPlayer === "Weiß") {
            whiteTime--;
            updateClockDisplay();
        } else {
            blackTime--;
            updateClockDisplay();
        }
        
        // Zeitablauf prüfen
        if (whiteTime <= 0) {
            endGame("Schwarz");
        }
        if (blackTime <= 0) {
            endGame("Weiß");
        }
    }, 1000);
}

// Uhr aktualisieren
function updateClockDisplay() {
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    whiteClockDisplay.textContent = `Weiß: ${formatTime(whiteTime)}`;
    blackClockDisplay.textContent = `Schwarz: ${formatTime(blackTime)}`;
}

// Spiel beenden
function endGame(winner) {
    clearInterval(gameTimer);
    infoDisplay.textContent = `${winner} gewinnt! Zeit abgelaufen.`;
    gameboard.style.pointerEvents = 'none';
}

// Spielfeld erstellen
function createBoard() {
    startPieces.forEach((piece, i) => {
        const square = document.createElement("div");
        square.classList.add("square");
        square.innerHTML = piece;
        square.setAttribute("square-id", i);

        // Alternierende Farben
        const isEvenSquare = (Math.floor(i / width) + i) % 2 === 0;
        square.classList.add(isEvenSquare ? "beige" : "brown");

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
            const isWhitePiece = square.innerHTML.charCodeAt(0) < 9818;
            const isBlackPiece = square.innerHTML.charCodeAt(0) > 9817;
            
            if (
                (currentPlayer === "Weiß" && isBlackPiece) ||
                (currentPlayer === "Schwarz" && isWhitePiece)
            ) {
                infoDisplay.textContent = "Falsche Farbe! Wähle eine gültige Figur.";
                return;
            }
            
            selectedSquare = { square, index };
            square.classList.add("selected");
            infoDisplay.textContent = "Figur ausgewählt. Wähle ein Ziel.";
        }
    } else {
        const targetSquare = square;
        const targetPiece = targetSquare.innerHTML.trim();
        
        const isValidTarget = 
            (currentPlayer === "Weiß" && targetPiece.charCodeAt(0) > 9817) ||
            (currentPlayer === "Schwarz" && targetPiece.charCodeAt(0) < 9818);

        if (
            validateMove(selectedSquare.index, index, selectedSquare.square.innerHTML) && 
            (targetPiece === "" || isValidTarget)
        ) {
            if (isValidTarget) {
                infoDisplay.textContent = `${currentPlayer} schlägt eine gegnerische Figur!`;
            }

            targetSquare.innerHTML = selectedSquare.square.innerHTML;
            selectedSquare.square.innerHTML = "";
            selectedSquare.square.classList.remove("selected");
            selectedSquare = null;
            switchPlayer();
        } else {
            infoDisplay.textContent = "Ungültiger Zug. Wähle erneut.";
            selectedSquare.square.classList.remove("selected");
            selectedSquare = null;
        }
    }
}

// Validierung von Zügen
function validateMove(fromIndex, toIndex, piece) {
    const fromRow = Math.floor(fromIndex / width);
    const fromCol = fromIndex % width;
    const toRow = Math.floor(toIndex / width);
    const toCol = toIndex % width;

    // Bewegungsmuster für jede Figur
    switch (piece) {
        case "♙": // Weißer Bauer
            // Erster Zug 2 Felder
            if (fromRow === 6 && toRow === 4 && fromCol === toCol) return true;
            // Vorwärts ziehen
            if (toRow === fromRow - 1 && toCol === fromCol) return true;
            // Diagonal schlagen
            if (toRow === fromRow - 1 && Math.abs(toCol - fromCol) === 1) return true;
            return false;
        case "♟": // Schwarzer Bauer
            // Erster Zug 2 Felder
            if (fromRow === 1 && toRow === 3 && fromCol === toCol) return true;
            // Vorwärts ziehen
            if (toRow === fromRow + 1 && toCol === fromCol) return true;
            // Diagonal schlagen
            if (toRow === fromRow + 1 && Math.abs(toCol - fromCol) === 1) return true;
            return false;
        case "♖": // Weißer Turm
        case "♜": // Schwarzer Turm
            return toRow === fromRow || toCol === fromCol;
        case "♘": // Weißer Springer
        case "♞": // Schwarzer Springer
            return (
                (Math.abs(toRow - fromRow) === 2 && Math.abs(toCol - fromCol) === 1) ||
                (Math.abs(toRow - fromRow) === 1 && Math.abs(toCol - fromCol) === 2)
            );
        case "♗": // Weißer Läufer
        case "♝": // Schwarzer Läufer
            return Math.abs(toRow - fromRow) === Math.abs(toCol - fromCol);
        case "♕": // Weiße Dame
        case "♛": // Schwarze Dame
            return (
                Math.abs(toRow - fromRow) === Math.abs(toCol - fromCol) || // Diagonal
                toRow === fromRow || toCol === fromCol // Gerade
            );
        case "♔": // Weißer König
        case "♚": // Schwarzer König
            return Math.abs(toRow - fromRow) <= 1 && Math.abs(toCol - fromCol) <= 1;
        default:
            return false;
    }
}

// Initialisieren
createBoard();
playerDisplay.textContent = currentPlayer;
infoDisplay.textContent = `Es ist ${currentPlayer}s Zug.`;
updateClockDisplay();
startTimer();