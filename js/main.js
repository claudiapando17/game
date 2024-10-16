
let counter; // count the score during the game
let score = 0;
let stoneStop;
let stone = 0;
let trunkStop;
let trunk = 0;
let stoneStart;
let trunkStart;


const scoreContainer = document.querySelector(".score")
const endGameContainer = document.querySelector("#gameOver") // game over
const gameBoard = document.querySelector("#board")// game over
const restartButton = document.querySelector("#restart")// game over

const startGameContainer = document.querySelector("#gameStart")// game start
const startButton = document.querySelector("#start")// game start





startGameContainer.style.display = "block";
startButton.style.display = "block";
gameBoard.style.display = "none" ;








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
        // step1: create the element
        this.domElement = document.createElement("div");

        // step2: add content or modify (ex. innerHTML...)
        this.domElement.id = "player";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.left = this.positionX + "vw";
        this.domElement.style.bottom = this.positionY + "vh";

        //step3: append to the dom: `parentElm.appendChild()`
        const board = document.getElementById("board");
        if(board){

            board.appendChild(this.domElement);
        }
    }
  
   moveUp() {
        if(this.positionY < 100 - this.height){
            this.positionY++;
            this.domElement.style.bottom = this.positionY + "vh";
        }
    }
    moveDown() {
        if(this.positionY > 0){
            this.positionY--;
            this.domElement.style.bottom = this.positionY + "vh";
        }
    }
}


class ObstacleStone {
    constructor(){
        this.width = Math.random() * (10 - 3) + 3; //Math.random() * (maxWidth - minWidth) + minWidth; calculates with a min and a max
        //this.width = Math.random()* 10;
        this.height = Math.random()* (15 -3) + 3;
        this.positionX = 100;
        this.positionY = Math.floor(Math.random() * (100 - this.height + 1)); // random number between 0 and (100 - this.height)
        this.domElement = null;

        this.createDomElement();
    }
    createDomElement() {
        // step1: create the element
        this.domElement = document.createElement("div");

        // step2: add content or modify (ex. innerHTML...)
        this.domElement.className = "obstacleStone";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.left = this.positionX + "vw";
        this.domElement.style.bottom = this.positionY + "vh";

        //step3: append to the dom: `parentElm.appendChild()`
        const board = document.getElementById("board");
        board.appendChild(this.domElement);
    }
    moveLeft(){
        this.positionX--;
        this.domElement.style.left = this.positionX + "vw";
    }
}



const player = new Player();

const obstacleStoneArr = []; // will store instances of the class Obstacle


// create obstacles
stoneStart = setInterval(() => {
    const newObstacleStone = new ObstacleStone();
    obstacleStoneArr.push(newObstacleStone);
}, 1000);


// update all obstacles
stoneStop = setInterval(() => {
    obstacleStoneArr.forEach((obstacleStoneInstance) => {

        // move current obstacle
        obstacleStoneInstance.moveLeft();

        // detect collision
        if (
            player.positionX < obstacleStoneInstance.positionX + obstacleStoneInstance.width &&
            player.positionX + player.width > obstacleStoneInstance.positionX &&
            player.positionY < obstacleStoneInstance.positionY + obstacleStoneInstance.height &&
            player.positionY + player.height > obstacleStoneInstance.positionY
        ){
            clearInterval(counter); // stop counter
            endGameContainer.style.display = "block"
            gameBoard.style.display = "none"
            scoreContainer.innerText = 'Score: ' + score;           
            clearInterval(stoneStop); // stop stones 
        }
    });

    
}, 50);


class ObstacleTrunk {
    constructor(){
        this.width = Math.random()* (10 -5) + 5;
        this.height = Math.random()* (30 -5) + 5;
        this.positionX = 100;
        this.positionY = Math.floor(Math.random() * (100 - this.height + 1)); // random number between 0 and (100 - this.height)
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
    moveLeft(){
        this.positionX--;
        this.domElement.style.left = this.positionX + "vw";
    }
}


const obstacleTrunkArr = []; 



trunkStart = setInterval(() => {
    const newObstacleTrunk = new ObstacleTrunk();
    obstacleTrunkArr.push(newObstacleTrunk);
}, 4000);



trunkStop = setInterval(() => {
    obstacleTrunkArr.forEach((obstacleTrunkInstance) => {

        
        obstacleTrunkInstance.moveLeft();

        
        if (
            player.positionX < obstacleTrunkInstance.positionX + obstacleTrunkInstance.width &&
            player.positionX + player.width > obstacleTrunkInstance.positionX &&
            player.positionY < obstacleTrunkInstance.positionY + obstacleTrunkInstance.height &&
            player.positionY + player.height > obstacleTrunkInstance.positionY
        ){
            
            clearInterval(counter);
            endGameContainer.style.display = "block" // will show Game over page
            gameBoard.style.display = "none" // will hide game page
            scoreContainer.innerText = 'Score: ' + score;
            clearInterval(trunkStop); // trunks 
        }
    });

    
}, 50);


document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowUp') {
        player.moveUp();
    } else if (e.code === 'ArrowDown') {
        player.moveDown();
    }
});


//BUTTONS

restartButton.addEventListener("click", () => {
    
    endGameContainer.style.display = "none" // will hide Game over page
    gameBoard.style.display = "block" // will show game page
    startGameContainer.style.display = "none" // will hide Start Game page
    scoreContainer.innerText = 'Score: ' + score;
    startCounter ();
    stoneStart ();
    trunkStart ();
});

startButton.addEventListener("click", () => {
    
    endGameContainer.style.display = "none" // will hide Game over page
    gameBoard.style.display = "block" // will show game page
    startGameContainer.style.display = "none" // will hide Start Game page
    scoreContainer.innerText = 'Score: ' + score;
    startCounter ();
    stoneStart ();
    trunkStart ();
});


//COUNTER

function startCounter(){
    
    counter = setInterval(function(){
        scoreContainer.innerText = 'Score: ' + score;
        score++;
        if (score > 5000) {
            clearInterval(counter);
            //console.log(score - 1);
            location.href = "gamestart.html";
        }
    }, 1000);
};











