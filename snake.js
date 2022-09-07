let counter = 0

const game = {
    isPaused: false,
    start: false,
    over: false,
    score: 0
}

const snake = {
    initialPosition: 329,
    currentPosition: 329,
    direction: null,
    length: [1, 2],
    positions: []
}

const apple = {
    currentPosition: 0,
    found: false
}

const createBoxes = () => {
    const grid = document.querySelector('.grid')
    const quantityOfBoxes = 400

    for(let i = 0; i < quantityOfBoxes; i++) {
        const box = document.createElement('div')
        grid.appendChild(box)
    }
}

const renderSnake = () => {
    const boxes = document.querySelectorAll('.grid div')
    boxes[snake.initialPosition].classList.add('snake')

    snake.length.forEach(e => {
        snake.positions.push(snake.initialPosition)
        boxes[snake.initialPosition].classList.add('snake')
        snake.initialPosition += 20
    })
}

const renderApple = () => {
    const boxes = document.querySelectorAll('.grid div')
    const leftLimit = boxes[0].offsetLeft
    const rightLimit = boxes[18].offsetLeft + 30
    const topLimit = boxes[0].offsetTop
    const bottomLimit = boxes[380].offsetTop + 30

    let randomPosition = Math.floor(Math.random() * (378 - 21))

    while(true) {
        if(randomPosition == snake.currentPosition) {
            randomPosition++
        
        } else if(boxes[randomPosition].offsetLeft == leftLimit) {
            randomPosition++
    
        } else if(boxes[randomPosition].offsetLeft + 30 == rightLimit + 30) {
            randomPosition--
    
        } else if(boxes[randomPosition].offsetTop == topLimit) {
            randomPosition += 20
    
        } else if(boxes[randomPosition].offsetTop + 30 == bottomLimit) {
            randomPosition -= 20
        } else {
            apple.currentPosition = randomPosition
            boxes[apple.currentPosition].classList.add('apple')
            break
        }
    }
}

const checkAppleFound = (box) => {
    if(snake.currentPosition == apple.currentPosition) {
        apple.found = true
        box[apple.currentPosition].classList.remove('apple')
        renderApple()
    }
}

const updateScore = () => {
    const scoreArea = document.querySelector('.score-value')
    game.score += 5
    scoreArea.innerHTML = game.score
}

const verifyBodyColision = (box) => {
    if(box[snake.currentPosition].classList[0] == 'snake') game.over = true
}

const verifyBorderColision = (box) => {
    const boxes = document.querySelectorAll('.grid div')
    const leftLimit = boxes[0].offsetLeft
    const rightLimit = boxes[18].offsetLeft + 30
    const topLimit = boxes[0].offsetTop
    const bottomLimit = boxes[380].offsetTop + 30

    if(boxes[snake.currentPosition].offsetLeft == leftLimit) {
        if(snake.direction == 'left') snake.currentPosition += 18

    } else if(boxes[snake.currentPosition].offsetLeft + 30 == rightLimit + 30) {
        if(snake.direction == 'right') snake.currentPosition -= 18

    } else if(boxes[snake.currentPosition].offsetTop == topLimit) {
        if(snake.direction == 'up') {
            for(let i = 380; i < boxes.length - 1; i++) {
                if(boxes[snake.currentPosition].offsetLeft == boxes[i].offsetLeft) {
                    snake.currentPosition = i - 20
                }
            }
        }

    } else if(boxes[snake.currentPosition].offsetTop + 30 == bottomLimit) {
        if(snake.direction == 'down') {
            for(let i = 0; i < 20; i++) {
                if(boxes[snake.currentPosition].offsetLeft == boxes[i].offsetLeft) {
                    snake.currentPosition = i + 20
                }
            }
        }
    }
}

const updateSnakePosition = (next) => {
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
        updateScore()
    }
}

const reloadGame = () => {
    const popUp = document.querySelector('.game-over-container')
    const score = document.querySelector('.final-score')
    const reloadButton = document.querySelector('.play-again-btt')

    popUp.style.display = 'flex'
    score.innerHTML = game.score
    reloadButton.addEventListener('click', e => {
        location.reload()
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
    const boxes = document.querySelectorAll('.grid div')

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
    }, 100)
}