/**
 * SISTEMA DE GAMIFICAÇÃO AVANÇADO
 * Sistema completo de gamificação educacional com conquistas, badges,
 * pontuação inteligente, rankings e progressão didática
 */

// Constantes de Gamificação
const GAMIFICATION_CONFIG = {
    points: {
        execution: 10,
        stepComplete: 5,
        speedMastery: 25,
        algorithm_complete: 50,
        comparison_complete: 75,
        annotation_created: 15,
        quiz_correct: 20,
        first_time_bonus: 100,
        perfection_bonus: 200,
        teaching_mode: 30,
        challenge_complete: 150
    },
    levels: [
        { name: 'Iniciante', minPoints: 0, color: '#94a3b8' },
        { name: 'Aprendiz', minPoints: 200, color: '#10b981' },
        { name: 'Praticante', minPoints: 500, color: '#3b82f6' },
        { name: 'Experiente', minPoints: 1000, color: '#8b5cf6' },
        { name: 'Expert', minPoints: 2000, color: '#f59e0b' },
        { name: 'Mestre', minPoints: 3500, color: '#ef4444' },
        { name: 'Guru', minPoints: 5000, color: '#fbbf24' },
        { name: 'Lenda', minPoints: 8000, color: '#8b5cf6' }
    ]
};

class GamificationSystem {
    constructor() {
        this.playerData = this.loadPlayerData();
        this.achievements = this.initializeAchievements();
        this.challenges = this.initializeChallenges();
        this.streaks = { daily: 0, weekly: 0, perfect: 0 };
        this.sessionStats = {
            executionsCount: 0,
            algorithmsLearned: new Set(),
            perfectRuns: 0,
            questionsAnswered: 0,
            annotationsCreated: 0
        };
        
        this.initializeUI();
        this.startSessionTracking();
    }

    loadPlayerData() {
        const saved = localStorage.getItem('gamification_player_data');
        if (saved) {
            return JSON.parse(saved);
        }
        
        return {
            totalPoints: 0,
            level: 0,
            badges: [],
            achievements: {},
            statistics: {
                algorithmsCompleted: new Set(),
                totalExecutions: 0,
                totalTime: 0,
                comparisonsCompleted: 0,
                annotationsCreated: 0,
                quizScore: 0,
                perfectRuns: 0,
                teachingModeTime: 0
            },
            streaks: { daily: 0, weekly: 0, perfect: 0 },
            lastActive: new Date().toISOString(),
            joinDate: new Date().toISOString()
        };
    }

    initializeAchievements() {
        return {
            // Primeiros Passos
            first_execution: {
                id: 'first_execution',
                name: 'Primeiro Passo',
                description: 'Execute seu primeiro algoritmo',
                icon: '🚀',
                points: 50,
                category: 'iniciante',
                unlocked: false
            },
            first_annotation: {
                id: 'first_annotation',
                name: 'Anotador',
                description: 'Crie sua primeira anotação',
                icon: '📝',
                points: 30,
                category: 'iniciante',
                unlocked: false
            },
            
            // Execução
            speed_demon: {
                id: 'speed_demon',
                name: 'Demônio da Velocidade',
                description: 'Execute 10 algoritmos na velocidade máxima',
                icon: '⚡',
                points: 100,
                category: 'execucao',
                progress: 0,
                target: 10,
                unlocked: false
            },
            slow_learner: {
                id: 'slow_learner',
                name: 'Aprendizado Contemplativo',
                description: 'Execute um algoritmo completo na velocidade ultra lenta',
                icon: '🐌',
                points: 75,
                category: 'execucao',
                unlocked: false
            },
            
            // Algoritmos
            bubble_master: {
                id: 'bubble_master',
                name: 'Mestre do Bubble Sort',
                description: 'Execute Bubble Sort 5 vezes perfeitamente',
                icon: '🫧',
                points: 80,
                category: 'algoritmos',
                progress: 0,
                target: 5,
                unlocked: false
            },
            selection_expert: {
                id: 'selection_expert',
                name: 'Expert em Selection Sort',
                description: 'Execute Selection Sort 5 vezes perfeitamente',
                icon: '🎯',
                points: 80,
                category: 'algoritmos',
                progress: 0,
                target: 5,
                unlocked: false
            },
            insertion_pro: {
                id: 'insertion_pro',
                name: 'Profissional do Insertion Sort',
                description: 'Execute Insertion Sort 5 vezes perfeitamente',
                icon: '📌',
                points: 80,
                category: 'algoritmos',
                progress: 0,
                target: 5,
                unlocked: false
            },
            merge_genius: {
                id: 'merge_genius',
                name: 'Gênio do Merge Sort',
                description: 'Execute Merge Sort 3 vezes perfeitamente',
                icon: '🔀',
                points: 120,
                category: 'algoritmos',
                progress: 0,
                target: 3,
                unlocked: false
            },
            quick_wizard: {
                id: 'quick_wizard',
                name: 'Bruxo do Quick Sort',
                description: 'Execute Quick Sort 3 vezes perfeitamente',
                icon: '⚡',
                points: 120,
                category: 'algoritmos',
                progress: 0,
                target: 3,
                unlocked: false
            },
            
            // Comparações
            comparison_rookie: {
                id: 'comparison_rookie',
                name: 'Novato em Comparações',
                description: 'Complete sua primeira comparação dual',
                icon: '⚖️',
                points: 60,
                category: 'comparacao',
                unlocked: false
            },
            comparison_expert: {
                id: 'comparison_expert',
                name: 'Expert em Comparações',
                description: 'Complete 10 comparações duais',
                icon: '🏆',
                points: 150,
                category: 'comparacao',
                progress: 0,
                target: 10,
                unlocked: false
            },
            
            // Educacional
            quiz_master: {
                id: 'quiz_master',
                name: 'Mestre dos Quizzes',
                description: 'Responda 25 perguntas do modo professor corretamente',
                icon: '🧠',
                points: 200,
                category: 'educacional',
                progress: 0,
                target: 25,
                unlocked: false
            },
            teacher_mode: {
                id: 'teacher_mode',
                name: 'Modo Professor',
                description: 'Passe 30 minutos no modo professor',
                icon: '👨‍🏫',
                points: 150,
                category: 'educacional',
                progress: 0,
                target: 30 * 60, // 30 minutos em segundos
                unlocked: false
            },
            
            // Perfeição
            perfectionist: {
                id: 'perfectionist',
                name: 'Perfeccionista',
                description: 'Complete 10 execuções perfeitas consecutivas',
                icon: '💎',
                points: 300,
                category: 'perfeicao',
                progress: 0,
                target: 10,
                unlocked: false
            },
            flawless_week: {
                id: 'flawless_week',
                name: 'Semana Impecável',
                description: 'Use a plataforma por 7 dias consecutivos',
                icon: '🗓️',
                points: 250,
                category: 'perfeicao',
                progress: 0,
                target: 7,
                unlocked: false
            },
            
            // Explorador
            algorithm_explorer: {
                id: 'algorithm_explorer',
                name: 'Explorador de Algoritmos',
                description: 'Execute todos os algoritmos disponíveis',
                icon: '🗺️',
                points: 200,
                category: 'explorador',
                progress: 0,
                target: 5, // Número de algoritmos disponíveis
                unlocked: false
            },
            test_generator_pro: {
                id: 'test_generator_pro',
                name: 'Pro dos Casos de Teste',
                description: 'Gere 20 casos de teste diferentes',
                icon: '🧪',
                points: 120,
                category: 'explorador',
                progress: 0,
                target: 20,
                unlocked: false
            },
            
            // Lendárias
            time_master: {
                id: 'time_master',
                name: 'Mestre do Tempo',
                description: 'Passe mais de 5 horas aprendendo',
                icon: '⏰',
                points: 500,
                category: 'lendaria',
                progress: 0,
                target: 5 * 3600, // 5 horas em segundos
                unlocked: false
            },
            knowledge_seeker: {
                id: 'knowledge_seeker',
                name: 'Buscador do Conhecimento',
                description: 'Ganhe 5000 pontos totais',
                icon: '🔍',
                points: 1000,
                category: 'lendaria',
                progress: 0,
                target: 5000,
                unlocked: false
            }
        };
    }

    initializeChallenges() {
        return {
            daily: {
                name: 'Desafio Diário',
                description: 'Execute 3 algoritmos diferentes hoje',
                progress: 0,
                target: 3,
                points: 100,
                expires: this.getEndOfDay(),
                active: true
            },
            weekly: {
                name: 'Desafio Semanal',
                description: 'Complete 15 execuções esta semana',
                progress: 0,
                target: 15,
                points: 300,
                expires: this.getEndOfWeek(),
                active: true
            },
            perfect: {
                name: 'Desafio Perfeito',
                description: 'Faça 5 execuções perfeitas consecutivas',
                progress: 0,
                target: 5,
                points: 200,
                expires: this.getEndOfDay(),
                active: true
            }
        };
    }

    initializeUI() {
        // Criar painel de gamificação
        this.createGamificationPanel();
        this.updateUI();
    }

    createGamificationPanel() {
        const panel = document.createElement('div');
        panel.className = 'gamification-panel';
        panel.innerHTML = `
            <div class="gamification-header">
                <div class="player-info">
                    <div class="player-level">
                        <span class="level-badge" id="playerLevel">Lv. 1</span>
                        <span class="level-name" id="levelName">Iniciante</span>
                    </div>
                    <div class="player-points">
                        <span id="totalPoints">0</span> XP
                    </div>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-bar" id="levelProgress">
                        <div class="progress-fill"></div>
                    </div>
                    <span class="progress-text" id="progressText">0/200 XP</span>
                </div>
            </div>

            <div class="gamification-tabs">
                <button class="tab-btn active" data-tab="achievements">Conquistas</button>
                <button class="tab-btn" data-tab="challenges">Desafios</button>
                <button class="tab-btn" data-tab="stats">Estatísticas</button>
                <button class="tab-btn" data-tab="leaderboard">Ranking</button>
            </div>

            <div class="gamification-content">
                <div class="tab-content active" id="achievements">
                    <div class="achievements-grid" id="achievementsList"></div>
                </div>
                
                <div class="tab-content" id="challenges">
                    <div class="challenges-list" id="challengesList"></div>
                </div>
                
                <div class="tab-content" id="stats">
                    <div class="stats-grid" id="statsGrid"></div>
                </div>
                
                <div class="tab-content" id="leaderboard">
                    <div class="leaderboard-list" id="leaderboardList"></div>
                </div>
            </div>

            <div class="recent-achievements" id="recentAchievements"></div>
        `;

        // Adicionar ao DOM
        document.querySelector('.right-panel').appendChild(panel);

        // Adicionar event listeners
        panel.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });
    }

    switchTab(tabName) {
        // Atualizar botões
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabName);
        });

        // Atualizar conteúdo
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.toggle('active', content.id === tabName);
        });

        // Atualizar conteúdo específico
        if (tabName === 'achievements') {
            this.updateAchievements();
        } else if (tabName === 'challenges') {
            this.updateChallenges();
        } else if (tabName === 'stats') {
            this.updateStats();
        } else if (tabName === 'leaderboard') {
            this.updateLeaderboard();
        }
    }

    // Sistema de Pontuação
    addPoints(amount, reason = '') {
        this.playerData.totalPoints += amount;
        this.sessionStats.totalPoints = (this.sessionStats.totalPoints || 0) + amount;
        
        const oldLevel = this.getCurrentLevel();
        const newLevel = this.getCurrentLevel();
        
        this.showPointsNotification(amount, reason);
        
        if (oldLevel.level !== newLevel.level) {
            this.showLevelUpNotification(newLevel);
        }
        
        this.updateUI();
        this.savePlayerData();
    }

    getCurrentLevel() {
        const points = this.playerData.totalPoints;
        for (let i = GAMIFICATION_CONFIG.levels.length - 1; i >= 0; i--) {
            const level = GAMIFICATION_CONFIG.levels[i];
            if (points >= level.minPoints) {
                return { ...level, level: i + 1 };
            }
        }
        return { ...GAMIFICATION_CONFIG.levels[0], level: 1 };
    }

    // Eventos de Gamificação
    onAlgorithmExecution(algorithmName) {
        this.sessionStats.executionsCount++;
        this.sessionStats.algorithmsLearned.add(algorithmName);
        this.playerData.statistics.totalExecutions++;
        this.playerData.statistics.algorithmsCompleted.add(algorithmName);
        
        this.addPoints(GAMIFICATION_CONFIG.points.execution, 'Execução de Algoritmo');
        this.updateChallengeProgress('daily', 1);
        this.updateChallengeProgress('weekly', 1);
        
        // Verificar conquistas
        this.checkAchievement('first_execution');
        this.checkAchievement('algorithm_explorer');
        
        // Conquistas específicas de algoritmo
        if (algorithmName.toLowerCase().includes('bubble')) {
            this.updateAchievementProgress('bubble_master', 1);
        } else if (algorithmName.toLowerCase().includes('selection')) {
            this.updateAchievementProgress('selection_expert', 1);
        } else if (algorithmName.toLowerCase().includes('insertion')) {
            this.updateAchievementProgress('insertion_pro', 1);
        } else if (algorithmName.toLowerCase().includes('merge')) {
            this.updateAchievementProgress('merge_genius', 1);
        } else if (algorithmName.toLowerCase().includes('quick')) {
            this.updateAchievementProgress('quick_wizard', 1);
        }
    }

    onStepComplete() {
        this.addPoints(GAMIFICATION_CONFIG.points.stepComplete, 'Passo Completado');
    }

    onSpeedMastery(speed) {
        if (speed === 'instantaneo') {
            this.updateAchievementProgress('speed_demon', 1);
        } else if (speed === 'ultra-lento') {
            this.checkAchievement('slow_learner');
        }
        this.addPoints(GAMIFICATION_CONFIG.points.speedMastery, 'Maestria de Velocidade');
    }

    onPerfectRun() {
        this.sessionStats.perfectRuns++;
        this.playerData.statistics.perfectRuns++;
        this.addPoints(GAMIFICATION_CONFIG.points.perfection_bonus, 'Execução Perfeita');
        
        this.updateAchievementProgress('perfectionist', 1);
        this.updateChallengeProgress('perfect', 1);
    }

    onAnnotationCreated() {
        this.sessionStats.annotationsCreated++;
        this.playerData.statistics.annotationsCreated++;
        this.addPoints(GAMIFICATION_CONFIG.points.annotation_created, 'Anotação Criada');
        this.checkAchievement('first_annotation');
    }

    onQuizAnswer(correct) {
        if (correct) {
            this.sessionStats.questionsAnswered++;
            this.playerData.statistics.quizScore++;
            this.addPoints(GAMIFICATION_CONFIG.points.quiz_correct, 'Resposta Correta');
            this.updateAchievementProgress('quiz_master', 1);
        }
    }

    onComparisonComplete() {
        this.playerData.statistics.comparisonsCompleted++;
        this.addPoints(GAMIFICATION_CONFIG.points.comparison_complete, 'Comparação Completa');
        this.checkAchievement('comparison_rookie');
        this.updateAchievementProgress('comparison_expert', 1);
    }

    onTeachingModeTime(seconds) {
        this.playerData.statistics.teachingModeTime += seconds;
        this.addPoints(GAMIFICATION_CONFIG.points.teaching_mode, 'Modo Professor');
        this.updateAchievementProgress('teacher_mode', seconds);
    }

    onTestCaseGenerated() {
        this.updateAchievementProgress('test_generator_pro', 1);
    }

    // Sistema de Conquistas
    checkAchievement(achievementId) {
        const achievement = this.achievements[achievementId];
        if (!achievement || achievement.unlocked) return;

        let unlock = false;
        
        switch (achievementId) {
            case 'first_execution':
                unlock = this.playerData.statistics.totalExecutions > 0;
                break;
            case 'first_annotation':
                unlock = this.playerData.statistics.annotationsCreated > 0;
                break;
            case 'slow_learner':
                unlock = true; // Será chamado apenas quando apropriado
                break;
            case 'comparison_rookie':
                unlock = this.playerData.statistics.comparisonsCompleted > 0;
                break;
            case 'algorithm_explorer':
                unlock = this.playerData.statistics.algorithmsCompleted.size >= achievement.target;
                break;
        }

        if (unlock) {
            this.unlockAchievement(achievementId);
        }
    }

    updateAchievementProgress(achievementId, increment = 1) {
        const achievement = this.achievements[achievementId];
        if (!achievement || achievement.unlocked) return;

        achievement.progress = (achievement.progress || 0) + increment;
        
        if (achievement.progress >= achievement.target) {
            this.unlockAchievement(achievementId);
        }
    }

    unlockAchievement(achievementId) {
        const achievement = this.achievements[achievementId];
        if (!achievement || achievement.unlocked) return;

        achievement.unlocked = true;
        achievement.unlockedAt = new Date().toISOString();
        
        this.playerData.badges.push({
            id: achievementId,
            unlockedAt: achievement.unlockedAt
        });

        this.addPoints(achievement.points, `Conquista: ${achievement.name}`);
        this.showAchievementNotification(achievement);
        this.updateUI();
    }

    // Sistema de Desafios
    updateChallengeProgress(challengeType, increment = 1) {
        const challenge = this.challenges[challengeType];
        if (!challenge || !challenge.active) return;

        challenge.progress += increment;
        
        if (challenge.progress >= challenge.target) {
            this.completeChallenge(challengeType);
        }
    }

    completeChallenge(challengeType) {
        const challenge = this.challenges[challengeType];
        if (!challenge) return;

        challenge.active = false;
        challenge.completedAt = new Date().toISOString();
        
        this.addPoints(challenge.points, `Desafio: ${challenge.name}`);
        this.showChallengeNotification(challenge);
        
        // Resetar desafio para próximo período
        setTimeout(() => {
            this.resetChallenge(challengeType);
        }, 5000);
    }

    resetChallenge(challengeType) {
        const challenge = this.challenges[challengeType];
        if (!challenge) return;

        challenge.progress = 0;
        challenge.active = true;
        delete challenge.completedAt;
        
        // Atualizar data de expiração
        if (challengeType === 'daily') {
            challenge.expires = this.getEndOfDay();
        } else if (challengeType === 'weekly') {
            challenge.expires = this.getEndOfWeek();
        }
    }

    // Notificações
    showPointsNotification(points, reason) {
        this.showNotification(`+${points} XP`, reason, 'points');
    }

    showLevelUpNotification(level) {
        this.showNotification(
            `Level Up! Nível ${level.level}`,
            level.name,
            'levelup'
        );
    }

    showAchievementNotification(achievement) {
        this.showNotification(
            `${achievement.icon} Conquista Desbloqueada!`,
            achievement.name,
            'achievement'
        );
    }

    showChallengeNotification(challenge) {
        this.showNotification(
            `🏆 Desafio Completo!`,
            challenge.name,
            'challenge'
        );
    }

    showNotification(title, subtitle, type) {
        const notification = document.createElement('div');
        notification.className = `gamification-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-title">${title}</div>
            <div class="notification-subtitle">${subtitle}</div>
        `;

        document.body.appendChild(notification);

        // Animação de entrada
        requestAnimationFrame(() => {
            notification.classList.add('show');
        });

        // Remover após 3 segundos
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Atualização da UI
    updateUI() {
        this.updatePlayerInfo();
        this.updateAchievements();
        this.updateChallenges();
        this.updateStats();
    }

    updatePlayerInfo() {
        const level = this.getCurrentLevel();
        const nextLevel = GAMIFICATION_CONFIG.levels[level.level] || level;
        const progress = this.playerData.totalPoints - level.minPoints;
        const maxProgress = nextLevel.minPoints - level.minPoints;
        const progressPercent = Math.min((progress / maxProgress) * 100, 100);

        document.getElementById('playerLevel').textContent = `Lv. ${level.level}`;
        document.getElementById('levelName').textContent = level.name;
        document.getElementById('totalPoints').textContent = this.playerData.totalPoints;
        
        const progressBar = document.querySelector('#levelProgress .progress-fill');
        if (progressBar) {
            progressBar.style.width = `${progressPercent}%`;
            progressBar.style.backgroundColor = level.color;
        }

        const progressText = document.getElementById('progressText');
        if (progressText) {
            if (level.level === GAMIFICATION_CONFIG.levels.length) {
                progressText.textContent = 'Nível Máximo!';
            } else {
                progressText.textContent = `${progress}/${maxProgress} XP`;
            }
        }
    }

    updateAchievements() {
        const container = document.getElementById('achievementsList');
        if (!container) return;

        const categories = [...new Set(Object.values(this.achievements).map(a => a.category))];
        
        container.innerHTML = categories.map(category => {
            const categoryAchievements = Object.values(this.achievements)
                .filter(a => a.category === category);
            
            return `
                <div class="achievement-category">
                    <h3>${this.getCategoryName(category)}</h3>
                    <div class="achievements-row">
                        ${categoryAchievements.map(achievement => `
                            <div class="achievement-card ${achievement.unlocked ? 'unlocked' : ''}">
                                <div class="achievement-icon">${achievement.icon}</div>
                                <div class="achievement-info">
                                    <div class="achievement-name">${achievement.name}</div>
                                    <div class="achievement-description">${achievement.description}</div>
                                    ${achievement.target ? `
                                        <div class="achievement-progress">
                                            <div class="progress-bar small">
                                                <div class="progress-fill" style="width: ${((achievement.progress || 0) / achievement.target) * 100}%"></div>
                                            </div>
                                            <span>${achievement.progress || 0}/${achievement.target}</span>
                                        </div>
                                    ` : ''}
                                    <div class="achievement-points">+${achievement.points} XP</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }).join('');
    }

    updateChallenges() {
        const container = document.getElementById('challengesList');
        if (!container) return;

        container.innerHTML = Object.entries(this.challenges).map(([type, challenge]) => `
            <div class="challenge-card ${challenge.active ? 'active' : 'completed'}">
                <div class="challenge-info">
                    <h3>${challenge.name}</h3>
                    <p>${challenge.description}</p>
                    <div class="challenge-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${(challenge.progress / challenge.target) * 100}%"></div>
                        </div>
                        <span>${challenge.progress}/${challenge.target}</span>
                    </div>
                    <div class="challenge-reward">Recompensa: +${challenge.points} XP</div>
                    ${challenge.expires ? `
                        <div class="challenge-expires">Expira: ${this.formatDate(challenge.expires)}</div>
                    ` : ''}
                </div>
            </div>
        `).join('');
    }

    updateStats() {
        const container = document.getElementById('statsGrid');
        if (!container) return;

        const stats = [
            { label: 'Execuções Totais', value: this.playerData.statistics.totalExecutions },
            { label: 'Algoritmos Dominados', value: this.playerData.statistics.algorithmsCompleted.size },
            { label: 'Execuções Perfeitas', value: this.playerData.statistics.perfectRuns },
            { label: 'Comparações Completas', value: this.playerData.statistics.comparisonsCompleted },
            { label: 'Anotações Criadas', value: this.playerData.statistics.annotationsCreated },
            { label: 'Quiz - Acertos', value: this.playerData.statistics.quizScore },
            { label: 'Tempo no Modo Professor', value: this.formatTime(this.playerData.statistics.teachingModeTime) },
            { label: 'Membro desde', value: this.formatDate(this.playerData.joinDate) }
        ];

        container.innerHTML = stats.map(stat => `
            <div class="stat-card">
                <div class="stat-value">${stat.value}</div>
                <div class="stat-label">${stat.label}</div>
            </div>
        `).join('');
    }

    updateLeaderboard() {
        const container = document.getElementById('leaderboardList');
        if (!container) return;

        // Simular leaderboard local
        const playerLevel = this.getCurrentLevel();
        container.innerHTML = `
            <div class="leaderboard-item current-player">
                <div class="rank">1</div>
                <div class="player-info">
                    <div class="player-name">Você</div>
                    <div class="player-level">${playerLevel.name} - Lv. ${playerLevel.level}</div>
                </div>
                <div class="player-points">${this.playerData.totalPoints} XP</div>
            </div>
            <div class="leaderboard-note">
                🏆 Você está no topo! Continue aprendendo para manter sua posição.
            </div>
        `;
    }

    // Utilitários
    getCategoryName(category) {
        const names = {
            'iniciante': '🌟 Primeiros Passos',
            'execucao': '⚡ Execução',
            'algoritmos': '🧮 Algoritmos',
            'comparacao': '⚖️ Comparações',
            'educacional': '🎓 Educacional',
            'perfeicao': '💎 Perfeição',
            'explorador': '🗺️ Explorador',
            'lendaria': '🏆 Lendárias'
        };
        return names[category] || category;
    }

    getEndOfDay() {
        const end = new Date();
        end.setHours(23, 59, 59, 999);
        return end.toISOString();
    }

    getEndOfWeek() {
        const end = new Date();
        end.setDate(end.getDate() + (7 - end.getDay()));
        end.setHours(23, 59, 59, 999);
        return end.toISOString();
    }

    formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours}h ${minutes}m`;
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('pt-BR');
    }

    startSessionTracking() {
        this.sessionStartTime = Date.now();
        
        // Salvar dados a cada 30 segundos
        setInterval(() => {
            this.savePlayerData();
        }, 30000);

        // Tracking de tempo no modo professor
        let teachingModeStart = null;
        
        // Observer para modo professor
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const target = mutation.target;
                    if (target.classList.contains('professor-mode-active')) {
                        teachingModeStart = Date.now();
                    } else if (teachingModeStart) {
                        const sessionTime = (Date.now() - teachingModeStart) / 1000;
                        this.onTeachingModeTime(sessionTime);
                        teachingModeStart = null;
                    }
                }
            });
        });

        // Começar observação quando o DOM estiver pronto
        if (document.body) {
            observer.observe(document.body, {
                attributes: true,
                subtree: true,
                attributeFilter: ['class']
            });
        }
    }

    savePlayerData() {
        // Converter Sets para Arrays para serialização
        const dataToSave = {
            ...this.playerData,
            statistics: {
                ...this.playerData.statistics,
                algorithmsCompleted: Array.from(this.playerData.statistics.algorithmsCompleted)
            },
            lastActive: new Date().toISOString()
        };
        
        localStorage.setItem('gamification_player_data', JSON.stringify(dataToSave));
    }

    // API Pública
    getPlayerLevel() {
        return this.getCurrentLevel();
    }

    getPlayerStats() {
        return this.playerData.statistics;
    }

    resetProgress() {
        if (confirm('Tem certeza que deseja resetar todo o progresso? Esta ação não pode ser desfeita.')) {
            localStorage.removeItem('gamification_player_data');
            location.reload();
        }
    }
}

// Instância global do sistema de gamificação
window.gamificationSystem = null;

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.gamificationSystem = new GamificationSystem();
    
    // Conectar com outros sistemas
    if (window.algorithmSystem) {
        // Hook para execução de algoritmos
        const originalExecute = window.algorithmSystem.executeStep;
        window.algorithmSystem.executeStep = function(...args) {
            const result = originalExecute.apply(this, args);
            if (window.gamificationSystem) {
                window.gamificationSystem.onStepComplete();
            }
            return result;
        };
    }
});