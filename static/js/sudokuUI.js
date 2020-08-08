var n;
var sg;

function makeBoard() {
  n = document.getElementById("n").value;
  console.log(n)
  sg = new SudokuGame(n);
  console.log(sg);

  let options = document.getElementById("options");
  options.innerHTML = "";
  options.style.display = "grid";
  options.style.height = "20vh";
  options.style.width = "20vh";
  options.style.gridTemplateColumns = `repeat(${n}, 30fr)`;

  let button;

  for (i=0;i<(n**2);i++) {
    button = document.createElement("button");
    button.id = i+1;
    button.innerHTML = `${i+1}`;
    button.onclick = setCell;
    options.appendChild(button);
  }

  var board = document.getElementById("board");

  board.style.gridTemplateColumns = `repeat(${n**2}, ${70/(n**2)}vh)`;
  board.style.gridTemplateRows = `repeat(${n**2}, ${70/(n**2)}vh)`;

  for (i=0;i<(n**2);i++) {
    for (j=0;j<(n**2);j++) {
      let cell = document.createElement("div")

      cell.className = "sudoku cell"
      cell.height = `${70/(n**2)}vh`;
      cell.width = `${70/(n**2)}vh`;
      cell.style.fontSize = `${40/(n**2)}vh`;
      cell.id = `${i},${j}`;
      cell.onclick = selectCell;

      if (j%n==0) {
        cell.style.borderLeft = "4px solid black";
      } else if (j==(n**2-1)) {
        cell.style.borderRight = "4px solid black";
      }

      if (i%n==0) {
        cell.style.borderTop = "4px solid black";
      } else if (i==(n**2-1)) {
        cell.style.borderBottom = "4px solid black";
      }

      board.appendChild(cell);

    }
  }

  let actions = document.getElementById("actions");
  actions.innerHTML = "<button onclick='generateBoardInit()'>Generate Board</button>";
}

function generateBoardInit() {
  let nextInds = [0,0];
  generateBoard(nextInds);
}

function generateBoard(nextInds) {
  if (nextInds) {
    // if ( (Date.now() - previousTime) > 200 )  {
    // previousTime = Date.now()
    // console.log('Outside');
    nextInds = sg.solveCell(nextInds[0], nextInds[1]);
    updateBoard();

    setTimeout(function() { generateBoard(nextInds); }, (500 / (n**2)) );
  } else {
    console.log('Board Generated');
    return;
  }
}


function selectCell() {
  if (this.classList.contains("selected")) {
    this.classList.remove("selected");
  } else {
    for (i=0;i<(n**2);i++) {
      for (j=0;j<(n**2);j++) {
        document.getElementById(`${i},${j}`).classList.remove("selected");
      }
    }
    this.classList.add("selected");
  }
  // this.classList.toggle("selected");
  console.log(this.classList.contains("selected"));
}

function setCell() {
  let currentCell;

  for (i=0;i<(n**2);i++) {
    for (j=0;j<(n**2);j++) {
      currentCell = document.getElementById(`${i},${j}`);

      if (currentCell.classList.contains("selected")) {
        sg.updateCell(i,j,this.id);
      }

    }
  }
  updateBoard();
}

function updateBoard() {
  for (i=0;i<(n**2);i++) {
    for (j=0;j<(n**2);j++) {
      document.getElementById(`${i},${j}`).innerHTML = sg.board[i][j];
    }
  }
}
