// 1. DETECTOR DE SORTEIO SUSPEITO
const signalInputs = document.querySelectorAll('#signalsList input');
const riskScore = document.getElementById('riskScore');
const riskStatus = document.getElementById('riskStatus');

signalInputs.forEach(input => {
  input.addEventListener('change', () => {
    let total = 0;
    signalInputs.forEach(item => {
      if (item.checked) total += Number(item.value);
    });
    total = Math.min(total, 100);
    riskScore.textContent = `${total}%`;

    if (total === 0) {
      riskStatus.textContent = 'Selecione os sinais abaixo';
      riskScore.style.color = '#9CBDF9';
    } else if (total <= 25) {
      riskStatus.textContent = 'Atenção: verifique a fonte oficial';
      riskScore.style.color = '#FACC15';
    } else if (total <= 55) {
      riskStatus.textContent = 'Alto risco de golpe digital';
      riskScore.style.color = '#FB923C';
    } else {
      riskStatus.textContent = 'Golpe confirmado! Não envie dados nem PIX';
      riskScore.style.color = '#F87171';
    }
  });
});

// 2. CHECKLIST DE COMPUTADORES COMPARTILHADOS
const checkInputs = document.querySelectorAll('#sharedChecklist input');
const checkProgress = document.getElementById('checkProgress');

checkInputs.forEach(cb => {
  cb.addEventListener('change', () => {
    const done = document.querySelectorAll('#sharedChecklist input:checked').length;
    checkProgress.textContent = `${done} / ${checkInputs.length} concluídos`;
  });
});

// 3. QUIZ INTERATIVO (5 PERGUNTAS)
const questions = [
  {
    q: '1. Qual é um dos principais sinais de que um sorteio ou rifa nas redes sociais é falso?',
    options: [
      'A promoção está publicada no site institucional oficial da marca.',
      'Exigência de pagamento antecipado via PIX para liberar frete ou prêmio.',
      'Regulamento público com número de autorização oficial.'
    ],
    answer: 1
  },
  {
    q: '2. Na operação policial realizada em Minas Gerais sobre rifas e sorteios falsos, o que foi apreendido?',
    options: [
      'Apenas livros didáticos e materiais de escritório.',
      'Itens de luxo, veículos e eletrônicos adquiridos com valores ilícitos.',
      'Equipamentos hospitalares doados por empresas parceiras.'
    ],
    answer: 1
  },
  {
    q: '3. O que você deve fazer ao receber uma mensagem direta (DM) avisando que ganhou um brinde com link externo?',
    options: [
      'Clicar imediatamente e inserir senha do Instagram e CPF.',
      'Ignorar o link, verificar os canais oficiais da empresa e denunciar o perfil.',
      'Encaminhar o link para todos os contatos para aumentar a chance.'
    ],
    answer: 1
  },
  {
    q: '4. Ao utilizar um computador compartilhado no SENAI ou em uma empresa, qual atitude protege suas contas?',
    options: [
      'Salvar suas senhas no navegador para facilitar o próximo acesso.',
      'Deixar arquivos pessoais salvos na Área de Trabalho.',
      'Não salvar senhas, bloquear a tela ao sair (Win + L) e fazer logout ao terminar.'
    ],
    answer: 2
  },
  {
    q: '5. De acordo com as recomendações de ergonomia (NR-17) e segurança física no posto de trabalho, deve-se:',
    options: [
      'Ajustar cadeira e monitor à altura dos olhos e manter líquidos longe dos equipamentos.',
      'Manter garrafas abertas sobre o gabinete e puxar os cabos ao desligar.',
      'Trabalhar horas seguidas sem pausas e com a tela inclinada.'
    ],
    answer: 0
  }
];

const quizForm = document.getElementById('quizForm');
const submitQuiz = document.getElementById('submitQuiz');
const resetQuiz = document.getElementById('resetQuiz');
const quizResult = document.getElementById('quizResult');

function renderQuiz() {
  quizForm.innerHTML = '';
  questions.forEach((item, qIdx) => {
    const div = document.createElement('div');
    div.className = 'quiz-q';
    div.innerHTML = `<h4>${item.q}</h4><div class="quiz-opts">${item.options
      .map(
        (opt, oIdx) => `
        <label class="quiz-opt" data-q="${qIdx}" data-o="${oIdx}">
          <input type="radio" name="q${qIdx}" value="${oIdx}">
          <span>${opt}</span>
        </label>`
      )
      .join('')}</div>`;
    quizForm.appendChild(div);
  });
  quizResult.textContent = '';
}

submitQuiz.addEventListener('click', () => {
  let score = 0;
  questions.forEach((item, qIdx) => {
    const selected = document.querySelector(`input[name="q${qIdx}"]:checked`);
    const labels = document.querySelectorAll(`.quiz-opt[data-q="${qIdx}"]`);

    labels.forEach(lbl => {
      lbl.classList.remove('correct', 'wrong');
      const optIndex = Number(lbl.dataset.o);
      if (optIndex === item.answer) lbl.classList.add('correct');
    });

    if (selected) {
      const chosen = Number(selected.value);
      if (chosen === item.answer) {
        score++;
      } else {
        labels[chosen].classList.add('wrong');
      }
    }
  });
  quizResult.textContent = `Resultado: você acertou ${score} de ${questions.length} questões!`;
});

resetQuiz.addEventListener('click', renderQuiz);
renderQuiz();