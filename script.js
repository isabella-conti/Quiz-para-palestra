const startBtn = document.getElementById('start-btn');
const quizEl = document.querySelector('.quiz');
const welcomePageEl = document.querySelector('.welcome-page');

startBtn.addEventListener('click', () => {
    welcomePageEl.style.display = 'none';
    quizEl.style.display = 'block';
});

const questions = [
    {
        question: "Qual peça de xadrez se move em forma de L?",
        answers: [
            {text: "Cavalo", correct: true},
            {text: "Bispo", correct: false},
            {text: "Torre", correct: false},
            {text: "Peão", correct: false},
        ]
    },
    {
        question: "Qual peça pode se mover qualquer número de casas em linha reta?",
        answers: [
            {text: "Rei", correct: false},
            {text: "Torre", correct: true},
            {text: "Bispo", correct: false},
            {text: "Peão", correct: false},
        ]        
    },
    {
        question: "Qual peça pode se mover apenas uma casa em qualquer direção?",
        answers: [
            {text: "Bispo", correct: false},
            {text: "Torre", correct: false},
            {text: "Rei", correct: true},
            {text: "Peão", correct: false},
        ]        
    },
    {
        question: "Qual é a peça mais poderosa do xadrez?",
        answers: [
            {text: "Cavalo", correct: false},
            {text: "Bispo", correct: false},
            {text: "Torre", correct: false},
            {text: "Dama", correct: true},
        ]        
    },
    {
        question: "Qual peça começa no canto do tabuleiro?",
        answers: [
            {text: "Bispo", correct: false},
            {text: "Torre", correct: true},
            {text: "Cavalo", correct: false},
            {text: "Rei", correct: false},
        ]        
    },
    {
        question: "Quantas casas um peão pode mover-se em seu primeiro movimento?",
        answers: [
            {text: "Uma ou duas casas", correct: true},
            {text: "Somente uma casa", correct: false},
            {text: "Somente duas casas", correct: false},
            {text: "Qualquer número de casas", correct: false},
        ]        
    },
    {
        question: "Qual peça só pode se mover na diagonal?",
        answers: [
            {text: "Cavalo", correct: false},
            {text: "Bispo", correct: true},
            {text: "Torre", correct: false},
            {text: "Peão", correct: false},
        ]        
    },
    {
        question: "Quantas casas existem no tabuleiro de xadrez?",
        answers: [
            {text: "81", correct: false},
            {text: "100", correct: false},
            {text: "36", correct: false},
            {text: "64", correct: true},
        ]        
    },
    {
        question: "O que acontece quando um peão atinge o outro lado do tabuleiro?",
        answers: [
            {text: "O peão é removido", correct: false},
            {text: "O peão é promovido", correct: true},
            {text: "O peão ganha outra jogada", correct: false},
            {text: "O peão fica imobilizado", correct: false},
        ]        
    },
    {
        question: "Qual peça é a única que pode 'pular' sobre outras peças?",
        answers: [
            {text: "Bispo", correct: false},
            {text: "Torre", correct: false},
            {text: "Cavalo", correct: true},
            {text: "Dama", correct: false},
        ]        
    }
];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
 
let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function dingSound(){
    let ding = new Audio ('sounds/ding.mp3');
    ding.play();
}

function wrongSound(){
    let wrong = new Audio ('sounds/wrong-answer.mp3');
    wrong.play();
}


function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        dingSound();
        selectedBtn.classList.add("correct"); 
        score++;
    }else{
        wrongSound();
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";

}


function showScore(){
    resetState();
    let userScore = `You scored ${score} out of ${questions.length}.`;
    questionElement.innerHTML = userScore;
    questionElement.style.textAlign = "center"; // Align the text at the center
    nextButton.innerHTML = "Play Again?";
    nextButton.style.display = "block";
    
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();