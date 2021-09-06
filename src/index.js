const { log } = console;
class RowCol {
  constructor(arr = [], zeros = 9) {
    this.arr = arr;
    this.zeros = zeros;
  }
}

function getZeros(arr) {
  let res = 0;
  return arr.reduce((count, item) => item === 0 ? ++count : count, 0);
};


module.exports = function solveSudoku(matrix) {
  return getEndSudoku(matrix, 0);

  function getEndSudoku(matrix, repeat) {
    let newMatrix = matrix.slice();
    // console.table(newMatrix);
    let rows = []; 
    let cols = [];
    let minZerosRow = 10;
    let minZerosCol = 10;
    let noZeros = true;
    let row = [];
    for (let i = 0; i < 9; i++) { 
      row = newMatrix[i].slice();
      let countZerosRow = getZeros(row);
      rows.push(new RowCol(row, countZerosRow));
      if (minZerosRow > countZerosRow && countZerosRow > 0) {
        minZerosRow = countZerosRow;
        minZerosRowPos = i;
      }
      
      let col = []; 
      for (let k = 0; k < 9; k++) {
        col.push(newMatrix[k][i]);
      }
      let countZerosCol = getZeros(col);
      cols.push(new RowCol(col, countZerosCol));
      if (minZerosCol > countZerosCol && countZerosCol > 0) {
        minZerosCol = countZerosCol;
        minZerosColPos = i;
      }
      // log({countZerosRow});
      if (countZerosRow || countZerosCol) {
        noZeros = false;
      }
    }
  
    // log({noZeros});
    repeat++;
    // console.log({repeat});
    if (noZeros || repeat > 81) {
      return newMatrix;
    }
    // log('rows:');
    // log(rows);
    // log('cols:');
    // log(cols);
  
    // log(minZerosRowPos);
    // log(minZerosColPos);
    let firstArr = [];
    let secondArr = [];
    if (minZerosRow < minZerosCol) {
      firstArr = rows[minZerosRowPos].arr;
      minZerosCol = 9;
      for (let j = 0; j < 9; j++) {
        if (firstArr[j] === 0 && minZerosCol > cols[j].zeros) {
          secondArr = cols[j].arr;
          minZerosCol = cols[j].zeros;
          minZerosColPos = j;
        }
      }
    } else {
      firstArr = cols[minZerosColPos].arr;
      minZerosRow = 9;
      for (let j = 0; j < 9; j++) {
        if (firstArr[j] === 0 && minZerosRow > rows[j].zeros) {
          secondArr = rows[j].arr;
          minZerosRow = rows[j].zeros;
          minZerosRowPos = j;
        }
      }
    }
    // log(firstArr);
    // log(secondArr);
    for (let num = 1; num < 10; num++) {
      if (!firstArr.includes(num) && !secondArr.includes(num)) {
        // log({num});
        // log({minZerosRowPos});
        // log({minZerosColPos});
        newMatrix[minZerosRowPos][minZerosColPos] = num;
      }
    }
    getEndSudoku(newMatrix, repeat);
    return newMatrix;
  }
}

// log(solveSudoku([
//   [6, 5, 0, 7, 3, 0, 0, 8, 0],
//   [0, 0, 0, 4, 8, 0, 5, 3, 0],
//   [8, 4, 0, 9, 2, 5, 0, 0, 0],
//   [0, 9, 0, 8, 0, 0, 0, 0, 0],
//   [5, 3, 0, 2, 0, 9, 6, 0, 0],
//   [0, 0, 6, 0, 0, 0, 8, 0, 0],
//   [0, 0, 9, 0, 0, 0, 0, 0, 6],
//   [0, 0, 7, 0, 0, 0, 0, 5, 0],
//   [1, 6, 5, 3, 9, 0, 4, 7, 0]
// ]));

// log(solveSudoku([
//   [5, 3, 4, 6, 7, 8, 9, 0, 0],
//   [6, 7, 2, 1, 9, 5, 3, 4, 8],
//   [1, 9, 8, 3, 4, 2, 5, 6, 7],
//   [8, 5, 9, 7, 6, 1, 4, 2, 3],
//   [4, 2, 6, 8, 5, 3, 7, 9, 1],
//   [7, 1, 3, 9, 2, 4, 8, 5, 6],
//   [9, 6, 1, 5, 3, 7, 2, 8, 4],
//   [2, 8, 7, 4, 1, 9, 6, 3, 5],
//   [3, 4, 5, 2, 8, 6, 1, 7, 9]
// ]));

// log([1,2,3].find(item => !(item == 2)));