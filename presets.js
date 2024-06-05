/* eslint-disable max-len */

const presets = [
  {
    name: 'empty',
    boardData: [],
  },
  {
    name: 'glider',
    default: true,
    boardData: [[59, 33], [60, 34], [58, 35], [59, 35], [60, 35]],
  },
  {
    name: '4-8-12 diamond',
    boardData: [[58, 30], [59, 30], [60, 30], [61, 30], [56, 32], [57, 32], [58, 32], [59, 32], [60, 32], [61, 32], [62, 32], [63, 32], [54, 34], [55, 34], [56, 34], [57, 34], [58, 34], [59, 34], [60, 34], [61, 34], [62, 34], [63, 34], [64, 34], [65, 34], [56, 36], [57, 36], [58, 36], [59, 36], [60, 36], [61, 36], [62, 36], [63, 36], [58, 38], [59, 38], [60, 38], [61, 38]],
  },
  {
    name: 'Gosper glider gun',
    boardData: [[52, 13], [50, 14], [52, 14], [40, 15], [41, 15], [48, 15], [49, 15], [62, 15], [63, 15], [39, 16], [43, 16], [48, 16], [49, 16], [62, 16], [63, 16], [28, 17], [29, 17], [38, 17], [44, 17], [48, 17], [49, 17], [28, 18], [29, 18], [38, 18], [42, 18], [44, 18], [45, 18], [50, 18], [52, 18], [38, 19], [44, 19], [52, 19], [39, 20], [43, 20], [40, 21], [41, 21]],
  },
  {
    name: 'Hexapole',
    boardData: [[54, 26], [55, 26], [54, 27], [55, 28], [57, 28], [57, 30], [59, 30], [59, 32], [61, 32], [62, 33], [61, 34], [62, 34]],
  },
]

export default presets
