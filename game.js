let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let main = document.querySelector(".main");

main.classList.remove("main");
let turnO = true; //playerX, playerO
let count = 0; //To Track Draw

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const newGame=() => {
  turnO=true;
  count=0;
  enableBoxes();
  msgContainer.classList.add("hide");
  main.classList.remove("main");
}
const resetGame=() => {
  turnO=true;
  enableBoxes();
  msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //playerO
      box.innerText = "O"
      box.style.color="black";
      turnO = false;
    } else {
      //playerX
      box.innerText = "X";
      box.style.color="green";
      turnO = true;
    }
    box.disabled = true;
    count++;

    let Winner = checkWinner();

    if (count===9 && !Winner){
      gamedraw();
    }

  });
});

const gamedraw=() =>{
  msg.innerText=`Game was a Draw.`;
  msgContainer.classList.remove("hide");
  main.classList.add("main");
  disableBoxes();
}

const disableBoxes=() =>{
  for(let box of boxes){
    box.disabled=true;
  }
}

const enableBoxes=() =>{
  for(let box of boxes){
    box.disabled=false;
    box.innerText="";
  }
}


const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  main.classList.add("main");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        disableBoxes();
        return true;
      }
    }
  }
};

newGameBtn.addEventListener("click",newGame);
resetBtn.addEventListener("click",resetGame);