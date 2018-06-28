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
const redTeamScore = document.querySelector('.redTeamScore');
const blueTeamScore = document.querySelector('.blueTeamScore');

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
  if (keys.length >= 2) {
    choiceRef.remove();
  }
}

function initialize() {

}

function testChoices(playerChoice, prevPlayerChoice) {
  if (playerChoice === 'rock' && prevPlayerChoice === 'scissors') {
    playerOneScore++;
    redTeamScore.innerHTML = playerOneScore;
  }
  if (playerChoice === 'scissors' && prevPlayerChoice ==='rock') {
    playerTwoScore++;
    blueTeamScore.innerHTML = playerTwoScore;
  }
  if (playerChoice === 'paper' && prevPlayerChoice ==='rock') {
    playerOneScore++;
    redTeamScore.innerHTML = playerOneScore;
  }
  if (playerChoice === 'rock' && prevPlayerChoice === 'paper') {
    playerTwoScore++;
    blueTeamScore.innerHTML = playerTwoScore;
  }
  if (playerChoice === 'scissors' && prevPlayerChoice === 'paper') {
    playerOneScore++;
    redTeamScore.innerHTML = playerOneScore;
  }
  if (playerChoice === 'paper' && prevPlayerChoice === 'scissors') {
    playerTwoScore++;
    blueTeamScore.innerHTML = playerTwoScore;
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


// object holding GAME
// make user pick which team and wait for an additional player
// initialize round
// turn-based
// send data, get results, increase score as appropriate
// initialize round again
