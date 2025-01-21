import { divideIntoGroups } from "./bingoCardGenerator.mjs";
import { getRandomItem } from "../helper/getRandomItem.mjs";
// Array of ball colors for the bingo balls
let ballColors = [
    `radial-gradient(circle at 70px 80px, #FD2121, rgba(150, 2, 2, 1), rgba(44, 0, 0, 1), rgb(0, 0, 3))`,
    `radial-gradient(circle at 70px 80px, #21c2fddc, rgb(2, 63, 150), rgb(0, 23, 44), rgb(0, 0, 3))`,
    `radial-gradient(circle at 70px 80px, #FB21FD, rgba(150, 2, 149, 1), rgba(44, 0, 42, 1), rgb(0, 0, 3))`,
    `radial-gradient(circle at 70px 80px, #21FDFB, rgba(2, 137, 150, 1), rgba(0, 43, 44, 1), rgb(0, 0, 3))`,
    `radial-gradient(circle at 70px 80px, #FDFB21, rgba(150, 147, 2, 1), rgba(44, 41, 0, 1), rgb(3, 3, 0))`,
];

const ballRollAudio = new Audio("./sounds/ball-roll.wav"); // Load the ball roll sound

export const rollBall = (cells, username, roomId, socket) => {
    let [B_INITIAL, I_INITIAL, N_INITIAL, G_INITIAL, O_INITIAL] =
        divideIntoGroups();
    let initials = [B_INITIAL, I_INITIAL, N_INITIAL, G_INITIAL, O_INITIAL];

    // Not host then terminate
    socket.emit("is-user-host", username, roomId);
    socket.on("host-not-or-yes", (isHost) => {
        if (isHost) return;
    });

    const rollBtn = document.querySelector(".roll-ball-btn");
    rollBtn.disabled = true; // Disable button to avoid spam click

    let initialArr = getRandomItem(initials); // Get a random group
    let text = document.querySelector(".text"); // Element for the letter
    const numberBall = document.querySelector(".number-ball"); // Ball element

    switch (initialArr) {
        case B_INITIAL:
            text.textContent = "B";
            numberBall.style.background = ballColors[0];
            break;
        case I_INITIAL:
            text.textContent = "I";
            numberBall.style.background = ballColors[1];
            break;
        case N_INITIAL:
            text.textContent = "N";
            numberBall.style.background = ballColors[2];
            break;
        case G_INITIAL:
            text.textContent = "G";
            numberBall.style.background = ballColors[3];
            break;
        case O_INITIAL:
            text.textContent = "O";
            numberBall.style.background = ballColors[4];
            break;
    }

    ballRollAudio.currentTime = 0; // Reset the audio
    ballRollAudio.play(); // Play the audio

    let number = getRandomItem(initialArr); // Get a random number from the selected group
    let variable = text.textContent; // Get the letter
    document.querySelector(".number").textContent = number; // Display the number
    socket.emit("value-send", number, variable, roomId); // Emit the value to the server

    // Update the group in the initials array to reflect the removal
    if (initialArr === B_INITIAL) {
        B_INITIAL = B_INITIAL.filter((num) => num !== number);
    } else if (initialArr === I_INITIAL) {
        I_INITIAL = I_INITIAL.filter((num) => num !== number);
    } else if (initialArr === N_INITIAL) {
        N_INITIAL = N_INITIAL.filter((num) => num !== number);
    } else if (initialArr === G_INITIAL) {
        G_INITIAL = G_INITIAL.filter((num) => num !== number);
    } else if (initialArr === O_INITIAL) {
        O_INITIAL = O_INITIAL.filter((num) => num !== number);
    }

    // Check for the number in the cells and update the styles
    socket.emit("is-winner", username, roomId);
    socket.on("is-host-winner", (isWinner) => {
        if (isWinner) {
            // Re-enable the button after 2 seconds
            setTimeout(() => {
                rollBtn.disabled = false;
            }, 2000); // 2 seconds delay
            return; // Early exit
        }
    });
    cells.forEach((cell) => {
        if (cell.textContent === number.toString()) {
            cell.style.border = "1px solid #0cd661";
            cell.addEventListener("click", () => {
                cell.style.transition = "0.5s";
                cell.style.color = "#4BB543";
                cell.style.border = "1px solid #FF0B6AD1";
                cell.style.backgroundColor = "#0b0b0b";
                cell.textContent = "X"; // Cross symbol
            });
        }
    });

    // Re-enable the button after 2 seconds
    setTimeout(() => {
        rollBtn.disabled = false;
    }, 2000); // 2 seconds delay
};
