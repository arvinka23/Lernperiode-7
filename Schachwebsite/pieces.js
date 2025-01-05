// Schachfiguren als Unicode-Zeichen
const PIECES = {
    pawn: { white: "♙", black: "♟" },
    rook: { white: "♖", black: "♜" },
    knight: { white: "♘", black: "♞" },
    bishop: { white: "♗", black: "♝" },
    queen: { white: "♕", black: "♛" },
    king: { white: "♔", black: "♚" }
};

const START_POSITION = [
    PIECES.rook.black, PIECES.knight.black, PIECES.bishop.black, PIECES.queen.black, 
    PIECES.king.black, PIECES.bishop.black, PIECES.knight.black, PIECES.rook.black,
    PIECES.pawn.black, PIECES.pawn.black, PIECES.pawn.black, PIECES.pawn.black, 
    PIECES.pawn.black, PIECES.pawn.black, PIECES.pawn.black, PIECES.pawn.black,
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    PIECES.pawn.white, PIECES.pawn.white, PIECES.pawn.white, PIECES.pawn.white, 
    PIECES.pawn.white, PIECES.pawn.white, PIECES.pawn.white, PIECES.pawn.white,
    PIECES.rook.white, PIECES.knight.white, PIECES.bishop.white, PIECES.queen.white, 
    PIECES.king.white, PIECES.bishop.white, PIECES.knight.white, PIECES.rook.white
];
