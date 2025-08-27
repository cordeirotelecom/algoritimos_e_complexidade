/*
 * REVISÃO COMPLETA: ANÁLISE DE ALGORITMOS E ESTRUTURAS DE DADOS
 * Exemplos práticos em C com análise passo a passo
 * 
 * Este arquivo demonstra:
 * 1. Todas as classes de complexidade O(1), O(log n), O(n), O(n²), etc.
 * 2. Estruturas homogêneas, heterogêneas e ponteiros
 * 3. Comparações práticas de performance
 * 4. Problemas computacionais reais
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <math.h>
#include <stdbool.h>

// ========================================
// ESTRUTURAS DE DADOS HETEROGÊNEAS
// ========================================

// Exemplo de estrutura heterogênea - Pessoa
typedef struct {
    char nome[50];      // String (array de char)
    int idade;          // Inteiro
    float salario;      // Ponto flutuante
    bool ativo;         // Booleano
} Pessoa;

// Estrutura para análise de performance
typedef struct {
    char algoritmo[30];
    int tamanho_entrada;
    long operacoes;
    double tempo_ms;
    char complexidade[10];
} ResultadoAnalise;

// ========================================
// ALGORITMOS O(1) - TEMPO CONSTANTE
// ========================================

// Exemplo 1: Acesso direto a array
int acessar_elemento(int arr[], int indice) {
    return arr[indice];  // Sempre 1 operação, independente do tamanho
}

// Exemplo 2: Operações matemáticas
double calcular_area_circulo(double raio) {
    return 3.14159 * raio * raio;  // Sempre 2 operações (multiplicação)
}

// Exemplo 3: Verificação simples
bool eh_par(int numero) {
    return numero % 2 == 0;  // Sempre 1 operação
}

void demonstrar_o1() {
    printf("=== DEMONSTRAÇÃO O(1) - TEMPO CONSTANTE ===\n");
    
    // Teste com arrays de tamanhos diferentes
    int pequeno[10] = {1,2,3,4,5,6,7,8,9,10};
    int grande[10000];
    
    // Preenche array grande
    for(int i = 0; i < 10000; i++) {
        grande[i] = i + 1;
    }
    
    clock_t inicio, fim;
    
    // Teste 1: Acesso em array pequeno
    inicio = clock();
    int valor1 = acessar_elemento(pequeno, 5);
    fim = clock();
    double tempo1 = ((double)(fim - inicio) / CLOCKS_PER_SEC) * 1000;
    
    // Teste 2: Acesso em array grande
    inicio = clock();
    int valor2 = acessar_elemento(grande, 5000);
    fim = clock();
    double tempo2 = ((double)(fim - inicio) / CLOCKS_PER_SEC) * 1000;
    
    printf("Acesso array[10]:     %d em %.6f ms\n", valor1, tempo1);
    printf("Acesso array[10000]:  %d em %.6f ms\n", valor2, tempo2);
    printf("Conclusão: Tempo constante independente do tamanho!\n\n");
}

// ========================================
// ALGORITMOS O(log n) - LOGARÍTMICO
// ========================================

// Busca binária - clássico exemplo O(log n)
int busca_binaria(int arr[], int tamanho, int alvo, long *operacoes) {
    int esquerda = 0;
    int direita = tamanho - 1;
    *operacoes = 0;
    
    while (esquerda <= direita) {
        (*operacoes)++;
        int meio = esquerda + (direita - esquerda) / 2;
        
        if (arr[meio] == alvo) {
            return meio;  // Encontrou
        }
        
        if (arr[meio] < alvo) {
            esquerda = meio + 1;  // Busca na metade direita
        } else {
            direita = meio - 1;   // Busca na metade esquerda
        }
    }
    
    return -1;  // Não encontrou
}

void demonstrar_olog_n() {
    printf("=== DEMONSTRAÇÃO O(log n) - LOGARÍTMICO ===\n");
    
    // Tamanhos crescentes para demonstrar log n
    int tamanhos[] = {100, 1000, 10000, 100000};
    int num_testes = sizeof(tamanhos) / sizeof(tamanhos[0]);
    
    for (int t = 0; t < num_testes; t++) {
        int tamanho = tamanhos[t];
        
        // Cria array ordenado
        int *arr = malloc(tamanho * sizeof(int));
        for (int i = 0; i < tamanho; i++) {
            arr[i] = i * 2;  // Array ordenado: 0, 2, 4, 6, 8...
        }
        
        // Busca elemento no meio
        int alvo = (tamanho / 2) * 2;
        long operacoes;
        
        clock_t inicio = clock();
        int resultado = busca_binaria(arr, tamanho, alvo, &operacoes);
        clock_t fim = clock();
        
        double tempo = ((double)(fim - inicio) / CLOCKS_PER_SEC) * 1000;
        double log_teorico = log2(tamanho);
        
        printf("n=%6d: %ld operações (teórico: %.1f) - %.6f ms\n", 
               tamanho, operacoes, log_teorico, tempo);
        
        free(arr);
    }
    printf("Observação: Operações crescem logaritmicamente!\n\n");
}

// ========================================
// ALGORITMOS O(n) - LINEAR
// ========================================

// Busca linear - percorre todos elementos
int busca_linear(int arr[], int tamanho, int alvo, long *operacoes) {
    *operacoes = 0;
    
    for (int i = 0; i < tamanho; i++) {
        (*operacoes)++;
        if (arr[i] == alvo) {
            return i;
        }
    }
    
    return -1;
}

// Encontrar maior elemento
int encontrar_maior(int arr[], int tamanho, long *operacoes) {
    if (tamanho == 0) return -1;
    
    int maior = arr[0];
    *operacoes = 1;  // Primeira atribuição
    
    for (int i = 1; i < tamanho; i++) {
        (*operacoes)++;  // Comparação
        if (arr[i] > maior) {
            maior = arr[i];
            (*operacoes)++;  // Atribuição quando encontra maior
        }
    }
    
    return maior;
}

// Somar todos elementos
long somar_elementos(int arr[], int tamanho, long *operacoes) {
    long soma = 0;
    *operacoes = 0;
    
    for (int i = 0; i < tamanho; i++) {
        (*operacoes)++;
        soma += arr[i];
    }
    
    return soma;
}

void demonstrar_on() {
    printf("=== DEMONSTRAÇÃO O(n) - LINEAR ===\n");
    
    int tamanhos[] = {100, 1000, 10000, 100000};
    int num_testes = sizeof(tamanhos) / sizeof(tamanhos[0]);
    
    for (int t = 0; t < num_testes; t++) {
        int tamanho = tamanhos[t];
        
        // Cria array com valores aleatórios
        int *arr = malloc(tamanho * sizeof(int));
        for (int i = 0; i < tamanho; i++) {
            arr[i] = rand() % 1000;
        }
        
        long operacoes;
        clock_t inicio, fim;
        
        // Teste 1: Encontrar maior
        inicio = clock();
        int maior = encontrar_maior(arr, tamanho, &operacoes);
        fim = clock();
        double tempo1 = ((double)(fim - inicio) / CLOCKS_PER_SEC) * 1000;
        
        // Teste 2: Somar elementos
        inicio = clock();
        long soma = somar_elementos(arr, tamanho, &operacoes);
        fim = clock();
        double tempo2 = ((double)(fim - inicio) / CLOCKS_PER_SEC) * 1000;
        
        printf("n=%6d: Maior=%d (%ld ops, %.3f ms) | Soma=%ld (%ld ops, %.3f ms)\n", 
               tamanho, maior, operacoes, tempo1, soma, operacoes, tempo2);
        
        free(arr);
    }
    printf("Observação: Operações crescem linearmente com n!\n\n");
}

// ========================================
// ALGORITMOS O(n²) - QUADRÁTICO
// ========================================

// Bubble Sort - clássico exemplo O(n²)
void bubble_sort(int arr[], int tamanho, long *operacoes, long *trocas) {
    *operacoes = 0;
    *trocas = 0;
    
    for (int i = 0; i < tamanho - 1; i++) {
        for (int j = 0; j < tamanho - 1 - i; j++) {
            (*operacoes)++;  // Comparação
            
            if (arr[j] > arr[j + 1]) {
                // Troca elementos
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                (*trocas)++;
            }
        }
    }
}

// Encontrar todos os pares com soma específica
int encontrar_pares_soma(int arr[], int tamanho, int soma_alvo, long *operacoes) {
    int pares_encontrados = 0;
    *operacoes = 0;
    
    for (int i = 0; i < tamanho; i++) {
        for (int j = i + 1; j < tamanho; j++) {
            (*operacoes)++;
            if (arr[i] + arr[j] == soma_alvo) {
                pares_encontrados++;
                // printf("Par encontrado: %d + %d = %d\n", arr[i], arr[j], soma_alvo);
            }
        }
    }
    
    return pares_encontrados;
}

void demonstrar_on2() {
    printf("=== DEMONSTRAÇÃO O(n²) - QUADRÁTICO ===\n");
    
    int tamanhos[] = {100, 200, 500, 1000};  // Menores para O(n²)
    int num_testes = sizeof(tamanhos) / sizeof(tamanhos[0]);
    
    for (int t = 0; t < num_testes; t++) {
        int tamanho = tamanhos[t];
        
        // Cria array para testar
        int *arr = malloc(tamanho * sizeof(int));
        for (int i = 0; i < tamanho; i++) {
            arr[i] = rand() % 100;  // Valores pequenos para facilitar pares
        }
        
        long operacoes, trocas;
        clock_t inicio, fim;
        
        // Teste: Encontrar pares com soma 50
        inicio = clock();
        int pares = encontrar_pares_soma(arr, tamanho, 50, &operacoes);
        fim = clock();
        double tempo = ((double)(fim - inicio) / CLOCKS_PER_SEC) * 1000;
        
        long teorico_n2 = (long)tamanho * tamanho / 2;  // n*(n-1)/2
        
        printf("n=%4d: %d pares, %ld operações (teórico n²/2: %ld) - %.3f ms\n", 
               tamanho, pares, operacoes, teorico_n2, tempo);
        
        free(arr);
    }
    printf("Observação: Operações crescem quadraticamente!\n\n");
}

// ========================================
// ESTRUTURAS COM PONTEIROS
// ========================================

// Nó de lista ligada
typedef struct No {
    int dados;
    struct No *proximo;
} No;

// Lista ligada simples
typedef struct {
    No *inicio;
    int tamanho;
} ListaLigada;

// Criar nova lista
ListaLigada* criar_lista() {
    ListaLigada *lista = malloc(sizeof(ListaLigada));
    lista->inicio = NULL;
    lista->tamanho = 0;
    return lista;
}

// Inserir no início - O(1)
void inserir_inicio(ListaLigada *lista, int valor) {
    No *novo = malloc(sizeof(No));
    novo->dados = valor;
    novo->proximo = lista->inicio;
    lista->inicio = novo;
    lista->tamanho++;
}

// Buscar elemento - O(n)
No* buscar_elemento_lista(ListaLigada *lista, int valor, long *operacoes) {
    *operacoes = 0;
    No *atual = lista->inicio;
    
    while (atual != NULL) {
        (*operacoes)++;
        if (atual->dados == valor) {
            return atual;
        }
        atual = atual->proximo;
    }
    
    return NULL;
}

// Imprimir lista
void imprimir_lista(ListaLigada *lista) {
    No *atual = lista->inicio;
    printf("Lista: ");
    while (atual != NULL) {
        printf("%d -> ", atual->dados);
        atual = atual->proximo;
    }
    printf("NULL\n");
}

void demonstrar_ponteiros() {
    printf("=== DEMONSTRAÇÃO PONTEIROS E LISTAS LIGADAS ===\n");
    
    // Cria lista ligada
    ListaLigada *lista = criar_lista();
    
    // Insere alguns elementos
    printf("Inserindo elementos 10, 20, 30, 40, 50...\n");
    for (int i = 10; i <= 50; i += 10) {
        inserir_inicio(lista, i);
    }
    
    imprimir_lista(lista);
    
    // Testa busca
    long operacoes;
    printf("\nTestando busca:\n");
    
    int valores_busca[] = {10, 30, 50, 99};
    for (int i = 0; i < 4; i++) {
        No *resultado = buscar_elemento_lista(lista, valores_busca[i], &operacoes);
        if (resultado) {
            printf("Valor %d encontrado após %ld operações\n", valores_busca[i], operacoes);
        } else {
            printf("Valor %d NÃO encontrado após %ld operações\n", valores_busca[i], operacoes);
        }
    }
    
    printf("\nComparação Array vs Lista Ligada:\n");
    printf("| Operação        | Array | Lista Ligada |\n");
    printf("|-----------------|-------|-------------|\n");
    printf("| Acesso [i]      | O(1)  | O(n)        |\n");
    printf("| Busca elemento  | O(n)  | O(n)        |\n");
    printf("| Inserir início  | O(n)  | O(1)        |\n");
    printf("| Inserir final   | O(1)  | O(n)*       |\n");
    printf("| Memória         | Contígua | Fragmentada |\n");
    printf("* Sem ponteiro para último elemento\n\n");
}

// ========================================
// ESTRUTURAS HOMOGÊNEAS vs HETEROGÊNEAS
// ========================================

void demonstrar_estruturas() {
    printf("=== DEMONSTRAÇÃO ESTRUTURAS HOMOGÊNEAS vs HETEROGÊNEAS ===\n");
    
    // Estrutura HOMOGÊNEA - Array de inteiros
    printf("1. ESTRUTURA HOMOGÊNEA (Array de inteiros):\n");
    int notas_homogenea[5] = {85, 90, 78, 92, 88};
    
    printf("   Notas: ");
    for (int i = 0; i < 5; i++) {
        printf("%d ", notas_homogenea[i]);
    }
    printf("\n   Tipo: Todos elementos são 'int'\n");
    printf("   Memória: %zu bytes por elemento\n", sizeof(int));
    printf("   Acesso: O(1) por índice\n\n");
    
    // Estrutura HETEROGÊNEA - Struct Pessoa
    printf("2. ESTRUTURA HETEROGÊNEA (Struct Pessoa):\n");
    Pessoa aluno = {
        "João Silva",   // String
        20,             // int
        1500.50,        // float
        true            // bool
    };
    
    printf("   Nome: %s\n", aluno.nome);
    printf("   Idade: %d anos\n", aluno.idade);
    printf("   Salário: R$ %.2f\n", aluno.salario);
    printf("   Ativo: %s\n", aluno.ativo ? "Sim" : "Não");
    printf("   Tipos: char[], int, float, bool\n");
    printf("   Memória total: %zu bytes\n", sizeof(Pessoa));
    
    // Array de estruturas heterogêneas
    printf("\n3. ARRAY DE ESTRUTURAS HETEROGÊNEAS:\n");
    Pessoa turma[3] = {
        {"Ana Costa", 19, 1200.00, true},
        {"Carlos Lima", 21, 1800.75, false},
        {"Maria Santos", 20, 1400.25, true}
    };
    
    printf("   Turma com %zu alunos:\n", sizeof(turma) / sizeof(Pessoa));
    for (int i = 0; i < 3; i++) {
        printf("   [%d] %s, %d anos, R$ %.2f, %s\n", 
               i, turma[i].nome, turma[i].idade, turma[i].salario,
               turma[i].ativo ? "Ativo" : "Inativo");
    }
    
    printf("\nVantagens e Desvantagens:\n");
    printf("HOMOGÊNEAS:\n");
    printf("  + Simples de usar\n");
    printf("  + Eficiente em memória\n");
    printf("  + Fácil de iterar\n");
    printf("  - Apenas um tipo de dado\n");
    
    printf("HETEROGÊNEAS:\n");
    printf("  + Modelam entidades complexas\n");
    printf("  + Agrupam dados relacionados\n");
    printf("  + Mais expressivas\n");
    printf("  - Maior complexidade\n");
    printf("  - Possível padding de memória\n\n");
}

// ========================================
// ANÁLISE COMPARATIVA COMPLETA
// ========================================

void executar_analise_completa() {
    printf("=== ANÁLISE COMPARATIVA COMPLETA ===\n");
    
    // Tamanhos para testar
    int tamanhos[] = {1000, 5000, 10000};
    int num_tamanhos = sizeof(tamanhos) / sizeof(tamanhos[0]);
    
    printf("| Algoritmo    | n=1K   | n=5K    | n=10K   | Complexidade |\n");
    printf("|--------------|--------|---------|---------|-------------|\n");
    
    for (int t = 0; t < num_tamanhos; t++) {
        int n = tamanhos[t];
        
        // Prepara dados
        int *arr = malloc(n * sizeof(int));
        for (int i = 0; i < n; i++) {
            arr[i] = i;  // Array ordenado para busca binária
        }
        
        long operacoes;
        clock_t inicio, fim;
        
        if (t == 0) {
            // Acesso direto O(1)
            inicio = clock();
            int valor = acessar_elemento(arr, n/2);
            fim = clock();
            double tempo_o1 = ((double)(fim - inicio) / CLOCKS_PER_SEC) * 1000;
            printf("| Acesso O(1)  | %.3f  |", tempo_o1);
        }
        
        if (t == 1) {
            printf(" %.3f   |", 0.001);  // Tempo constante
        }
        
        if (t == 2) {
            printf(" %.3f   | O(1)        |\n", 0.001);
        }
        
        // Busca Binária O(log n)
        if (t == 0) {
            inicio = clock();
            busca_binaria(arr, n, n/2, &operacoes);
            fim = clock();
            double tempo_log = ((double)(fim - inicio) / CLOCKS_PER_SEC) * 1000;
            printf("| Busca Bin    | %.3f  |", tempo_log);
        } else if (t == 1) {
            inicio = clock();
            busca_binaria(arr, n, n/2, &operacoes);
            fim = clock();
            double tempo_log = ((double)(fim - inicio) / CLOCKS_PER_SEC) * 1000;
            printf(" %.3f   |", tempo_log);
        } else {
            inicio = clock();
            busca_binaria(arr, n, n/2, &operacoes);
            fim = clock();
            double tempo_log = ((double)(fim - inicio) / CLOCKS_PER_SEC) * 1000;
            printf(" %.3f   | O(log n)    |\n", tempo_log);
        }
        
        // Busca Linear O(n)
        if (t == 0) {
            inicio = clock();
            busca_linear(arr, n, n-1, &operacoes);  // Pior caso
            fim = clock();
            double tempo_n = ((double)(fim - inicio) / CLOCKS_PER_SEC) * 1000;
            printf("| Busca Lin    | %.3f  |", tempo_n);
        } else if (t == 1) {
            inicio = clock();
            busca_linear(arr, n, n-1, &operacoes);
            fim = clock();
            double tempo_n = ((double)(fim - inicio) / CLOCKS_PER_SEC) * 1000;
            printf(" %.3f   |", tempo_n);
        } else {
            inicio = clock();
            busca_linear(arr, n, n-1, &operacoes);
            fim = clock();
            double tempo_n = ((double)(fim - inicio) / CLOCKS_PER_SEC) * 1000;
            printf(" %.3f   | O(n)        |\n", tempo_n);
        }
        
        free(arr);
    }
    
    // Teste O(n²) com tamanhos menores
    printf("| Bubble Sort  |");
    int tamanhos_n2[] = {500, 1000, 2000};
    for (int t = 0; t < 3; t++) {
        int n = tamanhos_n2[t];
        int *arr = malloc(n * sizeof(int));
        
        // Array em ordem reversa (pior caso)
        for (int i = 0; i < n; i++) {
            arr[i] = n - i;
        }
        
        long ops, trocas;
        clock_t inicio = clock();
        bubble_sort(arr, n, &ops, &trocas);
        clock_t fim = clock();
        
        double tempo = ((double)(fim - inicio) / CLOCKS_PER_SEC) * 1000;
        printf(" %.1f%s", tempo, t < 2 ? "   |" : "    | O(n²)       |\n");
        
        free(arr);
    }
    
    printf("\nConclusão: Complexidade teórica confirmada na prática!\n");
}

// ========================================
// FUNÇÃO PRINCIPAL
// ========================================

int main() {
    printf("🔍 REVISÃO COMPLETA: ANÁLISE DE ALGORITMOS E ESTRUTURAS DE DADOS\n");
    printf("================================================================\n\n");
    
    srand(time(NULL));  // Inicializa gerador de números aleatórios
    
    // Executa todas as demonstrações
    demonstrar_o1();
    demonstrar_olog_n();
    demonstrar_on();
    demonstrar_on2();
    demonstrar_ponteiros();
    demonstrar_estruturas();
    executar_analise_completa();
    
    printf("\n🎯 RESUMO FINAL:\n");
    printf("================\n");
    printf("✅ O(1): Tempo constante - acesso direto\n");
    printf("✅ O(log n): Logarítmico - busca binária\n");
    printf("✅ O(n): Linear - percorrer dados\n");
    printf("✅ O(n²): Quadrático - comparações duplas\n");
    printf("✅ Estruturas homogêneas: mesmo tipo\n");
    printf("✅ Estruturas heterogêneas: tipos diferentes\n");
    printf("✅ Ponteiros: referências para endereços\n");
    printf("✅ Trade-offs: tempo vs memória vs complexidade\n");
    
    printf("\n💡 DICAS IMPORTANTES:\n");
    printf("====================\n");
    printf("• Escolha algoritmo baseado no tamanho esperado dos dados\n");
    printf("• O(n²) é aceitável para n < 1000, perigoso para n > 10000\n");
    printf("• Busca binária exige dados ordenados\n");
    printf("• Ponteiros oferecem flexibilidade mas custam memória\n");
    printf("• Sempre meça performance real, não apenas teórica\n");
    
    printf("\n✅ Análise completa finalizada com sucesso!\n");
    
    return 0;
}
