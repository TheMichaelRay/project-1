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
  init: function(){
          this.currentPlayer = game.player1;
          this.mark = game.currentPlayer.class;
          for (var i=0; i<game.board.rows; i++) {
            for (var u=0; u<game.board.columns; u++) {
              document.querySelector('#container').innerHTML += '<div class="box"></div>'
              if (u<game.board.columns-1) {
                document.querySelector('#container').innerHTML += '<div class="divider"></div>'
              }
            }
          };
          $('.box').on('click', function(){
            if (!$(this).hasClass('red') && !$(this).hasClass('black')) {
              console.log("boom");
              $(this).addClass(game.currentPlayer.class);
            }
          });
  },

}


game.init()
