$(document).ready(function () {

    var directions = {
        left: 'left',
        up: 'up',
        right: 'right',
        down: 'down'
    },

    canvasElement = document.getElementById('grid'),

    game = new SnakeGame(canvasElement);
    game.init();

    $(document).on('keydown', function (e) {
        switch (e.which) {
            case 37:
            case 65:
                game.setDirection(directions.left);
                e.preventDefault();
                break;
            case 38:
            case 87:
                game.setDirection(directions.up);
                e.preventDefault();
                break;
            case 39:
            case 68:
                game.setDirection(directions.right);
                e.preventDefault();
                break;
            case 40:
            case 83:
                game.setDirection(directions.down);
                e.preventDefault();
                break;
            case 32:
                if (!game.isStarted()) {
                    game.newGame();
                } else if (game.isOver()) {
                    game = new SnakeGame(canvasElement);
                    game.newGame();
                }
                e.preventDefault();
                break;
        }
    });
});
