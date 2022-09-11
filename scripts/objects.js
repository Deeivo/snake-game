export const game = {
    isPaused: false,
    start: false,
    over: false,
    score: 0,
    speed: 102
}

export const snake = {
    initialPosition: 329,
    currentPosition: 329,
    direction: null,
    length: 2,
    positions: []
}

export const apple = {
    currentPosition: 0,
    found: false
}