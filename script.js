const words = [
  { word: "Serendipity", meaning: "Finding something good without looking for it" },
  { word: "Ephemeral", meaning: "Lasting for a very short time" },
  { word: "Sonder", meaning: "The realization that each random passerby is living a life as vivid and complex as your own" },
  { word: "Petrichor", meaning: "The pleasant smell that accompanies the first rain after a dry spell" },
  { word: "Limerence", meaning: "The state of being infatuated with another person" }
];

let currentWordIndex = 0;
let score = 0;

function startGame() {
  const wordDisplay = document.getElementById("wordDisplay");
  words.forEach(wordObj => {
    const wordDiv = document.createElement("div");
    wordDiv.classList.add("word-container");
    const wordHeading = document.createElement("h2");
    wordHeading.textContent = wordObj.word;
    const meaningParagraph = document.createElement("p");
    meaningParagraph.textContent = wordObj.meaning;
    wordDiv.appendChild(wordHeading);
    wordDiv.appendChild(meaningParagraph);
    wordDisplay.appendChild(wordDiv);
  });
  // Start word timer
  let timer1 = 10;
  let interval1 = setInterval(() => {
    timer1--;
    document.getElementById("timer1").textContent = timer1;
    if (timer1 === 0) {
      clearInterval(interval1);
      document.getElementById("wordDisplay").style.display = "none";
      document.getElementById("quiz").classList.add("quiz-start-animation");
      document.getElementById("quiz").style.display = "block";
      displayQuestion();
    }
  }, 1000);
}

function displayQuestion() {
  if (currentWordIndex < words.length) {
    const options = document.querySelectorAll(".option");
    const correctOptionIndex = Math.floor(Math.random() * 4);
    options[correctOptionIndex].textContent = words[currentWordIndex].meaning;
    let j = 0;
    for (let i = 0; i < 4; i++) {
      if (i !== correctOptionIndex) {
        options[i].textContent = words[currentWordIndex === 0 ? words.length - 1 : currentWordIndex - 1].meaning;
        j++;
      }
    }
    currentWordIndex++;
    document.getElementById("question").textContent = `What is the meaning of "${words[currentWordIndex - 1].word}"?`;

    // Start question timer
    let timer2 = 10;
    let interval2 = setInterval(() => {
      timer2--;
      document.getElementById("timer2").textContent = timer2;
      if (timer2 === 0) {
        clearInterval(interval2);
        displayQuestion();
      }
    }, 1000);
  } else {
    showResult();
  }
}

function checkAnswer(option) {
  if (option.textContent === words[currentWordIndex - 1].meaning) {
    score++;
  }
  displayQuestion();
}

function showResult() {
  document.getElementById("quiz").style.display = "none";
  document.getElementById("result").style.display = "block";
  document.getElementById("score").textContent = score + "/" + words.length;
}

// Begin the quiz after 3 seconds with an animation
setTimeout(() => {
  document.getElementById("quiz").classList.add("begin-animation");
  startGame();
}, 3000);