const questions = [
  {
    question: "which is largest animal in the world?",
    answers: [
      { text: "Shark", correct: "false" },
      { text: "Blue whale", correct: "true" },
      { text: "Elephant", correct: "false" },
      { text: "Giraffe", correct: "false" },
    ],
  },
  {
    question: "which is largest continent in the world?",
    answers: [
      { text: "Asia", correct: "true" },
      { text: "Australia", correct: "false" },
      { text: "Arctic", correct: "false" },
      { text: "Africa", correct: "false" },
    ],
  },
  {
   question: "which is smallest country in the world?",
   answers: [
     { text: "Vatican", correct: "true" },
     { text: "Bhutan", correct: "false" },
     { text: "Nepal", correct: "false" },
     { text: "Shri Lanka", correct: "false" },
   ],
 },
    {
      question: "which is largest desert in the world?",
      answers: [
        { text: "Kalahari", correct: "false" },
        { text: "Gobi", correct: "false" },
        { text: "Sahara", correct: "true" },
        { text: "Antarctica", correct: "false" },
      ],
    },
    {
      question: "which is smallest continent in the world?",
      answers: [
        { text: "Asia", correct: "false" },
        { text: "Australia", correct: "true" },
        { text: "Arctic", correct: "false" },
        { text: "Africa", correct: "false" },
      ],
    },
];

let question = document.querySelector("#question");
let answerBtn = document.querySelector("#answer-button");
let nextBtn = document.querySelector("#next-btn");

let currQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currQuestionIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currQuestion = questions[currQuestionIndex];
  let questionNo = currQuestionIndex + 1;
  question.innerHTML = questionNo + "." + currQuestion.question;

  currQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerBtn.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);

    //  console.log(answer.correct)
    // console.log(button.dataset.correct=answer.correct)
  });
}

function resetState() {
  nextBtn.style.display = "none";
  while (answerBtn.firstChild) {
    answerBtn.removeChild(answerBtn.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerBtn.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextBtn.style.display = "block";
}

function showScore() {
  resetState();
  question.innerHTML = `You scores ${score} out of ${questions.length}`;
  nextBtn.innerHTML = "Play Again";
  nextBtn.style.display = "block";
}

function handleNextBtn() {
  currQuestionIndex++;
  if (currQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextBtn.addEventListener("click", () => {
  if (currQuestionIndex < questions.length) {
    handleNextBtn();
  } else {
    startQuiz();
  }
});

startQuiz();
