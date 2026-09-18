// Banco de perguntas sobre Ana Castela
const quizData = [
  {
    question: "Qual é o nome completo de Ana Castela?",
    options: [
      "Ana Flávia Castela",
      "Ana Castela Benevides",
      "Ana Gabriela Castela",
      "Ana Luiza Castela"
    ],
    answer: 0
  },
  {
    question: "Qual é o apelido artístico pelo qual Ana Castela é conhecida?",
    options: [
      "Boiadeira",
      "Rainha do Sertão",
      "Princesa do Rodeio",
      "Garota do Agro"
    ],
    answer: 0
  },
  {
    question: "Qual gênero musical está fortemente associado à carreira de Ana Castela?",
    options: [
      "Rock",
      "Sertanejo",
      "Funk",
      "Reggae"
    ],
    answer: 1
  },
  {
    question: "Em qual estado brasileiro Ana Castela nasceu?",
    options: [
      "Paraná",
      "São Paulo",
      "Mato Grosso do Sul",
      "Goiás"
    ],
    answer: 2
  },
  {
    question: "Qual destas músicas é conhecida por ser de Ana Castela?",
    options: [
      "Nosso Quadro",
      "Evidências",
      "Faroeste Caboclo",
      "Tempo Perdido"
    ],
    answer: 0
  },
  {
    question: "Qual tema aparece com frequência na imagem artística de Ana Castela?",
    options: [
      "Universo medieval",
      "Vida no campo e cultura sertaneja",
      "Ficção científica",
      "Música clássica europeia"
    ],
    answer: 1
  },
  {
    question: "Ana Castela ficou conhecida nacionalmente principalmente por sua atuação em qual área?",
    options: [
      "Cinema",
      "Literatura",
      "Música",
      "Jornalismo"
    ],
    answer: 2
  },
  {
    question: "Qual destas características combina com o estilo visual associado à Ana Castela?",
    options: [
      "Estilo country e boiadeira",
      "Estilo gótico medieval",
      "Estilo exclusivamente clássico",
      "Estilo futurista"
    ],
    answer: 0
  }
];

// Variáveis de controle
let currentQuestionIndex = 0;
let score = 0;
let answered = false;

// Elementos do DOM
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const feedbackMessage = document.getElementById('feedbackMessage');
const nextButton = document.getElementById('nextButton');
const progressBar = document.getElementById('progressBar');
const quizArea = document.getElementById('quizArea');
const resultScreen = document.getElementById('resultScreen');
const scoreText = document.getElementById('scoreText');
const restartButton = document.getElementById('restartButton');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');

// ============ FUNÇÕES DO QUIZ ============

function updateProgress() {
  const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
  progressBar.style.width = `${progress}%`;
}

function loadQuestion() {
  answered = false;
  nextButton.disabled = true;
  feedbackMessage.textContent = '';

  const currentQuestion = quizData[currentQuestionIndex];
  questionText.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

  optionsContainer.innerHTML = '';
  const letters = ['A', 'B', 'C', 'D'];

  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.classList.add('option');
    button.setAttribute('data-index', index);

    button.innerHTML = `
      <span class="option-letter">${letters[index]}</span>
      <span>${option}</span>
    `;

    button.addEventListener('click', () => selectOption(index, button));
    optionsContainer.appendChild(button);
  });

  updateProgress();
}

function selectOption(selectedIndex, selectedButton) {
  if (answered) return;

  answered = true;
  const currentQuestion = quizData[currentQuestionIndex];
  const isCorrect = selectedIndex === currentQuestion.answer;

  const allOptions = document.querySelectorAll('.option');

  allOptions.forEach(btn => {
    btn.classList.add('disabled');
    btn.disabled = true;
  });

  if (isCorrect) {
    selectedButton.classList.add('correct');
    score++;
    feedbackMessage.textContent = '✅ Resposta correta! Você é uma verdadeira boiadeira! 🤠';
  } else {
    selectedButton.classList.add('wrong');
    feedbackMessage.textContent =
      `❌ Resposta incorreta. A resposta certa é: ${currentQuestion.options[currentQuestion.answer]}`;

    allOptions[currentQuestion.answer].classList.add('correct');
  }

  nextButton.disabled = false;
}

function nextQuestion() {
  if (!answered) return;

  currentQuestionIndex++;

  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizArea.classList.add('hidden');
  resultScreen.classList.remove('hidden');

  const totalQuestions = quizData.length;
  scoreText.textContent =
    `Você acertou ${score} de ${totalQuestions} perguntas sobre Ana Castela! 🤠`;

  progressBar.style.width = '100%';
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  answered = false;

  resultScreen.classList.add('hidden');
  quizArea.classList.remove('hidden');

  progressBar.style.width = '0%';
  loadQuestion();
}

// ============ FUNÇÕES DE TEMA ============

function toggleTheme() {
  document.body.classList.toggle('dark-theme');

  const isDark = document.body.classList.contains('dark-theme');

  themeIcon.textContent = isDark ? '☀️' : '🌙';

  try {
    localStorage.setItem(
      'quizAnaCastela-theme',
      isDark ? 'dark' : 'light'
    );
  } catch (e) {
    // localStorage pode não estar disponível
  }
}

function loadSavedTheme() {
  try {
    const savedTheme = localStorage.getItem('quizAnaCastela-theme');

    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
      themeIcon.textContent = '☀️';
    }
  } catch (e) {
    // Ignora erros de localStorage
  }
}

// ============ EVENT LISTENERS ============

nextButton.addEventListener('click', nextQuestion);
restartButton.addEventListener('click', restartQuiz);
themeToggle.addEventListener('click', toggleTheme);

// ============ INICIALIZAÇÃO ============

loadSavedTheme();
loadQuestion();
