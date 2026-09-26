// Banco de perguntas sobre o Holocausto
const quizData = [
  {
    question: "O que foi o Holocausto?",
    options: [
      "Uma guerra entre países europeus no século XIX",
      "O genocídio sistemático de judeus e outros grupos pelo regime nazista",
      "Um tratado de paz assinado após a Primeira Guerra Mundial",
      "Um movimento artístico do início do século XX"
    ],
    answer: 1
  },
  {
    question: "Em qual período histórico ocorreu o Holocausto?",
    options: [
      "Durante a Primeira Guerra Mundial (1914-1918)",
      "Durante a Segunda Guerra Mundial (1939-1945)",
      "Durante a Guerra Fria (1947-1991)",
      "Durante a Revolução Industrial (século XVIII)"
    ],
    answer: 1
  },
  {
    question: "Qual regime político foi responsável pelo Holocausto?",
    options: [
      "O regime comunista soviético",
      "O regime nazista liderado por Adolf Hitler",
      "O regime monárquico britânico",
      "O regime fascista italiano"
    ],
    answer: 1
  },
  {
    question: "Além dos judeus, quais outros grupos foram perseguidos pelos nazistas?",
    options: [
      "Apenas militares inimigos",
      "Ciganos, homossexuais, pessoas com deficiência, eslavos e opositores políticos",
      "Somente estrangeiros ricos",
      "Apenas membros de partidos comunistas"
    ],
    answer: 1
  },
  {
    question: "O que eram os guetos criados pelos nazistas?",
    options: [
      "Campos de férias para crianças alemãs",
      "Áreas isoladas onde judeus eram forçados a viver em condições precárias",
      "Bairros luxuosos para oficiais nazistas",
      "Escolas especiais para jovens alemães"
    ],
    answer: 1
  },
  {
    question: "Qual foi o papel dos campos de concentração e extermínio?",
    options: [
      "Serviam apenas como prisões para criminosos comuns",
      "Eram locais de trabalho voluntário",
      "Foram usados para aprisionar, explorar e assassinar milhões de pessoas",
      "Eram hospitais militares para soldados feridos"
    ],
    answer: 2
  },
  {
    question: "O que foi o 'Dia Internacional em Memória das Vítimas do Holocausto', lembrado em 27 de janeiro?",
    options: [
      "A data em que Hitler chegou ao poder",
      "A data da libertação do campo de Auschwitz-Birkenau",
      "A data do fim da Segunda Guerra Mundial",
      "A data da fundação da ONU"
    ],
    answer: 1
  },
  {
    question: "Por que é importante estudar e lembrar o Holocausto nos dias de hoje?",
    options: [
      "Para culpar os descendentes dos nazistas",
      "Para evitar que o preconceito, o ódio e a intolerância se repitam",
      "Apenas para cumprir uma exigência escolar",
      "Para justificar novos conflitos entre nações"
    ],
    answer: 1
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
    feedbackMessage.textContent = '✅ Resposta correta! Muito bem!';
  } else {
    selectedButton.classList.add('wrong');
    feedbackMessage.textContent = `❌ Resposta incorreta. A resposta certa é: ${currentQuestion.options[currentQuestion.answer]}`;
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
  scoreText.textContent = `Você acertou ${score} de ${totalQuestions} perguntas!`;

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
  
  // Atualizar ícone
  themeIcon.textContent = isDark ? '☀️' : '🌙';
  
  // Salvar preferência
  try {
    localStorage.setItem('quizHolocausto-theme', isDark ? 'dark' : 'light');
  } catch (e) {
    // localStorage pode não estar disponível
  }
}

function loadSavedTheme() {
  try {
    const savedTheme = localStorage.getItem('quizHolocausto-theme');
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
