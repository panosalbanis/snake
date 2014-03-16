var SankeGame = function (canvas) {

    var ctx = canvas.getContext('2d'),
    message = 'Press Space To Start',
    isStarted = false,
    isOver = false,
    applesEaten = 0,
    blockSize = 10,
    statusBarBlocks = 2,
    statusBarSize = statusBarBlocks * blockSize,

    directions = {
        left: 'left',
        up: 'up',
        right: 'right',
        down: 'down'
    },

    opposites = {
        left: 'right',
        up: 'down',
        right: 'left',
        down: 'up'
    },

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

    grid = {
        startX: 0,
        startY: statusBarSize,
        width: canvas.width,
        height: canvas.height - statusBarSize,
        widthBlocks: canvas.width / blockSize,
        heightBlocks: (canvas.height - statusBarSize) / blockSize,
        firstBlockX: 0,
        firstBlockY: statusBarBlocks,
        lastBlockX: canvas.width / blockSize,
        lastBlockY: (canvas.height - statusBarSize) / blockSize + statusBarBlocks
    },

    statusBar = {
        width: canvas.width,
        height: statusBarSize
    },

    gameLoop = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGrid();
        drawStatusBar();
        move();
        if (isDead()) {
            gameOver();
        } else {
            drawApples();
            drawSnake();
        }
    },

    gameOver = function () {
        isOver = true;
        console.log('Game Over');
        message = 'Game Over, Press Space To Start Over';
        clearInterval(game);
        ctx.clearRect(grid.startX, grid.startY, grid.width, grid.height);
        drawStatusBar();
        drawGrid();
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
                applesEaten++;
                addApple();
                sprites.apples.splice(i, 1);
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
        if (head.x < grid.firstBlockX || head.x >= grid.lastBlockX || head.y < grid.firstBlockY || head.y >= grid.lastBlockY) {
            console.log('You just hit a wall');
            return true;
        }
    },

    drawSnake = function () {
        var opacity = 1,
        block = snake.body;
        for (var i in block) {
            ctx.fillStyle = 'rgba(0, 255, 0, ' + opacity + ')';
            ctx.fillRect(block[i].x * blockSize, block[i].y * blockSize, blockSize, blockSize);
            if (opacity > 0.1) {
                opacity -= 0.05;
            }
        }
    },

    drawStatusBar = function () {
        ctx.fillStyle = 'black';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('Score: ' + applesEaten, 10, 16);
        ctx.textAlign = 'center';
        ctx.fillText(message, grid.width / 2, (grid.height / 2) + statusBarSize);
    },

    drawGrid = function () {
        ctx.strokeStyle = 'black';
        ctx.strokeRect(grid.startX, grid.startY, grid.width, grid.height);
    },

    addApple = function () {
        sprites.apples.push({
            x: ~~(Math.random() * grid.widthBlocks),
            y: ~~((Math.random() * grid.heightBlocks) + statusBarBlocks)
        });
    },

    drawApples = function () {
        var block = sprites.apples;
        for (var i in block) {
            ctx.fillStyle = 'red';
            ctx.fillRect(block[i].x * blockSize, block[i].y * blockSize, blockSize, blockSize);
        }
    };

    this.setDirection = function (direction) {
        if (direction != opposites[currentDirection]) {
            currentDirection = direction;
        }
    };

    this.isStarted = function () {
        return isStarted;
    };

    this.isOver = function () {
        return isOver;
    };

    this.init = function () {
        drawGrid();
        drawStatusBar();
    };

    this.newGame = function () {
        isStarted = true;
        message = '';
        currentDirection = directions.right;
        for (var i = 0; i < 4; i++) {
            addApple();
        }
        game = setInterval(gameLoop, 100);
    };

};
