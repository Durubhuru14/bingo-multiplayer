const ballRollAudio = new Audio("./sounds/ball-roll.wav");
// Array of ball colors for the bingo balls
const ballColors = [
    `radial-gradient(circle at 70px 80px, #FD2121, rgba(150, 2, 2, 1), rgba(44, 0, 0, 1), rgb(0, 0, 3))`,
    `radial-gradient(circle at 70px 80px, #21c2fddc, rgb(2, 63, 150), rgb(0, 23, 44), rgb(0, 0, 3))`,
    `radial-gradient(circle at 70px 80px, #FB21FD, rgba(150, 2, 149, 1), rgba(44, 0, 42, 1), rgb(0, 0, 3))`,
    `radial-gradient(circle at 70px 80px, #21FDFB, rgba(2, 137, 150, 1), rgba(0, 43, 44, 1), rgb(0, 0, 3))`,
    `radial-gradient(circle at 70px 80px, #FDFB21, rgba(150, 147, 2, 1), rgba(44, 41, 0, 1), rgb(3, 3, 0))`,
];
export const valueRecieve = (number, text, cells, cross) => {
    const numberBall = document.querySelector(".number-ball");
    document.querySelector(".number").textContent = number;
    switch (text) {
        case "B":
            numberBall.style.background = ballColors[0];
            break;
        case "I":
            numberBall.style.background = ballColors[1];
            break;
        case "N":
            numberBall.style.background = ballColors[2];
            break;
        case "G":
            numberBall.style.background = ballColors[3];
            break;
        case "O":
            numberBall.style.background = ballColors[4];
            break;
    }
    ballRollAudio.currentTime = 0;
    ballRollAudio.play();
    document.querySelector(".text").textContent = text;
    cells.forEach((cell) => {
        if (cell.textContent === number.toString()) {
            cell.style.border = "1px solid #0cd661";
            cell.addEventListener("click", () => {
                cell.style.transition = "0.5s";
                cell.style.color = "#4BB543";
                cell.style.border = "1px solid #FF0B6AD1";
                cell.style.backgroundColor = "#0b0b0b";
                cell.textContent = cross;
            });
        }
    });
};
