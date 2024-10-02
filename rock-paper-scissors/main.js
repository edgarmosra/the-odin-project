CHOICES = ['rock', 'paper', 'scissors']

function getComputerChoice() {
  return CHOICES[Math.floor(Math.random() * CHOICES.length)];
}

function getHumanChoice() {
  input = prompt("make a selection \n").toLowerCase();
  
  while (!CHOICES.includes(input)) {
    input = prompt("make another selection \n").toLowerCase();
  }
  return input;
}

function playGame() {
    let humanScore = 0;
    let computerScore = 0;
    let ties = 0;
    let round = 0;

    function playRound (computerChoice, humanChoice) {
    
        if (computerChoice === humanChoice) {
            ties++;
            return;
        }
        else if (humanChoice == "rock") {
            computerChoice == "scissors" ? humanScore++ : computerScore++;
        }
        else if (humanChoice == "paper") {
            computerChoice == "rock" ? humanScore++ : computerScore++; 
        }
        else if (humanChoice == "scissors") {
            computerChoice == "paper" ? humanScore++ : computerScore++; 
        }
    }

    while (round < 5) {
        const computerChoice = getComputerChoice()
        const humanChoice = 'rock'

        playRound(computerChoice, humanChoice);
        round++;
    }

    console.log(`computer score: ${computerScore}`)
    console.log(`human score: ${humanScore}`)
    console.log(`# of ties: ${ties}`)
}

playGame()