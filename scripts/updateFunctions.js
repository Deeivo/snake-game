import { game, snake, apple } from './objects.js'
import { checkAppleFound, verifyBodyColision, verifyBorderColision } from './businessRule.js'
import { renderApple } from './renderFunctions.js'
import { copyScore } from './clipboard.js'

let counter = 0

const updateScore = () => {
    const scoreArea = document.querySelector('.score-value')
    game.score += 5
    scoreArea.innerHTML = game.score
}

export const updateSnakePosition = (next) => {
    const boxes = document.querySelectorAll('.grid div')

    snake.positions.push(snake.currentPosition)
    boxes[snake.currentPosition].classList.add('snake')
    snake.currentPosition -= -1 * next
    verifyBodyColision(boxes)
    verifyBorderColision()

    boxes[snake.currentPosition].classList.add('snake')
    boxes[snake.positions[counter]].classList.remove('snake')
    counter++

    checkAppleFound(boxes)
    if(apple.found) {
        apple.found = false
        snake.positions.push(snake.positions[snake.positions.length - 1] - 19)
        renderApple()
        updateScore()
    }
}

export const reloadGame = () => {
    const popUp = document.querySelector('.game-over-container')
    const score = document.querySelector('.final-score')
    const reloadButton = document.querySelector('.play-again-btt')
    const share = document.querySelector('.share-btt')

    popUp.style.display = 'flex'
    score.innerHTML = game.score
    reloadButton.addEventListener('click', e => {
        location.reload()
    })

    share.addEventListener('click', e => {
        copyScore()
    })
}