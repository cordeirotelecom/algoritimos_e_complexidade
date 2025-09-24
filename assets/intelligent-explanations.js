// === SISTEMA DE EXPLICAÇÕES INTELIGENTES E MODO PROFESSOR ===

class IntelligentExplanationSystem {
  constructor(algorithmSystem) {
    this.algorithmSystem = algorithmSystem;
    this.explanations = this.initExplanations();
    this.professorQuestions = this.initProfessorQuestions();
    this.currentContext = null;
    this.learningProgress = {
      conceptsExplained: new Set(),
      questionsAnswered: 0,
      correctAnswers: 0,
      difficultConcepts: new Set()
    };
  }

  // Inicializar explicações detalhadas para cada algoritmo
  initExplanations() {
    return {
      bubble: {
        algorithm_start: {
          title: "🚀 Iniciando Bubble Sort",
          explanation: "Vamos começar o algoritmo Bubble Sort! Este algoritmo funciona comparando elementos adjacentes (vizinhos) e trocando-os se estiverem na ordem errada.",
          why: "Escolhemos comparar elementos adjacentes porque isso garante que os elementos maiores 'borbulhem' gradualmente para suas posições corretas.",
          analogy: "É como bolhas de ar subindo na água - as maiores sobem primeiro!"
        },
        
        loop_start: {
          title: "🔄 Nova Passada Começando",
          explanation: "Estamos iniciando uma nova passada pelo array. Em cada passada, garantimos que pelo menos um elemento chegue à sua posição final.",
          why: "Cada passada é necessária porque precisamos dar oportunidade para todos os elementos 'borbulharem' até suas posições corretas.",
          progress_tip: "Após cada passada completa, um elemento a mais estará definitivamente em sua posição correta!"
        },
        
        comparison: {
          title: "🔍 Comparando Elementos",
          explanation: "Estamos comparando dois elementos adjacentes para decidir se eles estão na ordem correta.",
          why: "Comparamos elementos adjacentes porque só podemos trocar elementos que estão lado a lado neste algoritmo.",
          decision_help: (a, b) => `Como ${a} ${a > b ? '>' : '≤'} ${b}, ${a > b ? 'PRECISAMOS trocar' : 'NÃO precisamos trocar'} os elementos.`
        },
        
        swap: {
          title: "🔄 Realizando Troca",
          explanation: "Encontramos dois elementos fora de ordem! Vamos trocá-los de posição.",
          why: "Trocamos porque o elemento da esquerda é maior que o da direita, e queremos ordem crescente.",
          effect: "Esta troca aproxima ambos os elementos de suas posições finais corretas."
        },
        
        no_swap: {
          title: "✅ Elementos em Ordem",
          explanation: "Estes dois elementos já estão na ordem correta, então não precisamos trocar.",
          why: "Não trocamos porque o elemento da esquerda já é menor ou igual ao da direita.",
          progress: "Continuamos para a próxima comparação..."
        },
        
        loop_end: {
          title: "🏁 Passada Completa",
          explanation: "Terminamos uma passada completa! O maior elemento desta passada agora está em sua posição final.",
          achievement: "Garantimos que pelo menos um elemento está definitivamente na posição correta.",
          next: "Na próxima passada, podemos ignorar os elementos já posicionados no final."
        },
        
        algorithm_complete: {
          title: "🎉 Algoritmo Concluído!",
          explanation: "Parabéns! O Bubble Sort terminou e o array está completamente ordenado.",
          summary: "Cada elemento passou por várias comparações até chegar à sua posição correta.",
          reflection: "Observe como os elementos maiores 'borbulharam' para o final a cada passada."
        }
      },

      selection: {
        algorithm_start: {
          title: "🎯 Iniciando Selection Sort",
          explanation: "Vamos começar o Selection Sort! Este algoritmo funciona encontrando o menor elemento e colocando-o na primeira posição disponível.",
          why: "Selecionamos sempre o menor elemento porque isso garante que construímos a parte ordenada elemento por elemento.",
          strategy: "Em cada iteração, expandimos a parte ordenada em um elemento."
        },
        
        find_minimum: {
          title: "🔍 Procurando o Menor",
          explanation: "Estamos procurando o menor elemento na parte ainda não ordenada do array.",
          why: "Precisamos do menor elemento porque ele será o próximo a ser colocado em sua posição final.",
          method: "Vamos examinar todos os elementos restantes para encontrar o menor."
        },
        
        new_minimum: {
          title: "📍 Novo Menor Encontrado!",
          explanation: "Encontramos um elemento menor que o atual mínimo. Vamos atualizar nossa referência.",
          why: "Atualizamos porque precisamos sempre saber qual é o menor elemento encontrado até agora.",
          tracking: "Continuamos procurando para garantir que encontramos o menor absoluto."
        },
        
        minimum_confirmed: {
          title: "✅ Menor Elemento Confirmado",
          explanation: "Terminamos de procurar e confirmamos qual é o menor elemento desta parte do array.",
          achievement: "Agora sabemos exatamente qual elemento deve ir para a próxima posição.",
          next: "Vamos colocar este elemento em sua posição correta."
        },
        
        swap_minimum: {
          title: "🔄 Posicionando o Menor",
          explanation: "Vamos trocar o menor elemento encontrado com o elemento na primeira posição não ordenada.",
          why: "Esta troca coloca o menor elemento em sua posição final correta.",
          progress: "A parte ordenada do array cresce em um elemento."
        }
      }
    };
  }

  // Inicializar perguntas do modo professor
  initProfessorQuestions() {
    return {
      bubble: [
        {
          timing: 'before_start',
          question: "Antes de começarmos, você consegue prever qual elemento chegará ao final primeiro no Bubble Sort?",
          options: [
            "O menor elemento",
            "O maior elemento", 
            "Um elemento do meio",
            "Não é possível prever"
          ],
          correct: 1,
          explanation: "Correto! No Bubble Sort, o maior elemento sempre 'borbulha' para o final primeiro, porque ele vence todas as comparações ao longo do caminho."
        },
        
        {
          timing: 'first_swap',
          question: "Por que estamos trocando esses dois elementos especificamente?",
          options: [
            "Porque são os maiores do array",
            "Porque estão fora de ordem (esquerdo > direito)",
            "Porque são elementos adjacentes",
            "Para deixar o algoritmo mais rápido"
          ],
          correct: 1,
          explanation: "Exato! Trocamos porque o elemento da esquerda é maior que o da direita, violando nossa regra de ordem crescente."
        },
        
        {
          timing: 'first_pass_complete',
          question: "O que podemos garantir após completar a primeira passada?",
          options: [
            "O array está completamente ordenado",
            "O menor elemento está na primeira posição",
            "O maior elemento está na última posição",
            "Metade do array está ordenada"
          ],
          correct: 2,
          explanation: "Correto! Após cada passada completa do Bubble Sort, garantimos que o maior elemento da passada está em sua posição final."
        }
      ],
      
      selection: [
        {
          timing: 'before_start',
          question: "Qual é a estratégia principal do Selection Sort?",
          options: [
            "Trocar elementos adjacentes",
            "Selecionar o menor e colocar na posição correta",
            "Dividir o array em partes menores",
            "Inserir elementos um por vez"
          ],
          correct: 1,
          explanation: "Perfeito! O Selection Sort funciona selecionando repetidamente o menor elemento da parte não ordenada e colocando-o na próxima posição."
        },
        
        {
          timing: 'finding_minimum',
          question: "Por que precisamos examinar TODOS os elementos restantes para encontrar o mínimo?",
          options: [
            "Para deixar o algoritmo mais lento",
            "Porque não sabemos onde está o menor até verificar todos",
            "Para fazer mais comparações",
            "Porque o menor sempre está no final"
          ],
          correct: 1,
          explanation: "Exatamente! Não temos como saber qual é o menor elemento sem examinar todos os candidatos restantes."
        }
      ]
    };
  }

  // Gerar explicação baseada no contexto atual
  generateContextualExplanation(stepData) {
    const algorithm = this.algorithmSystem.currentAlgorithm;
    const stepType = stepData.type;
    const explanations = this.explanations[algorithm];
    
    if (!explanations || !explanations[stepType]) {
      return this.generateGenericExplanation(stepData);
    }

    const explanation = explanations[stepType];
    let result = {
      title: explanation.title,
      main: explanation.explanation,
      reason: explanation.why || '',
      next: explanation.next || '',
      tips: []
    };

    // Personalizar baseado nos dados específicos do passo
    if (stepType === 'comparison' && explanation.decision_help) {
      result.reason = explanation.decision_help(stepData.values[0], stepData.values[1]);
    }

    // Adicionar dicas baseadas no progresso
    result.tips = this.generateProgressTips(stepData);

    // Marcar conceito como explicado
    this.learningProgress.conceptsExplained.add(stepType);

    return result;
  }

  // Gerar explicação genérica para casos não cobertos
  generateGenericExplanation(stepData) {
    return {
      title: `🔍 ${this.capitalizeFirst(stepData.type.replace('_', ' '))}`,
      main: `Estamos executando uma operação de ${stepData.type} no algoritmo.`,
      reason: 'Esta operação é necessária para o funcionamento correto do algoritmo.',
      next: 'Continuaremos com o próximo passo da execução.',
      tips: ['Acompanhe as mudanças no array', 'Observe os elementos sendo destacados']
    };
  }

  // Gerar dicas baseadas no progresso do aprendizado
  generateProgressTips(stepData) {
    const tips = [];
    const algorithm = this.algorithmSystem.currentAlgorithm;
    
    // Dicas específicas por algoritmo
    if (algorithm === 'bubble') {
      if (stepData.type === 'comparison') {
        tips.push('💡 Lembre-se: comparamos apenas elementos adjacentes no Bubble Sort');
        
        if (this.algorithmSystem.comparisons > 5) {
          tips.push('🎯 Observe como os elementos maiores se movem em direção ao final');
        }
      }
      
      if (stepData.type === 'swap') {
        tips.push('🔄 Cada troca aproxima os elementos de suas posições corretas');
        
        if (this.algorithmSystem.swaps > 3) {
          tips.push('📊 Muitas trocas indicam que o array estava bem desorganizado');
        }
      }
    }

    if (algorithm === 'selection') {
      if (stepData.type === 'find_minimum') {
        tips.push('🎯 Estamos construindo a parte ordenada elemento por elemento');
      }
      
      if (stepData.type === 'swap_minimum') {
        tips.push('✅ Mais um elemento em sua posição final definitiva');
      }
    }

    // Dicas gerais baseadas no progresso
    if (this.algorithmSystem.comparisons > 0 && this.algorithmSystem.swaps === 0) {
      tips.push('🤔 Interessante: várias comparações, mas nenhuma troca ainda!');
    }

    if (this.algorithmSystem.swaps > this.algorithmSystem.comparisons * 0.5) {
      tips.push('📈 Este array precisou de muitas trocas - estava bem desorganizado');
    }

    return tips;
  }

  // Verificar se deve mostrar pergunta do professor
  shouldShowProfessorQuestion(stepData) {
    if (!this.algorithmSystem.professorMode.enabled) return null;

    const algorithm = this.algorithmSystem.currentAlgorithm;
    const questions = this.professorQuestions[algorithm] || [];
    
    // Encontrar pergunta apropriada para o momento atual
    return questions.find(q => {
      switch (q.timing) {
        case 'before_start':
          return this.algorithmSystem.currentStep === 0;
        case 'first_swap':
          return stepData.type === 'swap' && this.algorithmSystem.swaps === 1;
        case 'first_pass_complete':
          return stepData.type === 'loop_end' && stepData.pass === 1;
        case 'finding_minimum':
          return stepData.type === 'find_minimum' && this.algorithmSystem.currentStep < 10;
        default:
          return false;
      }
    });
  }

  // Processar resposta do professor
  processProfessorAnswer(questionId, selectedAnswer) {
    // Encontrar a pergunta
    const algorithm = this.algorithmSystem.currentAlgorithm;
    const questions = this.professorQuestions[algorithm] || [];
    const question = questions.find(q => q.id === questionId);
    
    if (!question) return;

    this.learningProgress.questionsAnswered++;
    
    const isCorrect = selectedAnswer === question.correct;
    if (isCorrect) {
      this.learningProgress.correctAnswers++;
    } else {
      this.learningProgress.difficultConcepts.add(question.concept || 'general');
    }

    // Mostrar feedback
    this.showQuestionFeedback(question, selectedAnswer, isCorrect);
    
    // Gerar relatório de progresso
    this.updateLearningProgress();
  }

  // Mostrar feedback da pergunta
  showQuestionFeedback(question, selectedAnswer, isCorrect) {
    const feedbackEl = document.getElementById('questionFeedback');
    if (!feedbackEl) return;

    feedbackEl.innerHTML = `
      <div class="feedback ${isCorrect ? 'correct' : 'incorrect'}">
        <h4>${isCorrect ? '✅ Correto!' : '❌ Não é bem assim...'}</h4>
        <p><strong>Sua resposta:</strong> ${question.options[selectedAnswer]}</p>
        <p><strong>Explicação:</strong> ${question.explanation}</p>
        ${!isCorrect ? `<p><strong>Resposta correta:</strong> ${question.options[question.correct]}</p>` : ''}
      </div>
    `;
    
    feedbackEl.style.display = 'block';
    
    // Esconder após alguns segundos
    setTimeout(() => {
      feedbackEl.style.display = 'none';
    }, 8000);
  }

  // Atualizar progresso de aprendizado
  updateLearningProgress() {
    const progressEl = document.getElementById('learningProgress');
    if (!progressEl) return;

    const accuracy = this.learningProgress.questionsAnswered > 0 
      ? (this.learningProgress.correctAnswers / this.learningProgress.questionsAnswered * 100).toFixed(1)
      : 0;

    progressEl.innerHTML = `
      <div class="progress-stats">
        <div class="stat-item">
          <span class="stat-number">${this.learningProgress.conceptsExplained.size}</span>
          <span class="stat-label">Conceitos Explicados</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">${this.learningProgress.questionsAnswered}</span>
          <span class="stat-label">Perguntas Respondidas</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">${accuracy}%</span>
          <span class="stat-label">Precisão</span>
        </div>
      </div>
    `;
  }

  // Gerar discussão em pontos específicos
  generateDiscussionPoint(stepData) {
    const algorithm = this.algorithmSystem.currentAlgorithm;
    const discussionPoints = {
      bubble: {
        first_comparison: "🤔 Discussão: Por que você acha que começamos comparando do início do array? Seria possível começar do final?",
        many_swaps: "💭 Reflexão: Este array precisou de muitas trocas. O que isso nos diz sobre o estado inicial dos dados?",
        no_swaps_pass: "✨ Observação: Uma passada sem trocas! O que isso significa para o algoritmo?"
      },
      selection: {
        first_selection: "🎯 Discussão: Por que é importante sempre encontrar o menor elemento, mesmo que demore mais?",
        minimum_search: "🔍 Reflexão: Estamos examinando muitos elementos para achar o mínimo. Existe uma forma mais eficiente?"
      }
    };

    const points = discussionPoints[algorithm] || {};
    
    // Determinar qual ponto de discussão mostrar
    if (stepData.type === 'comparison' && this.algorithmSystem.comparisons === 1) {
      return points.first_comparison;
    }
    
    if (stepData.type === 'swap' && this.algorithmSystem.swaps > 5) {
      return points.many_swaps;
    }

    if (stepData.type === 'find_minimum' && this.algorithmSystem.comparisons === 1) {
      return points.first_selection;
    }

    return null;
  }

  // Utilitários
  capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Integrar com o sistema principal de algoritmos
  integrate() {
    // Conectar com eventos do sistema principal
    if (window.algorithmSystem) {
      const originalExecuteStep = window.algorithmSystem.executeStep.bind(window.algorithmSystem);
      
      window.algorithmSystem.executeStep = (stepIndex, reverse = false) => {
        // Executar passo original
        originalExecuteStep(stepIndex, reverse);
        
        // Gerar explicações inteligentes
        if (!reverse && window.algorithmSystem.executionSteps[stepIndex]) {
          const stepData = window.algorithmSystem.executionSteps[stepIndex];
          this.processStep(stepData);
        }
      };
    }
  }

  // Processar cada passo com explicações inteligentes
  processStep(stepData) {
    // Gerar explicação contextual
    const explanation = this.generateContextualExplanation(stepData);
    this.displayExplanation(explanation);
    
    // Verificar se deve mostrar pergunta do professor
    const question = this.shouldShowProfessorQuestion(stepData);
    if (question) {
      this.displayProfessorQuestion(question);
    }
    
    // Gerar ponto de discussão se aplicável
    const discussion = this.generateDiscussionPoint(stepData);
    if (discussion) {
      this.displayDiscussionPoint(discussion);
    }
  }

  // Exibir explicação na interface
  displayExplanation(explanation) {
    const titleEl = document.getElementById('explanationTitle');
    const mainEl = document.getElementById('currentExplanation');
    const reasonEl = document.getElementById('operationReason');
    const nextEl = document.getElementById('nextOperation');
    const tipsEl = document.getElementById('learningTipsList');

    if (titleEl) titleEl.textContent = explanation.title;
    if (mainEl) mainEl.innerHTML = explanation.main;
    if (reasonEl) reasonEl.innerHTML = explanation.reason;
    if (nextEl) nextEl.innerHTML = explanation.next;
    
    if (tipsEl && explanation.tips.length > 0) {
      tipsEl.innerHTML = explanation.tips.map(tip => `<li>${tip}</li>`).join('');
    }
  }

  // Exibir pergunta do professor
  displayProfessorQuestion(question) {
    const questionEl = document.getElementById('interactiveQuestion');
    const optionsEl = document.querySelector('.answer-options');
    
    if (!questionEl || !optionsEl) return;

    questionEl.innerHTML = question.question;
    
    optionsEl.innerHTML = question.options.map((option, index) => `
      <button class="answer-btn" data-answer="${index}" onclick="window.explanationSystem.processProfessorAnswer('${question.id}', ${index})">
        ${String.fromCharCode(65 + index)}) ${option}
      </button>
    `).join('');
  }

  // Exibir ponto de discussão
  displayDiscussionPoint(discussion) {
    const discussionEl = document.getElementById('discussionPoint');
    if (discussionEl) {
      discussionEl.innerHTML = discussion;
    }
  }
}

// Sistema de anotações e replay
class AnnotationReplaySystem {
  constructor(algorithmSystem) {
    this.algorithmSystem = algorithmSystem;
    this.annotations = new Map();
    this.bookmarks = [];
    this.replayData = null;
    this.currentReplayStep = 0;
  }

  // Adicionar anotação em um passo específico
  addAnnotation(stepIndex, text, type = 'note') {
    const annotation = {
      id: Date.now(),
      stepIndex,
      text,
      type,
      timestamp: new Date(),
      author: 'user'
    };

    if (!this.annotations.has(stepIndex)) {
      this.annotations.set(stepIndex, []);
    }
    
    this.annotations.get(stepIndex).push(annotation);
    this.saveAnnotations();
    this.displayAnnotations(stepIndex);
  }

  // Adicionar marcador
  addBookmark(stepIndex, label) {
    const bookmark = {
      id: Date.now(),
      stepIndex,
      label,
      timestamp: new Date()
    };
    
    this.bookmarks.push(bookmark);
    this.saveBookmarks();
    this.updateBookmarksList();
  }

  // Salvar dados de replay
  saveReplayData() {
    this.replayData = {
      algorithm: this.algorithmSystem.currentAlgorithm,
      originalArray: [...this.algorithmSystem.original],
      steps: [...this.algorithmSystem.executionSteps],
      annotations: Object.fromEntries(this.annotations),
      bookmarks: [...this.bookmarks],
      metrics: {
        comparisons: this.algorithmSystem.comparisons,
        swaps: this.algorithmSystem.swaps,
        arrayAccesses: this.algorithmSystem.arrayAccesses
      },
      timestamp: new Date()
    };
    
    localStorage.setItem('algorithm_replay_data', JSON.stringify(this.replayData));
  }

  // Carregar dados de replay
  loadReplayData() {
    const saved = localStorage.getItem('algorithm_replay_data');
    if (saved) {
      this.replayData = JSON.parse(saved);
      this.annotations = new Map(Object.entries(this.replayData.annotations || {}));
      this.bookmarks = this.replayData.bookmarks || [];
      return true;
    }
    return false;
  }

  // Persistência local
  saveAnnotations() {
    const annotationsObj = Object.fromEntries(this.annotations);
    localStorage.setItem('algorithm_annotations', JSON.stringify(annotationsObj));
  }

  saveBookmarks() {
    localStorage.setItem('algorithm_bookmarks', JSON.stringify(this.bookmarks));
  }
}

// Integração global
document.addEventListener('DOMContentLoaded', () => {
  if (window.algorithmSystem) {
    // Criar sistema de explicações inteligentes
    window.explanationSystem = new IntelligentExplanationSystem(window.algorithmSystem);
    window.explanationSystem.integrate();
    
    // Criar sistema de anotações
    window.annotationSystem = new AnnotationReplaySystem(window.algorithmSystem);
    
    console.log('✅ Sistemas de explicações inteligentes e anotações inicializados');
  }
});