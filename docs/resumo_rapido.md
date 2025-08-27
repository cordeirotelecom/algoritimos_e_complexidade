# 🚀 RESUMO RÁPIDO - Algoritmos e Complexidade
## Guia de Consulta Instantânea

---

## ⚡ COMPLEXIDADES - COLA RÁPIDA

### **📊 Hierarquia de Complexidades**
```
O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2^n) < O(n!)
```

| **Notação** | **Nome** | **n=100** | **n=1000** | **Exemplo** |
|-------------|----------|-----------|------------|-------------|
| **O(1)** | Constante | 1 | 1 | Array[index] |
| **O(log n)** | Logarítmica | 7 | 10 | Busca binária |
| **O(n)** | Linear | 100 | 1.000 | Busca linear |
| **O(n log n)** | Linearítmica | 700 | 10.000 | Merge sort |
| **O(n²)** | Quadrática | 10.000 | 1.000.000 | Bubble sort |
| **O(2^n)** | Exponencial | 10³⁰ | 10³⁰¹ | Força bruta |

---

## 🏗️ ESTRUTURAS DE DADOS - GUIA RÁPIDO

### **📚 Comparação Direta**

| **Estrutura** | **Acesso** | **Busca** | **Inserção** | **Remoção** | **Uso Principal** |
|---------------|------------|-----------|--------------|-------------|-------------------|
| **Array** | O(1) | O(n) | O(n) | O(n) | Acesso por índice |
| **Lista Ligada** | O(n) | O(n) | O(1)* | O(1)* | Inserção frequente |
| **Pilha** | - | - | O(1) | O(1) | LIFO (undo, histórico) |
| **Fila** | - | - | O(1) | O(1) | FIFO (processos) |
| **Hash Table** | - | O(1) | O(1) | O(1) | Chave-valor rápido |
| **BST** | O(log n) | O(log n) | O(log n) | O(log n) | Dados ordenados |
| **Heap** | - | - | O(log n) | O(log n) | Prioridades |

*Com ponteiro para posição

### **🎯 Quando Usar Cada Uma**

**Array**: Acesso frequente por índice, tamanho conhecido
```c
int scores[100];  // Pontuações de 100 jogadores
printf("%d", scores[50]);  // O(1)
```

**Lista Ligada**: Inserções/remoções frequentes, tamanho variável
```c
No* lista = NULL;
inserir_inicio(&lista, valor);  // O(1)
```

**Pilha**: Histórico, desfazer ações, recursão
```c
push(pilha, pagina);     // Visitar página
pagina = pop(pilha);     // Botão "voltar"
```

**Fila**: Ordem de chegada, processos, impressão
```c
enqueue(fila, processo);  // Adicionar processo
processo = dequeue(fila); // Executar próximo
```

**Hash Table**: Busca rápida chave-valor
```c
insert(hash, "maria", telefone);
int tel = get(hash, "maria");  // O(1)
```

**BST**: Dados sempre ordenados, busca eficiente
```c
insert_bst(&raiz, 50);
No* resultado = search_bst(raiz, 30);  // O(log n)
```

---

## 🔀 ALGORITMOS DE ORDENAÇÃO - GUIA RÁPIDO

### **⚡ Escolha Rápida**

```c
void ordenar_inteligente(int arr[], int n) {
    if (n < 20) {
        insertion_sort(arr, n);      // Simples, rápido para n pequeno
    } else if (quase_ordenado(arr, n)) {
        insertion_sort(arr, n);      // O(n) para quase ordenado
    } else if (precisa_estabilidade) {
        merge_sort(arr, 0, n-1);     // Sempre O(n log n), estável
    } else {
        quick_sort(arr, 0, n-1);     // Mais rápido na prática
    }
}
```

### **📊 Comparação de Algoritmos**

| **Algoritmo** | **Melhor** | **Médio** | **Pior** | **Estável** | **In-place** | **Quando Usar** |
|---------------|------------|-----------|----------|-------------|--------------|-----------------|
| **Bubble Sort** | O(n) | O(n²) | O(n²) | ✅ | ✅ | Nunca (só didático) |
| **Selection Sort** | O(n²) | O(n²) | O(n²) | ❌ | ✅ | Nunca (só didático) |
| **Insertion Sort** | O(n) | O(n²) | O(n²) | ✅ | ✅ | n < 50, quase ordenado |
| **Merge Sort** | O(n log n) | O(n log n) | O(n log n) | ✅ | ❌ | Estabilidade necessária |
| **Quick Sort** | O(n log n) | O(n log n) | O(n²) | ❌ | ✅ | Uso geral |
| **Heap Sort** | O(n log n) | O(n log n) | O(n log n) | ❌ | ✅ | Garantia O(n log n) |

---

## 🔍 ALGORITMOS DE BUSCA - GUIA RÁPIDO

### **⚡ Escolha por Situação**

**Dados Não Ordenados:**
```c
// Única opção: Busca Linear O(n)
for (int i = 0; i < n; i++) {
    if (arr[i] == valor) return i;
}
```

**Dados Ordenados:**
```c
// Busca Binária O(log n)
int busca_binaria(int arr[], int n, int valor) {
    int esq = 0, dir = n - 1;
    while (esq <= dir) {
        int meio = esq + (dir - esq) / 2;
        if (arr[meio] == valor) return meio;
        if (arr[meio] < valor) esq = meio + 1;
        else dir = meio - 1;
    }
    return -1;
}
```

**Chave-Valor:**
```c
// Hash Table O(1)
HashTable ht;
insert(&ht, chave, valor);
int* resultado = search(&ht, chave);
```

---

## 💡 DICAS PRÁTICAS - COLA

### **🔧 Debugging Rápido**

**1. Contar Operações:**
```c
int comparacoes = 0;
for (int i = 0; i < n; i++) {
    comparacoes++;  // Contar para análise
    if (arr[i] == valor) return i;
}
printf("Comparações: %d\n", comparacoes);
```

**2. Medir Tempo:**
```c
clock_t inicio = clock();
algoritmo();
clock_t fim = clock();
double tempo = ((double)(fim - inicio)) / CLOCKS_PER_SEC;
printf("Tempo: %.6f segundos\n", tempo);
```

**3. Validar Entrada:**
```c
if (arr == NULL || n <= 0) {
    fprintf(stderr, "Entrada inválida!\n");
    return -1;
}
```

### **⚠️ Armadilhas Comuns**

**1. Overflow:**
```c
// RUIM
int meio = (esq + dir) / 2;  // Pode dar overflow

// BOM
int meio = esq + (dir - esq) / 2;
```

**2. Memory Leaks:**
```c
int* ptr = malloc(n * sizeof(int));
// ... usar ptr ...
free(ptr);
ptr = NULL;  // Boa prática
```

**3. Bounds Checking:**
```c
if (indice >= 0 && indice < tamanho) {
    return arr[indice];
}
```

---

## 🎯 PROBLEMAS CLÁSSICOS - SOLUÇÕES RÁPIDAS

### **1. Buscar Dois Números que Somam Target**
```c
// Hash Table approach - O(n)
int* dois_soma(int nums[], int n, int target) {
    HashTable ht;
    for (int i = 0; i < n; i++) {
        int complemento = target - nums[i];
        if (existe(&ht, complemento)) {
            int* resultado = malloc(2 * sizeof(int));
            resultado[0] = get_indice(&ht, complemento);
            resultado[1] = i;
            return resultado;
        }
        insert(&ht, nums[i], i);
    }
    return NULL;
}
```

### **2. Validar Parênteses Balanceados**
```c
// Pilha approach - O(n)
int parenteses_validos(char* s) {
    Pilha pilha;
    for (int i = 0; s[i]; i++) {
        if (s[i] == '(' || s[i] == '[' || s[i] == '{') {
            push(&pilha, s[i]);
        } else {
            if (vazia(&pilha)) return 0;
            char topo = pop(&pilha);
            if (!combina(topo, s[i])) return 0;
        }
    }
    return vazia(&pilha);
}
```

### **3. Encontrar Maior Subarray**
```c
// Kadane's Algorithm - O(n)
int maior_subarray(int arr[], int n) {
    int max_atual = arr[0];
    int max_global = arr[0];
    
    for (int i = 1; i < n; i++) {
        max_atual = max(arr[i], max_atual + arr[i]);
        max_global = max(max_global, max_atual);
    }
    return max_global;
}
```

### **4. Detectar Ciclo em Lista Ligada**
```c
// Floyd's Algorithm - O(n)
int tem_ciclo(No* cabeca) {
    No* lento = cabeca;
    No* rapido = cabeca;
    
    while (rapido && rapido->proximo) {
        lento = lento->proximo;
        rapido = rapido->proximo->proximo;
        
        if (lento == rapido) return 1;  // Ciclo detectado
    }
    return 0;  // Sem ciclo
}
```

---

## 🚀 OTIMIZAÇÕES INSTANTÂNEAS

### **⚡ Code Patterns**

**1. Early Break:**
```c
// Parar assim que encontrar
for (int i = 0; i < n; i++) {
    if (condicao) {
        return resultado;  // Sair imediatamente
    }
}
```

**2. Cache Dados Frequentes:**
```c
// Calcular uma vez, reusar
int tamanho = strlen(string);  // Fora do loop
for (int i = 0; i < tamanho; i++) {
    // usar i
}
```

**3. Evitar Divisão/Multiplicação:**
```c
// RUIM
for (int i = 0; i < n; i++) {
    result = i * 3;  // Multiplicação a cada iteração
}

// BOM
int multiplicador = 0;
for (int i = 0; i < n; i++) {
    result = multiplicador;
    multiplicador += 3;  // Soma é mais rápida
}
```

**4. Loop Unrolling (para casos específicos):**
```c
// Para pequenos n fixos
switch(n) {
    case 1: processo(arr[0]); break;
    case 2: processo(arr[0]); processo(arr[1]); break;
    case 3: processo(arr[0]); processo(arr[1]); processo(arr[2]); break;
    default: for(int i = 0; i < n; i++) processo(arr[i]);
}
```

---

## 📋 CHECKLIST PRÉ-ENTREGA

### **✅ Validações Essenciais**
- [ ] Ponteiros NULL verificados
- [ ] Bounds de arrays verificados  
- [ ] Casos extremos testados (n=0, n=1)
- [ ] Memory leaks verificados
- [ ] Overflow prevenido

### **📊 Análise de Complexidade**
- [ ] Melhor caso analisado
- [ ] Pior caso analisado
- [ ] Caso médio considerado
- [ ] Complexidade de espaço verificada

### **🔧 Testes Realizados**
- [ ] Arrays pequenos (n < 10)
- [ ] Arrays médios (n = 100-1000)
- [ ] Arrays grandes (n > 10000)
- [ ] Arrays já ordenados
- [ ] Arrays inversamente ordenados
- [ ] Arrays com elementos repetidos

---

## 🎓 DICAS PARA ENTREVISTAS

### **📝 Abordagem Estruturada**

**1. Entender o Problema:**
- Clarificar entrada e saída
- Perguntar sobre restrições
- Dar exemplos pequenos

**2. Pensar em Voz Alta:**
- "Posso usar estrutura auxiliar?"
- "Qual a complexidade esperada?"
- "Há casos especiais?"

**3. Começar Simples:**
- Força bruta primeiro
- Depois otimizar
- Explicar trade-offs

**4. Implementar Limpo:**
- Variáveis com nomes claros
- Comentários nos pontos chave
- Tratamento de erros

**5. Testar Manualmente:**
- Caso típico
- Caso extremo (vazio, unitário)
- Caso limite (overflow, etc.)

### **💬 Frases Úteis**
- "Vou começar com força bruta O(n²) e depois otimizar"
- "Preciso manter a ordem? Então não posso usar Hash Set"
- "Para O(log n), estou pensando em busca binária ou heap"
- "Este problema parece dividir-e-conquistar"
- "Posso usar programação dinâmica aqui"

---

## 🏆 RESUMO DOS RESUMOS

### **🎯 Regra de Ouro**
> **"Correto primeiro, depois otimize"**

### **⚡ Complexidades Mais Importantes**
- **O(1)**: Hash table access, array index
- **O(log n)**: Binary search, balanced tree
- **O(n)**: Linear scan, simple loop
- **O(n log n)**: Optimal sorting, merge
- **O(n²)**: Nested loops, naive algorithms

### **🛠️ Estruturas Mais Usadas**
1. **Array**: Quando precisar de acesso por índice
2. **Hash Table**: Para busca rápida chave-valor
3. **Lista Ligada**: Para inserções frequentes
4. **Pilha**: Para histórico/reversão
5. **Fila**: Para ordem FIFO

### **🚀 Algoritmos Mais Importantes**
1. **Binary Search**: Para dados ordenados
2. **Quick Sort**: Para ordenação geral
3. **Merge Sort**: Quando precisar de estabilidade
4. **DFS/BFS**: Para grafos e árvores
5. **Dijkstra**: Para menor caminho

---

**📚 Este resumo rápido serve como consulta instantânea para os conceitos mais importantes de algoritmos e complexidade.**

*Versão: Express - Última atualização: 27 de agosto de 2025*
