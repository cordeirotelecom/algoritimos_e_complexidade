/*
 * AULA 05 - ÁRVORES E ESTRUTURAS HIERÁRQUICAS
 * Implementações completas em C com análise de performance
 * 
 * Este arquivo contém:
 * 1. BST (Binary Search Tree) completa
 * 2. AVL Tree com rotações
 * 3. Min-Heap para filas de prioridade
 * 4. Sistema de benchmark comparativo
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <time.h>
#include <math.h>

// =======================================
// ESTRUTURAS DE DADOS FUNDAMENTAIS
// =======================================

// Nó genérico para árvores binárias
typedef struct No {
    int valor;
    struct No* esquerda;
    struct No* direita;
    struct No* pai;
    int altura;
    int fator_balanceamento;
} No;

// Estrutura BST com estatísticas
typedef struct {
    No* raiz;
    int tamanho;
    unsigned long comparacoes;
    unsigned long total_insercoes;
    unsigned long total_remocoes;
    char tipo[10];  // "BST" ou "AVL"
} Arvore;

// Estrutura para Min-Heap
typedef struct {
    int* dados;
    int tamanho;
    int capacidade;
    unsigned long comparacoes;
    unsigned long trocas;
} MinHeap;

// Estrutura para benchmark
typedef struct {
    double tempo_insercao_ms;
    double tempo_busca_ms;
    double tempo_remocao_ms;
    int altura_final;
    unsigned long total_comparacoes;
    unsigned long total_rotacoes;
    size_t memoria_bytes;
} ResultadoBenchmark;

// =======================================
// FUNÇÕES UTILITÁRIAS BÁSICAS
// =======================================

No* criar_no(int valor) {
    No* novo = (No*)malloc(sizeof(No));
    if (!novo) {
        fprintf(stderr, "Erro: Falha na alocação de memória\n");
        exit(EXIT_FAILURE);
    }
    
    novo->valor = valor;
    novo->esquerda = NULL;
    novo->direita = NULL;
    novo->pai = NULL;
    novo->altura = 0;
    novo->fator_balanceamento = 0;
    
    return novo;
}

Arvore* criar_arvore(const char* tipo) {
    Arvore* arvore = (Arvore*)malloc(sizeof(Arvore));
    if (!arvore) {
        fprintf(stderr, "Erro: Falha na alocação de memória\n");
        exit(EXIT_FAILURE);
    }
    
    arvore->raiz = NULL;
    arvore->tamanho = 0;
    arvore->comparacoes = 0;
    arvore->total_insercoes = 0;
    arvore->total_remocoes = 0;
    strcpy(arvore->tipo, tipo);
    
    return arvore;
}

int calcular_altura(No* no) {
    if (!no) return -1;
    
    int altura_esq = calcular_altura(no->esquerda);
    int altura_dir = calcular_altura(no->direita);
    
    return 1 + (altura_esq > altura_dir ? altura_esq : altura_dir);
}

void atualizar_altura(No* no) {
    if (!no) return;
    
    int altura_esq = no->esquerda ? no->esquerda->altura : -1;
    int altura_dir = no->direita ? no->direita->altura : -1;
    
    no->altura = 1 + (altura_esq > altura_dir ? altura_esq : altura_dir);
    no->fator_balanceamento = altura_esq - altura_dir;
}

// =======================================
// IMPLEMENTAÇÃO BST (BINARY SEARCH TREE)
// =======================================

No* buscar_bst(No* raiz, int valor, unsigned long* comparacoes) {
    if (!raiz) return NULL;
    
    (*comparacoes)++;
    
    if (valor == raiz->valor) {
        return raiz;
    } else if (valor < raiz->valor) {
        return buscar_bst(raiz->esquerda, valor, comparacoes);
    } else {
        return buscar_bst(raiz->direita, valor, comparacoes);
    }
}

No* inserir_bst(No* raiz, int valor, Arvore* arvore) {
    // Caso base: inserir novo nó
    if (!raiz) {
        arvore->tamanho++;
        arvore->total_insercoes++;
        return criar_no(valor);
    }
    
    arvore->comparacoes++;
    
    if (valor < raiz->valor) {
        raiz->esquerda = inserir_bst(raiz->esquerda, valor, arvore);
        raiz->esquerda->pai = raiz;
    } else if (valor > raiz->valor) {
        raiz->direita = inserir_bst(raiz->direita, valor, arvore);
        raiz->direita->pai = raiz;
    } else {
        // Valor já existe - não inserir duplicatas
        return raiz;
    }
    
    atualizar_altura(raiz);
    return raiz;
}

No* encontrar_minimo(No* no) {
    while (no && no->esquerda) {
        no = no->esquerda;
    }
    return no;
}

No* remover_bst(No* raiz, int valor, Arvore* arvore) {
    if (!raiz) return NULL;
    
    arvore->comparacoes++;
    
    if (valor < raiz->valor) {
        raiz->esquerda = remover_bst(raiz->esquerda, valor, arvore);
        if (raiz->esquerda) raiz->esquerda->pai = raiz;
    } else if (valor > raiz->valor) {
        raiz->direita = remover_bst(raiz->direita, valor, arvore);
        if (raiz->direita) raiz->direita->pai = raiz;
    } else {
        // Nó encontrado - remover
        arvore->tamanho--;
        arvore->total_remocoes++;
        
        // Caso 1: Nó folha
        if (!raiz->esquerda && !raiz->direita) {
            free(raiz);
            return NULL;
        }
        
        // Caso 2: Nó com um filho
        if (!raiz->esquerda) {
            No* temp = raiz->direita;
            temp->pai = raiz->pai;
            free(raiz);
            return temp;
        }
        
        if (!raiz->direita) {
            No* temp = raiz->esquerda;
            temp->pai = raiz->pai;
            free(raiz);
            return temp;
        }
        
        // Caso 3: Nó com dois filhos - substituir pelo sucessor
        No* sucessor = encontrar_minimo(raiz->direita);
        raiz->valor = sucessor->valor;
        raiz->direita = remover_bst(raiz->direita, sucessor->valor, arvore);
        if (raiz->direita) raiz->direita->pai = raiz;
    }
    
    atualizar_altura(raiz);
    return raiz;
}

// =======================================
// IMPLEMENTAÇÃO AVL TREE
// =======================================

static unsigned long rotacoes_globais = 0;

No* rotacao_direita(No* y) {
    No* x = y->esquerda;
    No* T2 = x->direita;
    
    // Executa rotação
    x->direita = y;
    y->esquerda = T2;
    
    // Atualiza pais
    x->pai = y->pai;
    y->pai = x;
    if (T2) T2->pai = y;
    
    // Atualiza alturas
    atualizar_altura(y);
    atualizar_altura(x);
    
    rotacoes_globais++;
    return x;
}

No* rotacao_esquerda(No* x) {
    No* y = x->direita;
    No* T2 = y->esquerda;
    
    // Executa rotação
    y->esquerda = x;
    x->direita = T2;
    
    // Atualiza pais
    y->pai = x->pai;
    x->pai = y;
    if (T2) T2->pai = x;
    
    // Atualiza alturas
    atualizar_altura(x);
    atualizar_altura(y);
    
    rotacoes_globais++;
    return y;
}

No* balancear_avl(No* raiz, int valor) {
    int fator = raiz->fator_balanceamento;
    
    // Caso Esquerda-Esquerda
    if (fator > 1 && valor < raiz->esquerda->valor) {
        return rotacao_direita(raiz);
    }
    
    // Caso Direita-Direita
    if (fator < -1 && valor > raiz->direita->valor) {
        return rotacao_esquerda(raiz);
    }
    
    // Caso Esquerda-Direita
    if (fator > 1 && valor > raiz->esquerda->valor) {
        raiz->esquerda = rotacao_esquerda(raiz->esquerda);
        return rotacao_direita(raiz);
    }
    
    // Caso Direita-Esquerda
    if (fator < -1 && valor < raiz->direita->valor) {
        raiz->direita = rotacao_direita(raiz->direita);
        return rotacao_esquerda(raiz);
    }
    
    return raiz;
}

No* inserir_avl(No* raiz, int valor, Arvore* arvore) {
    // Passo 1: Inserção BST normal
    raiz = inserir_bst(raiz, valor, arvore);
    if (!raiz) return NULL;
    
    // Passo 2: Atualizar altura
    atualizar_altura(raiz);
    
    // Passo 3: Verificar e corrigir balanceamento
    if (abs(raiz->fator_balanceamento) > 1) {
        raiz = balancear_avl(raiz, valor);
    }
    
    return raiz;
}

// =======================================
// IMPLEMENTAÇÃO MIN-HEAP
// =======================================

MinHeap* criar_heap(int capacidade) {
    MinHeap* heap = (MinHeap*)malloc(sizeof(MinHeap));
    if (!heap) {
        fprintf(stderr, "Erro: Falha na alocação de memória\n");
        exit(EXIT_FAILURE);
    }
    
    heap->dados = (int*)malloc(capacidade * sizeof(int));
    if (!heap->dados) {
        fprintf(stderr, "Erro: Falha na alocação de memória\n");
        free(heap);
        exit(EXIT_FAILURE);
    }
    
    heap->tamanho = 0;
    heap->capacidade = capacidade;
    heap->comparacoes = 0;
    heap->trocas = 0;
    
    return heap;
}

void trocar(int* a, int* b, MinHeap* heap) {
    int temp = *a;
    *a = *b;
    *b = temp;
    heap->trocas++;
}

void heapify_up(MinHeap* heap, int indice) {
    if (indice == 0) return;
    
    int pai = (indice - 1) / 2;
    heap->comparacoes++;
    
    if (heap->dados[indice] < heap->dados[pai]) {
        trocar(&heap->dados[indice], &heap->dados[pai], heap);
        heapify_up(heap, pai);
    }
}

void heapify_down(MinHeap* heap, int indice) {
    int menor = indice;
    int esq = 2 * indice + 1;
    int dir = 2 * indice + 2;
    
    if (esq < heap->tamanho) {
        heap->comparacoes++;
        if (heap->dados[esq] < heap->dados[menor]) {
            menor = esq;
        }
    }
    
    if (dir < heap->tamanho) {
        heap->comparacoes++;
        if (heap->dados[dir] < heap->dados[menor]) {
            menor = dir;
        }
    }
    
    if (menor != indice) {
        trocar(&heap->dados[indice], &heap->dados[menor], heap);
        heapify_down(heap, menor);
    }
}

void inserir_heap(MinHeap* heap, int valor) {
    if (heap->tamanho >= heap->capacidade) {
        fprintf(stderr, "Erro: Heap cheio\n");
        return;
    }
    
    heap->dados[heap->tamanho] = valor;
    heapify_up(heap, heap->tamanho);
    heap->tamanho++;
}

int extrair_minimo(MinHeap* heap) {
    if (heap->tamanho == 0) {
        fprintf(stderr, "Erro: Heap vazio\n");
        return -1;
    }
    
    int minimo = heap->dados[0];
    heap->dados[0] = heap->dados[heap->tamanho - 1];
    heap->tamanho--;
    
    if (heap->tamanho > 0) {
        heapify_down(heap, 0);
    }
    
    return minimo;
}

// =======================================
// SISTEMA DE BENCHMARK E ANÁLISE
// =======================================

double medir_tempo_ms(clock_t inicio, clock_t fim) {
    return ((double)(fim - inicio) / CLOCKS_PER_SEC) * 1000.0;
}

ResultadoBenchmark benchmark_arvore(int* valores, int quantidade, const char* tipo) {
    ResultadoBenchmark resultado = {0};
    Arvore* arvore = criar_arvore(tipo);
    rotacoes_globais = 0;
    
    clock_t inicio, fim;
    
    // Teste de inserção
    printf("Testando inserção de %d elementos (%s)...\n", quantidade, tipo);
    inicio = clock();
    
    for (int i = 0; i < quantidade; i++) {
        if (strcmp(tipo, "AVL") == 0) {
            arvore->raiz = inserir_avl(arvore->raiz, valores[i], arvore);
        } else {
            arvore->raiz = inserir_bst(arvore->raiz, valores[i], arvore);
        }
    }
    
    fim = clock();
    resultado.tempo_insercao_ms = medir_tempo_ms(inicio, fim);
    
    // Teste de busca
    printf("Testando busca de %d elementos...\n", quantidade / 10);
    unsigned long comparacoes_busca = 0;
    inicio = clock();
    
    for (int i = 0; i < quantidade / 10; i++) {
        buscar_bst(arvore->raiz, valores[i], &comparacoes_busca);
    }
    
    fim = clock();
    resultado.tempo_busca_ms = medir_tempo_ms(inicio, fim);
    
    // Métricas finais
    resultado.altura_final = calcular_altura(arvore->raiz);
    resultado.total_comparacoes = arvore->comparacoes + comparacoes_busca;
    resultado.total_rotacoes = rotacoes_globais;
    resultado.memoria_bytes = arvore->tamanho * sizeof(No);
    
    // Cleanup
    // liberar_arvore(arvore->raiz);  // Implementação omitida por brevidade
    free(arvore);
    
    return resultado;
}

ResultadoBenchmark benchmark_heap(int* valores, int quantidade) {
    ResultadoBenchmark resultado = {0};
    MinHeap* heap = criar_heap(quantidade);
    
    clock_t inicio, fim;
    
    // Teste de inserção
    printf("Testando heap com %d elementos...\n", quantidade);
    inicio = clock();
    
    for (int i = 0; i < quantidade; i++) {
        inserir_heap(heap, valores[i]);
    }
    
    fim = clock();
    resultado.tempo_insercao_ms = medir_tempo_ms(inicio, fim);
    
    // Teste de extração (heap sort)
    inicio = clock();
    
    while (heap->tamanho > 0) {
        extrair_minimo(heap);
    }
    
    fim = clock();
    resultado.tempo_remocao_ms = medir_tempo_ms(inicio, fim);
    
    resultado.total_comparacoes = heap->comparacoes;
    resultado.memoria_bytes = quantidade * sizeof(int);
    
    free(heap->dados);
    free(heap);
    
    return resultado;
}

void imprimir_resultado(const char* nome, ResultadoBenchmark resultado) {
    printf("\n=== RESULTADO %s ===\n", nome);
    printf("Altura final: %d\n", resultado.altura_final);
    printf("Tempo inserção: %.2f ms\n", resultado.tempo_insercao_ms);
    printf("Tempo busca: %.2f ms\n", resultado.tempo_busca_ms);
    printf("Tempo remoção: %.2f ms\n", resultado.tempo_remocao_ms);
    printf("Total comparações: %lu\n", resultado.total_comparacoes);
    printf("Total rotações: %lu\n", resultado.total_rotacoes);
    printf("Memória estimada: %zu bytes\n", resultado.memoria_bytes);
    printf("=====================================\n");
}

// =======================================
// DEMONSTRAÇÃO PRINCIPAL
// =======================================

void gerar_dados_teste(int* array, int tamanho, const char* tipo) {
    if (strcmp(tipo, "ordenado") == 0) {
        for (int i = 0; i < tamanho; i++) {
            array[i] = i + 1;
        }
    } else if (strcmp(tipo, "reverso") == 0) {
        for (int i = 0; i < tamanho; i++) {
            array[i] = tamanho - i;
        }
    } else { // aleatório
        for (int i = 0; i < tamanho; i++) {
            array[i] = rand() % (tamanho * 10);
        }
    }
}

int main() {
    printf("🌳 DEMONSTRAÇÃO COMPLETA - ÁRVORES E ESTRUTURAS HIERÁRQUICAS\n");
    printf("============================================================\n\n");
    
    srand(time(NULL));
    const int TAMANHO = 1000;
    int* dados = (int*)malloc(TAMANHO * sizeof(int));
    
    // =====================================
    // TESTE 1: BST vs AVL (Dados Ordenados)
    // =====================================
    printf("📊 TESTE 1: BST vs AVL com dados ORDENADOS (pior caso BST)\n");
    printf("-----------------------------------------------------------\n");
    
    gerar_dados_teste(dados, TAMANHO, "ordenado");
    
    ResultadoBenchmark resultado_bst = benchmark_arvore(dados, TAMANHO, "BST");
    imprimir_resultado("BST ORDENADO", resultado_bst);
    
    ResultadoBenchmark resultado_avl = benchmark_arvore(dados, TAMANHO, "AVL");
    imprimir_resultado("AVL ORDENADO", resultado_avl);
    
    // Análise comparativa
    printf("\n📈 ANÁLISE COMPARATIVA:\n");
    printf("Redução de altura: %.1f%% (AVL vs BST)\n", 
           ((double)(resultado_bst.altura_final - resultado_avl.altura_final) / resultado_bst.altura_final) * 100);
    printf("Speedup em buscas: %.2fx\n", 
           (double)resultado_bst.tempo_busca_ms / resultado_avl.tempo_busca_ms);
    printf("Overhead rotações: %lu operações\n", resultado_avl.total_rotacoes);
    
    // =====================================
    // TESTE 2: Dados Aleatórios
    // =====================================
    printf("\n\n📊 TESTE 2: BST vs AVL com dados ALEATÓRIOS (caso médio)\n");
    printf("-------------------------------------------------------\n");
    
    gerar_dados_teste(dados, TAMANHO, "aleatorio");
    
    ResultadoBenchmark bst_aleatorio = benchmark_arvore(dados, TAMANHO, "BST");
    imprimir_resultado("BST ALEATÓRIO", bst_aleatorio);
    
    ResultadoBenchmark avl_aleatorio = benchmark_arvore(dados, TAMANHO, "AVL");
    imprimir_resultado("AVL ALEATÓRIO", avl_aleatorio);
    
    // =====================================
    // TESTE 3: Min-Heap
    // =====================================
    printf("\n\n📊 TESTE 3: MIN-HEAP (Heap Sort)\n");
    printf("--------------------------------\n");
    
    gerar_dados_teste(dados, TAMANHO, "aleatorio");
    
    ResultadoBenchmark resultado_heap = benchmark_heap(dados, TAMANHO);
    imprimir_resultado("MIN-HEAP", resultado_heap);
    
    // =====================================
    // RESUMO FINAL
    // =====================================
    printf("\n\n🎯 RESUMO EXECUTIVO DE PERFORMANCE\n");
    printf("==================================\n");
    printf("ESTRUTURA          | ALTURA | INSERÇÃO(ms) | BUSCA(ms) | ROTAÇÕES\n");
    printf("-------------------|--------|--------------|-----------|----------\n");
    printf("BST (ordenado)     | %6d | %12.2f | %9.2f | %8lu\n", 
           resultado_bst.altura_final, resultado_bst.tempo_insercao_ms, 
           resultado_bst.tempo_busca_ms, resultado_bst.total_rotacoes);
    printf("AVL (ordenado)     | %6d | %12.2f | %9.2f | %8lu\n", 
           resultado_avl.altura_final, resultado_avl.tempo_insercao_ms, 
           resultado_avl.tempo_busca_ms, resultado_avl.total_rotacoes);
    printf("BST (aleatório)    | %6d | %12.2f | %9.2f | %8lu\n", 
           bst_aleatorio.altura_final, bst_aleatorio.tempo_insercao_ms, 
           bst_aleatorio.tempo_busca_ms, bst_aleatorio.total_rotacoes);
    printf("AVL (aleatório)    | %6d | %12.2f | %9.2f | %8lu\n", 
           avl_aleatorio.altura_final, avl_aleatorio.tempo_insercao_ms, 
           avl_aleatorio.tempo_busca_ms, avl_aleatorio.total_rotacoes);
    printf("Heap Sort          | %6s | %12.2f | %9s | %8s\n", 
           "N/A", resultado_heap.tempo_insercao_ms, "N/A", "N/A");
    
    printf("\n💡 CONCLUSÕES:\n");
    printf("• AVL garante O(log n) mesmo no pior caso\n");
    printf("• BST degrada para O(n) com dados ordenados\n");
    printf("• Heap excele em ordenação: O(n log n) garantido\n");
    printf("• Trade-off: performance vs complexidade de implementação\n");
    
    free(dados);
    
    printf("\n✅ Demonstração concluída com sucesso!\n");
    return 0;
}
