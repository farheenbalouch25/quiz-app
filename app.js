var questions = [
  {
    question: "Q1: HTML Stands for?",
    option1: "Hyper Text Markup Language",
    option2: "Hyper Tech Markup Language",
    option3: "Hyper Touch Markup Language",
    corrAnswer: "Hyper Text Markup Language",
  },
  {
    question: "CSS Stands for?",
    option1: "Cascoding Style Sheets",
    option2: "Cascading Style Sheets",
    option3: "Cascating Style Sheets",
    corrAnswer: "Cascading Style Sheets",
  },
  {
    question: "Which tag is used for the largest heading?",
    option1: "<h6>",
    option2: "<h2>",
    option3: "<h1>",
    corrAnswer: "<h1>",
  },
  {
    question: "Which tag is used to make an element unique?",
    option1: "id",
    option2: "class",
    option3: "label",
    corrAnswer: "id",
  },
  {
    question: "Any element assigned with id can be accessed in CSS:",
    option1: "by # tag",
    option2: "by @ tag",
    option3: "by & tag",
    corrAnswer: "by # tag",
  },
  {
    question: "CSS can be used with ______ methods.",
    option1: "8",
    option2: "3",
    option3: "4",
    corrAnswer: "3",
  },
  {
    question: "In JS variable types are ____________.",
    option1: "6",
    option2: "3",
    option3: "8",
    corrAnswer: "8",
  },
  {
    question: "In array we can use key name and value.",
    option1: "True",
    option2: "False",
    option3: "None of above",
    corrAnswer: "False",
  },
  {
    question: "toFixed() is used to define the length of decimal.",
    option1: "True",
    option2: "False",
    option3: "None of above",
    corrAnswer: "True",
  },
  {
    question: "push() adds element in the start of array.",
    option1: "True",
    option2: "False",
    option3: "None of above",
    corrAnswer: "False",
  },
];

var quesElement = document.getElementById("ques");
var option1 = document.getElementById("opt1");
var option2 = document.getElementById("opt2");
var option3 = document.getElementById("opt3");
var nextBtn = document.getElementById("btn");
var score = 0;
var index = 0;
var min, sec;
var timerInterval;

function startTimer() {
  clearInterval(timerInterval);
  min = 1;
  sec = 59;
  var pElement = document.getElementById("time");

  timerInterval = setInterval(function () {
    pElement.innerHTML = `${min}:${sec < 10 ? "0" + sec : sec}`;
    sec--;

    if (min === 0 && sec < 10) {
      pElement.style.color = "red";
    } else {
      pElement.style.color = "black";
    }
   
    if (sec < 0) {
      min--;
      sec = 59;  
      if (min < 0) {
        clearInterval(timerInterval);
        nextQuestion();
      }
    }
  }, 1000);
}

function nextQuestion() {
  if (index > 0) {
    var allInputs = document.querySelectorAll("input[name='options']");
    for (var i = 0; i < allInputs.length; i++) {
      if (allInputs[i].checked) {
        var userSelectedValue = allInputs[i].value;
        var selectedOption = questions[index - 1]["option" + userSelectedValue];
        var correctAnswer = questions[index - 1]["corrAnswer"];
        if (correctAnswer === selectedOption) {
          score++;
        }
      }
      allInputs[i].checked = false;
    }
    nextBtn.disabled = true;
  }

  if (index >= questions.length) {
    clearInterval(timerInterval);
    var percentage = (score / questions.length) * 100;

    if (percentage >= 50) {
      Swal.fire({
        title: "Good Job! 🎉",
        text: `Your Score: ${percentage.toFixed(1)}%`,
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "Try Again ",
        text: `Your Score: ${percentage.toFixed(1)}%`,
        icon: "error",
      });
    }
    return;
  }

  quesElement.innerText = questions[index].question;
  option1.innerText = questions[index].option1;
  option2.innerText = questions[index].option2;
  option3.innerText = questions[index].option3;
  index++;

  startTimer();
}

function trigger() {
  nextBtn.disabled = false;
}

nextQuestion();
