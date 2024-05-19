import p5 from 'p5'

const boardWidht = 120
const boardHeight = 70
const cellSize = 9

let intervalId = null

const boardData = new Array(boardWidht * boardHeight).fill(false)

window.setup = () => {
  createCanvas(boardWidht * cellSize, boardHeight * cellSize)
}

window.draw = () => {
  background(255)

  drawGrid()

  fill(0)
  for (let y = 0; y < boardHeight; y++) {
    for (let x = 0; x < boardWidht; x++) {
      if (boardData[y * boardWidht + x]) {
        rect(x * cellSize, y * cellSize, cellSize, cellSize)
      }
    }
  }
}

const drawGrid = () => {
  stroke(150)

  for (let x = 0; x <= boardWidht; x++) {
    line(x * cellSize, 0, x * cellSize, boardHeight * cellSize)
  }

  for (let y = 0; y <= boardHeight; y++) {
    line(0, y * cellSize, boardWidht * cellSize, y * cellSize)
  }
}

/**
 * Rules (from Wikipedia):
 * 1. Any live cell with fewer than two live neighbors dies, as if by underpopulation.
 * 2. Any live cell with two or three live neighbors lives on to the next generation.
 * 3. Any live cell with more than three live neighbors dies, as if by overpopulation.
 * 4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
 */
const step = () => {
  const newBoardData = new Array(boardWidht * boardHeight).fill(false)

  for (let y = 0; y < boardHeight; y++) {
    for (let x = 0; x < boardWidht; x++) {
      const index = y * boardWidht + x
      const count = countNeighbors(x, y)

      if (boardData[index]) {
        newBoardData[index] = count === 2 || count === 3
      } else {
        newBoardData[index] = count === 3
      }
    }
  }

  for (let i = 0; i < boardData.length; i++) {
    boardData[i] = newBoardData[i]
  }
}

const countNeighbors = (x, y) => {
  let count = 0

  for (let dx = x - 1; dx <= x + 1; dx++) {
    for (let dy = y - 1; dy <= y + 1; dy++) {
      if (dx < 0 || dx >= boardWidht || dy < 0 || dy >= boardHeight) {
        continue
      }

      // exclude itself
      if (dx === x && dy === y) continue

      if (boardData[dy * boardWidht + dx]) {
        count++
      }
    }
  }

  return count
}

const startstop = () => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
    document.getElementById('startstop').innerText = 'Start'
    return
  }

  intervalId = setInterval(step, 100)
  document.getElementById('startstop').innerText = 'Stop'
}

window.mouseClicked = () => {
  const x = Math.floor(mouseX / cellSize)
  const y = Math.floor(mouseY / cellSize)
  if (x < 0 || x >= boardWidht || y < 0 || y >= boardHeight) {
    return
  }

  const index = y * boardWidht + x
  boardData[index] = !boardData[index]
}

document.getElementById('step').onclick = step
document.getElementById('startstop').onclick = startstop
