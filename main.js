import p5 from 'p5'
import presets from './presets'

const boardWidht = 120
const boardHeight = 70
const cellSize = 9

let intervalId = null

const boardData = new Array(boardWidht * boardHeight).fill(false)

let draging = false
let mouseDown = false
let initialPosition
const initialPositionBordData = new Array(boardWidht * boardHeight)

window.setup = () => {
  createCanvas(boardWidht * cellSize, boardHeight * cellSize)

  const presetSelect = document.getElementById('presets')
  for (const preset of presets) {
    const option = document.createElement('option')
    option.value = preset.name
    option.text = preset.name
    option.selected = preset.default
    presetSelect.appendChild(option)
  }

  const defaultPreset = presets.find(preset => preset.default)
  setPreset(defaultPreset.name)
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

const setPreset = (presetName) => {
  boardData.fill(false)

  const preset = presets.find(p => p.name === presetName)
  for (const [x, y] of preset.boardData) {
    const index = y * boardWidht + x
    boardData[index] = true
  }
}

const click = () => {
  if (draging) return

  const x = Math.floor(mouseX / cellSize)
  const y = Math.floor(mouseY / cellSize)
  if (x < 0 || x >= boardWidht || y < 0 || y >= boardHeight) {
    return
  }

  const index = y * boardWidht + x
  boardData[index] = !boardData[index]
}

const dragStart = () => {
  mouseDown = true
  initialPosition = getCurrentCell()
}

const drag = () => {
  if (!mouseDown) return

  const current = getCurrentCell()
  if (!draging && (current.x === initialPosition.x || current.y === initialPosition.y)) {
    draging = true
    for (let i = 0; i < boardData.length; i++) {
      initialPositionBordData[i] = boardData[i]
    }
    document.body.style.cursor = 'move'
  }

  const newBoardData = moveBoard(initialPositionBordData, current.x - initialPosition.x, current.y - initialPosition.y)
  for (let i = 0; i < boardData.length; i++) {
    boardData[i] = newBoardData[i]
  }
}

const dragStop = () => {
  mouseDown = false

  if (!draging) {
    click()
    return
  }

  draging = false
  document.body.style.cursor = 'default'
}

const getCurrentCell = () => {
  const x = Math.floor(mouseX / cellSize)
  const y = Math.floor(mouseY / cellSize)
  return { x, y }
}

const moveBoard = (fromBoardData, dx, dy) => {
  const newBoardData = new Array(boardWidht * boardHeight).fill(false)

  for (let y = 0; y < boardHeight; y++) {
    for (let x = 0; x < boardWidht; x++) {
      const index = y * boardWidht + x
      const newIndex = (y + dy) * boardWidht + (x + dx)

      if (newIndex < 0 || newIndex >= boardWidht * boardHeight) {
        continue
      }

      // Skip if out of bounds - don't allow to wrap around
      if (x + dx < 0 || x + dx >= boardWidht) continue
      if (y + dy < 0 || y + dy >= boardHeight) continue

      newBoardData[newIndex] = fromBoardData[index]
    }
  }

  return newBoardData
}

const exportBoardData = () => {
  const data = boardData.map((alive, index) => {
    if (!alive) return

    const x = index % boardWidht
    const y = Math.floor(index / boardWidht)
    return [x, y]
  }).filter(cell => cell)

  const json = JSON.stringify(data)
  alert(json)
}

const importBoardData = () => {
  const json = prompt('Paste data to import')
  if (!json) return

  boardData.fill(false)

  const data = JSON.parse(json)
  for (const [x, y] of data) {
    const index = y * boardWidht + x
    boardData[index] = true
  }
}

document.getElementById('step').onclick = step
document.getElementById('startstop').onclick = startstop
document.getElementById('presets').onchange = e => setPreset(e.target.value)
document.getElementById('reset').onclick = () => setPreset(document.getElementById('presets').value)
document.getElementById('export').onclick = exportBoardData
document.getElementById('import').onclick = importBoardData
document.querySelector('main').onmousedown = dragStart
document.querySelector('main').onmousemove = drag
document.querySelector('main').onmouseup = dragStop
