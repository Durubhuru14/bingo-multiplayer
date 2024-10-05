const socket = io(); // creating a new instance

// Alert function for custom alerts
let alertCloseBtn = document.querySelector("[name='close-outline']");
let alertElem = document.querySelector(".alert");
let alertElemBody = document.querySelector(".alert-body");

function Alert(name, room) {
  alertElem.style.display = "block";
  alertElemBody.textContent = `${name} has joined the game (Room: ${room})`;
  alertCloseBtn.addEventListener("click", () => {
    alertElem.style.display = "none";
  });
}

// Prompt functionality
let promptOuter = document.querySelector(".prompt-outer");

window.onload = () => {
  promptOuter.style.display = "inline-flex";
};
let roomId;
document.querySelector(".submit-btn").addEventListener("click", () => {
  let username = document.querySelector('[name = "username"]').value;
  roomId = document.querySelector('[name = "room-id"]').value;

  promptOuter.style.display = "none";

  socket.emit("join-room", username, roomId);
});

// Real code

socket.on("joined-room", (name, roomName) => {
  Alert(name, roomName);
});

let ballColors = [
  `radial-gradient(circle at 70px 80px, #FD2121,
    rgba(150, 2, 2, 1), rgba(44, 0, 0, 1), rgb(0, 0, 3))`,
  `radial-gradient(circle at 70px 80px, #21c2fddc,
   rgb(2, 63, 150), rgb(0, 23, 44), rgb(0, 0, 3))`,
  `radial-gradient(circle at 70px 80px, #FB21FD,
   rgba(150, 2, 149, 1), rgba(44, 0, 42, 1), rgb(0, 0, 3))`,
  `radial-gradient(circle at 70px 80px, #21FDFB,
   rgba(2, 137, 150, 1), rgba(0, 43, 44, 1), rgb(0, 0, 3))`,
];
let array = Array.from({ length: 75 }, (_, i) => i + 1);

function shuffledArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

let B_initial = shuffledArray(array.slice(0, 15));
let I_initial = shuffledArray(array.slice(15, 30));
let N_initial = shuffledArray(array.slice(30, 45));
let G_initial = shuffledArray(array.slice(45, 60));
let O_initial = shuffledArray(array.slice(60, 75));

let initials = [B_initial, I_initial, N_initial, G_initial, O_initial];

function getRandomItem(arr) {
  // get random index value
  const randomIndex = Math.floor(Math.random() * arr.length);

  // get random item
  const item = arr[randomIndex];

  return item;
}

function arrayElemRemover(arr, elem) {
  const index = arr.indexOf(elem);
  if (index > -1) {
    // only splice array when item is found
    arr.splice(index, 1); // 2nd parameter means remove one item only
  }
}

function arrConcat() {
  let str1 = B_initial.slice(0, 5);
  let str2 = I_initial.slice(0, 5);
  let str3 = N_initial.slice(0, 5);
  let str4 = G_initial.slice(0, 5);
  let str5 = O_initial.slice(0, 5);
  return str1.concat(str2, str3, str4, str5);
}

let arr = arrConcat();

function IndexIncrementer() {
  let test = [];
  for (let i = 0; i <= 4; i++) {
    for (let j = 0 + i; j <= 20 + i; j += 5) {
      test.push(j);
    }
  }
  return test;
}

let newIndeices = IndexIncrementer();

function gridMaker() {
  for (let i = 0; i < arr.length; i++) {
    let child = document.createElement("div");
    child.classList.add("cells");
    child.textContent = arr[newIndeices[i]];
    document.querySelector(".game").appendChild(child);
  }
}
gridMaker();

document.querySelector(".roll-ball-btn").addEventListener("click", () => {
  let initialArr = getRandomItem(initials);
  let text = document.querySelector(".text");
  switch (initialArr) {
    case B_initial:
      text.textContent = "B";
      break;
    case I_initial:
      text.textContent = "I";
      break;
    case N_initial:
      text.textContent = "N";
      break;
    case G_initial:
      text.textContent = "G";
      break;
    case O_initial:
      text.textContent = "O";
      break;
  }
  let number = getRandomItem(initialArr);
  let variable = text.textContent;
  document.querySelector(".number").textContent = number;
  socket.emit("value-send", number, variable, roomId);
  arrayElemRemover(initialArr, number);
});
socket.on("value-recive", (number, text) => {
  document.querySelector(".number").textContent = number;
  document.querySelector(".text").textContent = text;
});

const cross = "X";
const winningConditions = [
  //Horizontal winning conditions
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24],
  //Diagonal winning conditions
  [0, 6, 12, 18, 24],
  [4, 8, 12, 16, 20],
];
let cells = document.querySelectorAll(".cells");
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    cell.textContent = cross;
  });
});

function winCheck() {
  for (let i = 0; i < winningConditions.length; i++) {
    let a = winningConditions[i];
    if (
      cells[a[0]].textContent == cross &&
      cells[a[1]].textContent == cross &&
      cells[a[2]].textContent == cross &&
      cells[a[3]].textContent == cross &&
      cells[a[4]].textContent == cross
    ) {
      clearInterval(interval);
      socket.emit("win");
    }
  }
}

let interval = setInterval(() => {
  winCheck();
});

