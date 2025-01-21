import { popup } from "../helper/popup.mjs";

export const promptSubmit = (promptOuter, startGameBtn, socket) => {
    // Get the username and room ID values
    let username = document.querySelector('[name = "username"]').value.trim();
    let roomId = document.querySelector('[name = "room-id"]').value.trim();

    // Validation: Check if username or roomId is empty
    if (!username || !roomId) {
        popup(
            "",
            "Username and Room ID cannot be empty. Please fill in both fields."
        );

        promptOuter.style.display = "inline-flex";
        return;
    }
    promptOuter.style.display = "none";
    socket.emit("join-room", username, roomId);
    // If game is already started don't let user join
    socket.on("failed-to-join-room", (username, msg) => {
        popup("", msg)
        promptOuter.style.display = "inline-flex";
        return;
    });
    // Request all the users present in the same room to display
    socket.emit("request-current-users", roomId);
    // Checks if the user is host to display start button
    socket.emit("is-user-host", username, roomId);
    socket.on("host-not-or-yes", (isHost) => {
        if (isHost) {
            // If user is host if and only if these two buttons should display
            startGameBtn.style.display = "block";
            document.querySelector(".roll-ball-btn").style.display = "block";
        }
    });
    return [username, roomId];
};
