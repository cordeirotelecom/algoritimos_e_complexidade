/*
 * ESTRUTURAS DE DADOS SIMPLES - Exemplos Práticos
 * Homogêneas, Heterogêneas e Ponteiros
 * 
 * Cada linha comentada com sua complexidade
 * Códigos simples e didáticos
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

// ====================================
// 1. ESTRUTURAS HOMOGÊNEAS (ARRAYS)
// ====================================

/* Exemplo 1: Array simples de inteiros */
void exemplo_array_basico() {
    printf("\n=== ARRAY HOMOGÊNEO ===\n");
    
    int numeros[5];                                      // O(1) - alocação estática
    
    // Preenchimento - O(n)
    printf("Preenchendo array:\n");
    for (int i = 0; i < 5; i++) {                        // O(n) - loop executa 5 vezes
        numeros[i] = (i + 1) * 10;                       // O(1) - cálculo e atribuição
        printf("numeros[%d] = %d\n", i, numeros[i]);    // O(1) - impressão
    }
    
    // Acesso direto - O(1)
    printf("\nAcesso direto:\n");
    int valor = numeros[2];                              // O(1) - acesso por índice
    printf("Elemento na posição 2: %d\n", valor);       // O(1) - impressão
    
    // Busca linear - O(n)
    printf("\nBuscando valor 30:\n");
    int procurado = 30;
    int encontrado = -1;
    for (int i = 0; i < 5; i++) {                        // O(n) - pior caso: percorre tudo
        if (numeros[i] == procurado) {                   // O(1) - comparação
            encontrado = i;                              // O(1) - atribuição
            break;                                       // O(1) - saída do loop
        }
    }
    
    if (encontrado != -1) {                              // O(1) - verificação
        printf("Valor %d encontrado na posição %d\n", procurado, encontrado);
    } else {
        printf("Valor %d não encontrado\n", procurado);
    }
}

/* Exemplo 2: Operações com array */
int somar_array(int arr[], int tamanho) {
    printf("\nSomando elementos do array:\n");
    
    int soma = 0;                                        // O(1) - inicialização
    
    for (int i = 0; i < tamanho; i++) {                  // O(n) - loop n vezes
        soma += arr[i];                                  // O(1) - soma e acesso
        printf("Somando arr[%d] = %d, total = %d\n", i, arr[i], soma);
    }
    
    return soma;                                         // O(1) - retorno
    // Complexidade total: O(n)
}

// ====================================
// 2. ESTRUTURAS HETEROGÊNEAS (STRUCTS)
// ====================================

/* Definição de struct simples */
typedef struct {
    char nome[30];        // Array de caracteres
    int idade;           // Inteiro
    float salario;       // Número decimal
} Funcionario;

/* Exemplo 3: Criando e usando struct */
void exemplo_struct_basico() {
    printf("\n=== STRUCT HETEROGÊNEA ===\n");
    
    // Criação - O(1) para campos numéricos, O(n) para strings
    Funcionario func1;                                   // O(1) - aloca espaço na stack
    
    strcpy(func1.nome, "Ana Silva");                     // O(n) - copia string (n = tamanho)
    func1.idade = 28;                                    // O(1) - atribuição direta
    func1.salario = 3500.50;                             // O(1) - atribuição direta
    
    // Exibição - O(1) para acessos diretos
    printf("Dados do funcionário:\n");
    printf("Nome: %s\n", func1.nome);                   // O(1) - acesso direto ao campo
    printf("Idade: %d anos\n", func1.idade);            // O(1) - acesso direto
    printf("Salário: R$ %.2f\n", func1.salario);        // O(1) - acesso direto
    
    // Modificação - O(1)
    func1.salario = func1.salario * 1.10;               // O(1) - cálculo e atribuição
    printf("Novo salário (aumento 10%%): R$ %.2f\n", func1.salario);
}

/* Exemplo 4: Array de structs */
void exemplo_array_structs() {
    printf("\n=== ARRAY DE STRUCTS ===\n");
    
    Funcionario empresa[3];                              // O(1) - aloca array de structs
    
    // Preenchimento - O(n×m) onde n=funcionários, m=tamanho médio do nome
    strcpy(empresa[0].nome, "João");                     // O(m) - copia string
    empresa[0].idade = 30;                               // O(1)
    empresa[0].salario = 4000.0;                         // O(1)
    
    strcpy(empresa[1].nome, "Maria");                    // O(m)
    empresa[1].idade = 25;                               // O(1)
    empresa[1].salario = 3800.0;                         // O(1)
    
    strcpy(empresa[2].nome, "Pedro");                    // O(m)
    empresa[2].idade = 35;                               // O(1)
    empresa[2].salario = 4500.0;                         // O(1)
    
    // Exibir todos - O(n)
    printf("Lista de funcionários:\n");
    for (int i = 0; i < 3; i++) {                        // O(n) - loop pelos funcionários
        printf("%d. %s, %d anos, R$ %.2f\n", 
               i+1, empresa[i].nome, empresa[i].idade, empresa[i].salario); // O(1) - acesso e impressão
    }
    
    // Buscar funcionário mais bem pago - O(n)
    int indice_maior_salario = 0;                        // O(1) - inicialização
    for (int i = 1; i < 3; i++) {                        // O(n) - percorre funcionários
        if (empresa[i].salario > empresa[indice_maior_salario].salario) { // O(1) - comparação
            indice_maior_salario = i;                    // O(1) - atualização
        }
    }
    
    printf("Maior salário: %s (R$ %.2f)\n", 
           empresa[indice_maior_salario].nome, empresa[indice_maior_salario].salario);
}

// ====================================
// 3. PONTEIROS
// ====================================

/* Exemplo 5: Ponteiros básicos */
void exemplo_ponteiros_simples() {
    printf("\n=== PONTEIROS BÁSICOS ===\n");
    
    int numero = 42;                                     // O(1) - cria variável
    int* ptr = &numero;                                  // O(1) - ptr guarda endereço de numero
    
    printf("Valor original: %d\n", numero);             // O(1) - acesso direto
    printf("Endereço da variável: %p\n", &numero);      // O(1) - pega endereço
    printf("Valor do ponteiro: %p\n", ptr);             // O(1) - mostra endereço armazenado
    printf("Valor via ponteiro: %d\n", *ptr);           // O(1) - desreferenciamento
    
    // Alteração via ponteiro - O(1)
    *ptr = 100;                                          // O(1) - altera valor via ponteiro
    printf("Novo valor: %d\n", numero);                 // O(1) - numero foi alterado!
}

/* Exemplo 6: Função que troca valores usando ponteiros */
void trocar_valores(int* a, int* b) {
    printf("Trocando valores via ponteiros:\n");
    printf("Antes: *a = %d, *b = %d\n", *a, *b);       // O(1) - acesso via ponteiro
    
    int temp = *a;                                       // O(1) - copia valor de a
    *a = *b;                                             // O(1) - a recebe valor de b
    *b = temp;                                           // O(1) - b recebe valor original de a
    
    printf("Depois: *a = %d, *b = %d\n", *a, *b);      // O(1) - verificação
    // Complexidade total: O(1)
}

/* Exemplo 7: Alocação dinâmica simples */
void exemplo_alocacao_dinamica() {
    printf("\n=== ALOCAÇÃO DINÂMICA ===\n");
    
    int tamanho = 5;
    printf("Criando array dinâmico de %d elementos:\n", tamanho);
    
    // Alocação - O(1)
    int* arr = malloc(tamanho * sizeof(int));            // O(1) - aloca memória
    
    if (arr == NULL) {                                   // O(1) - verificação de erro
        printf("Erro: Não foi possível alocar memória!\n");
        return;
    }
    
    // Preenchimento - O(n)
    for (int i = 0; i < tamanho; i++) {                  // O(n) - loop n vezes
        arr[i] = i * i;  // Quadrado do índice            // O(1) - cálculo e atribuição
        printf("arr[%d] = %d\n", i, arr[i]);            // O(1) - impressão
    }
    
    // Soma usando aritmética de ponteiros - O(n)
    int soma = 0;                                        // O(1) - inicialização
    for (int i = 0; i < tamanho; i++) {                  // O(n) - loop
        soma += *(arr + i);  // Equivale a arr[i]        // O(1) - aritmética + acesso
        printf("Somando arr[%d] = %d, total = %d\n", i, *(arr + i), soma);
    }
    
    printf("Soma total: %d\n", soma);                   // O(1) - resultado
    
    // IMPORTANTE: Liberar memória - O(1)
    free(arr);                                           // O(1) - libera memória
    arr = NULL;                                          // O(1) - boa prática
    printf("Memória liberada com sucesso!\n");
}

/* Exemplo 8: Ponteiro para struct */
void exemplo_ponteiro_struct() {
    printf("\n=== PONTEIRO PARA STRUCT ===\n");
    
    // Criar funcionário - O(1) + O(n) para string
    Funcionario* emp = malloc(sizeof(Funcionario));      // O(1) - aloca struct dinamicamente
    
    if (emp == NULL) {                                   // O(1) - verificação
        printf("Erro de alocação!\n");
        return;
    }
    
    // Preenchimento usando ponteiro - O(1) + O(n) para string
    strcpy(emp->nome, "Carlos Santos");                  // O(n) - copia string
    emp->idade = 40;                                     // O(1) - acesso via seta
    emp->salario = 5000.0;                               // O(1) - acesso via seta
    
    // Exibição - O(1) para cada campo
    printf("Dados via ponteiro:\n");
    printf("Nome: %s\n", emp->nome);                     // O(1) - acesso direto
    printf("Idade: %d\n", emp->idade);                   // O(1) - acesso direto
    printf("Salário: R$ %.2f\n", emp->salario);          // O(1) - acesso direto
    
    // Modificação via ponteiro - O(1)
    emp->salario += 500.0;  // Aumento                   // O(1) - operação e atribuição
    printf("Novo salário: R$ %.2f\n", emp->salario);     // O(1) - verificação
    
    // Liberação - O(1)
    free(emp);                                           // O(1) - libera struct
    emp = NULL;                                          // O(1) - anula ponteiro
}

// ====================================
// FUNÇÃO PRINCIPAL
// ====================================

int main() {
    printf("DEMONSTRAÇÃO DE ESTRUTURAS DE DADOS\n");
    printf("==========================================\n");
    
    // Medir tempo total de execução
    clock_t inicio_programa = clock();                   // O(1) - marca tempo inicial
    
    // Executar exemplos
    exemplo_array_basico();                              // O(n) - arrays
    exemplo_struct_basico();                             // O(n) - structs  
    exemplo_array_structs();                             // O(n×m) - array de structs
    exemplo_ponteiros_simples();                         // O(1) - ponteiros básicos
    
    // Exemplo com troca de valores
    printf("\n=== TESTE DE TROCA ===\n");
    int x = 10, y = 20;                                  // O(1) - inicialização
    printf("Valores originais: x = %d, y = %d\n", x, y);
    trocar_valores(&x, &y);                              // O(1) - troca via ponteiros
    printf("Valores após troca: x = %d, y = %d\n", x, y);
    
    exemplo_alocacao_dinamica();                         // O(n) - alocação dinâmica
    exemplo_ponteiro_struct();                           // O(n) - ponteiro para struct
    
    // Tempo total
    clock_t fim_programa = clock();                      // O(1) - marca tempo final
    double tempo_total = ((double)(fim_programa - inicio_programa)) / CLOCKS_PER_SEC;
    
    printf("\n==========================================\n");
    printf("Tempo total de execução: %.6f segundos\n", tempo_total);
    printf("Programa finalizado com sucesso!\n");
    
    return 0;                                            // O(1) - retorno
}

/*
 * RESUMO DE COMPLEXIDADES:
 * 
 * Arrays:
 * - Acesso: O(1)
 * - Busca: O(n)
 * - Preenchimento: O(n)
 * 
 * Structs:
 * - Acesso a campo: O(1)
 * - Cópia de string: O(n)
 * - Comparação: O(1) para números, O(n) para strings
 * 
 * Ponteiros:
 * - Declaração: O(1)
 * - Atribuição: O(1)
 * - Desreferenciamento: O(1)
 * - Aritmética: O(1)
 * 
 * Alocação Dinâmica:
 * - malloc(): O(1)
 * - free(): O(1)
 * - Preenchimento: O(n)
 */
