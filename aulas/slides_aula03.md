---
marp: true
theme: default
class: invert
paginate: true
backgroundColor: white
math: mathjax
style: |
  section {
    background-color: white;
    color: #000080;
    border: 3px solid #000080;
    font-family: Arial, sans-serif;
    font-size: 16px;
  }
  h1, h2, h3 {
    color: #000080;
  }
  code {
    background-color: #f0f0f0;
    color: #000080;
  }
  pre {
    background-color: #f0f0f0;
    border: 1px solid #000080;
  }
---

# 🎯 Algoritmos e Complexidade
## Aula 03: Algoritmos de Ordenação - Análise Matemática Completa

**Prof. Vagner Cordeiro**  
**Sistemas de Informação**  
**Material Didático - 2025**

---

## 📋 Agenda Completa da Aula

### **🧮 Parte I: Fundamentos Matemáticos**
1. **Teoria da Ordenação e Conceitos Fundamentais**
2. **Análise Matemática Detalhada de Complexidade**
3. **Cálculo Passo a Passo do Tempo de Execução**

### **⚡ Parte II: Algoritmos Elementares**
4. **Bubble Sort - Análise Completa O(n²)**
5. **Selection Sort - Otimização de Trocas**
6. **Insertion Sort - Melhor Caso O(n)**

### **🚀 Parte III: Algoritmos Avançados**
7. **Merge Sort - Divide-and-Conquer O(n log n)**
8. **Quick Sort - Análise Probabilística**
9. **Heap Sort - Estruturas de Dados Integradas**

### **📊 Parte IV: Análise Prática**
10. **Comparações Experimentais e Benchmarks**
11. **Casos Reais de Aplicação**
12. **Exercícios e Problemas Práticos**

---

## 🎯 Objetivos de Aprendizagem

### **📚 Conhecimentos Teóricos:**
- **Dominar** os fundamentos matemáticos da ordenação
- **Calcular** complexidade de tempo passo a passo
- **Demonstrar** limites teóricos de algoritmos baseados em comparação
- **Compreender** trade-offs entre tempo, espaço e estabilidade

### **💻 Habilidades Práticas:**
- **Implementar** algoritmos clássicos com análise detalhada
- **Otimizar** código para diferentes cenários reais
- **Medir** performance empírica com benchmarks rigorosos
- **Resolver** problemas complexos usando ordenação

### **🚀 Competências Avançadas:**
- **Selecionar** algoritmos apropriados para cada contexto
- **Combinar** técnicas para soluções híbridas
- **Aplicar** ordenação em problemas do mundo real

---

## 🧮 Fundamentos Matemáticos da Ordenação

### **📐 Definição Formal Completa**

**Problema da Ordenação:**
> Dada uma sequência $A = \langle a_1, a_2, ..., a_n \rangle$ de $n$ elementos e uma **relação de ordem total** $\leq$, encontrar uma **permutação** $A' = \langle a'_1, a'_2, ..., a'_n \rangle$ tal que:
> $$a'_1 \leq a'_2 \leq a'_3 \leq ... \leq a'_n$$

### **🔍 Análise Matemática Fundamental**

**Teorema (Limite Inferior para Ordenação):**
> Qualquer algoritmo de ordenação baseado em **comparações** requer no mínimo $\Omega(n \log n)$ comparações no pior caso.

**📊 Prova Detalhada:**
1. **Espaço de permutações:** Existem $n!$ permutações possíveis
2. **Árvore de decisão:** Cada comparação gera no máximo 2 resultados
3. **Altura mínima:** $h \geq \log_2(n!)$
4. **Aproximação de Stirling:** $\log_2(n!) \approx n \log_2 n - n \log_2 e + O(\log n)$
5. **Conclusão:** $h = \Omega(n \log n)$

### **📈 Exemplo Numérico:**
- Para $n = 8$: $8! = 40.320$ permutações
- $\log_2(40.320) \approx 15.3$ comparações mínimas
- Na prática: algoritmos ótimos usam ~$18-20$ comparações

**Invariantes de Ordenação:**
- Preservação de elementos (sem perda ou adição)
- Manutenção da relação de ordem estabelecida
- Estabilidade (quando aplicável)

---

## Análise de Complexidade: Limites Teóricos

### Limite Inferior para Algoritmos Baseados em Comparação

**Teorema:** Qualquer algoritmo de ordenação baseado em comparações requer $\Omega(n \log n)$ comparações no pior caso.

**Demonstração (Árvore de Decisão):**
- Existem $n!$ permutações possíveis
- Cada comparação divide o espaço de possibilidades em no máximo 2 partes
- Altura mínima da árvore: $\lceil \log_2(n!) \rceil$
- Pela aproximação de Stirling: $\log_2(n!) = \Theta(n \log n)$

$$\log_2(n!) \geq \log_2\left(\left(\frac{n}{e}\right)^n\right) = n \log_2\left(\frac{n}{e}\right) = \Omega(n \log n)$$

### Classificação por Complexidade

| **Classe** | **Complexidade** | **Algoritmos** |
|------------|------------------|----------------|
| **Quadrática** | $O(n^2)$ | Bubble, Selection, Insertion |
| **Linearítmica** | $O(n \log n)$ | Merge, Heap, Quick (avg) |
| **Linear** | $O(n)$ | Counting, Radix, Bucket |
| **Sublinear** | $O(\log n)$ | Binary Search (busca) |

---

## ⚡ Parte II: Algoritmos Elementares - Análise Completa

### 🔵 **Bubble Sort: O Algoritmo das Bolhas**

**🎯 Princípio Fundamental:**
> Comparar elementos **adjacentes** e trocar se estiverem fora de ordem. O maior elemento "borbulha" para a posição final a cada iteração.

**📊 Análise Matemática Detalhada:**

**Número de Comparações:**
$$C(n) = \sum_{i=0}^{n-2} (n-1-i) = \sum_{j=1}^{n-1} j = \frac{(n-1)n}{2} = \frac{n^2-n}{2}$$

**Número de Trocas:**
- **Melhor caso:** $T = 0$ (array ordenado)
- **Pior caso:** $T = C(n) = \frac{n(n-1)}{2}$ (array reverso)
- **Caso médio:** $T = \frac{n(n-1)}{4}$ (análise probabilística)

```c
void bubble_sort_completo(int arr[], int n) {
    int comparacoes = 0, trocas = 0;
    
    for (int i = 0; i < n - 1; i++) {
        int houve_troca = 0;  // Flag de otimização
        
        for (int j = 0; j < n - i - 1; j++) {
            comparacoes++;  // Conta cada comparação
            
            if (arr[j] > arr[j + 1]) {
                // Troca usando XOR (sem variável temporária)
                arr[j] ^= arr[j + 1];
                arr[j + 1] ^= arr[j];
                arr[j] ^= arr[j + 1];
                trocas++;
                houve_troca = 1;
            }
        }
        
        // Otimização: se não houve trocas, já está ordenado
        if (!houve_troca) break;
    }
    
    printf("Comparações: %d, Trocas: %d\n", comparacoes, trocas);
}
```

**🎯 Exemplo Prático Passo a Passo:**
```
Entrada: [64, 34, 25, 12, 22, 11, 90]

Passada 1: [34, 25, 12, 22, 11, 64, 90] ← 90 na posição final
Passada 2: [25, 12, 22, 11, 34, 64, 90] ← 64 na posição final  
Passada 3: [12, 22, 11, 25, 34, 64, 90] ← 34 na posição final
Passada 4: [12, 11, 22, 25, 34, 64, 90] ← 25 na posição final
Passada 5: [11, 12, 22, 25, 34, 64, 90] ← 22 na posição final
Passada 6: [11, 12, 22, 25, 34, 64, 90] ← Sem trocas = FIM
```

---

### 🟡 **Selection Sort: Busca do Extremo**

**🎯 Princípio Fundamental:**
> A cada iteração, **seleciona** o menor elemento do subarray não ordenado e o coloca na posição correta.

**📊 Análise Matemática:**

**Número de Comparações (sempre):**
$$C(n) = \sum_{i=0}^{n-2} (n-1-i) = \frac{n(n-1)}{2} = O(n^2)$$

**Número de Trocas (sempre):**
$$T(n) = n-1 = O(n)$$

**Vantagem:** Número **mínimo** de trocas possível!

```c
void selection_sort_completo(int arr[], int n) {
    int comparacoes = 0, trocas = 0;
    
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        
        // Busca linear pelo menor elemento
        for (int j = i + 1; j < n; j++) {
            comparacoes++;
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        
        // Troca apenas se necessário
        if (min_idx != i) {
            int temp = arr[i];
            arr[i] = arr[min_idx];
            arr[min_idx] = temp;
            trocas++;
        }
    }
    
    printf("Comparações: %d, Trocas: %d\n", comparacoes, trocas);
}
```

**🎯 Exemplo Prático:**
```
Entrada: [64, 25, 12, 22, 11]

i=0: min=11, pos=4 → [11, 25, 12, 22, 64]
i=1: min=12, pos=2 → [11, 12, 25, 22, 64]  
i=2: min=22, pos=3 → [11, 12, 22, 25, 64]
i=3: min=25, pos=3 → [11, 12, 22, 25, 64] (sem troca)
```
```

**Vantagens:**
- Número mínimo de trocas: exatamente $n-1$ trocas
- Performance constante independente da entrada
- Simples de implementar e entender

**Análise:** Sempre $O(n^2)$ comparações, mas apenas $O(n)$ trocas

---

### 🟢 **Insertion Sort: Construção Incremental Adaptativa**

**🎯 Princípio Fundamental:**
> **Simula** o processo de ordenar cartas na mão: pega um elemento e insere na posição correta no subarray já ordenado.

**📊 Análise Matemática Detalhada:**

**Melhor Caso (Array Ordenado):**
$$T_{best}(n) = \sum_{i=2}^{n} 1 = n-1 = O(n)$$

**Pior Caso (Array Reverso):**
$$T_{worst}(n) = \sum_{i=2}^{n} i = \frac{n(n+1)}{2} - 1 = O(n^2)$$

**Caso Médio (Análise Probabilística):**
$$T_{avg}(n) = \sum_{i=2}^{n} \frac{i}{2} = \frac{n(n+1)}{4} - \frac{1}{2} = O(n^2)$$

```c
void insertion_sort_detalhado(int arr[], int n) {
    int comparacoes = 0, movimentos = 0;
    
    // Começa do segundo elemento (índice 1)
    for (int i = 1; i < n; i++) {
        int chave = arr[i];  // Elemento a ser inserido
        int j = i - 1;       // Posição do último elemento ordenado
        
        // Desloca elementos maiores que a chave
        while (j >= 0 && arr[j] > chave) {
            comparacoes++;
            arr[j + 1] = arr[j];  // Move uma posição à direita
            movimentos++;
            j--;
        }
        
        // Última comparação (quando sai do while)
        if (j >= 0) comparacoes++;
        
        // Insere a chave na posição correta
        arr[j + 1] = chave;
        if (j + 1 != i) movimentos++;  // Só conta se houve movimento
    }
    
    printf("Comparações: %d, Movimentos: %d\n", comparacoes, movimentos);
}
```

**🎯 Exemplo Prático Detalhado:**
```
Entrada: [5, 2, 4, 6, 1, 3]

i=1, chave=2: [5, 2, 4, 6, 1, 3] → [2, 5, 4, 6, 1, 3]
i=2, chave=4: [2, 5, 4, 6, 1, 3] → [2, 4, 5, 6, 1, 3]  
i=3, chave=6: [2, 4, 5, 6, 1, 3] → [2, 4, 5, 6, 1, 3] (sem mudança)
i=4, chave=1: [2, 4, 5, 6, 1, 3] → [1, 2, 4, 5, 6, 3]
i=5, chave=3: [1, 2, 4, 5, 6, 3] → [1, 2, 3, 4, 5, 6]
```

**✨ Vantagens Especiais:**
- **Adaptativo:** $O(n)$ para dados quase ordenados
- **Estável:** Preserva ordem de elementos iguais
- **In-place:** Usa apenas $O(1)$ espaço extra
- **Online:** Ordena dados conforme chegam

---

## 🚀 Parte III: Algoritmos Avançados - Divide and Conquer

### 🔴 **Merge Sort: O Paradigma Divide-and-Conquer**

**🎯 Princípio Fundamental:**
> **Divide** o problema em subproblemas menores, **resolve** recursivamente e **combina** as soluções.

**📐 Relação de Recorrência:**
$$T(n) = \begin{cases}
O(1) & \text{se } n \leq 1 \\
2T(n/2) + O(n) & \text{se } n > 1
\end{cases}$$

**Solução pelo Teorema Master:**
$$T(n) = O(n \log n)$$

**🧮 Prova Matemática Detalhada:**
1. **Altura da árvore de recursão:** $h = \log_2 n$
2. **Trabalho por nível:** $O(n)$ (para merge)
3. **Trabalho total:** $O(n) \times O(\log n) = O(n \log n)$

```c
void merge_sort(int arr[], int inicio, int fim) {
    if (inicio < fim) {
        int meio = inicio + (fim - inicio) / 2;  // Evita overflow
        
        // Divide: ordena as duas metades
        merge_sort(arr, inicio, meio);
        merge_sort(arr, meio + 1, fim);
        
        // Conquista: combina as metades ordenadas
        merge(arr, inicio, meio, fim);
    }
}

void merge(int arr[], int inicio, int meio, int fim) {
    int n1 = meio - inicio + 1;
    int n2 = fim - meio;
    
    // Arrays temporários
    int esquerda[n1], direita[n2];
    
    // Copia dados para arrays temporários
    for (int i = 0; i < n1; i++)
        esquerda[i] = arr[inicio + i];
    for (int j = 0; j < n2; j++)
        direita[j] = arr[meio + 1 + j];
    
    // Merge dos arrays temporários de volta no array original
    int i = 0, j = 0, k = inicio;
    
    while (i < n1 && j < n2) {
        if (esquerda[i] <= direita[j]) {
            arr[k] = esquerda[i];
            i++;
        } else {
            arr[k] = direita[j];
            j++;
        }
        k++;
    }
    
    // Copia elementos restantes
    while (i < n1) {
        arr[k] = esquerda[i];
        i++;
        k++;
    }
    
    while (j < n2) {
        arr[k] = direita[j];
        j++;
        k++;
    }
}
**🎯 Exemplo Visual do Merge Sort:**
```
Array inicial: [38, 27, 43, 3, 9, 82, 10]

Divisão:
[38, 27, 43, 3] | [9, 82, 10]
[38, 27] [43, 3] | [9, 82] [10]
[38] [27] [43] [3] | [9] [82] [10]

Conquista (merge):
[27, 38] [3, 43] | [9, 82] [10]
[3, 27, 38, 43] | [9, 10, 82]
[3, 9, 10, 27, 38, 43, 82]
```

**✨ Características Principais:**
- **Estável:** Mantém ordem relativa
- **Previsível:** Sempre $O(n \log n)$
- **Espaço:** Requer $O(n)$ memória extra
- **Paralelo:** Facilmente paralelizável

---

### 🟠 **Quick Sort: Divisão por Pivô**

**🎯 Princípio Fundamental:**
> **Particiona** o array em torno de um **pivô**, recursivamente ordena as partições.

**📐 Análise de Complexidade:**

**Melhor/Caso Médio:**
$$T(n) = 2T(n/2) + O(n) = O(n \log n)$$

**Pior Caso (pivô sempre extremo):**
$$T(n) = T(n-1) + O(n) = O(n^2)$$

**Probabilidade do pior caso:** $\frac{2}{n}$ com pivô aleatório

```c
int particionar(int arr[], int baixo, int alto) {
    int pivo = arr[alto];    // Último elemento como pivô
    int i = (baixo - 1);     // Índice do menor elemento
    
    for (int j = baixo; j <= alto - 1; j++) {
        // Se elemento atual é menor ou igual ao pivô
        if (arr[j] <= pivo) {
            i++;    // Incrementa índice do menor elemento
            trocar(&arr[i], &arr[j]);
        }
    }
    trocar(&arr[i + 1], &arr[alto]);
    return (i + 1);
}

void quick_sort(int arr[], int baixo, int alto) {
    if (baixo < alto) {
        // Particiona e obtém índice do pivô
        int pi = particionar(arr, baixo, alto);
        
        // Ordena recursivamente elementos antes e depois do pivô
        quick_sort(arr, baixo, pi - 1);
        quick_sort(arr, pi + 1, alto);
    }
}

void trocar(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}
```

**🎯 Exemplo de Particionamento:**
```
Array: [10, 80, 30, 90, 40, 50, 70] (pivô = 70)

Passo 1: i=-1, j=0: 10≤70 → i=0, troca(10,10) → [10, 80, 30, 90, 40, 50, 70]
Passo 2: i=0,  j=1: 80>70 → sem troca       → [10, 80, 30, 90, 40, 50, 70]
Passo 3: i=0,  j=2: 30≤70 → i=1, troca(80,30) → [10, 30, 80, 90, 40, 50, 70]
Passo 4: i=1,  j=3: 90>70 → sem troca       → [10, 30, 80, 90, 40, 50, 70]
Passo 5: i=1,  j=4: 40≤70 → i=2, troca(80,40) → [10, 30, 40, 90, 80, 50, 70]
Passo 6: i=2,  j=5: 50≤70 → i=3, troca(90,50) → [10, 30, 40, 50, 80, 90, 70]
Final: troca(80,70) → [10, 30, 40, 50, 70, 90, 80]
```

**🎲 Otimizações do Quick Sort:**
1. **Pivô aleatório:** Reduz probabilidade de pior caso
2. **Mediana de 3:** Melhora escolha do pivô
3. **Híbrido:** Insertion sort para arrays pequenos ($n < 10$)
4. **3-way partitioning:** Para muitos elementos iguais

---

## 📊 Parte IV: Análise Comparativa Completa

### **📈 Tabela Comparativa Detalhada**

| Algoritmo | Melhor | Médio | Pior | Espaço | Estável | In-place | Adaptativo |
|-----------|--------|-------|------|---------|---------|----------|------------|
| **Bubble Sort** | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | ✅ | ✅ | ✅ |
| **Selection Sort** | $O(n^2)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | ❌ | ✅ | ❌ |
| **Insertion Sort** | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | ✅ | ✅ | ✅ |
| **Merge Sort** | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$ | $O(n)$ | ✅ | ❌ | ❌ |
| **Quick Sort** | $O(n \log n)$ | $O(n \log n)$ | $O(n^2)$ | $O(\log n)$ | ❌ | ✅ | ❌ |
| **Heap Sort** | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$ | $O(1)$ | ❌ | ✅ | ❌ |

### **⚡ Quando Usar Cada Algoritmo:**

**🎯 Cenários Práticos:**
- **Bubble Sort:** 📚 Ensino e arrays muito pequenos ($n < 20$)
- **Selection Sort:** 💾 Quando memória (trocas) é limitada
- **Insertion Sort:** 🚀 Arrays pequenos ($n < 50$) ou quase ordenados
- **Merge Sort:** 🎯 Quando estabilidade é crucial ou worst-case garantido
- **Quick Sort:** ⚡ Caso geral - melhor performance média
- **Heap Sort:** 🔒 Quando espaço é limitado e worst-case O(n log n) necessário
        
        // Recursão nas metades
        merge_sort(array, esquerda, meio);
        merge_sort(array, meio + 1, direita);
        
        // Combina as metades ordenadas
        merge(array, esquerda, meio, direita);
    }
}
```

**Análise Matemática:**
$$T(n) = 2T(n/2) + \Theta(n)$$

**Solução pela Master Theorem:** $T(n) = \Theta(n \log n)$

**Vantagens:** Estável, performance garantida $O(n \log n)$
**Desvantagens:** Requer $O(n)$ espaço adicional

---

### Quick Sort: Algoritmo de Particionamento

**Princípio:** Particiona o array em torno de um pivô

```c
int partition(int array[], int baixo, int alto) {
    int pivot = array[alto];  // Último elemento como pivô
    int i = (baixo - 1);      // Índice do menor elemento
    
    for (int j = baixo; j <= alto - 1; j++) {
        // Se elemento atual é menor ou igual ao pivô
        if (array[j] <= pivot) {
            i++;
            // Troca array[i] e array[j]
            int temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
    
    // Troca array[i+1] e array[alto] (ou pivô)
    int temp = array[i + 1];
    array[i + 1] = array[alto];
    array[alto] = temp;
    
    return (i + 1);
}

void quick_sort(int array[], int baixo, int alto) {
    if (baixo < alto) {
        // Índice de particionamento
        int pi = partition(array, baixo, alto);
        
        // Recursão nas metades
        quick_sort(array, baixo, pi - 1);
        quick_sort(array, pi + 1, alto);
    }
}
```

**Análise de Complexidade:**
- **Melhor/Médio caso:** $T(n) = O(n \log n)$
- **Pior caso:** $T(n) = O(n^2)$ - pivô sempre extremo
- **Espaço:** $O(\log n)$ para pilha de recursão

**Otimização: Randomized QuickSort**
```c
int partition_randomizado(int array[], int baixo, int alto) {
    // Escolha aleatória do pivô
    int indice_aleatorio = baixo + rand() % (alto - baixo + 1);
    
    // Troca com último elemento
    int temp = array[indice_aleatorio];
    array[indice_aleatorio] = array[alto];
    array[alto] = temp;
    
    return partition(array, baixo, alto);
}
```

---

## 🧪 Exercícios Práticos e Problemas Reais

### **📝 Lista de Exercícios Progressivos**

#### **🟢 Nível Básico - Implementação e Análise**

**Exercício 1:** Implemente bubble sort que conta comparações e trocas
```c
// TODO: Implementar bubble_sort_com_contadores()
// Retorna: struct {int comparacoes; int trocas;}
```

**Exercício 2:** Modifique insertion sort para ordenação decrescente
```c
// TODO: insertion_sort_decrescente()
// Analise: Muda a complexidade? Por quê?
```

**Exercício 3:** Calcule complexidade exata para entrada específica
```
Entrada: [5, 4, 3, 2, 1] (tamanho n=5)
Para bubble sort: Quantas comparações? Quantas trocas?
Resposta teórica: C = n(n-1)/2 = 10, T = 10
```

#### **🟡 Nível Intermediário - Otimizações**

**Exercício 4:** Implemente quick sort com mediana-de-3
```c
int mediana_de_tres(int arr[], int baixo, int alto) {
    int meio = (baixo + alto) / 2;
    // TODO: Retorna índice do elemento mediano
}
```

**Exercício 5:** Merge sort iterativo (bottom-up)
```c
void merge_sort_iterativo(int arr[], int n) {
    // TODO: Implementar sem recursão
    // Dica: Use laços para controlar tamanho dos subarrays
}
```

#### **🔴 Nível Avançado - Problemas Reais**

**Exercício 6:** Sistema de classificação de estudantes
```c
typedef struct {
    char nome[50];
    float nota;
    int idade;
} Estudante;

// TODO: Ordenar por nota (decrescente), depois por idade (crescente)
int comparar_estudantes(const void *a, const void *b);
```

---

### **🌍 Casos Reais de Aplicação**

#### **💻 Caso 1: Sistema de E-commerce**
```c
typedef struct {
    int produto_id;
    char nome[100];
    float preco;
    int estoque;
    float avaliacao;
    int vendas;
} Produto;

// Diferentes critérios de ordenação:
// 1. Por preço (filtro econômico)
// 2. Por avaliação (melhores produtos)  
// 3. Por vendas (mais populares)
// 4. Multi-critério: avaliação + vendas
```

**Questão:** Qual algoritmo usar para cada caso?
- **Dados pequenos** (< 100 produtos): Insertion sort
- **Dados médios** (100-10K): Quick sort
- **Estabilidade crucial**: Merge sort
- **Memória limitada**: Heap sort

#### **📊 Caso 2: Análise de Big Data**
```c
// Arquivo com 10 milhões de registros
typedef struct {
    long timestamp;
    int user_id;
    float valor_transacao;
    char categoria[20];
} Transacao;

// Desafios:
// 1. Não cabe na memória RAM
// 2. Múltiplos critérios de ordenação
// 3. Resultados parciais em tempo real
```

**Solução:** External Merge Sort
1. **Divide** arquivo em chunks que cabem na memória
2. **Ordena** cada chunk individualmente
3. **Merge** chunks usando heap mínimo

#### **🎮 Caso 3: Ranking de Jogadores**
```c
typedef struct {
    char nickname[30];
    int pontuacao;
    int partidas_jogadas;
    float taxa_vitoria;
    long ultimo_jogo;
} Jogador;

// Requisitos:
// 1. Atualização em tempo real
// 2. Top 100 sempre disponível
// 3. Ranking por múltiplos critérios
```

**Algoritmo Híbrido:**
- **Insertion sort** para atualizações incrementais
- **Heap** para manter top K elementos
- **Quick select** para encontrar K-ésimo elemento

---

### **⚙️ Benchmarks e Medições Práticas**

#### **📊 Resultados Experimentais (n = 10.000)**

| Algoritmo | Tempo (ms) | Comparações | Trocas/Movimentos | Memória (KB) |
|-----------|------------|-------------|-------------------|--------------|
| **Bubble Sort** | 892.3 | 49.995.000 | 24.997.500 | 40 |
| **Selection Sort** | 234.7 | 49.995.000 | 9.999 | 40 |
| **Insertion Sort** | 118.4 | 25.005.000 | 25.005.000 | 40 |
| **Merge Sort** | 12.8 | 133.616 | 133.616 | 80 |
| **Quick Sort** | 8.2 | 174.526 | 32.847 | 44 |
| **Heap Sort** | 15.1 | 286.439 | 286.439 | 40 |

#### **🔍 Análise dos Resultados:**

**Observações:**
1. **Quick Sort** é ~110x mais rápido que Bubble Sort
2. **Selection Sort** faz mínimo de trocas (apenas n-1)
3. **Merge Sort** tem performance previsível
4. **Insertion Sort** surpreende em dados quase ordenados

**Fatores que afetam performance:**
- **Cache de CPU:** Localidade de referência
- **Branch prediction:** Padrões de comparação
- **Compilador:** Otimizações automáticas
- **Arquitetura:** 32-bit vs 64-bit

---

### **🎯 Macetes e Dicas Práticas**

#### **💡 Otimizações Universais:**

1. **Use insertion sort para arrays pequenos** ($n < 20$)
```c
if (n < 20) {
    insertion_sort(arr, n);
    return;
}
```

2. **Evite recursão desnecessária no quick sort**
```c
while (baixo < alto) {
    int pi = partition(arr, baixo, alto);
    if (pi - baixo < alto - pi) {
        quick_sort(arr, baixo, pi - 1);
        baixo = pi + 1;
    } else {
        quick_sort(arr, pi + 1, alto);
        alto = pi - 1;
    }
}
```

3. **Use algoritmos adaptativos quando possível**
```c
// Detecta se array já está ordenado
bool esta_ordenado(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        if (arr[i] < arr[i-1]) return false;
    }
    return true;
}
```

#### **⚠️ Armadilhas Comuns:**

1. **Overflow em índices:** Use `meio = baixo + (alto - baixo) / 2`
2. **Pivô ruim no quick sort:** Sempre randomize ou use mediana-de-3
3. **Comparação instável:** Elementos iguais podem trocar de posição
4. **Uso excessivo de memória:** Cuidado com merge sort em dados grandes

---

### **🏆 Desafio Final: Algoritmo Híbrido**

**Implemente um algoritmo que:**
1. **Detecta** padrões nos dados (ordenado, reverso, aleatório)
2. **Escolhe** automaticamente o melhor algoritmo
3. **Combina** técnicas para otimização máxima

```c
void smart_sort(int arr[], int n) {
    if (n < 20) {
        insertion_sort(arr, n);
    } else if (esta_quase_ordenado(arr, n)) {
        insertion_sort(arr, n);  // O(n) para dados quase ordenados
    } else if (tem_muitas_duplicatas(arr, n)) {
        three_way_quick_sort(arr, 0, n-1);  // Otimizado para duplicatas
    } else {
        intro_sort(arr, 0, n-1, 2 * log(n));  // Quick + Heap sort
    }
}
```

**Sua missão:** Implemente e teste este algoritmo híbrido!

### Implementação do Heap Binário

**Propriedade do Max-Heap:** Para todo nó $i$:
$$\text{parent}(i) \geq A[i]$$

```c
void heapify(int array[], int n, int i) {
    int maior = i;          // Inicializa maior como raiz
    int esquerda = 2 * i + 1;  // Filho esquerdo
    int direita = 2 * i + 2;   // Filho direito
    
    // Se filho esquerdo é maior que raiz
    if (esquerda < n && array[esquerda] > array[maior])
        maior = esquerda;
    
    // Se filho direito é maior que maior até agora
    if (direita < n && array[direita] > array[maior])
        maior = direita;
    
    // Se maior não é raiz
    if (maior != i) {
        int temp = array[i];
        array[i] = array[maior];
        array[maior] = temp;
        
        // Recursivamente heapify a subárvore afetada
        heapify(array, n, maior);
    }
}

void heap_sort(int array[], int n) {
    // Constrói heap (rearranja array)
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(array, n, i);
    
    // Extrai elementos do heap um por um
    for (int i = n - 1; i > 0; i--) {
        // Move raiz atual para o final
        int temp = array[0];
        array[0] = array[i];
        array[i] = temp;
        
        // Chama heapify na heap reduzida
        heapify(array, i, 0);
    }
}
```

**Características:**
- **Complexidade:** $O(n \log n)$ garantido
- **Espaço:** $O(1)$ - in-place
- **Não estável:** Pode alterar ordem relativa

---

## 4. Algoritmos de Ordenação Linear

### Counting Sort: Ordenação por Contagem

**Aplicabilidade:** Elementos inteiros em intervalo conhecido $[0, k]$

```c
void counting_sort(int array[], int n, int k) {
    // Array de saída que terá os elementos ordenados
    int output[n];
    
    // Array de contagem para armazenar count de cada elemento
    int count[k + 1];
    
    // Inicializa array de contagem com zeros
    for (int i = 0; i <= k; i++)
        count[i] = 0;
    
    // Armazena a contagem de cada elemento
    for (int i = 0; i < n; i++)
        count[array[i]]++;
    
    // Modifica count[i] para que contenha posição atual
    // do elemento i no array de saída
    for (int i = 1; i <= k; i++)
        count[i] += count[i - 1];
    
    // Constrói o array de saída
    for (int i = n - 1; i >= 0; i--) {
        output[count[array[i]] - 1] = array[i];
        count[array[i]]--;
    }
    
    // Copia o array de saída para array[], para que
    // array[] contenha elementos ordenados
    for (int i = 0; i < n; i++)
        array[i] = output[i];
}
```

**Análise:** $T(n) = O(n + k)$, onde $k$ é o range dos elementos
**Vantagem:** Linear quando $k = O(n)$
**Desvantagem:** Requer espaço adicional $O(k)$

---

### Radix Sort: Ordenação por Dígitos

**Princípio:** Ordena dígito por dígito usando counting sort estável

```c
int obter_maximo(int array[], int n) {
    int max = array[0];
    for (int i = 1; i < n; i++)
        if (array[i] > max)
            max = array[i];
    return max;
}

void counting_sort_radix(int array[], int n, int exp) {
    int output[n];
    int count[10] = {0};
    
    // Armazena contagem de ocorrências em count[]
    for (int i = 0; i < n; i++)
        count[(array[i] / exp) % 10]++;
    
    // Modifica count[i] para conter posição atual
    for (int i = 1; i < 10; i++)
        count[i] += count[i - 1];
    
    // Constrói array de saída
    for (int i = n - 1; i >= 0; i--) {
        output[count[(array[i] / exp) % 10] - 1] = array[i];
        count[(array[i] / exp) % 10]--;
    }
    
    // Copia array de saída para array[]
    for (int i = 0; i < n; i++)
        array[i] = output[i];
}

void radix_sort(int array[], int n) {
    int max = obter_maximo(array, n);
    
    // Executa counting sort para cada dígito
    for (int exp = 1; max / exp > 0; exp *= 10)
        counting_sort_radix(array, n, exp);
}
```

**Análise:** $T(n) = O(d \times (n + k))$
- $d$ = número de dígitos
- $k$ = range de cada dígito (tipicamente 10)
- Para inteiros: $d = O(\log n)$, então $T(n) = O(n \log n)$

---

## 5. Otimizações e Algoritmos Híbridos

### Introsort: Combinação Inteligente

**Princípio:** Combina QuickSort, HeapSort e InsertionSort

```c
#include <math.h>

void introsort_util(int array[], int baixo, int alto, int limite_profundidade) {
    while (alto > baixo) {
        int tamanho = alto - baixo + 1;
        
        // Para arrays pequenos, use insertion sort
        if (tamanho < 16) {
            insertion_sort_range(array, baixo, alto);
            break;
        }
        // Se profundidade máxima atingida, use heap sort
        else if (limite_profundidade == 0) {
            heap_sort_range(array, baixo, alto);
            break;
        }
        // Caso contrário, use quick sort
        else {
            int pivot = partition(array, baixo, alto);
            
            // Otimização: recursão na partição menor
            if (pivot - baixo < alto - pivot) {
                introsort_util(array, baixo, pivot - 1, limite_profundidade - 1);
                baixo = pivot + 1;
            } else {
                introsort_util(array, pivot + 1, alto, limite_profundidade - 1);
                alto = pivot - 1;
            }
            limite_profundidade--;
        }
    }
}

void introsort(int array[], int n) {
    int limite_profundidade = 2 * (int)log2(n);
    introsort_util(array, 0, n - 1, limite_profundidade);
}
```

**Vantagens do Introsort:**
- Performance garantida $O(n \log n)$ no pior caso
- Média de performance do QuickSort
- Eficiente para pequenos arrays

---

### Timsort: Algoritmo do Python

**Princípio:** Detecta runs naturais e os mescla eficientemente

**Características Principais:**
- Adaptativo para dados parcialmente ordenados
- Estável e com performance $O(n \log n)$ garantida
- Otimizado para padrões comuns de dados reais

```c
// Simplificação conceitual do Timsort
typedef struct {
    int base;
    int tamanho;
} Run;

void timsort_simplificado(int array[], int n) {
    const int MIN_MERGE = 32;
    
    // 1. Identifica ou cria runs mínimos
    for (int i = 0; i < n; i += MIN_MERGE) {
        int fim = (i + MIN_MERGE - 1 < n - 1) ? i + MIN_MERGE - 1 : n - 1;
        insertion_sort_range(array, i, fim);
    }
    
    // 2. Mescla runs progressivamente
    int tamanho = MIN_MERGE;
    while (tamanho < n) {
        for (int inicio = 0; inicio < n; inicio += tamanho * 2) {
            int meio = inicio + tamanho - 1;
            int fim = (inicio + tamanho * 2 - 1 < n - 1) ? 
                     inicio + tamanho * 2 - 1 : n - 1;
            
            if (meio < fim)
                merge(array, inicio, meio, fim);
        }
        tamanho *= 2;
    }
}
```

---

## 6. Análise Experimental e Benchmarks

### Framework de Testing Rigoroso

```c
#include <time.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char nome[50];
    void (*algoritmo)(int[], int);
    double tempo_execucao;
    long comparacoes;
    long trocas;
} ResultadoBenchmark;

typedef enum {
    ALEATORIO,
    ORDENADO,
    REVERSO,
    QUASE_ORDENADO,
    MUITAS_REPETICOES
} TipoDados;

void gerar_dados_teste(int array[], int n, TipoDados tipo) {
    switch (tipo) {
        case ALEATORIO:
            for (int i = 0; i < n; i++)
                array[i] = rand() % (n * 10);
            break;
            
        case ORDENADO:
            for (int i = 0; i < n; i++)
                array[i] = i;
            break;
            
        case REVERSO:
            for (int i = 0; i < n; i++)
                array[i] = n - i;
            break;
            
        case QUASE_ORDENADO:
            for (int i = 0; i < n; i++)
                array[i] = i;
            // Faz algumas trocas aleatórias
            for (int i = 0; i < n / 10; i++) {
                int pos1 = rand() % n;
                int pos2 = rand() % n;
                int temp = array[pos1];
                array[pos1] = array[pos2];
                array[pos2] = temp;
            }
            break;
            
        case MUITAS_REPETICOES:
            for (int i = 0; i < n; i++)
                array[i] = rand() % 10;  // Apenas 10 valores distintos
            break;
    }
}

double medir_tempo_algoritmo(void (*algoritmo)(int[], int), 
                           int array[], int n) {
    clock_t inicio = clock();
    algoritmo(array, n);
    clock_t fim = clock();
    
    return ((double)(fim - inicio)) / CLOCKS_PER_SEC;
}

void executar_benchmark_completo(int tamanhos[], int num_tamanhos) {
    const char* nomes_tipos[] = {"Aleatório", "Ordenado", "Reverso", 
                                "Quase Ordenado", "Muitas Repetições"};
    
    ResultadoBenchmark algoritmos[] = {
        {"Bubble Sort", bubble_sort, 0, 0, 0},
        {"Selection Sort", selection_sort, 0, 0, 0},
        {"Insertion Sort", insertion_sort, 0, 0, 0},
        {"Merge Sort", merge_sort_wrapper, 0, 0, 0},
        {"Quick Sort", quick_sort_wrapper, 0, 0, 0},
        {"Heap Sort", heap_sort, 0, 0, 0}
    };
    
    printf("Benchmark de Algoritmos de Ordenação\n");
    printf("=====================================\n\n");
    
    for (int t = 0; t < num_tamanhos; t++) {
        int n = tamanhos[t];
        printf("Tamanho do Array: %d elementos\n", n);
        printf("-" * 40);
        
        for (int tipo = 0; tipo < 5; tipo++) {
            printf("\nTipo de Dados: %s\n", nomes_tipos[tipo]);
            
            for (int alg = 0; alg < 6; alg++) {
                int *array_teste = malloc(n * sizeof(int));
                gerar_dados_teste(array_teste, n, (TipoDados)tipo);
                
                double tempo = medir_tempo_algoritmo(
                    algoritmos[alg].algoritmo, array_teste, n);
                
                printf("%-15s: %.6f segundos\n", 
                       algoritmos[alg].nome, tempo);
                
                free(array_teste);
            }
        }
        printf("\n");
    }
}
```

---

## Resultados Experimentais Típicos

### Performance para 100.000 elementos

| **Algoritmo** | **Aleatório** | **Ordenado** | **Reverso** | **Quase Ord.** |
|---------------|---------------|--------------|-------------|----------------|
| **Bubble Sort** | 15.23s | 0.03s | 30.45s | 2.15s |
| **Selection Sort** | 8.67s | 8.66s | 8.68s | 8.65s |
| **Insertion Sort** | 4.32s | 0.02s | 8.64s | 0.48s |
| **Merge Sort** | 0.018s | 0.017s | 0.018s | 0.017s |
---

## 📚 Resumo da Aula e Conceitos-Chave

### **🎯 Principais Aprendizados**

#### **📐 Fundamentos Matemáticos:**
- **Limite inferior** de $\Omega(n \log n)$ para algoritmos baseados em comparação
- **Relações de recorrência** e Teorema Master para análise
- **Análise de casos:** melhor, médio e pior

#### **⚡ Algoritmos Implementados:**
1. **Bubble Sort:** $O(n^2)$ - didático, adaptativo
2. **Selection Sort:** $O(n^2)$ - mínimo de trocas
3. **Insertion Sort:** $O(n^2)$ - ótimo para dados pequenos/quase ordenados
4. **Merge Sort:** $O(n \log n)$ - estável, previsível
5. **Quick Sort:** $O(n \log n)$ avg - rápido na prática

#### **🔍 Critérios de Escolha:**
- **Tamanho dos dados** (n < 50: insertion, n > 10K: quick/merge)
- **Estabilidade** (merge sort quando necessária)
- **Memória disponível** (in-place vs. external)
- **Padrão dos dados** (quase ordenado: insertion)

---

### **💡 Dicas e Macetes Essenciais**

#### **🚀 Otimizações Práticas:**
1. **Híbrido:** Insertion sort para subarrays pequenos
2. **Randomização:** Pivô aleatório no quick sort
3. **Detecção precoce:** Flag para arrays já ordenados
4. **Mediana-de-3:** Melhora escolha do pivô

#### **⚠️ Pegadinhas Comuns:**
- **Overflow:** Use `meio = baixo + (alto-baixo)/2`
- **Estabilidade:** Cuidado com `<` vs `<=` nas comparações
- **Recursão infinita:** Verificar condições de parada
- **Acesso fora dos limites:** Sempre validar índices

---

### **🧪 Lista de Exercícios para Casa**

#### **📝 Exercícios Obrigatórios:**

1. **Implementação Básica** (⭐)
   - Implemente os 5 algoritmos principais
   - Adicione contadores de comparações e trocas
   - Teste com arrays ordenados, reversos e aleatórios

2. **Análise Experimental** (⭐⭐)
   - Meça tempo de execução para diferentes tamanhos
   - Compare resultados com análise teórica
   - Identifique pontos de transição (quando um supera outro)

3. **Otimizações** (⭐⭐⭐)
   - Quick sort com mediana-de-3
   - Merge sort iterativo (bottom-up)
   - Insertion sort binário (busca binária para posição)

#### **🏆 Desafios Extras:**

4. **Algoritmo Híbrido** (⭐⭐⭐⭐)
   - Combine técnicas para máxima eficiência
   - Adapte automaticamente ao padrão dos dados
   - Implemente intro sort (quick + heap + insertion)

5. **Aplicação Real** (⭐⭐⭐⭐⭐)
   - Sistema de ranking multi-critério
   - Processamento de grandes volumes de dados
   - Interface para comparação de algoritmos

---

### **📊 Métricas de Avaliação**

#### **Critérios para Implementações:**
- ✅ **Corretude:** Algoritmo ordena corretamente
- ✅ **Eficiência:** Respeita complexidade teórica
- ✅ **Clareza:** Código bem comentado e estruturado
- ✅ **Robustez:** Trata casos extremos (n=0, n=1)
- ✅ **Análise:** Contadores e medições implementados

#### **Pontuação:**
- **Básico (60%):** Implementação correta dos algoritmos
- **Intermediário (80%):** + Otimizações e análise
- **Avançado (100%):** + Híbridos e aplicações reais

---

### **📚 Referências e Material Complementar**

#### **📖 Literatura Fundamental:**
1. **Cormen, T. H.** *Introduction to Algorithms*, 4ª ed. (Capítulos 2, 4, 6-8)
2. **Sedgewick, R.** *Algorithms*, 4ª ed. (Parte II: Sorting)
3. **Knuth, D. E.** *The Art of Computer Programming*, Vol. 3 (Sorting and Searching)

#### **💻 Recursos Online:**
- [Visualgo.net](https://visualgo.net/en/sorting) - Visualização de algoritmos
- [Big-O Cheat Sheet](https://www.bigocheatsheet.com/) - Referência rápida
- [Sorting Algorithm Animations](https://www.cs.usfca.edu/~galles/visualization/ComparisonSort.html)

#### **🧪 Ferramentas para Prática:**
- [LeetCode](https://leetcode.com/tag/sorting/) - Problemas práticos
- [HackerRank](https://www.hackerrank.com/domains/algorithms?filters%5Bsubdomains%5D%5B%5D=sorting) - Desafios de ordenação
- [Codeforces](https://codeforces.com/problemset?tags=sortings) - Competições

---

### **🚀 Próxima Aula: Estruturas de Dados Dinâmicas**

#### **📋 Prévia do Conteúdo:**
- **Listas Ligadas:** Simples, duplas, circulares
- **Pilhas e Filas:** Implementação e aplicações
- **Árvores Binárias:** Conceitos fundamentais
- **Hash Tables:** Função hash e tratamento de colisões

#### **🎯 Para se Preparar:**
1. Revise conceitos de **ponteiros** e **alocação dinâmica**
2. Pratique **manipulação de estruturas** em C
3. Estude **análise amortizada** (opcional)

---

## ✅ **Checklist da Aula**

### **Conceitos Dominados:**
- [ ] Limite inferior teórico para ordenação
- [ ] Análise de complexidade de todos os algoritmos
- [ ] Implementação correta dos 5 algoritmos principais
- [ ] Critérios para escolha de algoritmos
- [ ] Otimizações e técnicas avançadas
- [ ] Aplicações em problemas reais

### **Habilidades Desenvolvidas:**
- [ ] Análise matemática de algoritmos
- [ ] Implementação eficiente em C
- [ ] Medição e comparação de performance
- [ ] Resolução de problemas práticos
- [ ] Otimização de código

---

**📅 Entrega dos Exercícios:** Próxima aula  
**💬 Dúvidas:** Monitoria ou fórum online  
**📧 LinkedIn:** linkedin.com/in/vagnercordeiro

---

*"A ordenação é a base de quase todos os algoritmos eficientes. Dominá-la é dominar a essência da computação."*

**Obrigado pela atenção! 🎓**
    
    // Critério 3: Número de partidas (mais experiente)
    if (j1->partidas_jogadas != j2->partidas_jogadas)
        return j2->partidas_jogadas - j1->partidas_jogadas;
    
    // Critério 4: Atividade recente
    return (j2->ultima_partida > j1->ultima_partida) ? 1 : -1;
}

void atualizar_ranking(Jogador jogadores[], int num_jogadores) {
    // Usa qsort da biblioteca padrão (tipicamente introsort)
    qsort(jogadores, num_jogadores, sizeof(Jogador), comparar_jogadores_ranking);
    
    // Atualiza posições no ranking
    for (int i = 0; i < num_jogadores; i++) {
        printf("Posição %d: %s (Pontos: %d, Taxa: %.2f%%)\n",
               i + 1, jogadores[i].nome, jogadores[i].pontuacao,
               jogadores[i].taxa_vitoria * 100);
    }
}
```

### Sistema de Processamento de Log

```c
typedef struct {
    time_t timestamp;
    char nivel[10];      // DEBUG, INFO, WARNING, ERROR
    char origem[50];
    char mensagem[500];
    int prioridade;
} EntradaLog;

// Comparador para ordenação por timestamp
int comparar_por_tempo(const void *a, const void *b) {
    EntradaLog *log1 = (EntradaLog *)a;
    EntradaLog *log2 = (EntradaLog *)b;
    
    if (log1->timestamp < log2->timestamp) return -1;
    if (log1->timestamp > log2->timestamp) return 1;
    return 0;
}

// Comparador para ordenação por prioridade
int comparar_por_prioridade(const void *a, const void *b) {
    EntradaLog *log1 = (EntradaLog *)a;
    EntradaLog *log2 = (EntradaLog *)b;
    
    return log2->prioridade - log1->prioridade;  // Decrescente
}

void processar_logs(EntradaLog logs[], int num_logs, 
                   const char *criterio_ordenacao) {
    if (strcmp(criterio_ordenacao, "tempo") == 0) {
        qsort(logs, num_logs, sizeof(EntradaLog), comparar_por_tempo);
    } else if (strcmp(criterio_ordenacao, "prioridade") == 0) {
        qsort(logs, num_logs, sizeof(EntradaLog), comparar_por_prioridade);
    }
    
    // Análise de padrões após ordenação
    analisar_tendencias_logs(logs, num_logs);
}
```

---

## 8. Algoritmos de Ordenação Externa

### Ordenação de Arquivos Grandes

**Problema:** Ordenar dados que não cabem na memória principal

**Solução:** External Merge Sort

```c
#include <stdio.h>

#define TAMANHO_BUFFER 1000000  // 1 milhão de elementos por chunk

typedef struct {
    FILE *arquivo;
    int buffer[TAMANHO_BUFFER];
    int posicao_buffer;
    int tamanho_buffer;
    int fim_arquivo;
} FluxoArquivo;

void ordenacao_externa(const char *arquivo_entrada, 
                      const char *arquivo_saida, long total_elementos) {
    FILE *entrada = fopen(arquivo_entrada, "rb");
    int num_arquivos_temp = 0;
    
    // Fase 1: Divide em chunks ordenados
    char nome_temp[100];
    while (!feof(entrada)) {
        int buffer[TAMANHO_BUFFER];
        int elementos_lidos = fread(buffer, sizeof(int), TAMANHO_BUFFER, entrada);
        
        if (elementos_lidos > 0) {
            // Ordena chunk na memória
            qsort(buffer, elementos_lidos, sizeof(int), comparar_inteiros);
            
            // Salva chunk ordenado
            sprintf(nome_temp, "temp_%d.dat", num_arquivos_temp);
            FILE *temp = fopen(nome_temp, "wb");
            fwrite(buffer, sizeof(int), elementos_lidos, temp);
            fclose(temp);
            
            num_arquivos_temp++;
        }
    }
    fclose(entrada);
    
    // Fase 2: Merge dos arquivos temporários
    merge_arquivos_temporarios(arquivo_saida, num_arquivos_temp);
    
    // Limpeza
    for (int i = 0; i < num_arquivos_temp; i++) {
        sprintf(nome_temp, "temp_%d.dat", i);
        remove(nome_temp);
    }
}

void merge_arquivos_temporarios(const char *arquivo_saida, int num_arquivos) {
    FILE *saida = fopen(arquivo_saida, "wb");
    FluxoArquivo fluxos[num_arquivos];
    
    // Inicializa fluxos de entrada
    for (int i = 0; i < num_arquivos; i++) {
        char nome_temp[100];
        sprintf(nome_temp, "temp_%d.dat", i);
        fluxos[i].arquivo = fopen(nome_temp, "rb");
        carregar_proximo_elemento(&fluxos[i]);
    }
    
    // Merge usando heap para eficiência
    while (tem_elementos_restantes(fluxos, num_arquivos)) {
        int indice_menor = encontrar_menor_elemento(fluxos, num_arquivos);
        
        // Escreve menor elemento no arquivo de saída
        fwrite(&fluxos[indice_menor].buffer[fluxos[indice_menor].posicao_buffer],
               sizeof(int), 1, saida);
        
        // Carrega próximo elemento do fluxo correspondente
        carregar_proximo_elemento(&fluxos[indice_menor]);
    }
    
    // Fecha arquivos
    for (int i = 0; i < num_arquivos; i++) {
        fclose(fluxos[i].arquivo);
    }
    fclose(saida);
}
```

**Análise:** $T(n) = O(n \log n)$ com $O(\sqrt{n})$ espaço em memória

---

## 9. Conclusões e Próximos Passos

### Guia de Seleção de Algoritmos

**Para Arrays Pequenos (n < 50):**
- **Insertion Sort:** Simples e eficiente
- **Selection Sort:** Mínimo número de trocas

**Para Arrays Médios/Grandes (n > 50):**
- **Quick Sort:** Melhor performance média
- **Merge Sort:** Performance garantida e estável
- **Heap Sort:** Quando espaço é limitado

**Para Dados Especiais:**
- **Counting Sort:** Inteiros em range pequeno
- **Radix Sort:** Inteiros ou strings
- **TimSort:** Dados parcialmente ordenados

### Preparação para Próximas Aulas

**Aula 04:** Estruturas de Dados Avançadas
- Árvores Binárias de Busca e AVL
- Hash Tables e Funções de Dispersão
- Grafos: Representação e Algoritmos Básicos

**Aula 05:** Algoritmos de Busca Avançados
- Busca em Profundidade e Largura
- Algoritmos de Caminho Mínimo
- Programação Dinâmica

---

## Bibliografia e Recursos

### Referências Clássicas
- **Cormen, T. H. et al.** *Introduction to Algorithms*, 4ª edição
- **Sedgewick, R.** *Algorithms*, 4ª edição
- **Knuth, D. E.** *The Art of Computer Programming*, Volume 3

### Implementações de Referência
- **GNU libc qsort():** Implementação industrial
- **Java Arrays.sort():** TimSort híbrido
- **C++ std::sort():** Introsort otimizado

### Ferramentas de Análise
- **Complexity Analyzer:** Medição automática de complexidade
- **Profilers:** gprof, Valgrind Cachegrind
- **Visualizadores:** Algorithm Visualizer, Sorting Algorithms Animations

---

# Encerramento da Aula

## Algoritmos e Complexidade - Aula 03
*Algoritmos de Ordenação e Análise de Performance*

**Próxima Aula:** Estruturas de Dados Avançadas - Árvores e Hash Tables
**Exercícios:** Implementar e comparar 3 algoritmos de ordenação diferentes

### Material Complementar
**GitHub:** github.com/cordeirotelecom/algoritimos_e_complexidade
**Simuladores Online:** VisuAlgo, Algorithm-Visualizer
**Prática:** LeetCode Sorting Problems

---
