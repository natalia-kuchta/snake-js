const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const gameOverBtn = document.querySelector("#gameOverBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "turquoise";
const snakeColor = "#FF10F0";
const snakeBorder = "black"
const foodSnake = "red"
const unitSize = 30;
let running = false;
let xVelocity = unitSize
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
    {x: unitSize * 4, y: 0},
    {x: unitSize * 3, y: 0},
    {x: unitSize * 2, y: 0},
    {x: unitSize, y: 0},
    {x: 0, y: 0}

];

window.addEventListener("keydown", changeDirection);
gameOverBtn.addEventListener("click", resetGame);
gameStart();


function gameStart() {
    running = true
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();

}

function nextTick() {
    if (running) {
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 75)
    } else {
        displayGameOver()
    }

}

function clearBoard() {
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight)

}

function createFood() {
    function randomFoood(min, max) {
        const randNumber = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize
        return randNumber
    }

    foodX = randomFoood(0, gameWidth - unitSize)
    foodY = randomFoood(0, gameWidth - unitSize)


}

function drawFood() {
    ctx.fillStyle = foodSnake;
    ctx.fillRect(foodX, foodY, unitSize, unitSize)

}

function moveSnake() {
    const head = {
        x: snake[0].x + xVelocity,
        y: snake[0].y + yVelocity
    };

    console.log('snake', snake);

    snake.unshift(head)

    if (snake[0].x === foodX && snake[0].y === foodY) {
        score += 1
        scoreText.textContent = score
        createFood()

    } else {
        snake.pop()
    }

}


function drawSnake() {
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize)
    })

}

function changeDirection(event) {
    const keyPressed = event.keyCode;
    const LEFT = 37;
    const RIGHT = 39;
    const UP = 38;
    const DOWN = 40;


    const goingUP=(yVelocity === -unitSize);
    const goingDown=(yVelocity === unitSize);
    const goingRight=(xVelocity === unitSize);
    const goingLeft=(xVelocity === -unitSize);

    switch(true){
        case(keyPressed === LEFT && !goingRight):
            xVelocity =-unitSize;
            yVelocity=0;
            break;
        case(keyPressed === UP && !goingDown):
            xVelocity =0;
            yVelocity= -unitSize;
            break;
        case(keyPressed === RIGHT && !goingLeft):
            xVelocity =unitSize;
            yVelocity= 0;
            break;
        case(keyPressed === DOWN && !goingUP):
            xVelocity =0;
            yVelocity= unitSize;
            break;
    }


}

function checkGameOver() {
    switch(true){
        case(snake[0].x < 0):
            running=false
            break;
        case(snake[0].x >= gameWidth):
            running=false
            break;
        case(snake[0].y < 0):
            running=false
            break;
        case(snake[0].y >= gameHeight):
            running=false
            break;



    }
    for (let i= 1; i<snake.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            running=false;

        }

    }

}

function displayGameOver() {
    ctx.font= "50px MV Boli"
    ctx.fillStyle="black"
    ctx.textAlign="center"
    ctx.fillText("GAME OVER!", gameWidth/2,gameHeight/2)
    running=false

}

function resetGame() {
    score= 0
    xVelocity=unitSize
    yVelocity=-unitSize
    let snake = [
        {x: unitSize * 4, y: 0},
        {x: unitSize * 3, y: 0},
        {x: unitSize * 2, y: 0},
        {x: unitSize, y: 0},
        {x: 0, y: 0}

    ];
    gameStart()

}


