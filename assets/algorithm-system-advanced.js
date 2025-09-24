// === SISTEMA AVANÇADO DE ALGORITMOS COM EXECUÇÃO PASSO A PASSO ===

class AdvancedAlgorithmSystem {
  constructor() {
    // Estado básico do sistema
    this.arr = [];
    this.original = [];
    this.running = false;
    this.currentAlgorithm = 'bubble';
    this.size = 20;
    
    // Métricas de execução
    this.comparisons = 0;
    this.swaps = 0;
    this.arrayAccesses = 0;
    this.startTime = 0;
    this.endTime = 0;
    
    // NOVO: Sistema de execução passo a passo
    this.stepMode = false;
    this.isPaused = false;
    this.currentStep = 0;
    this.totalSteps = 0;
    this.executionSteps = [];
    this.currentOperation = null;
    this.highlightedIndices = [];
    this.operationDescription = '';
    
    // NOVO: Velocidades ultra-lentas para didática
    this.speedOptions = {
      'ultra-slow': { delay: 5000, name: '🐌 Ultra Lento (5s)', description: 'Ideal para aulas e explicações detalhadas' },
      'very-slow': { delay: 3000, name: '🐢 Muito Lento (3s)', description: 'Perfeito para entender cada operação' },
      'didactic': { delay: 2000, name: '📚 Didático (2s)', description: 'Velocidade ideal para aprendizado' },
      'slow': { delay: 1000, name: '🎯 Lento (1s)', description: 'Bom para acompanhar o raciocínio' },
      'normal': { delay: 500, name: '⚡ Normal (0.5s)', description: 'Velocidade padrão' },
      'fast': { delay: 200, name: '🚀 Rápido (0.2s)', description: 'Para demonstrações rápidas' },
      'instant': { delay: 50, name: '💨 Instantâneo (0.05s)', description: 'Apenas para ver o resultado final' }
    };
    this.currentSpeed = 'didactic';
    
    // NOVO: Sistema de código em execução
    this.codeExecution = {
      currentLine: 0,
      variables: {},
      callStack: [],
      pseudoCode: '',
      realCode: ''
    };
    
    // NOVO: Sistema de explicações em tempo real
    this.realTimeExplanations = {
      enabled: true,
      currentExplanation: '',
      operationReason: '',
      nextOperation: '',
      learningTips: []
    };
    
    // NOVO: Modo professor
    this.professorMode = {
      enabled: false,
      autoNarration: true,
      questionMode: false,
      discussionPoints: [],
      currentQuestion: null
    };
    
    // Canvas e contexto
    this.canvas = null;
    this.ctx = null;
    this.visualizationMode = 'bars';
    
    // Dados completos dos algoritmos
    this.algorithmData = this.initAlgorithmData();
    
    this.init();
  }

  init() {
    this.setupCanvas();
    this.setupControls();
    this.setupStepControls();
    this.setupCodePanel();
    this.setupExplanationPanel();
    this.generateRandomArray();
    this.draw();
  }

  setupCanvas() {
    this.canvas = document.getElementById('algorithmCanvas');
    if (!this.canvas) {
      console.error('Canvas não encontrado!');
      return;
    }
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = 1000;
    this.canvas.height = 400;
  }

  setupControls() {
    // Controles básicos existentes
    const speedSlider = document.getElementById('speedSlider');
    if (speedSlider) {
      speedSlider.addEventListener('input', (e) => {
        const speeds = Object.keys(this.speedOptions);
        const index = Math.floor((e.target.value / 100) * (speeds.length - 1));
        this.currentSpeed = speeds[index];
        this.updateSpeedDisplay();
      });
    }

    // Seletor de algoritmo
    const algorithmSelect = document.getElementById('algorithmSelect');
    if (algorithmSelect) {
      algorithmSelect.addEventListener('change', (e) => {
        this.currentAlgorithm = e.target.value;
        this.updateAlgorithmInfo();
      });
    }

    // Controle de tamanho do array
    const sizeSlider = document.getElementById('sizeSlider');
    if (sizeSlider) {
      sizeSlider.addEventListener('input', (e) => {
        this.size = parseInt(e.target.value);
        this.generateRandomArray();
        this.draw();
      });
    }
  }

  // NOVO: Configuração dos controles step-by-step
  setupStepControls() {
    // Criar painel de controles step-by-step se não existir
    if (!document.getElementById('stepControls')) {
      this.createStepControlsPanel();
    }

    // Botão modo step
    const stepModeBtn = document.getElementById('stepModeBtn');
    if (stepModeBtn) {
      stepModeBtn.addEventListener('click', () => {
        this.toggleStepMode();
      });
    }

    // Controles de execução
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const nextBtn = document.getElementById('nextStepBtn');
    const prevBtn = document.getElementById('prevStepBtn');
    const resetBtn = document.getElementById('resetBtn');

    if (playBtn) playBtn.addEventListener('click', () => this.playExecution());
    if (pauseBtn) pauseBtn.addEventListener('click', () => this.pauseExecution());
    if (nextBtn) nextBtn.addEventListener('click', () => this.nextStep());
    if (prevBtn) prevBtn.addEventListener('click', () => this.previousStep());
    if (resetBtn) resetBtn.addEventListener('click', () => this.resetExecution());
  }

  // NOVO: Criar painel de controles step-by-step
  createStepControlsPanel() {
    const controlsContainer = document.querySelector('.controls-container') || document.body;
    
    const stepControlsHTML = `
      <div id="stepControls" class="step-controls-panel">
        <h3>🎯 Controles Passo a Passo</h3>
        
        <div class="step-mode-toggle">
          <button id="stepModeBtn" class="btn-toggle" title="Ativar/Desativar modo passo a passo">
            🔍 Modo Step-by-Step
          </button>
        </div>

        <div class="execution-controls">
          <button id="playBtn" class="btn-control" title="Executar/Continuar">▶️</button>
          <button id="pauseBtn" class="btn-control" title="Pausar">⏸️</button>
          <button id="nextStepBtn" class="btn-control" title="Próximo passo">⏭️</button>
          <button id="prevStepBtn" class="btn-control" title="Passo anterior">⏮️</button>
          <button id="resetBtn" class="btn-control" title="Reiniciar">🔄</button>
        </div>

        <div class="step-info">
          <div class="current-step">
            <span>Passo: </span>
            <span id="currentStepDisplay">0</span>
            <span> / </span>
            <span id="totalStepsDisplay">0</span>
          </div>
          <div class="step-progress">
            <div class="progress-bar">
              <div id="progressFill" class="progress-fill"></div>
            </div>
          </div>
        </div>

        <div class="speed-control-detailed">
          <label for="speedSelector">🏃 Velocidade de Execução:</label>
          <select id="speedSelector" class="speed-selector">
            <option value="ultra-slow">🐌 Ultra Lento (5s) - Aulas detalhadas</option>
            <option value="very-slow">🐢 Muito Lento (3s) - Cada operação clara</option>
            <option value="didactic" selected>📚 Didático (2s) - Ideal para aprender</option>
            <option value="slow">🎯 Lento (1s) - Acompanhar raciocínio</option>
            <option value="normal">⚡ Normal (0.5s) - Velocidade padrão</option>
            <option value="fast">🚀 Rápido (0.2s) - Demonstração</option>
            <option value="instant">💨 Instantâneo (0.05s) - Resultado final</option>
          </select>
        </div>

        <div class="operation-display">
          <h4>🔍 Operação Atual:</h4>
          <div id="currentOperation" class="current-operation">
            Aguardando início da execução...
          </div>
        </div>
      </div>
    `;

    controlsContainer.insertAdjacentHTML('beforeend', stepControlsHTML);

    // Configurar seletor de velocidade
    const speedSelector = document.getElementById('speedSelector');
    if (speedSelector) {
      speedSelector.addEventListener('change', (e) => {
        this.currentSpeed = e.target.value;
        this.updateSpeedDisplay();
      });
    }
  }

  // NOVO: Configurar painel de código
  setupCodePanel() {
    if (!document.getElementById('codePanel')) {
      this.createCodePanel();
    }
  }

  createCodePanel() {
    const mainContainer = document.querySelector('.main-container') || document.body;
    
    const codePanelHTML = `
      <div id="codePanel" class="code-execution-panel">
        <h3>💻 Código em Execução</h3>
        
        <div class="code-tabs">
          <button class="code-tab active" data-tab="pseudo">Pseudocódigo</button>
          <button class="code-tab" data-tab="javascript">JavaScript</button>
          <button class="code-tab" data-tab="python">Python</button>
          <button class="code-tab" data-tab="c">C/C++</button>
        </div>

        <div class="code-display">
          <div id="pseudoCodeDisplay" class="code-content active">
            <pre id="pseudoCodeLines"></pre>
          </div>
          <div id="javascriptCodeDisplay" class="code-content">
            <pre id="javascriptCodeLines"></pre>
          </div>
          <div id="pythonCodeDisplay" class="code-content">
            <pre id="pythonCodeLines"></pre>
          </div>
          <div id="cCodeDisplay" class="code-content">
            <pre id="cCodeLines"></pre>
          </div>
        </div>

        <div class="variables-display">
          <h4>📊 Variáveis Atuais:</h4>
          <div id="currentVariables" class="variables-container">
            <div class="variable-item">
              <span class="var-name">i:</span>
              <span class="var-value" id="var-i">-</span>
            </div>
            <div class="variable-item">
              <span class="var-name">j:</span>
              <span class="var-value" id="var-j">-</span>
            </div>
            <div class="variable-item">
              <span class="var-name">comparando:</span>
              <span class="var-value" id="var-comparing">-</span>
            </div>
            <div class="variable-item">
              <span class="var-name">trocas:</span>
              <span class="var-value" id="var-swaps">0</span>
            </div>
          </div>
        </div>

        <div class="call-stack">
          <h4>📚 Pilha de Chamadas:</h4>
          <div id="callStackDisplay" class="call-stack-items">
            <div class="stack-item">bubbleSort(array)</div>
          </div>
        </div>
      </div>
    `;

    mainContainer.insertAdjacentHTML('beforeend', codePanelHTML);

    // Configurar tabs do código
    const codeTabs = document.querySelectorAll('.code-tab');
    codeTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        const tabName = e.target.getAttribute('data-tab');
        this.switchCodeTab(tabName);
      });
    });
  }

  // NOVO: Configurar painel de explicações
  setupExplanationPanel() {
    if (!document.getElementById('explanationPanel')) {
      this.createExplanationPanel();
    }
  }

  createExplanationPanel() {
    const mainContainer = document.querySelector('.main-container') || document.body;
    
    const explanationPanelHTML = `
      <div id="explanationPanel" class="explanation-panel">
        <h3>🧠 Explicação em Tempo Real</h3>
        
        <div class="current-explanation">
          <h4>💡 O que está acontecendo agora:</h4>
          <div id="currentExplanation" class="explanation-text">
            Clique em "Iniciar" para começar a explicação passo a passo...
          </div>
        </div>

        <div class="operation-reason">
          <h4>🤔 Por que esta operação:</h4>
          <div id="operationReason" class="reason-text">
            As razões aparecerão aqui durante a execução.
          </div>
        </div>

        <div class="next-operation">
          <h4>🔮 Próxima operação:</h4>
          <div id="nextOperation" class="next-text">
            A próxima operação será mostrada aqui.
          </div>
        </div>

        <div class="learning-tips">
          <h4>💡 Dicas de Aprendizado:</h4>
          <ul id="learningTipsList" class="tips-list">
            <li>Use o modo passo a passo para entender cada operação detalhadamente</li>
            <li>Observe as variáveis mudando em tempo real</li>
            <li>Acompanhe o código sendo executado linha por linha</li>
          </ul>
        </div>

        <div class="professor-mode">
          <h4>👨‍🏫 Modo Professor:</h4>
          <button id="professorModeBtn" class="btn-professor">
            🎓 Ativar Modo Professor
          </button>
          <div id="professorContent" class="professor-content" style="display: none;">
            <div class="discussion-point">
              <h5>🗣️ Ponto de Discussão:</h5>
              <div id="discussionPoint" class="discussion-text">
                Pontos de discussão aparecerão aqui...
              </div>
            </div>
            <div class="interactive-question">
              <h5>❓ Pergunta Interativa:</h5>
              <div id="interactiveQuestion" class="question-text">
                Perguntas aparecerão aqui...
              </div>
              <div class="answer-options">
                <button class="answer-btn" data-answer="a">A) Opção A</button>
                <button class="answer-btn" data-answer="b">B) Opção B</button>
                <button class="answer-btn" data-answer="c">C) Opção C</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    mainContainer.insertAdjacentHTML('beforeend', explanationPanelHTML);

    // Configurar modo professor
    const professorBtn = document.getElementById('professorModeBtn');
    if (professorBtn) {
      professorBtn.addEventListener('click', () => {
        this.toggleProfessorMode();
      });
    }
  }

  // NOVO: Toggle do modo step-by-step
  toggleStepMode() {
    this.stepMode = !this.stepMode;
    const btn = document.getElementById('stepModeBtn');
    const stepControls = document.querySelector('.execution-controls');
    
    if (this.stepMode) {
      btn.textContent = '🔍 Modo Step-by-Step ATIVO';
      btn.classList.add('active');
      if (stepControls) stepControls.style.display = 'flex';
      this.showMessage('🎯 Modo passo a passo ativado! Use os controles para executar passo a passo.', 'success');
    } else {
      btn.textContent = '🔍 Modo Step-by-Step';
      btn.classList.remove('active');
      if (stepControls) stepControls.style.display = 'none';
      this.showMessage('⚡ Modo execução contínua ativado.', 'info');
    }
  }

  // NOVO: Toggle do modo professor
  toggleProfessorMode() {
    this.professorMode.enabled = !this.professorMode.enabled;
    const btn = document.getElementById('professorModeBtn');
    const content = document.getElementById('professorContent');
    
    if (this.professorMode.enabled) {
      btn.textContent = '👨‍🏫 Modo Professor ATIVO';
      btn.classList.add('active');
      if (content) content.style.display = 'block';
      this.showMessage('👨‍🏫 Modo Professor ativado! Explicações detalhadas e perguntas interativas habilitadas.', 'success');
    } else {
      btn.textContent = '🎓 Ativar Modo Professor';
      btn.classList.remove('active');
      if (content) content.style.display = 'none';
      this.showMessage('📚 Modo de estudo normal ativado.', 'info');
    }
  }

  // NOVO: Controles de execução passo a passo
  playExecution() {
    if (this.stepMode && this.executionSteps.length > 0) {
      this.isPaused = false;
      this.continueStepExecution();
    } else {
      this.startSort();
    }
  }

  pauseExecution() {
    this.isPaused = true;
    this.running = false;
    this.showMessage('⏸️ Execução pausada. Use os controles para continuar.', 'info');
  }

  nextStep() {
    if (this.executionSteps.length === 0) {
      this.prepareStepExecution();
    }
    
    if (this.currentStep < this.executionSteps.length) {
      this.executeStep(this.currentStep);
      this.currentStep++;
      this.updateStepDisplay();
    }
  }

  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.executeStep(this.currentStep, true); // true = reverse
      this.updateStepDisplay();
    }
  }

  resetExecution() {
    this.currentStep = 0;
    this.executionSteps = [];
    this.arr = [...this.original];
    this.comparisons = 0;
    this.swaps = 0;
    this.arrayAccesses = 0;
    this.isPaused = false;
    this.running = false;
    this.highlightedIndices = [];
    this.currentOperation = null;
    this.operationDescription = '';
    
    this.updateMetrics();
    this.updateStepDisplay();
    this.updateExplanation('🔄 Sistema reiniciado. Pronto para nova execução.');
    this.draw();
  }

  // NOVO: Preparar execução step-by-step
  prepareStepExecution() {
    this.executionSteps = [];
    this.currentStep = 0;
    this.arr = [...this.original];
    this.comparisons = 0;
    this.swaps = 0;
    
    // Gerar todos os passos do algoritmo
    switch (this.currentAlgorithm) {
      case 'bubble':
        this.generateBubbleSortSteps();
        break;
      case 'selection':
        this.generateSelectionSortSteps();
        break;
      case 'insertion':
        this.generateInsertionSortSteps();
        break;
      case 'merge':
        this.generateMergeSortSteps();
        break;
      case 'quick':
        this.generateQuickSortSteps();
        break;
      case 'heap':
        this.generateHeapSortSteps();
        break;
    }
    
    this.totalSteps = this.executionSteps.length;
    this.updateStepDisplay();
  }

  // NOVO: Gerar passos do Bubble Sort
  generateBubbleSortSteps() {
    const steps = [];
    const arr = [...this.original];
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
      steps.push({
        type: 'loop-start',
        description: `Iniciando passada ${i + 1} de ${n - 1}`,
        explanation: `Esta é a passada número ${i + 1}. Vamos comparar elementos adjacentes e fazer o maior "borbulhar" para o final.`,
        variables: { i, passada: i + 1, total_passadas: n - 1 },
        array: [...arr],
        highlight: [],
        code_line: 1
      });
      
      for (let j = 0; j < n - i - 1; j++) {
        // Comparação
        steps.push({
          type: 'comparison',
          description: `Comparando arr[${j}] = ${arr[j]} com arr[${j + 1}] = ${arr[j + 1]}`,
          explanation: `Estamos comparando ${arr[j]} com ${arr[j + 1]}. ${arr[j] > arr[j + 1] ? 'Como ' + arr[j] + ' > ' + arr[j + 1] + ', precisamos trocar.' : 'Como ' + arr[j] + ' ≤ ' + arr[j + 1] + ', não precisamos trocar.'}`,
          reason: `Comparamos elementos adjacentes para determinar se estão na ordem correta.`,
          next: `${arr[j] > arr[j + 1] ? 'Vamos trocar os elementos.' : 'Vamos para a próxima comparação.'}`,
          variables: { i, j, comparando: `${arr[j]} vs ${arr[j + 1]}` },
          array: [...arr],
          highlight: [j, j + 1],
          code_line: 2
        });
        
        if (arr[j] > arr[j + 1]) {
          // Troca
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          steps.push({
            type: 'swap',
            description: `Trocando arr[${j}] e arr[${j + 1}]`,
            explanation: `Trocamos ${arr[j + 1]} e ${arr[j]} de posição porque estavam fora de ordem.`,
            reason: `Movemos o elemento maior para a direita para manter a ordenação crescente.`,
            next: `Continuamos com a próxima comparação.`,
            variables: { i, j, trocou: true },
            array: [...arr],
            highlight: [j, j + 1],
            code_line: 3
          });
        }
      }
      
      steps.push({
        type: 'loop-end',
        description: `Fim da passada ${i + 1}: elemento ${arr[n - i - 1]} está na posição correta`,
        explanation: `A passada ${i + 1} foi concluída. O elemento ${arr[n - i - 1]} agora está em sua posição final correta.`,
        variables: { i, elemento_fixo: arr[n - i - 1], posicao: n - i - 1 },
        array: [...arr],
        highlight: [n - i - 1],
        code_line: 4
      });
    }
    
    this.executionSteps = steps;
  }

  // NOVO: Executar um passo específico
  executeStep(stepIndex, reverse = false) {
    if (stepIndex < 0 || stepIndex >= this.executionSteps.length) return;
    
    const step = this.executionSteps[stepIndex];
    
    // Atualizar array e destacar elementos
    this.arr = [...step.array];
    this.highlightedIndices = step.highlight || [];
    this.currentOperation = step;
    this.operationDescription = step.description;
    
    // Atualizar variáveis
    if (step.variables) {
      this.codeExecution.variables = step.variables;
      this.updateVariablesDisplay();
    }
    
    // Atualizar linha de código atual
    if (step.code_line) {
      this.codeExecution.currentLine = step.code_line;
      this.highlightCodeLine(step.code_line);
    }
    
    // Atualizar explicações
    this.updateExplanation(step.explanation);
    if (step.reason) {
      this.updateOperationReason(step.reason);
    }
    if (step.next) {
      this.updateNextOperation(step.next);
    }
    
    // Atualizar métricas
    if (step.type === 'comparison') {
      this.comparisons++;
    } else if (step.type === 'swap') {
      this.swaps++;
    }
    
    this.updateMetrics();
    this.draw();
  }

  // Métodos auxiliares para atualização de interface
  updateStepDisplay() {
    const currentStepEl = document.getElementById('currentStepDisplay');
    const totalStepsEl = document.getElementById('totalStepsDisplay');
    const progressFill = document.getElementById('progressFill');
    const currentOperationEl = document.getElementById('currentOperation');
    
    if (currentStepEl) currentStepEl.textContent = this.currentStep;
    if (totalStepsEl) totalStepsEl.textContent = this.totalSteps;
    if (currentOperationEl) currentOperationEl.textContent = this.operationDescription || 'Aguardando...';
    
    if (progressFill && this.totalSteps > 0) {
      const progress = (this.currentStep / this.totalSteps) * 100;
      progressFill.style.width = `${progress}%`;
    }
  }

  updateExplanation(text) {
    const explanationEl = document.getElementById('currentExplanation');
    if (explanationEl) {
      explanationEl.innerHTML = text;
    }
  }

  updateOperationReason(text) {
    const reasonEl = document.getElementById('operationReason');
    if (reasonEl) {
      reasonEl.innerHTML = text;
    }
  }

  updateNextOperation(text) {
    const nextEl = document.getElementById('nextOperation');
    if (nextEl) {
      nextEl.innerHTML = text;
    }
  }

  updateVariablesDisplay() {
    const variables = this.codeExecution.variables;
    
    Object.keys(variables).forEach(varName => {
      const varEl = document.getElementById(`var-${varName}`);
      if (varEl) {
        varEl.textContent = variables[varName];
      }
    });
    
    // Atualizar swaps
    const swapsEl = document.getElementById('var-swaps');
    if (swapsEl) {
      swapsEl.textContent = this.swaps;
    }
  }

  highlightCodeLine(lineNumber) {
    // Remove highlight anterior
    const prevHighlighted = document.querySelector('.code-line-highlight');
    if (prevHighlighted) {
      prevHighlighted.classList.remove('code-line-highlight');
    }
    
    // Adiciona novo highlight
    const codeLines = document.querySelectorAll('.code-content.active pre');
    if (codeLines.length > 0) {
      const lines = codeLines[0].textContent.split('\n');
      if (lineNumber <= lines.length) {
        // Recrear o código com highlight na linha atual
        const highlightedCode = lines.map((line, index) => {
          if (index + 1 === lineNumber) {
            return `<span class="code-line-highlight">${line}</span>`;
          }
          return line;
        }).join('\n');
        
        codeLines[0].innerHTML = highlightedCode;
      }
    }
  }

  switchCodeTab(tabName) {
    // Desativar todas as tabs
    document.querySelectorAll('.code-tab').forEach(tab => {
      tab.classList.remove('active');
    });
    document.querySelectorAll('.code-content').forEach(content => {
      content.classList.remove('active');
    });
    
    // Ativar tab selecionada
    const selectedTab = document.querySelector(`[data-tab="${tabName}"]`);
    const selectedContent = document.getElementById(`${tabName}CodeDisplay`);
    
    if (selectedTab) selectedTab.classList.add('active');
    if (selectedContent) selectedContent.classList.add('active');
    
    // Atualizar código exibido
    this.updateCodeDisplay(tabName);
  }

  updateCodeDisplay(language = 'pseudo') {
    const codeMap = {
      pseudo: this.getPseudoCode(),
      javascript: this.getJavaScriptCode(),
      python: this.getPythonCode(),
      c: this.getCCode()
    };
    
    const codeElement = document.getElementById(`${language}CodeLines`);
    if (codeElement && codeMap[language]) {
      codeElement.textContent = codeMap[language];
    }
  }

  getPseudoCode() {
    const pseudoCodes = {
      bubble: `
1. PARA i = 0 ATÉ n-2 FAÇA
2.   PARA j = 0 ATÉ n-i-2 FAÇA
3.     SE arr[j] > arr[j+1] ENTÃO
4.       TROQUE arr[j] COM arr[j+1]
5.     FIM SE
6.   FIM PARA
7. FIM PARA`,
      
      selection: `
1. PARA i = 0 ATÉ n-2 FAÇA
2.   min_idx = i
3.   PARA j = i+1 ATÉ n-1 FAÇA
4.     SE arr[j] < arr[min_idx] ENTÃO
5.       min_idx = j
6.     FIM SE
7.   FIM PARA
8.   TROQUE arr[i] COM arr[min_idx]
9. FIM PARA`,
      
      insertion: `
1. PARA i = 1 ATÉ n-1 FAÇA
2.   key = arr[i]
3.   j = i - 1
4.   ENQUANTO j >= 0 E arr[j] > key FAÇA
5.     arr[j+1] = arr[j]
6.     j = j - 1
7.   FIM ENQUANTO
8.   arr[j+1] = key
9. FIM PARA`
    };
    
    return pseudoCodes[this.currentAlgorithm] || pseudoCodes.bubble;
  }

  getJavaScriptCode() {
    const jsCodes = {
      bubble: `
function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
      
      selection: `
function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}`
    };
    
    return jsCodes[this.currentAlgorithm] || jsCodes.bubble;
  }

  getPythonCode() {
    const pythonCodes = {
      bubble: `
def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`,
      
      selection: `
def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`
    };
    
    return pythonCodes[this.currentAlgorithm] || pythonCodes.bubble;
  }

  getCCode() {
    const cCodes = {
      bubble: `
void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`,
      
      selection: `
void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx])
                min_idx = j;
        }
        int temp = arr[min_idx];
        arr[min_idx] = arr[i];
        arr[i] = temp;
    }
}`
    };
    
    return cCodes[this.currentAlgorithm] || cCodes.bubble;
  }

  // Continuar execução step-by-step automática
  async continueStepExecution() {
    if (this.isPaused || !this.stepMode) return;
    
    while (this.currentStep < this.totalSteps && !this.isPaused) {
      this.executeStep(this.currentStep);
      this.currentStep++;
      this.updateStepDisplay();
      
      const delay = this.speedOptions[this.currentSpeed].delay;
      await this.sleep(delay);
    }
    
    if (this.currentStep >= this.totalSteps) {
      this.showMessage('✅ Execução concluída! Array ordenado com sucesso.', 'success');
    }
  }

  // Métodos básicos de ordenação e visualização (adaptados dos existentes)
  generateRandomArray() {
    this.arr = [];
    for (let i = 0; i < this.size; i++) {
      this.arr.push(Math.floor(Math.random() * 90) + 10);
    }
    this.original = [...this.arr];
    this.resetCounters();
  }

  resetCounters() {
    this.comparisons = 0;
    this.swaps = 0;
    this.arrayAccesses = 0;
    this.updateMetrics();
  }

  updateMetrics() {
    const elements = {
      comparisons: document.getElementById('comparisons'),
      swaps: document.getElementById('swaps'),
      arrayAccesses: document.getElementById('arrayAccesses')
    };

    if (elements.comparisons) elements.comparisons.textContent = this.comparisons;
    if (elements.swaps) elements.swaps.textContent = this.swaps;
    if (elements.arrayAccesses) elements.arrayAccesses.textContent = this.arrayAccesses;
  }

  updateSpeedDisplay() {
    const speedInfo = this.speedOptions[this.currentSpeed];
    const speedDisplay = document.getElementById('speedDisplay');
    if (speedDisplay) {
      speedDisplay.innerHTML = `
        <strong>${speedInfo.name}</strong><br>
        <small>${speedInfo.description}</small>
      `;
    }
  }

  draw() {
    if (!this.ctx) return;
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    const barWidth = this.canvas.width / this.arr.length;
    const maxHeight = this.canvas.height - 100;
    const maxVal = Math.max(...this.arr);
    
    this.arr.forEach((value, index) => {
      const barHeight = (value / maxVal) * maxHeight;
      const x = index * barWidth;
      const y = this.canvas.height - barHeight - 50;
      
      // Determinar cor da barra
      let color = '#3b82f6'; // azul padrão
      
      if (this.highlightedIndices.includes(index)) {
        if (this.currentOperation?.type === 'comparison') {
          color = '#f59e0b'; // amarelo para comparação
        } else if (this.currentOperation?.type === 'swap') {
          color = '#ef4444'; // vermelho para troca
        } else {
          color = '#10b981'; // verde para destaque
        }
      }
      
      // Desenhar barra
      this.ctx.fillStyle = color;
      this.ctx.fillRect(x + 2, y, barWidth - 4, barHeight);
      
      // Desenhar valor
      this.ctx.fillStyle = '#1f2937';
      this.ctx.font = '12px Inter';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(value, x + barWidth/2, y - 5);
      
      // Desenhar índice
      this.ctx.fillStyle = '#6b7280';
      this.ctx.font = '10px Inter';
      this.ctx.fillText(index, x + barWidth/2, this.canvas.height - 30);
    });
    
    // Desenhar operação atual
    if (this.operationDescription) {
      this.ctx.fillStyle = '#1f2937';
      this.ctx.font = 'bold 14px Inter';
      this.ctx.textAlign = 'left';
      this.ctx.fillText(this.operationDescription, 10, 20);
    }
  }

  showMessage(text, type = 'info') {
    // Implementar sistema de mensagens toast
    console.log(`[${type.toUpperCase()}] ${text}`);
    
    // Criar toast se não existir
    let toast = document.getElementById('toast-message');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-message';
      toast.className = 'toast-message';
      document.body.appendChild(toast);
    }
    
    toast.className = `toast-message toast-${type} show`;
    toast.textContent = text;
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  startSort() {
    if (!this.stepMode) {
      // Execução normal contínua
      this.running = true;
      this.resetCounters();
      this.arr = [...this.original];
      
      switch (this.currentAlgorithm) {
        case 'bubble':
          this.animatedBubbleSort();
          break;
        // ... outros algoritmos
      }
    } else {
      // Modo step-by-step
      this.prepareStepExecution();
      this.continueStepExecution();
    }
  }

  async animatedBubbleSort() {
    const n = this.arr.length;
    
    for (let i = 0; i < n - 1 && this.running; i++) {
      for (let j = 0; j < n - i - 1 && this.running; j++) {
        this.highlightedIndices = [j, j + 1];
        this.comparisons++;
        this.updateMetrics();
        this.draw();
        
        await this.sleep(this.speedOptions[this.currentSpeed].delay);
        
        if (this.arr[j] > this.arr[j + 1]) {
          [this.arr[j], this.arr[j + 1]] = [this.arr[j + 1], this.arr[j]];
          this.swaps++;
          this.updateMetrics();
          this.draw();
          
          await this.sleep(this.speedOptions[this.currentSpeed].delay);
        }
      }
    }
    
    this.highlightedIndices = [];
    this.running = false;
    this.draw();
  }

  // Inicialização dos dados dos algoritmos
  initAlgorithmData() {
    return {
      bubble: {
        name: 'Bubble Sort',
        description: 'Algoritmo de ordenação por bolhas',
        timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
        spaceComplexity: 'O(1)',
        stable: true
      },
      selection: {
        name: 'Selection Sort',
        description: 'Algoritmo de ordenação por seleção',
        timeComplexity: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
        spaceComplexity: 'O(1)',
        stable: false
      },
      insertion: {
        name: 'Insertion Sort',
        description: 'Algoritmo de ordenação por inserção',
        timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
        spaceComplexity: 'O(1)',
        stable: true
      }
    };
  }
}

// Inicializar sistema quando DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  window.algorithmSystem = new AdvancedAlgorithmSystem();
});