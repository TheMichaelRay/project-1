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
    winCheck: function(type, x, dir1, dir2, dir3, dir4) {
                var counter = 0;
                var $circle = $(x);
                var $check1 = $(dir1($circle));
                if (dir4){
                  $check1 = dir1(dir3($circle));
                  var $check2 = dir2(dir4($circle));
                } else if (dir2){
                  var $check2 = dir2($circle)
                }
                for (var i = 0; i < 3; i ++) {
                  if ($check1.hasClass(game.currentPlayer.class)) {
                    counter ++;
                    $circle = $check1;
                    if (dir3){
                      $check1 = dir1(dir3($circle))
                    } else {
                      $check1 = $(dir1($circle));
                    }
                  } else {
                    $circle = $(x);
                    break;
                  }
                };
                if (dir2) {
                  for (var i = 0; i < 3; i ++) {
                    if ($check2.hasClass(game.currentPlayer.class)) {
                      counter ++;
                      $circle = $check2;
                      if (dir4){
                        $check2 = dir2(dir4($circle))
                      } else {
                        $check2 = dir2($circle);
                      }
                    } else {
                        break;
                    }
                  };
                }
                if (counter >= game.connect-1) {
                  game.functions.winner(type)
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
                  $(game.player1.scoreboard).html(function(){return game.player1.score = 0});
                  $(game.player2.scoreboard).html(function(){return game.player2.score = 0})
                },
    // used to switch player turns at the end of each move
    switchPlayer: function(){
      $('.holder').toggleClass('highlight')
      if (game.currentPlayer == game.player1) {
        game.currentPlayer = game.player2;
        game.opponent = game.player1;
        $('.player .two').draggable({
          disabled: false
        })
        $('.player .one').draggable({
          disabled: true
        })
      } else if (game.currentPlayer == game.player2){
        game.currentPlayer = game.player1;
        game.opponent = game.player2;
        $('.player .one').draggable({
          disabled: false
        })
        $('.player .two').draggable({
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
            $('.box').off('click', game.functions.move)
            $(this).html('<div class="inner"></div>');
            $('.inner').addClass(game.currentPlayer.class);
            $('.inner').animate({top: $circle.offset().top - $(this).offset().top},
                                200,
                                "easeInQuad",
                                function(){
                                  $circle.addClass(game.currentPlayer.class);
                                  $('.inner').remove()
                                  game.functions.winCheck('Vertical', $circle, game.functions.$down);
                                  game.functions.winCheck('Horizontal', $circle, game.functions.$left, game.functions.$right);
                                  game.functions.winCheck('Diagonal', $circle, game.functions.$left, game.functions.$right, game.functions.$up, game.functions.$down);
                                  game.functions.winCheck('Diagonal', $circle, game.functions.$right, game.functions.$left, game.functions.$up, game.functions.$down);
                                  game.functions.switchPlayer()
                                  $('.box').click(game.functions.move)
                                })
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
            revert: true,
            revertDuration: 0
          });
          $('.player .two').draggable({
            disabled: true
          })
          $('.row').first().children().droppable({
            accept: '.player',
            drop: function(){$(this).trigger('click')}
          });
          $('#reset-board').click(game.functions.resetGame);
          $('#reset-score').click(game.functions.resetScore);
          $('.holder.one').toggleClass('highlight');
  },

}


game.init()
