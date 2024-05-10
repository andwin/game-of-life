import p5 from 'p5'

const boardWidht = 120
const boardHeight = 70
const cellSize = 9

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

window.mouseClicked = () => {
  const x = Math.floor(mouseX / cellSize)
  const y = Math.floor(mouseY / cellSize)
  if (x < 0 || x >= boardWidht || y < 0 || y >= boardHeight) {
    return
  }

  const index = y * boardWidht + x
  boardData[index] = !boardData[index]
}
