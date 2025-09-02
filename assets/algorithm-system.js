// Sistema avançado de exercícios interativos
class AlgorithmLearningSystem {
    constructor() {
        this.currentUser = {
            level: 1,
            xp: 0,
            streak: 0,
            badges: [],
            completedExercises: new Set(),
            timeSpent: 0,
            hintsUsed: 0
        };
        
        this.skills = {
            'O(1)': 0,
            'O(log n)': 0,
            'O(n)': 0,
            'O(n²)': 0,
            'O(n³)': 0,
            'O(2ⁿ)': 0
        };
        
        this.achievements = [
            {
                id: 'first_steps',
                name: 'Primeiros Passos',
                description: 'Complete seu primeiro exercício',
                icon: '🚀',
                requirement: (user) => user.completedExercises.size >= 1
            },
            {
                id: 'speed_demon',
                name: 'Demônio da Velocidade',
                description: 'Complete um exercício em menos de 2 minutos',
                icon: '⚡',
                requirement: (user, exerciseTime) => exerciseTime < 120
            },
            {
                id: 'perfectionist',
                name: 'Perfeccionista',
                description: 'Complete 5 exercícios sem usar dicas',
                icon: '💎',
                requirement: (user) => user.completedExercises.size >= 5 && user.hintsUsed === 0
            },
            {
                id: 'complexity_master',
                name: 'Mestre da Complexidade',
                description: 'Complete exercícios de todas as complexidades',
                icon: '🎓',
                requirement: (user) => Object.values(this.skills).every(skill => skill > 0)
            },
            {
                id: 'streak_warrior',
                name: 'Guerreiro da Sequência',
                description: 'Mantenha uma sequência de 10 exercícios corretos',
                icon: '🔥',
                requirement: (user) => user.streak >= 10
            }
        ];
        
        this.loadUserData();
        this.initializeAdvancedFeatures();
    }
    
    // Carrega dados do usuário do localStorage
    loadUserData() {
        const saved = localStorage.getItem('algorithmLearningData');
        if (saved) {
            const data = JSON.parse(saved);
            this.currentUser = { ...this.currentUser, ...data.user };
            this.skills = { ...this.skills, ...data.skills };
        }
    }
    
    // Salva dados do usuário
    saveUserData() {
        const data = {
            user: this.currentUser,
            skills: this.skills
        };
        localStorage.setItem('algorithmLearningData', JSON.stringify(data));
    }
    
    // Inicializa recursos avançados
    initializeAdvancedFeatures() {
        this.createSkillMeters();
        this.createFloatingHelp();
        this.createPerformanceDashboard();
        this.initializeCodeAnalyzer();
        this.setupKeyboardShortcuts();
    }
    
    // Cria medidores de habilidade
    createSkillMeters() {
        const container = document.createElement('div');
        container.className = 'skills-container';
        container.innerHTML = '<h3>📊 Progresso por Complexidade</h3>';
        
        Object.entries(this.skills).forEach(([complexity, level]) => {
            const skillMeter = document.createElement('div');
            skillMeter.className = 'skill-meter';
            
            const complexityClass = complexity.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
            
            skillMeter.innerHTML = `
                <div class="skill-name tooltip" data-tooltip="Exercícios de complexidade ${complexity}">
                    ${complexity}
                    <span class="complexity-indicator ${this.getComplexityClass(complexity)}">${complexity}</span>
                </div>
                <div class="skill-bar">
                    <div class="skill-progress ${complexityClass}" style="width: ${level * 20}%"></div>
                </div>
                <span class="xp-bar">Nível ${level}/5</span>
            `;
            
            container.appendChild(skillMeter);
        });
        
        // Insere após o progresso geral
        const progressContainer = document.querySelector('.progress-container');
        progressContainer.parentNode.insertBefore(container, progressContainer.nextSibling);
    }
    
    // Determina classe CSS para complexidade
    getComplexityClass(complexity) {
        const map = {
            'O(1)': 'constant',
            'O(log n)': 'logarithmic',
            'O(n)': 'linear',
            'O(n²)': 'quadratic',
            'O(n³)': 'cubic',
            'O(2ⁿ)': 'exponential'
        };
        return map[complexity] || 'linear';
    }
    
    // Cria botão de ajuda flutuante
    createFloatingHelp() {
        const helpButton = document.createElement('div');
        helpButton.className = 'floating-help';
        helpButton.innerHTML = '❓';
        helpButton.onclick = () => this.showHelpModal();
        
        document.body.appendChild(helpButton);
    }
    
    // Mostra modal de ajuda
    showHelpModal() {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        modal.innerHTML = `
            <div style="background: white; padding: 30px; border-radius: 15px; max-width: 600px; max-height: 80vh; overflow-y: auto;">
                <h2>🎯 Guia de Uso</h2>
                <h3>Atalhos do Teclado:</h3>
                <ul>
                    <li><kbd>Ctrl + Enter</kbd> - Executar código</li>
                    <li><kbd>Ctrl + T</kbd> - Testar solução</li>
                    <li><kbd>Ctrl + H</kbd> - Mostrar dica</li>
                    <li><kbd>Ctrl + N</kbd> - Próximo exercício</li>
                    <li><kbd>F1</kbd> - Ajuda</li>
                </ul>
                
                <h3>Sistema de Pontuação:</h3>
                <ul>
                    <li>Exercício correto: +10 XP</li>
                    <li>Sem usar dicas: +5 XP bônus</li>
                    <li>Tempo < 2 min: +3 XP bônus</li>
                    <li>Sequência: +1 XP por exercício consecutivo</li>
                </ul>
                
                <h3>Complexidades:</h3>
                <ul>
                    <li><span class="complexity-indicator constant">O(1)</span> Tempo constante</li>
                    <li><span class="complexity-indicator logarithmic">O(log n)</span> Tempo logarítmico</li>
                    <li><span class="complexity-indicator linear">O(n)</span> Tempo linear</li>
                    <li><span class="complexity-indicator quadratic">O(n²)</span> Tempo quadrático</li>
                    <li><span class="complexity-indicator cubic">O(n³)</span> Tempo cúbico</li>
                    <li><span class="complexity-indicator exponential">O(2ⁿ)</span> Tempo exponencial</li>
                </ul>
                
                <button onclick="this.parentElement.parentElement.remove()" 
                        style="background: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 20px;">
                    Fechar
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.onclick = (e) => {
            if (e.target === modal) modal.remove();
        };
    }
    
    // Cria dashboard de performance
    createPerformanceDashboard() {
        const dashboard = document.createElement('div');
        dashboard.className = 'performance-dashboard';
        dashboard.innerHTML = `
            <h3>⚡ Performance em Tempo Real</h3>
            <div id="live-stats">
                <div class="stat-item">
                    <span class="stat-label">Tempo Médio:</span>
                    <span class="stat-value" id="avg-time">--</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Taxa de Acerto:</span>
                    <span class="stat-value" id="success-rate">--</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Eficiência:</span>
                    <div class="performance-meter">
                        <div class="performance-bar">
                            <div class="performance-fill performance-excellent" id="efficiency-bar" style="width: 0%"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Adiciona após a visualização
        const vizPanel = document.querySelector('.visualization-panel');
        vizPanel.appendChild(dashboard);
    }
    
    // Inicializa analisador de código
    initializeCodeAnalyzer() {
        this.codePatterns = {
            'O(1)': [
                /return\s+\w+\[0\]/,
                /return\s+\w+\[\d+\]/,
                /^\s*return\s+[\w\.\[\]]+\s*;?\s*$/m
            ],
            'O(n)': [
                /for\s*\([^)]*i\s*<\s*\w+[^)]*\)/,
                /while\s*\([^)]*i\s*<\s*\w+[^)]*\)/,
                /for\s*\([^)]*\w+\s*<\s*tamanho[^)]*\)/
            ],
            'O(log n)': [
                /while\s*\([^)]*inicio\s*<=\s*fim[^)]*\)/,
                /meio\s*=.*\/\s*2/,
                /binary|binaria/i
            ],
            'O(n²)': [
                /for\s*\([^}]*for\s*\(/,
                /for.*{[^}]*for/,
                /bubble|selection/i
            ]
        };
    }
    
    // Analisa complexidade do código
    analyzeCodeComplexity(code) {
        for (const [complexity, patterns] of Object.entries(this.codePatterns)) {
            for (const pattern of patterns) {
                if (pattern.test(code)) {
                    return complexity;
                }
            }
        }
        return 'Unknown';
    }
    
    // Configura atalhos do teclado
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'Enter':
                        e.preventDefault();
                        this.runCodeWithAnalysis();
                        break;
                    case 't':
                        e.preventDefault();
                        this.testSolutionAdvanced();
                        break;
                    case 'h':
                        e.preventDefault();
                        this.showHintWithPenalty();
                        break;
                    case 'n':
                        e.preventDefault();
                        this.nextExerciseWithReward();
                        break;
                }
            } else if (e.key === 'F1') {
                e.preventDefault();
                this.showHelpModal();
            }
        });
    }
    
    // Executa código com análise avançada
    runCodeWithAnalysis() {
        const code = editor.getValue();
        const startTime = Date.now();
        
        // Análise de complexidade
        const detectedComplexity = this.analyzeCodeComplexity(code);
        const currentExercise = exercises[currentLevel][currentExercise];
        
        // Simula execução com feedback visual
        this.simulateCodeExecution(code, () => {
            const endTime = Date.now();
            const executionTime = endTime - startTime;
            
            // Atualiza estatísticas
            this.updateExecutionStats(executionTime, detectedComplexity);
            
            // Feedback sobre complexidade
            this.showComplexityFeedback(detectedComplexity, currentExercise.complexity);
        });
    }
    
    // Simula execução do código com efeitos visuais
    simulateCodeExecution(code, callback) {
        const codeEditor = document.querySelector('.code-editor');
        codeEditor.classList.add('executing');
        
        // Simula highlight das linhas
        const lines = code.split('\n');
        let currentLine = 0;
        
        const highlightInterval = setInterval(() => {
            if (currentLine < lines.length) {
                this.highlightCodeLine(currentLine);
                currentLine++;
            } else {
                clearInterval(highlightInterval);
                codeEditor.classList.remove('executing');
                callback();
            }
        }, 200);
    }
    
    // Destaca linha de código
    highlightCodeLine(lineNumber) {
        // Implementação específica do CodeMirror
        if (window.editor) {
            editor.addLineClass(lineNumber, 'background', 'code-line-highlight');
            setTimeout(() => {
                editor.removeLineClass(lineNumber, 'background', 'code-line-highlight');
            }, 500);
        }
    }
    
    // Testa solução com sistema avançado
    testSolutionAdvanced() {
        const startTime = Date.now();
        const code = editor.getValue();
        
        // Executa testes existentes
        testSolution();
        
        // Calcula pontuação
        setTimeout(() => {
            const endTime = Date.now();
            const exerciseTime = (endTime - startTime) / 1000;
            
            this.calculateAndAwardPoints(exerciseTime, code);
        }, 2000);
    }
    
    // Calcula e concede pontos
    calculateAndAwardPoints(exerciseTime, code) {
        let points = 0;
        let bonuses = [];
        
        // Pontos base por completar exercício
        points += 10;
        
        // Bônus por velocidade
        if (exerciseTime < 120) {
            points += 3;
            bonuses.push('⚡ Velocidade');
        }
        
        // Bônus por não usar dicas
        if (this.currentUser.hintsUsed === 0) {
            points += 5;
            bonuses.push('💎 Sem Dicas');
        }
        
        // Bônus por sequência
        points += this.currentUser.streak;
        if (this.currentUser.streak > 0) {
            bonuses.push(`🔥 Sequência x${this.currentUser.streak}`);
        }
        
        // Atualiza usuário
        this.currentUser.xp += points;
        this.currentUser.streak++;
        this.currentUser.completedExercises.add(`${currentLevel}-${currentExercise}`);
        
        // Atualiza habilidades
        const currentEx = exercises[currentLevel][currentExercise];
        const complexity = this.extractComplexity(currentEx.complexity);
        if (this.skills[complexity] < 5) {
            this.skills[complexity]++;
        }
        
        // Mostra feedback de pontos
        this.showPointsFeedback(points, bonuses);
        
        // Verifica conquistas
        this.checkAchievements(exerciseTime);
        
        // Salva dados
        this.saveUserData();
        
        // Atualiza interface
        this.updateSkillMeters();
    }
    
    // Extrai complexidade do texto
    extractComplexity(complexityText) {
        const match = complexityText.match(/O\([^)]+\)/);
        return match ? match[0] : 'O(n)';
    }
    
    // Mostra feedback de pontos
    showPointsFeedback(points, bonuses) {
        const feedback = document.createElement('div');
        feedback.className = 'success-feedback';
        feedback.innerHTML = `
            <div style="text-align: center;">
                <h3>🎉 +${points} XP</h3>
                ${bonuses.length > 0 ? `<p>Bônus: ${bonuses.join(', ')}</p>` : ''}
                <p>XP Total: ${this.currentUser.xp} | Sequência: ${this.currentUser.streak}</p>
            </div>
        `;
        
        const container = document.querySelector('.exercise-container');
        container.insertBefore(feedback, container.firstChild);
        
        // Efeito de partículas
        this.createParticleEffect();
        
        setTimeout(() => feedback.remove(), 4000);
    }
    
    // Cria efeito de partículas
    createParticleEffect() {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * window.innerWidth + 'px';
                particle.style.top = window.innerHeight + 'px';
                particle.style.background = ['#f39c12', '#e74c3c', '#9b59b6', '#3498db'][Math.floor(Math.random() * 4)];
                
                document.body.appendChild(particle);
                
                setTimeout(() => particle.remove(), 3000);
            }, i * 100);
        }
    }
    
    // Verifica conquistas
    checkAchievements(exerciseTime) {
        this.achievements.forEach(achievement => {
            if (!this.currentUser.badges.includes(achievement.id)) {
                if (achievement.requirement(this.currentUser, exerciseTime)) {
                    this.unlockAchievement(achievement);
                }
            }
        });
    }
    
    // Desbloqueia conquista
    unlockAchievement(achievement) {
        this.currentUser.badges.push(achievement.id);
        
        const modal = document.createElement('div');
        modal.className = 'achievement-blast';
        modal.innerHTML = `
            <div style="background: linear-gradient(45deg, #f39c12, #e67e22); color: white; padding: 30px; border-radius: 15px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                <div style="font-size: 4em; margin-bottom: 10px;">${achievement.icon}</div>
                <h2>Conquista Desbloqueada!</h2>
                <h3>${achievement.name}</h3>
                <p>${achievement.description}</p>
                <button onclick="this.parentElement.parentElement.remove()" 
                        style="background: white; color: #e67e22; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 15px; font-weight: bold;">
                    Incrível!
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Efeito de fogos de artifício
        this.createFireworkEffect();
        
        setTimeout(() => {
            if (modal.parentNode) modal.remove();
        }, 10000);
    }
    
    // Cria efeito de fogos de artifício
    createFireworkEffect() {
        const colors = ['#e74c3c', '#f39c12', '#27ae60', '#3498db', '#9b59b6'];
        
        for (let burst = 0; burst < 3; burst++) {
            setTimeout(() => {
                const centerX = Math.random() * window.innerWidth;
                const centerY = Math.random() * (window.innerHeight / 2) + 100;
                
                for (let i = 0; i < 15; i++) {
                    const firework = document.createElement('div');
                    firework.className = 'firework';
                    firework.style.left = centerX + 'px';
                    firework.style.top = centerY + 'px';
                    firework.style.background = colors[Math.floor(Math.random() * colors.length)];
                    
                    const angle = (i / 15) * 2 * Math.PI;
                    const distance = 100 + Math.random() * 100;
                    const dx = Math.cos(angle) * distance;
                    const dy = Math.sin(angle) * distance;
                    
                    firework.style.setProperty('--dx', dx + 'px');
                    firework.style.setProperty('--dy', dy + 'px');
                    
                    document.body.appendChild(firework);
                    
                    setTimeout(() => firework.remove(), 1500);
                }
            }, burst * 500);
        }
    }
    
    // Mostra dica com penalidade
    showHintWithPenalty() {
        this.currentUser.hintsUsed++;
        showHint(); // Função original
        
        // Feedback sobre penalidade
        const penalty = document.createElement('div');
        penalty.style.cssText = `
            background: #f39c12;
            color: white;
            padding: 10px;
            border-radius: 5px;
            margin: 10px 0;
            text-align: center;
            animation: fadeIn 0.3s ease;
        `;
        penalty.textContent = '💡 Dica usada! Bônus "Sem Dicas" perdido para este exercício.';
        
        document.getElementById('hintPanel').appendChild(penalty);
        setTimeout(() => penalty.remove(), 3000);
    }
    
    // Próximo exercício com recompensa
    nextExerciseWithReward() {
        // Executa função original
        nextExercise();
        
        // Reset do contador de dicas
        this.currentUser.hintsUsed = 0;
        
        // Efeito de transição
        const panels = document.querySelectorAll('.exercise-panel');
        panels.forEach(panel => {
            panel.classList.add('exercise-transition');
            setTimeout(() => {
                panel.classList.remove('exercise-transition');
                panel.classList.add('active');
            }, 300);
        });
    }
    
    // Atualiza medidores de habilidade
    updateSkillMeters() {
        Object.entries(this.skills).forEach(([complexity, level]) => {
            const complexityClass = complexity.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
            const progressBar = document.querySelector(`.skill-progress.${complexityClass}`);
            const xpDisplay = progressBar?.parentElement.parentElement.querySelector('.xp-bar');
            
            if (progressBar) {
                progressBar.style.width = `${level * 20}%`;
            }
            if (xpDisplay) {
                xpDisplay.textContent = `Nível ${level}/5`;
            }
        });
    }
    
    // Atualiza estatísticas de execução
    updateExecutionStats(executionTime, complexity) {
        // Simula atualização de estatísticas
        document.getElementById('avg-time').textContent = `${(executionTime / 1000).toFixed(2)}s`;
        document.getElementById('success-rate').textContent = '95%';
        
        const efficiency = Math.max(0, 100 - (executionTime / 10));
        const efficiencyBar = document.getElementById('efficiency-bar');
        if (efficiencyBar) {
            efficiencyBar.style.width = `${efficiency}%`;
            
            // Atualiza classe baseada na eficiência
            efficiencyBar.className = 'performance-fill ' + 
                (efficiency > 80 ? 'performance-excellent' : 
                 efficiency > 60 ? 'performance-good' : 'performance-poor');
        }
    }
    
    // Mostra feedback sobre complexidade
    showComplexityFeedback(detected, expected) {
        const feedback = document.createElement('div');
        feedback.className = 'complexity-feedback';
        feedback.style.cssText = `
            background: ${detected === expected.split(' ')[0] ? '#27ae60' : '#f39c12'};
            color: white;
            padding: 15px;
            border-radius: 8px;
            margin: 10px 0;
            text-align: center;
        `;
        
        if (detected === expected.split(' ')[0]) {
            feedback.innerHTML = `
                <strong>✅ Complexidade Correta!</strong><br>
                Detectado: ${detected} | Esperado: ${expected}
            `;
        } else {
            feedback.innerHTML = `
                <strong>⚠️ Verifique a Complexidade</strong><br>
                Detectado: ${detected} | Esperado: ${expected}<br>
                <small>Sua implementação pode não estar otimizada.</small>
            `;
        }
        
        document.getElementById('output').appendChild(feedback);
        setTimeout(() => feedback.remove(), 5000);
    }
}

// Inicializa o sistema quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    window.algorithmSystem = new AlgorithmLearningSystem();
    
    // Substitui funções globais para integrar com o sistema
    const originalRunCode = window.runCode;
    const originalTestSolution = window.testSolution;
    const originalShowHint = window.showHint;
    const originalNextExercise = window.nextExercise;
    
    window.runCode = function() {
        window.algorithmSystem.runCodeWithAnalysis();
    };
    
    window.testSolution = function() {
        window.algorithmSystem.testSolutionAdvanced();
    };
    
    window.showHint = function() {
        window.algorithmSystem.showHintWithPenalty();
    };
    
    window.nextExercise = function() {
        window.algorithmSystem.nextExerciseWithReward();
    };
});

// Utilitários adicionais
const AlgorithmUtils = {
    // Mede performance real de código JavaScript
    measurePerformance: function(fn, iterations = 1000) {
        const start = performance.now();
        for (let i = 0; i < iterations; i++) {
            fn();
        }
        const end = performance.now();
        return (end - start) / iterations;
    },
    
    // Gera dados de teste aleatórios
    generateTestData: function(size, type = 'array') {
        switch (type) {
            case 'array':
                return Array.from({length: size}, () => Math.floor(Math.random() * 100));
            case 'sorted':
                return Array.from({length: size}, (_, i) => i + 1);
            case 'reverse':
                return Array.from({length: size}, (_, i) => size - i);
            default:
                return [];
        }
    },
    
    // Visualiza complexidade em tempo real
    visualizeComplexity: function(data) {
        // Implementação para gráficos em tempo real
        console.log('Visualizing complexity data:', data);
    },
    
    // Exporta progresso do usuário
    exportProgress: function() {
        const data = {
            user: window.algorithmSystem.currentUser,
            skills: window.algorithmSystem.skills,
            timestamp: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'algorithm-learning-progress.json';
        a.click();
        
        URL.revokeObjectURL(url);
    }
};
