# Laboratório 01: Introdução aos Algoritmos e Funções

**Disciplina:** Algoritmos e Complexidade  
**Professor:** Vagner Cordeiro  
**Duração:** 4 horas  
**Pré-requisitos:** Conhecimentos básicos de programação  

---

## Objetivos

Ao final deste laboratório, o estudante será capaz de:
- Implementar e testar algoritmos básicos em C
- Criar e utilizar funções modulares
- Compreender o conceito de complexidade de tempo na prática
- Configurar e utilizar ambientes de desenvolvimento (VS Code e Code::Blocks)
- Medir e comparar tempos de execução de algoritmos

---

## Configuração do Ambiente

### Opção 1: Visual Studio Code

**Passo 1: Instalação do VS Code**
1. Baixe o VS Code em: https://code.visualstudio.com/
2. Execute o instalador e siga as instruções padrão
3. Abra o VS Code após a instalação

**Passo 2: Instalação da Extensão C/C++**
1. Pressione `Ctrl+Shift+X` para abrir Extensions
2. Digite "C/C++" na barra de pesquisa
3. Instale a extensão "C/C++" da Microsoft
4. Instale também "Code Runner" para execução rápida

**Passo 3: Configuração do Compilador (Windows)**
1. Baixe o MinGW-w64: https://www.mingw-w64.org/downloads/
2. Extraia em `C:\mingw64`
3. Adicione `C:\mingw64\bin` ao PATH do sistema:
   - Vá em Configurações > Sistema > Sobre > Configurações avançadas do sistema
   - Clique em "Variáveis de Ambiente"
   - Edite a variável PATH e adicione `C:\mingw64\bin`
4. Reinicie o VS Code

**Passo 4: Teste da Instalação**
1. Crie uma nova pasta `Laboratorio01`
2. Abra a pasta no VS Code (`Ctrl+K, Ctrl+O`)
3. Crie um arquivo `teste.c`
4. Digite o código:
```c
#include <stdio.h>
int main() {
    printf("Ambiente configurado com sucesso!\n");
    return 0;
}
```
5. Pressione `Ctrl+F5` para compilar e executar

### Opção 2: Code::Blocks

**Passo 1: Instalação**
1. Baixe o Code::Blocks com MinGW: https://www.codeblocks.org/downloads/
2. Escolha a versão "codeblocks-XX.XX-mingw-setup.exe"
3. Execute o instalador seguindo as instruções padrão

**Passo 2: Configuração**
1. Abra o Code::Blocks
2. Vá em Settings > Compiler
3. Verifique se "GNU GCC Compiler" está selecionado
4. Teste criando um novo projeto:
   - File > New > Project
   - Console Application > C
   - Nomeie como "teste"
   - Compile e execute com F9

---

## Exercício 1: Primeiras Funções

### Objetivo
Implementar funções básicas e medir sua complexidade.

### Código Base

Crie um arquivo `exercicio01.c`:

```c
#include <stdio.h>
#include <time.h>
#include <stdlib.h>

// Função 1: Quadrado de um número
int quadrado(int numero) {
    return numero * numero;
}

// Função 2: Soma de dois números
int somar(int a, int b) {
    return a + b;
}

// Função 3: Verificar se número é par
int eh_par(int numero) {
    return numero % 2 == 0;
}

// Função 4: Calcular fatorial (versão iterativa)
long long fatorial(int n) {
    if (n < 0) return -1; // Erro
    if (n <= 1) return 1;
    
    long long resultado = 1;
    for (int i = 2; i <= n; i++) {
        resultado *= i;
    }
    return resultado;
}

// Função para medir tempo de execução
double medir_tempo(clock_t inicio, clock_t fim) {
    return ((double)(fim - inicio)) / CLOCKS_PER_SEC;
}

int main() {
    printf("=== LABORATÓRIO 01: FUNÇÕES BÁSICAS ===\n\n");
    
    // Teste das funções básicas
    int num = 7;
    printf("Teste das funções básicas:\n");
    printf("Quadrado de %d: %d\n", num, quadrado(num));
    printf("Soma de %d + 5: %d\n", num, somar(num, 5));
    printf("%d é par? %s\n", num, eh_par(num) ? "Sim" : "Não");
    
    // Teste de performance do fatorial
    printf("\nTeste de performance - Fatorial:\n");
    
    for (int n = 10; n <= 20; n += 2) {
        clock_t inicio = clock();
        long long resultado = fatorial(n);
        clock_t fim = clock();
        
        double tempo = medir_tempo(inicio, fim);
        printf("Fatorial(%d) = %lld (Tempo: %.6f segundos)\n", 
               n, resultado, tempo);
    }
    
    return 0;
}
```

### Instruções de Execução

**No VS Code:**
1. Salve o arquivo como `exercicio01.c`
2. Pressione `Ctrl+F5` para compilar e executar
3. Observe a saída no terminal

**No Code::Blocks:**
1. File > New > File
2. Cole o código e salve como `exercicio01.c`
3. Build > Build and Run (F9)

### Análise dos Resultados

Complete a tabela abaixo com os tempos observados:

| n | Fatorial(n) | Tempo (segundos) | Observações |
|---|-------------|------------------|-------------|
| 10 | | | |
| 12 | | | |
| 14 | | | |
| 16 | | | |
| 18 | | | |
| 20 | | | |

**Questões para Reflexão:**
1. O tempo de execução aumenta conforme n cresce?
2. O crescimento é linear, quadrático ou outro?
3. Qual a complexidade de tempo da função fatorial?

---

## Exercício 2: Comparação de Algoritmos de Busca

### Objetivo
Implementar e comparar busca linear vs busca binária.

### Código Base

Crie um arquivo `exercicio02.c`:

```c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

// Função de busca linear
int busca_linear(int arr[], int n, int valor) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == valor) {
            return i; // Retorna a posição encontrada
        }
    }
    return -1; // Não encontrado
}

// Função de busca binária (array deve estar ordenado)
int busca_binaria(int arr[], int n, int valor) {
    int inicio = 0;
    int fim = n - 1;
    
    while (inicio <= fim) {
        int meio = inicio + (fim - inicio) / 2;
        
        if (arr[meio] == valor) {
            return meio;
        }
        
        if (arr[meio] < valor) {
            inicio = meio + 1;
        } else {
            fim = meio - 1;
        }
    }
    
    return -1; // Não encontrado
}

// Função para preencher array ordenado
void preencher_array_ordenado(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        arr[i] = i * 2; // Números pares: 0, 2, 4, 6, ...
    }
}

// Função para imprimir array (limitado a 20 elementos)
void imprimir_array(int arr[], int n) {
    int limite = n > 20 ? 20 : n;
    printf("Array[%d elementos]: ", n);
    for (int i = 0; i < limite; i++) {
        printf("%d ", arr[i]);
    }
    if (n > 20) printf("...");
    printf("\n");
}

int main() {
    printf("=== LABORATÓRIO 01: COMPARAÇÃO DE ALGORITMOS DE BUSCA ===\n\n");
    
    // Tamanhos de teste
    int tamanhos[] = {100, 1000, 10000, 100000};
    int num_tamanhos = sizeof(tamanhos) / sizeof(tamanhos[0]);
    
    for (int t = 0; t < num_tamanhos; t++) {
        int n = tamanhos[t];
        printf("--- Teste com %d elementos ---\n", n);
        
        // Aloca e preenche o array
        int *arr = (int*)malloc(n * sizeof(int));
        preencher_array_ordenado(arr, n);
        
        if (n <= 20) {
            imprimir_array(arr, n);
        }
        
        // Valor a buscar (escolhe um valor que existe)
        int valor_busca = (n - 1) * 2; // Último elemento
        printf("Buscando valor: %d\n", valor_busca);
        
        // Teste busca linear
        clock_t inicio = clock();
        int pos_linear = busca_linear(arr, n, valor_busca);
        clock_t fim = clock();
        double tempo_linear = ((double)(fim - inicio)) / CLOCKS_PER_SEC;
        
        // Teste busca binária
        inicio = clock();
        int pos_binaria = busca_binaria(arr, n, valor_busca);
        fim = clock();
        double tempo_binaria = ((double)(fim - inicio)) / CLOCKS_PER_SEC;
        
        // Resultados
        printf("Busca Linear:  Posição %d, Tempo: %.6f segundos\n", 
               pos_linear, tempo_linear);
        printf("Busca Binária: Posição %d, Tempo: %.6f segundos\n", 
               pos_binaria, tempo_binaria);
        
        if (tempo_linear > 0 && tempo_binaria > 0) {
            printf("Speedup: %.2fx mais rápida\n", tempo_linear / tempo_binaria);
        }
        
        printf("\n");
        
        free(arr);
    }
    
    return 0;
}
```

### Análise dos Resultados

Complete a tabela com os tempos observados:

| Tamanho | Busca Linear (s) | Busca Binária (s) | Speedup | Complexidade Observada |
|---------|------------------|-------------------|---------|----------------------|
| 100 | | | | |
| 1.000 | | | | |
| 10.000 | | | | |
| 100.000 | | | | |

**Questões de Análise:**
1. Como o tempo da busca linear cresce com o tamanho do array?
2. Como o tempo da busca binária cresce com o tamanho do array?
3. Qual o speedup máximo observado?
4. Por que a busca binária é mais rápida?

---

## Exercício 3: Análise de Complexidade Prática

### Objetivo
Implementar algoritmos com diferentes complexidades e observar o comportamento prático.

### Código Base

Crie um arquivo `exercicio03.c`:

```c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

// Algoritmo O(1) - Acesso direto
int acesso_direto(int arr[], int posicao) {
    return arr[posicao];
}

// Algoritmo O(n) - Soma de elementos
long long soma_array(int arr[], int n) {
    long long soma = 0;
    for (int i = 0; i < n; i++) {
        soma += arr[i];
    }
    return soma;
}

// Algoritmo O(n²) - Bubble Sort simplificado
void bubble_sort_contagem(int arr[], int n, long long *comparacoes) {
    *comparacoes = 0;
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            (*comparacoes)++;
            if (arr[j] > arr[j + 1]) {
                // Troca elementos
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

// Algoritmo O(log n) - Busca binária com contagem
int busca_binaria_contagem(int arr[], int n, int valor, int *comparacoes) {
    *comparacoes = 0;
    int inicio = 0;
    int fim = n - 1;
    
    while (inicio <= fim) {
        (*comparacoes)++;
        int meio = inicio + (fim - inicio) / 2;
        
        if (arr[meio] == valor) {
            return meio;
        }
        
        if (arr[meio] < valor) {
            inicio = meio + 1;
        } else {
            fim = meio - 1;
        }
    }
    
    return -1;
}

// Função para preencher array com valores aleatórios
void preencher_aleatorio(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        arr[i] = rand() % 1000;
    }
}

int main() {
    printf("=== LABORATÓRIO 01: ANÁLISE PRÁTICA DE COMPLEXIDADE ===\n\n");
    
    srand(time(NULL)); // Seed para números aleatórios
    
    int tamanhos[] = {100, 200, 400, 800, 1600};
    int num_tamanhos = sizeof(tamanhos) / sizeof(tamanhos[0]);
    
    printf("Análise de Complexidades:\n");
    printf("%-8s %-12s %-12s %-15s %-15s\n", 
           "Tamanho", "O(1)", "O(log n)", "O(n)", "O(n²)");
    printf("%-8s %-12s %-12s %-15s %-15s\n", 
           "-------", "----", "--------", "-----", "-----");
    
    for (int t = 0; t < num_tamanhos; t++) {
        int n = tamanhos[t];
        
        // Prepara arrays
        int *arr = (int*)malloc(n * sizeof(int));
        int *arr_ordenado = (int*)malloc(n * sizeof(int));
        
        preencher_aleatorio(arr, n);
        
        // Cria versão ordenada para busca binária
        for (int i = 0; i < n; i++) {
            arr_ordenado[i] = i;
        }
        
        // Teste O(1) - Acesso direto
        clock_t inicio = clock();
        for (int rep = 0; rep < 1000; rep++) {
            acesso_direto(arr, n/2);
        }
        clock_t fim = clock();
        double tempo_o1 = ((double)(fim - inicio)) / CLOCKS_PER_SEC;
        
        // Teste O(log n) - Busca binária
        inicio = clock();
        int comparacoes_log;
        busca_binaria_contagem(arr_ordenado, n, n/2, &comparacoes_log);
        fim = clock();
        double tempo_log_n = ((double)(fim - inicio)) / CLOCKS_PER_SEC;
        
        // Teste O(n) - Soma
        inicio = clock();
        soma_array(arr, n);
        fim = clock();
        double tempo_n = ((double)(fim - inicio)) / CLOCKS_PER_SEC;
        
        // Teste O(n²) - Bubble sort (só para arrays pequenos)
        double tempo_n2 = 0;
        long long comparacoes_n2 = 0;
        if (n <= 800) { // Limita para não demorar muito
            int *arr_copia = (int*)malloc(n * sizeof(int));
            for (int i = 0; i < n; i++) arr_copia[i] = arr[i];
            
            inicio = clock();
            bubble_sort_contagem(arr_copia, n, &comparacoes_n2);
            fim = clock();
            tempo_n2 = ((double)(fim - inicio)) / CLOCKS_PER_SEC;
            
            free(arr_copia);
        }
        
        // Imprime resultados
        printf("%-8d %-12.6f %-12.6f %-15.6f ", 
               n, tempo_o1, tempo_log_n, tempo_n);
        
        if (tempo_n2 > 0) {
            printf("%-15.6f", tempo_n2);
        } else {
            printf("%-15s", "N/A");
        }
        printf("\n");
        
        free(arr);
        free(arr_ordenado);
    }
    
    printf("\nObservações:\n");
    printf("- O(1): Tempo constante, independe do tamanho\n");
    printf("- O(log n): Cresce muito lentamente\n");
    printf("- O(n): Cresce linearmente\n");
    printf("- O(n²): Cresce quadraticamente (muito rápido!)\n");
    
    return 0;
}
```

### Análise dos Resultados

Complete a tabela com os tempos observados:

| Tamanho | O(1) | O(log n) | O(n) | O(n²) | Observações |
|---------|------|----------|------|-------|-------------|
| 100 | | | | | |
| 200 | | | | | |
| 400 | | | | | |
| 800 | | | | | |
| 1600 | | | | | |

---

## Relatório Final

### Instruções para o Relatório

Crie um documento contendo:

1. **Configuração do Ambiente** (0,5 pontos)
   - Screenshot do ambiente funcionando
   - Problemas encontrados e soluções

2. **Análise dos Exercícios** (2,0 pontos)
   - Tabelas preenchidas com resultados
   - Gráficos dos tempos vs tamanho (opcional)
   - Respostas às questões de reflexão

3. **Conclusões** (1,0 pontos)
   - Qual algoritmo foi mais eficiente em cada caso?
   - Como os tempos crescem com o tamanho da entrada?
   - Relação entre teoria e prática observada

4. **Código Comentado** (1,5 pontos)
   - Códigos com comentários explicativos
   - Modificações implementadas (se houver)

### Entrega

- **Formato:** PDF com códigos .c anexados
- **Prazo:** Uma semana após a aula
- **Valor:** 5,0 pontos

---

## Recursos Adicionais

### Comandos Úteis

**Compilação manual (terminal):**
```bash
gcc exercicio01.c -o exercicio01.exe
./exercicio01.exe
```

**Compilação com otimização:**
```bash
gcc -O2 exercicio01.c -o exercicio01.exe
```

### Dicas de Debugging

1. Use `printf` para verificar valores intermediários
2. Compile com `-g` para debugging
3. Use breakpoints no VS Code (F9)
4. Verifique limites de arrays para evitar segmentation fault

### Próximos Laboratórios

- **Lab 02:** Estruturas de Dados (Arrays e Structs)
- **Lab 03:** Ponteiros e Alocação Dinâmica
- **Lab 04:** Algoritmos de Ordenação
- **Lab 05:** Árvores Binárias

---

**Bom trabalho!**
