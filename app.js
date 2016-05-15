game = {
  board: {
    rows: 6,
    columns: 7
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
