// step 1: define all the variables being used in quiz
var quizEl = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var scoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var timer = document.getElementById("timer");
var startQuizButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("startpage");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var inputHighScoreName = document.getElementById("initials");
var displayHighScoreName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var displayHighScore = document.getElementById("highscore-score");


// The five Quiz questions to be answered by user
var quizQuestions = [{
    question: "Commonly used data types DO Not Include?",
    choiceA: "1.strings",
    choiceB: "2.booleans",
    choiceC: "3.alerts",
    choiceD: "4.numbers",
    correctAnswer: "c"},
    {
    question: "The condition in an if / else statement is enclosed with _____.",
    choiceA: "1.quotes",
    choiceB: "2.curley brackets",
    choiceC: "3.parenthesis",
    choiceD: "4.square brackets",
    correctAnswer: "b"},
    {
    question: "Arrays in JavaScript can be used to store _____.",
    choiceA: "1.numbers and strings",
    choiceB: "2.other arrays",
    choiceC: "3.booleans",
    choiceD: "4.all of the above",
    correctAnswer: "d"},
    {
    question: "String values must be enclosed within _____ when being assigned to variables.",
    choiceA: "1.commas",
    choiceB: "2.curly brackets",
    choiceC: "3.quotes",
    choiceD: "4.parenthesis",
    correctAnswer: "c"},
    {
    question: "A very useful tool used during development and debugging for printing content to the debugger is",
    choiceA: "1. JavaScript",
    choiceB: "2.terminal/bash",
    choiceC: "3.for loops",
    choiceD: "4.console log",
    correctAnswer: "d"},  
    ];
    
// Adding timer length to Quiz
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 60;
var timerInterval;
var score = 0;
var correct;

//function that displays the quiz questons as selections are made
function generateQuizQuestion(){
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

// Function to start timer and prompt the first question onto screen and at the end of the quiz a score is displayed
function startQuiz(){
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    //Timer
    timerInterval = setInterval(function() {
        timeLeft--;
        timer.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizEl.style.display = "block";
}

function showScore(){
    quizEl.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    inputHighScoreName.value = "";
    scoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

// saving highscores to local storage and displays scores from highest to lowest 
submitScoreBtn.addEventListener("click", function highscore(){
    
    
    if(inputHighScoreName.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = inputHighScoreName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
    
        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }
    
});

function generateHighscores(){
    displayHighScoreName.innerHTML = "";
    displayHighScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        displayHighScoreName.appendChild(newNameSpan);
        displayHighScore.appendChild(newScoreSpan);
    }
}

// List of high scores and saving high scores to local storage
function showHighscore(){
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}


function clearScore(){
    window.localStorage.clear();
    displayHighScoreName.textContent = "";
    displayHighScore.textContent = "";
}

// Function to start quiz again after selecting the go back button 
function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 60;
    score = 0;
    currentQuestionIndex = 0;
}

// This function checks the response to each answer 
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("Correct");
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is correct.
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("Incorrect")
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is wrong.
    }else{
        showScore();
    }
}

// This button starts the quiz!
startQuizButton.addEventListener("click",startQuiz);