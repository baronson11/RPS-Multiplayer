// GAME LOGIC------------------------------------------------
// Globals -----------------------------------------------

let playerOneScore = 0;
let playerTwoScore = 0;
let playerChoice = '';
let prevPlayerChoice = '';

// Database Reference ------------------------------------

let choiceRef = firebase.database().ref('choice');

// Selectors ---------------------------------------------

const rock = document.getElementById('rock');
const paper = document.getElementById('paper');
const scissors = document.getElementById('scissors');
const p1score = document.querySelector('.playerOneScore');
const p2score = document.querySelector('.playerTwoScore');

function getSelected(data) {
  let choice = data.val();
  let keys = Object.keys(choice);
  for (let i = 0; i < (keys.length - 1); i++) {
    let k = keys[i];
    let choices = choice[k];
    let input = choices.choice;
    prevPlayerChoice = input;
  }
  console.log(prevPlayerChoice);
}

function testChoices(playerChoice, prevPlayerChoice) {
  if (playerChoice === 'rock' && prevPlayerChoice === 'scissors') {
    playerOneScore++;
    p1score.innerHTML = playerOneScore;
  }
  if (playerChoice === 'scissors' && prevPlayerChoice ==='rock') {
    playerTwoScore++;
    p2score.innerHTML = playerTwoScore;
  }
  if (playerChoice === 'paper' && prevPlayerChoice ==='rock') {
    playerOneScore++;
    p1score.innerHTML = playerOneScore;
  }
  if (playerChoice === 'rock' && prevPlayerChoice === 'paper') {
    playerTwoScore++;
    p2score.innerHTML = playerTwoScore;
  }
  if (playerChoice === 'scissors' && prevPlayerChoice === 'paper') {
    playerOneScore++;
    p1score.innerHTML = playerOneScore;
  }
  if (playerChoice === 'paper' && prevPlayerChoice === 'scissors') {
    playerTwoScore++;
    p2score.innerHTML = playerTwoScore;
  }
}

rock.addEventListener('click', () => {
  choiceRef.push({choice: 'rock'});
  playerChoice = 'rock';
  if (playerChoice !== prevPlayerChoice ) {
    testChoices(playerChoice, prevPlayerChoice);
  } else if (playerChoice === prevPlayerChoice) {
    console.log('tied!');
  }
});

paper.addEventListener('click', () => {
  choiceRef.push({choice: 'paper'});
  playerChoice = 'paper';
  if (playerChoice !== prevPlayerChoice) {
    testChoices(playerChoice, prevPlayerChoice);
  } else if (playerChoice === prevPlayerChoice) {
    console.log('tied!');
  }
});

scissors.addEventListener('click', () => {
 choiceRef.push({choice: 'scissors'});
 playerChoice = 'scissors';
 if (playerChoice !== prevPlayerChoice) {
   testChoices(playerChoice, prevPlayerChoice);
 } else if (playerChoice === prevPlayerChoice) {
   console.log('tied!');
 }
});

choiceRef.on('value', getSelected);
