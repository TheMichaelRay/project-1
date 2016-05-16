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
            var $circle = $(this);
            var $down = $circle.parent().next().children()[$circle.index()];
            if (!$circle.hasClass(game.player1.class) &&
                !$circle.hasClass(game.player2.class) &&
                (!$down ||
                  $($down).hasClass(game.player1.class) ||
                  $($down).hasClass(game.player2.class))
                ) {
              // console.log($circle.parent().next().children()[$circle.index()]);
              $circle.addClass(game.currentPlayer.class);
              // game.functions.switchPlayer()
            }
    },
    winDown: function() {
              var counter = 0;
              var $circle = $(this);
              var $down = $circle.parent().next().children()[$circle.index()];
              for (var i = 0; i < 3; i ++)
                if($($down).hasClass(game.currentPlayer.class)) {
                  counter ++;
                  $circle = $down;
                  $down = $($circle).parent().next().children()[$($circle).index()]
                };
              if (counter >= 3) {
                alert('winner')
              }
    },
    winAcross: function() {
                 var counter = 0;
                 var $circle = $(this);
                 var $left = $circle.prev();
                 var $right = $circle.next();
                 for (var i = 0; i < 3; i ++) {
                   if ($left.hasClass(game.currentPlayer.class)) {
                     counter ++;
                     $circle = $left;
                     $left = $circle.prev();
                   } else {
                     $circle = $(this);
                     break;
                   }
                 };
                 for (var i = 0; i < 3; i++) {
                   if ($right.hasClass(game.currentPlayer.class)) {
                     counter ++;
                     $circle = $right;
                     $right = $circle.next();
                   } else {
                     break;
                   }
                 };
                 if (counter >= 3) {
                   alert ('winner')
                 }
               },
    winDiagRight: function() {
                    var counter = 0;
                    var $circle = $(this);
                    var $downRight = $($circle.parent().next().children()[$circle.index()]).next();
                    var $upLeft = $($circle.parent().prev().children()[$circle.index()]).prev();
                    for (var i = 0; i < 3; i ++) {
                      if ($downRight.hasClass(game.currentPlayer.class)) {
                        counter ++;
                        $circle = $downRight;
                        $downRight = $($circle.parent().next().children()[$circle.index()]).next();
                      } else {
                        $circle = $(this);
                        break;
                      }
                    };
                    for (var i = 0; i < 3; i ++) {
                      if ($upLeft.hasClass(game.currentPlayer.class)) {
                        counter ++;
                        $circle = $upLeft;
                        $upLeft = $($circle.parent().prev().children()[$circle.index()]).prev();
                    } else {
                        break;
                    }
                    };
                    if (counter >= 3) {
                      alert('winner')
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
          $('.box').on('click', game.functions.winDown);
          $('.box').on('click', game.functions.winAcross);
          $('.box').on('click', game.functions.winDiagRight);
          $('.box').on('click', game.functions.switchPlayer);
  },

}


game.init()
