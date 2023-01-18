const canvas = document.getElementById("ballCanvas");
const context = canvas.getContext("2d");
const startStopBtn = document.querySelector(".btn-start-stop");

startStopBtn.addEventListener("click", function () {
  if (state === false) {
    Start();
    startStopBtn.innerText = "Stop";
  } else {
    Stop();
    startStopBtn.innerText = "Start";
  }
});

let state = false;
const balls = [];
const width = canvas.width;
const height = canvas.height;


function Random(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Ball {
  constructor(x, y, rad, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = rad;
    this.dx = dx;
    this.dy = dy; 
  }
  
}

function Start() {
  balls.length = 0;
  numberOfBalls = document.getElementById("amount-balls").value;
  range = document.getElementById("connection-range").value;

  for (let index = 0; index < numberOfBalls; index++) {
    balls.push(
      new Ball(Random(30,1250), Random(30, 690), Random(10, 30), Random(1, 5), Random(1, 5))
    )
  }
  Draw()
  state = true;
}

function Stop() {
  balls.length = 0;
  context.clearRect(0, 0, canvas.width, canvas.height)
  state = false;
}

function DrawBall(ball){
  context.beginPath();
  context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
  context.fillStyle = "#000";
  context.fill();
}

function Connect(ball1, ball2){
  context.beginPath();
  context.strokeStyle = "#000";
  context.moveTo(ball1.x, ball1.y);
  context.lineTo(ball2.x, ball2.y)
  context.stroke();
}

function Distance(ball1, ball2){
  let xD = ball1.x - ball2.x;
  let xY = ball1.y - ball2.y;
  return Math.sqrt((xD * xD) + (xY * xY));
}

function Update(ball){
  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
    ball.dx = -ball.dx;
  }
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.dy = -ball.dy;
  }
}

function Draw(){
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < numberOfBalls; i++) {
    for (let j = 0; j < numberOfBalls; j++) {
      if(i !== j && Distance(balls[i], balls[j]) < range){
        Connect(balls[i], balls[j]);
      }
    }
    Update(balls[i]);
    DrawBall(balls[i]);   
  }
  requestAnimationFrame(Draw);
}


