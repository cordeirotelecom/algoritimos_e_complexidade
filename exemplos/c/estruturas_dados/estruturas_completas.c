/*
 * Exemplos Práticos de Estruturas de Dados - Aula 04
 * Curso: Algoritmos e Complexidade
 * Professor: Vagner Cordeiro
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <assert.h>

// ========== LISTA LIGADA GENÉRICA ==========

typedef struct No {
    void *dados;
    struct No *proximo;
} No;

typedef struct {
    No *cabeca;
    No *cauda;
    size_t tamanho;
    size_t tamanho_elemento;
    
    // Função para comparar elementos
    int (*comparar)(const void *a, const void *b);
    
    // Função para liberar memoria de elementos
    void (*destruir_elemento)(void *elemento);
    
    // Estatísticas de uso
    size_t total_insercoes;
    size_t total_remocoes;
    size_t total_buscas;
} ListaGenerica;

// Códigos de erro
typedef enum {
    LISTA_OK = 0,
    LISTA_ERRO_MEMORIA = -1,
    LISTA_ERRO_INDICE = -2,
    LISTA_ERRO_VAZIA = -3,
    LISTA_ERRO_NULL = -4,
    LISTA_ERRO_NAO_ENCONTRADO = -5
} CodigoErroLista;

// Função para comparar inteiros
int comparar_inteiros(const void *a, const void *b) {
    int ia = *(const int*)a;
    int ib = *(const int*)b;
    return (ia > ib) - (ia < ib);
}

// Função para comparar strings
int comparar_strings(const void *a, const void *b) {
    return strcmp((const char*)a, (const char*)b);
}

// Criação da lista
ListaGenerica* lista_criar(size_t tamanho_elemento) {
    if (tamanho_elemento == 0) return NULL;
    
    ListaGenerica *lista = malloc(sizeof(ListaGenerica));
    if (!lista) return NULL;
    
    lista->cabeca = NULL;
    lista->cauda = NULL;
    lista->tamanho = 0;
    lista->tamanho_elemento = tamanho_elemento;
    lista->comparar = NULL;
    lista->destruir_elemento = NULL;
    lista->total_insercoes = 0;
    lista->total_remocoes = 0;
    lista->total_buscas = 0;
    
    return lista;
}

// Destruição da lista
void lista_destruir(ListaGenerica *lista) {
    if (!lista) return;
    
    No *atual = lista->cabeca;
    while (atual) {
        No *proximo = atual->proximo;
        
        // Chama destrutor personalizado se fornecido
        if (lista->destruir_elemento && atual->dados) {
            lista->destruir_elemento(atual->dados);
        }
        
        free(atual->dados);
        free(atual);
        atual = proximo;
    }
    
    free(lista);
}

// Inserção no início
CodigoErroLista lista_inserir_inicio(ListaGenerica *lista, const void *dados) {
    if (!lista || !dados) return LISTA_ERRO_NULL;
    
    No *novo_no = malloc(sizeof(No));
    if (!novo_no) return LISTA_ERRO_MEMORIA;
    
    novo_no->dados = malloc(lista->tamanho_elemento);
    if (!novo_no->dados) {
        free(novo_no);
        return LISTA_ERRO_MEMORIA;
    }
    
    memcpy(novo_no->dados, dados, lista->tamanho_elemento);
    novo_no->proximo = lista->cabeca;
    
    lista->cabeca = novo_no;
    if (lista->tamanho == 0) {
        lista->cauda = novo_no;
    }
    
    lista->tamanho++;
    lista->total_insercoes++;
    return LISTA_OK;
}

// Inserção no fim
CodigoErroLista lista_inserir_fim(ListaGenerica *lista, const void *dados) {
    if (!lista || !dados) return LISTA_ERRO_NULL;
    
    if (lista->tamanho == 0) {
        return lista_inserir_inicio(lista, dados);
    }
    
    No *novo_no = malloc(sizeof(No));
    if (!novo_no) return LISTA_ERRO_MEMORIA;
    
    novo_no->dados = malloc(lista->tamanho_elemento);
    if (!novo_no->dados) {
        free(novo_no);
        return LISTA_ERRO_MEMORIA;
    }
    
    memcpy(novo_no->dados, dados, lista->tamanho_elemento);
    novo_no->proximo = NULL;
    
    lista->cauda->proximo = novo_no;
    lista->cauda = novo_no;
    lista->tamanho++;
    lista->total_insercoes++;
    
    return LISTA_OK;
}

// Inserção ordenada
CodigoErroLista lista_inserir_ordenado(ListaGenerica *lista, const void *dados) {
    if (!lista || !dados || !lista->comparar) return LISTA_ERRO_NULL;
    
    // Lista vazia ou elemento menor que o primeiro
    if (lista->tamanho == 0 || lista->comparar(dados, lista->cabeca->dados) < 0) {
        return lista_inserir_inicio(lista, dados);
    }
    
    // Elemento maior que o último
    if (lista->comparar(dados, lista->cauda->dados) > 0) {
        return lista_inserir_fim(lista, dados);
    }
    
    // Busca posição correta
    No *anterior = NULL;
    No *atual = lista->cabeca;
    
    while (atual && lista->comparar(dados, atual->dados) > 0) {
        anterior = atual;
        atual = atual->proximo;
    }
    
    // Cria novo nó
    No *novo_no = malloc(sizeof(No));
    if (!novo_no) return LISTA_ERRO_MEMORIA;
    
    novo_no->dados = malloc(lista->tamanho_elemento);
    if (!novo_no->dados) {
        free(novo_no);
        return LISTA_ERRO_MEMORIA;
    }
    
    memcpy(novo_no->dados, dados, lista->tamanho_elemento);
    
    // Insere na posição correta
    novo_no->proximo = atual;
    anterior->proximo = novo_no;
    
    lista->tamanho++;
    lista->total_insercoes++;
    
    return LISTA_OK;
}

// Busca elemento
CodigoErroLista lista_buscar(const ListaGenerica *lista, const void *dados, size_t *posicao) {
    if (!lista || !dados || !lista->comparar) return LISTA_ERRO_NULL;
    
    No *atual = lista->cabeca;
    size_t pos = 0;
    
    while (atual) {
        if (lista->comparar(dados, atual->dados) == 0) {
            if (posicao) *posicao = pos;
            ((ListaGenerica*)lista)->total_buscas++;  // Cast para contornar const
            return LISTA_OK;
        }
        atual = atual->proximo;
        pos++;
    }
    
    ((ListaGenerica*)lista)->total_buscas++;
    return LISTA_ERRO_NAO_ENCONTRADO;
}

// Remover por valor
CodigoErroLista lista_remover_valor(ListaGenerica *lista, const void *dados) {
    if (!lista || !dados || !lista->comparar) return LISTA_ERRO_NULL;
    if (lista->tamanho == 0) return LISTA_ERRO_VAZIA;
    
    // Elemento na cabeça
    if (lista->comparar(dados, lista->cabeca->dados) == 0) {
        No *remover = lista->cabeca;
        lista->cabeca = lista->cabeca->proximo;
        
        if (lista->cabeca == NULL) {
            lista->cauda = NULL;
        }
        
        if (lista->destruir_elemento) {
            lista->destruir_elemento(remover->dados);
        }
        free(remover->dados);
        free(remover);
        
        lista->tamanho--;
        lista->total_remocoes++;
        return LISTA_OK;
    }
    
    // Busca elemento no meio/fim
    No *anterior = lista->cabeca;
    No *atual = anterior->proximo;
    
    while (atual) {
        if (lista->comparar(dados, atual->dados) == 0) {
            anterior->proximo = atual->proximo;
            
            // Se removendo a cauda
            if (atual == lista->cauda) {
                lista->cauda = anterior;
            }
            
            if (lista->destruir_elemento) {
                lista->destruir_elemento(atual->dados);
            }
            free(atual->dados);
            free(atual);
            
            lista->tamanho--;
            lista->total_remocoes++;
            return LISTA_OK;
        }
        anterior = atual;
        atual = atual->proximo;
    }
    
    return LISTA_ERRO_NAO_ENCONTRADO;
}

// Imprimir lista
void lista_imprimir(const ListaGenerica *lista, void (*imprimir_elemento)(const void *)) {
    if (!lista || !imprimir_elemento) return;
    
    printf("Lista (tamanho: %zu): [", lista->tamanho);
    
    No *atual = lista->cabeca;
    int primeiro = 1;
    
    while (atual) {
        if (!primeiro) printf(", ");
        imprimir_elemento(atual->dados);
        primeiro = 0;
        atual = atual->proximo;
    }
    
    printf("]\n");
}

// Estatísticas da lista
void lista_estatisticas(const ListaGenerica *lista) {
    if (!lista) return;
    
    printf("=== ESTATÍSTICAS DA LISTA ===\n");
    printf("Tamanho atual: %zu\n", lista->tamanho);
    printf("Total de inserções: %zu\n", lista->total_insercoes);
    printf("Total de remoções: %zu\n", lista->total_remocoes);
    printf("Total de buscas: %zu\n", lista->total_buscas);
    printf("Taxa de sucesso buscas: %.2f%%\n", 
           lista->total_buscas > 0 ? 100.0 : 0.0);
}

// ========== PILHA DINÂMICA ==========

typedef struct {
    void *dados;
    size_t topo;
    size_t capacidade;
    size_t tamanho_elemento;
    
    // Políticas de redimensionamento
    double fator_crescimento;    // Default: 2.0
    double fator_encolhimento;   // Default: 0.25
    size_t capacidade_minima;    // Default: 8
    
    // Estatísticas de uso
    size_t total_push;
    size_t total_pop;
    size_t redimensionamentos;
} PilhaDinamica;

// Criar pilha
PilhaDinamica* pilha_criar(size_t tamanho_elemento) {
    if (tamanho_elemento == 0) return NULL;
    
    PilhaDinamica *pilha = malloc(sizeof(PilhaDinamica));
    if (!pilha) return NULL;
    
    pilha->capacidade_minima = 8;
    pilha->dados = malloc(pilha->capacidade_minima * tamanho_elemento);
    if (!pilha->dados) {
        free(pilha);
        return NULL;
    }
    
    pilha->topo = 0;
    pilha->capacidade = pilha->capacidade_minima;
    pilha->tamanho_elemento = tamanho_elemento;
    pilha->fator_crescimento = 2.0;
    pilha->fator_encolhimento = 0.25;
    pilha->total_push = 0;
    pilha->total_pop = 0;
    pilha->redimensionamentos = 0;
    
    return pilha;
}

// Destruir pilha
void pilha_destruir(PilhaDinamica *pilha) {
    if (!pilha) return;
    free(pilha->dados);
    free(pilha);
}

// Redimensionar pilha
CodigoErroLista pilha_redimensionar(PilhaDinamica *pilha, size_t nova_capacidade) {
    if (!pilha) return LISTA_ERRO_NULL;
    if (nova_capacidade < pilha->topo) return LISTA_ERRO_INDICE;
    
    void *novos_dados = realloc(pilha->dados, nova_capacidade * pilha->tamanho_elemento);
    if (!novos_dados && nova_capacidade > 0) return LISTA_ERRO_MEMORIA;
    
    pilha->dados = novos_dados;
    pilha->capacidade = nova_capacidade;
    pilha->redimensionamentos++;
    
    return LISTA_OK;
}

// Push
CodigoErroLista pilha_push(PilhaDinamica *pilha, const void *item) {
    if (!pilha || !item) return LISTA_ERRO_NULL;
    
    // Verifica se precisa expandir
    if (pilha->topo >= pilha->capacidade) {
        size_t nova_capacidade = (size_t)(pilha->capacidade * pilha->fator_crescimento);
        if (nova_capacidade <= pilha->capacidade) nova_capacidade = pilha->capacidade + 1;
        
        CodigoErroLista resultado = pilha_redimensionar(pilha, nova_capacidade);
        if (resultado != LISTA_OK) return resultado;
    }
    
    // Copia dados para o topo
    char *base = (char *)pilha->dados;
    memcpy(base + (pilha->topo * pilha->tamanho_elemento), item, pilha->tamanho_elemento);
    pilha->topo++;
    pilha->total_push++;
    
    return LISTA_OK;
}

// Pop
CodigoErroLista pilha_pop(PilhaDinamica *pilha, void *item) {
    if (!pilha) return LISTA_ERRO_NULL;
    if (pilha->topo == 0) return LISTA_ERRO_VAZIA;
    
    pilha->topo--;
    
    // Copia dados antes de remover
    if (item) {
        char *base = (char *)pilha->dados;
        memcpy(item, base + (pilha->topo * pilha->tamanho_elemento), pilha->tamanho_elemento);
    }
    
    pilha->total_pop++;
    
    // Verifica se deve encolher
    double fator_uso = (double)pilha->topo / pilha->capacidade;
    if (fator_uso < pilha->fator_encolhimento && pilha->capacidade > pilha->capacidade_minima) {
        size_t nova_capacidade = pilha->capacidade / 2;
        if (nova_capacidade < pilha->capacidade_minima) {
            nova_capacidade = pilha->capacidade_minima;
        }
        pilha_redimensionar(pilha, nova_capacidade);  // Ignora erros de encolhimento
    }
    
    return LISTA_OK;
}

// Verificar topo sem remover
CodigoErroLista pilha_topo(const PilhaDinamica *pilha, void *item) {
    if (!pilha || !item) return LISTA_ERRO_NULL;
    if (pilha->topo == 0) return LISTA_ERRO_VAZIA;
    
    char *base = (char *)pilha->dados;
    memcpy(item, base + ((pilha->topo - 1) * pilha->tamanho_elemento), pilha->tamanho_elemento);
    
    return LISTA_OK;
}

// Verificar se vazia
int pilha_vazia(const PilhaDinamica *pilha) {
    return pilha ? pilha->topo == 0 : 1;
}

// Obter tamanho
size_t pilha_tamanho(const PilhaDinamica *pilha) {
    return pilha ? pilha->topo : 0;
}

// Fator de carga
double pilha_fator_carga(const PilhaDinamica *pilha) {
    if (!pilha || pilha->capacidade == 0) return 0.0;
    return (double)pilha->topo / pilha->capacidade;
}

// ========== FILA CIRCULAR ==========

typedef struct {
    void *buffer;
    size_t inicio;
    size_t fim;
    size_t capacidade;
    size_t tamanho_atual;
    size_t tamanho_elemento;
    
    // Métricas de performance
    size_t total_enqueue;
    size_t total_dequeue;
    size_t overflows;
    size_t underflows;
} FilaCircular;

// Criar fila
FilaCircular* fila_criar(size_t capacidade, size_t tamanho_elemento) {
    if (capacidade == 0 || tamanho_elemento == 0) return NULL;
    
    FilaCircular *fila = malloc(sizeof(FilaCircular));
    if (!fila) return NULL;
    
    fila->buffer = malloc(capacidade * tamanho_elemento);
    if (!fila->buffer) {
        free(fila);
        return NULL;
    }
    
    fila->inicio = 0;
    fila->fim = 0;
    fila->capacidade = capacidade;
    fila->tamanho_atual = 0;
    fila->tamanho_elemento = tamanho_elemento;
    fila->total_enqueue = 0;
    fila->total_dequeue = 0;
    fila->overflows = 0;
    fila->underflows = 0;
    
    return fila;
}

// Destruir fila
void fila_destruir(FilaCircular *fila) {
    if (!fila) return;
    free(fila->buffer);
    free(fila);
}

// Verificar se cheia
int fila_cheia(const FilaCircular *fila) {
    return fila ? fila->tamanho_atual == fila->capacidade : 1;
}

// Verificar se vazia
int fila_vazia(const FilaCircular *fila) {
    return fila ? fila->tamanho_atual == 0 : 1;
}

// Enqueue
CodigoErroLista fila_enqueue(FilaCircular *fila, const void *item) {
    if (!fila || !item) return LISTA_ERRO_NULL;
    
    if (fila_cheia(fila)) {
        fila->overflows++;
        return LISTA_ERRO_MEMORIA;  // Fila cheia
    }
    
    // Calcula endereço no buffer circular
    char *base = (char *)fila->buffer;
    size_t offset = fila->fim * fila->tamanho_elemento;
    memcpy(base + offset, item, fila->tamanho_elemento);
    
    // Atualiza ponteiros de forma circular
    fila->fim = (fila->fim + 1) % fila->capacidade;
    fila->tamanho_atual++;
    fila->total_enqueue++;
    
    return LISTA_OK;
}

// Dequeue
CodigoErroLista fila_dequeue(FilaCircular *fila, void *item) {
    if (!fila) return LISTA_ERRO_NULL;
    
    if (fila_vazia(fila)) {
        fila->underflows++;
        return LISTA_ERRO_VAZIA;
    }
    
    // Copia dados se solicitado
    if (item) {
        char *base = (char *)fila->buffer;
        size_t offset = fila->inicio * fila->tamanho_elemento;
        memcpy(item, base + offset, fila->tamanho_elemento);
    }
    
    // Atualiza ponteiros de forma circular
    fila->inicio = (fila->inicio + 1) % fila->capacidade;
    fila->tamanho_atual--;
    fila->total_dequeue++;
    
    return LISTA_OK;
}

// Peek na fila
CodigoErroLista fila_peek(const FilaCircular *fila, void *item) {
    if (!fila || !item) return LISTA_ERRO_NULL;
    
    if (fila_vazia(fila)) {
        return LISTA_ERRO_VAZIA;
    }
    
    char *base = (char *)fila->buffer;
    size_t offset = fila->inicio * fila->tamanho_elemento;
    memcpy(item, base + offset, fila->tamanho_elemento);
    
    return LISTA_OK;
}

// Utilização da fila
double fila_utilizacao(const FilaCircular *fila) {
    if (!fila || fila->capacidade == 0) return 0.0;
    return (double)fila->tamanho_atual / fila->capacidade;
}

// ========== FUNÇÕES AUXILIARES PARA TESTES ==========

void imprimir_int(const void *item) {
    printf("%d", *(const int*)item);
}

void imprimir_string(const void *item) {
    printf("\"%s\"", (const char*)item);
}

void destruir_string(void *item) {
    // Para strings alocadas dinamicamente
    free(*(char**)item);
}

// ========== BENCHMARK DE PERFORMANCE ==========

typedef struct {
    double tempo_insercao;
    double tempo_busca;
    double tempo_remocao;
    size_t memoria_usada;
} ResultadoBenchmark;

ResultadoBenchmark benchmark_lista(int n) {
    ResultadoBenchmark resultado = {0};
    ListaGenerica *lista = lista_criar(sizeof(int));
    lista->comparar = comparar_inteiros;
    
    clock_t inicio, fim;
    
    // Benchmark inserção
    inicio = clock();
    for (int i = 0; i < n; i++) {
        lista_inserir_fim(lista, &i);
    }
    fim = clock();
    resultado.tempo_insercao = ((double)(fim - inicio)) / CLOCKS_PER_SEC;
    
    // Benchmark busca
    inicio = clock();
    for (int i = 0; i < n/10; i++) {
        int buscar = rand() % n;
        size_t pos;
        lista_buscar(lista, &buscar, &pos);
    }
    fim = clock();
    resultado.tempo_busca = ((double)(fim - inicio)) / CLOCKS_PER_SEC;
    
    // Benchmark remoção
    inicio = clock();
    for (int i = 0; i < n/2; i++) {
        int remover = i * 2;
        lista_remover_valor(lista, &remover);
    }
    fim = clock();
    resultado.tempo_remocao = ((double)(fim - inicio)) / CLOCKS_PER_SEC;
    
    // Estima uso de memória
    resultado.memoria_usada = lista->tamanho * (sizeof(No) + sizeof(int));
    
    lista_destruir(lista);
    return resultado;
}

// ========== FUNÇÃO PRINCIPAL DE DEMONSTRAÇÃO ==========

int main() {
    printf("=== DEMONSTRAÇÃO ESTRUTURAS DE DADOS ===\n\n");
    
    // ========== TESTE DA LISTA GENÉRICA ==========
    printf("1. TESTE DA LISTA GENÉRICA\n");
    printf("---------------------------\n");
    
    ListaGenerica *lista_int = lista_criar(sizeof(int));
    lista_int->comparar = comparar_inteiros;
    
    printf("Inserindo elementos: ");
    int valores[] = {42, 17, 89, 3, 56, 23, 91, 7};
    int n_valores = sizeof(valores) / sizeof(valores[0]);
    
    for (int i = 0; i < n_valores; i++) {
        lista_inserir_ordenado(lista_int, &valores[i]);
        printf("%d ", valores[i]);
    }
    printf("\n");
    
    printf("Lista ordenada: ");
    lista_imprimir(lista_int, imprimir_int);
    
    // Teste de busca
    int buscar = 89;
    size_t posicao;
    if (lista_buscar(lista_int, &buscar, &posicao) == LISTA_OK) {
        printf("Elemento %d encontrado na posição %zu\n", buscar, posicao);
    }
    
    // Teste de remoção
    int remover = 42;
    if (lista_remover_valor(lista_int, &remover) == LISTA_OK) {
        printf("Elemento %d removido com sucesso\n", remover);
    }
    
    printf("Lista após remoção: ");
    lista_imprimir(lista_int, imprimir_int);
    
    lista_estatisticas(lista_int);
    lista_destruir(lista_int);
    
    printf("\n");
    
    // ========== TESTE DA PILHA ==========
    printf("2. TESTE DA PILHA DINÂMICA\n");
    printf("---------------------------\n");
    
    PilhaDinamica *pilha = pilha_criar(sizeof(int));
    
    printf("Inserindo elementos na pilha: ");
    for (int i = 1; i <= 10; i++) {
        pilha_push(pilha, &i);
        printf("%d ", i);
    }
    printf("\n");
    
    printf("Removendo elementos da pilha: ");
    while (!pilha_vazia(pilha)) {
        int item;
        pilha_pop(pilha, &item);
        printf("%d ", item);
    }
    printf("\n");
    
    printf("Estatísticas da pilha:\n");
    printf("- Capacidade atual: %zu\n", pilha->capacidade);
    printf("- Total pushes: %zu\n", pilha->total_push);
    printf("- Total pops: %zu\n", pilha->total_pop);
    printf("- Redimensionamentos: %zu\n", pilha->redimensionamentos);
    
    pilha_destruir(pilha);
    
    printf("\n");
    
    // ========== TESTE DA FILA CIRCULAR ==========
    printf("3. TESTE DA FILA CIRCULAR\n");
    printf("-------------------------\n");
    
    FilaCircular *fila = fila_criar(5, sizeof(int));
    
    printf("Inserindo elementos na fila: ");
    for (int i = 1; i <= 5; i++) {
        fila_enqueue(fila, &i);
        printf("%d ", i);
    }
    printf("\n");
    
    // Tenta inserir mais um (deve dar overflow)
    int extra = 6;
    if (fila_enqueue(fila, &extra) != LISTA_OK) {
        printf("Fila cheia! Overflow detectado.\n");
    }
    
    printf("Removendo 3 elementos: ");
    for (int i = 0; i < 3; i++) {
        int item;
        fila_dequeue(fila, &item);
        printf("%d ", item);
    }
    printf("\n");
    
    printf("Inserindo mais 2 elementos: ");
    for (int i = 6; i <= 7; i++) {
        fila_enqueue(fila, &i);
        printf("%d ", i);
    }
    printf("\n");
    
    printf("Removendo elementos restantes: ");
    while (!fila_vazia(fila)) {
        int item;
        fila_dequeue(fila, &item);
        printf("%d ", item);
    }
    printf("\n");
    
    printf("Estatísticas da fila:\n");
    printf("- Total enqueues: %zu\n", fila->total_enqueue);
    printf("- Total dequeues: %zu\n", fila->total_dequeue);
    printf("- Overflows: %zu\n", fila->overflows);
    printf("- Underflows: %zu\n", fila->underflows);
    
    fila_destruir(fila);
    
    printf("\n");
    
    // ========== BENCHMARK DE PERFORMANCE ==========
    printf("4. BENCHMARK DE PERFORMANCE\n");
    printf("----------------------------\n");
    
    int tamanhos[] = {1000, 5000, 10000, 50000};
    int n_tamanhos = sizeof(tamanhos) / sizeof(tamanhos[0]);
    
    printf("Tamanho\tInserção(s)\tBusca(s)\tRemoção(s)\tMemória(KB)\n");
    printf("-------\t-----------\t--------\t----------\t-----------\n");
    
    for (int i = 0; i < n_tamanhos; i++) {
        ResultadoBenchmark resultado = benchmark_lista(tamanhos[i]);
        printf("%d\t%.6f\t%.6f\t%.6f\t%.2f\n",
               tamanhos[i],
               resultado.tempo_insercao,
               resultado.tempo_busca,
               resultado.tempo_remocao,
               resultado.memoria_usada / 1024.0);
    }
    
    printf("\n=== DEMONSTRAÇÃO CONCLUÍDA ===\n");
    
    return 0;
}
