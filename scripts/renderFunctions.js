import { apple, game, snake } from './objects.js'

export const createBoxes = () => {
    const grid = document.querySelector('.grid')
    const quantityOfBoxes = 400

    for(let i = 0; i < quantityOfBoxes; i++) {
        const box = document.createElement('div')
        grid.appendChild(box)
    }
}

export const renderSnake = () => {
    const boxes = document.querySelectorAll('.grid div')
    boxes[snake.initialPosition].classList.add('snake')

    for(let i = 0; i < snake.length; i++) {
        snake.positions.push(snake.initialPosition)
        boxes[snake.initialPosition].classList.add('snake')
        snake.initialPosition += 20
    }
}

export const renderApple = () => {
    const boxes = document.querySelectorAll('.grid div')
    const boxSize = boxes[0].clientHeight
    const leftLimit = boxes[0].offsetLeft
    const rightLimit = boxes[19].offsetLeft + boxSize
    const topLimit = boxes[0].offsetTop
    const bottomLimit = boxes[380].offsetTop + boxSize

    let randomPosition = Math.floor(Math.random() * (378 - 21))

    while(true) {
        if(randomPosition == snake.currentPosition) { // corrigir isso aqui
            randomPosition = Math.floor(Math.random() * (378 - 21))
    
        } else if(boxes[randomPosition].offsetLeft == leftLimit) {
            randomPosition++
    
        } else if(boxes[randomPosition].offsetLeft + boxSize == rightLimit) {
            randomPosition--
    
        } else if(boxes[randomPosition].offsetTop == topLimit) {
            randomPosition += 20
    
        } else if(boxes[randomPosition].offsetTop + boxSize == bottomLimit) {
            randomPosition -= 20
        } else {
            apple.currentPosition = randomPosition
            boxes[apple.currentPosition].classList.add('apple')
            break
        }
    }
}