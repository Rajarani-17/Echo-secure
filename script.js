// ===============================
// Cybersecurity Awareness Quiz
// Random 10 Questions per Session
// ===============================

// 🔹 MASTER QUESTION BANK
const questionBank = [
  {
    question: "Which password is the strongest?",
    options: ["123456", "Password123", "My$ecureP@ss2025"],
    correct: 2
  },
  {
    question: "Which message is a phishing attempt?",
    options: [
      "Your bank account is locked. Click here immediately!",
      "Team meeting at 3 PM today"
    ],
    correct: 0
  },
  {
    question: "What should you do if someone asks for your OTP?",
    options: ["Share it quickly", "Refuse and report"],
    correct: 1
  },
  {
    question: "What does 2FA stand for?",
    options: ["Two Firewall Access", "Two-Factor Authentication"],
    correct: 1
  },
  {
    question: "Which is safer?",
    options: [
      "Same password for all accounts",
      "Different passwords for each account"
    ],
    correct: 1
  },
  {
    question: "Public Wi-Fi is safest when you:",
    options: ["Use a VPN", "Do online banking freely"],
    correct: 0
  },
  {
    question: "Which email detail should you check first?",
    options: ["Sender email address", "Font style"],
    correct: 0
  },
  {
    question: "What is the main role of a firewall?",
    options: ["Control network traffic", "Create passwords"],
    correct: 0
  },
  {
    question: "Which is a common sign of an online scam?",
    options: [
      "Too-good-to-be-true offers",
      "Official customer support reply"
    ],
    correct: 0
  },
  {
    question: "If you lose money to cyber fraud, what should you do first?",
    options: [
      "Ignore it",
      "Contact bank and report immediately"
    ],
    correct: 1
  },
  {
    question: "Which is a secure website indicator?",
    options: ["HTTP", "HTTPS"],
    correct: 1
  },
  {
    question: "Why should software be updated regularly?",
    options: ["For new colors", "To fix security vulnerabilities"],
    correct: 1
  }
];

// 🔹 SHUFFLE FUNCTION
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// 🔹 PICK RANDOM 10
shuffle(questionBank);
const questions = questionBank.slice(0, 10);

// 🔹 STATE
let currentQuestion = 0;
let score = 0;
let answered = false;

const container = document.getElementById("game-container");

// 🔹 LOAD QUESTION
function loadQuestion() {
  answered = false;
  const q = questions[currentQuestion];

  container.innerHTML = `
    <p><strong>Question ${currentQuestion + 1} / ${questions.length}</strong></p>
    <p style="margin:1rem 0;">${q.question}</p>

    <div class="options">
      ${q.options.map(
        (option, index) =>
          `<button onclick="selectAnswer(${index})" class="option-btn">
            ${option}
          </button>`
      ).join("")}
    </div>

    <div id="feedback" style="margin-top:1rem;"></div>
  `;
}

// 🔹 ANSWER HANDLER
function selectAnswer(index) {
  if (answered) return;
  answered = true;

  const feedback = document.getElementById("feedback");

  if (index === questions[currentQuestion].correct) {
    score++;
    feedback.innerHTML = `<p style="color:green;">✅ Correct</p>`;
  } else {
    feedback.innerHTML = `<p style="color:red;">❌ Incorrect</p>`;
  }

  if (currentQuestion < questions.length - 1) {
    feedback.innerHTML += `<button onclick="nextQuestion()">Next</button>`;
  } else {
    feedback.innerHTML += `<button onclick="showResult()">Finish</button>`;
  }
}

// 🔹 NEXT QUESTION
function nextQuestion() {
  currentQuestion++;
  loadQuestion();
}

// 🔹 RESULT + SCORE MESSAGE
function showResult() {
  let message = "";

  if (score === 10) {
    message = "🔥 Outstanding! You have excellent cybersecurity awareness.";
  } else if (score >= 7) {
    message = "✅ Great job! You are well aware of online safety practices.";
  } else if (score >= 4) {
    message = "⚠️ Fair attempt. You should review some cybersecurity basics.";
  } else {
    message = "🚨 High risk! Please learn more to stay safe online.";
  }

  container.innerHTML = `
    <h2>🏁 Quiz Completed</h2>
    <p><strong>Your Score:</strong> ${score} / ${questions.length}</p>
    <p>${message}</p>
    <button onclick="location.reload()">Play Again</button>
  `;
}

// 🔹 AUTO START
loadQuestion();
