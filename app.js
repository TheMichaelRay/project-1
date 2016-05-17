game = {
  // sets how many connects game will play until
  connect: 4,
  // used for building the game board during initialization
  board: {
    rows: 6,
    columns: 7
  },
  // used to keep score for each player, add classes, and display win messages
  player1: {
    score: 0,
    class: 'black',
    name: "Player One"
  },
  player2: {
    score: 0,
    class: 'red',
    name: "Player Two"
  },
  // currentPlayer used in wincheck and move functions
  currentPlayer: null,
  // opponent is currently unused and is a placeholder
  opponent: null,
  // function bank
  functions: {
    // callback functions to traverse DOM to be used within other functions
    $down: function(x){return $(x).parent().next().children()[$(x).index()]},
    $left: function(x){return $(x).prev()},
    $right: function(x){return $(x).next()},
    $up: function(x){return $(x).parent().prev().children()[$(x).index()]},
    // algorithms to check for matches on the board after each turn
    winDown: function(x) {
              var counter = 0;
              var $circle = $(x);
              var $down = game.functions.$down($circle);
              for (var i = 0; i < 3; i ++)
                if($($down).hasClass(game.currentPlayer.class)) {
                  counter ++;
                  $circle = $($down);
                  $down = game.functions.$down($circle);
                };
              if (counter >= game.connect-1) {
                alert(game.currentPlayer.name + " has won!")
              }
    },
    winAcross: function(x) {
                 var counter = 0;
                 var $circle = $(x);
                 var $left = game.functions.$left($circle);
                 var $right = game.functions.$right($circle);
                 for (var i = 0; i < 3; i ++) {
                   if ($left.hasClass(game.currentPlayer.class)) {
                     counter ++;
                     $circle = $left;
                     $left = game.functions.$left($circle);
                   } else {
                     $circle = $(x);
                     break;
                   }
                 };
                 for (var i = 0; i < 3; i++) {
                   if ($right.hasClass(game.currentPlayer.class)) {
                     counter ++;
                     $circle = $right;
                     $right = game.functions.$right($circle);
                   } else {
                     break;
                   }
                 };
                 if (counter >= game.connect-1) {
                   alert (game.currentPlayer.name + " has won!")
                 }
               },
    winDiagRight: function(x) {
                    var counter = 0;
                    var $circle = $(x);
                    var $downRight = game.functions.$right(game.functions.$down($circle))
                    var $upLeft = game.functions.$left(game.functions.$up($circle));
                    for (var i = 0; i < 3; i ++) {
                      if ($downRight.hasClass(game.currentPlayer.class)) {
                        counter ++;
                        $circle = $downRight;
                        $downRight = game.functions.$right(game.functions.$down($circle));
                      } else {
                        $circle = $(x);
                        break;
                      }
                    };
                    for (var i = 0; i < 3; i ++) {
                      if ($upLeft.hasClass(game.currentPlayer.class)) {
                        counter ++;
                        $circle = $upLeft;
                        $upLeft = game.functions.$left(game.functions.$up($circle));
                    } else {
                        break;
                    }
                    };
                    if (counter >= game.connect-1) {
                      alert(game.currentPlayer.name + " has won!")
                    }
                  },
    winDiagLeft: function(x) {
                    var counter = 0;
                    var $circle = $(x);
                    var $downLeft = game.functions.$left(game.functions.$down($circle));
                    var $upRight = game.functions.$right(game.functions.$up($circle));
                    for (var i = 0; i < 3; i ++) {
                      if ($downLeft.hasClass(game.currentPlayer.class)) {
                        counter ++;
                        $circle = $downLeft;
                        $downLeft = game.functions.$left(game.functions.$down($circle));
                      } else {
                        $circle = $(x);
                        break;
                      }
                      };
                    for (var i = 0; i < 3; i ++) {
                      if ($upRight.hasClass(game.currentPlayer.class)) {
                        counter ++;
                        $circle = $upRight;
                        $upRight = game.functions.$right(game.functions.$up($circle));
                      } else {
                        break;
                      }
                      };
                    if (counter >= game.connect-1) {
                      alert(game.currentPlayer.name + " has won!")
                    }
                  },
    // used to switch player turns at the end of each move
    switchPlayer: function(){
      if (game.currentPlayer == game.player1) {
        game.currentPlayer = game.player2;
        game.opponent = game.player1;
      } else if (game.currentPlayer == game.player2){
        game.currentPlayer = game.player1;
        game.opponent = game.player2;
      }
    },
    // determines valid moves, executes them, checks for wins, and switches turns
    move: function(){
            var $circle = $(this);
            var $down = game.functions.$down($circle);
            if ($circle.hasClass(game.player1.class) ||
                $circle.hasClass(game.player2.class)) {
                  return null;
                };
            for (var i = 0; i < game.board.rows; i ++) {
              if (!$circle.hasClass(game.player1.class) &&
                  !$circle.hasClass(game.player2.class) &&
                  (!$down ||
                    $($down).hasClass(game.player1.class) ||
                    $($down).hasClass(game.player2.class))) {
                      break;
                    } else {
                      $circle = $($down);
                      $down = game.functions.$down($circle);
                    }
              };
            $circle.addClass(game.currentPlayer.class);
            game.functions.winDown($circle);
            game.functions.winAcross($circle);
            game.functions.winDiagLeft($circle);
            game.functions.winDiagRight($circle);
            game.functions.switchPlayer()
    }
  },
  init: function(){
          this.currentPlayer = game.player1;
          this.opponent = game.player2;
          // builds the game board
          for (var i=0; i<game.board.rows; i++) {
            for (var u=0; u<game.board.columns; u++) {
              document.querySelector('#container').innerHTML += '<div class="box"></div>';
            };
            $('#container').children('.box').wrapAll('<div class="row"></div>')
          };
          $('.box').click(game.functions.move);
          // $('.box').click(game.functions.winDown);
          // $('.box').click(game.functions.winAcross);
          // $('.box').click(game.functions.winDiagLeft);
          // $('.box').click(game.functions.winDiagRight);
          $('.player.one').draggable()
          $('.player.two').draggable()
  },

}


game.init()
