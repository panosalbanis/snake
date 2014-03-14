$(document).ready(function () {
    var canvas = document.getElementById('grid'),
    ctx = canvas.getContext('2d'),
    score = $('#score'),
    applesEaten = 0,
    blockSize = 10,

    snake = {
        body: [
            {x: 20, y: 20},
            {x: 19, y: 20},
            {x: 18, y: 20},
            {x: 17, y: 20},
            {x: 16, y: 20}
        ]
    },

    sprites = {
        apples: []
    },

    directions = {
        left: 'left',
        up: 'up',
        right: 'rigth',
        down: 'down'
    },

    currentDirection = directions.right,

    gridSize = {
        width: canvas.width / blockSize,
        height: canvas.height / blockSize
    },

    gameLoop = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawApples();
        move();
        if (isDead()) {
            console.log('Game Over');
            clearInterval(game);
            ctx.fillStyle = 'rgba(255, 0, 0, 1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else {
            drawSnake();
        }
    },

    move = function () {
        snake.body.unshift({ x: snake.body[0].x, y: snake.body[0].y });
        switch (currentDirection) {
            case directions.left:
              snake.body[0].x -= 1;
              break;
            case directions.up:
              snake.body[0].y -= 1;
              break;
            case directions.right:
              snake.body[0].x += 1;
              break;
            case directions.down:
              snake.body[0].y += 1;
              break;
        }
        if (!justAteApple()) {
            snake.body.pop();
        }
    },

    justAteApple = function () {
        var head = snake.body[0];
        for (var i = 0; i < sprites.apples.length; i++) {
            if (head.x == sprites.apples[i].x && head.y == sprites.apples[i].y) {
                console.log('You ate an apple');
                sprites.apples.push({x: ~~(Math.random() * gridSize.width - 1), y: ~~(Math.random() * gridSize.height - 1)});
                sprites.apples.splice(i, 1);
                score.text(++applesEaten);
                return true;
            }
        }
        return false;
    },

    isDead = function () {
        var head = snake.body[0];
        for (var i = 1; i < snake.body.length; i++) {
            if (head.x == snake.body[i].x && head.y == snake.body[i].y) {
                console.log('You just bit yourself');
                return true;
            }
        }
        if (head.x < 0 || head.x >= gridSize.width || head.y < 0 || head.y >= gridSize.height) {
            console.log('You just hit a wall');
            return true;
        }
    },

    drawSnake = function () {
        var opacity = 1;
        var block = snake.body
        for (var i in block) {
            ctx.fillStyle = 'rgba(0, 255, 0, ' + opacity + ')';
            ctx.fillRect(block[i].x * blockSize, block[i].y * blockSize, blockSize, blockSize);
            if (opacity > 0.1) {
                opacity -= 0.05;
            }
        }
    },

    drawApples = function () {
        var block = sprites.apples
        for (var i in block) {
            ctx.fillStyle = 'rgba(255, 0, 0, 1)';
            ctx.fillRect(block[i].x * blockSize, block[i].y * blockSize, blockSize, blockSize);
        }
    },

    game = setInterval(gameLoop, 100);

    for (var i = 0; i < 4; i++) {
        sprites.apples.push({x: ~~(Math.random() * gridSize.width - 1), y: ~~(Math.random() * gridSize.height - 1)});
    }

    $(document).keypress(function (e) {
        switch (e.which) {
            case 97:
              if (currentDirection != directions.right) {
                currentDirection = directions.left;
              }
              break;
            case 119:
              if (currentDirection != directions.down) {
                currentDirection = directions.up;
              }
              break;
            case 100:
              if (currentDirection != directions.left) {
                currentDirection = directions.right;
              }
              break;
            case 115:
              if (currentDirection != directions.up) {
                currentDirection = directions.down;
              }
              break;
        }
        e.preventDefault();
    });
});
