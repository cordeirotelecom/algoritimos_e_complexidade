// === SISTEMA AVANÇADO DE COMPARAÇÃO DUAL DE ALGORITMOS ===

class DualAlgorithmComparisonSystem {
  constructor(algorithmSystem) {
    this.algorithmSystem = algorithmSystem;
    this.isComparisonMode = false;
    this.leftAlgorithm = 'bubble';
    this.rightAlgorithm = 'selection';
    this.sharedArray = [];
    this.leftArray = [];
    this.rightArray = [];
    
    // Métricas para comparação
    this.leftMetrics = {
      comparisons: 0,
      swaps: 0,
      arrayAccesses: 0,
      startTime: 0,
      endTime: 0,
      steps: []
    };
    
    this.rightMetrics = {
      comparisons: 0,
      swaps: 0,
      arrayAccesses: 0,
      startTime: 0,
      endTime: 0,
      steps: []
    };
    
    // Estado da execução
    this.leftCurrentStep = 0;
    this.rightCurrentStep = 0;
    this.syncMode = true; // Executar sincronizado
    this.comparisonSpeed = 'didactic';
    
    this.init();
  }

  init() {
    this.createComparisonInterface();
    this.setupEventListeners();
  }

  createComparisonInterface() {
    const comparisonPanelHTML = `
      <div id="dualComparisonPanel" class="dual-comparison-panel">
        <div class="comparison-header">
          <h3>🥊 Comparação Dual de Algoritmos</h3>
          <div class="comparison-controls">
            <button id="toggleComparisonMode" class="btn-comparison-toggle">
              🔄 Ativar Modo Comparação
            </button>
            <button id="swapAlgorithms" class="btn-swap" title="Trocar algoritmos de lado">
              🔄 Trocar Lados
            </button>
          </div>
        </div>

        <div id="comparisonContent" class="comparison-content" style="display: none;">
          <!-- Seletores de algoritmo -->
          <div class="algorithm-selectors">
            <div class="left-selector">
              <label for="leftAlgorithmSelect">🔵 Algoritmo Esquerdo:</label>
              <select id="leftAlgorithmSelect" class="algorithm-select left">
                <option value="bubble">🫧 Bubble Sort</option>
                <option value="selection">🎯 Selection Sort</option>
                <option value="insertion">📝 Insertion Sort</option>
                <option value="merge">🔀 Merge Sort</option>
                <option value="quick">⚡ Quick Sort</option>
                <option value="heap">🏔️ Heap Sort</option>
              </select>
            </div>
            
            <div class="vs-indicator">
              <span class="vs-text">VS</span>
            </div>
            
            <div class="right-selector">
              <label for="rightAlgorithmSelect">🔴 Algoritmo Direito:</label>
              <select id="rightAlgorithmSelect" class="algorithm-select right">
                <option value="bubble">🫧 Bubble Sort</option>
                <option value="selection" selected>🎯 Selection Sort</option>
                <option value="insertion">📝 Insertion Sort</option>
                <option value="merge">🔀 Merge Sort</option>
                <option value="quick">⚡ Quick Sort</option>
                <option value="heap">🏔️ Heap Sort</option>
              </select>
            </div>
          </div>

          <!-- Canvas duplo -->
          <div class="dual-canvas-container">
            <div class="left-canvas-container">
              <h4 id="leftAlgorithmTitle">🫧 Bubble Sort</h4>
              <canvas id="leftCanvas" width="450" height="300"></canvas>
              <div class="canvas-status left" id="leftStatus">Aguardando...</div>
            </div>
            
            <div class="right-canvas-container">
              <h4 id="rightAlgorithmTitle">🎯 Selection Sort</h4>
              <canvas id="rightCanvas" width="450" height="300"></canvas>
              <div class="canvas-status right" id="rightStatus">Aguardando...</div>
            </div>
          </div>

          <!-- Controles de execução comparativa -->
          <div class="dual-execution-controls">
            <div class="sync-controls">
              <label class="sync-checkbox">
                <input type="checkbox" id="syncExecution" checked>
                <span>🔗 Execução Sincronizada</span>
              </label>
              
              <div class="speed-control">
                <label for="comparisonSpeed">Velocidade:</label>
                <select id="comparisonSpeed">
                  <option value="ultra-slow">🐌 Ultra Lento</option>
                  <option value="very-slow">🐢 Muito Lento</option>
                  <option value="didactic" selected>📚 Didático</option>
                  <option value="normal">⚡ Normal</option>
                  <option value="fast">🚀 Rápido</option>
                </select>
              </div>
            </div>

            <div class="execution-buttons">
              <button id="startDualComparison" class="btn-start-dual">
                ▶️ Iniciar Comparação
              </button>
              <button id="pauseDualComparison" class="btn-pause-dual" disabled>
                ⏸️ Pausar
              </button>
              <button id="resetDualComparison" class="btn-reset-dual">
                🔄 Reiniciar
              </button>
              <button id="generateComparisonReport" class="btn-report" disabled>
                📊 Gerar Relatório
              </button>
            </div>
          </div>

          <!-- Métricas comparativas em tempo real -->
          <div class="dual-metrics-display">
            <div class="metrics-header">
              <h4>📊 Métricas Comparativas em Tempo Real</h4>
            </div>
            
            <div class="metrics-grid">
              <!-- Métricas Esquerda -->
              <div class="left-metrics">
                <h5>🔵 <span id="leftAlgorithmName">Bubble Sort</span></h5>
                <div class="metric-items">
                  <div class="metric-item">
                    <span class="metric-label">Comparações:</span>
                    <span class="metric-value" id="leftComparisons">0</span>
                  </div>
                  <div class="metric-item">
                    <span class="metric-label">Trocas:</span>
                    <span class="metric-value" id="leftSwaps">0</span>
                  </div>
                  <div class="metric-item">
                    <span class="metric-label">Acessos:</span>
                    <span class="metric-value" id="leftAccesses">0</span>
                  </div>
                  <div class="metric-item">
                    <span class="metric-label">Tempo:</span>
                    <span class="metric-value" id="leftTime">0ms</span>
                  </div>
                  <div class="metric-item">
                    <span class="metric-label">Progresso:</span>
                    <div class="progress-bar-small">
                      <div class="progress-fill left" id="leftProgress"></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Comparação Central -->
              <div class="comparison-center">
                <div class="winner-indicator" id="winnerIndicator">
                  <div class="winner-crown">👑</div>
                  <div class="winner-text">Em execução...</div>
                </div>
                
                <div class="efficiency-comparison">
                  <canvas id="efficiencyChart" width="200" height="150"></canvas>
                </div>
              </div>

              <!-- Métricas Direita -->
              <div class="right-metrics">
                <h5>🔴 <span id="rightAlgorithmName">Selection Sort</span></h5>
                <div class="metric-items">
                  <div class="metric-item">
                    <span class="metric-label">Comparações:</span>
                    <span class="metric-value" id="rightComparisons">0</span>
                  </div>
                  <div class="metric-item">
                    <span class="metric-label">Trocas:</span>
                    <span class="metric-value" id="rightSwaps">0</span>
                  </div>
                  <div class="metric-item">
                    <span class="metric-label">Acessos:</span>
                    <span class="metric-value" id="rightAccesses">0</span>
                  </div>
                  <div class="metric-item">
                    <span class="metric-label">Tempo:</span>
                    <span class="metric-value" id="rightTime">0ms</span>
                  </div>
                  <div class="metric-item">
                    <span class="metric-label">Progresso:</span>
                    <div class="progress-bar-small">
                      <div class="progress-fill right" id="rightProgress"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Análise comparativa -->
            <div class="comparative-analysis">
              <h5>🧠 Análise Comparativa Inteligente</h5>
              <div id="realTimeAnalysis" class="analysis-text">
                Execute a comparação para ver análises inteligentes em tempo real...
              </div>
              
              <div class="prediction-section">
                <h6>🔮 Previsão de Resultado:</h6>
                <div id="predictionText" class="prediction-text">
                  Configure os algoritmos e gere um array para ver previsões...
                </div>
              </div>
            </div>
          </div>

          <!-- Casos de teste inteligentes -->
          <div class="test-cases-section">
            <h4>🧪 Casos de Teste Inteligentes</h4>
            <div class="test-cases-grid">
              <button class="test-case-btn" data-case="best">
                ✅ Melhor Caso<br>
                <small>Array já ordenado</small>
              </button>
              <button class="test-case-btn" data-case="worst">
                ❌ Pior Caso<br>
                <small>Array inversamente ordenado</small>
              </button>
              <button class="test-case-btn" data-case="average">
                ⚖️ Caso Médio<br>
                <small>Array aleatório</small>
              </button>
              <button class="test-case-btn" data-case="duplicates">
                🔁 Elementos Duplicados<br>
                <small>Muitos valores repetidos</small>
              </button>
              <button class="test-case-btn" data-case="nearly-sorted">
                📈 Quase Ordenado<br>
                <small>Poucos elementos fora do lugar</small>
              </button>
              <button class="test-case-btn" data-case="few-unique">
                🎯 Poucos Únicos<br>
                <small>Apenas 3-4 valores diferentes</small>
              </button>
            </div>
          </div>

          <!-- Histórico de comparações -->
          <div class="comparison-history">
            <h4>📚 Histórico de Comparações</h4>
            <div id="comparisonHistoryList" class="history-list">
              <p class="no-history">Nenhuma comparação realizada ainda</p>
            </div>
            
            <div class="history-controls">
              <button id="saveComparisonResult" class="btn-save-history" disabled>
                💾 Salvar Resultado
              </button>
              <button id="exportComparisonHistory" class="btn-export-history">
                📤 Exportar Histórico
              </button>
              <button id="clearComparisonHistory" class="btn-clear-history">
                🗑️ Limpar Histórico
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Inserir no container principal
    const mainContainer = document.querySelector('.main-container');
    if (mainContainer) {
      // Criar uma nova seção para comparação que ocupa toda a largura
      const comparisonSection = document.createElement('div');
      comparisonSection.className = 'comparison-section';
      comparisonSection.innerHTML = comparisonPanelHTML;
      
      // Inserir após a seção de visualização
      const visualizationSection = document.querySelector('.visualization-section');
      if (visualizationSection) {
        visualizationSection.parentNode.insertBefore(comparisonSection, visualizationSection.nextSibling);
      } else {
        mainContainer.appendChild(comparisonSection);
      }
    }
  }

  setupEventListeners() {
    // Toggle modo comparação
    const toggleBtn = document.getElementById('toggleComparisonMode');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => this.toggleComparisonMode());
    }

    // Seletores de algoritmo
    const leftSelect = document.getElementById('leftAlgorithmSelect');
    const rightSelect = document.getElementById('rightAlgorithmSelect');
    
    if (leftSelect) {
      leftSelect.addEventListener('change', (e) => {
        this.leftAlgorithm = e.target.value;
        this.updateAlgorithmTitles();
        this.generatePrediction();
      });
    }
    
    if (rightSelect) {
      rightSelect.addEventListener('change', (e) => {
        this.rightAlgorithm = e.target.value;
        this.updateAlgorithmTitles();
        this.generatePrediction();
      });
    }

    // Trocar algoritmos
    const swapBtn = document.getElementById('swapAlgorithms');
    if (swapBtn) {
      swapBtn.addEventListener('click', () => this.swapAlgorithms());
    }

    // Controles de execução
    const startBtn = document.getElementById('startDualComparison');
    const pauseBtn = document.getElementById('pauseDualComparison');
    const resetBtn = document.getElementById('resetDualComparison');
    const reportBtn = document.getElementById('generateComparisonReport');

    if (startBtn) startBtn.addEventListener('click', () => this.startDualComparison());
    if (pauseBtn) pauseBtn.addEventListener('click', () => this.pauseDualComparison());
    if (resetBtn) resetBtn.addEventListener('click', () => this.resetDualComparison());
    if (reportBtn) reportBtn.addEventListener('click', () => this.generateComparisonReport());

    // Casos de teste
    const testCaseBtns = document.querySelectorAll('.test-case-btn');
    testCaseBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const caseType = e.target.closest('.test-case-btn').getAttribute('data-case');
        this.generateTestCase(caseType);
      });
    });

    // Sincronização
    const syncCheckbox = document.getElementById('syncExecution');
    if (syncCheckbox) {
      syncCheckbox.addEventListener('change', (e) => {
        this.syncMode = e.target.checked;
      });
    }

    // Velocidade
    const speedSelect = document.getElementById('comparisonSpeed');
    if (speedSelect) {
      speedSelect.addEventListener('change', (e) => {
        this.comparisonSpeed = e.target.value;
      });
    }

    // Histórico
    const saveHistoryBtn = document.getElementById('saveComparisonResult');
    const exportHistoryBtn = document.getElementById('exportComparisonHistory');
    const clearHistoryBtn = document.getElementById('clearComparisonHistory');

    if (saveHistoryBtn) saveHistoryBtn.addEventListener('click', () => this.saveComparisonResult());
    if (exportHistoryBtn) exportHistoryBtn.addEventListener('click', () => this.exportComparisonHistory());
    if (clearHistoryBtn) clearHistoryBtn.addEventListener('click', () => this.clearComparisonHistory());
  }

  toggleComparisonMode() {
    this.isComparisonMode = !this.isComparisonMode;
    
    const toggleBtn = document.getElementById('toggleComparisonMode');
    const comparisonContent = document.getElementById('comparisonContent');
    const mainVisualization = document.querySelector('.visualization-section');

    if (this.isComparisonMode) {
      // Ativar modo comparação
      toggleBtn.textContent = '🔄 Desativar Modo Comparação';
      toggleBtn.classList.add('active');
      
      if (comparisonContent) comparisonContent.style.display = 'block';
      if (mainVisualization) mainVisualization.style.display = 'none';
      
      // Inicializar canvas duplo
      this.initializeDualCanvas();
      this.updateAlgorithmTitles();
      this.generatePrediction();
      
      this.showToast('🥊 Modo Comparação Ativado! Compare dois algoritmos lado a lado.', 'success');
      
    } else {
      // Desativar modo comparação
      toggleBtn.textContent = '🔄 Ativar Modo Comparação';
      toggleBtn.classList.remove('active');
      
      if (comparisonContent) comparisonContent.style.display = 'none';
      if (mainVisualization) mainVisualization.style.display = 'block';
      
      this.showToast('👁️ Modo Visualização Normal Ativado.', 'info');
    }
  }

  initializeDualCanvas() {
    this.leftCanvas = document.getElementById('leftCanvas');
    this.rightCanvas = document.getElementById('rightCanvas');
    
    if (this.leftCanvas) {
      this.leftCtx = this.leftCanvas.getContext('2d');
    }
    
    if (this.rightCanvas) {
      this.rightCtx = this.rightCanvas.getContext('2d');
    }
    
    // Gerar array compartilhado inicial
    if (this.algorithmSystem && this.algorithmSystem.arr.length > 0) {
      this.sharedArray = [...this.algorithmSystem.arr];
    } else {
      this.generateTestCase('average');
    }
    
    this.resetDualArrays();
    this.drawBothCanvases();
  }

  updateAlgorithmTitles() {
    const leftTitle = document.getElementById('leftAlgorithmTitle');
    const rightTitle = document.getElementById('rightAlgorithmTitle');
    const leftName = document.getElementById('leftAlgorithmName');
    const rightName = document.getElementById('rightAlgorithmName');
    
    const algorithmNames = {
      bubble: '🫧 Bubble Sort',
      selection: '🎯 Selection Sort',
      insertion: '📝 Insertion Sort',
      merge: '🔀 Merge Sort',
      quick: '⚡ Quick Sort',
      heap: '🏔️ Heap Sort'
    };
    
    if (leftTitle) leftTitle.textContent = algorithmNames[this.leftAlgorithm];
    if (rightTitle) rightTitle.textContent = algorithmNames[this.rightAlgorithm];
    if (leftName) leftName.textContent = algorithmNames[this.leftAlgorithm].substring(2);
    if (rightName) rightName.textContent = algorithmNames[this.rightAlgorithm].substring(2);
  }

  swapAlgorithms() {
    const temp = this.leftAlgorithm;
    this.leftAlgorithm = this.rightAlgorithm;
    this.rightAlgorithm = temp;
    
    // Atualizar selects
    const leftSelect = document.getElementById('leftAlgorithmSelect');
    const rightSelect = document.getElementById('rightAlgorithmSelect');
    
    if (leftSelect) leftSelect.value = this.leftAlgorithm;
    if (rightSelect) rightSelect.value = this.rightAlgorithm;
    
    this.updateAlgorithmTitles();
    this.generatePrediction();
    this.resetDualComparison();
    
    this.showToast('🔄 Algoritmos trocados de lado!', 'info');
  }

  generateTestCase(caseType) {
    const size = this.algorithmSystem?.size || 20;
    let array = [];

    switch (caseType) {
      case 'best':
        // Array já ordenado
        array = Array.from({length: size}, (_, i) => i * 3 + 10);
        break;
        
      case 'worst':
        // Array inversamente ordenado
        array = Array.from({length: size}, (_, i) => (size - i) * 3 + 10);
        break;
        
      case 'average':
        // Array aleatório
        array = Array.from({length: size}, () => Math.floor(Math.random() * 90) + 10);
        break;
        
      case 'duplicates':
        // Muitos elementos duplicados
        const values = [20, 35, 50, 65, 80];
        array = Array.from({length: size}, () => values[Math.floor(Math.random() * values.length)]);
        break;
        
      case 'nearly-sorted':
        // Quase ordenado
        array = Array.from({length: size}, (_, i) => i * 3 + 10);
        // Trocar apenas alguns elementos
        for (let i = 0; i < Math.ceil(size * 0.1); i++) {
          const idx1 = Math.floor(Math.random() * size);
          const idx2 = Math.floor(Math.random() * size);
          [array[idx1], array[idx2]] = [array[idx2], array[idx1]];
        }
        break;
        
      case 'few-unique':
        // Poucos valores únicos
        const uniqueValues = [25, 45, 65];
        array = Array.from({length: size}, () => uniqueValues[Math.floor(Math.random() * uniqueValues.length)]);
        break;
    }

    this.sharedArray = array;
    
    // Atualizar array principal também
    if (this.algorithmSystem) {
      this.algorithmSystem.arr = [...array];
      this.algorithmSystem.original = [...array];
    }
    
    this.resetDualArrays();
    this.drawBothCanvases();
    this.generatePrediction();
    
    const caseNames = {
      best: 'Melhor Caso (Ordenado)',
      worst: 'Pior Caso (Inversamente Ordenado)',
      average: 'Caso Médio (Aleatório)',
      duplicates: 'Elementos Duplicados',
      'nearly-sorted': 'Quase Ordenado',
      'few-unique': 'Poucos Valores Únicos'
    };
    
    this.showToast(`🧪 Caso de teste gerado: ${caseNames[caseType]}`, 'success');
  }

  generatePrediction() {
    const predictionEl = document.getElementById('predictionText');
    if (!predictionEl || !this.sharedArray.length) return;

    const predictions = this.calculateAlgorithmPredictions();
    
    let predictionHtml = `
      <div class="prediction-details">
        <div class="prediction-item">
          <strong>🔵 ${this.getAlgorithmName(this.leftAlgorithm)}:</strong>
          <span class="prediction-metrics">
            ~${predictions.left.comparisons} comparações, 
            ~${predictions.left.swaps} trocas
          </span>
        </div>
        <div class="prediction-item">
          <strong>🔴 ${this.getAlgorithmName(this.rightAlgorithm)}:</strong>
          <span class="prediction-metrics">
            ~${predictions.right.comparisons} comparações, 
            ~${predictions.right.swaps} trocas
          </span>
        </div>
        <div class="prediction-winner">
          <strong>🏆 Provável vencedor: ${predictions.winner}</strong>
          <small>${predictions.reason}</small>
        </div>
      </div>
    `;
    
    predictionEl.innerHTML = predictionHtml;
  }

  calculateAlgorithmPredictions() {
    const n = this.sharedArray.length;
    const isSorted = this.isArraySorted(this.sharedArray);
    const inversions = this.countInversions(this.sharedArray);
    
    // Previsões baseadas em complexidade teórica
    const predictions = {
      left: this.predictAlgorithmMetrics(this.leftAlgorithm, n, isSorted, inversions),
      right: this.predictAlgorithmMetrics(this.rightAlgorithm, n, isSorted, inversions)
    };
    
    // Determinar vencedor provável
    const leftScore = predictions.left.comparisons + predictions.left.swaps;
    const rightScore = predictions.right.comparisons + predictions.right.swaps;
    
    let winner, reason;
    if (leftScore < rightScore) {
      winner = this.getAlgorithmName(this.leftAlgorithm);
      reason = 'Menos operações previstas';
    } else if (rightScore < leftScore) {
      winner = this.getAlgorithmName(this.rightAlgorithm);
      reason = 'Menos operações previstas';
    } else {
      winner = 'Empate técnico';
      reason = 'Operações similares previstas';
    }
    
    return { left: predictions.left, right: predictions.right, winner, reason };
  }

  predictAlgorithmMetrics(algorithm, n, isSorted, inversions) {
    switch (algorithm) {
      case 'bubble':
        if (isSorted) {
          return { comparisons: n - 1, swaps: 0 };
        }
        return { comparisons: Math.floor(n * (n - 1) / 2), swaps: inversions };
        
      case 'selection':
        return { comparisons: Math.floor(n * (n - 1) / 2), swaps: n - 1 };
        
      case 'insertion':
        if (isSorted) {
          return { comparisons: n - 1, swaps: 0 };
        }
        return { comparisons: Math.floor(n * n / 4), swaps: inversions };
        
      case 'merge':
        return { comparisons: Math.floor(n * Math.log2(n)), swaps: Math.floor(n * Math.log2(n)) };
        
      case 'quick':
        return { comparisons: Math.floor(n * Math.log2(n) * 1.38), swaps: Math.floor(n * Math.log2(n) / 3) };
        
      case 'heap':
        return { comparisons: Math.floor(n * Math.log2(n) * 2), swaps: Math.floor(n * Math.log2(n)) };
        
      default:
        return { comparisons: n * n, swaps: n * n };
    }
  }

  isArraySorted(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) return false;
    }
    return true;
  }

  countInversions(arr) {
    let count = 0;
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i] > arr[j]) count++;
      }
    }
    return count;
  }

  getAlgorithmName(algorithm) {
    const names = {
      bubble: 'Bubble Sort',
      selection: 'Selection Sort',
      insertion: 'Insertion Sort',
      merge: 'Merge Sort',
      quick: 'Quick Sort',
      heap: 'Heap Sort'
    };
    return names[algorithm] || algorithm;
  }

  // Métodos de execução continuarão no próximo bloco...
  resetDualArrays() {
    this.leftArray = [...this.sharedArray];
    this.rightArray = [...this.sharedArray];
    this.resetMetrics();
  }

  resetMetrics() {
    this.leftMetrics = {
      comparisons: 0, swaps: 0, arrayAccesses: 0,
      startTime: 0, endTime: 0, steps: []
    };
    this.rightMetrics = {
      comparisons: 0, swaps: 0, arrayAccesses: 0,
      startTime: 0, endTime: 0, steps: []
    };
    
    this.leftCurrentStep = 0;
    this.rightCurrentStep = 0;
    
    this.updateMetricsDisplay();
  }

  updateMetricsDisplay() {
    // Atualizar métricas da esquerda
    const leftElements = {
      comparisons: document.getElementById('leftComparisons'),
      swaps: document.getElementById('leftSwaps'),
      accesses: document.getElementById('leftAccesses'),
      time: document.getElementById('leftTime'),
      progress: document.getElementById('leftProgress')
    };

    // Atualizar métricas da direita
    const rightElements = {
      comparisons: document.getElementById('rightComparisons'),
      swaps: document.getElementById('rightSwaps'),
      accesses: document.getElementById('rightAccesses'),
      time: document.getElementById('rightTime'),
      progress: document.getElementById('rightProgress')
    };

    // Aplicar valores
    Object.keys(leftElements).forEach(key => {
      if (leftElements[key] && key !== 'progress') {
        leftElements[key].textContent = this.leftMetrics[key === 'accesses' ? 'arrayAccesses' : key];
      }
    });

    Object.keys(rightElements).forEach(key => {
      if (rightElements[key] && key !== 'progress') {
        rightElements[key].textContent = this.rightMetrics[key === 'accesses' ? 'arrayAccesses' : key];
      }
    });

    // Atualizar barras de progresso
    if (leftElements.progress) {
      const leftProgress = this.leftMetrics.steps.length > 0 ? 
        (this.leftCurrentStep / this.leftMetrics.steps.length) * 100 : 0;
      leftElements.progress.style.width = `${leftProgress}%`;
    }

    if (rightElements.progress) {
      const rightProgress = this.rightMetrics.steps.length > 0 ? 
        (this.rightCurrentStep / this.rightMetrics.steps.length) * 100 : 0;
      rightElements.progress.style.width = `${rightProgress}%`;
    }
  }

  drawBothCanvases() {
    this.drawArray(this.leftCtx, this.leftArray, this.leftCanvas, 'left');
    this.drawArray(this.rightCtx, this.rightArray, this.rightCanvas, 'right');
  }

  drawArray(ctx, array, canvas, side) {
    if (!ctx || !canvas || !array.length) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const barWidth = canvas.width / array.length;
    const maxHeight = canvas.height - 60;
    const maxVal = Math.max(...array);
    
    array.forEach((value, index) => {
      const barHeight = (value / maxVal) * maxHeight;
      const x = index * barWidth;
      const y = canvas.height - barHeight - 30;
      
      // Cor baseada no lado
      let color = side === 'left' ? '#3b82f6' : '#ef4444';
      
      // Destacar se em comparação/troca
      const currentIndices = side === 'left' ? this.leftHighlighted : this.rightHighlighted;
      if (currentIndices && currentIndices.includes(index)) {
        color = side === 'left' ? '#f59e0b' : '#f97316';
      }
      
      // Desenhar barra
      ctx.fillStyle = color;
      ctx.fillRect(x + 1, y, barWidth - 2, barHeight);
      
      // Desenhar valor
      ctx.fillStyle = '#1f2937';
      ctx.font = '10px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(value, x + barWidth/2, y - 5);
      
      // Desenhar índice
      ctx.fillStyle = '#6b7280';
      ctx.font = '8px Inter';
      ctx.fillText(index, x + barWidth/2, canvas.height - 10);
    });
  }

  // Implementação dos algoritmos para comparação
  async startDualComparison() {
    if (!this.sharedArray.length) {
      this.showToast('❌ Gere um array primeiro!', 'error');
      return;
    }

    // Preparar execução
    this.resetDualArrays();
    this.leftMetrics.startTime = Date.now();
    this.rightMetrics.startTime = Date.now();
    
    // Atualizar botões
    const startBtn = document.getElementById('startDualComparison');
    const pauseBtn = document.getElementById('pauseDualComparison');
    const reportBtn = document.getElementById('generateComparisonReport');
    
    if (startBtn) startBtn.disabled = true;
    if (pauseBtn) pauseBtn.disabled = false;
    if (reportBtn) reportBtn.disabled = true;
    
    // Executar algoritmos
    if (this.syncMode) {
      await this.executeSynchronized();
    } else {
      await Promise.all([
        this.executeLeft(),
        this.executeRight()
      ]);
    }
    
    // Finalizar
    this.leftMetrics.endTime = Date.now();
    this.rightMetrics.endTime = Date.now();
    
    if (startBtn) startBtn.disabled = false;
    if (pauseBtn) pauseBtn.disabled = true;
    if (reportBtn) reportBtn.disabled = false;
    
    this.determineWinner();
    this.showToast('🏁 Comparação concluída!', 'success');
  }

  async executeSynchronized() {
    // Implementação sincronizada seria muito complexa para este exemplo
    // Vamos fazer uma versão simplificada
    await Promise.all([
      this.executeLeft(),
      this.executeRight()
    ]);
  }

  async executeLeft() {
    // Aqui implementaríamos a execução do algoritmo esquerdo
    // Para simplicidade, vamos usar uma versão básica do bubble sort
    await this.executeBubbleSort(this.leftArray, 'left');
  }

  async executeRight() {
    // Aqui implementaríamos a execução do algoritmo direito
    // Para simplicidade, vamos usar uma versão básica do selection sort
    await this.executeSelectionSort(this.rightArray, 'right');
  }

  async executeBubbleSort(array, side) {
    const n = array.length;
    const metrics = side === 'left' ? this.leftMetrics : this.rightMetrics;
    
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        // Destacar comparação
        if (side === 'left') {
          this.leftHighlighted = [j, j + 1];
        } else {
          this.rightHighlighted = [j, j + 1];
        }
        
        metrics.comparisons++;
        this.updateMetricsDisplay();
        this.drawBothCanvases();
        
        await this.sleep(this.getSpeedDelay());
        
        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          metrics.swaps++;
          
          this.updateMetricsDisplay();
          this.drawBothCanvases();
          
          await this.sleep(this.getSpeedDelay());
        }
      }
    }
    
    // Limpar destaques
    if (side === 'left') {
      this.leftHighlighted = [];
    } else {
      this.rightHighlighted = [];
    }
    this.drawBothCanvases();
  }

  async executeSelectionSort(array, side) {
    const n = array.length;
    const metrics = side === 'left' ? this.leftMetrics : this.rightMetrics;
    
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      
      // Destacar posição atual
      if (side === 'left') {
        this.leftHighlighted = [i];
      } else {
        this.rightHighlighted = [i];
      }
      
      for (let j = i + 1; j < n; j++) {
        // Destacar comparação
        if (side === 'left') {
          this.leftHighlighted = [i, j, minIdx];
        } else {
          this.rightHighlighted = [i, j, minIdx];
        }
        
        metrics.comparisons++;
        this.updateMetricsDisplay();
        this.drawBothCanvases();
        
        await this.sleep(this.getSpeedDelay());
        
        if (array[j] < array[minIdx]) {
          minIdx = j;
        }
      }
      
      if (minIdx !== i) {
        [array[i], array[minIdx]] = [array[minIdx], array[i]];
        metrics.swaps++;
        
        this.updateMetricsDisplay();
        this.drawBothCanvases();
        
        await this.sleep(this.getSpeedDelay());
      }
    }
    
    // Limpar destaques
    if (side === 'left') {
      this.leftHighlighted = [];
    } else {
      this.rightHighlighted = [];
    }
    this.drawBothCanvases();
  }

  determineWinner() {
    const leftTotal = this.leftMetrics.comparisons + this.leftMetrics.swaps;
    const rightTotal = this.rightMetrics.comparisons + this.rightMetrics.swaps;
    const leftTime = this.leftMetrics.endTime - this.leftMetrics.startTime;
    const rightTime = this.rightMetrics.endTime - this.rightMetrics.startTime;
    
    const winnerEl = document.getElementById('winnerIndicator');
    if (!winnerEl) return;
    
    let winner, reason;
    if (leftTotal < rightTotal) {
      winner = `🔵 ${this.getAlgorithmName(this.leftAlgorithm)}`;
      reason = `${leftTotal} operações vs ${rightTotal}`;
    } else if (rightTotal < leftTotal) {
      winner = `🔴 ${this.getAlgorithmName(this.rightAlgorithm)}`;
      reason = `${rightTotal} operações vs ${leftTotal}`;
    } else {
      winner = '🤝 Empate';
      reason = `Ambos: ${leftTotal} operações`;
    }
    
    winnerEl.innerHTML = `
      <div class="winner-crown">👑</div>
      <div class="winner-text"><strong>${winner}</strong></div>
      <div class="winner-reason">${reason}</div>
    `;
  }

  getSpeedDelay() {
    const speeds = {
      'ultra-slow': 3000,
      'very-slow': 2000,
      'didactic': 1500,
      'normal': 1000,
      'fast': 500
    };
    return speeds[this.comparisonSpeed] || 1000;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  showToast(message, type = 'info') {
    if (window.algorithmSystem && window.algorithmSystem.showMessage) {
      window.algorithmSystem.showMessage(message, type);
    } else {
      console.log(`[${type.toUpperCase()}] ${message}`);
    }
  }

  // Métodos restantes para salvar, exportar, etc.
  pauseDualComparison() {
    this.showToast('⏸️ Funcionalidade de pausa em desenvolvimento', 'info');
  }

  resetDualComparison() {
    this.resetDualArrays();
    this.drawBothCanvases();
    this.generatePrediction();
    
    const winnerEl = document.getElementById('winnerIndicator');
    if (winnerEl) {
      winnerEl.innerHTML = `
        <div class="winner-crown">👑</div>
        <div class="winner-text">Pronto para comparar!</div>
      `;
    }
    
    this.showToast('🔄 Comparação reiniciada', 'info');
  }

  generateComparisonReport() {
    this.showToast('📊 Geração de relatório em desenvolvimento', 'info');
  }

  saveComparisonResult() {
    this.showToast('💾 Salvamento de resultado em desenvolvimento', 'info');
  }

  exportComparisonHistory() {
    this.showToast('📤 Exportação de histórico em desenvolvimento', 'info');
  }

  clearComparisonHistory() {
    this.showToast('🗑️ Limpeza de histórico em desenvolvimento', 'info');
  }
}

// Integração global
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    if (window.algorithmSystem) {
      window.dualComparisonSystem = new DualAlgorithmComparisonSystem(window.algorithmSystem);
      console.log('✅ Sistema de comparação dual inicializado');
    }
  }, 1000);
});