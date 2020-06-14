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