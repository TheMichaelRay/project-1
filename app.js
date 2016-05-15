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
  functions: {
    click: function(){}
  },
  init: function(){
          for (var i=0; i<game.board.rows; i++) {
            for (var u=0; u<game.board.columns; u++) {
              document.querySelector('#container').innerHTML += '<div class="box"></div>'
              if (u<game.board.columns-1) {
                document.querySelector('#container').innerHTML += '<div class="divider"></div>'
              }
            }
          }
        },

}


game.init()
