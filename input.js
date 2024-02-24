import { increaseSpeed , decreaseSpeed } from "./main.js";

let inputDirection = { x: 0, y: 0 };
let lastInputDirection = { x: 0, y: 0 };

window.addEventListener("keydown", e => {
    switch (e.key) {
        case "ArrowUp":
            if( (lastInputDirection.x === 0 && lastInputDirection.y === -1)){
                increaseSpeed();
            }
            if(lastInputDirection.y !== 0) break;
            inputDirection = { x: 0, y: -1 };
            break;
        case "ArrowDown":
            if( (lastInputDirection.x === 0 && lastInputDirection.y === 1)){
                increaseSpeed();
            }
            if(lastInputDirection.y !== 0) break;
            inputDirection = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
            if( (lastInputDirection.x === -1 && lastInputDirection.y === 0)){
                increaseSpeed();
            }
            if(lastInputDirection.x !== 0) break;
            inputDirection = { x: -1, y: 0 };
            break;
        case "ArrowRight":
            if( (lastInputDirection.x === 1 && lastInputDirection.y === 0)){
                increaseSpeed();
            }
            if(lastInputDirection.x !== 0) break;
            inputDirection = { x: 1, y: 0 };
            break;
    }
})

window.addEventListener("keyup", e => {
    switch (e.key) {
        case "ArrowUp":
            // if(lastInputDirection.y !== 0) break;
            decreaseSpeed();
            break;
        case "ArrowDown":
            // if(lastInputDirection.y !== 0) break;
            decreaseSpeed();
            break;
        case "ArrowLeft":
            // if(lastInputDirection.x !== 0) break;
            decreaseSpeed();
            break;
        case "ArrowRight":
            // if(lastInputDirection.x !== 0) break;
            decreaseSpeed();
            break;
    }
})

export function getInputDirection() {
    lastInputDirection = inputDirection;
    return inputDirection;
}