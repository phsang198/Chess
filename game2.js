import {Chess} from './chess.js'
import { onDrop2 } from '../js/game.js';

const ws = new WebSocket("ws://localhost:8080");
ws.onopen = () => {
  console.log("Connected to WebSocket server");
};
ws.onmessage = (event) => {
  const messages_view = document.getElementById("messages");
  const message = JSON.parse(event.data);
  if (message.type === "info") 
  {
    messages_view.innerHTML += `
<p>${message.message}</p>`;

      document.getElementById("roomId").disabled = true;
    document.getElementById("userId").disabled = true;
    var button =  document.getElementById("joinRoomBtn") ;
    button.disabled = true; 

  } else 
  if (message.type === "chat") 
  {
    messages_view.innerHTML += `
<p>
  <strong>${message.userId}:</strong> ${message.message}
</p>`;
  }else 
  if (message.type === "fail") 
  {
    messages_view.innerHTML += `
<p>${message.message}</p>`;
      }
      else 
      if (message.type === "game") 
      {
        const userId = document.getElementById("userId").value;
        if (userId != message.userId)
        {
          onDrop2(message.from, message.to);
        }
      }
  messages_view.scrollTop = messages_view.scrollHeight;
};
ws.onclose = () => {
  console.log("Disconnected from WebSocket server");
};

export function joinRoom() {
  const roomId = document.getElementById("roomId").value;
  const userId = document.getElementById("userId").value;
  if (roomId && userId) {
    ws.send(JSON.stringify({
      type: "join_room",
      roomId,
      userId
    }));
  }
}

function leaveRoom() {
  const roomId = document.getElementById("roomId").value;
  const userId = document.getElementById("userId").value;
  if (roomId && userId) {
    ws.send(JSON.stringify({
      type: "leave_room",
      roomId,
      userId
    }));
    document.getElementById("roomId").disabled = false;
    document.getElementById("userId").disabled = false;
    document.getElementById("joinRoomBtn").style.display = "inline";
    document.getElementById("leaveRoomBtn").style.display = "none";
  }
}
export const sendMessage = () => {
  const roomId = document.getElementById("roomId").value;
  const userId = document.getElementById("userId").value;
  const message = document.getElementById("message").value;

  console.log("Sending message to room", roomId, ":", message);
  if (message && roomId && userId) {
    ws.send(JSON.stringify({
      type: "chat",
      roomId,
      userId,
      message
    }));
    
    document.getElementById("message").value = "";
  }
};

function sendCoord(from, to) {
  const roomId = document.getElementById("roomId").value;
  const userId = document.getElementById("userId").value;
  if (message && roomId && userId && from && to) {
    ws.send(JSON.stringify({
      type: "game",
      roomId,
      userId,
      from,
      to
    }));
    ws.send(JSON.stringify({ type: "coord", x, y }));
  }
};

window.onload=function(){
  document.getElementById("message")
  .addEventListener("keydown", function (event)
  {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("sendMessageBtn").click();
    }
});
}


var board = null
var game = new Chess()
var $status = $('#status')
var $fen = $('#fen')
var $pgn = $('#pgn')

function onDragStart (source, piece, position, orientation) {
  // do not pick up pieces if the game is over
  if (game.isGameOver()) return false

  // only pick up pieces for the side to move
  if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false
  }
}
function makeRandomMove () {
  var possibleMoves = game.moves()

  // game over
  if (possibleMoves.length === 0) return

  var randomIdx = Math.floor(Math.random() * possibleMoves.length)
  game.move(possibleMoves[randomIdx])
  board.position(game.fen())
  var audio = new Audio('./public/sound/move-opponent.mp3')
  audio.play()
  updateStatus()
}

function onDrop2 (source, target) {
  // see if the move is legal
  try{
    var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  })
    var audio = new Audio('./public/sound/move-self.mp3')
    audio.play()
  }
  catch(err)
  {
    return 'snapback'
  }
  //window.setTimeout(makeRandomMove, 700)
  

  // illegal move
  // if (move === null) 

  updateStatus()
}

function onDrop (source, target) {
  // see if the move is legal
  try{
    var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  })
    var audio = new Audio('./public/sound/move-self.mp3')
    audio.play()
  }
  catch(err)
  {
    return 'snapback'
  }
  sendCoord(from, to)
  //window.setTimeout(makeRandomMove, 700)
  

  // illegal move
  // if (move === null) 

  updateStatus()
}

// update the board position after the piece snap
// for castling, en passant, pawn promotion
function onSnapEnd () {
  board.position(game.fen())
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

  $status.html(status)
  $fen.html(game.fen())
  // pgn = pgn.split(/\s(?=[^\d\.\s]*\d\.)/);
  // pgn = pgn.join('\n')
  $pgn.html(game.pgn())
}


var current_piece_theme

var config = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd
}
board = Chessboard('myBoard', config)

updateStatus()

// $('#setRuyLopezBtn').on('click', function () {
//   var config = {
//     draggable: true,
//     position: 'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R',
//     onDragStart: onDragStart,
//     onDrop: onDrop,
//     onSnapEnd: onSnapEnd
//   }
//   board = Chessboard('myBoard', config)
//   game.load('r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq d6 0 2')
// })



$('#changeTheme').on('click', function () {
  var randomNumber = Math.floor(Math.random()*8);
  var randomTheme = theme_array[randomNumber%8];
  var config = {
    pieceTheme: randomTheme,
    draggable: true,
    position: game.fen(),
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd
  }
  current_piece_theme = randomTheme
  board = Chessboard('myBoard', config)
  game.load(game.fen())
  // game.load('r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq d6 0 2')
})
$('#restart').on('click', function () {
  var config = {
    pieceTheme: current_piece_theme,
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd
  }
  board = Chessboard('myBoard', config)
  game.reset()
  updateStatus()
}
)