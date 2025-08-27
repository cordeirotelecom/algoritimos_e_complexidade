# Aula 02: Estruturas de Dados - Homogêneas, Heterogêneas e Ponteiros

**Disciplina:** Algoritmos e Complexidade  
**Professor:** Vagner Cordeiro  
**Carga Horária:** 4 horas  

## Objetivos de Aprendizagem

Ao final desta aula, o estudante será capaz de:
- Compreender e utilizar estruturas de dados homogêneas (arrays)
- Dominar estruturas de dados heterogêneas (structs)
- Aplicar conceitos de ponteiros e gerenciamento de memória
- Escolher a estrutura de dados adequada para cada problema

## 1. Estruturas de Dados Homogêneas

### 1.1 Arrays (Vetores)

**Arrays** são estruturas que armazenam elementos do **mesmo tipo** em posições consecutivas de memória.

#### 1.1.1 Declaração e Inicialização

```c
#include <stdio.h>

int main() {
    // Declaração básica
    int numeros[5];
    
    // Declaração com inicialização
    int valores[] = {10, 20, 30, 40, 50};
    
    // Declaração com tamanho e inicialização parcial
    int dados[10] = {1, 2, 3}; // Resto será 0
    
    // Inicialização com todos os elementos
    float notas[4] = {8.5, 7.2, 9.1, 6.8};
    
    return 0;
}
```

#### 1.1.2 Acesso e Manipulação

```c
#include <stdio.h>

void imprime_array(int arr[], int tamanho) {
    printf("Array: ");
    for (int i = 0; i < tamanho; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

int main() {
    int numeros[5] = {10, 20, 30, 40, 50};
    
    // Acesso aos elementos
    printf("Primeiro elemento: %d\n", numeros[0]);
    printf("Último elemento: %d\n", numeros[4]);
    
    // Modificação de elementos
    numeros[2] = 35;
    
    imprime_array(numeros, 5);
    
    return 0;
}
```

#### 1.1.3 Operações Básicas em Arrays

```c
#include <stdio.h>

// Busca linear
int busca_linear(int arr[], int tamanho, int elemento) {
    for (int i = 0; i < tamanho; i++) {
        if (arr[i] == elemento) {
            return i; // Retorna a posição
        }
    }
    return -1; // Não encontrado
}

// Soma dos elementos
int soma_array(int arr[], int tamanho) {
    int soma = 0;
    for (int i = 0; i < tamanho; i++) {
        soma += arr[i];
    }
    return soma;
}

// Encontra o maior elemento
int maior_elemento(int arr[], int tamanho) {
    int maior = arr[0];
    for (int i = 1; i < tamanho; i++) {
        if (arr[i] > maior) {
            maior = arr[i];
        }
    }
    return maior;
}

int main() {
    int numeros[] = {15, 3, 27, 8, 42, 11};
    int tamanho = 6;
    
    printf("Soma: %d\n", soma_array(numeros, tamanho));
    printf("Maior: %d\n", maior_elemento(numeros, tamanho));
    
    int buscar = 27;
    int posicao = busca_linear(numeros, tamanho, buscar);
    if (posicao != -1) {
        printf("%d encontrado na posição %d\n", buscar, posicao);
    } else {
        printf("%d não encontrado\n", buscar);
    }
    
    return 0;
}
```

### 1.2 Matrizes (Arrays Bidimensionais)

```c
#include <stdio.h>

void imprime_matriz(int matriz[][3], int linhas) {
    for (int i = 0; i < linhas; i++) {
        for (int j = 0; j < 3; j++) {
            printf("%d ", matriz[i][j]);
        }
        printf("\n");
    }
}

void soma_matrizes(int a[][3], int b[][3], int resultado[][3], int linhas) {
    for (int i = 0; i < linhas; i++) {
        for (int j = 0; j < 3; j++) {
            resultado[i][j] = a[i][j] + b[i][j];
        }
    }
}

int main() {
    int matriz1[2][3] = {{1, 2, 3}, {4, 5, 6}};
    int matriz2[2][3] = {{7, 8, 9}, {10, 11, 12}};
    int soma[2][3];
    
    printf("Matriz 1:\n");
    imprime_matriz(matriz1, 2);
    
    printf("Matriz 2:\n");
    imprime_matriz(matriz2, 2);
    
    soma_matrizes(matriz1, matriz2, soma, 2);
    
    printf("Soma:\n");
    imprime_matriz(soma, 2);
    
    return 0;
}
```

## 2. Estruturas de Dados Heterogêneas

### 2.1 Structs (Estruturas)

**Structs** permitem agrupar dados de **diferentes tipos** sob um mesmo nome.

#### 2.1.1 Definição e Uso Básico

```c
#include <stdio.h>
#include <string.h>

// Definição da estrutura
struct Pessoa {
    char nome[50];
    int idade;
    float altura;
};

int main() {
    // Declaração e inicialização
    struct Pessoa pessoa1;
    strcpy(pessoa1.nome, "João Silva");
    pessoa1.idade = 25;
    pessoa1.altura = 1.75;
    
    // Inicialização direta
    struct Pessoa pessoa2 = {"Maria Santos", 30, 1.68};
    
    // Exibindo dados
    printf("Pessoa 1: %s, %d anos, %.2fm\n", 
           pessoa1.nome, pessoa1.idade, pessoa1.altura);
    printf("Pessoa 2: %s, %d anos, %.2fm\n", 
           pessoa2.nome, pessoa2.idade, pessoa2.altura);
    
    return 0;
}
```

#### 2.1.2 Arrays de Structs

```c
#include <stdio.h>
#include <string.h>

struct Aluno {
    int matricula;
    char nome[50];
    float nota1, nota2, nota3;
    float media;
};

void calcula_media(struct Aluno *aluno) {
    aluno->media = (aluno->nota1 + aluno->nota2 + aluno->nota3) / 3.0;
}

void imprime_aluno(struct Aluno aluno) {
    printf("Matrícula: %d\n", aluno.matricula);
    printf("Nome: %s\n", aluno.nome);
    printf("Notas: %.1f, %.1f, %.1f\n", aluno.nota1, aluno.nota2, aluno.nota3);
    printf("Média: %.2f\n", aluno.media);
    printf("Situação: %s\n\n", aluno.media >= 7.0 ? "Aprovado" : "Reprovado");
}

int main() {
    struct Aluno turma[3];
    
    // Cadastro dos alunos
    turma[0] = (struct Aluno){1001, "Ana Costa", 8.5, 7.2, 9.0, 0};
    turma[1] = (struct Aluno){1002, "Bruno Lima", 6.0, 5.5, 7.0, 0};
    turma[2] = (struct Aluno){1003, "Carlos Dias", 9.0, 8.5, 9.5, 0};
    
    // Calcula médias e exibe dados
    for (int i = 0; i < 3; i++) {
        calcula_media(&turma[i]);
        imprime_aluno(turma[i]);
    }
    
    return 0;
}
```

#### 2.1.3 Structs Aninhadas

```c
#include <stdio.h>
#include <string.h>

struct Endereco {
    char rua[100];
    int numero;
    char cidade[50];
    char cep[10];
};

struct Funcionario {
    int id;
    char nome[50];
    float salario;
    struct Endereco endereco;
};

void imprime_funcionario(struct Funcionario func) {
    printf("ID: %d\n", func.id);
    printf("Nome: %s\n", func.nome);
    printf("Salário: R$ %.2f\n", func.salario);
    printf("Endereço: %s, %d\n", func.endereco.rua, func.endereco.numero);
    printf("Cidade: %s - CEP: %s\n\n", func.endereco.cidade, func.endereco.cep);
}

int main() {
    struct Funcionario func1;
    func1.id = 100;
    strcpy(func1.nome, "Pedro Oliveira");
    func1.salario = 3500.00;
    strcpy(func1.endereco.rua, "Rua das Flores");
    func1.endereco.numero = 123;
    strcpy(func1.endereco.cidade, "São Paulo");
    strcpy(func1.endereco.cep, "01234-567");
    
    imprime_funcionario(func1);
    
    return 0;
}
```

## 3. Ponteiros

### 3.1 Conceitos Fundamentais

**Ponteiros** são variáveis que armazenam **endereços de memória** de outras variáveis.

```c
#include <stdio.h>

int main() {
    int numero = 42;
    int *ponteiro;  // Declaração do ponteiro
    
    ponteiro = &numero;  // Ponteiro recebe o endereço de numero
    
    printf("Valor de numero: %d\n", numero);
    printf("Endereço de numero: %p\n", &numero);
    printf("Valor do ponteiro: %p\n", ponteiro);
    printf("Valor apontado pelo ponteiro: %d\n", *ponteiro);
    
    // Modificando valor através do ponteiro
    *ponteiro = 100;
    printf("Novo valor de numero: %d\n", numero);
    
    return 0;
}
```

### 3.2 Ponteiros e Arrays

```c
#include <stdio.h>

void imprime_array_ponteiro(int *arr, int tamanho) {
    printf("Array via ponteiro: ");
    for (int i = 0; i < tamanho; i++) {
        printf("%d ", *(arr + i));  // Aritmética de ponteiros
    }
    printf("\n");
}

void modifica_array(int *arr, int tamanho) {
    for (int i = 0; i < tamanho; i++) {
        arr[i] = arr[i] * 2;
    }
}

int main() {
    int numeros[] = {1, 2, 3, 4, 5};
    int tamanho = 5;
    
    printf("Array original: ");
    for (int i = 0; i < tamanho; i++) {
        printf("%d ", numeros[i]);
    }
    printf("\n");
    
    imprime_array_ponteiro(numeros, tamanho);
    
    modifica_array(numeros, tamanho);
    
    printf("Array modificado: ");
    for (int i = 0; i < tamanho; i++) {
        printf("%d ", numeros[i]);
    }
    printf("\n");
    
    return 0;
}
```

### 3.3 Ponteiros e Structs

```c
#include <stdio.h>
#include <string.h>

struct Produto {
    int codigo;
    char nome[50];
    float preco;
};

void atualiza_preco(struct Produto *produto, float novo_preco) {
    produto->preco = novo_preco;  // Acesso via ponteiro
}

void imprime_produto(struct Produto *produto) {
    printf("Código: %d\n", produto->codigo);
    printf("Nome: %s\n", produto->nome);
    printf("Preço: R$ %.2f\n\n", produto->preco);
}

int main() {
    struct Produto produto1 = {100, "Notebook", 2500.00};
    
    printf("Produto antes da atualização:\n");
    imprime_produto(&produto1);
    
    atualiza_preco(&produto1, 2300.00);
    
    printf("Produto após atualização:\n");
    imprime_produto(&produto1);
    
    return 0;
}
```

### 3.4 Alocação Dinâmica de Memória

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int tamanho;
    
    printf("Digite o tamanho do array: ");
    scanf("%d", &tamanho);
    
    // Alocação dinâmica
    int *array = (int*)malloc(tamanho * sizeof(int));
    
    if (array == NULL) {
        printf("Erro na alocação de memória!\n");
        return 1;
    }
    
    // Preenchimento do array
    for (int i = 0; i < tamanho; i++) {
        array[i] = i + 1;
    }
    
    // Exibição do array
    printf("Array dinâmico: ");
    for (int i = 0; i < tamanho; i++) {
        printf("%d ", array[i]);
    }
    printf("\n");
    
    // Liberação da memória
    free(array);
    
    return 0;
}
```

## 4. Comparação e Escolha de Estruturas

### 4.1 Quando Usar Arrays

- **Elementos do mesmo tipo**
- **Tamanho conhecido** ou relativamente fixo
- **Acesso sequencial** ou por índice
- **Operações matemáticas** em conjuntos de dados

### 4.2 Quando Usar Structs

- **Dados relacionados** de tipos diferentes
- **Modelagem de entidades** do mundo real
- **Organização lógica** de informações
- **Criação de tipos de dados** personalizados

### 4.3 Quando Usar Ponteiros

- **Passagem por referência** eficiente
- **Alocação dinâmica** de memória
- **Implementação de estruturas** complexas
- **Otimização de performance**

## 5. Exemplo Prático Completo: Sistema de Biblioteca

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Livro {
    int codigo;
    char titulo[100];
    char autor[50];
    int ano;
    int disponivel;
};

struct Biblioteca {
    struct Livro *livros;
    int capacidade;
    int quantidade;
};

struct Biblioteca* criar_biblioteca(int capacidade) {
    struct Biblioteca *bib = (struct Biblioteca*)malloc(sizeof(struct Biblioteca));
    bib->livros = (struct Livro*)malloc(capacidade * sizeof(struct Livro));
    bib->capacidade = capacidade;
    bib->quantidade = 0;
    return bib;
}

void adicionar_livro(struct Biblioteca *bib, int codigo, char *titulo, char *autor, int ano) {
    if (bib->quantidade < bib->capacidade) {
        struct Livro *novo_livro = &bib->livros[bib->quantidade];
        novo_livro->codigo = codigo;
        strcpy(novo_livro->titulo, titulo);
        strcpy(novo_livro->autor, autor);
        novo_livro->ano = ano;
        novo_livro->disponivel = 1;
        bib->quantidade++;
        printf("Livro adicionado com sucesso!\n");
    } else {
        printf("Biblioteca lotada!\n");
    }
}

struct Livro* buscar_livro(struct Biblioteca *bib, int codigo) {
    for (int i = 0; i < bib->quantidade; i++) {
        if (bib->livros[i].codigo == codigo) {
            return &bib->livros[i];
        }
    }
    return NULL;
}

void emprestar_livro(struct Biblioteca *bib, int codigo) {
    struct Livro *livro = buscar_livro(bib, codigo);
    if (livro != NULL) {
        if (livro->disponivel) {
            livro->disponivel = 0;
            printf("Livro '%s' emprestado com sucesso!\n", livro->titulo);
        } else {
            printf("Livro não disponível para empréstimo.\n");
        }
    } else {
        printf("Livro não encontrado.\n");
    }
}

void listar_livros(struct Biblioteca *bib) {
    printf("\n=== ACERVO DA BIBLIOTECA ===\n");
    for (int i = 0; i < bib->quantidade; i++) {
        struct Livro *livro = &bib->livros[i];
        printf("Código: %d\n", livro->codigo);
        printf("Título: %s\n", livro->titulo);
        printf("Autor: %s\n", livro->autor);
        printf("Ano: %d\n", livro->ano);
        printf("Status: %s\n", livro->disponivel ? "Disponível" : "Emprestado");
        printf("----------------------------\n");
    }
}

void liberar_biblioteca(struct Biblioteca *bib) {
    free(bib->livros);
    free(bib);
}

int main() {
    struct Biblioteca *biblioteca = criar_biblioteca(10);
    
    // Adicionando livros
    adicionar_livro(biblioteca, 1, "Dom Casmurro", "Machado de Assis", 1899);
    adicionar_livro(biblioteca, 2, "O Cortiço", "Aluísio Azevedo", 1890);
    adicionar_livro(biblioteca, 3, "Iracema", "José de Alencar", 1865);
    
    // Listando livros
    listar_livros(biblioteca);
    
    // Emprestando um livro
    emprestar_livro(biblioteca, 1);
    
    // Listando novamente
    listar_livros(biblioteca);
    
    // Liberando memória
    liberar_biblioteca(biblioteca);
    
    return 0;
}
```

## 6. Exercícios Práticos

### 6.1 Arrays

1. Implemente uma função que inverta um array
2. Crie uma função que remova elementos duplicados de um array
3. Desenvolva uma função que encontre a mediana de um array

### 6.2 Structs

4. Crie um sistema de cadastro de funcionários com struct
5. Implemente um sistema de notas de alunos usando arrays de structs
6. Desenvolva um sistema de controle de estoque com structs aninhadas

### 6.3 Ponteiros

7. Implemente uma função que troque valores de duas variáveis usando ponteiros
8. Crie uma função que retorne múltiplos valores usando ponteiros
9. Desenvolva um sistema de alocação dinâmica para uma lista de contatos

## 7. Próxima Aula

Na **Aula 03**, estudaremos:
- Análise de algoritmos e complexidade
- Notação Big O, Omega e Theta
- Análise de melhor, pior e caso médio
- Prática de análise com exemplos reais

## Bibliografia da Aula

- Cormen, T.H. et al. *Introduction to Algorithms*, 4ª ed., Cap. 10-12
- Kernighan, B.W.; Ritchie, D.M. *The C Programming Language*, 2ª ed., Cap. 5-6
- Sedgewick, R. *Algorithms in C*, Cap. 3-4
