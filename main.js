import p5 from 'p5'

const boardWidht = 200
const boardHeight = 100
const cellSize = 8

const boardData = new Array(boardWidht * boardHeight).fill(false)

window.setup = () => {
  createCanvas(boardWidht * cellSize, boardHeight * cellSize)
  background(220)

  console.log(boardData)
}

window.draw = () => {
  for (let y = 0; y < boardHeight; y++) {
    for (let x = 0; x < boardWidht; x++) {
      if (boardData[y * boardWidht + x]) {
        fill(0)
      } else {
        fill(255)
      }
      rect(x * cellSize, y * cellSize, cellSize, cellSize)
    }
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
