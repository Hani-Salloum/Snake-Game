import { update as updateSnake, draw as drawSnake, getSnakeHead, snakeIntersection } from "./snake.js";
import { update as updateFood, draw as drawFood } from "./food.js";
import { outsideGrid } from "./grid.js";

let x, y;
if(window.sessionStorage.getItem("snake-speed")) {
    x = window.sessionStorage.getItem("snake-speed");
} else {
    x = 1;
}

if(window.sessionStorage.getItem("exp-rate")) {
    y = window.sessionStorage.getItem("exp-rate");
} else {
    y = 1;
}

let SNAKE_SPEED = x;
// let SNAKE_SPEED_DOUBLE = SNAKE_SPEED * 2;
export let EXPANSION_RATE = y;



let lastRenderTime = 0;
const gameBoard = document.getElementById("game-board");
let gameOver = false;

window.onload = function () {
    let div = document.createElement("div");
    div.className = "lose";
    div.innerHTML = `
                <div>
                    <h4>NEW GAME ! </h4>
                    <p>Input Your Settings : </p>
                    <span>Snake Speed : <input class="snake-speed" type="text" > Sq/Sec</span>
                    <span>Expantion Rate : <input class="exp-rate" type="text" > Squares</span>
                    <span class="start-game">Play</span>
                </div>
            `;
    document.body.appendChild(div);
    document.querySelector(".lose .start-game").addEventListener("click", function (e) {
        if (!(document.querySelector(".snake-speed").value == "" || document.querySelector(".snake-speed").value == null || isNaN(parseInt(document.querySelector(".snake-speed").value)))) {
            window.sessionStorage.setItem("snake-speed", parseInt(document.querySelector(".snake-speed").value));
            SNAKE_SPEED = parseInt(document.querySelector(".snake-speed").value);
            x = SNAKE_SPEED;
        }

        if (!(document.querySelector(".exp-rate").value == "" || document.querySelector(".exp-rate").value == null || isNaN(parseInt(document.querySelector(".exp-rate").value)))) {
            window.sessionStorage.setItem("exp-rate", parseInt(document.querySelector(".exp-rate").value));
            EXPANSION_RATE = parseInt(document.querySelector(".exp-rate").value);
        }
        e.currentTarget.parentNode.parentNode.remove();
    });
}

function main(currentTime) {
    if (gameOver) {
        document.getElementById("fail").play();
        setTimeout(() => {
            window.location.reload();
        } ,3000)
        return;
    }

    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;
    lastRenderTime = currentTime;
    // console.log(secondsSinceLastRender);

    update();
    draw();
}

window.requestAnimationFrame(main);

function update() {
    updateSnake();
    updateFood();
    checkDeath();
}

function draw() {
    gameBoard.innerHTML = "";
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}

export function increaseSpeed() {
    SNAKE_SPEED = x * 2;
    console.log("double = " + SNAKE_SPEED)
}

export function decreaseSpeed() {
    SNAKE_SPEED = x;
    console.log("regular = " + SNAKE_SPEED);
}