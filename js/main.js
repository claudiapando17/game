

class Player {
    constructor() {
        this.width = 10;
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
        board.appendChild(this.domElement);
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


class Obstacle {
    constructor(){
        this.width = Math.random()* 10;
        this.height = Math.random()* 20;
        this.positionX = 100;
        this.positionY = Math.floor(Math.random() * (100 - this.height + 1)); // random number between 0 and (100 - this.height)
        this.domElement = null;

        this.createDomElement();
    }
    createDomElement() {
        // step1: create the element
        this.domElement = document.createElement("div");

        // step2: add content or modify (ex. innerHTML...)
        this.domElement.className = "obstacle";
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

const obstacleArr = []; // will store instances of the class Obstacle


// create obstacles
setInterval(() => {
    const newObstacle = new Obstacle();
    obstacleArr.push(newObstacle);
}, 1000);


// update all obstacles
setInterval(() => {
    obstacleArr.forEach((obstacleInstance) => {

        // move current obstacle
        obstacleInstance.moveLeft();

        // detect collision
        if (
            player.positionX < obstacleInstance.positionX + obstacleInstance.width &&
            player.positionX + player.width > obstacleInstance.positionX &&
            player.positionY < obstacleInstance.positionY + obstacleInstance.height &&
            player.positionY + player.height > obstacleInstance.positionY
        ){
            //clearInterval(counter);
            console.log("game over");
            location.href = "gameover.html";
            
        }
    });

    
}, 50);


class BiggerObstacle {
    constructor(){
        this.width = Math.random()* 10;
        this.height = Math.random()* 30;
        this.positionX = 100;
        this.positionY = Math.floor(Math.random() * (100 - this.height + 1)); // random number between 0 and (100 - this.height)
        this.domElement = null;

        this.createDomElement();
    }
    createDomElement() {
        // step1: create the element
        this.domElement = document.createElement("div");

        // step2: add content or modify (ex. innerHTML...)
        this.domElement.className = "biggerObstacle";
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


const biggerObstacleArr = []; // will store instances of the class BiggerObstacle


// create obstacles
setInterval(() => {
    const newBiggerObstacle = new BiggerObstacle();
    biggerObstacleArr.push(newBiggerObstacle);
}, 4000);


// update all obstacles
setInterval(() => {
    biggerObstacleArr.forEach((biggerObstacleInstance) => {

        // move current obstacle
        biggerObstacleInstance.moveLeft();

        // detect collision
        if (
            player.positionX < biggerObstacleInstance.positionX + biggerObstacleInstance.width &&
            player.positionX + player.width > biggerObstacleInstance.positionX &&
            player.positionY < biggerObstacleInstance.positionY + biggerObstacleInstance.height &&
            player.positionY + player.height > biggerObstacleInstance.positionY
        ){
            //clearInterval(counter);
            console.log("game over");
            location.href = "gameover.html";
            
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

window.onload = function counter(){
    let score = 0;
    let counter = setInterval(function(){
        document.getElementById("scorePoints").innerHTML= 'Score: ' + score;
        score++;
        if (score > 5) {
            clearInterval(counter);
            console.log(score - 1);
            //location.href = "gamestart.html";
        }
    }, 1000);
};




















/*class Timer {
    constructor() {
        this.timeRemaining = timeRemaining;
        this.duration = duration;

        this.createDomElement();
    }

  
    const duration = 120;
  const minutes = Math.floor(timeRemaining / 60).toString().padStart(2, "0");
  const seconds = (timeRemaining % 60).toString().padStart(2, "0");
  

  // Display the time remaining in the time remaining container
  const timeRemainingContainer = document.getElementById("timeRemaining");
  timeRemainingContainer.innerText = `${minutes}:${seconds}`;



  let timer = 0 ;

  function startTimer() {
    timer = setInterval(function countingDown(){
    
    if(timeRemaining <= 0) {
      clearInterval(timer);
      showResults();
    }

    timeRemaining--;
    timeRemainingContainer.innerText = `${Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0")}:${(quiz.timeRemaining % 60).toString().padStart(2, "0")}`;
  }, 
  1000);
}
startTimer();

}*/