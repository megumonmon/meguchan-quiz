// クイズのデータ
const quizData = [
  {
    question: "みきもんは？",
    choices: ["JAM", "MINI"],
    correct: 0,
    correctImage: "images/jam.png",
    wrongImage: "images/wrong.jpg"
  },
  {
    question: "めぐちゃんの好きな食べ物は？",
    choices: ["オムライス", "オムそば"],
    correct: 0,
    correctImage: "images/omu.png",
    wrongImage: "images/wrong.jpg"
  },
  {
    question: "美遥ちゃんの誕生日は？",
    choices: ["11月27日", "11月29日"],
    correct: 1,
    correctImage: "images/1129.png",
    wrongImage: "images/wrong.jpg"
  }
];

let currentQuestion = 0;

// HTMLの要素を取得
const startScreen = document.getElementById("start-screen");
const startButton = document.getElementById("start-button");
const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const choicesDiv = document.getElementById("choices");
const resultImage = document.getElementById("result-image");
const nextButton = document.getElementById("next-button");
const showResultButton = document.getElementById("show-result-button");
const resultScreen = document.getElementById("result-screen");
const resultText = document.getElementById("result-text");
const finalResultImage = document.getElementById("final-result-image");
const finalResultVideo = document.getElementById("final-result-video");
const restartButton = document.getElementById("restart-button");
const openPresentButton = document.getElementById("open-present-button");

// ページが読み込まれたらボタンにイベントリスナーを設定
window.onload = () => {
  startButton.onclick = startQuiz;
  restartButton.onclick = startQuiz;
  nextButton.onclick = showNextQuestion;
  openPresentButton.onclick = openPresent;
  showResultButton.onclick = showFinalResult;
};

// クイズを開始する関数
function startQuiz() {
  currentQuestion = 0;
  startScreen.style.display = "none";
  resultScreen.style.display = "none";
  quizContainer.style.display = "block";
    
　finalResultImage.style.display = "none";
  finalResultVideo.style.display = "none";
  showQuestion();
}

// クイズ画面を表示する関数
function showQuestion() {
  const q = quizData[currentQuestion];
  questionElement.textContent = q.question;
  choicesDiv.innerHTML = "";

  q.choices.forEach((choice, index) => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.onclick = () => checkAnswer(index);
    choicesDiv.appendChild(btn);
  });

  nextButton.style.display = "none";
  showResultButton.style.display = "none";
  resultImage.style.display = "none";
}

function checkAnswer(selected) {
  const q = quizData[currentQuestion];
  const choiceButtons = choicesDiv.querySelectorAll('button');
  choiceButtons.forEach(btn => btn.disabled = true);

  if (selected === q.correct) {
    // 正解の場合
    resultImage.src = q.correctImage;
    resultImage.style.display = "block";
    
    currentQuestion++; 

    if (currentQuestion < quizData.length) {
      // 最後の問題でなければ「次の問題へ」ボタンを表示
      nextButton.style.display = "block";
    } else {
      // 全問正解時の処理
      showResultButton.style.display = "block";
    }
  } else {
    // 不正解の場合
    resultImage.src = q.wrongImage;
    resultImage.style.display = "block";

    setTimeout(() => {
      resultImage.style.display = "none";
      // 不正解時の処理
      quizContainer.style.display = "none";
      resultScreen.style.display = "block";
      resultText.innerHTML = "えーん！";
      
      finalResultImage.src = "images/sad.jpg";
      finalResultImage.style.display = "block";
	finalResultVideo.style.display = "none";
      restartButton.textContent = "最初から";
    }, 1500);
  }
}

// 次の問題へボタンが押された時の関数
function showNextQuestion() {
  resultImage.style.display = "none";
  nextButton.style.display = "none";
  showQuestion();
}

// 結果を見るボタンが押された時の関数
function showFinalResult() {
  resultImage.style.display = "none";
  showResultButton.style.display = "none";
  quizContainer.style.display = "none";
  resultScreen.style.display = "block";

  resultText.innerHTML = "全問正解！<br>いぇーい！";
  openPresentButton.style.display = "block";
  restartButton.style.display = "none";
  finalResultImage.style.display = "none";
finalResultVideo.style.display = "none";
}

// プレゼントを開くボタンが押された時の関数
function openPresent() {
  openPresentButton.style.display = "none";
  resultText.innerHTML = "みきもんお誕生日おめでとう🎉";
  
  finalResultImage.style.display = "none";
  finalResultVideo.src = "videos/happy.mp4";
  finalResultVideo.style.display = "block";
	finalResultVideo.play();

  restartButton.textContent = "もう一度遊ぶ";
  restartButton.style.display = "block";
}

// クイズを最初からやり直す関数
function restartQuiz() {
  finalResultImage.style.display = "none";
  finalResultVideo.style.display = "none";
	finalResultVideo.pause();
	finalResultVideo.src = "";
  restartButton.style.display = "none";
  openPresentButton.style.display = "none";
  showResultButton.style.display = "none";
  startQuiz();
}
