// === SISTEMA PROFISSIONAL DE ALGORITMOS DE ORDENAÇÃO ===

class AlgorithmVisualizationSystem {
  constructor() {
    // Estado do sistema
    this.arr = [];
    this.original = [];
    this.running = false;
    this.speed = 80;
    this.currentAlgorithm = 'bubble';
    this.size = 30;
    this.comparisons = 0;
    this.swaps = 0;
    this.startTime = 0;
    this.visualizationMode = 'bars';
    
    // Modos avançados
    this.tutorialMode = false;
    this.codeViewMode = false;
    this.comparisonMode = false;
    this.metricsMode = false;
    
    // Dados dos algoritmos
    this.algorithmData = {
      bubble: {
        name: 'Bubble Sort',
        description: `
          <div class="algorithm-description">
            <h4>🫧 Bubble Sort - Algoritmo de Troca por Bolhas</h4>
            <p><strong>Estratégia:</strong> Compara elementos adjacentes repetidamente, "fazendo bolhas" subirem para suas posições corretas.</p>
            <p><strong>Funcionamento:</strong> A cada passada, o maior elemento não ordenado "borbulha" até sua posição final.</p>
            <p><strong>Quando usar:</strong> Ideal para ensino de conceitos básicos. Evitar em produção devido à baixa eficiência.</p>
            <p><strong>Otimização:</strong> Para quando nenhuma troca é realizada (array já ordenado).</p>
          </div>
        `,
        tutorial: 'Observe como as "bolhas" maiores sobem para o final do array, uma posição por vez. Cada passada garante que pelo menos um elemento esteja na posição correta.',
        timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
        spaceComplexity: 'O(1)',
        stable: true,
        inPlace: true,
        useCase: 'Ensino, arrays muito pequenos (< 10 elementos)',
        advantages: ['Simples de implementar', 'Estável', 'In-place', 'Detecta arrays ordenados'],
        disadvantages: ['Muito lento O(n²)', 'Muitas trocas desnecessárias', 'Ineficiente para dados grandes']
      },
      
      selection: {
        name: 'Selection Sort',
        description: `
          <div class="algorithm-description">
            <h4>🎯 Selection Sort - Algoritmo de Seleção</h4>
            <p><strong>Estratégia:</strong> Encontra o menor elemento e coloca na primeira posição, depois o segundo menor, e assim por diante.</p>
            <p><strong>Funcionamento:</strong> Divide conceitualmente o array em duas partes: ordenada e não ordenada.</p>
            <p><strong>Quando usar:</strong> Quando o número de trocas deve ser minimizado ou a memória é extremamente limitada.</p>
            <p><strong>Característica:</strong> Realiza O(n) trocas independentemente da entrada.</p>
          </div>
        `,
        tutorial: 'Veja como o algoritmo "seleciona" o menor elemento a cada iteração. A parte ordenada cresce da esquerda para a direita.',
        timeComplexity: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
        spaceComplexity: 'O(1)',
        stable: false,
        inPlace: true,
        useCase: 'Quando a memória é extremamente limitada',
        advantages: ['Poucas trocas O(n)', 'In-place', 'Performance previsível'],
        disadvantages: ['Sempre O(n²)', 'Não estável', 'Não detecta arrays ordenados']
      },
      
      insertion: {
        name: 'Insertion Sort',
        description: `
          <div class="algorithm-description">
            <h4>📝 Insertion Sort - Algoritmo de Inserção</h4>
            <p><strong>Estratégia:</strong> Constrói o array ordenado um elemento por vez, inserindo cada novo elemento na posição correta.</p>
            <p><strong>Funcionamento:</strong> Similar à forma como organizamos cartas na mão - inserimos cada carta no lugar certo.</p>
            <p><strong>Quando usar:</strong> Excelente para arrays pequenos ou quase ordenados. Usado como subroutina no Timsort.</p>
            <p><strong>Otimização:</strong> Muito eficiente O(n) para dados já ordenados ou quase ordenados.</p>
          </div>
        `,
        tutorial: 'Observe como cada elemento é "inserido" na posição correta, como organizar cartas na mão. Muito eficiente para dados quase ordenados.',
        timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
        spaceComplexity: 'O(1)',
        stable: true,
        inPlace: true,
        useCase: 'Arrays pequenos, dados quase ordenados, algoritmo híbrido',
        advantages: ['Eficiente para dados pequenos/ordenados', 'Estável', 'In-place', 'Adaptativo'],
        disadvantages: ['O(n²) para dados aleatórios', 'Muitos deslocamentos para dados reversos']
      },
      
      quick: {
        name: 'Quick Sort',
        description: `
          <div class="algorithm-description">
            <h4>⚡ Quick Sort - Algoritmo de Particionamento</h4>
            <p><strong>Estratégia:</strong> Divide e conquista usando um elemento pivô para particionar o array.</p>
            <p><strong>Funcionamento:</strong> Escolhe um pivô, reorganiza os elementos (menores à esquerda, maiores à direita), e aplica recursivamente.</p>
            <p><strong>Quando usar:</strong> Algoritmo padrão na maioria das linguagens devido à excelente performance média.</p>
            <p><strong>Otimização:</strong> Escolha inteligente do pivô e híbrido com insertion sort para subarrays pequenos.</p>
          </div>
        `,
        tutorial: 'Foque no elemento roxo (pivô). Veja como ele "particiona" o array: menores à esquerda, maiores à direita. Depois aplica o mesmo processo recursivamente.',
        timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
        spaceComplexity: 'O(log n)',
        stable: false,
        inPlace: true,
        useCase: 'Uso geral, alta performance, padrão em bibliotecas',
        advantages: ['Muito rápido na prática', 'In-place', 'Cache-friendly'],
        disadvantages: ['O(n²) no pior caso', 'Não estável', 'Performance dependente do pivô']
      },
      
      merge: {
        name: 'Merge Sort',
        description: `
          <div class="algorithm-description">
            <h4>🔄 Merge Sort - Algoritmo de Mesclagem</h4>
            <p><strong>Estratégia:</strong> Divide o array pela metade recursivamente até ter elementos únicos, depois mescla ordenadamente.</p>
            <p><strong>Funcionamento:</strong> Clássico "dividir para conquistar" com performance garantida O(n log n).</p>
            <p><strong>Quando usar:</strong> Quando se precisa de performance garantida e estabilidade, especialmente para dados grandes.</p>
            <p><strong>Característica:</strong> Única garantia de O(n log n) em todos os casos, mas usa espaço extra.</p>
          </div>
        `,
        tutorial: 'Algoritmo "dividir para conquistar". Primeiro divide até ter elementos únicos, depois mescla ordenadamente. Performance sempre O(n log n).',
        timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
        spaceComplexity: 'O(n)',
        stable: true,
        inPlace: false,
        useCase: 'Arrays grandes, quando estabilidade é necessária',
        advantages: ['Performance garantida O(n log n)', 'Estável', 'Previsível'],
        disadvantages: ['Usa espaço extra O(n)', 'Overhead de recursão', 'Não adaptativo']
      },
      
      heap: {
        name: 'Heap Sort',
        description: `
          <div class="algorithm-description">
            <h4>🌳 Heap Sort - Algoritmo de Árvore Heap</h4>
            <p><strong>Estratégia:</strong> Constrói uma estrutura heap (árvore binária completa) e extrai elementos ordenadamente.</p>
            <p><strong>Funcionamento:</strong> Fase 1: Constrói max-heap. Fase 2: Extrai o máximo repetidamente.</p>
            <p><strong>Quando usar:</strong> Quando se precisa de performance garantida com uso mínimo de memória.</p>
            <p><strong>Vantagem:</strong> Combina o melhor dos algoritmos O(n log n) com O(1) de espaço.</p>
          </div>
        `,
        tutorial: 'Primeiro constrói um "heap" (árvore onde pai ≥ filhos), depois remove o maior elemento repetidamente. Combina o melhor dos algoritmos simples e eficientes.',
        timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
        spaceComplexity: 'O(1)',
        stable: false,
        inPlace: true,
        useCase: 'Quando se precisa de performance garantida com espaço limitado',
        advantages: ['Performance garantida O(n log n)', 'In-place O(1)', 'Não recursivo'],
        disadvantages: ['Não estável', 'Cache unfriendly', 'Constante maior que quick sort']
      }
    };
  }

  // === UTILITÁRIOS AVANÇADOS ===
  randomArray(n) {
    let a = [];
    for (let i = 1; i <= n; i++) a.push(i);
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  render(arr, comparing = [], active = [], sorted = [], pivot = []) {
    const bars = document.getElementById('bars');
    bars.innerHTML = '';
    const max = Math.max(...arr);
    
    arr.forEach((val, i) => {
      const element = document.createElement('div');
      element.className = 'bar';
      
      // Aplicar classes de estado
      if (comparing.includes(i)) element.classList.add('comparing');
      if (active.includes(i)) element.classList.add('active');
      if (sorted.includes(i)) element.classList.add('sorted');
      if (pivot.includes(i)) element.classList.add('pivot');
      
      // Configurar altura e conteúdo
      element.style.height = (val / max * 85) + '%';
      element.textContent = arr.length <= 50 ? val : '';
      element.setAttribute('data-value', val);
      element.setAttribute('data-index', i);
      element.title = `Valor: ${val}, Posição: ${i}`;
      
      bars.appendChild(element);
    });
  }

  updateStats() {
    document.getElementById('comparisons').textContent = this.comparisons.toLocaleString();
    document.getElementById('swaps').textContent = this.swaps.toLocaleString();
    const elapsed = ((Date.now() - this.startTime) / 1000).toFixed(1);
    document.getElementById('timeElapsed').textContent = elapsed + 's';
    
    // Calcular eficiência
    const totalOps = this.comparisons + this.swaps;
    const opsPerSecond = totalOps / Math.max(1, elapsed);
    document.getElementById('efficiency').textContent = opsPerSecond.toFixed(0) + '/s';
    
    // Atualizar métricas avançadas se ativo
    if (this.metricsMode) {
      document.getElementById('operationsPerSecond').textContent = opsPerSecond.toFixed(0);
      this.updatePerformanceMetrics(totalOps, elapsed);
    }
  }

  updatePerformanceMetrics(totalOps, elapsed) {
    const n = this.arr.length;
    const algorithm = this.algorithmData[this.currentAlgorithm];
    
    // Rating de eficiência baseado na complexidade teórica
    let expectedOps;
    switch (this.currentAlgorithm) {
      case 'bubble':
      case 'selection':
      case 'insertion':
        expectedOps = n * n;
        break;
      case 'quick':
      case 'merge':
      case 'heap':
        expectedOps = n * Math.log2(n);
        break;
    }
    
    const efficiency = Math.min(100, Math.max(0, 100 - (totalOps / expectedOps - 1) * 100));
    document.getElementById('efficiencyRating').textContent = efficiency.toFixed(0) + '%';
    
    // Complexidade real vs teórica
    const actualComplexity = totalOps / (n * Math.log2(n));
    document.getElementById('actualComplexity').textContent = actualComplexity.toFixed(2) + 'x';
    
    // Recomendação baseada no tamanho
    let recommendation;
    if (n <= 10) recommendation = 'Qualquer';
    else if (n <= 50) recommendation = 'Insertion';
    else if (n <= 1000) recommendation = 'Quick';
    else recommendation = 'Merge/Heap';
    
    document.getElementById('recommendation').textContent = recommendation;
  }

  setAlgorithmInfo(alg) {
    const info = this.algorithmData[alg];
    document.getElementById('info').innerHTML = info.description;
    
    if (this.tutorialMode) {
      this.updateTutorialContent(alg);
    }
    
    if (this.codeViewMode) {
      this.updateCodeView(alg);
    }
  }

  updateTutorialContent(alg) {
    const info = this.algorithmData[alg];
    document.getElementById('tutorialContent').innerHTML = `
      <div class="tutorial-section">
        <h4>🎯 Como Funciona o ${info.name}</h4>
        <p>${info.tutorial}</p>
      </div>
      <div class="tutorial-section">
        <h4>📊 Complexidade de Tempo</h4>
        <ul>
          <li><strong>Melhor caso:</strong> ${info.timeComplexity.best}</li>
          <li><strong>Caso médio:</strong> ${info.timeComplexity.average}</li>
          <li><strong>Pior caso:</strong> ${info.timeComplexity.worst}</li>
        </ul>
      </div>
      <div class="tutorial-section">
        <h4>💾 Complexidade de Espaço</h4>
        <p>${info.spaceComplexity}</p>
      </div>
      <div class="tutorial-section">
        <h4>🏷️ Propriedades</h4>
        <ul>
          <li><strong>Estável:</strong> ${info.stable ? '✅ Sim' : '❌ Não'}</li>
          <li><strong>In-place:</strong> ${info.inPlace ? '✅ Sim' : '❌ Não'}</li>
        </ul>
      </div>
      <div class="tutorial-section">
        <h4>💡 Quando Usar</h4>
        <p>${info.useCase}</p>
      </div>
      <div class="tutorial-section">
        <h4>✅ Vantagens</h4>
        <ul>${info.advantages.map(adv => `<li>${adv}</li>`).join('')}</ul>
      </div>
      <div class="tutorial-section">
        <h4>❌ Desvantagens</h4>
        <ul>${info.disadvantages.map(dis => `<li>${dis}</li>`).join('')}</ul>
      </div>
    `;
  }

  resetStats() {
    this.comparisons = 0;
    this.swaps = 0;
    this.startTime = Date.now();
    this.updateStats();
  }

  randomize() {
    if (this.running) return;
    
    this.size = parseInt(document.getElementById('size').value);
    if (this.size < 5) this.size = 5;
    if (this.size > 100) this.size = 100;
    document.getElementById('size').value = this.size;
    document.getElementById('sizeRange').value = this.size;
    
    this.arr = this.randomArray(this.size);
    this.original = this.arr.slice();
    this.render(this.arr);
    this.resetStats();
    this.setAlgorithmInfo(document.getElementById('algorithm').value);
    
    if (this.tutorialMode) {
      this.showTutorialMessage('🔄 Array embaralhado! Agora você pode executar o algoritmo e observar como funciona.');
    }
  }

  reset() {
    if (this.running) return;
    
    this.arr = this.original.slice();
    this.render(this.arr);
    this.resetStats();
    this.setAlgorithmInfo(document.getElementById('algorithm').value);
    
    if (this.tutorialMode) {
      this.showTutorialMessage('⏹️ Array resetado para o estado inicial. Pronto para uma nova execução!');
    }
  }

  updateControls(disabled) {
    const controls = ['algorithm', 'size', 'sizeRange', 'speed'];
    controls.forEach(id => {
      const element = document.getElementById(id);
      if (element) element.disabled = disabled;
    });
    
    const sortBtn = document.getElementById('sortBtn');
    if (sortBtn) {
      sortBtn.textContent = disabled ? '⏸️ Executando...' : '▶️ Iniciar Ordenação';
      sortBtn.disabled = disabled;
    }
    
    // Desabilitar outros botões durante ordenação
    const buttons = ['randomize()', 'reset()'];
    buttons.forEach(onclick => {
      const btn = document.querySelector(`button[onclick="${onclick}"]`);
      if (btn) btn.disabled = disabled;
    });
  }

  showTutorialMessage(message) {
    const info = document.getElementById('info');
    const originalContent = info.innerHTML;
    info.innerHTML = `<div class="tutorial-message">💡 <strong>Tutorial:</strong> ${message}</div>`;
    info.classList.add('sorting');
    
    setTimeout(() => {
      info.innerHTML = originalContent;
      info.classList.remove('sorting');
    }, 3500);
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // === ALGORITMOS AVANÇADOS COM ANÁLISE PROFUNDA ===
  
  async bubbleSort() {
    let n = this.arr.length;
    if (this.tutorialMode) {
      this.showTutorialMessage('🫧 Iniciando Bubble Sort! Observe como as "bolhas" maiores sobem para o final...');
    }
    
    for (let i = 0; i < n - 1; i++) {
      let swapped = false;
      
      for (let j = 0; j < n - i - 1; j++) {
        if (!this.running) return;
        
        this.comparisons++;
        this.render(this.arr, [j, j + 1], [], Array.from({length: i}, (_, k) => n - 1 - k));
        await this.sleep(this.speed);
        
        if (this.arr[j] > this.arr[j + 1]) {
          [this.arr[j], this.arr[j + 1]] = [this.arr[j + 1], this.arr[j]];
          this.swaps++;
          swapped = true;
          
          if (this.tutorialMode && this.swaps % 5 === 0) {
            this.showTutorialMessage(`💫 Troca ${this.swaps}: Elemento ${this.arr[j+1]} "borbulhou" uma posição!`);
          }
        }
        this.updateStats();
      }
      
      // Otimização: se não houve trocas, o array está ordenado
      if (!swapped) {
        if (this.tutorialMode) {
          this.showTutorialMessage('🎉 Otimização ativada! Nenhuma troca necessária - array já está ordenado.');
        }
        break;
      }
    }
    
    this.render(this.arr, [], [], Array.from({length: n}, (_, i) => i));
    if (this.tutorialMode) {
      this.showTutorialMessage('🎉 Bubble Sort concluído! Todas as bolhas encontraram seu lugar.');
    }
  }

  async selectionSort() {
    let n = this.arr.length;
    if (this.tutorialMode) {
      this.showTutorialMessage('🎯 Iniciando Selection Sort! Vamos selecionar o menor elemento repetidamente...');
    }
    
    for (let i = 0; i < n - 1; i++) {
      if (!this.running) return;
      
      let minIdx = i;
      this.render(this.arr, [], [minIdx], Array.from({length: i}, (_, k) => k));
      await this.sleep(this.speed);
      
      if (this.tutorialMode) {
        this.showTutorialMessage(`🔍 Procurando o menor elemento na parte não ordenada...`);
      }
      
      for (let j = i + 1; j < n; j++) {
        if (!this.running) return;
        
        this.comparisons++;
        this.render(this.arr, [j, minIdx], [minIdx], Array.from({length: i}, (_, k) => k));
        await this.sleep(this.speed / 2);
        
        if (this.arr[j] < this.arr[minIdx]) {
          minIdx = j;
          if (this.tutorialMode && Math.random() < 0.3) {
            this.showTutorialMessage(`🎯 Novo menor encontrado: ${this.arr[j]} na posição ${j}`);
          }
        }
        this.updateStats();
      }
      
      if (minIdx !== i) {
        [this.arr[i], this.arr[minIdx]] = [this.arr[minIdx], this.arr[i]];
        this.swaps++;
        
        if (this.tutorialMode) {
          this.showTutorialMessage(`✅ Menor elemento ${this.arr[i]} colocado na posição ${i}`);
        }
      }
      
      this.updateStats();
    }
    
    this.render(this.arr, [], [], Array.from({length: n}, (_, i) => i));
    if (this.tutorialMode) {
      this.showTutorialMessage('🎉 Selection Sort concluído! Todos os elementos estão em suas posições finais.');
    }
  }

  async insertionSort() {
    let n = this.arr.length;
    if (this.tutorialMode) {
      this.showTutorialMessage('📝 Iniciando Insertion Sort! Como organizar cartas na mão...');
    }
    
    for (let i = 1; i < n; i++) {
      if (!this.running) return;
      
      let key = this.arr[i];
      let j = i - 1;
      
      this.render(this.arr, [i], [i], Array.from({length: i}, (_, k) => k));
      await this.sleep(this.speed);
      
      if (this.tutorialMode) {
        this.showTutorialMessage(`📌 Inserindo elemento ${key} na posição correta...`);
      }
      
      while (j >= 0 && this.arr[j] > key) {
        if (!this.running) return;
        
        this.comparisons++;
        this.render(this.arr, [j, j + 1], [j + 1], Array.from({length: i}, (_, k) => k <= j - 1 ? k : -1).filter(x => x >= 0));
        await this.sleep(this.speed / 2);
        
        this.arr[j + 1] = this.arr[j];
        j--;
        this.swaps++;
        this.updateStats();
      }
      
      this.arr[j + 1] = key;
      if (j + 1 !== i) this.swaps++;
      
      this.render(this.arr, [], [], Array.from({length: i + 1}, (_, k) => k));
      await this.sleep(this.speed / 2);
      this.updateStats();
    }
    
    if (this.tutorialMode) {
      this.showTutorialMessage('🎉 Insertion Sort concluído! Cada elemento foi inserido em sua posição correta.');
    }
  }

  async quickSort(start = 0, end = this.arr.length - 1) {
    if (start >= end || !this.running) return;
    
    if (start === 0 && end === this.arr.length - 1 && this.tutorialMode) {
      this.showTutorialMessage('⚡ Iniciando Quick Sort! Dividir para conquistar com pivôs...');
    }
    
    let pivotIndex = await this.partition(start, end);
    
    // Recursão assíncrona
    await Promise.all([
      this.quickSort(start, pivotIndex - 1),
      this.quickSort(pivotIndex + 1, end)
    ]);
    
    if (start === 0 && end === this.arr.length - 1) {
      this.render(this.arr, [], [], Array.from({length: this.arr.length}, (_, i) => i));
      if (this.tutorialMode) {
        this.showTutorialMessage('🎉 Quick Sort concluído! Todas as partições foram organizadas.');
      }
    }
  }

  async partition(start, end) {
    let pivotValue = this.arr[end];
    let pivotIndex = start;
    
    if (this.tutorialMode && Math.random() < 0.2) {
      this.showTutorialMessage(`🎯 Pivô escolhido: ${pivotValue}. Organizando elementos ao redor dele...`);
    }
    
    for (let i = start; i < end; i++) {
      if (!this.running) return pivotIndex;
      
      this.comparisons++;
      this.render(this.arr, [i], [pivotIndex], [], [end]);
      await this.sleep(this.speed / 2);
      
      if (this.arr[i] < pivotValue) {
        [this.arr[i], this.arr[pivotIndex]] = [this.arr[pivotIndex], this.arr[i]];
        pivotIndex++;
        this.swaps++;
      }
      this.updateStats();
    }
    
    [this.arr[pivotIndex], this.arr[end]] = [this.arr[end], this.arr[pivotIndex]];
    this.swaps++;
    this.updateStats();
    
    this.render(this.arr, [], [pivotIndex], [], [pivotIndex]);
    await this.sleep(this.speed);
    
    return pivotIndex;
  }

  async mergeSort(start = 0, end = this.arr.length - 1) {
    if (start >= end || !this.running) return;
    
    if (start === 0 && end === this.arr.length - 1 && this.tutorialMode) {
      this.showTutorialMessage('🔄 Iniciando Merge Sort! Dividindo e mesclando ordenadamente...');
    }
    
    let mid = Math.floor((start + end) / 2);
    
    await this.mergeSort(start, mid);
    await this.mergeSort(mid + 1, end);
    await this.merge(start, mid, end);
    
    if (start === 0 && end === this.arr.length - 1) {
      this.render(this.arr, [], [], Array.from({length: this.arr.length}, (_, i) => i));
      if (this.tutorialMode) {
        this.showTutorialMessage('🎉 Merge Sort concluído! Todas as mesclagens realizadas perfeitamente.');
      }
    }
  }

  async merge(start, mid, end) {
    let left = this.arr.slice(start, mid + 1);
    let right = this.arr.slice(mid + 1, end + 1);
    let i = 0, j = 0, k = start;
    
    if (this.tutorialMode && Math.random() < 0.1) {
      this.showTutorialMessage(`🔄 Mesclando arrays: [${left.join(', ')}] e [${right.join(', ')}]`);
    }
    
    while (i < left.length && j < right.length) {
      if (!this.running) return;
      
      this.comparisons++;
      this.render(this.arr, [start + i, mid + 1 + j], Array.from({length: k - start}, (_, idx) => start + idx));
      await this.sleep(this.speed / 2);
      
      if (left[i] <= right[j]) {
        this.arr[k] = left[i];
        i++;
      } else {
        this.arr[k] = right[j];
        j++;
      }
      this.swaps++;
      k++;
      this.updateStats();
    }
    
    while (i < left.length) {
      this.arr[k] = left[i];
      i++;
      k++;
      this.swaps++;
    }
    
    while (j < right.length) {
      this.arr[k] = right[j];
      j++;
      k++;
      this.swaps++;
    }
    
    this.render(this.arr, [], Array.from({length: end - start + 1}, (_, idx) => start + idx));
    await this.sleep(this.speed);
  }

  async heapSort() {
    let n = this.arr.length;
    if (this.tutorialMode) {
      this.showTutorialMessage('🌳 Iniciando Heap Sort! Fase 1: Construindo heap...');
    }
    
    // Construir heap (heapify)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await this.heapify(n, i, '🏗️ Construindo max-heap...');
    }
    
    if (this.tutorialMode) {
      this.showTutorialMessage('📤 Fase 2: Extraindo elementos do heap...');
    }
    
    // Extrair elementos do heap
    for (let i = n - 1; i > 0; i--) {
      if (!this.running) return;
      
      [this.arr[0], this.arr[i]] = [this.arr[i], this.arr[0]];
      this.swaps++;
      
      this.render(this.arr, [0, i], [], Array.from({length: n - i}, (_, k) => n - 1 - k));
      await this.sleep(this.speed);
      
      await this.heapify(i, 0, i === n - 1 ? '📤 Extraindo maior elemento...' : '');
      this.updateStats();
    }
    
    this.render(this.arr, [], [], Array.from({length: n}, (_, i) => i));
    if (this.tutorialMode) {
      this.showTutorialMessage('🎉 Heap Sort concluído! Heap construído e elementos extraídos ordenadamente.');
    }
  }

  async heapify(n, i, message = '') {
    if (!this.running) return;
    
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    
    if (left < n) {
      this.comparisons++;
      if (this.arr[left] > this.arr[largest]) largest = left;
    }
    
    if (right < n) {
      this.comparisons++;
      if (this.arr[right] > this.arr[largest]) largest = right;
    }
    
    if (largest !== i) {
      this.render(this.arr, [i, largest], [largest]);
      await this.sleep(this.speed / 3);
      
      [this.arr[i], this.arr[largest]] = [this.arr[largest], this.arr[i]];
      this.swaps++;
      
      if (this.tutorialMode && message && Math.random() < 0.1) {
        this.showTutorialMessage(message);
      }
      
      await this.heapify(n, largest);
    }
    this.updateStats();
  }

  // === FUNÇÃO PRINCIPAL DE ORDENAÇÃO ===
  async sort() {
    if (this.running) {
      this.running = false;
      this.updateControls(false);
      return;
    }
    
    this.running = true;
    this.updateControls(true);
    this.resetStats();
    
    this.currentAlgorithm = document.getElementById('algorithm').value;
    this.speed = parseInt(document.getElementById('speed').value);
    
    try {
      switch (this.currentAlgorithm) {
        case 'bubble': await this.bubbleSort(); break;
        case 'selection': await this.selectionSort(); break;
        case 'insertion': await this.insertionSort(); break;
        case 'quick': await this.quickSort(); break;
        case 'merge': await this.mergeSort(); break;
        case 'heap': await this.heapSort(); break;
      }
      
      // Animação de celebração
      for (let i = 0; i < 3; i++) {
        this.render(this.arr, [], [], []);
        await this.sleep(150);
        this.render(this.arr, [], [], Array.from({length: this.arr.length}, (_, idx) => idx));
        await this.sleep(150);
      }
      
    } catch (error) {
      console.error('Erro durante ordenação:', error);
    } finally {
      this.running = false;
      this.updateControls(false);
      
      // Mostrar estatísticas finais
      if (this.tutorialMode) {
        const info = this.algorithmData[this.currentAlgorithm];
        const elapsed = ((Date.now() - this.startTime) / 1000).toFixed(1);
        this.showTutorialMessage(`🎊 ${info.name} finalizado! Comparações: ${this.comparisons}, Trocas: ${this.swaps}, Tempo: ${elapsed}s`);
      }
    }
  }

  // === INICIALIZAÇÃO DO SISTEMA ===
  initialize() {
    // Estado inicial
    this.randomize();
    this.setAlgorithmInfo('bubble');
    
    // Event listeners
    document.getElementById('algorithm').addEventListener('change', (e) => {
      if (this.running) return;
      this.currentAlgorithm = e.target.value;
      this.setAlgorithmInfo(this.currentAlgorithm);
    });
    
    document.getElementById('size').addEventListener('input', (e) => {
      if (this.running) return;
      document.getElementById('sizeRange').value = e.target.value;
      this.randomize();
    });
    
    document.getElementById('sizeRange').addEventListener('input', (e) => {
      if (this.running) return;
      document.getElementById('size').value = e.target.value;
      this.randomize();
    });
    
    document.getElementById('speed').addEventListener('input', (e) => {
      this.speed = parseInt(e.target.value);
    });
    
    // Atalhos de teclado
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && !this.running) {
        e.preventDefault();
        this.sort();
      } else if (e.code === 'KeyR' && !this.running) {
        e.preventDefault();
        this.randomize();
      } else if (e.code === 'KeyT') {
        e.preventDefault();
        toggleTutorial();
      } else if (e.code === 'KeyC') {
        e.preventDefault();
        toggleComparison();
      }
    });
    
    // Mensagem de boas-vindas
    setTimeout(() => {
      const info = document.getElementById('info');
      const originalContent = info.innerHTML;
      info.innerHTML = `
        <div class="welcome-message">
          🚀 <strong>Bem-vindo à Plataforma Profissional de Algoritmos!</strong>
          <br>• Escolha um algoritmo e clique "Iniciar Ordenação"
          <br>• Use os atalhos: Espaço (executar), R (randomizar), T (tutorial), C (comparar)
          <br>• Ative os modos educativos para análise detalhada
        </div>
      `;
      info.classList.add('sorting');
      
      setTimeout(() => {
        info.innerHTML = originalContent;
        info.classList.remove('sorting');
      }, 5000);
    }, 500);
  }
}

// === INSTÂNCIA GLOBAL DO SISTEMA ===
let algorithmSystem;

// === FUNÇÕES GLOBAIS PARA COMPATIBILIDADE ===
function sort() {
  if (algorithmSystem) algorithmSystem.sort();
}

function randomize() {
  if (algorithmSystem) algorithmSystem.randomize();
}

function reset() {
  if (algorithmSystem) algorithmSystem.reset();
}

function setVisualizationMode(mode) {
  if (algorithmSystem) {
    algorithmSystem.visualizationMode = mode;
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    algorithmSystem.render(algorithmSystem.arr);
  }
}

function initialize() {
  algorithmSystem = new AlgorithmVisualizationSystem();
  algorithmSystem.initialize();
}

// === CONTROLE DE MODOS (definidas externamente) ===
window.toggleTutorial = function() {
  if (!algorithmSystem) return;
  
  algorithmSystem.tutorialMode = !algorithmSystem.tutorialMode;
  const panel = document.getElementById('tutorialPanel');
  const btn = document.getElementById('tutorialBtn');
  
  if (algorithmSystem.tutorialMode) {
    panel.classList.add('active');
    btn.textContent = '📚 Tutorial ON';
    btn.style.background = 'var(--gradient-success)';
    algorithmSystem.updateTutorialContent(algorithmSystem.currentAlgorithm);
    algorithmSystem.showTutorialMessage('Modo tutorial ativado! Observe as explicações detalhadas durante a ordenação.');
  } else {
    panel.classList.remove('active');
    btn.textContent = '📚 Tutorial Interativo';
    btn.style.background = '';
  }
};

window.toggleCodeView = function() {
  if (!algorithmSystem) return;
  
  algorithmSystem.codeViewMode = !algorithmSystem.codeViewMode;
  const panel = document.getElementById('codePanel');
  const btn = document.getElementById('codeBtn');
  
  if (algorithmSystem.codeViewMode) {
    panel.classList.add('active');
    btn.textContent = '💻 Código ON';
    btn.style.background = 'var(--gradient-success)';
    updateCodeView(algorithmSystem.currentAlgorithm);
  } else {
    panel.classList.remove('active');
    btn.textContent = '💻 Visualização de Código';
    btn.style.background = '';
  }
};

window.toggleComparison = function() {
  if (!algorithmSystem) return;
  
  algorithmSystem.comparisonMode = !algorithmSystem.comparisonMode;
  const panel = document.getElementById('comparisonPanel');
  const btn = document.getElementById('compareBtn');
  
  if (algorithmSystem.comparisonMode) {
    panel.classList.add('active');
    btn.textContent = '📊 Comparação ON';
    btn.style.background = 'var(--gradient-success)';
  } else {
    panel.classList.remove('active');
    btn.textContent = '📊 Análise Comparativa';
    btn.style.background = '';
  }
};

window.toggleMetrics = function() {
  if (!algorithmSystem) return;
  
  algorithmSystem.metricsMode = !algorithmSystem.metricsMode;
  const panel = document.getElementById('metricsPanel');
  const btn = document.getElementById('metricsBtn');
  
  if (algorithmSystem.metricsMode) {
    panel.classList.add('active');
    btn.textContent = '📈 Métricas ON';
    btn.style.background = 'var(--gradient-success)';
  } else {
    panel.classList.remove('active');
    btn.textContent = '📈 Métricas Avançadas';
    btn.style.background = '';
  }
};

// === FUNÇÃO DE ATUALIZAÇÃO DO CÓDIGO ===
function updateCodeView(algorithm) {
  const pseudoCodes = {
    bubble: `BUBBLE_SORT(A):
  n = length(A)
  for i = 0 to n-2:
    swapped = false
    for j = 0 to n-i-2:
      if A[j] > A[j+1]:
        swap(A[j], A[j+1])
        swapped = true
    if not swapped:
      break  // Otimização: array já ordenado`,
    
    selection: `SELECTION_SORT(A):
  n = length(A)
  for i = 0 to n-2:
    min_idx = i
    for j = i+1 to n-1:
      if A[j] < A[min_idx]:
        min_idx = j
    swap(A[i], A[min_idx])`,
    
    insertion: `INSERTION_SORT(A):
  for i = 1 to length(A)-1:
    key = A[i]
    j = i - 1
    while j >= 0 and A[j] > key:
      A[j+1] = A[j]
      j = j - 1
    A[j+1] = key`,
    
    quick: `QUICK_SORT(A, low, high):
  if low < high:
    pivot = PARTITION(A, low, high)
    QUICK_SORT(A, low, pivot-1)
    QUICK_SORT(A, pivot+1, high)

PARTITION(A, low, high):
  pivot = A[high]
  i = low - 1
  for j = low to high-1:
    if A[j] <= pivot:
      i = i + 1
      swap(A[i], A[j])
  swap(A[i+1], A[high])
  return i + 1`,
    
    merge: `MERGE_SORT(A, left, right):
  if left < right:
    mid = (left + right) / 2
    MERGE_SORT(A, left, mid)
    MERGE_SORT(A, mid+1, right)
    MERGE(A, left, mid, right)

MERGE(A, left, mid, right):
  // Cria arrays temporários L e R
  L = A[left...mid]
  R = A[mid+1...right]
  
  // Mescla ordenadamente
  i = j = 0, k = left
  while i < |L| and j < |R|:
    if L[i] <= R[j]:
      A[k] = L[i++]
    else:
      A[k] = R[j++]
    k++
  
  // Copia elementos restantes
  while i < |L|: A[k++] = L[i++]
  while j < |R|: A[k++] = R[j++]`,
    
    heap: `HEAP_SORT(A):
  BUILD_MAX_HEAP(A)
  for i = length(A)-1 down to 1:
    swap(A[0], A[i])
    MAX_HEAPIFY(A, 0, i)

BUILD_MAX_HEAP(A):
  for i = floor(length(A)/2)-1 down to 0:
    MAX_HEAPIFY(A, i, length(A))

MAX_HEAPIFY(A, i, heap_size):
  left = 2*i + 1
  right = 2*i + 2
  largest = i
  
  if left < heap_size and A[left] > A[largest]:
    largest = left
  if right < heap_size and A[right] > A[largest]:
    largest = right
    
  if largest != i:
    swap(A[i], A[largest])
    MAX_HEAPIFY(A, largest, heap_size)`
  };

  const complexityAnalysis = {
    bubble: `
      <h5>Análise Matemática:</h5>
      <p><strong>Comparações:</strong> Σ(i=1 to n-1) Σ(j=1 to n-i) 1 = n(n-1)/2 ≈ O(n²)</p>
      <p><strong>Trocas:</strong> No pior caso (array reverso) = n(n-1)/2 ≈ O(n²)</p>
      <p><strong>Melhor caso:</strong> Array ordenado, apenas O(n) comparações com otimização</p>
    `,
    selection: `
      <h5>Análise Matemática:</h5>
      <p><strong>Comparações:</strong> Sempre n(n-1)/2 ≈ O(n²) independente da entrada</p>
      <p><strong>Trocas:</strong> Exatamente n-1 trocas em todos os casos = O(n)</p>
      <p><strong>Invariante:</strong> Após i iterações, os primeiros i elementos estão ordenados</p>
    `,
    insertion: `
      <h5>Análise Matemática:</h5>
      <p><strong>Melhor caso:</strong> Array ordenado, apenas n-1 comparações = O(n)</p>
      <p><strong>Pior caso:</strong> Array reverso, Σ(i=1 to n-1) i = n(n-1)/2 ≈ O(n²)</p>
      <p><strong>Caso médio:</strong> Aproximadamente n²/4 comparações = O(n²)</p>
    `,
    quick: `
      <h5>Análise Matemática:</h5>
      <p><strong>Recorrência:</strong> T(n) = T(k) + T(n-k-1) + Θ(n)</p>
      <p><strong>Melhor/Médio:</strong> k ≈ n/2, logo T(n) = 2T(n/2) + Θ(n) = O(n log n)</p>
      <p><strong>Pior caso:</strong> k = 0 ou k = n-1, logo T(n) = T(n-1) + Θ(n) = O(n²)</p>
    `,
    merge: `
      <h5>Análise Matemática:</h5>
      <p><strong>Recorrência:</strong> T(n) = 2T(n/2) + Θ(n)</p>
      <p><strong>Pelo Teorema Mestre:</strong> a=2, b=2, f(n)=n, caso 2 → T(n) = Θ(n log n)</p>
      <p><strong>Espaço:</strong> Θ(n) para arrays auxiliares + O(log n) para recursão</p>
    `,
    heap: `
      <h5>Análise Matemática:</h5>
      <p><strong>BUILD_HEAP:</strong> Σ(h=0 to log n) (n/2^(h+1)) * h = O(n)</p>
      <p><strong>n-1 extrações:</strong> Cada HEAPIFY = O(log n), total = O(n log n)</p>
      <p><strong>Total:</strong> O(n) + O(n log n) = O(n log n)</p>
    `
  };

  document.getElementById('pseudoCode').textContent = pseudoCodes[algorithm] || 'Código não encontrado';
  document.getElementById('complexityAnalysis').innerHTML = complexityAnalysis[algorithm] || 'Análise não disponível';
}
