# Laboratório 03: Ponteiros, Alocação Dinâmica e Listas Ligadas

**Disciplina:** Algoritmos e Complexidade  
**Professor:** Vagner Cordeiro  
**Duração:** 4 horas  
**Pré-requisitos:** Laboratórios 01 e 02, conhecimento básico de ponteiros  

---

## Objetivos

Ao final deste laboratório, o estudante será capaz de:
- Trabalhar com ponteiros e aritmética de ponteiros
- Implementar alocação dinâmica de memória
- Criar e manipular listas ligadas simples e duplas
- Implementar operações fundamentais em listas ligadas
- Analisar complexidade de operações dinâmicas vs estáticas
- Gerenciar memória adequadamente (evitar vazamentos)

---

## Exercício 1: Ponteiros e Aritmética de Ponteiros

### Objetivo
Compreender o funcionamento dos ponteiros e sua aplicação prática.

### Código Base

Crie um arquivo `exercicio01_ponteiros.c`:

```c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <string.h>

// Função para demonstrar passagem por valor vs referência
void trocar_por_valor(int a, int b) {
    printf("  Dentro da função (por valor): a=%d, b=%d\n", a, b);
    int temp = a;
    a = b;
    b = temp;
    printf("  Após troca (por valor): a=%d, b=%d\n", a, b);
}

void trocar_por_referencia(int *a, int *b) {
    printf("  Dentro da função (por referência): *a=%d, *b=%d\n", *a, *b);
    int temp = *a;
    *a = *b;
    *b = temp;
    printf("  Após troca (por referência): *a=%d, *b=%d\n", *a, *b);
}

// Função para encontrar maior e menor elemento usando ponteiros
void encontrar_min_max(int *arr, int n, int **min, int **max) {
    if (n <= 0) return;
    
    *min = *max = &arr[0];
    
    for (int i = 1; i < n; i++) {
        if (arr[i] < **min) {
            *min = &arr[i];
        }
        if (arr[i] > **max) {
            *max = &arr[i];
        }
    }
}

// Função para inverter array usando ponteiros
void inverter_array_ponteiros(int *arr, int n) {
    int *inicio = arr;
    int *fim = arr + n - 1;
    
    while (inicio < fim) {
        // Troca elementos apontados
        int temp = *inicio;
        *inicio = *fim;
        *fim = temp;
        
        // Move ponteiros
        inicio++;
        fim--;
    }
}

// Função para calcular soma usando aritmética de ponteiros
long long somar_array_ponteiros(int *arr, int n, int *acessos) {
    long long soma = 0;
    *acessos = 0;
    
    int *ptr = arr;
    int *fim = arr + n;
    
    while (ptr < fim) {
        soma += *ptr;
        ptr++;
        (*acessos)++;
    }
    
    return soma;
}

// Função para buscar elemento usando ponteiros
int* buscar_elemento_ponteiro(int *arr, int n, int valor, int *comparacoes) {
    *comparacoes = 0;
    
    for (int *ptr = arr; ptr < arr + n; ptr++) {
        (*comparacoes)++;
        if (*ptr == valor) {
            return ptr;
        }
    }
    
    return NULL; // Não encontrado
}

// Função para demonstrar diferentes formas de acessar array
void demonstrar_acesso_array(int *arr, int n) {
    printf("Demonstração de diferentes formas de acesso:\n");
    
    printf("Usando índices: ");
    for (int i = 0; i < n && i < 10; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
    
    printf("Usando ponteiros: ");
    for (int *ptr = arr; ptr < arr + n && ptr < arr + 10; ptr++) {
        printf("%d ", *ptr);
    }
    printf("\n");
    
    printf("Usando aritmética: ");
    for (int i = 0; i < n && i < 10; i++) {
        printf("%d ", *(arr + i));
    }
    printf("\n");
}

int main() {
    printf("=== LABORATÓRIO 03: PONTEIROS E ARITMÉTICA ===\n\n");
    
    // 1. Demonstração básica de ponteiros
    printf("1. Demonstração básica de ponteiros:\n");
    int x = 10, y = 20;
    int *ptr_x = &x;
    
    printf("Valor de x: %d\n", x);
    printf("Endereço de x: %p\n", (void*)&x);
    printf("Valor de ptr_x: %p\n", (void*)ptr_x);
    printf("Valor apontado por ptr_x: %d\n", *ptr_x);
    
    // Modificando através do ponteiro
    *ptr_x = 15;
    printf("Após *ptr_x = 15, x = %d\n", x);
    
    // 2. Passagem por valor vs referência
    printf("\n2. Passagem por valor vs referência:\n");
    int a = 10, b = 20;
    
    printf("Antes: a=%d, b=%d\n", a, b);
    printf("Chamando trocar_por_valor:\n");
    trocar_por_valor(a, b);
    printf("Depois: a=%d, b=%d\n", a, b);
    
    printf("\nChamando trocar_por_referencia:\n");
    trocar_por_referencia(&a, &b);
    printf("Depois: a=%d, b=%d\n", a, b);
    
    // 3. Trabalho com arrays e ponteiros
    printf("\n3. Trabalho com arrays e ponteiros:\n");
    int arr[] = {5, 2, 8, 1, 9, 3, 7, 4, 6};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    printf("Array original: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
    
    demonstrar_acesso_array(arr, n);
    
    // 4. Encontrar min e max usando ponteiros
    printf("\n4. Encontrando min e max usando ponteiros:\n");
    int *min_ptr, *max_ptr;
    encontrar_min_max(arr, n, &min_ptr, &max_ptr);
    
    printf("Menor elemento: %d (endereço: %p)\n", *min_ptr, (void*)min_ptr);
    printf("Maior elemento: %d (endereço: %p)\n", *max_ptr, (void*)max_ptr);
    printf("Posição do menor: %ld\n", min_ptr - arr);
    printf("Posição do maior: %ld\n", max_ptr - arr);
    
    // 5. Busca usando ponteiros
    printf("\n5. Busca usando ponteiros:\n");
    int valor_busca = 7;
    int comparacoes;
    int *encontrado = buscar_elemento_ponteiro(arr, n, valor_busca, &comparacoes);
    
    if (encontrado) {
        printf("Valor %d encontrado na posição %ld (%d comparações)\n", 
               valor_busca, encontrado - arr, comparacoes);
    } else {
        printf("Valor %d não encontrado (%d comparações)\n", valor_busca, comparacoes);
    }
    
    // 6. Inversão usando ponteiros
    printf("\n6. Inversão do array usando ponteiros:\n");
    printf("Antes da inversão: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
    
    inverter_array_ponteiros(arr, n);
    
    printf("Após inversão: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
    
    // 7. Análise de performance
    printf("\n=== ANÁLISE DE PERFORMANCE ===\n");
    printf("Tamanho | Soma (índices) | Soma (ponteiros) | Speedup\n");
    printf("--------|----------------|------------------|--------\n");
    
    int tamanhos[] = {1000, 10000, 100000, 1000000};
    for (int t = 0; t < 4; t++) {
        int tam = tamanhos[t];
        int *arr_grande = (int*)malloc(tam * sizeof(int));
        
        // Preenche array
        for (int i = 0; i < tam; i++) {
            arr_grande[i] = i + 1;
        }
        
        // Teste com índices
        clock_t inicio = clock();
        long long soma1 = 0;
        for (int i = 0; i < tam; i++) {
            soma1 += arr_grande[i];
        }
        clock_t fim = clock();
        double tempo_indices = ((double)(fim - inicio)) / CLOCKS_PER_SEC;
        
        // Teste com ponteiros
        inicio = clock();
        int acessos;
        long long soma2 = somar_array_ponteiros(arr_grande, tam, &acessos);
        fim = clock();
        double tempo_ponteiros = ((double)(fim - inicio)) / CLOCKS_PER_SEC;
        
        double speedup = tempo_indices / tempo_ponteiros;
        
        printf("%-7d | %-14.6f | %-16.6f | %-7.2f\n",
               tam, tempo_indices, tempo_ponteiros, speedup);
        
        free(arr_grande);
    }
    
    return 0;
}
```

### Análise dos Resultados

Complete a tabela:

| Operação | Complexidade | Vantagens dos Ponteiros | Observações |
|----------|--------------|-------------------------|-------------|
| Acesso direto | | | |
| Busca linear | | | |
| Inversão array | | | |
| Soma elementos | | | |

---

## Exercício 2: Alocação Dinâmica de Memória

### Objetivo
Implementar gerenciamento dinâmico de memória e comparar com alocação estática.

### Código Base

Crie um arquivo `exercicio02_alocacao_dinamica.c`:

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

// Estrutura para monitorar uso de memória
typedef struct {
    int total_allocations;
    int total_frees;
    size_t bytes_allocated;
    size_t bytes_freed;
    int memory_leaks;
} MemoryStats;

// Variável global para estatísticas
MemoryStats mem_stats = {0, 0, 0, 0, 0};

// Wrapper para malloc com monitoramento
void* monitored_malloc(size_t size, const char* desc) {
    void *ptr = malloc(size);
    if (ptr) {
        mem_stats.total_allocations++;
        mem_stats.bytes_allocated += size;
        printf("  MALLOC: %s - %zu bytes (endereço: %p)\n", desc, size, ptr);
    } else {
        printf("  ERRO: Falha ao alocar %zu bytes para %s\n", size, desc);
    }
    return ptr;
}

// Wrapper para free com monitoramento
void monitored_free(void *ptr, size_t size, const char* desc) {
    if (ptr) {
        free(ptr);
        mem_stats.total_frees++;
        mem_stats.bytes_freed += size;
        printf("  FREE: %s - %zu bytes (endereço: %p)\n", desc, size, ptr);
    }
}

// Função para imprimir estatísticas de memória
void print_memory_stats() {
    printf("\n=== ESTATÍSTICAS DE MEMÓRIA ===\n");
    printf("Total de alocações: %d\n", mem_stats.total_allocations);
    printf("Total de liberações: %d\n", mem_stats.total_frees);
    printf("Bytes alocados: %zu\n", mem_stats.bytes_allocated);
    printf("Bytes liberados: %zu\n", mem_stats.bytes_freed);
    printf("Vazamentos de memória: %d\n", 
           mem_stats.total_allocations - mem_stats.total_frees);
    printf("Memória não liberada: %zu bytes\n", 
           mem_stats.bytes_allocated - mem_stats.bytes_freed);
}

// Função para criar array dinâmico
int* criar_array_dinamico(int tamanho, const char* desc) {
    size_t size = tamanho * sizeof(int);
    int *arr = (int*)monitored_malloc(size, desc);
    
    if (arr) {
        // Inicializa com valores sequenciais
        for (int i = 0; i < tamanho; i++) {
            arr[i] = i + 1;
        }
    }
    
    return arr;
}

// Função para redimensionar array dinamicamente
int* redimensionar_array(int *arr_original, int tamanho_original, 
                        int novo_tamanho, const char* desc) {
    
    printf("Redimensionando array de %d para %d elementos:\n", 
           tamanho_original, novo_tamanho);
    
    size_t new_size = novo_tamanho * sizeof(int);
    int *novo_arr = (int*)monitored_malloc(new_size, desc);
    
    if (novo_arr) {
        // Copia elementos existentes
        int elementos_copiar = tamanho_original < novo_tamanho ? 
                              tamanho_original : novo_tamanho;
        
        for (int i = 0; i < elementos_copiar; i++) {
            novo_arr[i] = arr_original[i];
        }
        
        // Inicializa novos elementos (se houver)
        for (int i = elementos_copiar; i < novo_tamanho; i++) {
            novo_arr[i] = i + 1;
        }
        
        // Libera array original
        monitored_free(arr_original, tamanho_original * sizeof(int), 
                      "Array original");
    }
    
    return novo_arr;
}

// Função para criar matriz dinâmica
int** criar_matriz_dinamica(int linhas, int colunas, const char* desc) {
    printf("Criando matriz dinâmica %dx%d:\n", linhas, colunas);
    
    // Aloca array de ponteiros para linhas
    size_t ptr_size = linhas * sizeof(int*);
    int **matriz = (int**)monitored_malloc(ptr_size, "Ponteiros das linhas");
    
    if (matriz) {
        // Aloca cada linha
        for (int i = 0; i < linhas; i++) {
            char linha_desc[100];
            sprintf(linha_desc, "Linha %d da matriz", i);
            
            size_t linha_size = colunas * sizeof(int);
            matriz[i] = (int*)monitored_malloc(linha_size, linha_desc);
            
            if (matriz[i]) {
                // Inicializa linha
                for (int j = 0; j < colunas; j++) {
                    matriz[i][j] = i * colunas + j + 1;
                }
            }
        }
    }
    
    return matriz;
}

// Função para liberar matriz dinâmica
void liberar_matriz_dinamica(int **matriz, int linhas, int colunas) {
    if (matriz) {
        printf("Liberando matriz dinâmica %dx%d:\n", linhas, colunas);
        
        // Libera cada linha
        for (int i = 0; i < linhas; i++) {
            if (matriz[i]) {
                monitored_free(matriz[i], colunas * sizeof(int), "Linha da matriz");
            }
        }
        
        // Libera array de ponteiros
        monitored_free(matriz, linhas * sizeof(int*), "Ponteiros das linhas");
    }
}

// Função para testar realocação com realloc
int* testar_realloc(int tamanho_inicial, int tamanho_final) {
    printf("Testando realloc de %d para %d elementos:\n", 
           tamanho_inicial, tamanho_final);
    
    // Alocação inicial
    size_t initial_size = tamanho_inicial * sizeof(int);
    int *arr = (int*)monitored_malloc(initial_size, "Array inicial para realloc");
    
    // Inicializa
    for (int i = 0; i < tamanho_inicial; i++) {
        arr[i] = i + 1;
    }
    
    // Realocação
    size_t new_size = tamanho_final * sizeof(int);
    printf("  Chamando realloc para %zu bytes\n", new_size);
    
    int *novo_arr = (int*)realloc(arr, new_size);
    if (novo_arr) {
        printf("  Realloc bem-sucedido (endereço: %p)\n", (void*)novo_arr);
        
        // Inicializa novos elementos se aumentou
        for (int i = tamanho_inicial; i < tamanho_final; i++) {
            novo_arr[i] = i + 1;
        }
        
        // Atualiza estatísticas manualmente (realloc não é monitorado)
        mem_stats.bytes_allocated += new_size;
        mem_stats.bytes_freed += initial_size;
        
    } else {
        printf("  ERRO: Realloc falhou\n");
    }
    
    return novo_arr;
}

// Função para demonstrar vazamento de memória
void demonstrar_memory_leak() {
    printf("Demonstrando vazamento de memória:\n");
    
    // Aloca mas não libera
    int *leak1 = (int*)monitored_malloc(100 * sizeof(int), "Vazamento 1");
    int *leak2 = (int*)monitored_malloc(50 * sizeof(int), "Vazamento 2");
    
    // Usa os arrays
    if (leak1) leak1[0] = 42;
    if (leak2) leak2[0] = 24;
    
    printf("Arrays alocados mas não serão liberados (vazamento intencional)\n");
    // NÃO chamamos free - isso é o vazamento!
}

int main() {
    printf("=== LABORATÓRIO 03: ALOCAÇÃO DINÂMICA DE MEMÓRIA ===\n\n");
    
    // 1. Alocação básica de array
    printf("1. Alocação básica de array dinâmico:\n");
    int *arr1 = criar_array_dinamico(10, "Array básico");
    
    if (arr1) {
        printf("Array criado: ");
        for (int i = 0; i < 10; i++) {
            printf("%d ", arr1[i]);
        }
        printf("\n");
    }
    
    // 2. Redimensionamento de array
    printf("\n2. Redimensionamento de array:\n");
    int *arr2 = redimensionar_array(arr1, 10, 15, "Array redimensionado");
    
    if (arr2) {
        printf("Array redimensionado: ");
        for (int i = 0; i < 15; i++) {
            printf("%d ", arr2[i]);
        }
        printf("\n");
    }
    
    // 3. Teste com realloc
    printf("\n3. Teste com realloc:\n");
    int *arr3 = testar_realloc(5, 12);
    
    if (arr3) {
        printf("Array após realloc: ");
        for (int i = 0; i < 12; i++) {
            printf("%d ", arr3[i]);
        }
        printf("\n");
    }
    
    // 4. Matriz dinâmica
    printf("\n4. Matriz dinâmica:\n");
    int **matriz = criar_matriz_dinamica(3, 4, "Matriz 3x4");
    
    if (matriz) {
        printf("Matriz criada:\n");
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 4; j++) {
                printf("%3d ", matriz[i][j]);
            }
            printf("\n");
        }
    }
    
    // 5. Análise de performance: estático vs dinâmico
    printf("\n=== ANÁLISE DE PERFORMANCE: ESTÁTICO VS DINÂMICO ===\n");
    printf("Tamanho | Alocação Estática | Alocação Dinâmica | Overhead\n");
    printf("--------|-------------------|-------------------|----------\n");
    
    int tamanhos[] = {1000, 10000, 100000, 500000};
    for (int t = 0; t < 4; t++) {
        int tam = tamanhos[t];
        
        // Teste alocação estática (simulada com array local pequeno)
        clock_t inicio = clock();
        if (tam <= 100000) { // Limita para evitar stack overflow
            long long soma_estatica = 0;
            for (int i = 0; i < 1000; i++) { // Simula múltiplas operações
                suma_estatica += i;
            }
        }
        clock_t fim = clock();
        double tempo_estatico = ((double)(fim - inicio)) / CLOCKS_PER_SEC;
        
        // Teste alocação dinâmica
        inicio = clock();
        int *arr_dinamico = (int*)malloc(tam * sizeof(int));
        if (arr_dinamico) {
            for (int i = 0; i < tam; i++) {
                arr_dinamico[i] = i;
            }
            free(arr_dinamico);
        }
        fim = clock();
        double tempo_dinamico = ((double)(fim - inicio)) / CLOCKS_PER_SEC;
        
        double overhead = (tempo_dinamico - tempo_estatico) / tempo_estatico * 100;
        
        printf("%-7d | %-17.6f | %-17.6f | %7.2f%%\n",
               tam, tempo_estatico, tempo_dinamico, overhead);
    }
    
    // 6. Limpeza adequada
    printf("\n6. Limpeza de memória:\n");
    if (arr2) {
        monitored_free(arr2, 15 * sizeof(int), "Array redimensionado");
    }
    if (arr3) {
        monitored_free(arr3, 12 * sizeof(int), "Array realloc");
    }
    liberar_matriz_dinamica(matriz, 3, 4);
    
    // 7. Demonstração de vazamento (intencional)
    printf("\n7. Demonstração de vazamento de memória:\n");
    demonstrar_memory_leak();
    
    // Estatísticas finais
    print_memory_stats();
    
    return 0;
}
```

### Análise dos Resultados

Complete a tabela:

| Tamanho | Tempo Estático (s) | Tempo Dinâmico (s) | Overhead (%) | Observações |
|---------|-------------------|-------------------|--------------|-------------|
| 1.000 | | | | |
| 10.000 | | | | |
| 100.000 | | | | |
| 500.000 | | | | |

---

## Exercício 3: Listas Ligadas Simples

### Objetivo
Implementar uma lista ligada simples com operações fundamentais.

### Código Base

Crie um arquivo `exercicio03_lista_ligada.c`:

```c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

// Estrutura do nó da lista ligada
typedef struct No {
    int dados;
    struct No *proximo;
} No;

// Estrutura da lista ligada
typedef struct {
    No *cabeca;
    No *cauda;
    int tamanho;
} ListaLigada;

// Estrutura para estatísticas de operações
typedef struct {
    int comparacoes;
    int acessos;
    double tempo_execucao;
} EstatisticasLista;

// Função para criar uma nova lista
ListaLigada* criar_lista() {
    ListaLigada *lista = (ListaLigada*)malloc(sizeof(ListaLigada));
    if (lista) {
        lista->cabeca = NULL;
        lista->cauda = NULL;
        lista->tamanho = 0;
    }
    return lista;
}

// Função para criar um novo nó
No* criar_no(int valor) {
    No *novo = (No*)malloc(sizeof(No));
    if (novo) {
        novo->dados = valor;
        novo->proximo = NULL;
    }
    return novo;
}

// Inserção no início - O(1)
void inserir_inicio(ListaLigada *lista, int valor, EstatisticasLista *stats) {
    clock_t inicio = clock();
    stats->comparacoes = 0;
    stats->acessos = 0;
    
    No *novo = criar_no(valor);
    if (!novo) return;
    
    stats->acessos++;
    
    if (lista->cabeca == NULL) {
        lista->cabeca = lista->cauda = novo;
        stats->comparacoes++;
    } else {
        novo->proximo = lista->cabeca;
        lista->cabeca = novo;
        stats->acessos += 2;
    }
    
    lista->tamanho++;
    
    clock_t fim = clock();
    stats->tempo_execucao = ((double)(fim - inicio)) / CLOCKS_PER_SEC;
}

// Inserção no final - O(1) com ponteiro para cauda
void inserir_final(ListaLigada *lista, int valor, EstatisticasLista *stats) {
    clock_t inicio = clock();
    stats->comparacoes = 0;
    stats->acessos = 0;
    
    No *novo = criar_no(valor);
    if (!novo) return;
    
    stats->acessos++;
    
    if (lista->cauda == NULL) {
        lista->cabeca = lista->cauda = novo;
        stats->comparacoes++;
    } else {
        lista->cauda->proximo = novo;
        lista->cauda = novo;
        stats->acessos += 2;
    }
    
    lista->tamanho++;
    
    clock_t fim = clock();
    stats->tempo_execucao = ((double)(fim - inicio)) / CLOCKS_PER_SEC;
}

// Inserção em posição específica - O(n)
void inserir_posicao(ListaLigada *lista, int posicao, int valor, EstatisticasLista *stats) {
    clock_t inicio = clock();
    stats->comparacoes = 0;
    stats->acessos = 0;
    
    if (posicao < 0 || posicao > lista->tamanho) {
        clock_t fim = clock();
        stats->tempo_execucao = ((double)(fim - inicio)) / CLOCKS_PER_SEC;
        printf("Posição inválida!\n");
        return;
    }
    
    if (posicao == 0) {
        inserir_inicio(lista, valor, stats);
        return;
    }
    
    if (posicao == lista->tamanho) {
        inserir_final(lista, valor, stats);
        return;
    }
    
    No *novo = criar_no(valor);
    if (!novo) return;
    
    No *atual = lista->cabeca;
    for (int i = 0; i < posicao - 1; i++) {
        atual = atual->proximo;
        stats->acessos++;
    }
    
    novo->proximo = atual->proximo;
    atual->proximo = novo;
    lista->tamanho++;
    stats->acessos += 2;
    
    clock_t fim = clock();
    stats->tempo_execucao = ((double)(fim - inicio)) / CLOCKS_PER_SEC;
}

// Busca por valor - O(n)
No* buscar_valor(ListaLigada *lista, int valor, EstatisticasLista *stats) {
    clock_t inicio = clock();
    stats->comparacoes = 0;
    stats->acessos = 0;
    
    No *atual = lista->cabeca;
    
    while (atual != NULL) {
        stats->acessos++;
        stats->comparacoes++;
        
        if (atual->dados == valor) {
            clock_t fim = clock();
            stats->tempo_execucao = ((double)(fim - inicio)) / CLOCKS_PER_SEC;
            return atual;
        }
        
        atual = atual->proximo;
    }
    
    clock_t fim = clock();
    stats->tempo_execucao = ((double)(fim - inicio)) / CLOCKS_PER_SEC;
    return NULL;
}

// Busca por posição - O(n)
No* buscar_posicao(ListaLigada *lista, int posicao, EstatisticasLista *stats) {
    clock_t inicio = clock();
    stats->comparacoes = 0;
    stats->acessos = 0;
    
    if (posicao < 0 || posicao >= lista->tamanho) {
        clock_t fim = clock();
        stats->tempo_execucao = ((double)(fim - inicio)) / CLOCKS_PER_SEC;
        return NULL;
    }
    
    No *atual = lista->cabeca;
    for (int i = 0; i < posicao; i++) {
        atual = atual->proximo;
        stats->acessos++;
    }
    
    clock_t fim = clock();
    stats->tempo_execucao = ((double)(fim - inicio)) / CLOCKS_PER_SEC;
    return atual;
}

// Remoção por valor - O(n)
int remover_valor(ListaLigada *lista, int valor, EstatisticasLista *stats) {
    clock_t inicio = clock();
    stats->comparacoes = 0;
    stats->acessos = 0;
    
    if (lista->cabeca == NULL) {
        clock_t fim = clock();
        stats->tempo_execucao = ((double)(fim - inicio)) / CLOCKS_PER_SEC;
        return 0;
    }
    
    // Caso especial: remover primeiro elemento
    if (lista->cabeca->dados == valor) {
        stats->comparacoes++;
        No *temp = lista->cabeca;
        lista->cabeca = lista->cabeca->proximo;
        
        if (lista->cabeca == NULL) {
            lista->cauda = NULL;
        }
        
        free(temp);
        lista->tamanho--;
        stats->acessos++;
        
        clock_t fim = clock();
        stats->tempo_execucao = ((double)(fim - inicio)) / CLOCKS_PER_SEC;
        return 1;
    }
    
    // Procura o elemento
    No *anterior = lista->cabeca;
    while (anterior->proximo != NULL) {
        stats->acessos++;
        stats->comparacoes++;
        
        if (anterior->proximo->dados == valor) {
            No *temp = anterior->proximo;
            anterior->proximo = temp->proximo;
            
            if (temp == lista->cauda) {
                lista->cauda = anterior;
            }
            
            free(temp);
            lista->tamanho--;
            stats->acessos++;
            
            clock_t fim = clock();
            stats->tempo_execucao = ((double)(fim - inicio)) / CLOCKS_PER_SEC;
            return 1;
        }
        
        anterior = anterior->proximo;
    }
    
    clock_t fim = clock();
    stats->tempo_execucao = ((double)(fim - inicio)) / CLOCKS_PER_SEC;
    return 0; // Não encontrado
}

// Função para imprimir lista
void imprimir_lista(ListaLigada *lista, const char *nome) {
    printf("%s (tamanho %d): ", nome, lista->tamanho);
    
    No *atual = lista->cabeca;
    int count = 0;
    
    while (atual != NULL && count < 20) { // Limita a 20 elementos
        printf("%d ", atual->dados);
        atual = atual->proximo;
        count++;
    }
    
    if (atual != NULL) {
        printf("...");
    }
    printf("\n");
}

// Função para liberar lista
void liberar_lista(ListaLigada *lista) {
    if (!lista) return;
    
    No *atual = lista->cabeca;
    while (atual != NULL) {
        No *temp = atual;
        atual = atual->proximo;
        free(temp);
    }
    
    free(lista);
}

// Função para comparar com array dinâmico
void comparar_com_array(int tamanho) {
    printf("\n=== COMPARAÇÃO: LISTA LIGADA vs ARRAY DINÂMICO ===\n");
    printf("Tamanho dos testes: %d elementos\n\n", tamanho);
    
    // Preparação
    ListaLigada *lista = criar_lista();
    int *array = (int*)malloc(tamanho * sizeof(int));
    int array_size = 0;
    
    EstatisticasLista stats;
    
    // Teste 1: Inserção no início
    printf("1. Inserção no início:\n");
    
    clock_t inicio = clock();
    for (int i = 0; i < tamanho/10; i++) {
        inserir_inicio(lista, i, &stats);
    }
    clock_t fim = clock();
    double tempo_lista_inicio = ((double)(fim - inicio)) / CLOCKS_PER_SEC;
    
    inicio = clock();
    for (int i = 0; i < tamanho/10; i++) {
        // Simula inserção no início do array (move todos elementos)
        for (int j = array_size; j > 0; j--) {
            array[j] = array[j-1];
        }
        array[0] = i;
        array_size++;
    }
    fim = clock();
    double tempo_array_inicio = ((double)(fim - inicio)) / CLOCKS_PER_SEC;
    
    printf("   Lista ligada: %.6f segundos\n", tempo_lista_inicio);
    printf("   Array dinâmico: %.6f segundos\n", tempo_array_inicio);
    printf("   Speedup: %.2fx\n", tempo_array_inicio / tempo_lista_inicio);
    
    // Teste 2: Busca
    printf("\n2. Busca de elementos:\n");
    
    inicio = clock();
    for (int i = 0; i < 100; i++) {
        buscar_valor(lista, i, &stats);
    }
    fim = clock();
    double tempo_lista_busca = ((double)(fim - inicio)) / CLOCKS_PER_SEC;
    
    inicio = clock();
    for (int i = 0; i < 100; i++) {
        for (int j = 0; j < array_size; j++) {
            if (array[j] == i) break;
        }
    }
    fim = clock();
    double tempo_array_busca = ((double)(fim - inicio)) / CLOCKS_PER_SEC;
    
    printf("   Lista ligada: %.6f segundos\n", tempo_lista_busca);
    printf("   Array dinâmico: %.6f segundos\n", tempo_array_busca);
    printf("   Speedup: %.2fx\n", tempo_array_busca / tempo_lista_busca);
    
    // Limpeza
    liberar_lista(lista);
    free(array);
}

int main() {
    printf("=== LABORATÓRIO 03: LISTAS LIGADAS SIMPLES ===\n\n");
    
    ListaLigada *lista = criar_lista();
    EstatisticasLista stats;
    
    // 1. Teste de inserções
    printf("1. Testes de inserção:\n");
    
    printf("Inserindo no início: 10, 20, 30\n");
    inserir_inicio(lista, 10, &stats);
    inserir_inicio(lista, 20, &stats);
    inserir_inicio(lista, 30, &stats);
    imprimir_lista(lista, "Lista");
    
    printf("Inserindo no final: 40, 50\n");
    inserir_final(lista, 40, &stats);
    inserir_final(lista, 50, &stats);
    imprimir_lista(lista, "Lista");
    
    printf("Inserindo 25 na posição 2:\n");
    inserir_posicao(lista, 2, 25, &stats);
    imprimir_lista(lista, "Lista");
    printf("   Acessos: %d, Tempo: %.6f s\n", stats.acessos, stats.tempo_execucao);
    
    // 2. Teste de buscas
    printf("\n2. Testes de busca:\n");
    
    No *encontrado = buscar_valor(lista, 25, &stats);
    if (encontrado) {
        printf("Valor 25 encontrado! Comparações: %d, Tempo: %.6f s\n", 
               stats.comparacoes, stats.tempo_execucao);
    }
    
    encontrado = buscar_posicao(lista, 3, &stats);
    if (encontrado) {
        printf("Posição 3 contém valor: %d, Acessos: %d, Tempo: %.6f s\n", 
               encontrado->dados, stats.acessos, stats.tempo_execucao);
    }
    
    // 3. Teste de remoção
    printf("\n3. Teste de remoção:\n");
    imprimir_lista(lista, "Lista antes");
    
    int removido = remover_valor(lista, 25, &stats);
    if (removido) {
        printf("Valor 25 removido! Comparações: %d, Tempo: %.6f s\n", 
               stats.comparacoes, stats.tempo_execucao);
        imprimir_lista(lista, "Lista após remoção");
    }
    
    // 4. Análise de complexidade
    printf("\n=== ANÁLISE DE COMPLEXIDADE ===\n");
    printf("Tamanho | Inserção Início | Inserção Final | Busca Linear | Inserção Meio\n");
    printf("--------|----------------|----------------|--------------|---------------\n");
    
    int tamanhos[] = {100, 500, 1000, 2000};
    for (int t = 0; t < 4; t++) {
        int tam = tamanhos[t];
        
        ListaLigada *lista_teste = criar_lista();
        
        // Preenche lista
        for (int i = 0; i < tam; i++) {
            inserir_final(lista_teste, i, &stats);
        }
        
        // Teste inserção início
        inserir_inicio(lista_teste, -1, &stats);
        double tempo_ins_inicio = stats.tempo_execucao;
        
        // Teste inserção final
        inserir_final(lista_teste, tam + 1, &stats);
        double tempo_ins_final = stats.tempo_execucao;
        
        // Teste busca (pior caso - último elemento)
        buscar_valor(lista_teste, tam - 1, &stats);
        double tempo_busca = stats.tempo_execucao;
        
        // Teste inserção no meio
        inserir_posicao(lista_teste, tam / 2, -999, &stats);
        double tempo_ins_meio = stats.tempo_execucao;
        
        printf("%-7d | %-15.6f | %-14.6f | %-12.6f | %-13.6f\n",
               tam, tempo_ins_inicio, tempo_ins_final, tempo_busca, tempo_ins_meio);
        
        liberar_lista(lista_teste);
    }
    
    // 5. Comparação com estruturas estáticas
    comparar_com_array(1000);
    
    liberar_lista(lista);
    return 0;
}
```

### Análise dos Resultados

Complete a tabela:

| Operação | Complexidade Teórica | Complexidade Observada | Vantagens | Desvantagens |
|----------|---------------------|------------------------|-----------|--------------|
| Inserção Início | | | | |
| Inserção Final | | | | |
| Inserção Meio | | | | |
| Busca | | | | |
| Remoção | | | | |

---

## Relatório Final

### Instruções para o Relatório

Crie um documento contendo:

1. **Execução dos Exercícios** (2,0 pontos)
   - Screenshots dos resultados
   - Tabelas preenchidas com dados coletados
   - Análise dos tempos de execução

2. **Análise Comparativa** (1,5 pontos)
   - Compare ponteiros vs índices para acesso a arrays
   - Analise overhead da alocação dinâmica vs estática
   - Compare listas ligadas vs arrays dinâmicos

3. **Gerenciamento de Memória** (1,0 pontos)
   - Identifique possíveis vazamentos de memória
   - Explique estratégias para evitar vazamentos
   - Analise o custo das operações de alocação/liberação

4. **Código e Modificações** (0,5 pontos)
   - Códigos comentados
   - Melhorias implementadas (se houver)

### Entrega

- **Formato:** PDF com códigos .c anexados
- **Prazo:** Uma semana após a aula
- **Valor:** 5,0 pontos

---

## Próximo Laboratório

**Laboratório 04:** Algoritmos de Ordenação e Análise de Performance

---

**Bom trabalho!**
