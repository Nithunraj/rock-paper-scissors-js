/* Default operator used chech lesson6terinaryOperators.html */
let score = JSON.parse(localStorage.getItem('score')) || {
    wins:0,
    losses:0,
    ties:0
};

let isAutoPlaying = false;
let interval;
/* 
if (!score) {
    score = {
        wins:0,
        losses:0,
        ties:0
    }
} 
*/


document.body.querySelector('.js-rock-move-button').addEventListener('click',() => {
    playGame('rock');
})

document.body.querySelector('.js-paper-move-button').addEventListener('click',() => {
    playGame('paper');
})

document.body.querySelector('.js-scissors-move-button').addEventListener('click',() => {
    playGame('scissors');
})

document.body.addEventListener('keydown',(event) => {
    if (event.key === 'p') {
        playGame('paper');
    }else if (event.key === 's') {
        playGame('scissors');
    }else if (event.key == 'r') {
        playGame('rock');
    }else if (event.key == 'a') {
        autoPlay();
    }else if (event.key == 'Backspace') {
        resetScoreConfirmation();
    }
})

updateScoreElement();

function playGame(playerMove) {
    let computerMove = pickComputerMove()
    let result = '';
    if (playerMove === 'scissors'){
        if (computerMove === 'scissors') {
            result = 'tie..';
        } else if (computerMove === 'rock') {
            result = 'You lose';
        } else if (computerMove === 'paper') {
            result = 'You win';
        }

    } else if (playerMove === 'rock'){
        if (computerMove === 'scissors') {
            result = 'You win';
        } else if (computerMove === 'rock') {
            result = 'tie..';
        } else if (computerMove === 'paper') {
            result = 'You lose';
        }
        
    } else if (playerMove === 'paper'){
        if (computerMove === 'rock') {
            result = 'You win';
        } else if (computerMove === 'paper') {
            result = 'tie..';
        } else if (computerMove === 'scissors') {
            result = 'You lose';
        }
    }

    if (result === 'You win') {
        score.wins+=1;
    } else if (result === 'You lose') {
        score.losses+=1;
    }else {
        score.ties+=1;
    }

    updateScoreElement();

    /*LocalStorage only stores strings so we convert using JSON*/
    localStorage.setItem('score',JSON.stringify(score));
    document.querySelector('.js-results').innerHTML = `${result}`
    document.querySelector('.js-moves').innerHTML = `You <img class="move-icon" src="icons/${playerMove}-emoji.png" alt="">
    <img class="move-icon" src="icons/${computerMove}-emoji.png" alt=""> Computer`;

    /* alert(`You picked ${playerMove}. Computer picked ${computerMove}. ${result}\nWins:${score.wins},Loses:${score.losses},Ties:${score.ties}`)*/;
}

document.body.querySelector('.js-reset-score-button').addEventListener('click',() => {
    resetScoreConfirmation();
})

function resetScoreConfirmation() {
    document.body.querySelector('.js-reset-score-confirmation').innerHTML = "<p>Are you sure you want to reset the score? <button class = 'js-reset-score-response'>Yes</button> <button class = 'js-reset-score-response-no'>No</button></p>"
    const response_from_button = document.body.querySelector('.js-reset-score-response');
    const response_from_button_no = document.body.querySelector('.js-reset-score-response-no');
    response_from_button.addEventListener('click',() => {
        resetScore();
        document.body.querySelector('.js-reset-score-confirmation').innerHTML = ''
    })
    response_from_button_no.addEventListener('click',() => {
        document.body.querySelector('.js-reset-score-confirmation').innerHTML = '<p>Score is not reset</p>'
        setTimeout(() => {
            document.body.querySelector('.js-reset-score-confirmation').innerHTML = ''
        }, 2000);
    })
}

function resetScore() {
    score.wins = 0;
    score.losses=0;
    score.ties=0;
    localStorage.removeItem('score');
    updateScoreElement();
}

function updateScoreElement() {
    document.querySelector('.js-score').
    innerHTML = `Wins: ${score.wins},Loses: ${score.losses},Ties: ${score.ties}`
}

function pickComputerMove() {
    const randomNumber = Math.random();
    let computerMove = '';
    if (randomNumber >=0 && randomNumber < 1/3) {
        computerMove = 'rock';
    } else if (randomNumber >=1/3 && randomNumber < 2/3){
        computerMove = 'paper';
    } else if (randomNumber >=2/3 && randomNumber < 1){
        computerMove = 'scissors';
    }
    return computerMove
}

document.body.querySelector('.js-auto-play-button').addEventListener('click',() => {
    autoPlay();
})

function autoPlay(){
    const playerMove = pickComputerMove();
    if (!isAutoPlaying){
        document.body.querySelector('.js-auto-play-button').innerHTML = 'Stop Playing';
        interval = setInterval(() => {
            playGame(playerMove);
        },1000);
        isAutoPlaying = true;
    }else {
        clearInterval(interval);
        document.body.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
        isAutoPlaying = false;
    }
}