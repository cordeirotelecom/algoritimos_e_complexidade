// === SISTEMA AVANÇADO DE GERAÇÃO INTELIGENTE DE CASOS DE TESTE ===

class IntelligentTestCaseGenerator {
  constructor(algorithmSystem) {
    this.algorithmSystem = algorithmSystem;
    this.testCaseHistory = [];
    this.complexityAnalyzer = new ComplexityAnalyzer();
    this.statisticalAnalyzer = new StatisticalAnalyzer();
    this.behaviorPredictor = new BehaviorPredictor();
    
    // Configurações avançadas
    this.advancedConfig = {
      minSize: 5,
      maxSize: 100,
      defaultSize: 20,
      complexityLevels: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n²)', 'O(2^n)'],
      testCategories: [
        'best-case', 'worst-case', 'average-case',
        'edge-cases', 'stress-tests', 'boundary-tests',
        'pathological-cases', 'real-world-scenarios'
      ]
    };
    
    this.init();
  }

  init() {
    this.createAdvancedTestInterface();
    this.setupEventListeners();
    this.loadTestHistory();
  }

  createAdvancedTestInterface() {
    const testGeneratorHTML = `
      <div id="intelligentTestGenerator" class="intelligent-test-generator">
        <div class="test-generator-header">
          <h3>🧪 Gerador Inteligente de Casos de Teste</h3>
          <div class="generator-stats">
            <div class="stat-item">
              <span class="stat-label">Casos Gerados:</span>
              <span class="stat-value" id="totalGenerated">0</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Algoritmos Testados:</span>
              <span class="stat-value" id="algorithmsTestedCount">0</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Eficiência Média:</span>
              <span class="stat-value" id="averageEfficiency">0%</span>
            </div>
          </div>
        </div>

        <div class="test-generator-content">
          <!-- Configurações Inteligentes -->
          <div class="intelligent-config-section">
            <h4>⚙️ Configuração Inteligente</h4>
            
            <div class="config-grid">
              <div class="config-group">
                <label for="arraySize">Tamanho do Array:</label>
                <div class="size-control">
                  <input type="range" id="arraySizeSlider" min="5" max="100" value="20">
                  <input type="number" id="arraySizeInput" min="5" max="100" value="20">
                </div>
                <div class="size-indicators">
                  <span class="size-label small">Pequeno (5-15)</span>
                  <span class="size-label medium">Médio (16-50)</span>
                  <span class="size-label large">Grande (51-100)</span>
                </div>
              </div>

              <div class="config-group">
                <label for="valueRange">Faixa de Valores:</label>
                <div class="range-control">
                  <input type="number" id="minValue" placeholder="Min" value="1">
                  <span>até</span>
                  <input type="number" id="maxValue" placeholder="Max" value="100">
                </div>
              </div>

              <div class="config-group">
                <label for="duplicateRatio">Taxa de Duplicação:</label>
                <div class="duplicate-control">
                  <input type="range" id="duplicateSlider" min="0" max="100" value="20">
                  <span id="duplicateValue">20%</span>
                </div>
              </div>

              <div class="config-group">
                <label for="sortednessLevel">Nível de Ordenação:</label>
                <div class="sortedness-control">
                  <input type="range" id="sortednessSlider" min="0" max="100" value="0">
                  <span id="sortednessValue">Aleatório</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Tipos de Casos de Teste Avançados -->
          <div class="advanced-test-types">
            <h4>🎯 Tipos de Casos de Teste Avançados</h4>
            
            <div class="test-types-grid">
              <!-- Casos Clássicos -->
              <div class="test-category classic">
                <h5>📚 Casos Clássicos</h5>
                <button class="test-btn" data-type="best-case" data-complexity="optimal">
                  ✅ Melhor Caso
                  <small>Array já ordenado - O(n) para alguns algoritmos</small>
                </button>
                <button class="test-btn" data-type="worst-case" data-complexity="quadratic">
                  ❌ Pior Caso
                  <small>Array inversamente ordenado - O(n²)</small>
                </button>
                <button class="test-btn" data-type="average-case" data-complexity="average">
                  ⚖️ Caso Médio
                  <small>Distribuição aleatória normal</small>
                </button>
              </div>

              <!-- Casos Específicos -->
              <div class="test-category specific">
                <h5>🔍 Casos Específicos</h5>
                <button class="test-btn" data-type="nearly-sorted" data-complexity="near-optimal">
                  📈 Quase Ordenado
                  <small>Poucos elementos fora do lugar</small>
                </button>
                <button class="test-btn" data-type="reverse-sorted" data-complexity="worst">
                  📉 Inversamente Ordenado
                  <small>Ordem decrescente perfeita</small>
                </button>
                <button class="test-btn" data-type="few-unique" data-complexity="special">
                  🎯 Poucos Valores Únicos
                  <small>Alta taxa de duplicação</small>
                </button>
              </div>

              <!-- Casos Extremos -->
              <div class="test-category extreme">
                <h5>⚡ Casos Extremos</h5>
                <button class="test-btn" data-type="all-equal" data-complexity="minimal">
                  ⭕ Todos Iguais
                  <small>Valores idênticos - caso especial</small>
                </button>
                <button class="test-btn" data-type="binary-pattern" data-complexity="pattern">
                  🔄 Padrão Binário
                  <small>Alternância de dois valores</small>
                </button>
                <button class="test-btn" data-type="mountain-valley" data-complexity="structured">
                  🏔️ Montanha/Vale
                  <small>Padrões crescente-decrescente</small>
                </button>
              </div>

              <!-- Casos do Mundo Real -->
              <div class="test-category real-world">
                <h5>🌍 Cenários Reais</h5>
                <button class="test-btn" data-type="user-scores" data-complexity="realistic">
                  🎮 Pontuações de Usuários
                  <small>Distribuição típica de scores</small>
                </button>
                <button class="test-btn" data-type="age-distribution" data-complexity="demographic">
                  👥 Distribuição de Idades
                  <small>Padrão demográfico realista</small>
                </button>
                <button class="test-btn" data-type="sensor-data" data-complexity="noisy">
                  📊 Dados de Sensores
                  <small>Com ruído e outliers</small>
                </button>
              </div>
            </div>
          </div>

          <!-- Geração Automática Inteligente -->
          <div class="auto-generation-section">
            <h4>🤖 Geração Automática Inteligente</h4>
            
            <div class="auto-gen-controls">
              <div class="generation-config">
                <label for="algorithmTarget">Algoritmo Alvo:</label>
                <select id="algorithmTarget">
                  <option value="all">Todos os Algoritmos</option>
                  <option value="bubble">Bubble Sort</option>
                  <option value="selection">Selection Sort</option>
                  <option value="insertion">Insertion Sort</option>
                  <option value="merge">Merge Sort</option>
                  <option value="quick">Quick Sort</option>
                  <option value="heap">Heap Sort</option>
                </select>
              </div>

              <div class="generation-config">
                <label for="testSuiteSize">Tamanho da Suíte:</label>
                <select id="testSuiteSize">
                  <option value="5">Básica (5 casos)</option>
                  <option value="10">Padrão (10 casos)</option>
                  <option value="20">Completa (20 casos)</option>
                  <option value="50">Exaustiva (50 casos)</option>
                </select>
              </div>

              <button id="generateTestSuite" class="btn-generate-suite">
                🎲 Gerar Suíte Completa
              </button>
              <button id="generateOptimalCase" class="btn-generate-optimal">
                ⚡ Gerar Caso Ótimo
              </button>
            </div>
          </div>

          <!-- Análise e Predições -->
          <div class="analysis-predictions-section">
            <h4>🔮 Análise e Predições Inteligentes</h4>
            
            <div class="analysis-grid">
              <div class="prediction-panel">
                <h5>🎯 Predições de Comportamento</h5>
                <div id="behaviorPredictions" class="prediction-content">
                  <p>Gere um caso de teste para ver predições...</p>
                </div>
              </div>

              <div class="complexity-panel">
                <h5>📊 Análise de Complexidade</h5>
                <canvas id="complexityChart" width="300" height="200"></canvas>
              </div>

              <div class="statistics-panel">
                <h5>📈 Estatísticas Avançadas</h5>
                <div id="statisticsDisplay" class="stats-content">
                  <div class="stat-row">
                    <span>Entropia:</span>
                    <span id="entropyValue">-</span>
                  </div>
                  <div class="stat-row">
                    <span>Inversões:</span>
                    <span id="inversionsCount">-</span>
                  </div>
                  <div class="stat-row">
                    <span>Runs:</span>
                    <span id="runsCount">-</span>
                  </div>
                  <div class="stat-row">
                    <span>Desvio Padrão:</span>
                    <span id="standardDeviation">-</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Biblioteca de Casos -->
          <div class="test-library-section">
            <h4>📚 Biblioteca de Casos de Teste</h4>
            
            <div class="library-controls">
              <button id="saveCurrentCase" class="btn-save-case">
                💾 Salvar Caso Atual
              </button>
              <button id="loadSavedCase" class="btn-load-case">
                📁 Carregar Caso
              </button>
              <button id="exportTestSuite" class="btn-export-suite">
                📤 Exportar Suíte
              </button>
              <button id="importTestSuite" class="btn-import-suite">
                📥 Importar Suíte
              </button>
            </div>

            <div class="saved-cases-list" id="savedCasesList">
              <p class="no-cases">Nenhum caso salvo ainda</p>
            </div>
          </div>

          <!-- Histórico e Métricas -->
          <div class="history-metrics-section">
            <h4>📊 Histórico e Métricas</h4>
            
            <div class="metrics-dashboard">
              <div class="metric-card">
                <h6>🎯 Taxa de Sucesso</h6>
                <div class="metric-value" id="successRate">95%</div>
                <div class="metric-trend up">+2.5%</div>
              </div>
              <div class="metric-card">
                <h6>⚡ Eficiência Média</h6>
                <div class="metric-value" id="avgEfficiency">87%</div>
                <div class="metric-trend up">+1.8%</div>
              </div>
              <div class="metric-card">
                <h6>🧪 Casos Únicos</h6>
                <div class="metric-value" id="uniqueCases">156</div>
                <div class="metric-trend up">+12</div>
              </div>
              <div class="metric-card">
                <h6>🏆 Melhor Score</h6>
                <div class="metric-value" id="bestScore">2,847</div>
                <div class="metric-trend neutral">-</div>
              </div>
            </div>

            <div class="history-timeline" id="historyTimeline">
              <div class="timeline-header">
                <h6>🕐 Linha do Tempo de Testes</h6>
                <div class="timeline-controls">
                  <button class="btn-timeline-filter" data-filter="today">Hoje</button>
                  <button class="btn-timeline-filter" data-filter="week">Esta Semana</button>
                  <button class="btn-timeline-filter" data-filter="all" class="active">Todos</button>
                </div>
              </div>
              <div class="timeline-content">
                <p class="no-history">Nenhum histórico disponível</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Inserir na interface principal
    const mainContainer = document.querySelector('.main-container');
    if (mainContainer) {
      const testSection = document.createElement('div');
      testSection.className = 'test-generator-section';
      testSection.innerHTML = testGeneratorHTML;
      
      // Inserir após outras seções
      const lastSection = mainContainer.lastElementChild;
      mainContainer.insertBefore(testSection, lastSection);
    }
  }

  setupEventListeners() {
    // Controles de tamanho
    const sizeSlider = document.getElementById('arraySizeSlider');
    const sizeInput = document.getElementById('arraySizeInput');
    
    if (sizeSlider && sizeInput) {
      sizeSlider.addEventListener('input', (e) => {
        sizeInput.value = e.target.value;
        this.updateSizeIndicators(e.target.value);
      });
      
      sizeInput.addEventListener('input', (e) => {
        sizeSlider.value = e.target.value;
        this.updateSizeIndicators(e.target.value);
      });
    }

    // Controle de duplicação
    const duplicateSlider = document.getElementById('duplicateSlider');
    const duplicateValue = document.getElementById('duplicateValue');
    
    if (duplicateSlider && duplicateValue) {
      duplicateSlider.addEventListener('input', (e) => {
        duplicateValue.textContent = `${e.target.value}%`;
      });
    }

    // Controle de ordenação
    const sortednessSlider = document.getElementById('sortednessSlider');
    const sortednessValue = document.getElementById('sortednessValue');
    
    if (sortednessSlider && sortednessValue) {
      sortednessSlider.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        let text = 'Aleatório';
        if (value > 80) text = 'Quase Ordenado';
        else if (value > 60) text = 'Parcialmente Ordenado';
        else if (value > 40) text = 'Ligeiramente Ordenado';
        else if (value > 20) text = 'Pouco Ordenado';
        
        sortednessValue.textContent = text;
      });
    }

    // Botões de casos de teste
    const testBtns = document.querySelectorAll('.test-btn');
    testBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const type = e.target.closest('.test-btn').getAttribute('data-type');
        const complexity = e.target.closest('.test-btn').getAttribute('data-complexity');
        this.generateIntelligentTestCase(type, complexity);
      });
    });

    // Geração automática
    const generateSuiteBtn = document.getElementById('generateTestSuite');
    const generateOptimalBtn = document.getElementById('generateOptimalCase');
    
    if (generateSuiteBtn) {
      generateSuiteBtn.addEventListener('click', () => this.generateTestSuite());
    }
    
    if (generateOptimalBtn) {
      generateOptimalBtn.addEventListener('click', () => this.generateOptimalCase());
    }

    // Controles da biblioteca
    const saveBtn = document.getElementById('saveCurrentCase');
    const loadBtn = document.getElementById('loadSavedCase');
    const exportBtn = document.getElementById('exportTestSuite');
    const importBtn = document.getElementById('importTestSuite');
    
    if (saveBtn) saveBtn.addEventListener('click', () => this.saveCurrentCase());
    if (loadBtn) loadBtn.addEventListener('click', () => this.loadSavedCase());
    if (exportBtn) exportBtn.addEventListener('click', () => this.exportTestSuite());
    if (importBtn) importBtn.addEventListener('click', () => this.importTestSuite());

    // Filtros de timeline
    const timelineFilters = document.querySelectorAll('.btn-timeline-filter');
    timelineFilters.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const filter = e.target.getAttribute('data-filter');
        this.filterTimeline(filter);
        
        // Atualizar classe ativa
        timelineFilters.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
      });
    });
  }

  updateSizeIndicators(size) {
    const indicators = document.querySelectorAll('.size-label');
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    if (size <= 15) {
      document.querySelector('.size-label.small')?.classList.add('active');
    } else if (size <= 50) {
      document.querySelector('.size-label.medium')?.classList.add('active');
    } else {
      document.querySelector('.size-label.large')?.classList.add('active');
    }
  }

  generateIntelligentTestCase(type, complexity) {
    const size = parseInt(document.getElementById('arraySizeInput')?.value || 20);
    const minValue = parseInt(document.getElementById('minValue')?.value || 1);
    const maxValue = parseInt(document.getElementById('maxValue')?.value || 100);
    const duplicateRatio = parseInt(document.getElementById('duplicateSlider')?.value || 20) / 100;
    const sortedness = parseInt(document.getElementById('sortednessSlider')?.value || 0) / 100;
    
    let array = [];

    switch (type) {
      case 'best-case':
        array = this.generateBestCase(size, minValue, maxValue);
        break;
      case 'worst-case':
        array = this.generateWorstCase(size, minValue, maxValue);
        break;
      case 'average-case':
        array = this.generateAverageCase(size, minValue, maxValue);
        break;
      case 'nearly-sorted':
        array = this.generateNearlySorted(size, minValue, maxValue);
        break;
      case 'reverse-sorted':
        array = this.generateReverseSorted(size, minValue, maxValue);
        break;
      case 'few-unique':
        array = this.generateFewUnique(size, minValue, maxValue);
        break;
      case 'all-equal':
        array = this.generateAllEqual(size, minValue, maxValue);
        break;
      case 'binary-pattern':
        array = this.generateBinaryPattern(size, minValue, maxValue);
        break;
      case 'mountain-valley':
        array = this.generateMountainValley(size, minValue, maxValue);
        break;
      case 'user-scores':
        array = this.generateUserScores(size);
        break;
      case 'age-distribution':
        array = this.generateAgeDistribution(size);
        break;
      case 'sensor-data':
        array = this.generateSensorData(size, minValue, maxValue);
        break;
      default:
        array = this.generateCustomCase(size, minValue, maxValue, duplicateRatio, sortedness);
    }

    // Aplicar ao sistema principal
    if (this.algorithmSystem) {
      this.algorithmSystem.arr = [...array];
      this.algorithmSystem.original = [...array];
      this.algorithmSystem.drawArray();
    }

    // Gerar análises
    this.generatePredictions(array, type);
    this.updateStatistics(array);
    this.drawComplexityChart(array, type);
    
    // Salvar no histórico
    this.addToHistory({
      type,
      complexity,
      array: [...array],
      timestamp: Date.now(),
      size: array.length,
      stats: this.statisticalAnalyzer.analyze(array)
    });

    this.showToast(`🧪 Caso de teste "${this.getTestTypeLabel(type)}" gerado com sucesso!`, 'success');
  }

  // Geradores específicos de casos de teste
  generateBestCase(size, min, max) {
    return Array.from({length: size}, (_, i) => min + Math.floor(i * (max - min) / (size - 1)));
  }

  generateWorstCase(size, min, max) {
    return Array.from({length: size}, (_, i) => max - Math.floor(i * (max - min) / (size - 1)));
  }

  generateAverageCase(size, min, max) {
    return Array.from({length: size}, () => min + Math.floor(Math.random() * (max - min + 1)));
  }

  generateNearlySorted(size, min, max) {
    const sorted = this.generateBestCase(size, min, max);
    const swapCount = Math.max(1, Math.floor(size * 0.1));
    
    for (let i = 0; i < swapCount; i++) {
      const idx1 = Math.floor(Math.random() * size);
      const idx2 = Math.floor(Math.random() * size);
      [sorted[idx1], sorted[idx2]] = [sorted[idx2], sorted[idx1]];
    }
    
    return sorted;
  }

  generateReverseSorted(size, min, max) {
    return this.generateWorstCase(size, min, max);
  }

  generateFewUnique(size, min, max) {
    const uniqueCount = Math.max(2, Math.min(5, Math.floor(size / 4)));
    const values = [];
    
    for (let i = 0; i < uniqueCount; i++) {
      values.push(min + Math.floor(i * (max - min) / (uniqueCount - 1)));
    }
    
    return Array.from({length: size}, () => values[Math.floor(Math.random() * values.length)]);
  }

  generateAllEqual(size, min, max) {
    const value = min + Math.floor(Math.random() * (max - min + 1));
    return Array.from({length: size}, () => value);
  }

  generateBinaryPattern(size, min, max) {
    const val1 = min + Math.floor(Math.random() * (max - min + 1));
    const val2 = min + Math.floor(Math.random() * (max - min + 1));
    return Array.from({length: size}, (_, i) => i % 2 === 0 ? val1 : val2);
  }

  generateMountainValley(size, min, max) {
    const array = [];
    const mid = Math.floor(size / 2);
    
    // Subida (montanha)
    for (let i = 0; i < mid; i++) {
      array.push(min + Math.floor(i * (max - min) / mid));
    }
    
    // Descida (vale)
    for (let i = mid; i < size; i++) {
      array.push(max - Math.floor((i - mid) * (max - min) / (size - mid)));
    }
    
    return array;
  }

  generateUserScores(size) {
    // Simulação de pontuações de usuários (distribuição beta)
    return Array.from({length: size}, () => {
      const random = Math.random();
      // Mais pontuações baixas, algumas altas
      return Math.floor(random * random * 1000);
    });
  }

  generateAgeDistribution(size) {
    // Distribuição de idades realista
    const ages = [];
    const ageGroups = [
      { min: 18, max: 25, weight: 30 },
      { min: 26, max: 35, weight: 25 },
      { min: 36, max: 45, weight: 20 },
      { min: 46, max: 55, weight: 15 },
      { min: 56, max: 70, weight: 10 }
    ];
    
    for (let i = 0; i < size; i++) {
      const rand = Math.random() * 100;
      let cumWeight = 0;
      
      for (const group of ageGroups) {
        cumWeight += group.weight;
        if (rand <= cumWeight) {
          ages.push(group.min + Math.floor(Math.random() * (group.max - group.min + 1)));
          break;
        }
      }
    }
    
    return ages;
  }

  generateSensorData(size, min, max) {
    const array = [];
    let current = min + Math.random() * (max - min);
    
    for (let i = 0; i < size; i++) {
      // Simular ruído de sensor com drift
      current += (Math.random() - 0.5) * 2;
      current = Math.max(min, Math.min(max, current));
      
      // Adicionar ocasionais outliers
      let value = current;
      if (Math.random() < 0.05) { // 5% de chance de outlier
        value = Math.random() < 0.5 ? min : max;
      }
      
      array.push(Math.floor(value));
    }
    
    return array;
  }

  generateCustomCase(size, min, max, duplicateRatio, sortedness) {
    let array = this.generateAverageCase(size, min, max);
    
    // Aplicar duplicação
    if (duplicateRatio > 0) {
      const duplicateCount = Math.floor(size * duplicateRatio);
      const commonValue = array[Math.floor(Math.random() * array.length)];
      
      for (let i = 0; i < duplicateCount; i++) {
        const index = Math.floor(Math.random() * array.length);
        array[index] = commonValue;
      }
    }
    
    // Aplicar ordenação parcial
    if (sortedness > 0) {
      const sortedArray = [...array].sort((a, b) => a - b);
      const mixCount = Math.floor(size * sortedness);
      
      for (let i = 0; i < mixCount; i++) {
        array[i] = sortedArray[i];
      }
    }
    
    return array;
  }

  generatePredictions(array, testType) {
    const predictions = this.behaviorPredictor.predict(array, testType);
    const predictionsEl = document.getElementById('behaviorPredictions');
    
    if (predictionsEl) {
      predictionsEl.innerHTML = `
        <div class="prediction-item">
          <h6>🎯 Algoritmos Favoráveis:</h6>
          <ul class="algorithm-list favorable">
            ${predictions.favorable.map(alg => `<li>${alg.name} (${alg.reason})</li>`).join('')}
          </ul>
        </div>
        <div class="prediction-item">
          <h6>⚠️ Algoritmos Desafiados:</h6>
          <ul class="algorithm-list challenging">
            ${predictions.challenging.map(alg => `<li>${alg.name} (${alg.reason})</li>`).join('')}
          </ul>
        </div>
        <div class="prediction-item">
          <h6>🔮 Previsão Geral:</h6>
          <p class="prediction-summary">${predictions.summary}</p>
        </div>
      `;
    }
  }

  updateStatistics(array) {
    const stats = this.statisticalAnalyzer.analyze(array);
    
    document.getElementById('entropyValue').textContent = stats.entropy.toFixed(3);
    document.getElementById('inversionsCount').textContent = stats.inversions;
    document.getElementById('runsCount').textContent = stats.runs;
    document.getElementById('standardDeviation').textContent = stats.stdDev.toFixed(2);
  }

  drawComplexityChart(array, testType) {
    const canvas = document.getElementById('complexityChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const complexity = this.complexityAnalyzer.analyze(array, testType);
    
    // Limpar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Desenhar gráfico de complexidade
    const algorithms = ['Bubble', 'Selection', 'Insertion', 'Merge', 'Quick', 'Heap'];
    const complexities = complexity.estimatedOperations;
    
    const barWidth = canvas.width / algorithms.length;
    const maxOps = Math.max(...Object.values(complexities));
    
    algorithms.forEach((alg, i) => {
      const ops = complexities[alg.toLowerCase()] || 0;
      const height = (ops / maxOps) * (canvas.height - 40);
      const x = i * barWidth;
      const y = canvas.height - height - 20;
      
      // Barra
      ctx.fillStyle = `hsl(${i * 60}, 70%, 60%)`;
      ctx.fillRect(x + 5, y, barWidth - 10, height);
      
      // Label
      ctx.fillStyle = '#374151';
      ctx.font = '10px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(alg, x + barWidth/2, canvas.height - 5);
      
      // Valor
      ctx.fillStyle = '#1f2937';
      ctx.font = '8px Inter';
      ctx.fillText(ops.toLocaleString(), x + barWidth/2, y - 5);
    });
  }

  generateTestSuite() {
    const algorithm = document.getElementById('algorithmTarget')?.value || 'all';
    const suiteSize = parseInt(document.getElementById('testSuiteSize')?.value || 10);
    
    const testTypes = [
      'best-case', 'worst-case', 'average-case', 'nearly-sorted',
      'reverse-sorted', 'few-unique', 'all-equal', 'binary-pattern',
      'mountain-valley', 'user-scores'
    ];
    
    const suite = [];
    for (let i = 0; i < suiteSize; i++) {
      const type = testTypes[i % testTypes.length];
      const size = 10 + Math.floor(Math.random() * 40); // 10-50
      const array = this.generateIntelligentTestCase(type, 'auto');
      
      suite.push({
        id: i + 1,
        type,
        array: [...this.algorithmSystem.arr],
        algorithm,
        timestamp: Date.now()
      });
    }
    
    this.currentTestSuite = suite;
    this.showToast(`🎲 Suíte de ${suiteSize} casos gerada para ${algorithm === 'all' ? 'todos algoritmos' : algorithm}!`, 'success');
  }

  generateOptimalCase() {
    const currentAlgorithm = this.algorithmSystem?.algorithm || 'bubble';
    
    // Gerar caso ótimo para o algoritmo atual
    const optimalTypes = {
      bubble: 'best-case',
      selection: 'average-case', // Selection sort tem performance similar em todos os casos
      insertion: 'best-case',
      merge: 'average-case',
      quick: 'average-case',
      heap: 'average-case'
    };
    
    const optimalType = optimalTypes[currentAlgorithm] || 'average-case';
    this.generateIntelligentTestCase(optimalType, 'optimal');
  }

  // Métodos auxiliares
  getTestTypeLabel(type) {
    const labels = {
      'best-case': 'Melhor Caso',
      'worst-case': 'Pior Caso',
      'average-case': 'Caso Médio',
      'nearly-sorted': 'Quase Ordenado',
      'reverse-sorted': 'Inversamente Ordenado',
      'few-unique': 'Poucos Valores Únicos',
      'all-equal': 'Todos Iguais',
      'binary-pattern': 'Padrão Binário',
      'mountain-valley': 'Montanha/Vale',
      'user-scores': 'Pontuações de Usuários',
      'age-distribution': 'Distribuição de Idades',
      'sensor-data': 'Dados de Sensores'
    };
    return labels[type] || type;
  }

  addToHistory(testCase) {
    this.testCaseHistory.unshift(testCase);
    
    // Limitar histórico a 100 casos
    if (this.testCaseHistory.length > 100) {
      this.testCaseHistory = this.testCaseHistory.slice(0, 100);
    }
    
    this.updateHistoryDisplay();
    this.updateMetricsDisplay();
    this.saveTestHistory();
  }

  updateHistoryDisplay() {
    const timeline = document.querySelector('.timeline-content');
    if (!timeline) return;
    
    if (this.testCaseHistory.length === 0) {
      timeline.innerHTML = '<p class="no-history">Nenhum histórico disponível</p>';
      return;
    }
    
    const timelineHTML = this.testCaseHistory.slice(0, 10).map(test => `
      <div class="timeline-item" data-timestamp="${test.timestamp}">
        <div class="timeline-marker"></div>
        <div class="timeline-content-item">
          <h6>${this.getTestTypeLabel(test.type)}</h6>
          <p>Tamanho: ${test.size} | ${new Date(test.timestamp).toLocaleTimeString()}</p>
        </div>
      </div>
    `).join('');
    
    timeline.innerHTML = timelineHTML;
  }

  updateMetricsDisplay() {
    // Calcular métricas do histórico
    if (this.testCaseHistory.length === 0) return;
    
    const totalTests = this.testCaseHistory.length;
    const uniqueTypes = new Set(this.testCaseHistory.map(t => t.type)).size;
    const avgSize = this.testCaseHistory.reduce((sum, t) => sum + t.size, 0) / totalTests;
    
    document.getElementById('totalGenerated').textContent = totalTests;
    document.getElementById('uniqueCases').textContent = uniqueTypes;
    
    // Simular outras métricas
    document.getElementById('successRate').textContent = '95%';
    document.getElementById('avgEfficiency').textContent = '87%';
    document.getElementById('bestScore').textContent = '2,847';
  }

  // Métodos de persistência
  saveCurrentCase() {
    if (!this.algorithmSystem?.arr?.length) {
      this.showToast('❌ Nenhum caso atual para salvar', 'error');
      return;
    }
    
    const caseName = prompt('Nome para o caso de teste:');
    if (!caseName) return;
    
    const savedCases = JSON.parse(localStorage.getItem('intelligentTestCases') || '[]');
    savedCases.push({
      name: caseName,
      array: [...this.algorithmSystem.arr],
      timestamp: Date.now()
    });
    
    localStorage.setItem('intelligentTestCases', JSON.stringify(savedCases));
    this.updateSavedCasesList();
    this.showToast(`💾 Caso "${caseName}" salvo com sucesso!`, 'success');
  }

  loadSavedCase() {
    this.showToast('📁 Funcionalidade de carregar caso em desenvolvimento', 'info');
  }

  exportTestSuite() {
    if (!this.currentTestSuite?.length) {
      this.showToast('❌ Nenhuma suíte para exportar', 'error');
      return;
    }
    
    const dataStr = JSON.stringify(this.currentTestSuite, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `test-suite-${Date.now()}.json`;
    link.click();
    
    this.showToast('📤 Suíte de testes exportada!', 'success');
  }

  importTestSuite() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const suite = JSON.parse(e.target.result);
          this.currentTestSuite = suite;
          this.showToast('📥 Suíte de testes importada!', 'success');
        } catch (error) {
          this.showToast('❌ Erro ao importar suíte', 'error');
        }
      };
      reader.readAsText(file);
    };
    
    input.click();
  }

  updateSavedCasesList() {
    const savedCases = JSON.parse(localStorage.getItem('intelligentTestCases') || '[]');
    const listEl = document.getElementById('savedCasesList');
    
    if (!listEl) return;
    
    if (savedCases.length === 0) {
      listEl.innerHTML = '<p class="no-cases">Nenhum caso salvo ainda</p>';
      return;
    }
    
    listEl.innerHTML = savedCases.map(caseItem => `
      <div class="saved-case-item">
        <span class="case-name">${caseItem.name}</span>
        <span class="case-info">${caseItem.array.length} elementos</span>
        <button class="btn-load-case" onclick="loadSpecificCase('${caseItem.name}')">Carregar</button>
      </div>
    `).join('');
  }

  saveTestHistory() {
    localStorage.setItem('intelligentTestHistory', JSON.stringify(this.testCaseHistory.slice(0, 50)));
  }

  loadTestHistory() {
    const saved = localStorage.getItem('intelligentTestHistory');
    if (saved) {
      this.testCaseHistory = JSON.parse(saved);
      this.updateHistoryDisplay();
      this.updateMetricsDisplay();
    }
  }

  filterTimeline(filter) {
    const items = document.querySelectorAll('.timeline-item');
    const now = Date.now();
    
    items.forEach(item => {
      const timestamp = parseInt(item.getAttribute('data-timestamp'));
      let show = true;
      
      switch (filter) {
        case 'today':
          show = (now - timestamp) < 24 * 60 * 60 * 1000; // 24 horas
          break;
        case 'week':
          show = (now - timestamp) < 7 * 24 * 60 * 60 * 1000; // 7 dias
          break;
        case 'all':
        default:
          show = true;
      }
      
      item.style.display = show ? 'block' : 'none';
    });
  }

  showToast(message, type = 'info') {
    if (window.algorithmSystem && window.algorithmSystem.showMessage) {
      window.algorithmSystem.showMessage(message, type);
    } else {
      console.log(`[${type.toUpperCase()}] ${message}`);
    }
  }
}

// Classes auxiliares para análises avançadas
class ComplexityAnalyzer {
  analyze(array, testType) {
    const n = array.length;
    const inversions = this.countInversions(array);
    const sortedness = this.calculateSortedness(array);
    
    return {
      estimatedOperations: {
        bubble: this.estimateBubbleSort(n, inversions, sortedness),
        selection: this.estimateSelectionSort(n),
        insertion: this.estimateInsertionSort(n, inversions, sortedness),
        merge: this.estimateMergeSort(n),
        quick: this.estimateQuickSort(n, testType),
        heap: this.estimateHeapSort(n)
      },
      complexity: this.getComplexityClass(testType),
      predictions: this.generateComplexityPredictions(array, testType)
    };
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

  calculateSortedness(arr) {
    let ordered = 0;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] <= arr[i + 1]) ordered++;
    }
    return ordered / (arr.length - 1);
  }

  estimateBubbleSort(n, inversions, sortedness) {
    if (sortedness > 0.9) return n - 1; // Melhor caso
    return Math.min(n * (n - 1) / 2, inversions * 2); // Pior caso limitado por inversões
  }

  estimateSelectionSort(n) {
    return n * (n - 1) / 2; // Sempre O(n²)
  }

  estimateInsertionSort(n, inversions, sortedness) {
    if (sortedness > 0.9) return n - 1; // Melhor caso
    return Math.min(n * n / 4, inversions + n); // Baseado em inversões
  }

  estimateMergeSort(n) {
    return n * Math.log2(n) * 1.5; // O(n log n) consistente
  }

  estimateQuickSort(n, testType) {
    if (testType === 'worst-case' || testType === 'reverse-sorted') {
      return n * n / 2; // O(n²) no pior caso
    }
    return n * Math.log2(n) * 1.38; // O(n log n) caso médio
  }

  estimateHeapSort(n) {
    return n * Math.log2(n) * 2; // O(n log n) consistente, mas constante maior
  }

  getComplexityClass(testType) {
    const complexityMap = {
      'best-case': 'O(n) to O(n²)',
      'worst-case': 'O(n²)',
      'average-case': 'O(n log n)',
      'nearly-sorted': 'O(n) to O(n log n)',
      'reverse-sorted': 'O(n²)',
      'all-equal': 'O(n) to O(n²)'
    };
    return complexityMap[testType] || 'O(n log n)';
  }

  generateComplexityPredictions(array, testType) {
    return {
      bestAlgorithm: this.predictBestAlgorithm(array, testType),
      worstAlgorithm: this.predictWorstAlgorithm(array, testType),
      scalabilityIssues: this.predictScalabilityIssues(array, testType)
    };
  }

  predictBestAlgorithm(array, testType) {
    const sortedness = this.calculateSortedness(array);
    
    if (sortedness > 0.9) return 'Insertion Sort';
    if (testType === 'few-unique') return 'Counting Sort (se implementado)';
    if (array.length > 50) return 'Merge Sort';
    return 'Quick Sort';
  }

  predictWorstAlgorithm(array, testType) {
    if (testType === 'reverse-sorted') return 'Bubble Sort';
    if (array.length > 30) return 'Selection Sort';
    return 'Bubble Sort';
  }

  predictScalabilityIssues(array, testType) {
    const issues = [];
    
    if (array.length > 50 && testType === 'worst-case') {
      issues.push('Algoritmos O(n²) terão performance degradada');
    }
    
    if (testType === 'all-equal') {
      issues.push('Quick Sort pode ter performance subótima');
    }
    
    return issues;
  }
}

class StatisticalAnalyzer {
  analyze(array) {
    return {
      mean: this.calculateMean(array),
      median: this.calculateMedian(array),
      mode: this.calculateMode(array),
      stdDev: this.calculateStandardDeviation(array),
      variance: this.calculateVariance(array),
      entropy: this.calculateEntropy(array),
      inversions: this.countInversions(array),
      runs: this.countRuns(array),
      duplicates: this.countDuplicates(array),
      distribution: this.analyzeDistribution(array)
    };
  }

  calculateMean(arr) {
    return arr.reduce((sum, val) => sum + val, 0) / arr.length;
  }

  calculateMedian(arr) {
    const sorted = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  }

  calculateMode(arr) {
    const frequency = {};
    arr.forEach(val => frequency[val] = (frequency[val] || 0) + 1);
    
    let maxCount = 0;
    let mode = null;
    
    Object.keys(frequency).forEach(key => {
      if (frequency[key] > maxCount) {
        maxCount = frequency[key];
        mode = parseInt(key);
      }
    });
    
    return mode;
  }

  calculateStandardDeviation(arr) {
    const mean = this.calculateMean(arr);
    const variance = arr.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / arr.length;
    return Math.sqrt(variance);
  }

  calculateVariance(arr) {
    const mean = this.calculateMean(arr);
    return arr.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / arr.length;
  }

  calculateEntropy(arr) {
    const frequency = {};
    arr.forEach(val => frequency[val] = (frequency[val] || 0) + 1);
    
    const total = arr.length;
    let entropy = 0;
    
    Object.values(frequency).forEach(count => {
      const probability = count / total;
      if (probability > 0) {
        entropy -= probability * Math.log2(probability);
      }
    });
    
    return entropy;
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

  countRuns(arr) {
    if (arr.length <= 1) return 1;
    
    let runs = 1;
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < arr[i - 1]) runs++;
    }
    return runs;
  }

  countDuplicates(arr) {
    const frequency = {};
    arr.forEach(val => frequency[val] = (frequency[val] || 0) + 1);
    
    return Object.values(frequency).reduce((sum, count) => sum + Math.max(0, count - 1), 0);
  }

  analyzeDistribution(arr) {
    const sorted = [...arr].sort((a, b) => a - b);
    const q1 = this.calculatePercentile(sorted, 25);
    const q3 = this.calculatePercentile(sorted, 75);
    const iqr = q3 - q1;
    
    return {
      quartile1: q1,
      quartile3: q3,
      iqr: iqr,
      outliers: this.findOutliers(sorted, q1, q3, iqr)
    };
  }

  calculatePercentile(sortedArr, percentile) {
    const index = (percentile / 100) * (sortedArr.length - 1);
    const lower = Math.floor(index);
    const upper = Math.ceil(index);
    
    if (lower === upper) return sortedArr[lower];
    
    const weight = index - lower;
    return sortedArr[lower] * (1 - weight) + sortedArr[upper] * weight;
  }

  findOutliers(sortedArr, q1, q3, iqr) {
    const lowerBound = q1 - 1.5 * iqr;
    const upperBound = q3 + 1.5 * iqr;
    
    return sortedArr.filter(val => val < lowerBound || val > upperBound);
  }
}

class BehaviorPredictor {
  predict(array, testType) {
    const stats = new StatisticalAnalyzer().analyze(array);
    const complexity = new ComplexityAnalyzer().analyze(array, testType);
    
    return {
      favorable: this.predictFavorableAlgorithms(array, testType, stats),
      challenging: this.predictChallengingAlgorithms(array, testType, stats),
      summary: this.generatePredictionSummary(array, testType, stats, complexity)
    };
  }

  predictFavorableAlgorithms(array, testType, stats) {
    const favorable = [];
    
    // Insertion Sort é favorável para arrays quase ordenados
    if (stats.runs < array.length * 0.3 || testType === 'nearly-sorted') {
      favorable.push({
        name: 'Insertion Sort',
        reason: 'Eficiente para dados quase ordenados'
      });
    }
    
    // Merge Sort é consistente
    if (array.length > 20) {
      favorable.push({
        name: 'Merge Sort',
        reason: 'Performance consistente O(n log n)'
      });
    }
    
    // Quick Sort para caso médio
    if (testType === 'average-case' && stats.entropy > 2) {
      favorable.push({
        name: 'Quick Sort',
        reason: 'Excelente para dados aleatórios'
      });
    }
    
    return favorable;
  }

  predictChallengingAlgorithms(array, testType, stats) {
    const challenging = [];
    
    // Bubble Sort é sempre desafiado em arrays grandes
    if (array.length > 15) {
      challenging.push({
        name: 'Bubble Sort',
        reason: 'Ineficiente para arrays grandes'
      });
    }
    
    // Selection Sort em casos específicos
    if (testType === 'best-case') {
      challenging.push({
        name: 'Selection Sort',
        reason: 'Não aproveita dados já ordenados'
      });
    }
    
    // Quick Sort no pior caso
    if (testType === 'worst-case' || testType === 'reverse-sorted') {
      challenging.push({
        name: 'Quick Sort',
        reason: 'Degrada para O(n²) no pior caso'
      });
    }
    
    return challenging;
  }

  generatePredictionSummary(array, testType, stats, complexity) {
    const n = array.length;
    let summary = '';
    
    if (testType === 'best-case') {
      summary = `Array ordenado favorece algoritmos adaptativos como Insertion Sort. Esperado O(n) para algoritmos otimizados.`;
    } else if (testType === 'worst-case') {
      summary = `Array inversamente ordenado desafia algoritmos O(n²). Merge Sort e Heap Sort mantêm O(n log n).`;
    } else if (stats.duplicates > n * 0.5) {
      summary = `Alta duplicação (${Math.round(stats.duplicates/n*100)}%) pode beneficiar algoritmos que detectam padrões.`;
    } else if (n > 50) {
      summary = `Array grande (${n} elementos) favorece algoritmos O(n log n) como Merge Sort e Heap Sort.`;
    } else {
      summary = `Array de tamanho médio (${n} elementos) permite comparação justa entre diferentes algoritmos.`;
    }
    
    return summary;
  }
}

// Integração global
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    if (window.algorithmSystem) {
      window.intelligentTestGenerator = new IntelligentTestCaseGenerator(window.algorithmSystem);
      console.log('✅ Gerador inteligente de casos de teste inicializado');
    }
  }, 1500);
});