import { game, snake } from './objects.js'
import { renderSnake, renderApple, createBoxes } from './renderFunctions.js'
import { updateSnakePosition, reloadGame } from './updateFunctions.js'

const useMobileControllers = () => {
    const up = document.querySelector('.up-btt')
    const down = document.querySelector('.down-btt')
    const left = document.querySelector('.left-btt')
    const right = document.querySelector('.right-btt')

    up.addEventListener('click', e => {
        game.start = true
        if(snake.direction != 'down') snake.direction = 'up'
    })

    down.addEventListener('click', e => {
        game.start = true
        if(snake.direction != 'up') snake.direction = 'down'
    })

    left.addEventListener('click', e => {
        game.start = true
        if(snake.direction != 'right') snake.direction = 'left'
    })

    right.addEventListener('click', e => {
        game.start = true
        if(snake.direction != 'left') snake.direction = 'right'
    })
}

const moveSnake = (value) => {
    switch(value) {
        case 'left':
            updateSnakePosition(-1)
            break   

        case 'right':
            updateSnakePosition(1)
            break

        case 'up':
            updateSnakePosition(-20)
            break

        case 'down':
            updateSnakePosition(20)
            break
    }
}

const verifyKeyPressed = () => {
    const shipMovimentStrategy = {
        KeyW() {
            game.start = true
            if(snake.direction != 'down') snake.direction = 'up'
        },

        KeyA() {
            game.start = true
            if(snake.direction != 'right') snake.direction = 'left'
        },
        
        KeyD() {
            game.start = true
            if(snake.direction != 'left') snake.direction = 'right'
        },

        KeyS() {
            game.start = true
            if(snake.direction != 'up') snake.direction = 'down'
        },

        Space() {
            game.isPaused = !game.isPaused
        }
    }

    const callMoveSnake = () => {
        const moviments = shipMovimentStrategy
        document.addEventListener('keypress', e => {
            shipMovimentStrategy[e.code] && moviments[e.code]()
        })
    }
    return {callMoveSnake}
}

window.onload = () => {
    const move = verifyKeyPressed()
    useMobileControllers()
    move.callMoveSnake()
    createBoxes()
    renderSnake()
    renderApple()

    const myInterval =  setInterval(e => {
        !game.isPaused && moveSnake(snake.direction)
        if(game.over) { 
            clearInterval(myInterval)
            reloadGame()
        }
    }, game.speed)
}