SudokuGame = function(n) {
  this.n = n;

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

  this.tried = new Array(n**4);
  for (i=0;i<(n**4);i++) {
    this.tried[i] = new Set();
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
  }
}

SudokuGame.prototype.delCell = function(i,j,val) {
  this.board[i][j] = null;
  this.asRow[i].delete(val);
  this.asCol[j].delete(val);
  this.asGrid[this.getGridCell(i,j)].delete(val);
}

SudokuGame.prototype.updateCell = function(i,j,val) {
  if (this.board[i][j] == null) {
    this.addCell(i,j,val);
  } else if (this.board[i][j] == val) {
    this.delCell(i,j,val);
  } else if (this.evalCell(i,j,val)) {
    this.delCell(i,j,this.board[i][j]);
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
  let val = Math.floor( Math.random() * (this.n**2) );
  this.evalCell(i,j,val);
}
