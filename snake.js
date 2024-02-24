import { getInputDirection } from "./input.js";

const sankeBody = [{ x: 11, y: 11}];
let newSegments = 0;


export function update() {
    addSegments();
    const direction = getInputDirection();
    for (let i=sankeBody.length - 2; i>=0 ; i--) {
        sankeBody[i + 1] = {...sankeBody[i]};
    }
    sankeBody[0].x += direction.x;
    sankeBody[0].y += direction.y;
}

export function draw(gameBoard) {
    sankeBody.forEach((segment, index) => {
        const snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add("snake");
        if(index === 0) snakeElement.style.backgroundColor = "hsl(200deg, 100%, 45%)"
        gameBoard.appendChild(snakeElement);
    })
}

export function expandSnake(amount) {
    newSegments += amount;
}

export function onSnake(position, {ignoreHead = false} = {}) {
    return sankeBody.some((segment, index) => {
        if(ignoreHead && index === 0) return false;
        return equalPositions(segment, position);
    })
}

export function getSnakeHead() {
    return sankeBody[0];
}

export function snakeIntersection() {
    return onSnake(sankeBody[0], {ignoreHead: true})
}

function equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

function addSegments () {
    for (let i=0 ; i< newSegments ; i++) {
        sankeBody.push({...sankeBody[sankeBody.length-1]});
    }
    newSegments = 0;
}
