let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#res-btn");
let newgamebtn = document.querySelector("#new-btn");
let msgcont = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame=()=>{
    turnO=true;
   boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
    msgcont.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgcont.classList.remove("hide");
    boxes.forEach((box) => box.disabled = true);
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                return; 
            }
        }
    }

    let allFilled = true;
    boxes.forEach((box) => {
        if (box.innerText === "") {
            allFilled = false;
        }
    });

    if (allFilled) {
        msg.innerText = "It's a Draw!";
        msgcont.classList.remove("hide");
        boxes.forEach((box) => box.disabled = true);
    }
};


newgamebtn.addEventListener("click",resetGame);
resetbtn.addEventListener("click",resetGame)
