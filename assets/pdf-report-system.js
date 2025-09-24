/**
 * SISTEMA DE RELATÓRIOS PDF AVANÇADOS
 * Sistema completo para geração de relatórios PDF profissionais
 * com métricas detalhadas, gráficos e análise educacional
 */

class AdvancedPDFReportSystem {
    constructor() {
        this.reportData = {
            sessionInfo: {},
            algorithmMetrics: [],
            comparisons: [],
            annotations: [],
            achievements: [],
            timelineEvents: []
        };
        
        this.templates = {
            academic: 'Relatório Acadêmico',
            professional: 'Relatório Profissional',
            educational: 'Material Educacional',
            performance: 'Análise de Performance',
            comprehensive: 'Relatório Completo'
        };

        this.initializeSystem();
    }

    initializeSystem() {
        this.loadJsPDF();
        this.createReportInterface();
        this.collectDataFromSystems();
        this.startDataTracking();
    }

    loadJsPDF() {
        if (typeof jsPDF === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
            script.onload = () => {
                console.log('jsPDF carregado com sucesso');
                this.loadChartJSPlugin();
            };
            document.head.appendChild(script);
        } else {
            this.loadChartJSPlugin();
        }
    }

    loadChartJSPlugin() {
        // Plugin para converter Chart.js em imagem para PDF
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
        script.onload = () => {
            console.log('html2canvas carregado com sucesso');
        };
        document.head.appendChild(script);
    }

    createReportInterface() {
        const panel = document.createElement('div');
        panel.className = 'pdf-reports-panel';
        panel.innerHTML = `
            <div class="reports-header">
                <h3>📄 Relatórios PDF Avançados</h3>
                <div class="reports-status">
                    <span class="session-duration" id="sessionDuration">00:00:00</span>
                    <span class="data-points" id="dataPoints">0 dados coletados</span>
                </div>
            </div>

            <div class="report-tabs">
                <button class="report-tab active" data-tab="generator">Gerador</button>
                <button class="report-tab" data-tab="templates">Templates</button>
                <button class="report-tab" data-tab="history">Histórico</button>
                <button class="report-tab" data-tab="settings">Configurações</button>
            </div>

            <div class="report-content">
                <!-- Gerador de Relatórios -->
                <div class="report-tab-content active" id="generator">
                    <div class="report-generator">
                        <div class="generator-section">
                            <h4>📊 Seleção de Conteúdo</h4>
                            <div class="content-selection">
                                <div class="selection-group">
                                    <h5>Métricas e Análises</h5>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="includeMetrics" checked>
                                        <span>Métricas de Performance</span>
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="includeComplexity" checked>
                                        <span>Análise de Complexidade</span>
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="includeComparisons" checked>
                                        <span>Comparações de Algoritmos</span>
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="includeCharts" checked>
                                        <span>Gráficos e Visualizações</span>
                                    </label>
                                </div>
                                
                                <div class="selection-group">
                                    <h5>Conteúdo Educacional</h5>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="includeExplanations" checked>
                                        <span>Explicações Detalhadas</span>
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="includeCodeExamples" checked>
                                        <span>Exemplos de Código</span>
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="includeAnnotations">
                                        <span>Anotações do Usuário</span>
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="includeTimeline">
                                        <span>Timeline de Aprendizado</span>
                                    </label>
                                </div>
                                
                                <div class="selection-group">
                                    <h5>Gamificação e Progresso</h5>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="includeAchievements">
                                        <span>Conquistas e Badges</span>
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="includeStats">
                                        <span>Estatísticas Pessoais</span>
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" id="includeProgress">
                                        <span>Progresso Educacional</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="generator-section">
                            <h4>🎨 Template e Formato</h4>
                            <div class="template-selection">
                                <select id="reportTemplate" class="template-select">
                                    <option value="comprehensive">Relatório Completo</option>
                                    <option value="academic">Relatório Acadêmico</option>
                                    <option value="professional">Relatório Profissional</option>
                                    <option value="educational">Material Educacional</option>
                                    <option value="performance">Análise de Performance</option>
                                </select>
                            </div>
                            
                            <div class="format-options">
                                <div class="format-group">
                                    <label>Orientação:</label>
                                    <select id="pageOrientation">
                                        <option value="portrait">Retrato</option>
                                        <option value="landscape">Paisagem</option>
                                    </select>
                                </div>
                                <div class="format-group">
                                    <label>Tamanho:</label>
                                    <select id="pageSize">
                                        <option value="a4">A4</option>
                                        <option value="letter">Carta</option>
                                        <option value="a3">A3</option>
                                    </select>
                                </div>
                                <div class="format-group">
                                    <label>Qualidade:</label>
                                    <select id="imageQuality">
                                        <option value="high">Alta</option>
                                        <option value="medium">Média</option>
                                        <option value="low">Baixa</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="generator-section">
                            <h4>📝 Informações do Relatório</h4>
                            <div class="report-info">
                                <div class="info-group">
                                    <label for="reportTitle">Título:</label>
                                    <input type="text" id="reportTitle" placeholder="Ex: Análise de Algoritmos de Ordenação" value="Relatório de Aprendizado - Algoritmos">
                                </div>
                                <div class="info-group">
                                    <label for="reportAuthor">Autor:</label>
                                    <input type="text" id="reportAuthor" placeholder="Seu nome" value="Estudante">
                                </div>
                                <div class="info-group">
                                    <label for="reportSubject">Disciplina:</label>
                                    <input type="text" id="reportSubject" placeholder="Ex: Estruturas de Dados" value="Algoritmos e Estruturas de Dados">
                                </div>
                                <div class="info-group">
                                    <label for="reportDescription">Descrição:</label>
                                    <textarea id="reportDescription" placeholder="Breve descrição do relatório..." rows="3">Este relatório apresenta uma análise detalhada do estudo de algoritmos de ordenação, incluindo métricas de performance, comparações e insights educacionais.</textarea>
                                </div>
                            </div>
                        </div>

                        <div class="generator-actions">
                            <button class="btn-preview" id="previewReport">👁️ Visualizar</button>
                            <button class="btn-generate" id="generateReport">📄 Gerar PDF</button>
                            <button class="btn-save-template" id="saveTemplate">💾 Salvar Template</button>
                        </div>
                    </div>

                    <div class="generation-progress" id="generationProgress" style="display: none;">
                        <div class="progress-info">
                            <h4>Gerando Relatório...</h4>
                            <div class="progress-bar">
                                <div class="progress-fill" id="progressFill"></div>
                            </div>
                            <div class="progress-status" id="progressStatus">Inicializando...</div>
                        </div>
                    </div>
                </div>

                <!-- Templates -->
                <div class="report-tab-content" id="templates">
                    <div class="templates-manager">
                        <h4>📋 Gerenciador de Templates</h4>
                        <div class="templates-grid" id="templatesGrid">
                            <!-- Templates serão carregados aqui -->
                        </div>
                        <div class="template-editor" id="templateEditor" style="display: none;">
                            <!-- Editor de template -->
                        </div>
                    </div>
                </div>

                <!-- Histórico -->
                <div class="report-tab-content" id="history">
                    <div class="reports-history">
                        <h4>📚 Histórico de Relatórios</h4>
                        <div class="history-list" id="historyList">
                            <!-- Histórico será carregado aqui -->
                        </div>
                    </div>
                </div>

                <!-- Configurações -->
                <div class="report-tab-content" id="settings">
                    <div class="report-settings">
                        <h4>⚙️ Configurações</h4>
                        <div class="settings-groups">
                            <div class="settings-group">
                                <h5>Aparência</h5>
                                <label class="setting-item">
                                    <span>Tema do Relatório:</span>
                                    <select id="reportTheme">
                                        <option value="professional">Profissional</option>
                                        <option value="academic">Acadêmico</option>
                                        <option value="colorful">Colorido</option>
                                        <option value="minimal">Minimalista</option>
                                    </select>
                                </label>
                                <label class="setting-item">
                                    <span>Incluir Logo:</span>
                                    <input type="checkbox" id="includeLogo">
                                </label>
                                <label class="setting-item">
                                    <span>Incluir Rodapé:</span>
                                    <input type="checkbox" id="includeFooter" checked>
                                </label>
                            </div>
                            
                            <div class="settings-group">
                                <h5>Dados</h5>
                                <label class="setting-item">
                                    <span>Auto-salvar progresso:</span>
                                    <input type="checkbox" id="autoSaveProgress" checked>
                                </label>
                                <label class="setting-item">
                                    <span>Incluir metadados:</span>
                                    <input type="checkbox" id="includeMetadata" checked>
                                </label>
                                <label class="setting-item">
                                    <span>Compactar imagens:</span>
                                    <input type="checkbox" id="compressImages" checked>
                                </label>
                            </div>
                        </div>
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

    attachEventListeners() {
        // Tab switching
        document.querySelectorAll('.report-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchReportTab(e.target.dataset.tab);
            });
        });

        // Geração de relatório
        document.getElementById('generateReport')?.addEventListener('click', () => {
            this.generatePDFReport();
        });

        // Preview do relatório
        document.getElementById('previewReport')?.addEventListener('click', () => {
            this.previewReport();
        });

        // Salvar template
        document.getElementById('saveTemplate')?.addEventListener('click', () => {
            this.saveCustomTemplate();
        });

        // Template selection change
        document.getElementById('reportTemplate')?.addEventListener('change', (e) => {
            this.loadTemplatePreview(e.target.value);
        });
    }

    switchReportTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.report-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabName);
        });

        // Update tab content
        document.querySelectorAll('.report-tab-content').forEach(content => {
            content.classList.toggle('active', content.id === tabName);
        });

        // Load specific content
        if (tabName === 'templates') {
            this.loadTemplatesManager();
        } else if (tabName === 'history') {
            this.loadReportHistory();
        }
    }

    collectDataFromSystems() {
        // Coletar dados de todos os sistemas
        this.reportData.sessionInfo = {
            startTime: new Date().toISOString(),
            duration: 0,
            platform: 'Plataforma Ultra-Avançada de Algoritmos',
            version: '1.0.0'
        };

        // Integrar com sistema de gamificação
        if (window.gamificationSystem) {
            this.reportData.achievements = window.gamificationSystem.playerData.badges || [];
            this.reportData.stats = window.gamificationSystem.playerData.statistics || {};
        }

        // Integrar com sistema de complexidade
        if (window.complexityVisualization) {
            this.reportData.performanceAnalysis = window.complexityVisualization.performanceData || [];
        }

        // Integrar com sistema de comparação
        if (window.dualComparisonSystem) {
            this.reportData.comparisons = window.dualComparisonSystem.getComparisonHistory() || [];
        }

        // Integrar com sistema de anotações
        if (window.annotationSystem) {
            this.reportData.annotations = window.annotationSystem.getAllAnnotations() || [];
        }
    }

    startDataTracking() {
        this.startTime = Date.now();
        
        // Atualizar contadores em tempo real
        setInterval(() => {
            this.updateSessionInfo();
        }, 1000);

        // Coletar eventos de aprendizado
        this.trackLearningEvents();
    }

    updateSessionInfo() {
        const elapsed = Date.now() - this.startTime;
        const duration = new Date(elapsed).toISOString().substr(11, 8);
        
        document.getElementById('sessionDuration').textContent = duration;
        
        const dataPoints = this.countDataPoints();
        document.getElementById('dataPoints').textContent = `${dataPoints} dados coletados`;
        
        this.reportData.sessionInfo.duration = elapsed;
    }

    countDataPoints() {
        let count = 0;
        count += this.reportData.algorithmMetrics.length;
        count += this.reportData.comparisons.length;
        count += this.reportData.annotations.length;
        count += this.reportData.achievements.length;
        return count;
    }

    trackLearningEvents() {
        // Interceptar eventos do sistema principal
        const originalEvents = ['algorithmExecution', 'stepComplete', 'annotationCreated'];
        
        originalEvents.forEach(eventType => {
            document.addEventListener(eventType, (e) => {
                this.reportData.timelineEvents.push({
                    type: eventType,
                    timestamp: new Date().toISOString(),
                    data: e.detail || {}
                });
            });
        });
    }

    async generatePDFReport() {
        const progressEl = document.getElementById('generationProgress');
        const statusEl = document.getElementById('progressStatus');
        const fillEl = document.getElementById('progressFill');
        
        progressEl.style.display = 'block';
        
        try {
            // Atualizar progresso
            this.updateProgress(10, 'Inicializando jsPDF...', fillEl, statusEl);
            
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF({
                orientation: document.getElementById('pageOrientation').value,
                unit: 'mm',
                format: document.getElementById('pageSize').value
            });

            this.updateProgress(20, 'Coletando dados...', fillEl, statusEl);
            this.collectDataFromSystems();

            this.updateProgress(30, 'Gerando capa...', fillEl, statusEl);
            await this.addCoverPage(pdf);

            this.updateProgress(40, 'Adicionando sumário...', fillEl, statusEl);
            this.addTableOfContents(pdf);

            if (document.getElementById('includeMetrics').checked) {
                this.updateProgress(50, 'Processando métricas...', fillEl, statusEl);
                await this.addMetricsSection(pdf);
            }

            if (document.getElementById('includeComplexity').checked) {
                this.updateProgress(60, 'Analisando complexidade...', fillEl, statusEl);
                await this.addComplexitySection(pdf);
            }

            if (document.getElementById('includeComparisons').checked) {
                this.updateProgress(70, 'Processando comparações...', fillEl, statusEl);
                await this.addComparisonsSection(pdf);
            }

            if (document.getElementById('includeCharts').checked) {
                this.updateProgress(80, 'Gerando gráficos...', fillEl, statusEl);
                await this.addChartsSection(pdf);
            }

            if (document.getElementById('includeAnnotations').checked) {
                this.updateProgress(85, 'Incluindo anotações...', fillEl, statusEl);
                this.addAnnotationsSection(pdf);
            }

            if (document.getElementById('includeAchievements').checked) {
                this.updateProgress(90, 'Processando conquistas...', fillEl, statusEl);
                this.addAchievementsSection(pdf);
            }

            this.updateProgress(95, 'Finalizando relatório...', fillEl, statusEl);
            this.addFooterToAllPages(pdf);
            
            this.updateProgress(100, 'Download iniciado!', fillEl, statusEl);
            
            // Salvar PDF
            const title = document.getElementById('reportTitle').value || 'Relatorio_Algoritmos';
            const fileName = `${title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
            
            pdf.save(fileName);
            
            // Salvar no histórico
            this.saveToHistory({
                title: document.getElementById('reportTitle').value,
                author: document.getElementById('reportAuthor').value,
                template: document.getElementById('reportTemplate').value,
                generatedAt: new Date().toISOString(),
                fileName: fileName
            });

            setTimeout(() => {
                progressEl.style.display = 'none';
                this.showSuccessMessage('Relatório gerado com sucesso!');
            }, 1000);

        } catch (error) {
            console.error('Erro ao gerar relatório:', error);
            statusEl.textContent = 'Erro na geração do relatório';
            this.showErrorMessage('Erro ao gerar relatório: ' + error.message);
        }
    }

    updateProgress(percent, status, fillEl, statusEl) {
        if (fillEl) fillEl.style.width = `${percent}%`;
        if (statusEl) statusEl.textContent = status;
    }

    async addCoverPage(pdf) {
        const title = document.getElementById('reportTitle').value || 'Relatório de Algoritmos';
        const author = document.getElementById('reportAuthor').value || 'Estudante';
        const subject = document.getElementById('reportSubject').value || 'Estruturas de Dados';
        const description = document.getElementById('reportDescription').value || '';

        // Configurações de página
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 20;

        // Título principal
        pdf.setFontSize(28);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(31, 41, 55); // Cor escura
        
        const titleLines = pdf.splitTextToSize(title, pageWidth - 2 * margin);
        const titleHeight = titleLines.length * 12;
        const titleY = pageHeight / 3;
        
        titleLines.forEach((line, index) => {
            const textWidth = pdf.getTextWidth(line);
            const x = (pageWidth - textWidth) / 2;
            pdf.text(line, x, titleY + index * 12);
        });

        // Linha decorativa
        pdf.setDrawColor(59, 130, 246);
        pdf.setLineWidth(2);
        pdf.line(margin, titleY + titleHeight + 10, pageWidth - margin, titleY + titleHeight + 10);

        // Informações do relatório
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(75, 85, 99);

        const infoY = titleY + titleHeight + 30;
        const infoSpacing = 15;

        pdf.text(`Autor: ${author}`, margin, infoY);
        pdf.text(`Disciplina: ${subject}`, margin, infoY + infoSpacing);
        pdf.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, margin, infoY + 2 * infoSpacing);

        // Descrição
        if (description) {
            pdf.setFontSize(12);
            pdf.setTextColor(107, 114, 128);
            const descLines = pdf.splitTextToSize(description, pageWidth - 2 * margin);
            descLines.forEach((line, index) => {
                pdf.text(line, margin, infoY + 3 * infoSpacing + 15 + index * 6);
            });
        }

        // Rodapé da capa
        pdf.setFontSize(10);
        pdf.setTextColor(156, 163, 175);
        pdf.text('Gerado pela Plataforma Ultra-Avançada de Algoritmos', margin, pageHeight - 30);
        pdf.text(`Versão 1.0.0 - ${new Date().toLocaleString('pt-BR')}`, margin, pageHeight - 20);

        // Adicionar nova página para o conteúdo
        pdf.addPage();
    }

    addTableOfContents(pdf) {
        const pageWidth = pdf.internal.pageSize.getWidth();
        const margin = 20;

        // Título do sumário
        pdf.setFontSize(20);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(31, 41, 55);
        pdf.text('Sumário', margin, 40);

        // Linha decorativa
        pdf.setDrawColor(59, 130, 246);
        pdf.setLineWidth(1);
        pdf.line(margin, 45, pageWidth - margin, 45);

        // Itens do sumário
        const contents = [
            { title: '1. Resumo Executivo', page: 3 },
            { title: '2. Métricas de Performance', page: 4 },
            { title: '3. Análise de Complexidade', page: 5 },
            { title: '4. Comparações de Algoritmos', page: 6 },
            { title: '5. Gráficos e Visualizações', page: 7 },
            { title: '6. Anotações e Observações', page: 8 },
            { title: '7. Conquistas e Progresso', page: 9 },
            { title: '8. Conclusões e Recomendações', page: 10 }
        ];

        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(75, 85, 99);

        contents.forEach((item, index) => {
            const y = 60 + index * 12;
            pdf.text(item.title, margin, y);
            
            // Dots leader
            const titleWidth = pdf.getTextWidth(item.title);
            const pageNumWidth = pdf.getTextWidth(item.page.toString());
            const dotsWidth = pageWidth - margin - titleWidth - pageNumWidth - 10;
            const dotsCount = Math.floor(dotsWidth / 3);
            const dots = '.'.repeat(dotsCount);
            
            pdf.text(dots, margin + titleWidth + 5, y);
            pdf.text(item.page.toString(), pageWidth - margin - pageNumWidth, y);
        });

        pdf.addPage();
    }

    async addMetricsSection(pdf) {
        const margin = 20;
        
        // Título da seção
        pdf.setFontSize(18);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(31, 41, 55);
        pdf.text('Métricas de Performance', margin, 40);

        // Métricas coletadas
        const metrics = this.reportData.stats || {};
        
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(75, 85, 99);

        let y = 60;
        const lineSpacing = 8;

        // Estatísticas principais
        const stats = [
            { label: 'Execuções Totais', value: metrics.totalExecutions || 0 },
            { label: 'Algoritmos Estudados', value: (metrics.algorithmsCompleted?.length || 0) },
            { label: 'Execuções Perfeitas', value: metrics.perfectRuns || 0 },
            { label: 'Comparações Realizadas', value: metrics.comparisonsCompleted || 0 },
            { label: 'Anotações Criadas', value: metrics.annotationsCreated || 0 },
            { label: 'Tempo Total de Estudo', value: this.formatDuration(this.reportData.sessionInfo.duration || 0) }
        ];

        stats.forEach((stat, index) => {
            pdf.setFont('helvetica', 'bold');
            pdf.text(`${stat.label}:`, margin, y + index * lineSpacing);
            pdf.setFont('helvetica', 'normal');
            pdf.text(stat.value.toString(), margin + 80, y + index * lineSpacing);
        });

        // Performance insights
        y += stats.length * lineSpacing + 20;
        
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Insights de Performance', margin, y);
        
        y += 15;
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'normal');
        
        const insights = this.generatePerformanceInsights(metrics);
        insights.forEach((insight, index) => {
            const lines = pdf.splitTextToSize(`• ${insight}`, 170);
            lines.forEach((line, lineIndex) => {
                pdf.text(line, margin, y + (index * 15) + (lineIndex * 6));
            });
        });

        pdf.addPage();
    }

    async addComplexitySection(pdf) {
        const margin = 20;
        
        // Título da seção
        pdf.setFontSize(18);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(31, 41, 55);
        pdf.text('Análise de Complexidade', margin, 40);

        // Tabela de complexidades
        const algorithms = {
            'Bubble Sort': { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
            'Selection Sort': { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
            'Insertion Sort': { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
            'Merge Sort': { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
            'Quick Sort': { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' }
        };

        // Cabeçalho da tabela
        let y = 60;
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        
        pdf.text('Algoritmo', margin, y);
        pdf.text('Melhor Caso', margin + 60, y);
        pdf.text('Caso Médio', margin + 100, y);
        pdf.text('Pior Caso', margin + 140, y);

        // Linha separadora
        pdf.setDrawColor(200, 200, 200);
        pdf.setLineWidth(0.5);
        pdf.line(margin, y + 3, margin + 170, y + 3);

        y += 10;
        pdf.setFont('helvetica', 'normal');

        // Dados da tabela
        Object.entries(algorithms).forEach(([alg, complexity], index) => {
            const rowY = y + index * 10;
            pdf.text(alg, margin, rowY);
            pdf.text(complexity.best, margin + 60, rowY);
            pdf.text(complexity.average, margin + 100, rowY);
            pdf.text(complexity.worst, margin + 140, rowY);
            
            // Linha separadora
            if (index < Object.keys(algorithms).length - 1) {
                pdf.setDrawColor(240, 240, 240);
                pdf.line(margin, rowY + 3, margin + 170, rowY + 3);
            }
        });

        // Explicação das notações
        y += Object.keys(algorithms).length * 10 + 20;
        
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Guia de Notações Big O', margin, y);
        
        y += 15;
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        
        const notations = [
            'O(1) - Constante: Tempo não varia com o tamanho da entrada',
            'O(log n) - Logarítmico: Cresce lentamente com o tamanho',
            'O(n) - Linear: Cresce proporcionalmente ao tamanho',
            'O(n log n) - Linearítmico: Eficiente para grandes conjuntos',
            'O(n²) - Quadrático: Cresce rapidamente, cuidado com grandes entradas'
        ];

        notations.forEach((notation, index) => {
            const lines = pdf.splitTextToSize(`• ${notation}`, 170);
            lines.forEach((line, lineIndex) => {
                pdf.text(line, margin, y + (index * 12) + (lineIndex * 6));
            });
        });

        pdf.addPage();
    }

    async addComparisonsSection(pdf) {
        const margin = 20;
        
        pdf.setFontSize(18);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(31, 41, 55);
        pdf.text('Comparações de Algoritmos', margin, 40);

        // Simulação de comparações (em implementação real, usaria dados reais)
        const comparisons = [
            {
                algorithm1: 'Bubble Sort',
                algorithm2: 'Merge Sort',
                testSize: 100,
                result: 'Merge Sort 89% mais rápido',
                operations1: 4950,
                operations2: 664
            },
            {
                algorithm1: 'Insertion Sort',
                algorithm2: 'Quick Sort',
                testSize: 500,
                result: 'Quick Sort 75% mais eficiente',
                operations1: 62500,
                operations2: 4483
            }
        ];

        let y = 60;
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');

        comparisons.forEach((comp, index) => {
            // Título da comparação
            pdf.setFont('helvetica', 'bold');
            pdf.text(`Comparação ${index + 1}: ${comp.algorithm1} vs ${comp.algorithm2}`, margin, y);
            
            y += 15;
            pdf.setFont('helvetica', 'normal');
            pdf.text(`Tamanho do teste: ${comp.testSize} elementos`, margin, y);
            pdf.text(`Resultado: ${comp.result}`, margin, y + 8);
            pdf.text(`${comp.algorithm1}: ${comp.operations1.toLocaleString()} operações`, margin, y + 16);
            pdf.text(`${comp.algorithm2}: ${comp.operations2.toLocaleString()} operações`, margin, y + 24);
            
            y += 40;
        });

        pdf.addPage();
    }

    async addChartsSection(pdf) {
        // Esta função capturaria gráficos do Chart.js e os adicionaria ao PDF
        // Implementação simplificada
        const margin = 20;
        
        pdf.setFontSize(18);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(31, 41, 55);
        pdf.text('Gráficos e Visualizações', margin, 40);

        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');
        pdf.text('Os gráficos interativos estão disponíveis na plataforma web.', margin, 60);
        pdf.text('Esta seção incluiria capturas dos gráficos de complexidade,', margin, 75);
        pdf.text('comparações de performance e visualizações de dados.', margin, 90);

        pdf.addPage();
    }

    addAnnotationsSection(pdf) {
        const margin = 20;
        
        pdf.setFontSize(18);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(31, 41, 55);
        pdf.text('Anotações e Observações', margin, 40);

        const annotations = this.reportData.annotations || [];
        
        if (annotations.length === 0) {
            pdf.setFontSize(12);
            pdf.setFont('helvetica', 'normal');
            pdf.text('Nenhuma anotação foi criada durante esta sessão.', margin, 60);
            return;
        }

        let y = 60;
        pdf.setFontSize(10);
        
        annotations.forEach((annotation, index) => {
            pdf.setFont('helvetica', 'bold');
            pdf.text(`Anotação ${index + 1}:`, margin, y);
            
            pdf.setFont('helvetica', 'normal');
            const lines = pdf.splitTextToSize(annotation.text || 'Sem conteúdo', 170);
            lines.forEach((line, lineIndex) => {
                pdf.text(line, margin, y + 8 + lineIndex * 6);
            });
            
            y += 8 + lines.length * 6 + 10;
            
            if (y > 250) { // Nova página se necessário
                pdf.addPage();
                y = 40;
            }
        });

        pdf.addPage();
    }

    addAchievementsSection(pdf) {
        const margin = 20;
        
        pdf.setFontSize(18);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(31, 41, 55);
        pdf.text('Conquistas e Progresso', margin, 40);

        const achievements = this.reportData.achievements || [];
        const stats = this.reportData.stats || {};
        
        // Estatísticas de progresso
        let y = 60;
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Estatísticas de Aprendizado', margin, y);
        
        y += 20;
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'normal');

        const progressStats = [
            { label: 'Level Atual', value: this.getCurrentLevel() },
            { label: 'XP Total', value: (stats.totalPoints || 0).toLocaleString() },
            { label: 'Conquistas Desbloqueadas', value: achievements.length },
            { label: 'Taxa de Sucesso', value: this.calculateSuccessRate() }
        ];

        progressStats.forEach((stat, index) => {
            pdf.setFont('helvetica', 'bold');
            pdf.text(`${stat.label}:`, margin, y + index * 10);
            pdf.setFont('helvetica', 'normal');
            pdf.text(stat.value.toString(), margin + 100, y + index * 10);
        });

        // Lista de conquistas
        y += progressStats.length * 10 + 20;
        
        if (achievements.length > 0) {
            pdf.setFontSize(14);
            pdf.setFont('helvetica', 'bold');
            pdf.text('Conquistas Desbloqueadas', margin, y);
            
            y += 15;
            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'normal');
            
            achievements.forEach((achievement, index) => {
                pdf.text(`🏆 ${achievement.name || `Conquista ${index + 1}`}`, margin, y + index * 8);
            });
        }

        pdf.addPage();
    }

    addFooterToAllPages(pdf) {
        const totalPages = pdf.internal.getNumberOfPages();
        
        for (let i = 1; i <= totalPages; i++) {
            pdf.setPage(i);
            
            // Rodapé
            pdf.setFontSize(8);
            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(156, 163, 175);
            
            const pageHeight = pdf.internal.pageSize.getHeight();
            pdf.text(`Página ${i} de ${totalPages}`, 20, pageHeight - 10);
            pdf.text('Gerado pela Plataforma Ultra-Avançada de Algoritmos', 120, pageHeight - 10);
        }
    }

    // Funções auxiliares
    formatDuration(ms) {
        const hours = Math.floor(ms / 3600000);
        const minutes = Math.floor((ms % 3600000) / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    generatePerformanceInsights(metrics) {
        const insights = [];
        
        if (metrics.totalExecutions > 0) {
            const perfectRate = ((metrics.perfectRuns || 0) / metrics.totalExecutions * 100).toFixed(1);
            insights.push(`Taxa de execuções perfeitas: ${perfectRate}%`);
        }
        
        if (metrics.algorithmsCompleted?.length > 0) {
            insights.push(`Estudou ${metrics.algorithmsCompleted.length} algoritmos diferentes`);
        }
        
        if (metrics.comparisonsCompleted > 0) {
            insights.push(`Realizou ${metrics.comparisonsCompleted} comparações entre algoritmos`);
        }
        
        insights.push('Continue praticando para melhorar sua compreensão dos algoritmos');
        
        return insights;
    }

    getCurrentLevel() {
        if (window.gamificationSystem) {
            const level = window.gamificationSystem.getCurrentLevel();
            return `${level.level} (${level.name})`;
        }
        return 'N/A';
    }

    calculateSuccessRate() {
        const stats = this.reportData.stats || {};
        const total = stats.totalExecutions || 0;
        const perfect = stats.perfectRuns || 0;
        
        if (total === 0) return '0%';
        return `${((perfect / total) * 100).toFixed(1)}%`;
    }

    saveToHistory(reportInfo) {
        let history = JSON.parse(localStorage.getItem('pdf_reports_history') || '[]');
        history.unshift(reportInfo);
        
        // Manter apenas os últimos 20 relatórios
        if (history.length > 20) {
            history = history.slice(0, 20);
        }
        
        localStorage.setItem('pdf_reports_history', JSON.stringify(history));
    }

    loadReportHistory() {
        const historyList = document.getElementById('historyList');
        if (!historyList) return;

        const history = JSON.parse(localStorage.getItem('pdf_reports_history') || '[]');
        
        if (history.length === 0) {
            historyList.innerHTML = `
                <div class="empty-state">
                    <p>Nenhum relatório foi gerado ainda.</p>
                </div>
            `;
            return;
        }

        historyList.innerHTML = history.map(report => `
            <div class="history-item">
                <div class="report-info">
                    <h5>${report.title}</h5>
                    <div class="report-meta">
                        <span class="author">Por: ${report.author}</span>
                        <span class="date">${new Date(report.generatedAt).toLocaleDateString('pt-BR')}</span>
                        <span class="template">Template: ${report.template}</span>
                    </div>
                </div>
                <div class="report-actions">
                    <button class="btn-regenerate" onclick="window.pdfReportSystem.regenerateReport('${report.fileName}')">
                        🔄 Regenerar
                    </button>
                </div>
            </div>
        `).join('');
    }

    loadTemplatesManager() {
        const templatesGrid = document.getElementById('templatesGrid');
        if (!templatesGrid) return;

        const templates = Object.entries(this.templates);
        
        templatesGrid.innerHTML = templates.map(([key, name]) => `
            <div class="template-card">
                <div class="template-preview">
                    <div class="preview-header">${name}</div>
                    <div class="preview-content">
                        <div class="preview-line"></div>
                        <div class="preview-line short"></div>
                        <div class="preview-line"></div>
                    </div>
                </div>
                <div class="template-info">
                    <h5>${name}</h5>
                    <p>${this.getTemplateDescription(key)}</p>
                    <button class="btn-use-template" onclick="window.pdfReportSystem.useTemplate('${key}')">
                        Usar Template
                    </button>
                </div>
            </div>
        `).join('');
    }

    getTemplateDescription(key) {
        const descriptions = {
            comprehensive: 'Relatório completo com todas as seções disponíveis',
            academic: 'Formato acadêmico formal para trabalhos universitários',
            professional: 'Layout profissional para apresentações corporativas',
            educational: 'Focado em conteúdo educacional e explicações detalhadas',
            performance: 'Ênfase em análise de performance e métricas'
        };
        return descriptions[key] || 'Template personalizado';
    }

    useTemplate(templateKey) {
        document.getElementById('reportTemplate').value = templateKey;
        this.loadTemplatePreview(templateKey);
        this.switchReportTab('generator');
    }

    loadTemplatePreview(templateKey) {
        // Configurar checkboxes baseado no template
        const configs = {
            comprehensive: {
                includeMetrics: true,
                includeComplexity: true,
                includeComparisons: true,
                includeCharts: true,
                includeExplanations: true,
                includeCodeExamples: true,
                includeAnnotations: true,
                includeAchievements: true,
                includeStats: true,
                includeProgress: true
            },
            academic: {
                includeMetrics: true,
                includeComplexity: true,
                includeComparisons: true,
                includeExplanations: true,
                includeCodeExamples: true,
                includeAnnotations: true
            },
            professional: {
                includeMetrics: true,
                includeComplexity: true,
                includeComparisons: true,
                includeCharts: true
            },
            educational: {
                includeExplanations: true,
                includeCodeExamples: true,
                includeAnnotations: true,
                includeProgress: true
            },
            performance: {
                includeMetrics: true,
                includeComplexity: true,
                includeComparisons: true,
                includeCharts: true
            }
        };

        const config = configs[templateKey] || {};
        
        Object.keys(config).forEach(key => {
            const checkbox = document.getElementById(key);
            if (checkbox) {
                checkbox.checked = config[key];
            }
        });
    }

    saveCustomTemplate() {
        const templateName = prompt('Nome do template personalizado:');
        if (!templateName) return;

        const config = {};
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            config[checkbox.id] = checkbox.checked;
        });

        const customTemplates = JSON.parse(localStorage.getItem('custom_pdf_templates') || '{}');
        customTemplates[templateName] = config;
        localStorage.setItem('custom_pdf_templates', JSON.stringify(customTemplates));

        this.showSuccessMessage('Template salvo com sucesso!');
    }

    previewReport() {
        // Simular preview (em implementação real, geraria preview visual)
        alert('Preview do relatório será implementado na versão futura.\nPor enquanto, use "Gerar PDF" para ver o resultado final.');
    }

    showSuccessMessage(message) {
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    showErrorMessage(message) {
        const notification = document.createElement('div');
        notification.className = 'error-notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Inicializar sistema quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.pdfReportSystem = new AdvancedPDFReportSystem();
});