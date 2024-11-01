const gameboard = document.querySelector("#gameboard")
const playerdisplay = document.querySelector("player")
const infoDisplay = document.querySelector("info-display")
const width = 8

const StartPieces =
[
rock , knight , bishop , queen , king , bishop , knight , rock ,
pawn , pawn , pawn , pawn , pawn , pawn , pawn , pawn ,
'', '', '', '', '', '', '', '', 
'', '', '', '', '', '', '', '',
'', '', '', '', '', '', '', '',
'', '', '', '', '', '', '', '',
pawn , pawn , pawn , pawn , pawn , pawn , pawn , pawn ,
rock , knight , bishop , queen , king , bishop , knight , rock

]
function createBoard() {
    StartPieces.forEach((StartPieces, i) => {
        const square = document.createElement('div')
        square.classList.add('square')
        square.innerHTML = StartPieces
        square.setAttribute('square-id' , i)
        square.classList.add('beige')
        gameboard.append(square)
    })   
}
createBoard()