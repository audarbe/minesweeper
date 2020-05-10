/*----- constants -----*/
const difficultyLookup = {
  outbreak: {
    xAxis: 10,
    yAxis: 10,
    coronas: 10,
    masks: 10,
    winAmount: this.xAxis * this.yAxis - this.coronas,
    color: "#9ACD32", //yellowgreen
  },
  epidemic: {
    xAxis: 15,
    yAxis: 13,
    coronas: 40,
    masks: 40,
    winAmount: this.xAxis * this.yAxis - this.coronas,
    color: "#FF8C00", //darkorange
  },
  pandemic: {
    xAxis: 30,
    yAxis: 16,
    coronas: 99,
    masks: 99,
    winAmount: this.xAxis * this.yAxis - this.coronas,
    color: "#FF4500", //orangered
  },
};

const squareEl = {
  occupied: {
    color: "red",
    image: "", // use background instead
  },
  uncover: {
    color: "lightgray",
    image: "",
  },
  available: {
    color: "green",
    image: "",
  },
  flagged: {
    color: "yellow",
    image: "",
  },
};

const emoji = {
  inPlay: "img/ejoji_inPlay.png",
  click: "img/emoji_active.png",
  lose: "img/ejoji_lose.png",
  win: "img/emoji_win.png",
};

const audioEl = {
  flagged: "",
  uncover: "",
  start: "",
  lose: "",
  win: "",
};

/*----- app's state (variables) -----*/
let difficulty = "epidemic";
let currentScore;
let board = [];
let occupiedSquares = [];

/*----- cached element references -----*/


/*----- event listeners -----*/
$('#difficulty-selector').change(changeDifficulty);
$('#reset').on('click', init);
$('#corona-field').on("contextmenu", '.square', function () { return false });
$('#corona-field').on('mousedown', '.square', function (event) {
  if (event.which === 1 ? clickHandle(event) : maskSquare(event));
});

/*----- functions -----*/

function init() {
  console.log('init');
  createBoard();
  board = $('.square');
  render();
};

function createBoard() { //refactor here
  //clear board
  occupiedSquares = [];
  $('.corona-field > div').remove();
  //set up grid
  for (let y = 0; y < difficultyLookup[difficulty].yAxis; y++) {
    let newRow = $(`<div class="gameboard-row" id="row${y}"></div>`)
    $('#corona-field').append(newRow);
    for (let x = 0; x < difficultyLookup[difficulty].xAxis; x++) {
      let newSquare = $(`<div class="square" id="c${x}r${y}"></div>`)
      $(`#row${y}`).append(newSquare);
    };
  };
  plantCoronas();
};

function plantCoronas() {
  while (occupiedSquares.length < difficultyLookup[difficulty].coronas) {
    let xRan = Math.floor((Math.random() * (difficultyLookup[difficulty].xAxis - 0) + 0));
    let yRan = Math.floor((Math.random() * (difficultyLookup[difficulty].yAxis - 0) + 0));
    let $occupiedSquare = $(`#c${xRan}r${yRan}`);
    if (!($occupiedSquare.hasClass('occupied'))) {
      $occupiedSquare.addClass('occupied');
      occupiedSquares.push($occupiedSquare);
    };
  }
};

function changeDifficulty() {
  difficulty = $('#difficulty-selector').val();
  init();
}

function clickHandle(event) {
  let currentEl = event.target;
  console.log(currentEl, '< current el')
}

function maskSquare(event) {
  console.log('drop a mask on', event.target)
}


function render() {
  $('body').css('background-color', difficultyLookup[difficulty].color);
  $('#remaining-coronas').text(difficultyLookup[difficulty].coronas);
  $('#remaining-masks').text(difficultyLookup[difficulty].masks);
}

init();
