// === SISTEMA COMPLETO DE ANOTAÇÕES E REPLAY ===

class AdvancedAnnotationReplaySystem {
  constructor(algorithmSystem) {
    this.algorithmSystem = algorithmSystem;
    this.annotations = new Map(); // stepIndex -> [annotations]
    this.bookmarks = [];
    this.replayData = null;
    this.currentReplayStep = 0;
    this.isReplaying = false;
    this.replaySpeed = 1000;
    
    this.init();
  }

  init() {
    this.createAnnotationInterface();
    this.loadSavedData();
    this.setupEventListeners();
  }

  // Criar interface de anotações
  createAnnotationInterface() {
    if (document.getElementById('annotationPanel')) return;

    const annotationPanelHTML = `
      <div id="annotationPanel" class="annotation-panel">
        <h3>📝 Sistema de Anotações e Replay</h3>
        
        <!-- Controles de anotação -->
        <div class="annotation-controls">
          <button id="addNoteBtn" class="btn-annotation" title="Adicionar nota no passo atual">
            📝 Adicionar Nota
          </button>
          <button id="addBookmarkBtn" class="btn-annotation" title="Criar marcador">
            🔖 Marcador
          </button>
          <button id="saveReplayBtn" class="btn-annotation" title="Salvar execução para replay">
            💾 Salvar Replay
          </button>
        </div>

        <!-- Lista de anotações do passo atual -->
        <div class="current-step-annotations">
          <h4>📍 Anotações do Passo Atual:</h4>
          <div id="currentStepAnnotations" class="annotations-list">
            <p class="no-annotations">Nenhuma anotação neste passo</p>
          </div>
        </div>

        <!-- Lista de marcadores -->
        <div class="bookmarks-section">
          <h4>🔖 Marcadores Salvos:</h4>
          <div id="bookmarksList" class="bookmarks-list">
            <p class="no-bookmarks">Nenhum marcador criado</p>
          </div>
        </div>

        <!-- Controles de replay -->
        <div class="replay-controls">
          <h4>🎬 Controles de Replay:</h4>
          <div class="replay-buttons">
            <button id="loadReplayBtn" class="btn-replay" title="Carregar último replay">
              📁 Carregar Replay
            </button>
            <button id="startReplayBtn" class="btn-replay" title="Iniciar reprodução" disabled>
              ▶️ Reproduzir
            </button>
            <button id="pauseReplayBtn" class="btn-replay" title="Pausar reprodução" disabled>
              ⏸️ Pausar
            </button>
            <button id="stopReplayBtn" class="btn-replay" title="Parar reprodução" disabled>
              ⏹️ Parar
            </button>
          </div>
          
          <div class="replay-speed">
            <label for="replaySpeedSlider">Velocidade do Replay:</label>
            <input type="range" id="replaySpeedSlider" min="200" max="3000" value="1000" step="200">
            <span id="replaySpeedDisplay">1.0s</span>
          </div>

          <div class="replay-progress">
            <div class="progress-info">
              <span>Progresso: </span>
              <span id="replayCurrentStep">0</span>
              <span> / </span>
              <span id="replayTotalSteps">0</span>
            </div>
            <div class="progress-bar">
              <div id="replayProgressFill" class="progress-fill"></div>
            </div>
          </div>
        </div>

        <!-- Exportar/Importar -->
        <div class="export-import">
          <h4>📤 Compartilhar:</h4>
          <div class="export-buttons">
            <button id="exportAnnotationsBtn" class="btn-export">
              📤 Exportar Anotações
            </button>
            <button id="importAnnotationsBtn" class="btn-export">
              📥 Importar Anotações
            </button>
            <input type="file" id="importFileInput" accept=".json" style="display: none;">
          </div>
        </div>
      </div>
    `;

    const mainContainer = document.querySelector('.main-container');
    if (mainContainer) {
      mainContainer.insertAdjacentHTML('beforeend', annotationPanelHTML);
    }
  }

  // Configurar event listeners
  setupEventListeners() {
    // Botão adicionar nota
    const addNoteBtn = document.getElementById('addNoteBtn');
    if (addNoteBtn) {
      addNoteBtn.addEventListener('click', () => this.promptAddNote());
    }

    // Botão adicionar marcador
    const addBookmarkBtn = document.getElementById('addBookmarkBtn');
    if (addBookmarkBtn) {
      addBookmarkBtn.addEventListener('click', () => this.promptAddBookmark());
    }

    // Botão salvar replay
    const saveReplayBtn = document.getElementById('saveReplayBtn');
    if (saveReplayBtn) {
      saveReplayBtn.addEventListener('click', () => this.saveCurrentReplay());
    }

    // Controles de replay
    const loadReplayBtn = document.getElementById('loadReplayBtn');
    const startReplayBtn = document.getElementById('startReplayBtn');
    const pauseReplayBtn = document.getElementById('pauseReplayBtn');
    const stopReplayBtn = document.getElementById('stopReplayBtn');

    if (loadReplayBtn) {
      loadReplayBtn.addEventListener('click', () => this.loadReplay());
    }
    if (startReplayBtn) {
      startReplayBtn.addEventListener('click', () => this.startReplay());
    }
    if (pauseReplayBtn) {
      pauseReplayBtn.addEventListener('click', () => this.pauseReplay());
    }
    if (stopReplayBtn) {
      stopReplayBtn.addEventListener('click', () => this.stopReplay());
    }

    // Controle de velocidade do replay
    const replaySpeedSlider = document.getElementById('replaySpeedSlider');
    if (replaySpeedSlider) {
      replaySpeedSlider.addEventListener('input', (e) => {
        this.replaySpeed = parseInt(e.target.value);
        const speedDisplay = document.getElementById('replaySpeedDisplay');
        if (speedDisplay) {
          speedDisplay.textContent = `${(this.replaySpeed / 1000).toFixed(1)}s`;
        }
      });
    }

    // Exportar/Importar
    const exportBtn = document.getElementById('exportAnnotationsBtn');
    const importBtn = document.getElementById('importAnnotationsBtn');
    const fileInput = document.getElementById('importFileInput');

    if (exportBtn) {
      exportBtn.addEventListener('click', () => this.exportAnnotations());
    }
    if (importBtn && fileInput) {
      importBtn.addEventListener('click', () => fileInput.click());
      fileInput.addEventListener('change', (e) => this.importAnnotations(e));
    }

    // Escutar mudanças de passo para atualizar anotações
    if (this.algorithmSystem) {
      const originalExecuteStep = this.algorithmSystem.executeStep?.bind(this.algorithmSystem);
      if (originalExecuteStep) {
        this.algorithmSystem.executeStep = (stepIndex, reverse = false) => {
          originalExecuteStep(stepIndex, reverse);
          this.updateCurrentStepAnnotations(stepIndex);
        };
      }
    }
  }

  // Prompt para adicionar nota
  promptAddNote() {
    const currentStep = this.algorithmSystem?.currentStep || 0;
    
    const noteText = prompt(`📝 Adicionar nota para o passo ${currentStep}:\n\nDigite sua anotação:`);
    
    if (noteText && noteText.trim()) {
      this.addAnnotation(currentStep, noteText.trim(), 'note');
      this.showToast('📝 Nota adicionada com sucesso!', 'success');
    }
  }

  // Prompt para adicionar marcador
  promptAddBookmark() {
    const currentStep = this.algorithmSystem?.currentStep || 0;
    
    const label = prompt(`🔖 Criar marcador para o passo ${currentStep}:\n\nDigite um nome para este marcador:`);
    
    if (label && label.trim()) {
      this.addBookmark(currentStep, label.trim());
      this.showToast('🔖 Marcador criado com sucesso!', 'success');
    }
  }

  // Adicionar anotação
  addAnnotation(stepIndex, text, type = 'note', author = 'Usuário') {
    const annotation = {
      id: Date.now() + Math.random(),
      stepIndex,
      text,
      type,
      author,
      timestamp: new Date().toISOString(),
      color: this.getAnnotationColor(type)
    };

    if (!this.annotations.has(stepIndex)) {
      this.annotations.set(stepIndex, []);
    }
    
    this.annotations.get(stepIndex).push(annotation);
    this.saveAnnotations();
    this.updateCurrentStepAnnotations(stepIndex);
  }

  // Adicionar marcador
  addBookmark(stepIndex, label) {
    const bookmark = {
      id: Date.now() + Math.random(),
      stepIndex,
      label,
      timestamp: new Date().toISOString(),
      algorithm: this.algorithmSystem?.currentAlgorithm || 'unknown'
    };
    
    this.bookmarks.push(bookmark);
    this.saveBookmarks();
    this.updateBookmarksList();
  }

  // Obter cor da anotação baseada no tipo
  getAnnotationColor(type) {
    const colors = {
      note: '#3b82f6',      // azul
      important: '#f59e0b',  // amarelo
      question: '#ef4444',   // vermelho
      insight: '#10b981',    // verde
      confusion: '#8b5cf6'   // roxo
    };
    return colors[type] || colors.note;
  }

  // Atualizar exibição de anotações do passo atual
  updateCurrentStepAnnotations(stepIndex) {
    const container = document.getElementById('currentStepAnnotations');
    if (!container) return;

    const annotations = this.annotations.get(stepIndex) || [];
    
    if (annotations.length === 0) {
      container.innerHTML = '<p class="no-annotations">Nenhuma anotação neste passo</p>';
      return;
    }

    container.innerHTML = annotations.map(annotation => `
      <div class="annotation-item" style="border-left: 4px solid ${annotation.color}">
        <div class="annotation-header">
          <span class="annotation-type">${this.getAnnotationIcon(annotation.type)} ${annotation.type}</span>
          <span class="annotation-author">por ${annotation.author}</span>
          <button class="annotation-delete" onclick="window.annotationSystem.removeAnnotation(${annotation.id})" title="Remover anotação">×</button>
        </div>
        <div class="annotation-text">${annotation.text}</div>
        <div class="annotation-time">${this.formatTime(annotation.timestamp)}</div>
      </div>
    `).join('');
  }

  // Atualizar lista de marcadores
  updateBookmarksList() {
    const container = document.getElementById('bookmarksList');
    if (!container) return;

    if (this.bookmarks.length === 0) {
      container.innerHTML = '<p class="no-bookmarks">Nenhum marcador criado</p>';
      return;
    }

    container.innerHTML = this.bookmarks.map(bookmark => `
      <div class="bookmark-item">
        <div class="bookmark-info">
          <span class="bookmark-label">🔖 ${bookmark.label}</span>
          <span class="bookmark-step">Passo ${bookmark.stepIndex}</span>
          <span class="bookmark-algorithm">${bookmark.algorithm}</span>
        </div>
        <div class="bookmark-actions">
          <button class="bookmark-goto" onclick="window.annotationSystem.goToBookmark(${bookmark.id})" title="Ir para este passo">
            🎯 Ir
          </button>
          <button class="bookmark-delete" onclick="window.annotationSystem.removeBookmark(${bookmark.id})" title="Remover marcador">×</button>
        </div>
      </div>
    `).join('');
  }

  // Remover anotação
  removeAnnotation(annotationId) {
    for (let [stepIndex, annotations] of this.annotations.entries()) {
      const index = annotations.findIndex(a => a.id === annotationId);
      if (index !== -1) {
        annotations.splice(index, 1);
        if (annotations.length === 0) {
          this.annotations.delete(stepIndex);
        }
        this.saveAnnotations();
        this.updateCurrentStepAnnotations(stepIndex);
        this.showToast('🗑️ Anotação removida', 'info');
        break;
      }
    }
  }

  // Remover marcador
  removeBookmark(bookmarkId) {
    const index = this.bookmarks.findIndex(b => b.id === bookmarkId);
    if (index !== -1) {
      this.bookmarks.splice(index, 1);
      this.saveBookmarks();
      this.updateBookmarksList();
      this.showToast('🗑️ Marcador removido', 'info');
    }
  }

  // Ir para marcador
  goToBookmark(bookmarkId) {
    const bookmark = this.bookmarks.find(b => b.id === bookmarkId);
    if (bookmark && this.algorithmSystem) {
      // Verificar se é o mesmo algoritmo
      if (bookmark.algorithm !== this.algorithmSystem.currentAlgorithm) {
        if (!confirm(`Este marcador é do algoritmo ${bookmark.algorithm}. Deseja mudar para este algoritmo?`)) {
          return;
        }
        // Aqui poderia mudar o algoritmo automaticamente
      }

      // Ir para o passo específico
      if (this.algorithmSystem.stepMode && this.algorithmSystem.executionSteps.length > bookmark.stepIndex) {
        this.algorithmSystem.currentStep = bookmark.stepIndex;
        this.algorithmSystem.executeStep(bookmark.stepIndex);
        this.algorithmSystem.updateStepDisplay();
        this.showToast(`🎯 Navegou para: ${bookmark.label}`, 'success');
      } else {
        this.showToast('❌ Não é possível navegar para este marcador agora', 'error');
      }
    }
  }

  // Salvar replay atual
  saveCurrentReplay() {
    if (!this.algorithmSystem || !this.algorithmSystem.executionSteps.length) {
      this.showToast('❌ Nenhuma execução para salvar', 'error');
      return;
    }

    this.replayData = {
      id: Date.now(),
      algorithm: this.algorithmSystem.currentAlgorithm,
      originalArray: [...this.algorithmSystem.original],
      arraySize: this.algorithmSystem.size,
      steps: [...this.algorithmSystem.executionSteps],
      annotations: this.serializeAnnotations(),
      bookmarks: [...this.bookmarks],
      metrics: {
        comparisons: this.algorithmSystem.comparisons,
        swaps: this.algorithmSystem.swaps,
        arrayAccesses: this.algorithmSystem.arrayAccesses || 0
      },
      timestamp: new Date().toISOString(),
      version: '1.0'
    };

    localStorage.setItem('algorithm_replay_data', JSON.stringify(this.replayData));
    this.showToast('💾 Replay salvo com sucesso!', 'success');

    // Habilitar botão de carregar
    const loadBtn = document.getElementById('loadReplayBtn');
    if (loadBtn) loadBtn.disabled = false;
  }

  // Carregar replay
  loadReplay() {
    const saved = localStorage.getItem('algorithm_replay_data');
    if (!saved) {
      this.showToast('❌ Nenhum replay salvo encontrado', 'error');
      return;
    }

    try {
      this.replayData = JSON.parse(saved);
      this.deserializeAnnotations(this.replayData.annotations);
      this.bookmarks = this.replayData.bookmarks || [];
      
      // Atualizar interface
      this.updateBookmarksList();
      
      // Habilitar controles de replay
      const startBtn = document.getElementById('startReplayBtn');
      if (startBtn) startBtn.disabled = false;

      // Atualizar progresso
      const totalSteps = document.getElementById('replayTotalSteps');
      if (totalSteps) totalSteps.textContent = this.replayData.steps.length;

      this.showToast(`📁 Replay carregado: ${this.replayData.algorithm} (${this.formatTime(this.replayData.timestamp)})`, 'success');
      
    } catch (error) {
      this.showToast('❌ Erro ao carregar replay', 'error');
      console.error('Erro ao carregar replay:', error);
    }
  }

  // Iniciar replay
  async startReplay() {
    if (!this.replayData) {
      this.showToast('❌ Carregue um replay primeiro', 'error');
      return;
    }

    this.isReplaying = true;
    this.currentReplayStep = 0;

    // Configurar algoritmo e array
    if (this.algorithmSystem) {
      this.algorithmSystem.currentAlgorithm = this.replayData.algorithm;
      this.algorithmSystem.size = this.replayData.arraySize;
      this.algorithmSystem.arr = [...this.replayData.originalArray];
      this.algorithmSystem.original = [...this.replayData.originalArray];
      this.algorithmSystem.executionSteps = [...this.replayData.steps];
      this.algorithmSystem.totalSteps = this.replayData.steps.length;
    }

    // Atualizar controles
    const startBtn = document.getElementById('startReplayBtn');
    const pauseBtn = document.getElementById('pauseReplayBtn');
    const stopBtn = document.getElementById('stopReplayBtn');

    if (startBtn) startBtn.disabled = true;
    if (pauseBtn) pauseBtn.disabled = false;
    if (stopBtn) stopBtn.disabled = false;

    this.showToast('🎬 Iniciando replay...', 'info');

    // Executar replay
    await this.runReplay();
  }

  // Executar replay
  async runReplay() {
    while (this.isReplaying && this.currentReplayStep < this.replayData.steps.length) {
      // Executar passo
      if (this.algorithmSystem) {
        this.algorithmSystem.executeStep(this.currentReplayStep);
        this.algorithmSystem.currentStep = this.currentReplayStep + 1;
        this.algorithmSystem.updateStepDisplay();
      }

      // Atualizar progresso do replay
      this.updateReplayProgress();

      // Mostrar anotações se houver
      const stepAnnotations = this.annotations.get(this.currentReplayStep);
      if (stepAnnotations && stepAnnotations.length > 0) {
        this.showReplayAnnotation(stepAnnotations[0]);
      }

      this.currentReplayStep++;

      // Aguardar baseado na velocidade
      await this.sleep(this.replaySpeed);
    }

    if (this.isReplaying) {
      this.showToast('🎬 Replay concluído!', 'success');
      this.stopReplay();
    }
  }

  // Pausar replay
  pauseReplay() {
    this.isReplaying = false;
    
    const startBtn = document.getElementById('startReplayBtn');
    const pauseBtn = document.getElementById('pauseReplayBtn');

    if (startBtn) startBtn.disabled = false;
    if (pauseBtn) pauseBtn.disabled = true;

    this.showToast('⏸️ Replay pausado', 'info');
  }

  // Parar replay
  stopReplay() {
    this.isReplaying = false;
    this.currentReplayStep = 0;

    const startBtn = document.getElementById('startReplayBtn');
    const pauseBtn = document.getElementById('pauseReplayBtn');
    const stopBtn = document.getElementById('stopReplayBtn');

    if (startBtn) startBtn.disabled = false;
    if (pauseBtn) pauseBtn.disabled = true;
    if (stopBtn) stopBtn.disabled = true;

    this.updateReplayProgress();
    this.showToast('⏹️ Replay parado', 'info');
  }

  // Atualizar progresso do replay
  updateReplayProgress() {
    const currentEl = document.getElementById('replayCurrentStep');
    const progressFill = document.getElementById('replayProgressFill');

    if (currentEl) currentEl.textContent = this.currentReplayStep;

    if (progressFill && this.replayData) {
      const progress = (this.currentReplayStep / this.replayData.steps.length) * 100;
      progressFill.style.width = `${progress}%`;
    }
  }

  // Mostrar anotação durante replay
  showReplayAnnotation(annotation) {
    const toast = document.createElement('div');
    toast.className = 'replay-annotation-toast';
    toast.innerHTML = `
      <div class="annotation-replay-header">
        ${this.getAnnotationIcon(annotation.type)} ${annotation.author}
      </div>
      <div class="annotation-replay-text">${annotation.text}</div>
    `;

    document.body.appendChild(toast);
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }

  // Exportar anotações
  exportAnnotations() {
    const exportData = {
      annotations: this.serializeAnnotations(),
      bookmarks: this.bookmarks,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `algoritmos_anotacoes_${new Date().toISOString().split('T')[0]}.json`;
    link.click();

    this.showToast('📤 Anotações exportadas!', 'success');
  }

  // Importar anotações
  importAnnotations(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importData = JSON.parse(e.target.result);
        
        if (importData.annotations) {
          this.deserializeAnnotations(importData.annotations);
        }
        if (importData.bookmarks) {
          this.bookmarks = [...this.bookmarks, ...importData.bookmarks];
          this.saveBookmarks();
        }

        this.updateBookmarksList();
        this.showToast('📥 Anotações importadas com sucesso!', 'success');

      } catch (error) {
        this.showToast('❌ Erro ao importar arquivo', 'error');
        console.error('Erro na importação:', error);
      }
    };

    reader.readAsText(file);
  }

  // Serializar anotações para salvamento
  serializeAnnotations() {
    const obj = {};
    for (let [key, value] of this.annotations.entries()) {
      obj[key] = value;
    }
    return obj;
  }

  // Deserializar anotações
  deserializeAnnotations(obj) {
    this.annotations.clear();
    for (let [key, value] of Object.entries(obj)) {
      this.annotations.set(parseInt(key), value);
    }
    this.saveAnnotations();
  }

  // Carregar dados salvos
  loadSavedData() {
    // Carregar anotações
    const savedAnnotations = localStorage.getItem('algorithm_annotations');
    if (savedAnnotations) {
      try {
        this.deserializeAnnotations(JSON.parse(savedAnnotations));
      } catch (error) {
        console.error('Erro ao carregar anotações:', error);
      }
    }

    // Carregar marcadores
    const savedBookmarks = localStorage.getItem('algorithm_bookmarks');
    if (savedBookmarks) {
      try {
        this.bookmarks = JSON.parse(savedBookmarks);
        this.updateBookmarksList();
      } catch (error) {
        console.error('Erro ao carregar marcadores:', error);
      }
    }

    // Verificar se há replay salvo
    const savedReplay = localStorage.getItem('algorithm_replay_data');
    if (savedReplay) {
      const loadBtn = document.getElementById('loadReplayBtn');
      if (loadBtn) loadBtn.disabled = false;
    }
  }

  // Salvar dados
  saveAnnotations() {
    const data = this.serializeAnnotations();
    localStorage.setItem('algorithm_annotations', JSON.stringify(data));
  }

  saveBookmarks() {
    localStorage.setItem('algorithm_bookmarks', JSON.stringify(this.bookmarks));
  }

  // Utilitários
  getAnnotationIcon(type) {
    const icons = {
      note: '📝',
      important: '⚠️',
      question: '❓',
      insight: '💡',
      confusion: '😕'
    };
    return icons[type] || icons.note;
  }

  formatTime(isoString) {
    const date = new Date(isoString);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  showToast(message, type = 'info') {
    // Usar sistema de toast existente ou criar um simples
    if (window.algorithmSystem && window.algorithmSystem.showMessage) {
      window.algorithmSystem.showMessage(message, type);
    } else {
      console.log(`[${type.toUpperCase()}] ${message}`);
    }
  }
}

// Integração global
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    if (window.algorithmSystem) {
      window.annotationSystem = new AdvancedAnnotationReplaySystem(window.algorithmSystem);
      console.log('✅ Sistema avançado de anotações e replay inicializado');
    }
  }, 500);
});