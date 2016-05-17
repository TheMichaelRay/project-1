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
    name: "Player One",
    scoreboard: '#player-one-score span'
  },
  player2: {
    score: 0,
    class: 'red',
    name: "Player Two",
    scoreboard: '#player-two-score span'
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
    // winDown: function(x) {
    //             var counter = 0;
    //             var $circle = $(x);
    //             var $down = game.functions.$down($circle);
    //             for (var i = 0; i < 3; i ++)
    //               if($($down).hasClass(game.currentPlayer.class)) {
    //                 counter ++;
    //                 $circle = $($down);
    //                 $down = game.functions.$down($circle);
    //               };
    //             if (counter >= game.connect-1) {
    //               game.functions.winner('Vertical')
    //             }
    // },
    // winAcross: function(x) {
    //              var counter = 0;
    //              var $circle = $(x);
    //              var $left = game.functions.$left($circle);
    //              var $right = game.functions.$right($circle);
    //              for (var i = 0; i < 3; i ++) {
    //                if ($left.hasClass(game.currentPlayer.class)) {
    //                  counter ++;
    //                  $circle = $left;
    //                  $left = game.functions.$left($circle);
    //                } else {
    //                  $circle = $(x);
    //                  break;
    //                }
    //              };
    //              for (var i = 0; i < 3; i++) {
    //                if ($right.hasClass(game.currentPlayer.class)) {
    //                  counter ++;
    //                  $circle = $right;
    //                  $right = game.functions.$right($circle);
    //                } else {
    //                  break;
    //                }
    //              };
    //              if (counter >= game.connect-1) {
    //                game.functions.winner('Horizontal')
    //              }
    //            },
    winCheck: function(x, check1, check2, check3, check4) {
                var counter = 0;
                var $circle = $(x);
                var $check1 = $(check1($circle));
                if (check4){
                  $check1 = check1(check3($circle));
                  var $check2 = check2(check4($circle));
                } else if (check2){
                  var $check2 = check2($circle)
                }
                for (var i = 0; i < 3; i ++) {
                  if ($check1.hasClass(game.currentPlayer.class)) {
                    counter ++;
                    $circle = $check1;
                    if (check3){
                      $check1 = check1(check3($circle))
                    } else {
                      $check1 = $(check1($circle));
                    }
                  } else {
                    $circle = $(x);
                    break;
                  }
                };
                if (check2) {
                  for (var i = 0; i < 3; i ++) {
                    if ($check2.hasClass(game.currentPlayer.class)) {
                      counter ++;
                      $circle = $check2;
                      if (check4){
                        $check2 = check2(check4($circle))
                      } else {
                        $check2 = check2($circle);
                      }
                    } else {
                        break;
                    }
                  };
                }
                if (counter >= game.connect-1) {
                  game.functions.winner('Diagonal')
                }
              },
    winner : function(winType){
               game.currentPlayer.score ++;
               $(game.currentPlayer.scoreboard).html(game.currentPlayer.score)
               alert(game.currentPlayer.name + " Has Won By " + winType + '!');
               game.functions.resetGame()
             },
    resetGame: function(){
                 $('.box').removeClass('black');
                 $('.box').removeClass('red');
               },
    resetScore: function(){
                  $(game.player1.scoreboard).html(function(){return game.player1.score ++});
                  $(game.player2.scoreboard).html(function(){return game.player2.score ++})
                },
    // used to switch player turns at the end of each move
    switchPlayer: function(){
      if (game.currentPlayer == game.player1) {
        game.currentPlayer = game.player2;
        game.opponent = game.player1;
        $('.two').draggable({
          disabled: false
        })
        $('.one').draggable({
          disabled: true
        })
      } else if (game.currentPlayer == game.player2){
        game.currentPlayer = game.player1;
        game.opponent = game.player2;
        $('.one').draggable({
          disabled: false
        })
        $('.two').draggable({
          disabled: true
        })
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
            // game.functions.winDown($circle);
            // game.functions.winAcross($circle);
            game.functions.winCheck($circle, game.functions.$down);
            game.functions.winCheck($circle, game.functions.$left, game.functions.$right);
            game.functions.winCheck($circle, game.functions.$left, game.functions.$right, game.functions.$up, game.functions.$down);
            game.functions.winCheck($circle, game.functions.$right, game.functions.$left, game.functions.$up, game.functions.$down);
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
          $('.player').draggable({
            cursor: 'none',
            handle: 'player',
            revert: true,
            revertDuration: 0
          });
          $('.two').draggable({
            disabled: true
          })
          $('.box').droppable({
            accept: '.player',
            drop: function(){$(this).trigger('click')}
          });
          $('#reset-board').click(game.functions.resetGame);
          $('#reset-score').click(game.functions.resetScore)
  },

}


game.init()
