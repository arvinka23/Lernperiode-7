
class ChessGame {
    constructor() {
        this.gameboard = document.querySelector("#gameboard");
        this.playerDisplay = document.querySelector("#player");
        this.infoDisplay = document.querySelector("#info-display");
        this.whiteClockDisplay = document.querySelector(".white-clock");
        this.blackClockDisplay = document.querySelector(".black-clock");
        
        this.currentPlayer = "white";
        this.selectedSquare = null;
        this.whiteTime = 600;
        this.blackTime = 600;
        this.gameTimer = null;
        
        this.board = [...START_POSITION];
        this.createBoard();
        this.updateDisplay();
        this.startTimer();
    }

    createBoard() {
        this.gameboard.innerHTML = '';
        for (let i = 0; i < 64; i++) {
            const square = document.createElement("div");
            square.classList.add("square");
            square.setAttribute("data-index", i);
            square.innerHTML = this.board[i];
            
            const row = Math.floor(i / 8);
            const col = i % 8;
            square.classList.add((row + col) % 2 === 0 ? "beige" : "brown");
            
            square.addEventListener("click", () => this.handleSquareClick(i));
            this.gameboard.appendChild(square);
        }
    }

    updateDisplay() {
        this.playerDisplay.textContent = this.currentPlayer === "white" ? "Weiß" : "Schwarz";
        this.whiteClockDisplay.classList.toggle("active-clock", this.currentPlayer === "white");
        this.blackClockDisplay.classList.toggle("active-clock", this.currentPlayer === "black");
        this.infoDisplay.textContent = `${this.currentPlayer === "white" ? "Weiß" : "Schwarz"} ist am Zug`;
    }

    startTimer() {
        this.gameTimer = setInterval(() => {
            if (this.currentPlayer === "white") {
                this.whiteTime--;
            } else {
                this.blackTime--;
            }
            this.updateClockDisplay();
            
            if (this.whiteTime <= 0 || this.blackTime <= 0) {
                this.endGame(this.whiteTime <= 0 ? "Schwarz" : "Weiß");
            }
        }, 1000);
    }

    updateClockDisplay() {
        const formatTime = (seconds) => {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
        };
        
        this.whiteClockDisplay.textContent = `Weiß: ${formatTime(this.whiteTime)}`;
        this.blackClockDisplay.textContent = `Schwarz: ${formatTime(this.blackTime)}`;
    }

    handleSquareClick(index) {
        const square = this.gameboard.children[index];
        const piece = this.board[index];
        
        if (!this.selectedSquare) {
            if (piece && this.isPieceOwnedByCurrentPlayer(piece)) {
                this.selectedSquare = index;
                square.classList.add("selected");
                this.showValidMoves(index);
            }
        } else {
            if (index === this.selectedSquare) {
                this.clearSelection();
            } else if (this.isValidMove(this.selectedSquare, index)) {
                this.makeMove(this.selectedSquare, index);
            } else {
                this.clearSelection();
            }
        }
    }

    makeMove(from, to) {
        this.board[to] = this.board[from];
        this.board[from] = '';
        this.clearSelection();
        this.currentPlayer = this.currentPlayer === "white" ? "black" : "white";
        this.updateDisplay();
        this.createBoard(); // Brett neu zeichnen
    }

    isPieceOwnedByCurrentPlayer(piece) {
        if (!piece) return false;
        const isWhitePiece = "♔♕♖♗♘♙".includes(piece);
        return (this.currentPlayer === "white" && isWhitePiece) ||
               (this.currentPlayer === "black" && !isWhitePiece);
    }

    isValidMove(from, to) {
        const piece = this.board[from];
        const targetPiece = this.board[to];
        
        if (!piece || (targetPiece && this.isPieceOwnedByCurrentPlayer(targetPiece))) {
            return false;
        }

        const fromRow = Math.floor(from / 8);
        const fromCol = from % 8;
        const toRow = Math.floor(to / 8);
        const toCol = to % 8;

        // Bewegungsregeln für jede Figur implementieren
        switch (piece) {
            case PIECES.pawn.white:
                if (fromCol === toCol && !targetPiece) {
                    if (fromRow === 6 && toRow === 4) return true;
                    if (fromRow - 1 === toRow) return true;
                }
                if (Math.abs(fromCol - toCol) === 1 && fromRow - 1 === toRow && targetPiece) {
                    return true;
                }
                return false;

            case PIECES.pawn.black:
                if (fromCol === toCol && !targetPiece) {
                    if (fromRow === 1 && toRow === 3) return true;
                    if (fromRow + 1 === toRow) return true;
                }
                if (Math.abs(fromCol - toCol) === 1 && fromRow + 1 === toRow && targetPiece) {
                    return true;
                }
                return false;

            case PIECES.rook.white:
            case PIECES.rook.black:
                return fromRow === toRow || fromCol === toCol;

            case PIECES.knight.white:
            case PIECES.knight.black:
                return (Math.abs(fromRow - toRow) === 2 && Math.abs(fromCol - toCol) === 1) ||
                       (Math.abs(fromRow - toRow) === 1 && Math.abs(fromCol - toCol) === 2);

            case PIECES.bishop.white:
            case PIECES.bishop.black:
                return Math.abs(fromRow - toRow) === Math.abs(fromCol - toCol);

            case PIECES.queen.white:
            case PIECES.queen.black:
                return fromRow === toRow || fromCol === toCol ||
                       Math.abs(fromRow - toRow) === Math.abs(fromCol - toCol);

            case PIECES.king.white:
            case PIECES.king.black:
                return Math.abs(fromRow - toRow) <= 1 && Math.abs(fromCol - toCol) <= 1;
        }
        
        return false;
    }

    showValidMoves(index) {
        for (let i = 0; i < 64; i++) {
            if (this.isValidMove(index, i)) {
                this.gameboard.children[i].classList.add("valid-move");
            }
        }
    }

    clearSelection() {
        this.selectedSquare = null;
        document.querySelectorAll(".square").forEach(square => {
            square.classList.remove("selected", "valid-move");
        });
    }

    endGame(winner) {
        clearInterval(this.gameTimer);
        this.infoDisplay.textContent = `${winner} gewinnt!`;
        this.gameboard.style.pointerEvents = 'none';
    }
}

// Spiel starten
document.addEventListener('DOMContentLoaded', () => {
    new ChessGame();
});
