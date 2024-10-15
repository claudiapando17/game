
let counter; // count the score during the game
let score = 0;
const scoreContainer = document.querySelector(".score")
const endGameContainer = document.querySelector("#gameOver")
const gameBoard = document.querySelector("#board")
const restartButton = document.querySelector("#restart")

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
setInterval(() => {
    const newObstacleStone = new ObstacleStone();
    obstacleStoneArr.push(newObstacleStone);
}, 1000);


// update all obstacles
setInterval(() => {
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
            clearInterval(counter);
            console.log("Final Score: " + (score -1));
            endGameContainer.style.display = "block"
            gameBoard.style.display = "none"
          
            console.log(score);
            
            scoreContainer.innerText = 'Score: ' + score;
            
            
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



setInterval(() => {
    const newObstacleTrunk = new ObstacleTrunk();
    obstacleTrunkArr.push(newObstacleTrunk);
}, 4000);



setInterval(() => {
    obstacleTrunkArr.forEach((obstacleTrunkInstance) => {

        
        obstacleTrunkInstance.moveLeft();

        
        if (
            player.positionX < obstacleTrunkInstance.positionX + obstacleTrunkInstance.width &&
            player.positionX + player.width > obstacleTrunkInstance.positionX &&
            player.positionY < obstacleTrunkInstance.positionY + obstacleTrunkInstance.height &&
            player.positionY + player.height > obstacleTrunkInstance.positionY
        ){
            
            console.log("game over");
            clearInterval(counter);
            console.log("Final Score: " + (score -1));
            endGameContainer.style.display = "block"
            gameBoard.style.display = "none"
          
            console.log(score);
            
            scoreContainer.innerText = 'Score: ' + score;
            
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

restartButton.addEventListener("click", () => {
    window.location.reload()
})



window.onload = function startCounter(){
    
    counter = setInterval(function(){
        scoreContainer.innerText = 'Score: ' + score;
        score++;
        if (score > 5000) {
            clearInterval(counter);
            console.log(score - 1);
            location.href = "gamestart.html";
        }
    }, 1000);
};










