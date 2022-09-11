import { apple, snake, game } from './objects.js'

export const checkAppleFound = (box) => {
    if(snake.currentPosition == apple.currentPosition) {
        apple.found = true
        box[apple.currentPosition].classList.remove('apple')
    }
}

export const verifyBodyColision = (box) => {
    if(box[snake.currentPosition].classList[0] == 'snake') game.over = true
}

export const verifyBorderColision = (box) => {
    const boxes = document.querySelectorAll('.grid div')
    const boxSize = boxes[0].clientHeight
    const leftLimit = boxes[0].offsetLeft
    const rightLimit = boxes[19].offsetLeft + boxSize
    const topLimit = boxes[0].offsetTop
    const bottomLimit = boxes[380].offsetTop + boxSize

    if(boxes[snake.currentPosition].offsetLeft == leftLimit) {
        if(snake.direction == 'left') snake.currentPosition += 18

    } else if(boxes[snake.currentPosition].offsetLeft + boxSize == rightLimit) {
        if(snake.direction == 'right') snake.currentPosition -= 18

    } else if(boxes[snake.currentPosition].offsetTop == topLimit) {
        if(snake.direction == 'up') {
            for(let i = 380; i < boxes.length - 1; i++) {
                if(boxes[snake.currentPosition].offsetLeft == boxes[i].offsetLeft) {
                    snake.currentPosition = i - 20
                }
            }
        }

    } else if(boxes[snake.currentPosition].offsetTop + boxSize == bottomLimit) {
        if(snake.direction == 'down') {
            for(let i = 0; i < 20; i++) {
                if(boxes[snake.currentPosition].offsetLeft == boxes[i].offsetLeft) {
                    snake.currentPosition = i + 20
                }
            }
        }
    }
}