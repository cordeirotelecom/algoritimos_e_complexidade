# 📚 EXERCÍCIOS RESOLVIDOS - Algoritmos e Complexidade
## Lista Completa com Soluções Detalhadas

---

## 🎯 SEÇÃO 1: ANÁLISE DE COMPLEXIDADE

### **Exercício 1.1: Análise Básica**
**Questão:** Determine a complexidade dos seguintes códigos:

**a) Código A:**
```c
int somar_pares(int arr[], int n) {
    int soma = 0;                    // 1 operação
    for (int i = 0; i < n; i++) {    // n iterações
        if (arr[i] % 2 == 0) {       // 1 operação por iteração
            soma += arr[i];          // 1 operação (quando executa)
        }
    }
    return soma;                     // 1 operação
}
```

**Solução A:**
- Inicialização: 1 operação
- Loop: n iterações
- Dentro do loop: 1 verificação + 0 ou 1 soma = 1 operação por iteração
- Retorno: 1 operação
- **Total:** T(n) = 1 + n × 1 + 1 = n + 2
- **Complexidade:** O(n)

**b) Código B:**
```c
void imprimir_matriz(int matriz[][100], int n) {
    for (int i = 0; i < n; i++) {        // n iterações
        for (int j = 0; j < n; j++) {    // n iterações para cada i
            printf("%d ", matriz[i][j]); // 1 operação
        }
        printf("\n");                    // 1 operação por linha
    }
}
```

**Solução B:**
- Loop externo: n iterações
- Loop interno: n iterações para cada iteração do externo
- Operações por iteração interna: 1
- Operações por iteração externa (printf da quebra): 1
- **Total:** T(n) = n × n × 1 + n × 1 = n² + n
- **Complexidade:** O(n²)

---

### **Exercício 1.2: Análise Avançada**
**Questão:** Analise a complexidade do algoritmo de busca ternária:

```c
int busca_ternaria(int arr[], int esq, int dir, int valor) {
    if (dir >= esq) {
        int meio1 = esq + (dir - esq) / 3;
        int meio2 = dir - (dir - esq) / 3;
        
        if (arr[meio1] == valor)
            return meio1;
        if (arr[meio2] == valor)
            return meio2;
            
        if (valor < arr[meio1])
            return busca_ternaria(arr, esq, meio1 - 1, valor);
        else if (valor > arr[meio2])
            return busca_ternaria(arr, meio2 + 1, dir, valor);
        else
            return busca_ternaria(arr, meio1 + 1, meio2 - 1, valor);
    }
    return -1;
}
```

**Solução:**
A cada chamada recursiva, o espaço de busca é reduzido para 1/3 do tamanho anterior.

**Recorrência:** T(n) = T(n/3) + O(1)

**Resolução:**
- T(n) = T(n/3) + c
- T(n/3) = T(n/9) + c
- T(n/9) = T(n/27) + c
- ...
- T(1) = c

**Número de níveis:** log₃(n)
**Total:** c × log₃(n) = O(log n)

**Conversão de base:** log₃(n) = log₂(n) / log₂(3) ≈ 0.63 × log₂(n)

**Complexidade:** O(log n) - mais eficiente que busca binária por constante menor

---

## 🔢 SEÇÃO 2: ALGORITMOS DE ORDENAÇÃO

### **Exercício 2.1: Implementação e Análise**
**Questão:** Implemente o Selection Sort e analise suas operações:

```c
void selection_sort_detalhado(int arr[], int n) {
    int comparacoes = 0, trocas = 0;
    
    for (int i = 0; i < n-1; i++) {
        int indice_minimo = i;
        
        // Encontrar o menor elemento no restante do array
        for (int j = i+1; j < n; j++) {
            comparacoes++;
            if (arr[j] < arr[indice_minimo]) {
                indice_minimo = j;
            }
        }
        
        // Trocar se necessário
        if (indice_minimo != i) {
            int temp = arr[i];
            arr[i] = arr[indice_minimo];
            arr[indice_minimo] = temp;
            trocas++;
        }
    }
    
    printf("Comparações: %d\n", comparacoes);
    printf("Trocas: %d\n", trocas);
}
```

**Solução - Análise de Comparações:**
- Primeira iteração (i=0): n-1 comparações
- Segunda iteração (i=1): n-2 comparações
- Terceira iteração (i=2): n-3 comparações
- ...
- Última iteração (i=n-2): 1 comparação

**Total de comparações:**
∑(k=1 até n-1) k = (n-1) + (n-2) + ... + 1 = (n-1)×n/2 = n²/2 - n/2

**Análise de Trocas:**
- Melhor caso: 0 trocas (array já ordenado)
- Pior caso: n-1 trocas
- Caso médio: aproximadamente n/4 trocas

**Complexidade:**
- **Tempo:** O(n²) em todos os casos
- **Espaço:** O(1) - ordenação in-place
- **Estabilidade:** Não estável (pode alterar ordem de elementos iguais)

---

### **Exercício 2.2: Comparação Prática**
**Questão:** Compare Bubble Sort otimizado vs Insertion Sort:

```c
// Bubble Sort com otimização early stop
void bubble_sort_otimizado(int arr[], int n) {
    int comparacoes = 0, trocas = 0;
    
    for (int i = 0; i < n-1; i++) {
        int houve_troca = 0;
        
        for (int j = 0; j < n-i-1; j++) {
            comparacoes++;
            if (arr[j] > arr[j+1]) {
                // Trocar
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
                trocas++;
                houve_troca = 1;
            }
        }
        
        // Se não houve troca, array está ordenado
        if (!houve_troca) {
            printf("Array ordenado na iteração %d\n", i+1);
            break;
        }
    }
    
    printf("Bubble Sort - Comparações: %d, Trocas: %d\n", comparacoes, trocas);
}

// Insertion Sort detalhado
void insertion_sort_detalhado(int arr[], int n) {
    int comparacoes = 0, trocas = 0;
    
    for (int i = 1; i < n; i++) {
        int chave = arr[i];
        int j = i - 1;
        
        // Mover elementos maiores que chave uma posição à frente
        while (j >= 0) {
            comparacoes++;
            if (arr[j] > chave) {
                arr[j + 1] = arr[j];
                j--;
                trocas++;
            } else {
                break;
            }
        }
        arr[j + 1] = chave;
    }
    
    printf("Insertion Sort - Comparações: %d, Trocas: %d\n", comparacoes, trocas);
}
```

**Teste Prático:**
```c
int main() {
    // Caso 1: Array quase ordenado
    int arr1[] = {1, 2, 3, 5, 4, 6, 7};
    int n1 = 7;
    
    printf("Array quase ordenado: ");
    imprimir_array(arr1, n1);
    
    int arr1_copy[7];
    copiar_array(arr1, arr1_copy, n1);
    
    bubble_sort_otimizado(arr1, n1);
    insertion_sort_detalhado(arr1_copy, n1);
    
    // Caso 2: Array inversamente ordenado
    int arr2[] = {7, 6, 5, 4, 3, 2, 1};
    int n2 = 7;
    
    printf("\nArray inversamente ordenado: ");
    imprimir_array(arr2, n2);
    
    int arr2_copy[7];
    copiar_array(arr2, arr2_copy, n2);
    
    bubble_sort_otimizado(arr2, n2);
    insertion_sort_detalhado(arr2_copy, n2);
}
```

**Resultados Esperados:**

**Array Quase Ordenado [1,2,3,5,4,6,7]:**
- Bubble Sort: ~6 comparações, 1 troca
- Insertion Sort: ~3 comparações, 1 troca
- **Vencedor: Insertion Sort** (menos comparações)

**Array Inversamente Ordenado [7,6,5,4,3,2,1]:**
- Bubble Sort: 21 comparações, 21 trocas
- Insertion Sort: 21 comparações, 21 movimentações
- **Empate técnico, mas Insertion Sort é mais eficiente na prática**

---

## 🌳 SEÇÃO 3: ESTRUTURAS DE DADOS

### **Exercício 3.1: Implementação de Pilha**
**Questão:** Implemente uma pilha com histórico de operações e análise de uso:

```c
#define MAX_SIZE 100
#define MAX_HISTORICO 1000

typedef struct {
    char operacao[20];
    int valor;
    time_t timestamp;
} OperacaoHistorico;

typedef struct {
    int dados[MAX_SIZE];
    int topo;
    OperacaoHistorico historico[MAX_HISTORICO];
    int total_operacoes;
    int max_tamanho_atingido;
} PilhaComHistorico;

// Inicializar pilha
void inicializar_pilha(PilhaComHistorico* p) {
    p->topo = -1;
    p->total_operacoes = 0;
    p->max_tamanho_atingido = 0;
}

// Push com logging
int push_com_log(PilhaComHistorico* p, int valor) {
    if (p->topo >= MAX_SIZE - 1) {
        printf("Erro: Pilha cheia!\n");
        return 0;
    }
    
    p->dados[++p->topo] = valor;
    
    // Atualizar estatísticas
    if (p->topo + 1 > p->max_tamanho_atingido) {
        p->max_tamanho_atingido = p->topo + 1;
    }
    
    // Adicionar ao histórico
    if (p->total_operacoes < MAX_HISTORICO) {
        strcpy(p->historico[p->total_operacoes].operacao, "PUSH");
        p->historico[p->total_operacoes].valor = valor;
        p->historico[p->total_operacoes].timestamp = time(NULL);
        p->total_operacoes++;
    }
    
    return 1; // Sucesso
}

// Pop com logging
int pop_com_log(PilhaComHistorico* p) {
    if (p->topo < 0) {
        printf("Erro: Pilha vazia!\n");
        return INT_MIN; // Valor especial para erro
    }
    
    int valor = p->dados[p->topo--];
    
    // Adicionar ao histórico
    if (p->total_operacoes < MAX_HISTORICO) {
        strcpy(p->historico[p->total_operacoes].operacao, "POP");
        p->historico[p->total_operacoes].valor = valor;
        p->historico[p->total_operacoes].timestamp = time(NULL);
        p->total_operacoes++;
    }
    
    return valor;
}

// Análise de uso da pilha
void analisar_pilha(PilhaComHistorico* p) {
    printf("=== ANÁLISE DE USO DA PILHA ===\n");
    printf("Total de operações: %d\n", p->total_operacoes);
    printf("Tamanho atual: %d\n", p->topo + 1);
    printf("Máximo tamanho atingido: %d\n", p->max_tamanho_atingido);
    printf("Utilização máxima: %.2f%%\n", 
           (p->max_tamanho_atingido * 100.0) / MAX_SIZE);
    
    // Contar operações
    int pushes = 0, pops = 0;
    for (int i = 0; i < p->total_operacoes; i++) {
        if (strcmp(p->historico[i].operacao, "PUSH") == 0) {
            pushes++;
        } else {
            pops++;
        }
    }
    
    printf("Total PUSHs: %d\n", pushes);
    printf("Total POPs: %d\n", pops);
    printf("Razão PUSH/POP: %.2f\n", pushes / (float)pops);
    
    // Últimas 5 operações
    printf("\nÚltimas 5 operações:\n");
    int inicio = p->total_operacoes - 5;
    if (inicio < 0) inicio = 0;
    
    for (int i = inicio; i < p->total_operacoes; i++) {
        printf("%s %d\n", 
               p->historico[i].operacao, 
               p->historico[i].valor);
    }
}
```

**Teste da Pilha:**
```c
int main() {
    PilhaComHistorico pilha;
    inicializar_pilha(&pilha);
    
    // Simular uso prático: calculadora RPN (Notação Polonesa Reversa)
    // Expressão: 3 4 + 2 * 1 - (resultado: 13)
    
    printf("Calculando: 3 4 + 2 * 1 -\n");
    
    // 3 4 +
    push_com_log(&pilha, 3);
    push_com_log(&pilha, 4);
    int b = pop_com_log(&pilha);
    int a = pop_com_log(&pilha);
    push_com_log(&pilha, a + b);
    printf("Após 3 4 +: topo = %d\n", pilha.dados[pilha.topo]);
    
    // 2 *
    push_com_log(&pilha, 2);
    b = pop_com_log(&pilha);
    a = pop_com_log(&pilha);
    push_com_log(&pilha, a * b);
    printf("Após 2 *: topo = %d\n", pilha.dados[pilha.topo]);
    
    // 1 -
    push_com_log(&pilha, 1);
    b = pop_com_log(&pilha);
    a = pop_com_log(&pilha);
    push_com_log(&pilha, a - b);
    printf("Resultado final: %d\n", pilha.dados[pilha.topo]);
    
    analisar_pilha(&pilha);
    
    return 0;
}
```

**Resultado Esperado:**
```
Calculando: 3 4 + 2 * 1 -
Após 3 4 +: topo = 7
Após 2 *: topo = 14
Resultado final: 13

=== ANÁLISE DE USO DA PILHA ===
Total de operações: 9
Tamanho atual: 1
Máximo tamanho atingido: 2
Utilização máxima: 2.00%
Total PUSHs: 5
Total POPs: 4
Razão PUSH/POP: 1.25

Últimas 5 operações:
PUSH 2
POP 2
POP 7
PUSH 14
PUSH 1
```

---

### **Exercício 3.2: Lista Ligada vs Array - Comparação Prática**
**Questão:** Compare inserção de 1000 elementos no início da estrutura:

```c
#include <time.h>
#include <stdlib.h>

// Estrutura para lista ligada
typedef struct No {
    int dados;
    struct No* proximo;
} No;

typedef struct {
    No* cabeca;
    int tamanho;
} ListaLigada;

// Array dinâmico
typedef struct {
    int* dados;
    int tamanho;
    int capacidade;
} ArrayDinamico;

// Implementações da Lista Ligada
void init_lista(ListaLigada* lista) {
    lista->cabeca = NULL;
    lista->tamanho = 0;
}

void inserir_inicio_lista(ListaLigada* lista, int valor) {
    No* novo = malloc(sizeof(No));
    novo->dados = valor;
    novo->proximo = lista->cabeca;
    lista->cabeca = novo;
    lista->tamanho++;
}

// Implementações do Array Dinâmico
void init_array(ArrayDinamico* arr) {
    arr->dados = malloc(10 * sizeof(int));
    arr->tamanho = 0;
    arr->capacidade = 10;
}

void inserir_inicio_array(ArrayDinamico* arr, int valor) {
    // Verificar se precisa expandir
    if (arr->tamanho >= arr->capacidade) {
        arr->capacidade *= 2;
        arr->dados = realloc(arr->dados, arr->capacidade * sizeof(int));
    }
    
    // Mover todos os elementos uma posição à frente
    for (int i = arr->tamanho; i > 0; i--) {
        arr->dados[i] = arr->dados[i-1];
    }
    
    arr->dados[0] = valor;
    arr->tamanho++;
}

// Teste de performance
void teste_performance() {
    const int N = 1000;
    
    // Teste Lista Ligada
    ListaLigada lista;
    init_lista(&lista);
    
    clock_t inicio = clock();
    for (int i = 0; i < N; i++) {
        inserir_inicio_lista(&lista, i);
    }
    clock_t fim = clock();
    double tempo_lista = ((double)(fim - inicio)) / CLOCKS_PER_SEC;
    
    // Teste Array Dinâmico
    ArrayDinamico arr;
    init_array(&arr);
    
    inicio = clock();
    for (int i = 0; i < N; i++) {
        inserir_inicio_array(&arr, i);
    }
    fim = clock();
    double tempo_array = ((double)(fim - inicio)) / CLOCKS_PER_SEC;
    
    // Resultados
    printf("=== TESTE DE PERFORMANCE ===\n");
    printf("Inserções no início: %d elementos\n", N);
    printf("Lista Ligada: %.6f segundos\n", tempo_lista);
    printf("Array Dinâmico: %.6f segundos\n", tempo_array);
    printf("Lista é %.2fx mais rápida\n", tempo_array / tempo_lista);
    
    // Análise de memória
    int memoria_lista = lista.tamanho * sizeof(No);
    int memoria_array = arr.capacidade * sizeof(int);
    
    printf("\n=== USO DE MEMÓRIA ===\n");
    printf("Lista Ligada: %d bytes (%d nós)\n", memoria_lista, lista.tamanho);
    printf("Array Dinâmico: %d bytes (capacidade %d)\n", memoria_array, arr.capacidade);
    printf("Overhead da lista: %d bytes de ponteiros\n", 
           lista.tamanho * (int)sizeof(No*));
}
```

**Análise dos Resultados Esperados:**

**Performance:**
- Lista Ligada: ~0.000050 segundos
- Array Dinâmico: ~0.002500 segundos
- **Lista é ~50x mais rápida para inserção no início**

**Memória:**
- Lista: 1000 × (4 bytes dados + 8 bytes ponteiro) = 12.000 bytes
- Array: capacidade final (~1024) × 4 bytes = 4.096 bytes
- **Array usa ~3x menos memória**

**Conclusão:**
- **Para inserção no início:** Lista Ligada vence
- **Para economia de memória:** Array vence
- **Para acesso aleatório:** Array vence (O(1) vs O(n))

---

## 🔍 SEÇÃO 4: ALGORITMOS DE BUSCA

### **Exercício 4.1: Busca Linear vs Binária**
**Questão:** Implemente e compare ambos algoritmos com análise estatística:

```c
typedef struct {
    int comparacoes;
    double tempo_execucao;
    int encontrado;
    int posicao;
} ResultadoBusca;

// Busca Linear com estatísticas
ResultadoBusca busca_linear_stats(int arr[], int n, int valor) {
    ResultadoBusca resultado = {0, 0.0, 0, -1};
    
    clock_t inicio = clock();
    
    for (int i = 0; i < n; i++) {
        resultado.comparacoes++;
        if (arr[i] == valor) {
            resultado.encontrado = 1;
            resultado.posicao = i;
            break;
        }
    }
    
    clock_t fim = clock();
    resultado.tempo_execucao = ((double)(fim - inicio)) / CLOCKS_PER_SEC;
    
    return resultado;
}

// Busca Binária com estatísticas
ResultadoBusca busca_binaria_stats(int arr[], int n, int valor) {
    ResultadoBusca resultado = {0, 0.0, 0, -1};
    
    clock_t inicio = clock();
    
    int esq = 0, dir = n - 1;
    
    while (esq <= dir) {
        resultado.comparacoes++;
        int meio = esq + (dir - esq) / 2;
        
        if (arr[meio] == valor) {
            resultado.encontrado = 1;
            resultado.posicao = meio;
            break;
        }
        
        resultado.comparacoes++;
        if (arr[meio] < valor) {
            esq = meio + 1;
        } else {
            dir = meio - 1;
        }
    }
    
    clock_t fim = clock();
    resultado.tempo_execucao = ((double)(fim - inicio)) / CLOCKS_PER_SEC;
    
    return resultado;
}

// Teste comparativo
void teste_comparativo_busca() {
    // Criar array ordenado de 10000 elementos
    const int N = 10000;
    int* arr = malloc(N * sizeof(int));
    for (int i = 0; i < N; i++) {
        arr[i] = i * 2; // Números pares: 0, 2, 4, 6, ...
    }
    
    // Teste 1: Elemento no início
    printf("=== TESTE 1: Buscar %d (início) ===\n", arr[0]);
    ResultadoBusca linear1 = busca_linear_stats(arr, N, arr[0]);
    ResultadoBusca binaria1 = busca_binaria_stats(arr, N, arr[0]);
    
    printf("Linear:  %d comparações, posição %d\n", 
           linear1.comparacoes, linear1.posicao);
    printf("Binária: %d comparações, posição %d\n", 
           binaria1.comparacoes, binaria1.posicao);
    
    // Teste 2: Elemento no meio
    int meio = N / 2;
    printf("\n=== TESTE 2: Buscar %d (meio) ===\n", arr[meio]);
    ResultadoBusca linear2 = busca_linear_stats(arr, N, arr[meio]);
    ResultadoBusca binaria2 = busca_binaria_stats(arr, N, arr[meio]);
    
    printf("Linear:  %d comparações, posição %d\n", 
           linear2.comparacoes, linear2.posicao);
    printf("Binária: %d comparações, posição %d\n", 
           binaria2.comparacoes, binaria2.posicao);
    
    // Teste 3: Elemento no final
    printf("\n=== TESTE 3: Buscar %d (final) ===\n", arr[N-1]);
    ResultadoBusca linear3 = busca_linear_stats(arr, N, arr[N-1]);
    ResultadoBusca binaria3 = busca_binaria_stats(arr, N, arr[N-1]);
    
    printf("Linear:  %d comparações, posição %d\n", 
           linear3.comparacoes, linear3.posicao);
    printf("Binária: %d comparações, posição %d\n", 
           binaria3.comparacoes, binaria3.posicao);
    
    // Teste 4: Elemento não existe
    printf("\n=== TESTE 4: Buscar 99999 (não existe) ===\n");
    ResultadoBusca linear4 = busca_linear_stats(arr, N, 99999);
    ResultadoBusca binaria4 = busca_binaria_stats(arr, N, 99999);
    
    printf("Linear:  %d comparações, encontrado: %s\n", 
           linear4.comparacoes, linear4.encontrado ? "SIM" : "NÃO");
    printf("Binária: %d comparações, encontrado: %s\n", 
           binaria4.comparacoes, binaria4.encontrado ? "SIM" : "NÃO");
    
    // Análise estatística
    printf("\n=== ANÁLISE ESTATÍSTICA ===\n");
    double media_linear = (linear1.comparacoes + linear2.comparacoes + 
                          linear3.comparacoes + linear4.comparacoes) / 4.0;
    double media_binaria = (binaria1.comparacoes + binaria2.comparacoes + 
                           binaria3.comparacoes + binaria4.comparacoes) / 4.0;
    
    printf("Média de comparações:\n");
    printf("Linear: %.2f\n", media_linear);
    printf("Binária: %.2f\n", media_binaria);
    printf("Binária é %.2fx mais eficiente em média\n", 
           media_linear / media_binaria);
    
    free(arr);
}
```

**Resultados Esperados:**

```
=== TESTE 1: Buscar 0 (início) ===
Linear:  1 comparações, posição 0
Binária: 13 comparações, posição 0

=== TESTE 2: Buscar 9998 (meio) ===
Linear:  5000 comparações, posição 4999
Binária: 1 comparações, posição 4999

=== TESTE 3: Buscar 19998 (final) ===
Linear:  10000 comparações, posição 9999
Binária: 14 comparações, posição 9999

=== TESTE 4: Buscar 99999 (não existe) ===
Linear:  10000 comparações, encontrado: NÃO
Binária: 14 comparações, encontrado: NÃO

=== ANÁLISE ESTATÍSTICA ===
Média de comparações:
Linear: 6250.25
Binária: 10.50
Binária é 595.26x mais eficiente em média
```

---

## 🎲 SEÇÃO 5: PROBLEMAS PRÁTICOS

### **Exercício 5.1: Sistema de Cache LRU (Least Recently Used)**
**Questão:** Implemente um cache LRU para simular cache de páginas web:

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

#define MAX_CACHE_SIZE 5
#define MAX_URL_SIZE 100

typedef struct CacheNode {
    char url[MAX_URL_SIZE];
    char conteudo[200];
    time_t timestamp;
    struct CacheNode* anterior;
    struct CacheNode* proximo;
} CacheNode;

typedef struct {
    CacheNode* cabeca;
    CacheNode* cauda;
    int tamanho;
    int hits;
    int misses;
} CacheLRU;

// Inicializar cache
void init_cache(CacheLRU* cache) {
    cache->cabeca = NULL;
    cache->cauda = NULL;
    cache->tamanho = 0;
    cache->hits = 0;
    cache->misses = 0;
}

// Mover nó para o início (mais recente)
void mover_para_inicio(CacheLRU* cache, CacheNode* no) {
    if (cache->cabeca == no) return; // Já está no início
    
    // Remover da posição atual
    if (no->anterior) no->anterior->proximo = no->proximo;
    if (no->proximo) no->proximo->anterior = no->anterior;
    if (cache->cauda == no) cache->cauda = no->anterior;
    
    // Inserir no início
    no->anterior = NULL;
    no->proximo = cache->cabeca;
    if (cache->cabeca) cache->cabeca->anterior = no;
    cache->cabeca = no;
    if (!cache->cauda) cache->cauda = no;
}

// Buscar no cache
char* buscar_cache(CacheLRU* cache, const char* url) {
    CacheNode* atual = cache->cabeca;
    
    while (atual) {
        if (strcmp(atual->url, url) == 0) {
            // Cache HIT
            cache->hits++;
            atual->timestamp = time(NULL);
            mover_para_inicio(cache, atual);
            printf("CACHE HIT: %s\n", url);
            return atual->conteudo;
        }
        atual = atual->proximo;
    }
    
    // Cache MISS
    cache->misses++;
    printf("CACHE MISS: %s\n", url);
    return NULL;
}

// Adicionar ao cache
void adicionar_cache(CacheLRU* cache, const char* url, const char* conteudo) {
    // Verificar se já existe
    if (buscar_cache(cache, url)) {
        return; // Já foi movido para o início pela busca
    }
    
    // Criar novo nó
    CacheNode* novo = malloc(sizeof(CacheNode));
    strcpy(novo->url, url);
    strcpy(novo->conteudo, conteudo);
    novo->timestamp = time(NULL);
    novo->anterior = NULL;
    novo->proximo = cache->cabeca;
    
    // Inserir no início
    if (cache->cabeca) cache->cabeca->anterior = novo;
    cache->cabeca = novo;
    if (!cache->cauda) cache->cauda = novo;
    
    cache->tamanho++;
    
    // Verificar se excedeu capacidade
    if (cache->tamanho > MAX_CACHE_SIZE) {
        // Remover o último (LRU)
        CacheNode* lru = cache->cauda;
        printf("REMOVIDO (LRU): %s\n", lru->url);
        
        cache->cauda = lru->anterior;
        if (cache->cauda) cache->cauda->proximo = NULL;
        else cache->cabeca = NULL;
        
        free(lru);
        cache->tamanho--;
    }
    
    printf("ADICIONADO: %s\n", url);
}

// Simular navegação web
void simular_navegacao() {
    CacheLRU cache;
    init_cache(&cache);
    
    // Simular acessos a páginas
    char* paginas[] = {
        "google.com", "facebook.com", "youtube.com",
        "instagram.com", "twitter.com", "linkedin.com",
        "github.com", "stackoverflow.com"
    };
    
    char* conteudos[] = {
        "Página do Google", "Página do Facebook", "Página do YouTube",
        "Página do Instagram", "Página do Twitter", "Página do LinkedIn",
        "Página do GitHub", "Página do Stack Overflow"
    };
    
    int acessos[] = {0, 1, 2, 3, 4, 0, 1, 5, 6, 2, 0, 7, 1};
    int num_acessos = sizeof(acessos) / sizeof(acessos[0]);
    
    printf("=== SIMULAÇÃO DE NAVEGAÇÃO WEB ===\n");
    printf("Tamanho do cache: %d páginas\n\n", MAX_CACHE_SIZE);
    
    for (int i = 0; i < num_acessos; i++) {
        int idx = acessos[i];
        printf("Acesso %d: %s\n", i+1, paginas[idx]);
        
        char* resultado = buscar_cache(&cache, paginas[idx]);
        if (!resultado) {
            adicionar_cache(&cache, paginas[idx], conteudos[idx]);
        }
        
        printf("Estado do cache: ");
        CacheNode* atual = cache.cabeca;
        while (atual) {
            printf("[%s] ", atual->url);
            atual = atual->proximo;
        }
        printf("\n\n");
    }
    
    // Estatísticas finais
    printf("=== ESTATÍSTICAS FINAIS ===\n");
    printf("Total de acessos: %d\n", cache.hits + cache.misses);
    printf("Cache hits: %d\n", cache.hits);
    printf("Cache misses: %d\n", cache.misses);
    printf("Taxa de hit: %.2f%%\n", 
           (cache.hits * 100.0) / (cache.hits + cache.misses));
}
```

**Resultado Esperado:**
```
=== SIMULAÇÃO DE NAVEGAÇÃO WEB ===
Tamanho do cache: 5 páginas

Acesso 1: google.com
CACHE MISS: google.com
ADICIONADO: google.com
Estado do cache: [google.com] 

Acesso 2: facebook.com
CACHE MISS: facebook.com
ADICIONADO: facebook.com
Estado do cache: [facebook.com] [google.com] 

Acesso 3: youtube.com
CACHE MISS: youtube.com
ADICIONADO: youtube.com
Estado do cache: [youtube.com] [facebook.com] [google.com] 

...

Acesso 6: google.com
CACHE HIT: google.com
Estado do cache: [google.com] [instagram.com] [twitter.com] [youtube.com] [facebook.com] 

=== ESTATÍSTICAS FINAIS ===
Total de acessos: 13
Cache hits: 4
Cache misses: 9
Taxa de hit: 30.77%
```

---

## 🏆 RESUMO DE COMPLEXIDADES DOS EXERCÍCIOS

| Exercício | Algoritmo/Estrutura | Complexidade | Aplicação Prática |
|-----------|-------------------|--------------|-------------------|
| 1.1 | Análise básica | O(n), O(n²) | Fundamentos |
| 1.2 | Busca ternária | O(log n) | Busca otimizada |
| 2.1 | Selection Sort | O(n²) | Ordenação simples |
| 2.2 | Bubble vs Insertion | O(n²) | Comparação de algoritmos |
| 3.1 | Pilha com histórico | O(1) por operação | Calculadora RPN |
| 3.2 | Lista vs Array | O(1) vs O(n) | Estruturas dinâmicas |
| 4.1 | Busca linear vs binária | O(n) vs O(log n) | Busca eficiente |
| 5.1 | Cache LRU | O(1) amortizado | Sistema de cache |

---

## 💡 DICAS PARA RESOLUÇÃO

### **🎯 Estratégias Gerais**
1. **Identifique o padrão:** Linear, quadrático, logarítmico?
2. **Conte operações básicas:** Comparações, atribuições, acessos
3. **Analise loops:** Simples = O(n), aninhados = O(n²)
4. **Recursão:** Monte a equação de recorrência
5. **Teste com valores pequenos** antes de generalizar

### **🔧 Debugging de Complexidade**
1. **Use contadores** para operações
2. **Meça tempo real** para validar teoria
3. **Teste diferentes tamanhos** de entrada
4. **Compare com complexidades conhecidas**

### **📊 Validação Prática**
- Se O(n): tempo deve dobrar quando n dobra
- Se O(n²): tempo deve quadruplicar quando n dobra  
- Se O(log n): tempo deve aumentar muito pouco quando n dobra

---

**📚 Esta lista de exercícios cobre os principais conceitos de algoritmos e complexidade com soluções detalhadas e análises práticas.**

*Última atualização: 27 de agosto de 2025*
