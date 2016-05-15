game = {
  board: {
    rows: 6,
    columns: 7
  },
  player1: {
    score: 0,
    class: 'black'
  },
  player2: {
    score: 0,
    class: 'red',
  },
  currentPlayer: null,
  mark: null,
  functions: {
    switchPlayer: function(){
      if (game.currentPlayer == game.player1) {
        game.currentPlayer = game.player2;
      } else if (game.currentPlayer == game.player2){
        game.currentPlayer = game.player1;
      }
    },
    // function to determine whether a player can make a given move or not
    move: function(){
            if (!$(this).hasClass('red') &&
                !$(this).hasClass('black') && true) {
                // check that this doesnt have a class of black or red.
                // check that this either doesnt have a square below it
                // or that the square below it has a class of red or black
                // () {
              console.log($(this).siblings());
              $(this).addClass(game.currentPlayer.class);
              game.functions.switchPlayer()
            }
    }
  },
  init: function(){
          this.currentPlayer = game.player1;
          this.mark = game.currentPlayer.class;
          // builds the game board
          // for (var i=0; i<game.board.rows; i++) {
          //   // document.querySelector('#container').innerHTML += '<div class="row"'
          //   for (var u=0; u<game.board.columns; u++) {
          //     if (!u) {
          //       document.querySelector('#container').innerHTML += '<div class="row">';
          //     }
          //     document.querySelector('#container').innerHTML += '<div class="box"></div>';
          //     if (u<game.board.columns-1) {
          //       document.querySelector('#container').innerHTML += '<div class="divider"></div>'
          //     };
          //     if (u == game.board.columns-1) {
          //       document.querySelector('#container').innerHTML += '</div>'
          //     };
          //   };
          //   // document.querySelector('#container').innerHTML += '</div>';
          // };
          $('.box').on('click', game.functions.move);
  },

}


game.init()
