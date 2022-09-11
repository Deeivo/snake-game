import { game } from "./objects.js"

export const copyScore = (value) => {
    const copyInfo = document.querySelector('.copied-area')
    const text = `Joguei snake-game-sable-delta.vercel.app 🐍 Pontuação: ${game.score}`
    navigator.clipboard.writeText(text)
    copyInfo.style.display = 'flex'

    setInterval(e => {
        copyInfo.style.opacity = 0
    }, 2000)
}