const boxes = document.querySelectorAll(".box");
const resetBtn = document.getElementById("reset-btn");
const msgContainer = document.querySelector(".msg-container");
const newBtn = document.getElementById("new-btn");
const msg = document.querySelector(".msg");

let turnO = true; //playerX and playerO
let count = 0

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

let resetGame = () => {
    turnO = true
    count = 0
    enabledBoxes()
    msgContainer.classList.add('hide')
}

boxes.forEach((box) => {
  box.addEventListener("click", function () {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++


    let isWinner = checkWinner();
    if(count === 9 && !isWinner){
        gameDraw()
    }
  });
});

let disabledBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};
let enabledBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false
        box.innerHTML = ''
    })
}

let showWinner = (winner) => {
  msg.innerHTML = `Congratulations, Winner is ${winner} `;
  msgContainer.classList.remove("hide");
  disabledBoxes();
};

let gameDraw = () => {
    msg.innerHTML = `Game was draw, Please restart new game`
    msgContainer.classList.remove('hide')
    disabledBoxes()
}

let checkWinner = () => {
  for (let pattern of winPatterns) {
    // console.log(pattern);

    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;
    // console.log(pos1Val)
    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

resetBtn.addEventListener('click', resetGame)
newBtn.addEventListener('click', resetGame)
