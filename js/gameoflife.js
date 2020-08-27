function seed() {
  return Array.from(arguments);
};

function same([x, y], [j, k]) {
  return JSON.stringify([x, y]) === JSON.stringify([j, k]) ? true : false;
};

// The game state to search for `cell` is passed as the `this` value of the function.
function contains(cell) {
  const stringState = this.map(item => JSON.stringify(item));
  return stringState.includes(JSON.stringify(cell)) ? true : false;
};

const printCell = (cell, state) => {
  const stringState = state.map(item => JSON.stringify(item));
  return contains.call(stringState, JSON.stringify(cell)) ? '\u25A3' : '\u25A2';
};

const corners = (state = []) => {

  if (!state.length) {
    return {topRight: [0,0], bottomLeft: [0,0]};
  }

  const highX = state.map(cell => cell[0]).sort((a,b) => b - a);
  const highY = state.map(cell => cell[1]).sort((a,b) => b - a);
  const topRight = [highX[0], highY[0]];

  const bottomLeft = [highX[highX.length-1], highY[highY.length-1]];
  return { topRight, bottomLeft }
};

const printCells = (state) => {

  const bottomLeft = corners.call(this, state).bottomLeft;
  const topRight = corners.call(this, state).topRight;

  if (JSON.stringify(bottomLeft) === JSON.stringify(topRight)) {
    return printCell.call(this, bottomLeft, state);
  }

  const rowLength = topRight[0] - bottomLeft[0] + 1;

  const grid = [];

  for (let j = topRight[1]; j >= bottomLeft[1]; j-- ) {
    for (let i = 0; i < rowLength; i++) {
      grid.push([bottomLeft[0] + i, j])
    }
  }

  const printArray = grid.map(cell => {
    return cell[0] === topRight[0]
      ? `${printCell.call(this, cell, state)}\n`
      : `${printCell.call(this, cell, state)} `
  });

  return printArray.join('');

};

const getNeighborsOf = ([x, y]) => {
  return [[x-1, y-1], [x, y-1], [x+1, y-1], [x-1, y], [x+1, y], [x-1, y+1], [x, y+1], [x+1, y+1]]
};

const getLivingNeighbors = (cell, state) => {
  const neighbors = getNeighborsOf.call(this, cell);

  const livingNeighbors = neighbors.filter(cell => {
    return contains.bind(state, cell).call(this, state) === true;;
  });

  return livingNeighbors;
};

const willBeAlive = (cell, state) => {};

const calculateNext = (state) => {};

const iterate = (state, iterations) => {};

const main = (pattern, iterations) => {};

const startPatterns = {
    rpentomino: [
      [3, 2],
      [2, 3],
      [3, 3],
      [3, 4],
      [4, 4]
    ],
    glider: [
      [-2, -2],
      [-1, -2],
      [-2, -1],
      [-1, -1],
      [1, 1],
      [2, 1],
      [3, 1],
      [3, 2],
      [2, 3]
    ],
    square: [
      [1, 1],
      [2, 1],
      [1, 2],
      [2, 2]
    ]
  };

  const [pattern, iterations] = process.argv.slice(2);
  const runAsScript = require.main === module;

  if (runAsScript) {
    if (startPatterns[pattern] && !isNaN(parseInt(iterations))) {
      main(pattern, parseInt(iterations));
    } else {
      console.log("Usage: node js/gameoflife.js rpentomino 50");
    }
  }

  exports.seed = seed;
  exports.same = same;
  exports.contains = contains;
  exports.getNeighborsOf = getNeighborsOf;
  exports.getLivingNeighbors = getLivingNeighbors;
  exports.willBeAlive = willBeAlive;
  exports.corners = corners;
  exports.calculateNext = calculateNext;
  exports.printCell = printCell;
  exports.printCells = printCells;
  exports.startPatterns = startPatterns;
  exports.iterate = iterate;
  exports.main = main;