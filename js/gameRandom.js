import {Chess} from './chess.js'

var board = null
var game = new Chess()
var $status = $('#status')
var $fen = $('#fen')
var $pgn = $('#pgn')

function makeRandomMove () {
    var possibleMoves = game.moves()
  
    // game over
    if (possibleMoves.length === 0) return
  
    var randomIdx = Math.floor(Math.random() * possibleMoves.length)
    game.move(possibleMoves[randomIdx])
    board.position(game.fen())
    var audio = new Audio('./public/sound/move-self.mp3')
    audio.play()
    updateStatus()
    if (!game.isGameOver())
    {
      window.setTimeout(makeRandomMove, 700)
    } else
    {
      return
    }
}

function updateStatus () {
    var status = ''
  
    var moveColor = 'White'
    if (game.turn() === 'b') {
      moveColor = 'Black'
    }
    
    // checkmate?
    if (game.isCheckmate()) {
      var audio = new Audio('./public/sound/move-check.mp3')
      var audio1 = new Audio('./public/sound/game-end.mp3')
      audio.play()
      setTimeout(()=>{
        audio1.play()
      },700);
      status = 'Game over, ' + moveColor + ' is in checkmate.'
    }
  
    // draw?
    else if (game.isDraw()) {
      var audio = new Audio('./public/sound/game-end.mp3')
      audio.play()
      status = 'Game over, drawn position'
    }
  
    // game still on
    else {
      status = moveColor + ' to move'
  
      // check?
        if (game.isCheck()) {
            var audio = new Audio('./public/sound/move-check.mp3')
            audio.play()
            status += ', ' + moveColor + ' is in check'
        }
    }
}

board = Chessboard('myBoard', 'start')
makeRandomMove()