# Laboratório 02: Estruturas de Dados Fundamentais

**Disciplina:** Algoritmos e Complexidade  
**Professor:** Vagner Cordeiro  
**Duração:** 4 horas  
**Pré-requisitos:** Laboratório 01, conhecimento básico de arrays e ponteiros  

---

## Objetivos

Ao final deste laboratório, o estudante será capaz de:
- Implementar e manipular arrays unidimensionais e bidimensionais
- Criar e utilizar estruturas (structs) em C
- Trabalhar com ponteiros e referências
- Implementar operações básicas em estruturas de dados
- Analisar a complexidade de operações em diferentes estruturas
- Comparar performance entre diferentes implementações

---

## Exercício 1: Manipulação Avançada de Arrays

### Objetivo
Implementar operações fundamentais em arrays e analisar sua complexidade.

### Código Base

Crie um arquivo `exercicio01_arrays.c`:

```c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <string.h>

// Estrutura para estatísticas de operações
typedef struct {
    int comparacoes;
    int movimentacoes;
    double tempo_execucao;
} EstatisticasOperacao;

// Função para imprimir array (limitado para visualização)
void imprimir_array(int arr[], int n, const char* nome) {
    int limite = n > 15 ? 15 : n;
    printf("%s[%d]: ", nome, n);
    for (int i = 0; i < limite; i++) {
        printf("%d ", arr[i]);
    }
    if (n > 15) printf("...");
    printf("\n");
}

// Inserção no início do array - O(n)
void inserir_inicio(int arr[], int *n, int valor, EstatisticasOperacao *stats) {
    clock_t inicio = clock();
    stats->comparacoes = 0;
    stats->movimentacoes = 0;
    
    // Move todos os elementos uma posição para a direita
    for (int i = *n; i > 0; i--) {
        arr[i] = arr[i-1];
        stats->movimentacoes++;
    }
    
    arr[0] = valor;
    (*n)++;
    stats->movimentacoes++;
    
    clock_t fim = clock();
    stats->tempo_execucao = ((double)(fim - inicio)) / CLOCKS_PER_SEC;
}

// Inserção no final do array - O(1)
void inserir_final(int arr[], int *n, int valor, EstatisticasOperacao *stats) {
    clock_t inicio = clock();
    stats->comparacoes = 0;
    stats->movimentacoes = 0;
    
    arr[*n] = valor;
    (*n)++;
    stats->movimentacoes = 1;
    
    clock_t fim = clock();
    stats->tempo_execucao = ((double)(fim - inicio)) / CLOCKS_PER_SEC;
}

// Inserção em posição específica - O(n)
void inserir_posicao(int arr[], int *n, int valor, int pos, EstatisticasOperacao *stats) {
    clock_t inicio = clock();
    stats->comparacoes = 0;
    stats->movimentacoes = 0;
    
    if (pos < 0 || pos > *n) {
        printf("Posição inválida!\n");
        return;
    }
    
    // Move elementos da posição em diante para a direita
    for (int i = *n; i > pos; i--) {
        arr[i] = arr[i-1];
        stats->movimentacoes++;
    }
    
    arr[pos] = valor;
    (*n)++;
    stats->movimentacoes++;
    
    clock_t fim = clock();
    stats->tempo_execucao = ((double)(fim - inicio)) / CLOCKS_PER_SEC;
}

// Remoção de elemento por valor - O(n)
int remover_valor(int arr[], int *n, int valor, EstatisticasOperacao *stats) {
    clock_t inicio = clock();
    stats->comparacoes = 0;
    stats->movimentacoes = 0;
    
    int posicao = -1;
    
    // Busca o elemento
    for (int i = 0; i < *n; i++) {
        stats->comparacoes++;
        if (arr[i] == valor) {
            posicao = i;
            break;
        }
    }
    
    if (posicao == -1) {
        clock_t fim = clock();
        stats->tempo_execucao = ((double)(fim - inicio)) / CLOCKS_PER_SEC;
        return 0; // Não encontrado
    }
    
    // Move elementos para a esquerda
    for (int i = posicao; i < *n - 1; i++) {
        arr[i] = arr[i + 1];
        stats->movimentacoes++;
    }
    
    (*n)--;
    
    clock_t fim = clock();
    stats->tempo_execucao = ((double)(fim - inicio)) / CLOCKS_PER_SEC;
    return 1; // Removido com sucesso
}

// Busca linear com estatísticas - O(n)
int busca_linear_stats(int arr[], int n, int valor, EstatisticasOperacao *stats) {
    clock_t inicio = clock();
    stats->comparacoes = 0;
    stats->movimentacoes = 0;
    
    for (int i = 0; i < n; i++) {
        stats->comparacoes++;
        if (arr[i] == valor) {
            clock_t fim = clock();
            stats->tempo_execucao = ((double)(fim - inicio)) / CLOCKS_PER_SEC;
            return i;
        }
    }
    
    clock_t fim = clock();
    stats->tempo_execucao = ((double)(fim - inicio)) / CLOCKS_PER_SEC;
    return -1;
}

int main() {
    printf("=== LABORATÓRIO 02: OPERAÇÕES EM ARRAYS ===\n\n");
    
    const int CAPACIDADE = 20;
    int arr[CAPACIDADE];
    int n = 0;
    EstatisticasOperacao stats;
    
    // Inicializa array com alguns valores
    printf("1. Inicializando array com valores 10, 20, 30, 40, 50:\n");
    int valores_iniciais[] = {10, 20, 30, 40, 50};
    for (int i = 0; i < 5; i++) {
        inserir_final(arr, &n, valores_iniciais[i], &stats);
    }
    imprimir_array(arr, n, "Array");
    
    // Teste de inserção no início
    printf("\n2. Inserindo 5 no início:\n");
    inserir_inicio(arr, &n, 5, &stats);
    imprimir_array(arr, n, "Array");
    printf("   Movimentações: %d, Tempo: %.6f s\n", stats.movimentacoes, stats.tempo_execucao);
    
    // Teste de inserção no final
    printf("\n3. Inserindo 60 no final:\n");
    inserir_final(arr, &n, 60, &stats);
    imprimir_array(arr, n, "Array");
    printf("   Movimentações: %d, Tempo: %.6f s\n", stats.movimentacoes, stats.tempo_execucao);
    
    // Teste de inserção em posição específica
    printf("\n4. Inserindo 25 na posição 3:\n");
    inserir_posicao(arr, &n, 25, 3, &stats);
    imprimir_array(arr, n, "Array");
    printf("   Movimentações: %d, Tempo: %.6f s\n", stats.movimentacoes, stats.tempo_execucao);
    
    // Teste de busca
    printf("\n5. Buscando valor 30:\n");
    int posicao = busca_linear_stats(arr, n, 30, &stats);
    printf("   Valor 30 encontrado na posição: %d\n", posicao);
    printf("   Comparações: %d, Tempo: %.6f s\n", stats.comparacoes, stats.tempo_execucao);
    
    // Teste de remoção
    printf("\n6. Removendo valor 25:\n");
    int removido = remover_valor(arr, &n, 25, &stats);
    if (removido) {
        imprimir_array(arr, n, "Array");
        printf("   Comparações: %d, Movimentações: %d, Tempo: %.6f s\n", 
               stats.comparacoes, stats.movimentacoes, stats.tempo_execucao);
    }
    
    // Análise de complexidade com arrays maiores
    printf("\n=== ANÁLISE DE COMPLEXIDADE ===\n");
    printf("Tamanho | Inserção Início | Inserção Final | Busca Linear | Remoção\n");
    printf("--------|-----------------|----------------|--------------|--------\n");
    
    int tamanhos[] = {100, 500, 1000, 2000};
    for (int t = 0; t < 4; t++) {
        int tam = tamanhos[t];
        int *arr_grande = (int*)malloc(tam * 2 * sizeof(int));
        int n_grande = 0;
        
        // Preenche array
        for (int i = 0; i < tam; i++) {
            inserir_final(arr_grande, &n_grande, i, &stats);
        }
        
        // Teste inserção início
        inserir_inicio(arr_grande, &n_grande, -1, &stats);
        double tempo_ins_inicio = stats.tempo_execucao;
        
        // Teste inserção final
        inserir_final(arr_grande, &n_grande, tam + 1, &stats);
        double tempo_ins_final = stats.tempo_execucao;
        
        // Teste busca linear (pior caso - último elemento)
        busca_linear_stats(arr_grande, n_grande, tam, &stats);
        double tempo_busca = stats.tempo_execucao;
        
        // Teste remoção (primeiro elemento)
        remover_valor(arr_grande, &n_grande, 0, &stats);
        double tempo_remocao = stats.tempo_execucao;
        
        printf("%-7d | %-15.6f | %-14.6f | %-12.6f | %-7.6f\n",
               tam, tempo_ins_inicio, tempo_ins_final, tempo_busca, tempo_remocao);
        
        free(arr_grande);
    }
    
    return 0;
}
```

### Análise dos Resultados

Complete a tabela com os resultados observados:

| Operação | Complexidade Teórica | Complexidade Observada | Justificativa |
|----------|---------------------|------------------------|---------------|
| Inserção Início | | | |
| Inserção Final | | | |
| Inserção Meio | | | |
| Busca Linear | | | |
| Remoção | | | |

---

## Exercício 2: Matrizes e Arrays Bidimensionais

### Objetivo
Trabalhar com arrays bidimensionais e analisar diferentes formas de percorrê-los.

### Código Base

Crie um arquivo `exercicio02_matrizes.c`:

```c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

// Função para preencher matriz com valores sequenciais
void preencher_matriz(int **matriz, int linhas, int colunas) {
    int valor = 1;
    for (int i = 0; i < linhas; i++) {
        for (int j = 0; j < colunas; j++) {
            matriz[i][j] = valor++;
        }
    }
}

// Função para imprimir matriz (limitada para visualização)
void imprimir_matriz(int **matriz, int linhas, int colunas, const char* nome) {
    printf("%s (%dx%d):\n", nome, linhas, colunas);
    int lim_lin = linhas > 8 ? 8 : linhas;
    int lim_col = colunas > 10 ? 10 : colunas;
    
    for (int i = 0; i < lim_lin; i++) {
        for (int j = 0; j < lim_col; j++) {
            printf("%4d ", matriz[i][j]);
        }
        if (colunas > 10) printf("...");
        printf("\n");
    }
    if (linhas > 8) printf("...\n");
    printf("\n");
}

// Percurso por linhas (cache-friendly)
long long soma_por_linhas(int **matriz, int linhas, int colunas, double *tempo) {
    clock_t inicio = clock();
    
    long long soma = 0;
    for (int i = 0; i < linhas; i++) {
        for (int j = 0; j < colunas; j++) {
            soma += matriz[i][j];
        }
    }
    
    clock_t fim = clock();
    *tempo = ((double)(fim - inicio)) / CLOCKS_PER_SEC;
    return soma;
}

// Percurso por colunas (cache-unfriendly)
long long soma_por_colunas(int **matriz, int linhas, int colunas, double *tempo) {
    clock_t inicio = clock();
    
    long long soma = 0;
    for (int j = 0; j < colunas; j++) {
        for (int i = 0; i < linhas; i++) {
            soma += matriz[i][j];
        }
    }
    
    clock_t fim = clock();
    *tempo = ((double)(fim - inicio)) / CLOCKS_PER_SEC;
    return soma;
}

// Busca em matriz ordenada por linhas
int buscar_matriz_ordenada(int **matriz, int linhas, int colunas, int valor, 
                          int *pos_linha, int *pos_coluna, int *comparacoes) {
    *comparacoes = 0;
    
    // Busca linha por linha (cada linha está ordenada)
    for (int i = 0; i < linhas; i++) {
        // Verifica se o valor pode estar nesta linha
        (*comparacoes)++;
        if (valor >= matriz[i][0] && valor <= matriz[i][colunas-1]) {
            // Busca binária na linha
            int inicio = 0, fim = colunas - 1;
            while (inicio <= fim) {
                (*comparacoes)++;
                int meio = (inicio + fim) / 2;
                if (matriz[i][meio] == valor) {
                    *pos_linha = i;
                    *pos_coluna = meio;
                    return 1; // Encontrado
                }
                if (matriz[i][meio] < valor) {
                    inicio = meio + 1;
                } else {
                    fim = meio - 1;
                }
            }
        }
    }
    return 0; // Não encontrado
}

// Transposta de matriz
int** transpor_matriz(int **matriz, int linhas, int colunas) {
    // Aloca matriz transposta
    int **transposta = (int**)malloc(colunas * sizeof(int*));
    for (int i = 0; i < colunas; i++) {
        transposta[i] = (int*)malloc(linhas * sizeof(int));
    }
    
    // Copia elementos transpostos
    for (int i = 0; i < linhas; i++) {
        for (int j = 0; j < colunas; j++) {
            transposta[j][i] = matriz[i][j];
        }
    }
    
    return transposta;
}

// Multiplicação de matrizes (algoritmo básico O(n³))
int** multiplicar_matrizes(int **A, int **B, int linA, int colA, int colB, 
                          long long *operacoes, double *tempo) {
    clock_t inicio = clock();
    *operacoes = 0;
    
    // Aloca matriz resultado
    int **C = (int**)malloc(linA * sizeof(int*));
    for (int i = 0; i < linA; i++) {
        C[i] = (int*)calloc(colB, sizeof(int));
    }
    
    // Multiplicação
    for (int i = 0; i < linA; i++) {
        for (int j = 0; j < colB; j++) {
            for (int k = 0; k < colA; k++) {
                C[i][j] += A[i][k] * B[k][j];
                (*operacoes)++;
            }
        }
    }
    
    clock_t fim = clock();
    *tempo = ((double)(fim - inicio)) / CLOCKS_PER_SEC;
    return C;
}

// Função para alocar matriz
int** alocar_matriz(int linhas, int colunas) {
    int **matriz = (int**)malloc(linhas * sizeof(int*));
    for (int i = 0; i < linhas; i++) {
        matriz[i] = (int*)malloc(colunas * sizeof(int));
    }
    return matriz;
}

// Função para liberar matriz
void liberar_matriz(int **matriz, int linhas) {
    for (int i = 0; i < linhas; i++) {
        free(matriz[i]);
    }
    free(matriz);
}

int main() {
    printf("=== LABORATÓRIO 02: MATRIZES E ARRAYS BIDIMENSIONAIS ===\n\n");
    
    // Teste com matriz pequena
    printf("1. Teste com matriz 4x5:\n");
    int **matriz = alocar_matriz(4, 5);
    preencher_matriz(matriz, 4, 5);
    imprimir_matriz(matriz, 4, 5, "Matriz Original");
    
    // Teste de percursos
    double tempo_linhas, tempo_colunas;
    long long soma1 = soma_por_linhas(matriz, 4, 5, &tempo_linhas);
    long long soma2 = soma_por_colunas(matriz, 4, 5, &tempo_colunas);
    
    printf("Soma percorrendo por linhas: %lld (Tempo: %.6f s)\n", soma1, tempo_linhas);
    printf("Soma percorrendo por colunas: %lld (Tempo: %.6f s)\n", soma2, tempo_colunas);
    
    // Teste de busca
    printf("\n2. Teste de busca na matriz:\n");
    int linha, coluna, comparacoes;
    int valor_busca = 13;
    int encontrado = buscar_matriz_ordenada(matriz, 4, 5, valor_busca, 
                                           &linha, &coluna, &comparacoes);
    if (encontrado) {
        printf("Valor %d encontrado na posição [%d][%d] com %d comparações\n", 
               valor_busca, linha, coluna, comparacoes);
    } else {
        printf("Valor %d não encontrado (%d comparações)\n", valor_busca, comparacoes);
    }
    
    // Teste de transposição
    printf("\n3. Transposição da matriz:\n");
    int **transposta = transpor_matriz(matriz, 4, 5);
    imprimir_matriz(transposta, 5, 4, "Matriz Transposta");
    
    liberar_matriz(matriz, 4);
    liberar_matriz(transposta, 5);
    
    // Teste de multiplicação de matrizes
    printf("4. Multiplicação de matrizes:\n");
    int **A = alocar_matriz(3, 3);
    int **B = alocar_matriz(3, 3);
    
    // Preenche matrizes A e B
    preencher_matriz(A, 3, 3);
    preencher_matriz(B, 3, 3);
    
    imprimir_matriz(A, 3, 3, "Matriz A");
    imprimir_matriz(B, 3, 3, "Matriz B");
    
    long long operacoes;
    double tempo_mult;
    int **C = multiplicar_matrizes(A, B, 3, 3, 3, &operacoes, &tempo_mult);
    
    imprimir_matriz(C, 3, 3, "Matriz C = A × B");
    printf("Operações realizadas: %lld, Tempo: %.6f s\n", operacoes, tempo_mult);
    
    liberar_matriz(A, 3);
    liberar_matriz(B, 3);
    liberar_matriz(C, 3);
    
    // Análise de performance com matrizes maiores
    printf("\n=== ANÁLISE DE PERFORMANCE ===\n");
    printf("Tamanho | Percurso Linhas | Percurso Colunas | Speedup | Multiplicação\n");
    printf("--------|-----------------|------------------|---------|---------------\n");
    
    int tamanhos[] = {100, 200, 300, 400};
    for (int t = 0; t < 4; t++) {
        int tam = tamanhos[t];
        
        int **mat_teste = alocar_matriz(tam, tam);
        preencher_matriz(mat_teste, tam, tam);
        
        // Teste percursos
        double t_linhas, t_colunas;
        soma_por_linhas(mat_teste, tam, tam, &t_linhas);
        soma_por_colunas(mat_teste, tam, tam, &t_colunas);
        
        double speedup = t_colunas / t_linhas;
        
        // Teste multiplicação (só para matrizes menores)
        double t_mult = 0;
        if (tam <= 200) {
            int **mat_b = alocar_matriz(tam, tam);
            preencher_matriz(mat_b, tam, tam);
            
            long long ops;
            int **resultado = multiplicar_matrizes(mat_teste, mat_b, tam, tam, tam, &ops, &t_mult);
            
            liberar_matriz(mat_b, tam);
            liberar_matriz(resultado, tam);
        }
        
        printf("%-7d | %-15.6f | %-16.6f | %-7.2f | ", 
               tam, t_linhas, t_colunas, speedup);
        
        if (t_mult > 0) {
            printf("%-14.6f", t_mult);
        } else {
            printf("%-14s", "N/A");
        }
        printf("\n");
        
        liberar_matriz(mat_teste, tam);
    }
    
    return 0;
}
```

### Análise dos Resultados

Complete a tabela:

| Tamanho | Percurso Linhas (s) | Percurso Colunas (s) | Speedup | Observações |
|---------|--------------------|--------------------|---------|-------------|
| 100 | | | | |
| 200 | | | | |
| 300 | | | | |
| 400 | | | | |

**Questões:**
1. Por que o percurso por linhas é mais rápido?
2. Como o speedup varia com o tamanho da matriz?
3. Qual a complexidade da multiplicação de matrizes implementada?

---

## Exercício 3: Estruturas (Structs) e Manipulação de Dados

### Objetivo
Implementar estruturas de dados personalizadas usando structs.

### Código Base

Crie um arquivo `exercicio03_structs.c`:

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

// Definição da estrutura Aluno
typedef struct {
    int id;
    char nome[50];
    float nota1, nota2, nota3;
    float media;
    char situacao[15]; // "Aprovado", "Reprovado", "Recuperação"
} Aluno;

// Definição da estrutura Turma
typedef struct {
    Aluno *alunos;
    int capacidade;
    int quantidade;
    float media_turma;
} Turma;

// Função para calcular média do aluno
void calcular_media(Aluno *aluno) {
    aluno->media = (aluno->nota1 + aluno->nota2 + aluno->nota3) / 3.0;
    
    if (aluno->media >= 7.0) {
        strcpy(aluno->situacao, "Aprovado");
    } else if (aluno->media >= 4.0) {
        strcpy(aluno->situacao, "Recuperação");
    } else {
        strcpy(aluno->situacao, "Reprovado");
    }
}

// Função para criar turma
Turma* criar_turma(int capacidade) {
    Turma *turma = (Turma*)malloc(sizeof(Turma));
    turma->alunos = (Aluno*)malloc(capacidade * sizeof(Aluno));
    turma->capacidade = capacidade;
    turma->quantidade = 0;
    turma->media_turma = 0.0;
    return turma;
}

// Função para adicionar aluno à turma
int adicionar_aluno(Turma *turma, int id, const char *nome, 
                   float nota1, float nota2, float nota3) {
    if (turma->quantidade >= turma->capacidade) {
        return 0; // Turma cheia
    }
    
    Aluno *novo_aluno = &turma->alunos[turma->quantidade];
    novo_aluno->id = id;
    strcpy(novo_aluno->nome, nome);
    novo_aluno->nota1 = nota1;
    novo_aluno->nota2 = nota2;
    novo_aluno->nota3 = nota3;
    
    calcular_media(novo_aluno);
    turma->quantidade++;
    
    return 1; // Sucesso
}

// Função para buscar aluno por ID - O(n)
Aluno* buscar_aluno_por_id(Turma *turma, int id, int *comparacoes) {
    *comparacoes = 0;
    for (int i = 0; i < turma->quantidade; i++) {
        (*comparacoes)++;
        if (turma->alunos[i].id == id) {
            return &turma->alunos[i];
        }
    }
    return NULL; // Não encontrado
}

// Função para buscar aluno por nome - O(n)
Aluno* buscar_aluno_por_nome(Turma *turma, const char *nome, int *comparacoes) {
    *comparacoes = 0;
    for (int i = 0; i < turma->quantidade; i++) {
        (*comparacoes)++;
        if (strcmp(turma->alunos[i].nome, nome) == 0) {
            return &turma->alunos[i];
        }
    }
    return NULL; // Não encontrado
}

// Função para ordenar alunos por média (Bubble Sort) - O(n²)
void ordenar_por_media(Turma *turma, long long *comparacoes, long long *trocas) {
    *comparacoes = 0;
    *trocas = 0;
    
    for (int i = 0; i < turma->quantidade - 1; i++) {
        for (int j = 0; j < turma->quantidade - i - 1; j++) {
            (*comparacoes)++;
            if (turma->alunos[j].media < turma->alunos[j + 1].media) {
                // Troca alunos (ordem decrescente de média)
                Aluno temp = turma->alunos[j];
                turma->alunos[j] = turma->alunos[j + 1];
                turma->alunos[j + 1] = temp;
                (*trocas)++;
            }
        }
    }
}

// Função para calcular estatísticas da turma
void calcular_estatisticas_turma(Turma *turma) {
    if (turma->quantidade == 0) {
        turma->media_turma = 0.0;
        return;
    }
    
    float soma = 0.0;
    for (int i = 0; i < turma->quantidade; i++) {
        soma += turma->alunos[i].media;
    }
    turma->media_turma = soma / turma->quantidade;
}

// Função para gerar relatório da turma
void gerar_relatorio(Turma *turma) {
    printf("\n=== RELATÓRIO DA TURMA ===\n");
    printf("Total de alunos: %d\n", turma->quantidade);
    printf("Média da turma: %.2f\n\n", turma->media_turma);
    
    printf("%-3s %-20s %-6s %-6s %-6s %-6s %-12s\n", 
           "ID", "Nome", "Nota1", "Nota2", "Nota3", "Média", "Situação");
    printf("----------------------------------------------------------------\n");
    
    for (int i = 0; i < turma->quantidade; i++) {
        Aluno *a = &turma->alunos[i];
        printf("%-3d %-20s %-6.1f %-6.1f %-6.1f %-6.2f %-12s\n",
               a->id, a->nome, a->nota1, a->nota2, a->nota3, 
               a->media, a->situacao);
    }
    
    // Estatísticas por situação
    int aprovados = 0, recuperacao = 0, reprovados = 0;
    for (int i = 0; i < turma->quantidade; i++) {
        if (strcmp(turma->alunos[i].situacao, "Aprovado") == 0) {
            aprovados++;
        } else if (strcmp(turma->alunos[i].situacao, "Recuperação") == 0) {
            recuperacao++;
        } else {
            reprovados++;
        }
    }
    
    printf("\nEstatísticas:\n");
    printf("Aprovados: %d (%.1f%%)\n", aprovados, 
           (float)aprovados / turma->quantidade * 100);
    printf("Recuperação: %d (%.1f%%)\n", recuperacao, 
           (float)recuperacao / turma->quantidade * 100);
    printf("Reprovados: %d (%.1f%%)\n", reprovados, 
           (float)reprovados / turma->quantidade * 100);
}

// Função para liberar memória da turma
void liberar_turma(Turma *turma) {
    free(turma->alunos);
    free(turma);
}

// Função para gerar dados de teste
void gerar_dados_teste(Turma *turma, int quantidade) {
    char nomes[][20] = {
        "Ana Silva", "Bruno Costa", "Carlos Lima", "Diana Souza", "Eduardo Pinto",
        "Fernanda Rocha", "Gabriel Santos", "Helena Oliveira", "Igor Pereira", "Julia Alves",
        "Kevin Martins", "Larissa Ferreira", "Marcos Carvalho", "Natália Gomes", "Otávio Reis",
        "Paula Ribeiro", "Quintino Barbosa", "Rafaela Mendes", "Samuel Araújo", "Tânia Moura"
    };
    
    srand(time(NULL));
    
    for (int i = 0; i < quantidade && i < 20; i++) {
        float nota1 = 4.0 + (rand() % 70) / 10.0; // 4.0 a 10.0
        float nota2 = 4.0 + (rand() % 70) / 10.0;
        float nota3 = 4.0 + (rand() % 70) / 10.0;
        
        adicionar_aluno(turma, i + 1, nomes[i], nota1, nota2, nota3);
    }
}

int main() {
    printf("=== LABORATÓRIO 02: ESTRUTURAS (STRUCTS) ===\n\n");
    
    // Cria turma com capacidade para 20 alunos
    Turma *turma = criar_turma(20);
    
    // Adiciona alguns alunos manualmente
    printf("1. Adicionando alunos à turma:\n");
    adicionar_aluno(turma, 1, "João Silva", 8.5, 7.0, 9.0);
    adicionar_aluno(turma, 2, "Maria Santos", 6.0, 5.5, 7.0);
    adicionar_aluno(turma, 3, "Pedro Costa", 3.0, 4.0, 2.5);
    adicionar_aluno(turma, 4, "Ana Oliveira", 9.0, 8.5, 9.5);
    
    // Gera dados de teste para mais alunos
    gerar_dados_teste(turma, 16); // Adiciona mais 16 alunos
    
    printf("Turma criada com %d alunos.\n", turma->quantidade);
    
    // Calcula estatísticas
    calcular_estatisticas_turma(turma);
    
    // Teste de busca por ID
    printf("\n2. Teste de busca por ID:\n");
    int comparacoes;
    Aluno *encontrado = buscar_aluno_por_id(turma, 3, &comparacoes);
    if (encontrado) {
        printf("Aluno ID 3 encontrado: %s (Média: %.2f) - %d comparações\n",
               encontrado->nome, encontrado->media, comparacoes);
    }
    
    // Teste de busca por nome
    printf("\n3. Teste de busca por nome:\n");
    encontrado = buscar_aluno_por_nome(turma, "Ana Oliveira", &comparacoes);
    if (encontrado) {
        printf("Aluno 'Ana Oliveira' encontrado: ID %d (Média: %.2f) - %d comparações\n",
               encontrado->id, encontrado->media, comparacoes);
    }
    
    // Ordenação por média
    printf("\n4. Ordenando alunos por média (decrescente):\n");
    clock_t inicio = clock();
    long long comp_ord, trocas_ord;
    ordenar_por_media(turma, &comp_ord, &trocas_ord);
    clock_t fim = clock();
    double tempo_ord = ((double)(fim - inicio)) / CLOCKS_PER_SEC;
    
    printf("Ordenação concluída: %lld comparações, %lld trocas, %.6f segundos\n",
           comp_ord, trocas_ord, tempo_ord);
    
    // Gera relatório final
    gerar_relatorio(turma);
    
    // Análise de performance com turmas maiores
    printf("\n=== ANÁLISE DE PERFORMANCE ===\n");
    printf("Tamanho | Busca ID | Busca Nome | Ordenação | Comparações Ord.\n");
    printf("--------|----------|------------|-----------|------------------\n");
    
    int tamanhos[] = {50, 100, 200, 500};
    for (int t = 0; t < 4; t++) {
        int tam = tamanhos[t];
        Turma *turma_teste = criar_turma(tam);
        
        // Preenche turma com dados aleatórios
        srand(42); // Seed fixo para reprodutibilidade
        for (int i = 0; i < tam; i++) {
            char nome[50];
            sprintf(nome, "Aluno_%d", i + 1);
            float n1 = 4.0 + (rand() % 70) / 10.0;
            float n2 = 4.0 + (rand() % 70) / 10.0;
            float n3 = 4.0 + (rand() % 70) / 10.0;
            adicionar_aluno(turma_teste, i + 1, nome, n1, n2, n3);
        }
        
        // Teste busca por ID (pior caso - último elemento)
        inicio = clock();
        buscar_aluno_por_id(turma_teste, tam, &comparacoes);
        fim = clock();
        double tempo_busca_id = ((double)(fim - inicio)) / CLOCKS_PER_SEC;
        
        // Teste busca por nome (pior caso - último elemento)
        char nome_busca[50];
        sprintf(nome_busca, "Aluno_%d", tam);
        inicio = clock();
        buscar_aluno_por_nome(turma_teste, nome_busca, &comparacoes);
        fim = clock();
        double tempo_busca_nome = ((double)(fim - inicio)) / CLOCKS_PER_SEC;
        
        // Teste ordenação
        inicio = clock();
        long long comp_total, trocas_total;
        ordenar_por_media(turma_teste, &comp_total, &trocas_total);
        fim = clock();
        double tempo_ordenacao = ((double)(fim - inicio)) / CLOCKS_PER_SEC;
        
        printf("%-7d | %-8.6f | %-10.6f | %-9.6f | %-16lld\n",
               tam, tempo_busca_id, tempo_busca_nome, tempo_ordenacao, comp_total);
        
        liberar_turma(turma_teste);
    }
    
    liberar_turma(turma);
    return 0;
}
```

### Análise dos Resultados

Complete a tabela:

| Tamanho | Busca ID (s) | Busca Nome (s) | Ordenação (s) | Comparações | Complexidade Observada |
|---------|--------------|----------------|---------------|-------------|----------------------|
| 50 | | | | | |
| 100 | | | | | |
| 200 | | | | | |
| 500 | | | | | |

---

## Relatório Final

### Instruções para o Relatório

Crie um documento contendo:

1. **Execução dos Exercícios** (2,0 pontos)
   - Screenshots dos resultados de cada exercício
   - Tabelas preenchidas com os dados coletados
   - Análise dos tempos de execução observados

2. **Análise Comparativa** (1,5 pontos)
   - Compare as diferentes operações em arrays
   - Explique a diferença entre percurso por linhas vs colunas em matrizes
   - Analise a eficiência das operações em structs

3. **Complexidade Computacional** (1,0 pontos)
   - Identifique a complexidade de cada operação implementada
   - Compare complexidade teórica vs prática observada
   - Explique possíveis divergências

4. **Código Comentado** (0,5 pontos)
   - Códigos com comentários explicativos
   - Modificações implementadas (se houver)

### Entrega

- **Formato:** PDF com códigos .c anexados
- **Prazo:** Uma semana após a aula
- **Valor:** 5,0 pontos

---

## Próximo Laboratório

**Laboratório 03:** Ponteiros, Alocação Dinâmica e Listas Ligadas

---

**Bom trabalho!**
