const connect = window.addEventListener('load', () => {

  const tableRow = Array.from(document.querySelectorAll("tr"));
  const tableCell = document.querySelectorAll("td");
  const game = document.querySelector("game-4")
  const player1Div = document.querySelector("#player1 input");
  const player2Div = document.querySelector("#player2 input");
  const playerColorText = document.querySelectorAll(".playerColor")
  const resetBtn = document.querySelector(".reset");
  const player1Color = "red";
  const player2Color = "yellow";
  let player1Name, player2Name;
  let currentPlayer = 1;
  let lockBoard = false;

  player1.addEventListener("change", createPlayer1)
  player2.addEventListener("change", createPlayer2)
  resetBtn.addEventListener("click", resetGame)

  function createPlayer1(){
    if(player1 !== ""){
      player1Name = player1Div.value;
      playerColorText[0].innerText =`${player1Name}, your color will be ${player1Color}`;
      player1Div.value = "";
    }
    else{ alert("write your name") };
  }

  function createPlayer2(){
    if(player2 !== ""){
      player2Name = player2Div.value;
      playerColorText[1].innerText = `${player2Name}, your color will be ${player2Color}`;
      player2Div.value = "";
      lockBoard=true;
    }
    else{ alert("write your name") };
  }

  function changePlayer(){currentPlayer == 1 ? currentPlayer = 2 : currentPlayer = 1;}

  tableCell.forEach(el => {
    el.addEventListener("click", changeColor);
    el.style.backgroundColor = "white";
  })


  function changeColor(){
    if(!lockBoard){return alert("Write Your Name")}
    let column = this.cellIndex;
    let row = [];

    for(let i = tableRow.length-1; i>-1; i--){
      if(tableRow[i].children[column].style.backgroundColor == "white"){
        row.push(tableRow[i].children[column])

        if(currentPlayer === 1 ){
          row[0].style.backgroundColor = player1Color;
          setTimeout(() => {
            if(horizontal() || vertical() || diagonal1() || diagonal2()){
              alert(`${player1Name} wins`);
              resetGame();
              checkAll();
            }
          },300);
          checkAll();
          return changePlayer();
        }
        else{
          row[0].style.backgroundColor = player2Color;
          setTimeout(() => {
            if(horizontal() || vertical() || diagonal1() || diagonal2()){
              alert(`${player2Name} wins`);
              resetGame();
            }
          },300);
          checkAll();
          return changePlayer();
        }
      }
    }
  }

  function sameColor(one,two,three,four){
    return (one === two && one === three && one === four && one !== 'white' && one !== undefined);
  }

  function horizontal(){
    for(let row=0; row<tableRow.length; row++){
      for(let col=0; col<4; col++){
        if(sameColor(tableRow[row].children[col].style.backgroundColor,tableRow[row].children[col+1].style.backgroundColor,tableRow[row].children[col+2].style.backgroundColor, tableRow[row].children[col+3].style.backgroundColor)){
          return true
        }
      }
    }
  }

  function vertical(){
    for(let col=0; col<7; col++){
      for(let row = 0; row<3; row++){
        if(sameColor(tableRow[row].children[col].style.backgroundColor, tableRow[row+1].children[col].style.backgroundColor, tableRow[row+2].children[col].style.backgroundColor,tableRow[row+3].children[col].style.backgroundColor)){
          return true
        }
      }
    }
  }

  function diagonal1(){
    for(let col=0; col<4; col++){
      for(let row=0; row<3; row++){
        if(sameColor(tableRow[row].children[col].style.backgroundColor, tableRow[row+1].children[col+1].style.backgroundColor, tableRow[row+2].children[col+2].style.backgroundColor, tableRow[row+3].children[col+3].style.backgroundColor)){
          return true
        }
      }
    }
  }

  function diagonal2(){
    for(let col=0; col<4; col++){
      for(let row=5; row>2; row--){
        if(sameColor(tableRow[row].children[col].style.backgroundColor, tableRow[row-1].children[col+1].style.backgroundColor, tableRow[row-2].children[col+2].style.backgroundColor, tableRow[row-3].children[col+3].style.backgroundColor)){
          return true
        }
      }
    }
  }

  function checkAll(){
    let allPlayedCells = [];
    tableCell.forEach(el => {
      if(el.style.backgroundColor !== "white"){
        allPlayedCells.push(el);
      }
    })
    if(tableCell.length === allPlayedCells.length){
      setTimeout(() => {
        alert("its a draw")
        resetGame()
      },200)
    }
  }


  function resetGame(){
    lockBoard=false;
    playerColorText[0].innerText ="";
    playerColorText[1].innerText ="";
    changePlayer();
    tableCell.forEach(el => {
      if(el.style.backgroundColor !== "white"){
        el.style.backgroundColor = "white"
      }
    })
  }
})

export {connect}
