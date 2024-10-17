
let counter; // count the score during the game
let score = 0;
let stoneCreation; // creation stone obstacles
let trunkCreation;
let stoneMovement; // Movement of the stone obstacles
let trunkMovement;



const currentScoreContainer = document.querySelector(".currentScore");
const finalScoreContainer = document.querySelector(".finalScore");
const endGameContainer = document.querySelector("#gameOver");
const gameBoard = document.querySelector("#board");
const restartButton = document.querySelector("#restart");
const startGameContainer = document.querySelector("#gameStart");
const startButton = document.querySelector("#start");


//GAME START

startGameContainer.style.display = "block";
startButton.style.display = "block";
gameBoard.style.display = "none";
endGameContainer.style.display = "none";



//BUTTONS

startButton.addEventListener("click", () => {

    endGameContainer.style.display = "none"; //hide game over page
    gameBoard.style.display = "block";  //show game page
    startGameContainer.style.display = "none"; //hide start game page

    score = 0;
    currentScoreContainer.innerText = 'Score: ' + score; //current score

    startCounter();
    startStoneCreation();
    startTrunkCreation();

});


restartButton.addEventListener("click", () => {

    endGameContainer.style.display = "none";
    gameBoard.style.display = "block";
    startGameContainer.style.display = "none";

    score = 0;
    currentScoreContainer.innerText = 'Score: ' + score; // current score

    clearInterval(stoneCreation); // stop stone creation
    clearInterval(trunkCreation);
    clearInterval(stoneMovement);
    clearInterval(trunkMovement);

    obstacleStoneArr.forEach((obstacleStoneInstance) => {   // remove stones from the board
        obstacleStoneInstance.domElement.remove();
    });
    obstacleTrunkArr.forEach((obstacleTrunkInstance) => {
        obstacleTrunkInstance.domElement.remove();
    });
    obstacleStoneArr.length = 0; // empty stones array
    obstacleTrunkArr.length = 0;


    startCounter(); // restart counter
    startStoneCreation(); // restart stone creation
    startTrunkCreation();

});


//PLAYER

class Player {
    constructor() {
        this.width = 20;
        this.height = 10;
        this.positionX = 1;
        this.positionY = (this.height / 2) + 1;
        this.domElement = null;

        this.createDomElement();
    }
    createDomElement() {

        this.domElement = document.createElement("div"); // step1: create the element


        this.domElement.id = "player"; // step2: add content or modify (ex. innerHTML...)
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.left = this.positionX + "vw";
        this.domElement.style.bottom = this.positionY + "vh";


        const board = document.getElementById("board"); //step3: append to the dom: `parentElm.appendChild()`
        if (board) {

            board.appendChild(this.domElement);
        }
    }

    moveUp() {
        if (this.positionY < 100 - this.height) {
            this.positionY++;
            this.domElement.style.bottom = this.positionY + "vh";
        }
    }
    moveDown() {
        if (this.positionY > 0) {
            this.positionY--;
            this.domElement.style.bottom = this.positionY + "vh";
        }
    }
    moveRight() {
        if(this.positionX < 100 - this.width){
            this.positionX++;
            this.domElement.style.left = this.positionX + "vw";
        }
    }
    moveLeft() {
        if(this.positionX > 0){
            this.positionX--;
            this.domElement.style.left = this.positionX + "vw";
        }
    }
}


//OBSTACLES


//STONES

class ObstacleStone {
    constructor() {
        this.width = Math.random() * (10 - 3) + 3; //Math.random() * (maxWidth - minWidth) + minWidth c
        this.height = Math.random() * (15 - 3) + 3;
        this.positionX = 100;
        this.positionY = Math.floor(Math.random() * (100 - this.height + 1));
        this.domElement = null;

        this.createDomElement();
    }
    createDomElement() {

        this.domElement = document.createElement("div"); // step1: create the element


        this.domElement.className = "obstacleStone"; // step2: add content or modify (ex. innerHTML...)
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.left = this.positionX + "vw";
        this.domElement.style.bottom = this.positionY + "vh";


        const board = document.getElementById("board"); //step3: append to the dom: `parentElm.appendChild()`
        board.appendChild(this.domElement);
    }
    moveLeft() {
        this.positionX--;
        this.domElement.style.left = this.positionX + "vw";
    }
}



const player = new Player();

const obstacleStoneArr = []; // will store instances of the class ObstacleStone



function startStoneCreation() { // create stones

    stoneCreation = setInterval(() => {
        const newObstacleStone = new ObstacleStone();
        obstacleStoneArr.push(newObstacleStone);
    }, 1000);



    stoneMovement = setInterval(() => {  // update all obstacles
        obstacleStoneArr.forEach((obstacleStoneInstance) => {

            obstacleStoneInstance.moveLeft();  // move current obstacle

            if (
                player.positionX < obstacleStoneInstance.positionX + obstacleStoneInstance.width && // detect collision
                player.positionX + player.width > obstacleStoneInstance.positionX &&
                player.positionY < obstacleStoneInstance.positionY + obstacleStoneInstance.height &&
                player.positionY + player.height > obstacleStoneInstance.positionY
            ) {
                endGameContainer.style.display = "block"; // show game over page
                gameBoard.style.display = "none"; // hide game page
                finalScoreContainer.innerText = 'Score: ' + score;

                clearInterval(counter); // stop counter
                clearInterval(stoneCreation); // stop stones creation
                clearInterval(trunkCreation);
            }
        });

    }, 50)
};


//TRUNKS

class ObstacleTrunk {
    constructor() {
        this.width = Math.random() * (10 - 5) + 5;
        this.height = Math.random() * (30 - 5) + 5;
        this.positionX = 100;
        this.positionY = Math.floor(Math.random() * (100 - this.height + 1));
        this.domElement = null;

        this.createDomElement();
    }
    createDomElement() {

        this.domElement = document.createElement("div");


        this.domElement.className = "obstacleTrunk";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.left = this.positionX + "vw";
        this.domElement.style.bottom = this.positionY + "vh";


        const board = document.getElementById("board");
        board.appendChild(this.domElement);
    }
    moveLeft() {
        this.positionX--;
        this.domElement.style.left = this.positionX + "vw";
    }
}


const obstacleTrunkArr = [];


function startTrunkCreation() {

    trunkCreation = setInterval(() => {
        const newObstacleTrunk = new ObstacleTrunk();
        obstacleTrunkArr.push(newObstacleTrunk);
    }, 4000);


    trunkMovement = setInterval(() => {
        obstacleTrunkArr.forEach((obstacleTrunkInstance) => {

            obstacleTrunkInstance.moveLeft();

            if (
                player.positionX < obstacleTrunkInstance.positionX + obstacleTrunkInstance.width && // detect collision
                player.positionX + player.width > obstacleTrunkInstance.positionX &&
                player.positionY < obstacleTrunkInstance.positionY + obstacleTrunkInstance.height &&
                player.positionY + player.height > obstacleTrunkInstance.positionY
            ) {
                endGameContainer.style.display = "block"; // show game over page
                gameBoard.style.display = "none"; // hide game page
                finalScoreContainer.innerText = 'Score: ' + score;

                clearInterval(counter); // stop counter
                clearInterval(stoneCreation);// stop stones creation
                clearInterval(trunkCreation);
            }
        });

    }, 50)
};


//PLAYER MOVEMENT

document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowUp') {
        player.moveUp();
    } else if (e.code === 'ArrowDown') {
        player.moveDown();
    }
      else if (e.code === 'ArrowLeft') {
        player.moveLeft();
    } else if (e.code === 'ArrowRight') {
        player.moveRight();
    }
});





//COUNTER

function startCounter() {

    counter = setInterval(function () {
        score++;
        currentScoreContainer.innerText = 'Score: ' + score;
        if (score > 4999) {

            endGameContainer.style.display = "block";
            gameBoard.style.display = "none";
            finalScoreContainer.innerText = 'Score: ' + score;

            clearInterval(counter);
            clearInterval(stoneCreation); // stop stones creation
            clearInterval(trunkCreation);

        }
    }, 1000);
};













