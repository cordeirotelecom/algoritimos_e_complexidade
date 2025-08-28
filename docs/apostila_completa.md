# 📚 APOSTILA COMPLETA: Algoritmos e Complexidade
## Material Didático Universitário - Resumo Teórico e Prático

**Autor:** Prof. Vagner Cordeiro  
**Disciplina:** Algoritmos e Complexidade  
**Curso:** Sistemas de Informação  
**Carga Horária:** 80h  

---

## 📋 ÍNDICE GERAL

### **PARTE I: FUNDAMENTOS TEÓRICOS**
1. [Conceitos Fundamentais](#conceitos-fundamentais)
2. [Análise de Complexidade](#analise-complexidade)
3. [Notação Big O](#notacao-big-o)
4. [Estruturas de Dados](#estruturas-dados)

### **PARTE II: ALGORITMOS CLÁSSICOS**
5. [Algoritmos de Ordenação](#algoritmos-ordenacao)
6. [Algoritmos de Busca](#algoritmos-busca)
7. [Estruturas Dinâmicas](#estruturas-dinamicas)
8. [Árvores e Grafos](#arvores-grafos)

### **PARTE III: APLICAÇÕES PRÁTICAS**
9. [Problemas do Mundo Real](#problemas-reais)
10. [Estudos de Caso](#estudos-caso)
11. [Exercícios Resolvidos](#exercicios-resolvidos)
12. [Lista de Conceitos](#lista-conceitos)

---

## 🎯 CONCEITOS FUNDAMENTAIS

### **📐 O que é um Algoritmo?**

**Definição Formal:**
> Um algoritmo é uma sequência **finita** e **bem definida** de instruções que resolve um problema computacional específico.

**Características Essenciais:**
1. **Finitude:** Termina em tempo finito
2. **Definição:** Cada passo é claramente especificado
3. **Entrada:** Zero ou mais valores de entrada
4. **Saída:** Um ou mais valores de saída
5. **Efetividade:** Cada passo deve ser executável

**📝 Exemplo Simples - Encontrar o Maior:**
```
ALGORITMO: encontrar_maior(lista)
ENTRADA: lista de números [a₁, a₂, ..., aₙ]
SAÍDA: maior número da lista

1. maior ← a₁
2. PARA i = 2 ATÉ n FAÇA
3.    SE aᵢ > maior ENTÃO
4.       maior ← aᵢ
5. RETORNE maior
```

**Exemplo Prático do Dia a Dia:**
- **Problema:** Encontrar o melhor preço de um produto em várias lojas
- **Algoritmo:** Visitar cada loja, comparar preços, lembrar do menor
- **Complexidade:** O(n) - precisa visitar todas as n lojas

---

## 📊 ANÁLISE DE COMPLEXIDADE

### **⏱️ Por que Analisar Complexidade?**

**Exemplo Prático:**
```
Problema: Buscar um nome em uma lista telefônica com 1 milhão de entradas

Busca Linear:     500.000 comparações em média (50% da lista)
Busca Binária:    20 comparações máximo (log₂ 1.000.000 ≈ 20)

Diferença: 25.000x mais rápido!
```

### **🔢 Notação Matemática**

**Big O - Limite Superior:**
$$f(n) = O(g(n)) \iff \exists c, n_0 > 0: f(n) \leq c \cdot g(n), \forall n \geq n_0$$

**Interpretação:** f(n) cresce no máximo tão rápido quanto g(n)

**Big Ω - Limite Inferior:**
$$f(n) = \Omega(g(n)) \iff \exists c, n_0 > 0: f(n) \geq c \cdot g(n), \forall n \geq n_0$$

**Big Θ - Limite Exato:**
$$f(n) = \Theta(g(n)) \iff f(n) = O(g(n)) \text{ E } f(n) = \Omega(g(n))$$

### **📈 Hierarquia de Complexidades**

| Notação | Nome | Exemplo | Tempo para n=10⁶ |
|---------|------|---------|-------------------|
| **O(1)** | Constante | Acesso a array | 1 μs |
| **O(log n)** | Logarítmica | Busca binária | 20 μs |
| **O(n)** | Linear | Busca linear | 1 s |
| **O(n log n)** | Linearítmica | Merge sort | 20 s |
| **O(n²)** | Quadrática | Bubble sort | 11 dias |
| **O(2ⁿ)** | Exponencial | Força bruta | 10²⁹⁴ anos |

---

## 🧮 EXEMPLOS TEÓRICOS SIMPLES

### **Exemplo 1: Análise Passo a Passo**

```c
// Somar elementos de um array
int somar_array(int arr[], int n) {
    int soma = 0;              // 1 operação
    for (int i = 0; i < n; i++) {  // n iterações
        soma += arr[i];        // 1 operação por iteração
    }
    return soma;               // 1 operação
}
```

**Cálculo de Complexidade:**
- Inicialização: 1 operação
- Loop: n iterações × 1 operação = n operações
- Retorno: 1 operação
- **Total:** T(n) = 1 + n + 1 = n + 2 = O(n)

### **Exemplo 2: Loops Aninhados**

```c
// Imprimir todas as combinações de pares
void imprimir_pares(int arr[], int n) {
    for (int i = 0; i < n; i++) {      // n iterações
        for (int j = 0; j < n; j++) {  // n iterações para cada i
            printf("(%d,%d) ", arr[i], arr[j]); // 1 operação
        }
    }
}
```

**Cálculo:**
- Loop externo: n iterações
- Loop interno: n iterações para cada iteração do externo
- **Total:** n × n = n² = O(n²)

### **Exemplo 3: Divisão Sucessiva**

```c
// Quantas vezes posso dividir n por 2?
int contar_divisoes(int n) {
    int contador = 0;
    while (n > 1) {
        n = n / 2;
        contador++;
    }
    return contador;
}
```

**Análise:**
- n → n/2 → n/4 → n/8 → ... → 1
- Número de divisões: log₂(n)
- **Complexidade:** O(log n)

---

## 💡 EXEMPLOS PRÁTICOS DO DIA A DIA

### **📱 WhatsApp: Busca de Contatos**
```c
// Como o WhatsApp encontra seus contatos rapidamente
typedef struct {
    char nome[100];
    char telefone[20];
    int id;
} Contato;

// Busca linear - O(n)
Contato* buscar_contato_linear(Contato lista[], int n, char* nome) {
    for (int i = 0; i < n; i++) {
        if (strcmp(lista[i].nome, nome) == 0) {
            return &lista[i];
        }
    }
    return NULL;
}

// Na prática: WhatsApp usa hash table - O(1)
// Converte nome em índice direto na memória
```

**Aplicação Prática:**
- **Poucos contatos (< 100):** Busca linear OK
- **Muitos contatos (> 1000):** Hash table necessária
- **Resultado:** Busca instantânea mesmo com milhares de contatos

### **🛒 E-commerce: Recomendação de Produtos**
```c
// Sistema de recomendação simples
typedef struct {
    int produto_id;
    float preco;
    int categoria;
    float avaliacao;
    int vendas;
} Produto;

// Ordenar por popularidade (vendas) - O(n log n)
void recomendar_produtos(Produto produtos[], int n) {
    // Usar quick sort por vendas
    quick_sort_por_vendas(produtos, 0, n-1);
    
    // Mostrar top 10
    for (int i = 0; i < 10 && i < n; i++) {
        printf("Produto: %d (Vendas: %d)\n", 
               produtos[i].produto_id, produtos[i].vendas);
    }
}
```

**Casos Reais:**
- **Amazon:** Usa algoritmos complexos O(n log n) para milhões de produtos
- **Pequena loja online:** Bubble sort O(n²) pode ser suficiente para 100 produtos
- **Trade-off:** Complexidade vs necessidade real

### **🏦 Sistema Bancário: Processamento de Transações**
```c
typedef struct {
    int conta_origem;
    int conta_destino;
    float valor;
    time_t timestamp;
    char tipo[20];
} Transacao;

// Processar transações em lote - O(n)
void processar_transacoes(Transacao transacoes[], int n) {
    for (int i = 0; i < n; i++) {
        // Validação O(1)
        if (validar_transacao(&transacoes[i])) {
            // Processamento O(1)
            executar_transferencia(&transacoes[i]);
        }
    }
}
```

**Análise Real:**
- **Pix:** Processamento em O(1) - instantâneo
- **TED/DOC:** Processamento em lotes O(n) - algumas horas
- **Relatórios:** Busca e ordenação O(n log n) - fim do dia

---

## 🔧 ESTRUTURAS DE DADOS FUNDAMENTAIS

### **📚 Array vs Lista Ligada**

**Array (Vetor):**
```c
int numeros[100];  // Memória contígua, acesso O(1)

// Vantagens:
// ✅ Acesso direto: numeros[50] em O(1)
// ✅ Menos memória: apenas os dados
// ✅ Cache-friendly: dados próximos na memória

// Desvantagens:
// ❌ Tamanho fixo
// ❌ Inserção no meio: O(n) - precisa mover elementos
```

**Lista Ligada:**
```c
typedef struct No {
    int dado;
    struct No* proximo;
} No;

// Vantagens:
// ✅ Tamanho dinâmico
// ✅ Inserção no início: O(1)
// ✅ Não desperdiça memória

// Desvantagens:
// ❌ Acesso sequencial: O(n) para elemento i
// ❌ Overhead de ponteiros: +8 bytes por elemento
// ❌ Cache-unfriendly: dados espalhados na memória
```

**Quando Usar Cada Um:**
- **Array:** Acesso frequente por índice, dados de tamanho conhecido
- **Lista:** Inserções/remoções frequentes, tamanho variável

### **📚 Pilha (Stack) - LIFO**

**Exemplo Prático: Histórico do Navegador**
```c
typedef struct {
    char url[200];
    char titulo[100];
} PaginaWeb;

typedef struct {
    PaginaWeb paginas[1000];
    int topo;
} HistoricoNavegador;

// Visitar nova página - O(1)
void visitar_pagina(HistoricoNavegador* hist, char* url, char* titulo) {
    if (hist->topo < 999) {
        strcpy(hist->paginas[++hist->topo].url, url);
        strcpy(hist->paginas[hist->topo].titulo, titulo);
    }
}

// Botão "Voltar" - O(1)
PaginaWeb* voltar(HistoricoNavegador* hist) {
    if (hist->topo > 0) {
        return &hist->paginas[--hist->topo];
    }
    return NULL;
}
```

### **📚 Fila (Queue) - FIFO**

**Exemplo Prático: Sistema de Atendimento**
```c
typedef struct {
    char nome[100];
    int prioridade;  // 1=normal, 2=preferencial, 3=urgente
    time_t chegada;
} Cliente;

typedef struct {
    Cliente clientes[500];
    int inicio, fim;
} FilaAtendimento;

// Chegar na fila - O(1)
void entrar_na_fila(FilaAtendimento* fila, Cliente cliente) {
    if ((fila->fim + 1) % 500 != fila->inicio) {
        fila->clientes[fila->fim] = cliente;
        fila->fim = (fila->fim + 1) % 500;
    }
}

// Ser atendido - O(1)
Cliente* proximo_atendimento(FilaAtendimento* fila) {
    if (fila->inicio != fila->fim) {
        Cliente* cliente = &fila->clientes[fila->inicio];
        fila->inicio = (fila->inicio + 1) % 500;
        return cliente;
    }
    return NULL;
}
```

---

## 🎯 ALGORITMOS DE ORDENAÇÃO

### **🔵 Bubble Sort - O(n²)**

**Analogia:** Como organizar cartas na mão
```c
void bubble_sort_simples(int arr[], int n) {
    // Para cada posição
    for (int i = 0; i < n-1; i++) {
        // Compara elementos adjacentes
        for (int j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                // Troca se estiver fora de ordem
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
}
```

**Exemplo Visual:**
```
[64, 34, 25, 12, 22, 11, 90]
[34, 64, 25, 12, 22, 11, 90]  ← 64 e 34 trocam
[34, 25, 64, 12, 22, 11, 90]  ← 64 e 25 trocam
[34, 25, 12, 64, 22, 11, 90]  ← 64 e 12 trocam
...
[34, 25, 12, 22, 11, 64, 90]  ← 90 já está no lugar certo
```

**Quando Usar:**
- ✅ Ensino (fácil de entender)
- ✅ Arrays muito pequenos (n < 20)
- ❌ Nunca em produção para n > 100

### **🟢 Insertion Sort - O(n²), mas O(n) no melhor caso**

**Analogia:** Como organizar cartas conforme recebe
```c
void insertion_sort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int chave = arr[i];
        int j = i - 1;
        
        // Move elementos maiores uma posição à frente
        while (j >= 0 && arr[j] > chave) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = chave;
    }
}
```

**Vantagem Especial:**
- **Array quase ordenado:** O(n) - muito eficiente!
- **Exemplo:** [1, 2, 3, 5, 4] → apenas 1 inserção necessária

### **🔴 Quick Sort - O(n log n) médio, O(n²) pior caso**

**Analogia:** Dividir para conquistar (como organizar uma biblioteca)
```c
void quick_sort(int arr[], int baixo, int alto) {
    if (baixo < alto) {
        // Particiona e encontra posição do pivô
        int pi = particionar(arr, baixo, alto);
        
        // Recursivamente ordena elementos antes e depois do pivô
        quick_sort(arr, baixo, pi - 1);
        quick_sort(arr, pi + 1, alto);
    }
}
```

**Estratégia:**
1. Escolhe um "pivô"
2. Coloca elementos menores à esquerda, maiores à direita
3. Repete recursivamente para cada lado

---

## 🌳 ÁRVORES BINÁRIAS

### **📐 Conceitos Fundamentais**

**Definição:** Estrutura hierárquica onde cada nó tem no máximo 2 filhos

```c
typedef struct No {
    int dados;
    struct No* esquerda;
    struct No* direita;
} No;
```

**Propriedades Matemáticas:**
- **Altura mínima:** log₂(n) (árvore completa)
- **Altura máxima:** n-1 (árvore degenerada)
- **Número de folhas:** ⌈n/2⌉ (aproximadamente)

### **🔍 Árvore Binária de Busca (BST)**

**Propriedade Fundamental:**
- Subárvore esquerda: todos valores < nó atual
- Subárvore direita: todos valores > nó atual

```c
// Busca em BST - O(log n) melhor caso, O(n) pior caso
No* buscar_bst(No* raiz, int valor) {
    if (raiz == NULL || raiz->dados == valor)
        return raiz;
    
    if (valor < raiz->dados)
        return buscar_bst(raiz->esquerda, valor);
    else
        return buscar_bst(raiz->direita, valor);
}
```

**Exemplo Prático: Sistema de Login**
```
        "maria"
       /       \
   "ana"       "pedro"
   /   \       /     \
"bob" "carlos" "joão" "sofia"
```

- Buscar "joão": maria → pedro → joão (3 comparações)
- Lista linear: até 7 comparações no pior caso

---

## 📋 LISTA DE CONCEITOS TEÓRICOS

### **🎯 Complexidade Computacional**

1. **Big O Notation**
   - Limite superior assintótico
   - Ignora constantes e termos de baixa ordem
   - Foca no crescimento para n → ∞

2. **Big Ω Notation**
   - Limite inferior assintótico
   - Melhor caso possível para um problema

3. **Big Θ Notation**
   - Limite exato assintótico
   - Quando Big O = Big Ω

4. **Análise Amortizada**
   - Custo médio de operações em sequência
   - Exemplo: Dynamic Array (vetor dinâmico)

### **🏗️ Estruturas de Dados**

1. **Arrays**
   - Acesso: O(1)
   - Busca: O(n)
   - Inserção/Remoção: O(n)

2. **Listas Ligadas**
   - Acesso: O(n)
   - Inserção no início: O(1)
   - Busca: O(n)

3. **Pilhas (Stacks)**
   - Push/Pop: O(1)
   - LIFO: Last In, First Out

4. **Filas (Queues)**
   - Enqueue/Dequeue: O(1)
   - FIFO: First In, First Out

5. **Árvores Binárias**
   - Busca: O(log n) a O(n)
   - Inserção: O(log n) a O(n)
   - Depende do balanceamento

6. **Hash Tables**
   - Busca/Inserção: O(1) médio
   - Pior caso: O(n) com muitas colisões

### **🔄 Algoritmos Fundamentais**

1. **Ordenação**
   - Comparison-based: Ω(n log n) limite inferior
   - Non-comparison: O(n) possível (counting sort)

2. **Busca**
   - Linear: O(n)
   - Binária: O(log n) - requer dados ordenados

3. **Grafos**
   - DFS: O(V + E)
   - BFS: O(V + E)
   - Dijkstra: O((V + E) log V)

---

## 💻 LISTA DE CONCEITOS PRÁTICOS

### **🛠️ Implementação em C**

1. **Gerenciamento de Memória**
   ```c
   // Alocação dinâmica
   int* arr = malloc(n * sizeof(int));
   // Sempre verificar se malloc retornou NULL
   if (arr == NULL) {
       printf("Erro de alocação!\n");
       return -1;
   }
   // Liberar memória
   free(arr);
   arr = NULL;  // Boa prática
   ```

2. **Ponteiros**
   ```c
   int x = 10;
   int* p = &x;     // p aponta para x
   printf("%d", *p); // Imprime 10
   *p = 20;         // x agora vale 20
   ```

3. **Estruturas**
   ```c
   typedef struct {
       char nome[100];
       int idade;
       float salario;
   } Pessoa;
   
   Pessoa p1 = {"João", 25, 3000.0};
   ```

### **⚡ Otimizações Práticas**

1. **Cache Locality**
   - Arrays são cache-friendly
   - Listas ligadas são cache-unfriendly
   - Prefira iteração sequencial

2. **Escolha de Algoritmos**
   ```c
   if (n < 50) {
       insertion_sort(arr, n);  // Mais rápido para pequenos n
   } else {
       quick_sort(arr, 0, n-1); // Melhor para n grandes
   }
   ```

3. **Evitar Recursão Desnecessária**
   ```c
   // Recursivo - pode dar stack overflow
   int fibonacci_recursivo(int n) {
       if (n <= 1) return n;
       return fibonacci_recursivo(n-1) + fibonacci_recursivo(n-2);
   }
   
   // Iterativo - mais eficiente
   int fibonacci_iterativo(int n) {
       if (n <= 1) return n;
       int a = 0, b = 1, c;
       for (int i = 2; i <= n; i++) {
           c = a + b;
           a = b;
           b = c;
       }
       return b;
   }
   ```

### **🔧 Debugging e Testes**

1. **Validação de Entrada**
   ```c
   int buscar(int arr[], int n, int valor) {
       if (arr == NULL || n <= 0) {
           return -1;  // Entrada inválida
       }
       // ... resto da implementação
   }
   ```

2. **Assertions**
   ```c
   #include <assert.h>
   
   void insertion_sort(int arr[], int n) {
       assert(arr != NULL);  // Garante arr válido
       assert(n >= 0);       // Garante n não-negativo
       // ... implementação
   }
   ```

3. **Contadores para Análise**
   ```c
   typedef struct {
       long comparacoes;
       long trocas;
       double tempo_execucao;
   } Estatisticas;
   
   void bubble_sort_com_stats(int arr[], int n, Estatisticas* stats) {
       stats->comparacoes = 0;
       stats->trocas = 0;
       
       clock_t inicio = clock();
       
       for (int i = 0; i < n-1; i++) {
           for (int j = 0; j < n-i-1; j++) {
               stats->comparacoes++;
               if (arr[j] > arr[j+1]) {
                   // Troca
                   int temp = arr[j];
                   arr[j] = arr[j+1];
                   arr[j+1] = temp;
                   stats->trocas++;
               }
           }
       }
       
       clock_t fim = clock();
       stats->tempo_execucao = ((double)(fim - inicio)) / CLOCKS_PER_SEC;
   }
   ```

---

## 🎯 RESUMO EXECUTIVO

### **📊 Quadro Resumo de Complexidades**

| Estrutura/Algoritmo | Acesso | Busca | Inserção | Remoção | Espaço |
|-------------------|--------|-------|----------|---------|---------|
| **Array** | O(1) | O(n) | O(n) | O(n) | O(n) |
| **Lista Ligada** | O(n) | O(n) | O(1) | O(1) | O(n) |
| **Pilha** | O(n) | O(n) | O(1) | O(1) | O(n) |
| **Fila** | O(n) | O(n) | O(1) | O(1) | O(n) |
| **BST** | O(log n) | O(log n) | O(log n) | O(log n) | O(n) |
| **Hash Table** | N/A | O(1)* | O(1)* | O(1)* | O(n) |

*Complexidade média, pior caso pode ser O(n)

### **🎯 Guia de Escolha Rápida**

**Para Busca Frequente:**
- Hash Table → O(1)
- BST balanceada → O(log n)
- Array ordenado + busca binária → O(log n)

**Para Inserção/Remoção Frequente:**
- Lista ligada → O(1) no início
- Hash table → O(1) médio
- BST → O(log n)

**Para Acesso por Índice:**
- Array → O(1)
- Deque → O(1) nas extremidades

**Para Dados Ordenados:**
- BST → mantém ordem automaticamente
- Array + insertion sort → O(n²) mas eficiente para n pequeno
- Array + quick sort → O(n log n) para n grande

### **💡 Princípios Fundamentais**

1. **Escolha a estrutura adequada ao padrão de uso**
2. **Meça performance real, não apenas teórica**
3. **Considere trade-offs: tempo vs espaço vs simplicidade**
4. **Otimize apenas após identificar gargalos**
5. **Código simples e correto primeiro, otimização depois**

---

**📚 Esta apostila serve como referência rápida para conceitos fundamentais de algoritmos e estruturas de dados. Para aprofundamento, consulte o material detalhado das aulas específicas.**

*Última atualização: 27 de agosto de 2025*
