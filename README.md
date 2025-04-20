
# Bingo Multiplayer Game

It is a multiplayer game I made using HTML, CSS, Js and express for backend server. It uses `socket.io` for bilateral communication between users. In this users can create room and play bingo with friends.


## Screenshot

![preview](https://i.imgur.com/guUnICz.png)


## Working

- The below diagram talks about the flow of game and how it functions
![flow](https://i.imgur.com/gQkssDC.png)

- ### Game Flow Overview
    1. Room Creation: When user create a game with `roomID` if the room with same roomID exists then it join that room if didn't a new room is created with that user being the host
    2. Player Joining: Players can join until game starts
    3. Game Start: Host initiates the game
    4. Number Generation: Host rolls the ball to generate numbers
    5. Bingo Checking: System automatically checks players' cards
    6. Game End: When all but one player has bingo
    7. Restart Option: Host can reset the game

- ### Host Privileges

    1. **Exclusive Controls**:
    - I nitiate number generation (roll the ball)
    - Start the game session
    - Restart the game after completion

    2. **Room Management**:
    - Room automatically terminates if host disconnects
    - Can start and reset game session

- ### Player Capabilities

    1. **Pre-Game**:
    - Join available rooms

    2. **During Game**:
        - Passive participation (no active controls)



## Prerequisites

Make sure you have the following installed on your system:

- Node.js v22.11.0 or higher
- Git (optional, for cloning the repository)
## Installation
Follow these steps to set up and run the project:

1. **Clone the repository**
   
   Using Git:
   ```bash
   git clone https://github.com/Durubhuru14/bingo-multiplayer.git
   ```
   
   Or download the ZIP file and extract it.

2. **Navigate to the project directory**
   ```bash
   cd bingo-multiplayer
   ```

3. **Install dependencies**
   Run the following command to install all required dependencies:
   ```bash
   npm install
   ```

4. **Run the project**
   Start the application by running:
   ```bash
   node main.js
   ```
    
## Authors and His Notes

Hello this [Durubhuru](https://github.com/Durubhuru14)! \
This project is a simple Node.js application designed to demonstrate core concepts of JavaScript and server-side programming. I initially started working on this project during my 11th grade but couldn't complete it back then. Now, after almost two years, I have finally managed to finish it. The application is a simple bingo-multiplayer game built using Socket.io for real-time communication. Although it has some limitations (like client-side winner validation, which makes it prone to cheating), still though it served as excellent hands-on practice for making multiplayer games on web. 

I don't plan to abandon this project. In the future, I aim to improve it by integrating MongoDB to manage users and game states effectively.

Thank you 💖 for reading through please make sure to star the repo if you like it ✨
