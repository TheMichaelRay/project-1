game = {
  connect: 4,
  board: {
    rows: 6,
    columns: 7
  },
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
  currentPlayer: null,
  opponent: null,
  functions: {
    // callback functions to traverse DOM to be used within other functions
    $down: function(x){return $(x).parent().next().children()[$(x).index()]},
    $left: function(x){return $(x).prev()},
    $right: function(x){return $(x).next()},
    $up: function(x){return $(x).parent().prev().children()[$(x).index()]},
    switchPlayer: function(){
      if (game.currentPlayer == game.player1) {
        game.currentPlayer = game.player2;
        game.opponent = game.player1;
      } else if (game.currentPlayer == game.player2){
        game.currentPlayer = game.player1;
        game.opponent = game.player2;
      }
    },
    // function to determine whether a player can make a given move or not
    move: function(){
            var $circle = $(this);
            var $down = game.functions.$down($circle);
            if (!$circle.hasClass(game.player1.class) &&
                !$circle.hasClass(game.player2.class) &&
                (!$down ||
                  $($down).hasClass(game.player1.class) ||
                  $($down).hasClass(game.player2.class))
                ) {
              // console.log($circle.parent().next().children()[$circle.index()]);
              $circle.addClass(game.currentPlayer.class);
              game.functions.switchPlayer()
            }
    },
    winDown: function() {
              var counter = 0;
              var $circle = $(this);
              var $down = game.functions.$down($circle);
              for (var i = 0; i < 3; i ++)
                if($($down).hasClass(game.opponent.class)) {
                  counter ++;
                  $circle = $($down);
                  $down = game.functions.$down($circle);
                };
              if (counter >= game.connect-1) {
                alert(game.opponent.name + " has won!")
              }
    },
    winAcross: function() {
                 var counter = 0;
                 var $circle = $(this);
                 var $left = game.functions.$left($circle);
                 var $right = game.functions.$right($circle);
                 for (var i = 0; i < 3; i ++) {
                   if ($left.hasClass(game.opponent.class)) {
                     counter ++;
                     $circle = $left;
                     $left = game.functions.$left($circle);
                   } else {
                     $circle = $(this);
                     break;
                   }
                 };
                 for (var i = 0; i < 3; i++) {
                   if ($right.hasClass(game.opponent.class)) {
                     counter ++;
                     $circle = $right;
                     $right = game.functions.$right($circle);
                   } else {
                     break;
                   }
                 };
                 if (counter >= game.connect-1) {
                   alert (game.opponent.name + " has won!")
                 }
               },
    winDiagRight: function() {
                    var counter = 0;
                    var $circle = $(this);
                    // console.log(.hasClass(game.opponent.class));
                    // var $downRight = $($circle.parent().next().children()[$circle.index()]).next();
                    var $downRight = game.functions.$right(game.functions.$down($circle))
                    // var $upLeft = $($circle.parent().prev().children()[$circle.index()]).prev();
                    var $upLeft = game.functions.$left(game.functions.$up($circle));
                    for (var i = 0; i < 3; i ++) {
                      if ($downRight.hasClass(game.opponent.class)) {
                        counter ++;
                        $circle = $downRight;
                        $downRight = game.functions.$right(game.functions.$down($circle));
                      } else {
                        $circle = $(this);
                        break;
                      }
                    };
                    for (var i = 0; i < 3; i ++) {
                      if ($upLeft.hasClass(game.opponent.class)) {
                        counter ++;
                        $circle = $upLeft;
                        $upLeft = game.functions.$left(game.functions.$up($circle));
                    } else {
                        break;
                    }
                    };
                    if (counter >= game.connect-1) {
                      alert(game.opponent.name + " has won!")
                    }
                  },
    winDiagLeft: function() {
                    var counter = 0;
                    var $circle = $(this);
                    var $downLeft = game.functions.$left(game.functions.$down($circle));
                    var $upRight = game.functions.$right(game.functions.$up($circle));
                    for (var i = 0; i < 3; i ++) {
                      if ($downLeft.hasClass(game.opponent.class)) {
                        counter ++;
                        $circle = $downLeft;
                        $downLeft = game.functions.$left(game.functions.$down($circle));
                      } else {
                        $circle = $(this);
                        break;
                      }
                      };
                    for (var i = 0; i < 3; i ++) {
                      if ($upRight.hasClass(game.opponent.class)) {
                        counter ++;
                        $circle = $upRight;
                        $upRight = game.functions.$right(game.functions.$up($circle));
                      } else {
                        break;
                      }
                      };
                    if (counter >= game.connect-1) {
                      alert(game.opponent.name + " has won!")
                    }

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
            // document.querySelector('#container').innerHTML += '</div>';
          };
          $('.box').on('click', game.functions.move);
          $('.box').on('click', game.functions.winDown);
          $('.box').on('click', game.functions.winAcross);
          $('.box').on('click', game.functions.winDiagLeft);
          $('.box').on('click', game.functions.winDiagRight);
  },

}


game.init()
