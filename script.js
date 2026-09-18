// Banco de perguntas sobre IA na escola
const quizData = [
  {
    question: "O que significa a sigla 'IA'?",
    options: [
      "Inteligência Analógica",
      "Inteligência Artificial",
      "Interação Automatizada",
      "Informática Aplicada"
    ],
    answer: 1
  },
  {
    question: "Qual ferramenta de IA pode ajudar a criar resumos de textos escolares?",
    options: [
      "ChatGPT",
      "Microsoft Word",
      "Google Maps",
      "Calculadora"
    ],
    answer: 0
  },
  {
    question: "Na escola, a IA pode ser usada para:",
    options: [
      "Substituir completamente os professores",
      "Criar atividades personalizadas para alunos",
      "Impedir o acesso à internet",
      "Corrigir provas sem critério algum"
    ],
    answer: 1
  },
  {
    question: "Qual dessas é uma preocupação ética no uso de IA na educação?",
    options: [
      "A IA deixar os alunos mais inteligentes",
      "A privacidade dos dados dos estudantes",
      "O excesso de lições de casa",
      "A velocidade da internet"
    ],
    answer: 1
  },
  {
    question: "O que é 'aprendizado de máquina' (machine learning)?",
    options: [
      "Um tipo de máquina de escrever moderna",
      "Um ramo da IA que permite sistemas aprenderem com dados",
      "Um jogo educativo",
      "Um método de ensino tradicional"
    ],
    answer: 1
  },
  {
    question: "Como a IA pode auxiliar alunos com dificuldades de aprendizagem?",
    options: [
      "Oferecendo tutoria personalizada e adaptativa",
      "Dando notas mais altas automaticamente",
      "Fazendo a lição por eles",
      "Ignorando suas necessidades"
    ],
    answer: 0
  },
  {
    question: "Qual é um exemplo de IA generativa?",
    options: [
      "DALL-E (gerador de imagens)",
      "Excel",
      "Windows",
      "Google Chrome"
    ],
    answer: 0
  },
  {
    question: "O uso responsável da IA na escola envolve:",
    options: [
      "Copiar respostas da IA sem citar",
      "Usar como ferramenta de apoio, mantendo o pensamento crítico",
      "Deixar a IA tomar todas as decisões",
      "Proibir qualquer tecnologia"
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
    localStorage.setItem('quizIA-theme', isDark ? 'dark' : 'light');
  } catch (e) {
    // localStorage pode não estar disponível
  }
}

function loadSavedTheme() {
  try {
    const savedTheme = localStorage.getItem('quizIA-theme');
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