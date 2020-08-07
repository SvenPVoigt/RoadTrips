SudokuGame = function(n) {
  this.n = n;
  this.allowedVals = new Set();
  for (i=1;i<=(n**2);i++) {
    this.allowedVals.add(i);
  }

  this.board = new Array(n**2);
  for (i=0;i<(n**2);i++) {
    this.board[i] = new Array(n**2).fill(null);
  }

  this.asRow = new Array(n**2);
  for (i=0;i<(n**2);i++) {
    this.asRow[i] = new Set();
  }

  this.asCol = new Array(n**2);
  for (i=0;i<(n**2);i++) {
    this.asCol[i] = new Set();
  }

  this.asGrid = new Array(n**2);
  for (i=0;i<(n**2);i++) {
    this.asGrid[i] = new Set();
  }

  this.tried = new Array(n**2);
  for (i=0;i<(n**2);i++) {
    this.tried[i] = new Array(n**2);
    for (j=0;j<(n**2);j++) {
      this.tried[i][j] = new Set();
    }
  }
}

SudokuGame.prototype.getGridCell = function(i,j) {
  row = (i - (i%this.n)) / this.n;
  col = (j - (j%this.n)) / this.n;
  return row * this.n + col;
}

SudokuGame.prototype.addCell = function(i,j,val) {
  if (this.evalCell(i,j,val)) {
    this.board[i][j] = val;
    this.asRow[i].add(val);
    this.asCol[j].add(val);
    this.asGrid[this.getGridCell(i,j)].add(val);
    return true;
  } else {
    return false;
  }
}

SudokuGame.prototype.delCell = function(i,j) {
  let val = this.board[i][j];
  this.board[i][j] = null;
  this.asRow[i].delete(val);
  this.asCol[j].delete(val);
  this.asGrid[this.getGridCell(i,j)].delete(val);
}

SudokuGame.prototype.updateCell = function(i,j,val) {
  if (this.board[i][j] == null) {
    this.addCell(i,j,val);
  } else if (this.board[i][j] == val) {
    this.delCell(i,j);
  } else if (this.evalCell(i,j,val)) {
    this.delCell(i,j);
    this.addCell(i,j,val);
  }
}


SudokuGame.prototype.evalCell = function(i,j,val) {
  if (
    this.asRow[i].has(val) ||
    this.asCol[j].has(val) ||
    this.asGrid[this.getGridCell(i,j)].has(val)
  ) {
    return false;
  } else {
    return true;
  }
}

SudokuGame.prototype.nextSquare = function(i,j) {
  let val;
  let added;
  let difference;
  console.log('Entered nextSquare');

  if (i == (this.n**2 - 1) && j == (this.n**2 - 1)) {
    return undefined;
  } else if (this.tried[i][j].size < (n**2)) {
    console.log(this.tried[i][j].size);
    difference = new Set([...this.allowedVals].filter(x => !this.tried[i][j].has(x)));
    val = [...difference][Math.floor( Math.random() * difference.size )];
    this.tried[i][j].add(val);
    added = this.addCell(i,j,val);
    if (added) {
      if (j==(n**2-1)) {
        return [i+1,0];
      } else {
        return [i,j+1];
      }
    } else {
      return [i,j];
    }
  } else {
    this.delCell(i,j);
    this.tried[i][j].clear();
    if (j==0) {
      return [i-1, (this.n**2)-1];
    } else {
      return [i, j-1];
    }
  }
}
