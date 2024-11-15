// Schachfiguren als Unicode-Zeichen
const pieces = {
    pawn: { white: "♙", black: "♟" },
    rook: { white: "♖", black: "♜" },
    knight: { white: "♘", black: "♞" },
    bishop: { white: "♗", black: "♝" },
    queen: { white: "♕", black: "♛" },
    king: { white: "♔", black: "♚" },
};

const startPieces = [
    pieces.rook.black, pieces.knight.black, pieces.bishop.black, pieces.queen.black, pieces.king.black, pieces.bishop.black, pieces.knight.black, pieces.rook.black,
    pieces.pawn.black, pieces.pawn.black, pieces.pawn.black, pieces.pawn.black, pieces.pawn.black, pieces.pawn.black, pieces.pawn.black, pieces.pawn.black,
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    pieces.pawn.white, pieces.pawn.white, pieces.pawn.white, pieces.pawn.white, pieces.pawn.white, pieces.pawn.white, pieces.pawn.white, pieces.pawn.white,
    pieces.rook.white, pieces.knight.white, pieces.bishop.white, pieces.queen.white, pieces.king.white, pieces.bishop.white, pieces.knight.white, pieces.rook.white
];
