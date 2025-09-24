/**
 * SISTEMA DE ANÁLISE VISUAL DE COMPLEXIDADE
 * Sistema avançado para visualização interativa de complexidade algorítmica
 * com gráficos dinâmicos, comparações de crescimento e projeções de performance
 */

class ComplexityVisualizationSystem {
    constructor() {
        this.complexityData = {
            'Bubble Sort': { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
            'Selection Sort': { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
            'Insertion Sort': { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
            'Merge Sort': { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)' },
            'Quick Sort': { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)', space: 'O(log n)' },
            'Heap Sort': { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(1)' }
        };
        
        this.complexityFunctions = {
            'O(1)': (n) => 1,
            'O(log n)': (n) => Math.log2(n),
            'O(n)': (n) => n,
            'O(n log n)': (n) => n * Math.log2(n),
            'O(n²)': (n) => n * n,
            'O(n³)': (n) => n * n * n,
            'O(2^n)': (n) => Math.pow(2, n),
            'O(n!)': (n) => this.factorial(n)
        };

        this.colors = {
            'O(1)': '#10b981',      // Verde - Constante
            'O(log n)': '#3b82f6',  // Azul - Logarítmico
            'O(n)': '#f59e0b',      // Amarelo - Linear
            'O(n log n)': '#ef4444', // Vermelho - Linearítmico
            'O(n²)': '#8b5cf6',     // Roxo - Quadrático
            'O(n³)': '#f97316',     // Laranja - Cúbico
            'O(2^n)': '#ef4444',    // Vermelho escuro - Exponencial
            'O(n!)': '#7c2d12'      // Marrom - Fatorial
        };

        this.currentChart = null;
        this.performanceData = [];
        this.realTimeMetrics = {
            operations: 0,
            comparisons: 0,
            swaps: 0,
            arrayAccess: 0,
            startTime: 0,
            endTime: 0
        };

        this.initializeUI();
    }

    factorial(n) {
        if (n <= 1) return 1;
        let result = 1;
        for (let i = 2; i <= Math.min(n, 10); i++) { // Limitar para evitar overflow
            result *= i;
        }
        return result;
    }

    initializeUI() {
        this.createComplexityPanel();
        this.createAnalysisCharts();
        this.createPerformanceTracker();
        this.createScenarioSimulator();
    }

    createComplexityPanel() {
        const panel = document.createElement('div');
        panel.className = 'complexity-analysis-panel';
        panel.innerHTML = `
            <div class="complexity-header">
                <h3>📊 Análise de Complexidade</h3>
                <div class="complexity-controls">
                    <select id="algorithmSelect" class="complexity-select">
                        <option value="">Selecione um algoritmo</option>
                        <option value="Bubble Sort">Bubble Sort</option>
                        <option value="Selection Sort">Selection Sort</option>
                        <option value="Insertion Sort">Insertion Sort</option>
                        <option value="Merge Sort">Merge Sort</option>
                        <option value="Quick Sort">Quick Sort</option>
                        <option value="Heap Sort">Heap Sort</option>
                    </select>
                    <button id="compareComplexities" class="btn-compare">Comparar Todas</button>
                </div>
            </div>

            <div class="complexity-tabs">
                <button class="complexity-tab active" data-tab="theoretical">Teórico</button>
                <button class="complexity-tab" data-tab="realtime">Tempo Real</button>
                <button class="complexity-tab" data-tab="comparison">Comparação</button>
                <button class="complexity-tab" data-tab="simulation">Simulação</button>
            </div>

            <div class="complexity-content">
                <!-- Análise Teórica -->
                <div class="complexity-tab-content active" id="theoretical">
                    <div class="complexity-summary" id="complexitySummary"></div>
                    <div class="complexity-chart-container">
                        <canvas id="theoreticalChart" width="600" height="400"></canvas>
                    </div>
                    <div class="complexity-insights" id="complexityInsights"></div>
                </div>

                <!-- Análise em Tempo Real -->
                <div class="complexity-tab-content" id="realtime">
                    <div class="realtime-metrics" id="realtimeMetrics"></div>
                    <div class="complexity-chart-container">
                        <canvas id="realtimeChart" width="600" height="400"></canvas>
                    </div>
                    <div class="performance-prediction" id="performancePrediction"></div>
                </div>

                <!-- Comparação de Algoritmos -->
                <div class="complexity-tab-content" id="comparison">
                    <div class="comparison-controls">
                        <div class="algorithm-selector">
                            <label>Algoritmo 1:</label>
                            <select id="compareAlg1">
                                <option value="Bubble Sort">Bubble Sort</option>
                                <option value="Selection Sort">Selection Sort</option>
                                <option value="Insertion Sort">Insertion Sort</option>
                                <option value="Merge Sort">Merge Sort</option>
                                <option value="Quick Sort">Quick Sort</option>
                            </select>
                        </div>
                        <div class="algorithm-selector">
                            <label>Algoritmo 2:</label>
                            <select id="compareAlg2">
                                <option value="Merge Sort" selected>Merge Sort</option>
                                <option value="Bubble Sort">Bubble Sort</option>
                                <option value="Selection Sort">Selection Sort</option>
                                <option value="Insertion Sort">Insertion Sort</option>
                                <option value="Quick Sort">Quick Sort</option>
                            </select>
                        </div>
                        <button id="generateComparison" class="btn-generate">Comparar</button>
                    </div>
                    <div class="complexity-chart-container">
                        <canvas id="comparisonChart" width="600" height="400"></canvas>
                    </div>
                    <div class="comparison-table" id="comparisonTable"></div>
                </div>

                <!-- Simulação de Cenários -->
                <div class="complexity-tab-content" id="simulation">
                    <div class="simulation-controls">
                        <div class="scenario-settings">
                            <label>Tamanho do Array:</label>
                            <input type="range" id="arraySizeRange" min="10" max="1000" value="100">
                            <span id="arraySizeValue">100</span>
                        </div>
                        <div class="scenario-settings">
                            <label>Cenário:</label>
                            <select id="scenarioType">
                                <option value="random">Aleatório</option>
                                <option value="sorted">Já Ordenado</option>
                                <option value="reverse">Ordem Reversa</option>
                                <option value="nearly">Quase Ordenado</option>
                                <option value="duplicates">Com Duplicatas</option>
                            </select>
                        </div>
                        <button id="simulateScenario" class="btn-simulate">Simular</button>
                    </div>
                    <div class="simulation-results" id="simulationResults"></div>
                    <div class="complexity-chart-container">
                        <canvas id="simulationChart" width="600" height="400"></canvas>
                    </div>
                </div>
            </div>
        `;

        // Adicionar ao DOM
        const rightPanel = document.querySelector('.right-panel');
        if (rightPanel) {
            rightPanel.appendChild(panel);
        }

        this.attachEventListeners();
    }

    createAnalysisCharts() {
        // Chart.js será usado para os gráficos
        if (typeof Chart === 'undefined') {
            // Carregar Chart.js dinamicamente se não estiver disponível
            this.loadChartJS();
        }
    }

    loadChartJS() {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = () => {
            console.log('Chart.js carregado com sucesso');
        };
        document.head.appendChild(script);
    }

    createPerformanceTracker() {
        this.performanceTracker = {
            startTracking: () => {
                this.realTimeMetrics = {
                    operations: 0,
                    comparisons: 0,
                    swaps: 0,
                    arrayAccess: 0,
                    startTime: performance.now(),
                    endTime: 0
                };
            },
            
            trackOperation: (type) => {
                this.realTimeMetrics[type]++;
                this.updateRealTimeDisplay();
            },
            
            stopTracking: () => {
                this.realTimeMetrics.endTime = performance.now();
                this.calculateComplexityMetrics();
            }
        };
    }

    createScenarioSimulator() {
        this.scenarioSimulator = {
            generateArray: (size, type) => {
                let array = [];
                switch (type) {
                    case 'random':
                        array = Array.from({length: size}, () => Math.floor(Math.random() * 1000));
                        break;
                    case 'sorted':
                        array = Array.from({length: size}, (_, i) => i + 1);
                        break;
                    case 'reverse':
                        array = Array.from({length: size}, (_, i) => size - i);
                        break;
                    case 'nearly':
                        array = Array.from({length: size}, (_, i) => i + 1);
                        // Trocar alguns elementos aleatoriamente
                        for (let i = 0; i < Math.floor(size * 0.1); i++) {
                            const idx1 = Math.floor(Math.random() * size);
                            const idx2 = Math.floor(Math.random() * size);
                            [array[idx1], array[idx2]] = [array[idx2], array[idx1]];
                        }
                        break;
                    case 'duplicates':
                        const uniqueCount = Math.floor(size / 3);
                        const values = Array.from({length: uniqueCount}, () => Math.floor(Math.random() * 100));
                        array = [];
                        for (let i = 0; i < size; i++) {
                            array.push(values[Math.floor(Math.random() * uniqueCount)]);
                        }
                        break;
                }
                return array;
            }
        };
    }

    attachEventListeners() {
        // Tab switching
        document.querySelectorAll('.complexity-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchComplexityTab(e.target.dataset.tab);
            });
        });

        // Algorithm selection
        document.getElementById('algorithmSelect')?.addEventListener('change', (e) => {
            this.analyzeAlgorithm(e.target.value);
        });

        // Compare all button
        document.getElementById('compareComplexities')?.addEventListener('click', () => {
            this.compareAllAlgorithms();
        });

        // Comparison generation
        document.getElementById('generateComparison')?.addEventListener('click', () => {
            const alg1 = document.getElementById('compareAlg1').value;
            const alg2 = document.getElementById('compareAlg2').value;
            this.generateAlgorithmComparison(alg1, alg2);
        });

        // Array size slider
        document.getElementById('arraySizeRange')?.addEventListener('input', (e) => {
            document.getElementById('arraySizeValue').textContent = e.target.value;
        });

        // Scenario simulation
        document.getElementById('simulateScenario')?.addEventListener('click', () => {
            this.simulateScenario();
        });
    }

    switchComplexityTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.complexity-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabName);
        });

        // Update tab content
        document.querySelectorAll('.complexity-tab-content').forEach(content => {
            content.classList.toggle('active', content.id === tabName);
        });

        // Initialize specific tab content
        if (tabName === 'realtime') {
            this.initializeRealTimeTracking();
        }
    }

    analyzeAlgorithm(algorithmName) {
        if (!algorithmName || !this.complexityData[algorithmName]) return;

        const complexity = this.complexityData[algorithmName];
        this.updateComplexitySummary(algorithmName, complexity);
        this.generateTheoreticalChart(algorithmName);
        this.generateComplexityInsights(algorithmName, complexity);
    }

    updateComplexitySummary(algorithmName, complexity) {
        const summaryDiv = document.getElementById('complexitySummary');
        if (!summaryDiv) return;

        summaryDiv.innerHTML = `
            <div class="algorithm-complexity-card">
                <h4>${algorithmName}</h4>
                <div class="complexity-metrics">
                    <div class="metric">
                        <span class="label">Melhor Caso:</span>
                        <span class="value ${this.getComplexityClass(complexity.best)}">${complexity.best}</span>
                    </div>
                    <div class="metric">
                        <span class="label">Caso Médio:</span>
                        <span class="value ${this.getComplexityClass(complexity.average)}">${complexity.average}</span>
                    </div>
                    <div class="metric">
                        <span class="label">Pior Caso:</span>
                        <span class="value ${this.getComplexityClass(complexity.worst)}">${complexity.worst}</span>
                    </div>
                    <div class="metric">
                        <span class="label">Complexidade Espacial:</span>
                        <span class="value ${this.getComplexityClass(complexity.space)}">${complexity.space}</span>
                    </div>
                </div>
                <div class="complexity-rating">
                    <span class="rating-label">Eficiência Geral:</span>
                    <div class="rating-stars">${this.getEfficiencyRating(complexity)}</div>
                </div>
            </div>
        `;
    }

    getComplexityClass(complexity) {
        const classes = {
            'O(1)': 'excellent',
            'O(log n)': 'very-good',
            'O(n)': 'good',
            'O(n log n)': 'fair',
            'O(n²)': 'poor',
            'O(n³)': 'very-poor',
            'O(2^n)': 'terrible',
            'O(n!)': 'terrible'
        };
        return classes[complexity] || 'unknown';
    }

    getEfficiencyRating(complexity) {
        const scores = {
            'O(1)': 5,
            'O(log n)': 5,
            'O(n)': 4,
            'O(n log n)': 3,
            'O(n²)': 2,
            'O(n³)': 1,
            'O(2^n)': 1,
            'O(n!)': 1
        };
        
        const averageScore = Math.round((scores[complexity.best] + scores[complexity.average] + scores[complexity.worst]) / 3);
        return '★'.repeat(averageScore) + '☆'.repeat(5 - averageScore);
    }

    generateTheoreticalChart(algorithmName) {
        const canvas = document.getElementById('theoreticalChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        // Destruir gráfico anterior se existir
        if (this.currentChart) {
            this.currentChart.destroy();
        }

        const complexity = this.complexityData[algorithmName];
        const dataPoints = [];
        const labels = [];
        
        // Gerar dados para diferentes tamanhos de entrada
        for (let n = 1; n <= 100; n += 5) {
            labels.push(n);
            dataPoints.push({
                x: n,
                best: this.calculateComplexityValue(complexity.best, n),
                average: this.calculateComplexityValue(complexity.average, n),
                worst: this.calculateComplexityValue(complexity.worst, n)
            });
        }

        this.currentChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: `Melhor Caso (${complexity.best})`,
                        data: dataPoints.map(d => d.best),
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        borderWidth: 3,
                        fill: false
                    },
                    {
                        label: `Caso Médio (${complexity.average})`,
                        data: dataPoints.map(d => d.average),
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        borderWidth: 3,
                        fill: false
                    },
                    {
                        label: `Pior Caso (${complexity.worst})`,
                        data: dataPoints.map(d => d.worst),
                        borderColor: '#ef4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        borderWidth: 3,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Tamanho da Entrada (n)'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Número de Operações'
                        },
                        type: 'logarithmic'
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: `Complexidade Temporal - ${algorithmName}`
                    },
                    legend: {
                        display: true,
                        position: 'top'
                    }
                }
            }
        });
    }

    calculateComplexityValue(complexity, n) {
        const func = this.complexityFunctions[complexity];
        return func ? Math.max(1, func(n)) : 1;
    }

    generateComplexityInsights(algorithmName, complexity) {
        const insightsDiv = document.getElementById('complexityInsights');
        if (!insightsDiv) return;

        const insights = this.getAlgorithmInsights(algorithmName, complexity);
        
        insightsDiv.innerHTML = `
            <div class="insights-container">
                <h4>💡 Insights e Recomendações</h4>
                <div class="insights-grid">
                    ${insights.map(insight => `
                        <div class="insight-card ${insight.type}">
                            <div class="insight-icon">${insight.icon}</div>
                            <div class="insight-content">
                                <h5>${insight.title}</h5>
                                <p>${insight.description}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    getAlgorithmInsights(algorithmName, complexity) {
        const insightsMap = {
            'Bubble Sort': [
                {
                    type: 'performance',
                    icon: '🐌',
                    title: 'Performance Limitada',
                    description: 'Adequado apenas para conjuntos muito pequenos devido à complexidade quadrática.'
                },
                {
                    type: 'educational',
                    icon: '📚',
                    title: 'Valor Educacional',
                    description: 'Excelente para aprender conceitos básicos de ordenação e análise de algoritmos.'
                },
                {
                    type: 'optimization',
                    icon: '⚡',
                    title: 'Otimização Possível',
                    description: 'Pode ser otimizado com flag de parada antecipada quando não há trocas.'
                }
            ],
            'Merge Sort': [
                {
                    type: 'performance',
                    icon: '🚀',
                    title: 'Performance Consistente',
                    description: 'Complexidade O(n log n) garantida em todos os casos, ideal para grandes conjuntos.'
                },
                {
                    type: 'stability',
                    icon: '⚖️',
                    title: 'Algoritmo Estável',
                    description: 'Preserva a ordem relativa de elementos iguais, importante para ordenações múltiplas.'
                },
                {
                    type: 'memory',
                    icon: '💾',
                    title: 'Uso de Memória',
                    description: 'Requer O(n) espaço adicional, considere isto em ambientes com memória limitada.'
                }
            ]
            // Adicionar mais insights para outros algoritmos...
        };

        return insightsMap[algorithmName] || [
            {
                type: 'info',
                icon: '📊',
                title: 'Análise Disponível',
                description: 'Complexidade temporal e espacial documentada para análise detalhada.'
            }
        ];
    }

    compareAllAlgorithms() {
        const canvas = document.getElementById('theoreticalChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        if (this.currentChart) {
            this.currentChart.destroy();
        }

        const datasets = [];
        const algorithms = Object.keys(this.complexityData);
        
        algorithms.forEach((alg, index) => {
            const complexity = this.complexityData[alg].average; // Usar caso médio
            const dataPoints = [];
            
            for (let n = 1; n <= 50; n += 2) {
                dataPoints.push(this.calculateComplexityValue(complexity, n));
            }
            
            datasets.push({
                label: `${alg} (${complexity})`,
                data: dataPoints,
                borderColor: this.colors[complexity] || `hsl(${index * 60}, 70%, 50%)`,
                backgroundColor: `${this.colors[complexity]}20` || `hsla(${index * 60}, 70%, 50%, 0.1)`,
                borderWidth: 2,
                fill: false
            });
        });

        const labels = [];
        for (let n = 1; n <= 50; n += 2) {
            labels.push(n);
        }

        this.currentChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Tamanho da Entrada (n)'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Número de Operações'
                        },
                        type: 'logarithmic'
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Comparação de Complexidade - Todos os Algoritmos'
                    },
                    legend: {
                        display: true,
                        position: 'top'
                    }
                }
            }
        });

        // Atualizar summary com comparação
        this.updateComparisonSummary();
    }

    updateComparisonSummary() {
        const summaryDiv = document.getElementById('complexitySummary');
        if (!summaryDiv) return;

        const algorithms = Object.keys(this.complexityData);
        const recommendations = this.generateRecommendations();

        summaryDiv.innerHTML = `
            <div class="comparison-summary">
                <h4>📊 Comparação Geral de Algoritmos</h4>
                <div class="algorithms-grid">
                    ${algorithms.map(alg => {
                        const complexity = this.complexityData[alg];
                        return `
                            <div class="algorithm-summary-card">
                                <h5>${alg}</h5>
                                <div class="complexity-badges">
                                    <span class="complexity-badge ${this.getComplexityClass(complexity.average)}">
                                        ${complexity.average}
                                    </span>
                                </div>
                                <div class="use-case">${this.getUseCase(alg)}</div>
                            </div>
                        `;
                    }).join('')}
                </div>
                
                <div class="recommendations-section">
                    <h4>🎯 Recomendações de Uso</h4>
                    <div class="recommendations-list">
                        ${recommendations.map(rec => `
                            <div class="recommendation-item">
                                <div class="rec-scenario">${rec.scenario}</div>
                                <div class="rec-algorithm">${rec.algorithm}</div>
                                <div class="rec-reason">${rec.reason}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    getUseCase(algorithm) {
        const useCases = {
            'Bubble Sort': 'Educacional, datasets muito pequenos',
            'Selection Sort': 'Memória limitada, datasets pequenos',
            'Insertion Sort': 'Datasets pequenos, quase ordenados',
            'Merge Sort': 'Datasets grandes, estabilidade necessária',
            'Quick Sort': 'Uso geral, datasets grandes',
            'Heap Sort': 'Garantia O(n log n), memória limitada'
        };
        return useCases[algorithm] || 'Uso geral';
    }

    generateRecommendations() {
        return [
            {
                scenario: 'Dataset < 50 elementos',
                algorithm: 'Insertion Sort',
                reason: 'Simplicidade e eficiência para pequenos conjuntos'
            },
            {
                scenario: 'Dataset grande + estabilidade',
                algorithm: 'Merge Sort',
                reason: 'Garantia O(n log n) e preserva ordem de elementos iguais'
            },
            {
                scenario: 'Uso geral, performance',
                algorithm: 'Quick Sort',
                reason: 'Excelente performance média, in-place'
            },
            {
                scenario: 'Memória muito limitada',
                algorithm: 'Heap Sort',
                reason: 'O(1) espaço adicional com garantia O(n log n)'
            },
            {
                scenario: 'Aprendizado/Educação',
                algorithm: 'Bubble Sort',
                reason: 'Fácil entendimento dos conceitos básicos'
            }
        ];
    }

    // Métrica em tempo real
    initializeRealTimeTracking() {
        const metricsDiv = document.getElementById('realtimeMetrics');
        if (!metricsDiv) return;

        metricsDiv.innerHTML = `
            <div class="realtime-dashboard">
                <h4>⚡ Métricas em Tempo Real</h4>
                <div class="metrics-grid">
                    <div class="metric-card">
                        <div class="metric-value" id="operationsCount">0</div>
                        <div class="metric-label">Operações</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value" id="comparisonsCount">0</div>
                        <div class="metric-label">Comparações</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value" id="swapsCount">0</div>
                        <div class="metric-label">Trocas</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value" id="executionTime">0ms</div>
                        <div class="metric-label">Tempo</div>
                    </div>
                </div>
                <div class="complexity-prediction" id="complexityPrediction">
                    <h5>📊 Predição de Complexidade</h5>
                    <div class="prediction-content">Execute um algoritmo para ver a análise em tempo real.</div>
                </div>
            </div>
        `;
    }

    updateRealTimeDisplay() {
        document.getElementById('operationsCount').textContent = this.realTimeMetrics.operations;
        document.getElementById('comparisonsCount').textContent = this.realTimeMetrics.comparisons;
        document.getElementById('swapsCount').textContent = this.realTimeMetrics.swaps;
        
        if (this.realTimeMetrics.startTime > 0) {
            const currentTime = this.realTimeMetrics.endTime || performance.now();
            const elapsed = currentTime - this.realTimeMetrics.startTime;
            document.getElementById('executionTime').textContent = `${elapsed.toFixed(2)}ms`;
        }
    }

    calculateComplexityMetrics() {
        const totalTime = this.realTimeMetrics.endTime - this.realTimeMetrics.startTime;
        const operations = this.realTimeMetrics.operations;
        
        // Predizer complexidade baseada nos dados reais
        const prediction = this.predictComplexity(operations, totalTime);
        
        const predictionDiv = document.getElementById('complexityPrediction');
        if (predictionDiv) {
            predictionDiv.innerHTML = `
                <h5>📊 Análise Pós-Execução</h5>
                <div class="prediction-results">
                    <div class="prediction-item">
                        <strong>Operações Realizadas:</strong> ${operations.toLocaleString()}
                    </div>
                    <div class="prediction-item">
                        <strong>Tempo Total:</strong> ${totalTime.toFixed(2)}ms
                    </div>
                    <div class="prediction-item">
                        <strong>Complexidade Observada:</strong> 
                        <span class="complexity-badge ${this.getComplexityClass(prediction)}">${prediction}</span>
                    </div>
                    <div class="prediction-insights">
                        ${this.generatePredictionInsights(prediction, operations, totalTime)}
                    </div>
                </div>
            `;
        }
    }

    predictComplexity(operations, time) {
        // Lógica simplificada para predição de complexidade
        // Em uma implementação real, usaríamos ML ou análise estatística mais sofisticada
        
        const n = Math.sqrt(operations); // Estimativa do tamanho do array
        const ratio = operations / (n * n);
        
        if (ratio < 0.1) return 'O(n)';
        else if (ratio < 1) return 'O(n log n)';
        else return 'O(n²)';
    }

    generatePredictionInsights(predictedComplexity, operations, time) {
        const insights = {
            'O(n)': 'Comportamento linear observado. Excelente eficiência para algoritmos de ordenação.',
            'O(n log n)': 'Comportamento linearítmico típico de algoritmos eficientes como Merge Sort.',
            'O(n²)': 'Comportamento quadrático detectado. Considere algoritmos mais eficientes para datasets maiores.'
        };
        
        return insights[predictedComplexity] || 'Padrão de complexidade não identificado claramente.';
    }

    simulateScenario() {
        const size = parseInt(document.getElementById('arraySizeRange').value);
        const scenario = document.getElementById('scenarioType').value;
        
        const testArray = this.scenarioSimulator.generateArray(size, scenario);
        
        // Simular execução de diferentes algoritmos no cenário
        const results = {};
        Object.keys(this.complexityData).forEach(alg => {
            results[alg] = this.simulateAlgorithmExecution(alg, testArray.slice());
        });
        
        this.displaySimulationResults(scenario, size, results);
        this.createSimulationChart(results);
    }

    simulateAlgorithmExecution(algorithm, array) {
        // Simulação simplificada - em implementação real, executaria os algoritmos
        const startTime = performance.now();
        const n = array.length;
        const complexity = this.complexityData[algorithm];
        
        // Estimar operações baseadas na complexidade teórica
        const estimatedOps = this.calculateComplexityValue(complexity.average, n);
        const endTime = performance.now();
        
        return {
            operations: Math.floor(estimatedOps),
            time: endTime - startTime,
            complexity: complexity.average
        };
    }

    displaySimulationResults(scenario, size, results) {
        const resultsDiv = document.getElementById('simulationResults');
        if (!resultsDiv) return;

        const sortedResults = Object.entries(results).sort((a, b) => a[1].operations - b[1].operations);

        resultsDiv.innerHTML = `
            <div class="simulation-summary">
                <h4>🧪 Resultados da Simulação</h4>
                <div class="scenario-info">
                    <strong>Cenário:</strong> ${this.getScenarioName(scenario)} | 
                    <strong>Tamanho:</strong> ${size} elementos
                </div>
                
                <div class="results-ranking">
                    <h5>🏆 Ranking de Performance</h5>
                    ${sortedResults.map((result, index) => {
                        const [algorithm, metrics] = result;
                        return `
                            <div class="ranking-item ${index === 0 ? 'best' : ''}">
                                <div class="rank">${index + 1}º</div>
                                <div class="algorithm">${algorithm}</div>
                                <div class="metrics">
                                    <span class="operations">${metrics.operations.toLocaleString()} ops</span>
                                    <span class="complexity">${metrics.complexity}</span>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
                
                <div class="scenario-insights">
                    <h5>💡 Insights do Cenário</h5>
                    <p>${this.getScenarioInsights(scenario)}</p>
                </div>
            </div>
        `;
    }

    getScenarioName(scenario) {
        const names = {
            'random': 'Aleatório',
            'sorted': 'Já Ordenado',
            'reverse': 'Ordem Reversa',
            'nearly': 'Quase Ordenado',
            'duplicates': 'Com Duplicatas'
        };
        return names[scenario] || scenario;
    }

    getScenarioInsights(scenario) {
        const insights = {
            'random': 'Cenário padrão onde a maioria dos algoritmos apresenta comportamento próximo ao caso médio.',
            'sorted': 'Algoritmos adaptativos como Insertion Sort se destacam, enquanto outros mantêm complexidade original.',
            'reverse': 'Pior caso para muitos algoritmos, especialmente os quadráticos como Bubble Sort.',
            'nearly': 'Insertion Sort é particularmente eficiente. Quick Sort pode ter performance variável.',
            'duplicates': 'Algoritmos estáveis são preferíveis. Three-way Quick Sort seria ideal para muitas duplicatas.'
        };
        return insights[scenario] || 'Comportamento típico esperado para este cenário.';
    }

    createSimulationChart(results) {
        const canvas = document.getElementById('simulationChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        if (this.currentChart) {
            this.currentChart.destroy();
        }

        const algorithms = Object.keys(results);
        const operations = algorithms.map(alg => results[alg].operations);
        const colors = algorithms.map((alg, i) => `hsl(${i * 360 / algorithms.length}, 70%, 60%)`);

        this.currentChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: algorithms,
                datasets: [{
                    label: 'Operações',
                    data: operations,
                    backgroundColor: colors,
                    borderColor: colors.map(c => c.replace('60%)', '50%)')),
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Número de Operações'
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Performance por Algoritmo - Simulação'
                    }
                }
            }
        });
    }

    // API Pública para integração com outros sistemas
    trackMetric(type, value = 1) {
        if (this.realTimeMetrics.hasOwnProperty(type)) {
            this.performanceTracker.trackOperation(type);
        }
    }

    startPerformanceTracking() {
        this.performanceTracker.startTracking();
    }

    stopPerformanceTracking() {
        this.performanceTracker.stopTracking();
    }

    exportAnalysis() {
        return {
            algorithmData: this.complexityData,
            performanceData: this.performanceData,
            currentMetrics: this.realTimeMetrics,
            timestamp: new Date().toISOString()
        };
    }
}

// Inicializar sistema quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.complexityVisualization = new ComplexityVisualizationSystem();
    
    // Integração com sistema de algoritmos existente
    if (window.algorithmSystem) {
        // Hook para tracking de métricas
        const originalCompare = window.algorithmSystem.compare || (() => {});
        window.algorithmSystem.compare = function(...args) {
            window.complexityVisualization.trackMetric('comparisons');
            return originalCompare.apply(this, args);
        };
        
        const originalSwap = window.algorithmSystem.swap || (() => {});
        window.algorithmSystem.swap = function(...args) {
            window.complexityVisualization.trackMetric('swaps');
            return originalSwap.apply(this, args);
        };
    }
});