# O Livro Definitivo de Algoritmos e Complexidade
## Uma Jornada Didática do Básico ao Avançado

---

**Autor:** Prof. Vagner Cordeiro  
**Versão:** 1.0  
**Data:** Agosto 2025  

---

> *"Um algoritmo é uma sequência de passos que transforma o impossível em inevitável."*

---

## Sumário

### **PARTE I - FUNDAMENTOS**
- [Capítulo 1: Introdução aos Algoritmos](#capítulo-1-introdução-aos-algoritmos)
- [Capítulo 2: Funções e Modularização](#capítulo-2-funções-e-modularização)
- [Capítulo 3: Estruturas de Dados Fundamentais](#capítulo-3-estruturas-de-dados-fundamentais)
- [Capítulo 4: Ponteiros e Gerenciamento de Memória](#capítulo-4-ponteiros-e-gerenciamento-de-memória)

### **PARTE II - ANÁLISE DE COMPLEXIDADE**
- [Capítulo 5: Introdução à Análise de Complexidade](#capítulo-5-introdução-à-análise-de-complexidade)
- [Capítulo 6: Notação Big O e Famílias de Complexidade](#capítulo-6-notação-big-o-e-famílias-de-complexidade)
- [Capítulo 7: Análise de Algoritmos Recursivos](#capítulo-7-análise-de-algoritmos-recursivos)
- [Capítulo 8: Complexidade de Espaço](#capítulo-8-complexidade-de-espaço)

### **PARTE III - ESTRUTURAS DE DADOS AVANÇADAS**
- [Capítulo 9: Árvores e Suas Variações](#capítulo-9-árvores-e-suas-variações)
- [Capítulo 10: Grafos e Algoritmos de Busca](#capítulo-10-grafos-e-algoritmos-de-busca)
- [Capítulo 11: Tabelas Hash e Estruturas Especializadas](#capítulo-11-tabelas-hash-e-estruturas-especializadas)

### **PARTE IV - ALGORITMOS CLÁSSICOS**
- [Capítulo 12: Algoritmos de Ordenação](#capítulo-12-algoritmos-de-ordenação)
- [Capítulo 13: Algoritmos de Busca](#capítulo-13-algoritmos-de-busca)
- [Capítulo 14: Programação Dinâmica](#capítulo-14-programação-dinâmica)
- [Capítulo 15: Algoritmos Gulosos](#capítulo-15-algoritmos-gulosos)

### **PARTE V - APLICAÇÕES PRÁTICAS**
- [Capítulo 16: Otimização e Performance](#capítulo-16-otimização-e-performance)
- [Capítulo 17: Algoritmos em Sistemas Reais](#capítulo-17-algoritmos-em-sistemas-reais)
- [Capítulo 18: Estudos de Caso e Projetos](#capítulo-18-estudos-de-caso-e-projetos)

---

# PARTE I - FUNDAMENTOS

## Capítulo 1: Introdução aos Algoritmos

### 1.1 O Que é um Algoritmo?

Imagine que você está ensinando uma criança a fazer um sanduíche. Você não pode simplesmente dizer "faça um sanduíche" - precisa explicar cada passo:

1. Pegue duas fatias de pão
2. Abra o pote de geleia
3. Pegue uma faca
4. Passe geleia em uma fatia
5. Junte as duas fatias

Isso é um **algoritmo**: uma sequência de instruções claras e precisas para resolver um problema.

**Definição formal:** Um algoritmo é uma sequência finita de instruções não-ambíguas que, quando executadas, resolvem um problema específico ou realizam uma tarefa computacional.

### 1.2 Características Fundamentais de um Algoritmo

Todo algoritmo deve possuir cinco características essenciais:

#### 1.2.1 Finitude
O algoritmo deve terminar após um número finito de passos. Não pode ficar executando para sempre.

**Exemplo do dia a dia:** Contar de 1 até 10
- ✅ Correto: conta de 1 até 10 e para
- ❌ Incorreto: conta de 1 até infinito

#### 1.2.2 Definição (Precisão)
Cada instrução deve ser clara, precisa e sem ambiguidade.

**Exemplo:**
- ❌ Ambíguo: "Esquente a água"
- ✅ Preciso: "Esquente a água até 100°C"

#### 1.2.3 Entrada (Input)
O algoritmo pode receber zero ou mais valores de entrada.

**Exemplos:**
- Calcular área do círculo → entrada: raio
- Imprimir "Olá mundo" → entrada: nenhuma

#### 1.2.4 Saída (Output)
O algoritmo deve produzir pelo menos um resultado.

**Exemplos:**
- Calcular área → saída: valor da área
- Ordenar lista → saída: lista ordenada

#### 1.2.5 Efetividade
Cada operação deve ser básica o suficiente para ser executada, em princípio, por uma pessoa usando papel e lápis.

### 1.3 Algoritmos no Mundo Real

Os algoritmos estão em toda parte:

**1. GPS no seu celular:**
- Entrada: localização atual, destino
- Processo: calcula rotas possíveis, considera trânsito
- Saída: melhor rota

**2. Feed do Instagram:**
- Entrada: suas curtidas, tempo de visualização, amigos
- Processo: analisa padrões, prioriza conteúdo
- Saída: posts personalizados

**3. Receita de bolo:**
- Entrada: ingredientes
- Processo: misturar, assar, decorar
- Saída: bolo pronto

### 1.4 Diferença entre Algoritmo e Programa

| Algoritmo | Programa |
|-----------|----------|
| Conceito abstrato | Implementação concreta |
| Independe de linguagem | Escrito em linguagem específica |
| Descreve a lógica | Executa a lógica |
| "Como fazer um bolo" | "Receita escrita em português" |

### 1.5 Formas de Representar Algoritmos

#### 1.5.1 Linguagem Natural
```
Algoritmo para encontrar o maior número entre três:
1. Leia os três números A, B e C
2. Se A for maior que B e A for maior que C, então A é o maior
3. Senão, se B for maior que C, então B é o maior
4. Senão, C é o maior
5. Exiba o maior número
```

#### 1.5.2 Pseudocódigo
```
ALGORITMO maior_de_tres
ENTRADA: A, B, C (números)
INÍCIO
    SE (A > B) E (A > C) ENTÃO
        maior ← A
    SENÃO SE (B > C) ENTÃO
        maior ← B
    SENÃO
        maior ← C
    FIM SE
    ESCREVA maior
FIM
```

#### 1.5.3 Fluxograma
```
[INÍCIO] → [Ler A,B,C] → [A>B e A>C?] → [SIM: maior=A] → [Exibir maior] → [FIM]
                              ↓
                            [NÃO]
                              ↓
                         [B>C?] → [SIM: maior=B]
                              ↓
                         [NÃO: maior=C]
```

### 1.6 Qualidades de um Bom Algoritmo

#### 1.6.1 Clareza
O algoritmo deve ser fácil de entender e seguir.

#### 1.6.2 Eficiência
Deve resolver o problema usando o mínimo de recursos (tempo e memória).

#### 1.6.3 Generalidade
Deve funcionar para todos os casos válidos do problema.

#### 1.6.4 Robustez
Deve lidar bem com entradas inválidas ou situações inesperadas.

### 1.7 Exercícios de Fixação

1. **Exercício 1:** Descreva um algoritmo em linguagem natural para trocar uma lâmpada queimada.

2. **Exercício 2:** Crie um algoritmo para calcular a média de três notas de um aluno.

3. **Exercício 3:** Desenvolva um algoritmo para verificar se um ano é bissexto.

---

## Capítulo 2: Funções e Modularização

### 2.1 O Conceito de Função

Imagine que você trabalha em uma padaria. Em vez de fazer tudo sozinho (misturar massa, assar, decorar), você divide as tarefas:
- João mistura a massa
- Maria assa os pães
- Pedro decora os bolos

Cada pessoa é especialista em sua função. No mundo da programação, as **funções** trabalham da mesma forma.

**Definição:** Uma função é um bloco de código que executa uma tarefa específica e pode ser reutilizado quantas vezes for necessário.

### 2.2 Por Que Usar Funções?

#### 2.2.1 Organização (Modularidade)
Em vez de escrever todo o código em um lugar só, dividimos em partes menores e organizadas.

**Analogia:** É como organizar uma casa em cômodos. Cada cômodo tem sua função específica.

#### 2.2.2 Reutilização
Uma vez criada, a função pode ser usada várias vezes.

**Exemplo:** Se você criar uma função para calcular área de círculo, pode usá-la para qualquer círculo.

#### 2.2.3 Manutenção
Se precisar corrigir um erro ou melhorar algo, você modifica apenas a função específica.

#### 2.2.4 Legibilidade
O código fica mais fácil de entender quando está bem organizado em funções.

### 2.3 Anatomia de uma Função

Uma função tem quatro partes principais:

```c
tipo_de_retorno nome_da_funcao(parametros) {
    // corpo da função
    return valor;
}
```

**Explicando cada parte:**

1. **Tipo de retorno:** Que tipo de resultado a função vai devolver
2. **Nome da função:** Como vamos chamar a função
3. **Parâmetros:** Que informações a função precisa receber
4. **Corpo:** O que a função vai fazer
5. **Return:** O resultado que a função vai devolver

### 2.4 Exemplo Prático: Calculadora de Área

```c
#include <stdio.h>

// Função para calcular área do círculo
float area_circulo(float raio) {           // O(1)
    float area = 3.14159 * raio * raio;   // O(1)
    return area;                          // O(1)
}

// Função para calcular área do retângulo  
float area_retangulo(float base, float altura) {  // O(1)
    return base * altura;                         // O(1)
}

int main() {
    float r = 5.0;                               // O(1)
    float b = 10.0, h = 6.0;                    // O(1)
    
    printf("Área do círculo: %.2f\n", area_circulo(r));        // O(1)
    printf("Área do retângulo: %.2f\n", area_retangulo(b, h)); // O(1)
    
    return 0;
}
```

**Saída:**
```
Área do círculo: 78.54
Área do retângulo: 60.00
```

### 2.5 Tipos de Funções

#### 2.5.1 Funções que Retornam Valor

```c
int somar(int a, int b) {
    return a + b;  // Retorna a soma
}
```

#### 2.5.2 Funções que Não Retornam Valor (void)

```c
void imprimir_mensagem() {
    printf("Olá, mundo!\n");  // Só executa, não retorna nada
}
```

#### 2.5.3 Funções com Múltiplos Parâmetros

```c
float calcular_imc(float peso, float altura) {
    return peso / (altura * altura);
}
```

#### 2.5.4 Funções sem Parâmetros

```c
void limpar_tela() {
    system("cls");  // No Windows
}
```

### 2.6 Boas Práticas para Funções

#### 2.6.1 Nome Descritivo
- ✅ `calcular_area_circulo()`
- ❌ `calc()` ou `func1()`

#### 2.6.2 Uma Função, Uma Responsabilidade
Cada função deve fazer apenas uma coisa, mas fazer bem.

#### 2.6.3 Tamanho Adequado
Uma função deve caber na tela (máximo 20-30 linhas).

#### 2.6.4 Comentários Úteis
```c
// Calcula a área de um círculo dado o raio
float area_circulo(float raio) {
    return 3.14159 * raio * raio;
}
```

### 2.7 Exercícios Práticos

1. **Calculadora Básica:** Crie funções para as quatro operações básicas.
2. **Conversor de Temperatura:** Função para converter Celsius para Fahrenheit.
3. **Validador:** Função que verifica se um número é positivo, negativo ou zero.

---

## Capítulo 3: Estruturas de Dados Fundamentais

### 3.1 O Que São Estruturas de Dados?

Imagine que você precisa organizar sua biblioteca pessoal. Você pode:
- Empilhar livros (pilha)
- Enfileirar por ordem de chegada (fila)
- Organizá-los em estantes numeradas (array)
- Criar um catálogo com autor→livro (dicionário)

Cada forma de organizar representa uma **estrutura de dados** diferente.

**Definição:** Estruturas de dados são formas de organizar e armazenar informações para que possam ser acessadas e modificadas de maneira eficiente.

### 3.2 Por Que Estruturas de Dados Importam?

A escolha da estrutura de dados certa pode fazer a diferença entre:
- Um programa que responde em 1 segundo vs 1 hora
- Um aplicativo que usa 10MB vs 1GB de memória
- Um algoritmo simples vs um complexo

**Analogia:** É como escolher a ferramenta certa:
- Martelo para pregar
- Chave de fenda para parafusar
- Algoritmo de busca para encontrar dados

### 3.3 Classificação das Estruturas de Dados

#### 3.3.1 Estruturas Lineares
Os elementos estão organizados em sequência.

**Exemplos:**
- Array (vetor)
- Lista ligada
- Pilha
- Fila

#### 3.3.2 Estruturas Não-Lineares
Os elementos não seguem uma sequência.

**Exemplos:**
- Árvore
- Grafo
- Tabela hash

#### 3.3.3 Estruturas Homogêneas vs Heterogêneas

**Homogêneas:** Todos os elementos são do mesmo tipo
```c
int numeros[5] = {1, 2, 3, 4, 5};  // Só inteiros
```

**Heterogêneas:** Elementos podem ser de tipos diferentes
```c
struct pessoa {
    char nome[50];    // String
    int idade;        // Inteiro
    float altura;     // Float
};
```

### 3.4 Arrays (Vetores): A Estrutura Mais Básica

#### 3.4.1 Conceito
Um array é como uma fileira de gavetas numeradas, onde cada gaveta pode guardar um item.

```c
int numeros[5];  // 5 gavetas numeradas de 0 a 4
numeros[0] = 10; // Primeira gaveta
numeros[1] = 20; // Segunda gaveta
// ... e assim por diante
```

#### 3.4.2 Vantagens dos Arrays
- **Acesso rápido:** O(1) para acessar qualquer elemento
- **Uso eficiente de memória:** Elementos ficam juntos na memória
- **Simplicidade:** Fácil de entender e usar

#### 3.4.3 Desvantagens dos Arrays
- **Tamanho fixo:** Não pode crescer durante a execução
- **Inserção/remoção lenta:** O(n) no pior caso
- **Memória desperdiçada:** Se não usar todos os espaços

#### 3.4.4 Operações Básicas com Arrays

```c
#include <stdio.h>

void imprimir_array(int arr[], int tamanho) {
    for (int i = 0; i < tamanho; i++) {    // O(n)
        printf("%d ", arr[i]);             // O(1)
    }
    printf("\n");
}

int buscar_elemento(int arr[], int tamanho, int valor) {
    for (int i = 0; i < tamanho; i++) {    // O(n)
        if (arr[i] == valor) {             // O(1)
            return i;  // Retorna a posição
        }
    }
    return -1;  // Não encontrado
}

int main() {
    int numeros[] = {10, 25, 30, 45, 50};  // O(1)
    int tam = 5;                           // O(1)
    
    printf("Array: ");
    imprimir_array(numeros, tam);          // O(n)
    
    int posicao = buscar_elemento(numeros, tam, 30);  // O(n)
    if (posicao != -1) {
        printf("Elemento 30 encontrado na posição %d\n", posicao);
    }
    
    return 0;
}
```

### 3.5 Estruturas (Structs): Agrupando Dados Relacionados

#### 3.5.1 Conceito
Uma struct é como uma ficha com vários campos relacionados.

**Exemplo:** Ficha de um aluno
```c
struct aluno {
    char nome[50];      // Campo para nome
    int idade;          // Campo para idade
    float nota;         // Campo para nota
};
```

#### 3.5.2 Exemplo Prático: Sistema de Biblioteca

```c
#include <stdio.h>
#include <string.h>

struct livro {
    char titulo[100];
    char autor[50];
    int ano;
    int disponivel;  // 1 = sim, 0 = não
};

void imprimir_livro(struct livro l) {             // O(1)
    printf("Título: %s\n", l.titulo);            // O(1)
    printf("Autor: %s\n", l.autor);              // O(1)
    printf("Ano: %d\n", l.ano);                  // O(1)
    printf("Disponível: %s\n", l.disponivel ? "Sim" : "Não");  // O(1)
    printf("------------------------\n");
}

int main() {
    struct livro biblioteca[3];                   // O(1)
    
    // Cadastrando livros
    strcpy(biblioteca[0].titulo, "1984");         // O(1)
    strcpy(biblioteca[0].autor, "George Orwell");
    biblioteca[0].ano = 1949;
    biblioteca[0].disponivel = 1;
    
    strcpy(biblioteca[1].titulo, "Dom Casmurro");
    strcpy(biblioteca[1].autor, "Machado de Assis");
    biblioteca[1].ano = 1899;
    biblioteca[1].disponivel = 0;
    
    strcpy(biblioteca[2].titulo, "O Cortiço");
    strcpy(biblioteca[2].autor, "Aluísio Azevedo");
    biblioteca[2].ano = 1890;
    biblioteca[2].disponivel = 1;
    
    // Listando livros disponíveis
    printf("=== LIVROS DISPONÍVEIS ===\n");
    for (int i = 0; i < 3; i++) {                // O(n)
        if (biblioteca[i].disponivel) {          // O(1)
            imprimir_livro(biblioteca[i]);       // O(1)
        }
    }
    
    return 0;
}
```

### 3.6 Comparação: Arrays vs Structs

| Característica | Array | Struct |
|----------------|-------|---------|
| Tipo de dados | Homogêneo | Heterogêneo |
| Acesso | Por índice | Por nome do campo |
| Uso | Lista de elementos similares | Agrupamento de dados relacionados |
| Exemplo | Lista de notas | Dados de uma pessoa |

### 3.7 Exercícios Práticos

1. **Sistema de Notas:** Crie um array para armazenar notas e calcule a média.

2. **Cadastro de Funcionários:** Use struct para armazenar dados de funcionários (nome, cargo, salário).

3. **Agenda Telefônica:** Combine array e struct para criar uma agenda com nome e telefone.

---

## Capítulo 4: Ponteiros e Gerenciamento de Memória

### 4.1 O Que São Ponteiros?

Imagine que você mora em uma cidade. Sua casa tem um endereço único (ex: Rua das Flores, 123). Quando alguém quer te visitar, usa esse endereço para te encontrar.

Na programação, **ponteiros** são como endereços: eles apontam para onde uma variável está "morando" na memória.

**Definição:** Um ponteiro é uma variável que armazena o endereço de memória de outra variável.

### 4.2 Por Que Ponteiros São Importantes?

#### 4.2.1 Eficiência
Em vez de copiar dados grandes, passamos apenas o endereço.

**Analogia:** Em vez de fotocópiar um livro inteiro para emprestar, você dá o endereço da biblioteca.

#### 4.2.2 Flexibilidade
Permitem modificar variáveis de outras funções.

#### 4.2.3 Estruturas Dinâmicas
Possibilitam criar estruturas que crescem e diminuem conforme necessário.

### 4.3 Conceitos Fundamentais

#### 4.3.1 Endereço de Memória
Toda variável tem um endereço único na memória.

```c
int idade = 25;
printf("Valor: %d\n", idade);          // Imprime: 25
printf("Endereço: %p\n", &idade);      // Imprime: 0x7fff5fbff6ac (exemplo)
```

#### 4.3.2 Operadores Especiais

**Operador & (endereço-de):**
```c
int numero = 10;
printf("%p", &numero);  // Mostra onde 'numero' está na memória
```

**Operador * (conteúdo-de):**
```c
int *ponteiro = &numero;
printf("%d", *ponteiro);  // Mostra o valor que está no endereço
```

### 4.4 Declaração e Uso de Ponteiros

#### 4.4.1 Sintaxe Básica
```c
tipo *nome_do_ponteiro;
```

#### 4.4.2 Exemplo Passo a Passo

```c
#include <stdio.h>

int main() {
    int idade = 25;              // O(1) - cria variável
    int *ptr_idade;              // O(1) - declara ponteiro
    
    ptr_idade = &idade;          // O(1) - ponteiro aponta para idade
    
    printf("Valor da idade: %d\n", idade);        // O(1) - imprime 25
    printf("Endereço da idade: %p\n", &idade);    // O(1) - imprime endereço
    printf("Valor do ponteiro: %p\n", ptr_idade); // O(1) - mesmo endereço
    printf("Valor apontado: %d\n", *ptr_idade);   // O(1) - imprime 25
    
    *ptr_idade = 30;             // O(1) - modifica através do ponteiro
    printf("Nova idade: %d\n", idade);            // O(1) - imprime 30
    
    return 0;
}
```

**Saída:**
```
Valor da idade: 25
Endereço da idade: 0x7fff5fbff6ac
Valor do ponteiro: 0x7fff5fbff6ac
Valor apontado: 25
Nova idade: 30
```

### 4.5 Ponteiros e Funções

#### 4.5.1 Passagem por Referência

**Problema:** Como fazer uma função modificar uma variável?

**Solução:** Passar o endereço da variável (ponteiro).

```c
#include <stdio.h>

// Função que NÃO modifica a variável original
void incrementa_copia(int x) {
    x = x + 1;                   // O(1) - modifica apenas a cópia
    printf("Dentro da função: %d\n", x);
}

// Função que MODIFICA a variável original
void incrementa_original(int *x) {
    *x = *x + 1;                 // O(1) - modifica o valor original
    printf("Dentro da função: %d\n", *x);
}

int main() {
    int numero = 10;             // O(1)
    
    printf("Valor inicial: %d\n", numero);
    
    incrementa_copia(numero);    // O(1) - passa cópia
    printf("Após cópia: %d\n", numero);    // Ainda 10
    
    incrementa_original(&numero); // O(1) - passa endereço
    printf("Após original: %d\n", numero); // Agora 11
    
    return 0;
}
```

**Saída:**
```
Valor inicial: 10
Dentro da função: 11
Após cópia: 10
Dentro da função: 11
Após original: 11
```

### 4.6 Ponteiros e Arrays

#### 4.6.1 Relação Íntima
Em C, o nome de um array é um ponteiro para o primeiro elemento.

```c
#include <stdio.h>

int main() {
    int numeros[] = {10, 20, 30, 40, 50};    // O(1)
    int *ptr = numeros;                      // O(1) - aponta para primeiro elemento
    
    printf("Primeiro elemento: %d\n", numeros[0]);  // O(1)
    printf("Mesmo elemento: %d\n", *ptr);           // O(1)
    
    // Navegando pelo array com ponteiro
    for (int i = 0; i < 5; i++) {           // O(n)
        printf("numeros[%d] = %d\n", i, *(ptr + i));  // O(1)
    }
    
    return 0;
}
```

#### 4.6.2 Aritmética de Ponteiros

```c
int *ptr = numeros;      // Aponta para numeros[0]
ptr++;                   // Agora aponta para numeros[1]
ptr += 2;                // Agora aponta para numeros[3]
```

### 4.7 Gerenciamento Dinâmico de Memória

#### 4.7.1 Alocação Dinâmica
Permite criar "gavetas" na memória conforme necessário.

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int tamanho;
    printf("Quantos números você quer armazenar? ");
    scanf("%d", &tamanho);                   // O(1)
    
    // Aloca memória dinamicamente
    int *numeros = (int*)malloc(tamanho * sizeof(int));  // O(1)
    
    if (numeros == NULL) {                   // O(1) - verifica se alocou
        printf("Erro: Memória insuficiente!\n");
        return 1;
    }
    
    // Usa a memória alocada
    for (int i = 0; i < tamanho; i++) {      // O(n)
        numeros[i] = i * 10;                 // O(1)
        printf("numeros[%d] = %d\n", i, numeros[i]);
    }
    
    // IMPORTANTE: Libera a memória
    free(numeros);                           // O(1)
    
    return 0;
}
```

#### 4.7.2 Regra de Ouro
**Para cada `malloc()`, deve haver um `free()`**

### 4.8 Erros Comuns com Ponteiros

#### 4.8.1 Ponteiro Não Inicializado
```c
int *ptr;           // Ponteiro selvagem!
*ptr = 10;          // ERRO: não sabemos para onde ele aponta
```

#### 4.8.2 Vazamento de Memória
```c
int *ptr = malloc(sizeof(int));
// Esqueceu de chamar free(ptr);  // VAZAMENTO!
```

#### 4.8.3 Uso Após Liberação
```c
int *ptr = malloc(sizeof(int));
free(ptr);
*ptr = 10;          // ERRO: memória já foi liberada
```

### 4.9 Exercícios Práticos

1. **Troca de Valores:** Crie uma função que troca os valores de duas variáveis usando ponteiros.

2. **Array Dinâmico:** Implemente um programa que cria um array do tamanho escolhido pelo usuário.

3. **Contador de Palavras:** Use ponteiros para navegar por uma string e contar palavras.

---

# PARTE II - ANÁLISE DE COMPLEXIDADE

## Capítulo 5: Introdução à Análise de Complexidade

### 5.1 Por Que Analisar Complexidade?

Imagine que você precisa encontrar uma pessoa específica em diferentes situações:

1. **Em sua casa (5 pessoas):** Você grita o nome e a pessoa responde
2. **Em uma escola (500 pessoas):** Você verifica sala por sala  
3. **Em uma cidade (500.000 pessoas):** Você precisa de uma estratégia mais inteligente

O **tempo** necessário muda drasticamente conforme o **tamanho** do problema. A análise de complexidade nos ajuda a entender e prever esses padrões.

### 5.2 O Que é Complexidade de Algoritmo?

**Definição:** Complexidade é uma medida de quão eficiente um algoritmo é, considerando o tempo e o espaço necessários conforme o tamanho da entrada cresce.

**Duas dimensões principais:**
- **Complexidade de Tempo:** Quanto tempo o algoritmo demora
- **Complexidade de Espaço:** Quanta memória o algoritmo usa

### 5.3 Por Que Não Medimos em Segundos?

#### 5.3.1 Problemas da Medição Direta
- Computadores diferentes têm velocidades diferentes
- Implementações podem variar
- Condições do sistema afetam o tempo

#### 5.3.2 A Solução: Contar Operações
Em vez de medir tempo, contamos **operações básicas**.

**Operações básicas:**
- Atribuições
- Comparações
- Operações matemáticas
- Acessos à memória

### 5.4 Exemplo Prático: Busca em Lista

#### 5.4.1 Busca Linear
```c
int busca_linear(int arr[], int n, int valor) {
    for (int i = 0; i < n; i++) {        // Loop executa até n vezes
        if (arr[i] == valor) {           // 1 comparação por iteração
            return i;                    // 1 operação de retorno
        }
    }
    return -1;                           // 1 operação de retorno
}
```

**Análise:**
- **Melhor caso:** Elemento está na primeira posição → 1 comparação
- **Pior caso:** Elemento não existe → n comparações
- **Caso médio:** Elemento está no meio → n/2 comparações

#### 5.4.2 Visualizando o Crescimento

| Tamanho (n) | Melhor Caso | Pior Caso | Caso Médio |
|-------------|-------------|-----------|------------|
| 10          | 1           | 10        | 5          |
| 100         | 1           | 100       | 50         |
| 1.000       | 1           | 1.000     | 500        |
| 10.000      | 1           | 10.000    | 5.000      |

**Observação:** No pior caso, o tempo cresce **linearmente** com n.

### 5.5 Diferentes Taxa de Crescimento

#### 5.5.1 Crescimento Constante - O(1)
Tempo não muda, independente do tamanho da entrada.

```c
int acessar_primeiro_elemento(int arr[]) {
    return arr[0];  // Sempre 1 operação
}
```

**Analogia:** Pegar um livro específico quando você sabe exatamente onde ele está.

#### 5.5.2 Crescimento Linear - O(n)
Tempo cresce proporcionalmente ao tamanho.

```c
void imprimir_array(int arr[], int n) {
    for (int i = 0; i < n; i++) {  // n operações
        printf("%d ", arr[i]);
    }
}
```

**Analogia:** Ler todos os livros de uma estante, um por um.

#### 5.5.3 Crescimento Quadrático - O(n²)
Tempo cresce com o quadrado do tamanho.

```c
void bubble_sort(int arr[], int n) {
    for (int i = 0; i < n; i++) {      // Loop externo: n vezes
        for (int j = 0; j < n-1; j++) { // Loop interno: n vezes
            if (arr[j] > arr[j+1]) {   // n × n = n² comparações
                // troca elementos
            }
        }
    }
}
```

**Analogia:** Comparar cada livro com todos os outros livros.

#### 5.5.4 Crescimento Logarítmico - O(log n)
Tempo cresce muito lentamente.

```c
int busca_binaria(int arr[], int n, int valor) {
    int inicio = 0, fim = n - 1;
    
    while (inicio <= fim) {
        int meio = (inicio + fim) / 2;  // Divide pela metade
        if (arr[meio] == valor) return meio;
        if (arr[meio] < valor) inicio = meio + 1;
        else fim = meio - 1;
    }
    return -1;
}
```

**Analogia:** Procurar uma palavra no dicionário abrindo sempre no meio.

### 5.6 Comparando Diferentes Complexidades

#### 5.6.1 Tabela de Crescimento

| n     | O(1) | O(log n) | O(n) | O(n log n) | O(n²) | O(2ⁿ) |
|-------|------|----------|------|------------|-------|-------|
| 1     | 1    | 1        | 1    | 1          | 1     | 2     |
| 10    | 1    | 3        | 10   | 33         | 100   | 1024  |
| 100   | 1    | 7        | 100  | 664        | 10K   | ∞     |
| 1000  | 1    | 10       | 1K   | 9.966      | 1M    | ∞     |

#### 5.6.2 Impacto Prático

**Para processar 1 milhão de elementos:**
- O(1): Instantâneo
- O(log n): ~20 operações
- O(n): 1 milhão de operações
- O(n²): 1 trilhão de operações

### 5.7 Regras Práticas para Análise

#### 5.7.1 Ignore Constantes
- O(3n) = O(n)
- O(n/2) = O(n)

#### 5.7.2 Considere Apenas o Termo Dominante
- O(n² + n + 1) = O(n²)
- O(n log n + n) = O(n log n)

#### 5.7.3 Analise o Pior Caso
Geralmente analisamos o cenário mais desfavorável.

### 5.8 Exercícios de Análise

#### 5.8.1 Exercício 1
Qual a complexidade desta função?
```c
int soma_array(int arr[], int n) {
    int soma = 0;
    for (int i = 0; i < n; i++) {
        soma += arr[i];
    }
    return soma;
}
```

#### 5.8.2 Exercício 2
E desta função?
```c
void imprimir_pares(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            printf("(%d, %d)\n", arr[i], arr[j]);
        }
    }
}
```

---

## Capítulo 6: Notação Big O e Famílias de Complexidade

### 6.1 O Que é a Notação Big O?

A notação Big O é como uma "categoria de velocidade" para algoritmos. Assim como carros podem ser categorizados em "econômicos", "esportivos" ou "de luxo", algoritmos são categorizados por como seu tempo de execução cresce.

**Definição formal:** Big O descreve o limite superior do crescimento de uma função conforme a entrada tende ao infinito.

**Definição prática:** Big O nos diz "no pior caso, meu algoritmo não será mais lento que isso".

### 6.2 As Principais Famílias de Complexidade

#### 6.2.1 O(1) - Complexidade Constante

**Característica:** Tempo fixo, independente do tamanho da entrada.

**Exemplos do dia a dia:**
- Ligar uma lâmpada (não importa quantas lâmpadas existem na casa)
- Acessar um contato específico no celular (se você sabe o nome exato)

**Exemplos em programação:**
```c
// Acessar elemento por índice
int primeiro = arr[0];                    // O(1)

// Operações matemáticas simples
int resultado = a + b * c;                // O(1)

// Verificar se array está vazio
int vazio = (tamanho == 0);              // O(1)
```

**Gráfico do crescimento:** Linha horizontal

#### 6.2.2 O(log n) - Complexidade Logarítmica

**Característica:** Cada operação reduz o problema pela metade.

**Exemplos do dia a dia:**
- Procurar uma palavra no dicionário
- Encontrar um livro em uma biblioteca organizada
- Jogo de "adivinhar o número" (1 a 100)

**Algoritmo clássico: Busca Binária**
```c
int busca_binaria(int arr[], int n, int valor) {
    int inicio = 0, fim = n - 1;
    
    while (inicio <= fim) {              // O(log n) iterações
        int meio = (inicio + fim) / 2;   // O(1)
        
        if (arr[meio] == valor) {        // O(1)
            return meio;
        } else if (arr[meio] < valor) {  // O(1)
            inicio = meio + 1;
        } else {
            fim = meio - 1;
        }
    }
    return -1;
}
```

**Por que log n?**
- A cada iteração, eliminamos metade das possibilidades
- Para n elementos, precisamos de no máximo log₂(n) divisões
- Exemplo: array de 1000 elementos → máximo 10 comparações

#### 6.2.3 O(n) - Complexidade Linear

**Característica:** Tempo cresce proporcionalmente ao tamanho.

**Exemplos do dia a dia:**
- Contar todas as pessoas em uma fila
- Ler um livro página por página
- Lavar todos os pratos da pia

**Algoritmos clássicos:**
```c
// Busca linear
int busca_linear(int arr[], int n, int valor) {
    for (int i = 0; i < n; i++) {        // O(n)
        if (arr[i] == valor) {           // O(1)
            return i;
        }
    }
    return -1;
}

// Encontrar maior elemento
int encontrar_maior(int arr[], int n) {
    int maior = arr[0];                  // O(1)
    for (int i = 1; i < n; i++) {        // O(n)
        if (arr[i] > maior) {            // O(1)
            maior = arr[i];
        }
    }
    return maior;
}
```

#### 6.2.4 O(n log n) - Complexidade Quase-Linear

**Característica:** Ligeiramente pior que linear, mas ainda eficiente.

**Exemplos do dia a dia:**
- Organizar uma biblioteca grande usando um sistema eficiente
- Mergear várias listas já ordenadas

**Algoritmos clássicos:**
- Merge Sort
- Quick Sort (caso médio)
- Heap Sort

```c
// Merge Sort simplificado (conceitual)
void merge_sort(int arr[], int inicio, int fim) {
    if (inicio < fim) {
        int meio = (inicio + fim) / 2;
        
        merge_sort(arr, inicio, meio);     // T(n/2)
        merge_sort(arr, meio + 1, fim);    // T(n/2)
        merge(arr, inicio, meio, fim);     // O(n)
    }
}
// Complexidade total: O(n log n)
```

#### 6.2.5 O(n²) - Complexidade Quadrática

**Característica:** Para cada elemento, processamos todos os outros.

**Exemplos do dia a dia:**
- Comparar todas as pessoas em uma sala entre si
- Verificar todas as combinações possíveis de duplas

**Algoritmos clássicos:**
```c
// Bubble Sort
void bubble_sort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {        // O(n)
        for (int j = 0; j < n - i - 1; j++) { // O(n)
            if (arr[j] > arr[j + 1]) {       // O(1)
                // trocar elementos
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

// Verificar duplicatas (método ingênuo)
int tem_duplicatas(int arr[], int n) {
    for (int i = 0; i < n; i++) {            // O(n)
        for (int j = i + 1; j < n; j++) {    // O(n)
            if (arr[i] == arr[j]) {          // O(1)
                return 1;  // Tem duplicata
            }
        }
    }
    return 0;  // Não tem duplicata
}
```

#### 6.2.6 O(2ⁿ) - Complexidade Exponencial

**Característica:** Tempo dobra a cada elemento adicional.

**Exemplos do dia a dia:**
- Testar todas as combinações possíveis de senha
- Problema da mochila (força bruta)

**Algoritmo clássico: Fibonacci recursivo ingênuo**
```c
int fibonacci_ruim(int n) {
    if (n <= 1) return n;                    // O(1)
    
    return fibonacci_ruim(n-1) + fibonacci_ruim(n-2);  // 2^n chamadas
}
```

**Por que é exponencial?**
- Cada chamada gera duas novas chamadas
- Forma uma árvore binária de altura n
- Total de nós: aproximadamente 2ⁿ

### 6.3 Comparação Visual das Complexidades

#### 6.3.1 Crescimento ao Longo do Tempo

```
Operações necessárias para diferentes valores de n:

n = 10:
O(1):      1
O(log n):  3
O(n):      10
O(n log n): 33
O(n²):     100
O(2ⁿ):     1.024

n = 100:
O(1):      1
O(log n):  7
O(n):      100
O(n log n): 664
O(n²):     10.000
O(2ⁿ):     1.267.650.600.228.229.401.496.703.205.376

n = 1.000:
O(1):      1
O(log n):  10
O(n):      1.000
O(n log n): 9.966
O(n²):     1.000.000
O(2ⁿ):     Impraticável (mais que átomos no universo)
```

#### 6.3.2 Tempo Real de Execução

Assumindo 1 bilhão de operações por segundo:

| n = 1.000.000 | Tempo Aproximado |
|---------------|------------------|
| O(1)          | Instantâneo      |
| O(log n)      | Instantâneo      |
| O(n)          | 1 milissegundo   |
| O(n log n)    | 20 milissegundos |
| O(n²)         | 16 minutos       |
| O(2ⁿ)         | Nunca termina    |

### 6.4 Como Identificar a Complexidade

#### 6.4.1 Padrões Comuns

**Um loop simples = O(n)**
```c
for (int i = 0; i < n; i++) {
    // código O(1)
}
```

**Dois loops aninhados = O(n²)**
```c
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
        // código O(1)
    }
}
```

**Dividir problema pela metade = O(log n)**
```c
while (n > 1) {
    n = n / 2;
    // código O(1)
}
```

**Recursão que se divide em duas = O(2ⁿ)**
```c
funcao(n-1) + funcao(n-1)
```

#### 6.4.2 Dicas Práticas

1. **Conte os loops aninhados**
2. **Identifique se o problema é dividido**
3. **Observe se há recursão múltipla**
4. **Considere o pior caso**

### 6.5 Melhorando Complexidade: Exemplos Práticos

#### 6.5.1 Problema: Encontrar Duplicatas

**Versão O(n²) - Ingênua:**
```c
int tem_duplicatas_lento(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (arr[i] == arr[j]) return 1;
        }
    }
    return 0;
}
```

**Versão O(n log n) - Melhor:**
```c
int tem_duplicatas_rapido(int arr[], int n) {
    ordenar(arr, n);  // O(n log n)
    
    for (int i = 0; i < n - 1; i++) {  // O(n)
        if (arr[i] == arr[i + 1]) return 1;
    }
    return 0;
}
```

#### 6.5.2 Problema: Fibonacci

**Versão O(2ⁿ) - Exponencial:**
```c
int fib_exponencial(int n) {
    if (n <= 1) return n;
    return fib_exponencial(n-1) + fib_exponencial(n-2);
}
```

**Versão O(n) - Linear:**
```c
int fib_linear(int n) {
    if (n <= 1) return n;
    
    int a = 0, b = 1;
    for (int i = 2; i <= n; i++) {  // O(n)
        int temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}
```

### 6.6 Exercícios de Identificação

#### 6.6.1 Exercício 1
Qual a complexidade?
```c
int contar_pares(int arr[], int n) {
    int count = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] % 2 == 0) count++;
    }
    return count;
}
```

#### 6.6.2 Exercício 2
E desta função?
```c
void imprimir_triangulo(int n) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j <= i; j++) {
            printf("*");
        }
        printf("\n");
    }
}
```

#### 6.6.3 Exercício 3
Complexidade desta recursão?
```c
int misterio(int n) {
    if (n <= 1) return 1;
    return misterio(n/2) + misterio(n/2);
}
```

---

## Capítulo 7: Análise de Algoritmos Recursivos

### 7.1 O Que é Recursão?

Recursão é como uma boneca russa (matryoshka): dentro de cada boneca há uma boneca menor, até chegar na menor de todas.

**Definição:** Um algoritmo recursivo é aquele que resolve um problema dividindo-o em versões menores do mesmo problema.

**Componentes essenciais:**
1. **Caso base:** Condição que para a recursão
2. **Caso recursivo:** Chamada da função para problema menor

### 7.2 Exemplo Clássico: Fatorial

#### 7.2.1 Definição Matemática
```
n! = n × (n-1) × (n-2) × ... × 2 × 1
5! = 5 × 4 × 3 × 2 × 1 = 120
```

#### 7.2.2 Pensamento Recursivo
```
5! = 5 × 4!
4! = 4 × 3!
3! = 3 × 2!
2! = 2 × 1!
1! = 1 (caso base)
```

#### 7.2.3 Implementação
```c
int fatorial(int n) {
    if (n <= 1) {               // Caso base: O(1)
        return 1;
    }
    return n * fatorial(n - 1); // Caso recursivo: T(n-1)
}
```

### 7.3 Analisando Complexidade Recursiva

#### 7.3.1 Equação de Recorrência
Para analisar recursão, criamos uma **equação de recorrência**:

```
T(n) = T(n-1) + O(1)
T(1) = O(1)
```

**Resolvendo:**
```
T(n) = T(n-1) + c
     = T(n-2) + c + c
     = T(n-3) + c + c + c
     = ...
     = T(1) + c × (n-1)
     = O(1) + O(n)
     = O(n)
```

#### 7.3.2 Método da Árvore de Recursão

**Visualizando fatorial(4):**
```
              fatorial(4)
                   |
              fatorial(3)
                   |
              fatorial(2)
                   |
              fatorial(1)
                   |
                 return 1
```

**Altura da árvore:** n
**Trabalho por nível:** O(1)
**Complexidade total:** O(n)

### 7.4 Fibonacci: Comparando Implementações

#### 7.4.1 Versão Recursiva Ingênua
```c
int fibonacci_recursivo(int n) {
    if (n <= 1) {               // Caso base: O(1)
        return n;
    }
    return fibonacci_recursivo(n-1) + fibonacci_recursivo(n-2);
}
```

**Equação de recorrência:**
```
T(n) = T(n-1) + T(n-2) + O(1)
```

**Árvore de recursão para fibonacci(5):**
```
                    fib(5)
                   /      \
               fib(4)      fib(3)
              /     \      /     \
          fib(3)  fib(2) fib(2) fib(1)
          /   \   /   \   /   \
      fib(2) fib(1) ...   ...
      /   \
  fib(1) fib(0)
```

**Problema:** Muitos cálculos repetidos!
**Complexidade:** O(2ⁿ) - exponencial

#### 7.4.2 Versão Iterativa
```c
int fibonacci_iterativo(int n) {
    if (n <= 1) return n;       // O(1)
    
    int a = 0, b = 1;           // O(1)
    for (int i = 2; i <= n; i++) {  // O(n)
        int temp = a + b;       // O(1)
        a = b;                  // O(1)
        b = temp;               // O(1)
    }
    return b;                   // O(1)
}
```

**Complexidade:** O(n) - linear

#### 7.4.3 Comparação de Performance

| n  | Recursivo (2ⁿ) | Iterativo (n) |
|----|----------------|---------------|
| 10 | 1.024 ops      | 10 ops        |
| 20 | 1M ops         | 20 ops        |
| 30 | 1B ops         | 30 ops        |
| 40 | 1T ops         | 40 ops        |

### 7.5 Algoritmos Divide-e-Conquista

#### 7.5.1 Conceito
Estratégia que divide o problema em subproblemas menores, resolve-os recursivamente e combina as soluções.

**Passos:**
1. **Dividir:** Quebrar em problemas menores
2. **Conquistar:** Resolver recursivamente
3. **Combinar:** Juntar as soluções

#### 7.5.2 Merge Sort: Exemplo Clássico

```c
void merge_sort(int arr[], int inicio, int fim) {
    if (inicio < fim) {
        int meio = (inicio + fim) / 2;      // O(1)
        
        merge_sort(arr, inicio, meio);      // T(n/2)
        merge_sort(arr, meio + 1, fim);     // T(n/2)
        merge(arr, inicio, meio, fim);      // O(n)
    }
}

void merge(int arr[], int inicio, int meio, int fim) {
    // Combina duas metades ordenadas em O(n)
    int n1 = meio - inicio + 1;
    int n2 = fim - meio;
    
    // Criar arrays temporários
    int esquerda[n1], direita[n2];
    
    // Copiar dados
    for (int i = 0; i < n1; i++)        // O(n/2)
        esquerda[i] = arr[inicio + i];
    for (int j = 0; j < n2; j++)        // O(n/2)
        direita[j] = arr[meio + 1 + j];
    
    // Mesclar os arrays
    int i = 0, j = 0, k = inicio;
    while (i < n1 && j < n2) {          // O(n)
        if (esquerda[i] <= direita[j]) {
            arr[k] = esquerda[i];
            i++;
        } else {
            arr[k] = direita[j];
            j++;
        }
        k++;
    }
    
    // Copiar elementos restantes
    while (i < n1) arr[k++] = esquerda[i++];  // O(n)
    while (j < n2) arr[k++] = direita[j++];   // O(n)
}
```

**Equação de recorrência:**
```
T(n) = 2T(n/2) + O(n)
T(1) = O(1)
```

**Resolvendo pelo Teorema Mestre:**
```
T(n) = O(n log n)
```

#### 7.5.3 Árvore de Recursão do Merge Sort

```
Nível 0:                n
Nível 1:          n/2       n/2
Nível 2:       n/4   n/4  n/4   n/4
Nível 3:      n/8 n/8 n/8 n/8 n/8 n/8 n/8 n/8
...

Altura: log n níveis
Trabalho por nível: O(n)
Total: O(n log n)
```

### 7.6 Teorema Mestre (Simplificado)

Para recorrências da forma `T(n) = aT(n/b) + f(n)`:

#### 7.6.1 Caso 1: f(n) = O(n^c) onde c < log_b(a)
**Resultado:** T(n) = O(n^(log_b(a)))

#### 7.6.2 Caso 2: f(n) = O(n^c) onde c = log_b(a)
**Resultado:** T(n) = O(n^c × log n)

#### 7.6.3 Caso 3: f(n) = O(n^c) onde c > log_b(a)
**Resultado:** T(n) = O(f(n))

#### 7.6.4 Exemplos Práticos

**Merge Sort:** T(n) = 2T(n/2) + O(n)
- a = 2, b = 2, f(n) = n
- log₂(2) = 1, c = 1
- Caso 2: T(n) = O(n log n)

**Busca Binária:** T(n) = T(n/2) + O(1)
- a = 1, b = 2, f(n) = 1
- log₂(1) = 0, c = 0
- Caso 2: T(n) = O(log n)

### 7.7 Otimização de Recursão

#### 7.7.1 Memoização
Armazenar resultados já calculados para evitar recálculos.

```c
#include <stdio.h>
#define MAX_N 100

int memo[MAX_N];
int inicializado = 0;

void inicializar_memo() {
    for (int i = 0; i < MAX_N; i++) {
        memo[i] = -1;  // -1 significa "não calculado"
    }
    inicializado = 1;
}

int fibonacci_memoizado(int n) {
    if (!inicializado) inicializar_memo();  // O(1)
    
    if (n <= 1) return n;                   // O(1)
    
    if (memo[n] != -1) {                    // O(1) - já calculado
        return memo[n];
    }
    
    memo[n] = fibonacci_memoizado(n-1) + fibonacci_memoizado(n-2);  // O(1)
    return memo[n];
}
```

**Complexidade:** O(n) - cada valor é calculado apenas uma vez

#### 7.7.2 Recursão de Cauda
Quando a chamada recursiva é a última operação da função.

```c
// Recursão comum
int fatorial_comum(int n) {
    if (n <= 1) return 1;
    return n * fatorial_comum(n - 1);  // Multiplicação após retorno
}

// Recursão de cauda
int fatorial_cauda(int n, int acumulador) {
    if (n <= 1) return acumulador;
    return fatorial_cauda(n - 1, n * acumulador);  // Última operação
}

int fatorial_otimizado(int n) {
    return fatorial_cauda(n, 1);
}
```

**Vantagem:** Compiladores podem otimizar para usar menos memória.

### 7.8 Exercícios de Análise Recursiva

#### 7.8.1 Exercício 1
Analise a complexidade:
```c
int potencia(int base, int exp) {
    if (exp == 0) return 1;
    return base * potencia(base, exp - 1);
}
```

#### 7.8.2 Exercício 2
Compare as complexidades:
```c
// Versão 1
int potencia_rapida(int base, int exp) {
    if (exp == 0) return 1;
    if (exp % 2 == 0) {
        int temp = potencia_rapida(base, exp / 2);
        return temp * temp;
    }
    return base * potencia_rapida(base, exp - 1);
}
```

---

## Capítulo 8: Complexidade de Espaço

### 8.1 O Que é Complexidade de Espaço?

Enquanto complexidade de tempo mede "quão rápido", complexidade de espaço mede "quanta memória".

**Analogia:** Se você está cozinhando:
- **Tempo:** Quanto demora para fazer o prato
- **Espaço:** Quantas panelas, tigelas e utensílios você usa

### 8.2 Tipos de Uso de Memória

#### 8.2.1 Espaço de Entrada (Input Space)
Memória usada para armazenar os dados de entrada.

```c
void processar_array(int arr[], int n) {
    // arr[] usa n × sizeof(int) bytes
    // Não contamos isso na complexidade de espaço
}
```

#### 8.2.2 Espaço Auxiliar (Auxiliary Space)
Memória extra usada pelo algoritmo, além da entrada.

```c
void bubble_sort(int arr[], int n) {
    int temp;  // O(1) espaço auxiliar
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n-1; j++) {
            if (arr[j] > arr[j+1]) {
                temp = arr[j];      // Usa variável auxiliar
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
}
```

#### 8.2.3 Espaço Total
Entrada + Espaço auxiliar = Espaço total

### 8.3 Análise de Espaço: Exemplos Práticos

#### 8.3.1 Algoritmos com O(1) de Espaço

**Busca Linear:**
```c
int busca_linear(int arr[], int n, int valor) {
    int i;  // O(1) espaço
    for (i = 0; i < n; i++) {
        if (arr[i] == valor) {
            return i;
        }
    }
    return -1;
}
```

**Encontrar máximo:**
```c
int encontrar_maximo(int arr[], int n) {
    int max = arr[0];  // O(1) espaço
    int i;             // O(1) espaço
    
    for (i = 1; i < n; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;  // Total: O(1) espaço
}
```

#### 8.3.2 Algoritmos com O(n) de Espaço

**Merge Sort:**
```c
void merge_sort(int arr[], int inicio, int fim) {
    if (inicio < fim) {
        int meio = (inicio + fim) / 2;
        
        merge_sort(arr, inicio, meio);
        merge_sort(arr, meio + 1, fim);
        merge(arr, inicio, meio, fim);  // Usa arrays temporários
    }
}

void merge(int arr[], int inicio, int meio, int fim) {
    int n1 = meio - inicio + 1;
    int n2 = fim - meio;
    
    int esquerda[n1];  // O(n/2) espaço
    int direita[n2];   // O(n/2) espaço
    
    // ... resto da implementação
    // Total: O(n) espaço auxiliar
}
```

**Inversão de Array:**
```c
void inverter_array_copia(int arr[], int n) {
    int copia[n];  // O(n) espaço auxiliar
    
    for (int i = 0; i < n; i++) {     // O(n) tempo
        copia[i] = arr[n - 1 - i];    // O(1) operação
    }
    
    for (int i = 0; i < n; i++) {     // O(n) tempo
        arr[i] = copia[i];            // O(1) operação
    }
}

// Versão otimizada - O(1) espaço
void inverter_array_inplace(int arr[], int n) {
    int inicio = 0, fim = n - 1;     // O(1) espaço
    
    while (inicio < fim) {           // O(n/2) tempo
        int temp = arr[inicio];      // O(1) espaço
        arr[inicio] = arr[fim];
        arr[fim] = temp;
        inicio++;
        fim--;
    }
}
```

#### 8.3.3 Espaço em Recursão

**Fatorial Recursivo:**
```c
int fatorial(int n) {
    if (n <= 1) return 1;            // Caso base
    return n * fatorial(n - 1);      // Chamada recursiva
}
```

**Análise de espaço:**
- Cada chamada usa espaço na pilha de chamadas
- Profundidade máxima: n
- Espaço por chamada: O(1)
- **Espaço total: O(n)**

**Pilha de chamadas para fatorial(4):**
```
fatorial(4) → n=4, return address, variáveis locais
fatorial(3) → n=3, return address, variáveis locais
fatorial(2) → n=2, return address, variáveis locais
fatorial(1) → n=1, return address, variáveis locais
```

#### 8.3.4 Fibonacci: Recursivo vs Iterativo

**Versão Recursiva:**
```c
int fib_recursivo(int n) {
    if (n <= 1) return n;
    return fib_recursivo(n-1) + fib_recursivo(n-2);
}
```
- **Espaço:** O(n) - altura máxima da pilha

**Versão Iterativa:**
```c
int fib_iterativo(int n) {
    if (n <= 1) return n;
    
    int a = 0, b = 1, temp;  // O(1) espaço
    for (int i = 2; i <= n; i++) {
        temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}
```
- **Espaço:** O(1) - apenas variáveis locais

### 8.4 Trade-offs: Tempo vs Espaço

#### 8.4.1 Memoização: Trocando Espaço por Tempo

**Problema:** Fibonacci recursivo é O(2ⁿ) em tempo
**Solução:** Usar memória para armazenar resultados

```c
#define MAX_N 100
int memo[MAX_N];
int inicializado = 0;

int fib_memoizado(int n) {
    if (!inicializado) {
        for (int i = 0; i < MAX_N; i++) memo[i] = -1;
        inicializado = 1;
    }
    
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n];  // Já calculado
    
    memo[n] = fib_memoizado(n-1) + fib_memoizado(n-2);
    return memo[n];
}
```

**Trade-off:**
- **Tempo:** O(2ⁿ) → O(n)
- **Espaço:** O(n) → O(n) + array memo

#### 8.4.2 Contagem vs Armazenamento

**Problema:** Contar elementos únicos em array

**Versão com pouco espaço:**
```c
int contar_unicos_lento(int arr[], int n) {
    int count = 0;
    for (int i = 0; i < n; i++) {           // O(n²) tempo
        int unico = 1;
        for (int j = 0; j < i; j++) {       // O(1) espaço
            if (arr[i] == arr[j]) {
                unico = 0;
                break;
            }
        }
        if (unico) count++;
    }
    return count;
}
```

**Versão com mais espaço:**
```c
int contar_unicos_rapido(int arr[], int n) {
    int visitados[1000] = {0};  // O(k) espaço, k = range de valores
    int count = 0;
    
    for (int i = 0; i < n; i++) {           // O(n) tempo
        if (!visitados[arr[i]]) {           // O(k) espaço
            visitados[arr[i]] = 1;
            count++;
        }
    }
    return count;
}
```

### 8.5 Otimização de Espaço

#### 8.5.1 Reutilização de Memória

**Bubble Sort in-place:**
```c
void bubble_sort_otimizado(int arr[], int n) {
    int temp;  // Reutiliza a mesma variável
    for (int i = 0; i < n-1; i++) {
        for (int j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                temp = arr[j];        // Sempre a mesma variável
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
}
// Espaço: O(1) - apenas uma variável auxiliar
```

#### 8.5.2 Operações In-Place

**Reversão in-place:**
```c
void reverter_inplace(int arr[], int n) {
    int inicio = 0, fim = n - 1;
    
    while (inicio < fim) {
        // Troca sem variável auxiliar
        arr[inicio] = arr[inicio] + arr[fim];
        arr[fim] = arr[inicio] - arr[fim];
        arr[inicio] = arr[inicio] - arr[fim];
        
        inicio++;
        fim--;
    }
}
// Espaço: O(1)
```

### 8.6 Complexidade de Espaço em Estruturas de Dados

#### 8.6.1 Array Dinâmico

```c
typedef struct {
    int *dados;
    int tamanho;
    int capacidade;
} ArrayDinamico;

ArrayDinamico* criar_array(int capacidade_inicial) {
    ArrayDinamico *arr = malloc(sizeof(ArrayDinamico));     // O(1)
    arr->dados = malloc(capacidade_inicial * sizeof(int));  // O(n)
    arr->tamanho = 0;
    arr->capacidade = capacidade_inicial;
    return arr;
}
```
**Espaço:** O(n) onde n é a capacidade

#### 8.6.2 Lista Ligada

```c
typedef struct No {
    int dados;
    struct No *proximo;
} No;

typedef struct {
    No *cabeca;
    int tamanho;
} ListaLigada;
```

**Espaço por elemento:** O(1) + overhead do ponteiro
**Espaço total:** O(n) onde n é número de elementos

### 8.7 Análise Amortizada de Espaço

#### 8.7.1 Array Dinâmico com Redimensionamento

```c
void adicionar_elemento(ArrayDinamico *arr, int valor) {
    if (arr->tamanho >= arr->capacidade) {
        // Dobra a capacidade
        int nova_capacidade = arr->capacidade * 2;           // O(1)
        int *novos_dados = malloc(nova_capacidade * sizeof(int));  // O(novo_n)
        
        for (int i = 0; i < arr->tamanho; i++) {             // O(n)
            novos_dados[i] = arr->dados[i];
        }
        
        free(arr->dados);                                    // O(1)
        arr->dados = novos_dados;
        arr->capacidade = nova_capacidade;
    }
    
    arr->dados[arr->tamanho] = valor;                        // O(1)
    arr->tamanho++;
}
```

**Análise amortizada:**
- Maioria das inserções: O(1) tempo, O(1) espaço
- Inserções com redimensionamento: O(n) tempo, O(n) espaço
- **Amortizado:** O(1) tempo e espaço por operação

### 8.8 Exercícios de Complexidade de Espaço

#### 8.8.1 Exercício 1
Analise o espaço auxiliar:
```c
void imprimir_reverso_recursivo(int arr[], int n, int index) {
    if (index >= n) return;
    imprimir_reverso_recursivo(arr, n, index + 1);
    printf("%d ", arr[index]);
}
```

#### 8.8.2 Exercício 2
Compare o espaço das duas versões:
```c
// Versão A
int* duplicar_array_A(int arr[], int n) {
    int *novo = malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) {
        novo[i] = arr[i] * 2;
    }
    return novo;
}

// Versão B
void duplicar_array_B(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        arr[i] = arr[i] * 2;
    }
}
```

---

# PARTE III - ESTRUTURAS DE DADOS AVANÇADAS

## Capítulo 9: Árvores e Suas Variações

### 9.1 O Que São Árvores?

Imagine a genealogia de sua família: você tem pais, que têm pais (seus avós), e assim por diante. Ou pense na estrutura de pastas do seu computador: uma pasta pode conter outras pastas, que contêm mais pastas...

**Definição:** Uma árvore é uma estrutura de dados hierárquica composta por nós conectados por arestas, onde existe exatamente um caminho entre qualquer par de nós.

### 9.2 Terminologia das Árvores

#### 9.2.1 Conceitos Básicos

```
        A (raiz)
       / \
      B   C
     / \   \
    D   E   F (folhas)
```

**Terminologia:**
- **Raiz:** Nó no topo (A)
- **Folhas:** Nós sem filhos (D, E, F)
- **Pai:** Nó com filhos (A é pai de B e C)
- **Filhos:** Nós conectados abaixo (B e C são filhos de A)
- **Irmãos:** Nós com mesmo pai (B e C são irmãos)
- **Altura:** Maior distância da raiz até uma folha
- **Profundidade:** Distância de um nó até a raiz

#### 9.2.2 Propriedades Importantes

**Número de arestas:** Para n nós, sempre n-1 arestas
**Altura mínima:** log₂(n) (árvore balanceada)
**Altura máxima:** n-1 (árvore degenerada - como lista ligada)

### 9.3 Árvore Binária

#### 9.3.1 Definição
Cada nó tem no máximo 2 filhos: esquerdo e direito.

```c
typedef struct No {
    int dados;
    struct No *esquerdo;
    struct No *direito;
} No;

typedef struct {
    No *raiz;
} ArvoreBinaria;
```

#### 9.3.2 Criação de Nó
```c
No* criar_no(int valor) {
    No *novo = malloc(sizeof(No));       // O(1) tempo, O(1) espaço
    if (novo != NULL) {
        novo->dados = valor;             // O(1)
        novo->esquerdo = NULL;           // O(1)
        novo->direito = NULL;            // O(1)
    }
    return novo;
}
```

#### 9.3.3 Inserção em Árvore Binária de Busca
```c
No* inserir(No *raiz, int valor) {
    if (raiz == NULL) {                      // O(1)
        return criar_no(valor);              // O(1)
    }
    
    if (valor < raiz->dados) {               // O(1)
        raiz->esquerdo = inserir(raiz->esquerdo, valor);  // T(h)
    } else if (valor > raiz->dados) {        // O(1)
        raiz->direito = inserir(raiz->direito, valor);    // T(h)
    }
    
    return raiz;                             // O(1)
}
```

**Complexidade:**
- **Melhor caso:** O(log n) - árvore balanceada
- **Pior caso:** O(n) - árvore degenerada

### 9.4 Percursos em Árvores

#### 9.4.1 Percurso em Ordem (In-Order)
Esquerda → Raiz → Direita

```c
void percurso_em_ordem(No *raiz) {
    if (raiz != NULL) {                      // O(1)
        percurso_em_ordem(raiz->esquerdo);   // T(n/2)
        printf("%d ", raiz->dados);          // O(1)
        percurso_em_ordem(raiz->direito);    // T(n/2)
    }
}
```

**Para a árvore:**
```
    4
   / \
  2   6
 / \ / \
1  3 5  7
```
**Saída:** 1 2 3 4 5 6 7 (ordem crescente!)

#### 9.4.2 Percurso Pré-Ordem (Pre-Order)
Raiz → Esquerda → Direita

```c
void percurso_pre_ordem(No *raiz) {
    if (raiz != NULL) {                      // O(1)
        printf("%d ", raiz->dados);          // O(1)
        percurso_pre_ordem(raiz->esquerdo);  // T(n/2)
        percurso_pre_ordem(raiz->direito);   // T(n/2)
    }
}
```
**Saída:** 4 2 1 3 6 5 7

#### 9.4.3 Percurso Pós-Ordem (Post-Order)
Esquerda → Direita → Raiz

```c
void percurso_pos_ordem(No *raiz) {
    if (raiz != NULL) {                      // O(1)
        percurso_pos_ordem(raiz->esquerdo);  // T(n/2)
        percurso_pos_ordem(raiz->direito);   // T(n/2)
        printf("%d ", raiz->dados);          // O(1)
    }
}
```
**Saída:** 1 3 2 5 7 6 4

**Complexidade de todos os percursos:** O(n) - visita cada nó exatamente uma vez

### 9.5 Busca em Árvore Binária de Busca

```c
No* buscar(No *raiz, int valor) {
    if (raiz == NULL || raiz->dados == valor) {  // O(1)
        return raiz;
    }
    
    if (valor < raiz->dados) {                   // O(1)
        return buscar(raiz->esquerdo, valor);    // T(h)
    }
    
    return buscar(raiz->direito, valor);         // T(h)
}
```

**Complexidade:**
- **Árvore balanceada:** O(log n)
- **Árvore degenerada:** O(n)

### 9.6 Remoção em Árvore Binária de Busca

#### 9.6.1 Casos de Remoção

**Caso 1: Nó folha (sem filhos)**
```c
// Simplesmente remove o nó
if (esquerdo == NULL && direito == NULL) {
    free(no);
    return NULL;
}
```

**Caso 2: Nó com um filho**
```c
// Substitui o nó pelo seu único filho
if (esquerdo == NULL) {
    No *temp = direito;
    free(no);
    return temp;
} else if (direito == NULL) {
    No *temp = esquerdo;
    free(no);
    return temp;
}
```

**Caso 3: Nó com dois filhos**
```c
// Encontra o sucessor (menor valor da subárvore direita)
// ou predecessor (maior valor da subárvore esquerda)
No* encontrar_minimo(No *raiz) {
    while (raiz->esquerdo != NULL) {     // O(h)
        raiz = raiz->esquerdo;
    }
    return raiz;
}

No* remover(No *raiz, int valor) {
    if (raiz == NULL) return raiz;       // O(1)
    
    if (valor < raiz->dados) {           // O(1)
        raiz->esquerdo = remover(raiz->esquerdo, valor);
    } else if (valor > raiz->dados) {    // O(1)
        raiz->direito = remover(raiz->direito, valor);
    } else {
        // Nó encontrado
        if (raiz->esquerdo == NULL) {    // Caso 2a
            No *temp = raiz->direito;
            free(raiz);
            return temp;
        } else if (raiz->direito == NULL) {  // Caso 2b
            No *temp = raiz->esquerdo;
            free(raiz);
            return temp;
        }
        
        // Caso 3: dois filhos
        No *temp = encontrar_minimo(raiz->direito);  // O(h)
        raiz->dados = temp->dados;                   // O(1)
        raiz->direito = remover(raiz->direito, temp->dados);  // T(h)
    }
    return raiz;
}
```

### 9.7 Árvores Balanceadas: AVL

#### 9.7.1 Problema das Árvores Desbalanceadas

```
// Inserindo 1, 2, 3, 4, 5 em sequência:
1
 \
  2
   \
    3     ← Degenerou em lista ligada!
     \    ← Busca vira O(n)
      4
       \
        5
```

#### 9.7.2 Árvore AVL
**Propriedade:** Para qualquer nó, a diferença de altura entre subárvores esquerda e direita é no máximo 1.

```c
typedef struct NoAVL {
    int dados;
    int altura;
    struct NoAVL *esquerdo;
    struct NoAVL *direito;
} NoAVL;

int altura(NoAVL *no) {
    if (no == NULL) return 0;            // O(1)
    return no->altura;                   // O(1)
}

int fator_balanceamento(NoAVL *no) {
    if (no == NULL) return 0;            // O(1)
    return altura(no->esquerdo) - altura(no->direito);  // O(1)
}

void atualizar_altura(NoAVL *no) {
    if (no != NULL) {                    // O(1)
        int alt_esq = altura(no->esquerdo);    // O(1)
        int alt_dir = altura(no->direito);     // O(1)
        no->altura = 1 + (alt_esq > alt_dir ? alt_esq : alt_dir);  // O(1)
    }
}
```

#### 9.7.3 Rotações para Balanceamento

**Rotação à Direita:**
```c
NoAVL* rotacao_direita(NoAVL *y) {
    NoAVL *x = y->esquerdo;              // O(1)
    NoAVL *T2 = x->direito;              // O(1)
    
    // Realizar rotação
    x->direito = y;                      // O(1)
    y->esquerdo = T2;                    // O(1)
    
    // Atualizar alturas
    atualizar_altura(y);                 // O(1)
    atualizar_altura(x);                 // O(1)
    
    return x;  // Nova raiz               // O(1)
}
```

**Rotação à Esquerda:**
```c
NoAVL* rotacao_esquerda(NoAVL *x) {
    NoAVL *y = x->direito;               // O(1)
    NoAVL *T2 = y->esquerdo;             // O(1)
    
    // Realizar rotação
    y->esquerdo = x;                     // O(1)
    x->direito = T2;                     // O(1)
    
    // Atualizar alturas
    atualizar_altura(x);                 // O(1)
    atualizar_altura(y);                 // O(1)
    
    return y;  // Nova raiz               // O(1)
}
```

#### 9.7.4 Inserção com Balanceamento

```c
NoAVL* inserir_avl(NoAVL *raiz, int valor) {
    // 1. Inserção normal da BST
    if (raiz == NULL) {                          // O(1)
        return criar_no_avl(valor);              // O(1)
    }
    
    if (valor < raiz->dados) {                   // O(1)
        raiz->esquerdo = inserir_avl(raiz->esquerdo, valor);  // T(log n)
    } else if (valor > raiz->dados) {            // O(1)
        raiz->direito = inserir_avl(raiz->direito, valor);    // T(log n)
    } else {
        return raiz;  // Valor duplicado         // O(1)
    }
    
    // 2. Atualizar altura
    atualizar_altura(raiz);                      // O(1)
    
    // 3. Obter fator de balanceamento
    int balance = fator_balanceamento(raiz);     // O(1)
    
    // 4. Casos de desbalanceamento
    
    // Caso Esquerda-Esquerda
    if (balance > 1 && valor < raiz->esquerdo->dados) {
        return rotacao_direita(raiz);            // O(1)
    }
    
    // Caso Direita-Direita
    if (balance < -1 && valor > raiz->direito->dados) {
        return rotacao_esquerda(raiz);           // O(1)
    }
    
    // Caso Esquerda-Direita
    if (balance > 1 && valor > raiz->esquerdo->dados) {
        raiz->esquerdo = rotacao_esquerda(raiz->esquerdo);  // O(1)
        return rotacao_direita(raiz);                       // O(1)
    }
    
    // Caso Direita-Esquerda
    if (balance < -1 && valor < raiz->direito->dados) {
        raiz->direito = rotacao_direita(raiz->direito);     // O(1)
        return rotacao_esquerda(raiz);                      // O(1)
    }
    
    return raiz;  // Nó balanceado           // O(1)
}
```

**Complexidade da AVL:**
- **Inserção:** O(log n) garantido
- **Busca:** O(log n) garantido
- **Remoção:** O(log n) garantido

### 9.8 Comparação de Performance

| Operação | BST (pior caso) | BST (melhor caso) | AVL |
|----------|-----------------|-------------------|-----|
| Busca    | O(n)           | O(log n)          | O(log n) |
| Inserção | O(n)           | O(log n)          | O(log n) |
| Remoção  | O(n)           | O(log n)          | O(log n) |
| Espaço   | O(n)           | O(n)              | O(n) |

### 9.9 Aplicações Práticas de Árvores

#### 9.9.1 Sistema de Arquivos
```c
typedef struct Arquivo {
    char nome[100];
    int tamanho;
    int eh_diretorio;
    struct Arquivo *filhos;  // Lista de arquivos/pastas filhas
    struct Arquivo *proximo; // Próximo arquivo no mesmo nível
} Arquivo;
```

#### 9.9.2 Árvore de Expressões
Para avaliar expressões matemáticas como "(3 + 4) * 2":
```
    *
   / \
  +   2
 / \
3   4
```

#### 9.9.3 Índices de Banco de Dados
Bancos de dados usam B-trees (variação das árvores binárias) para indexação:
- Busca rápida: O(log n)
- Inserção eficiente: O(log n)
- Range queries otimizadas

### 9.10 Exercícios Práticos

#### 9.10.1 Exercício 1
Implemente uma função que conta o número de folhas em uma árvore binária.

#### 9.10.2 Exercício 2
Crie uma função que verifica se uma árvore binária é uma BST válida.

#### 9.10.3 Exercício 3
Desenvolva um algoritmo para encontrar o ancestral comum mais próximo de dois nós.

---

## Capítulo 10: Grafos e Algoritmos de Busca

### 10.1 O Que São Grafos?

Imagine um mapa de cidades conectadas por estradas, uma rede social onde pessoas são conectadas por amizades, ou o sistema de páginas da internet conectadas por links. Todos esses são exemplos de **grafos**.

**Definição:** Um grafo é uma estrutura composta por **vértices** (nós) conectados por **arestas** (links).

### 10.2 Tipos de Grafos

#### 10.2.1 Grafo Não-Direcionado
As conexões são bidirecionais (como estradas de mão dupla).

```
A --- B
|     |
|     |
C --- D
```

#### 10.2.2 Grafo Direcionado (Dígrafo)
As conexões têm direção (como ruas de mão única).

```
A --> B
^     |
|     v
C <-- D
```

#### 10.2.3 Representações em Código

**Lista de Adjacência:**
```c
typedef struct No {
    int vertice;
    struct No *proximo;
} No;

typedef struct {
    No **adjacentes;  // Array de listas
    int num_vertices;
} Grafo;

Grafo* criar_grafo(int vertices) {
    Grafo *g = malloc(sizeof(Grafo));                    // O(1)
    g->num_vertices = vertices;                          // O(1)
    g->adjacentes = malloc(vertices * sizeof(No*));     // O(V)
    
    for (int i = 0; i < vertices; i++) {                // O(V)
        g->adjacentes[i] = NULL;                        // O(1)
    }
    return g;
}
```

**Matriz de Adjacência:**
```c
typedef struct {
    int **matriz;
    int num_vertices;
} GrafoMatriz;

GrafoMatriz* criar_grafo_matriz(int vertices) {
    GrafoMatriz *g = malloc(sizeof(GrafoMatriz));       // O(1)
    g->num_vertices = vertices;                         // O(1)
    g->matriz = malloc(vertices * sizeof(int*));       // O(V)
    
    for (int i = 0; i < vertices; i++) {               // O(V)
        g->matriz[i] = calloc(vertices, sizeof(int));  // O(V)
    }
    return g;
}
```

### 10.3 Busca em Largura (BFS)

**Conceito:** Explora o grafo nível por nível, como ondas se expandindo na água.

**Analogia:** É como procurar suas chaves perdidas:
1. Primeiro verifica onde você está
2. Depois verifica todos os lugares próximos
3. Só então vai para lugares mais distantes

```c
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

typedef struct {
    int *items;
    int frente, tras, tamanho;
} Fila;

void bfs(Grafo *g, int inicio) {
    bool *visitado = calloc(g->num_vertices, sizeof(bool));  // O(V)
    Fila *fila = criar_fila(g->num_vertices);               // O(V)
    
    visitado[inicio] = true;                                // O(1)
    enqueue(fila, inicio);                                  // O(1)
    
    printf("BFS a partir do vértice %d: ", inicio);
    
    while (!fila_vazia(fila)) {                            // O(V) iterações
        int atual = dequeue(fila);                         // O(1)
        printf("%d ", atual);                              // O(1)
        
        // Visitar todos os vizinhos
        No *temp = g->adjacentes[atual];
        while (temp != NULL) {                             // O(E) total
            int vizinho = temp->vertice;                   // O(1)
            if (!visitado[vizinho]) {                      // O(1)
                visitado[vizinho] = true;                  // O(1)
                enqueue(fila, vizinho);                    // O(1)
            }
            temp = temp->proximo;                          // O(1)
        }
    }
    
    printf("\n");
    free(visitado);                                        // O(1)
    destruir_fila(fila);                                   // O(1)
}
```

**Complexidade BFS:** O(V + E) onde V = vértices, E = arestas

### 10.4 Busca em Profundidade (DFS)

**Conceito:** Explora o grafo indo o mais fundo possível antes de voltar.

**Analogia:** É como explorar um labirinto sempre seguindo em frente até encontrar um beco sem saída, aí volta e tenta outro caminho.

```c
void dfs_recursivo(Grafo *g, int vertice, bool *visitado) {
    visitado[vertice] = true;                              // O(1)
    printf("%d ", vertice);                                // O(1)
    
    // Visitar todos os vizinhos não visitados
    No *temp = g->adjacentes[vertice];
    while (temp != NULL) {                                 // O(E) total
        int vizinho = temp->vertice;                       // O(1)
        if (!visitado[vizinho]) {                          // O(1)
            dfs_recursivo(g, vizinho, visitado);           // T(V)
        }
        temp = temp->proximo;                              // O(1)
    }
}

void dfs(Grafo *g, int inicio) {
    bool *visitado = calloc(g->num_vertices, sizeof(bool)); // O(V)
    
    printf("DFS a partir do vértice %d: ", inicio);
    dfs_recursivo(g, inicio, visitado);                    // O(V + E)
    printf("\n");
    
    free(visitado);                                        // O(1)
}
```

**Complexidade DFS:** O(V + E)

### 10.5 Comparação BFS vs DFS

| Característica | BFS | DFS |
|----------------|-----|-----|
| Estrutura auxiliar | Fila | Pilha (recursão) |
| Uso de memória | O(V) | O(V) |
| Encontra caminho mínimo | Sim | Não |
| Detecta ciclos | Sim | Sim |
| Aplicação típica | Shortest path | Topological sort |

### 10.6 Aplicações Práticas

#### 10.6.1 Menor Caminho (BFS)
```c
int menor_caminho(Grafo *g, int origem, int destino) {
    if (origem == destino) return 0;                       // O(1)
    
    bool *visitado = calloc(g->num_vertices, sizeof(bool)); // O(V)
    int *distancia = malloc(g->num_vertices * sizeof(int)); // O(V)
    Fila *fila = criar_fila(g->num_vertices);              // O(V)
    
    visitado[origem] = true;                               // O(1)
    distancia[origem] = 0;                                 // O(1)
    enqueue(fila, origem);                                 // O(1)
    
    while (!fila_vazia(fila)) {                           // O(V)
        int atual = dequeue(fila);                        // O(1)
        
        No *temp = g->adjacentes[atual];
        while (temp != NULL) {                            // O(E) total
            int vizinho = temp->vertice;                  // O(1)
            if (!visitado[vizinho]) {                     // O(1)
                visitado[vizinho] = true;                 // O(1)
                distancia[vizinho] = distancia[atual] + 1; // O(1)
                enqueue(fila, vizinho);                   // O(1)
                
                if (vizinho == destino) {                 // O(1)
                    int resultado = distancia[destino];   // O(1)
                    free(visitado);                       // O(1)
                    free(distancia);                      // O(1)
                    destruir_fila(fila);                  // O(1)
                    return resultado;
                }
            }
            temp = temp->proximo;                         // O(1)
        }
    }
    
    free(visitado);                                       // O(1)
    free(distancia);                                      // O(1)
    destruir_fila(fila);                                  // O(1)
    return -1;  // Destino não alcançável
}
```

#### 10.6.2 Detecção de Ciclos (DFS)
```c
bool tem_ciclo_util(Grafo *g, int v, bool *visitado, bool *pilha_recursao) {
    visitado[v] = true;                                   // O(1)
    pilha_recursao[v] = true;                            // O(1)
    
    No *temp = g->adjacentes[v];
    while (temp != NULL) {                               // O(E) total
        int vizinho = temp->vertice;                     // O(1)
        
        if (!visitado[vizinho]) {                        // O(1)
            if (tem_ciclo_util(g, vizinho, visitado, pilha_recursao)) {
                return true;
            }
        } else if (pilha_recursao[vizinho]) {            // O(1)
            return true;  // Ciclo encontrado!
        }
        temp = temp->proximo;                            // O(1)
    }
    
    pilha_recursao[v] = false;                           // O(1)
    return false;
}

bool tem_ciclo(Grafo *g) {
    bool *visitado = calloc(g->num_vertices, sizeof(bool));     // O(V)
    bool *pilha_recursao = calloc(g->num_vertices, sizeof(bool)); // O(V)
    
    for (int i = 0; i < g->num_vertices; i++) {          // O(V)
        if (!visitado[i]) {                              // O(1)
            if (tem_ciclo_util(g, i, visitado, pilha_recursao)) {
                free(visitado);                          // O(1)
                free(pilha_recursao);                    // O(1)
                return true;
            }
        }
    }
    
    free(visitado);                                      // O(1)
    free(pilha_recursao);                                // O(1)
    return false;
}
```

---

## Capítulo 11: Algoritmos de Ordenação

### 11.1 Por Que Ordenar?

Ordenar dados é uma das operações mais fundamentais em computação. Imagine tentar encontrar um nome na lista telefônica se ela não estivesse ordenada alfabeticamente, ou procurar um livro em uma biblioteca onde os livros estão organizados aleatoriamente.

**Benefícios da ordenação:**
- Busca mais rápida (busca binária)
- Melhor apresentação visual
- Facilita outras operações (merge, intersecção)
- Otimiza algoritmos que dependem de ordem

### 11.2 Bubble Sort - O Método Mais Simples

**Conceito:** Compara elementos adjacentes e os troca se estiverem fora de ordem. Como bolhas que sobem na água.

```c
void bubble_sort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {              // O(n) iterações
        bool houve_troca = false;                  // O(1)
        
        for (int j = 0; j < n - i - 1; j++) {      // O(n) iterações
            if (arr[j] > arr[j + 1]) {             // O(1) comparação
                // Trocar elementos
                int temp = arr[j];                 // O(1)
                arr[j] = arr[j + 1];               // O(1)
                arr[j + 1] = temp;                 // O(1)
                houve_troca = true;                // O(1)
            }
        }
        
        // Otimização: se não houve troca, já está ordenado
        if (!houve_troca) break;                   // O(1)
    }
}
```

**Análise de Complexidade:**
- **Melhor caso:** O(n) - array já ordenado
- **Pior caso:** O(n²) - array em ordem decrescente  
- **Caso médio:** O(n²)
- **Espaço:** O(1) - ordena in-place

**Visualização para [64, 34, 25, 12]:**
```
Iteração 1: [34, 25, 12, 64] - 64 "borbulha" para o final
Iteração 2: [25, 12, 34, 64] - 34 vai para posição correta
Iteração 3: [12, 25, 34, 64] - 25 vai para posição correta
```

### 11.3 Selection Sort - Selecionando o Menor

**Conceito:** A cada iteração, encontra o menor elemento e o coloca na posição correta.

```c
void selection_sort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {              // O(n) iterações
        int min_idx = i;                           // O(1)
        
        // Encontrar o menor elemento no resto do array
        for (int j = i + 1; j < n; j++) {          // O(n) iterações
            if (arr[j] < arr[min_idx]) {           // O(1) comparação
                min_idx = j;                       // O(1)
            }
        }
        
        // Trocar com a posição atual
        if (min_idx != i) {                        // O(1)
            int temp = arr[i];                     // O(1)
            arr[i] = arr[min_idx];                 // O(1)
            arr[min_idx] = temp;                   // O(1)
        }
    }
}
```

**Análise:**
- **Todos os casos:** O(n²) - sempre faz todas as comparações
- **Espaço:** O(1)
- **Vantagem:** Faz poucas trocas (no máximo n-1)

### 11.4 Insertion Sort - Inserindo na Posição Correta

**Conceito:** Como organizar cartas na mão - pega uma carta e a insere na posição correta entre as já organizadas.

```c
void insertion_sort(int arr[], int n) {
    for (int i = 1; i < n; i++) {                  // O(n) iterações
        int chave = arr[i];                        // O(1)
        int j = i - 1;                             // O(1)
        
        // Mover elementos maiores que a chave para frente
        while (j >= 0 && arr[j] > chave) {         // O(n) no pior caso
            arr[j + 1] = arr[j];                   // O(1)
            j--;                                   // O(1)
        }
        
        arr[j + 1] = chave;                        // O(1)
    }
}
```

**Análise:**
- **Melhor caso:** O(n) - array já ordenado
- **Pior caso:** O(n²) - array em ordem decrescente
- **Caso médio:** O(n²)
- **Espaço:** O(1)
- **Vantagem:** Eficiente para arrays pequenos

### 11.5 Merge Sort - Dividir para Conquistar

**Conceito:** Divide o array pela metade recursivamente, ordena cada metade e depois as mescla.

```c
void merge(int arr[], int inicio, int meio, int fim) {
    int n1 = meio - inicio + 1;                    // O(1)
    int n2 = fim - meio;                           // O(1)
    
    // Arrays temporários
    int esquerda[n1], direita[n2];                 // O(n) espaço
    
    // Copiar dados para arrays temporários
    for (int i = 0; i < n1; i++) {                 // O(n1)
        esquerda[i] = arr[inicio + i];             // O(1)
    }
    for (int j = 0; j < n2; j++) {                 // O(n2)
        direita[j] = arr[meio + 1 + j];            // O(1)
    }
    
    // Mesclar os arrays temporários de volta em arr[]
    int i = 0, j = 0, k = inicio;                  // O(1)
    
    while (i < n1 && j < n2) {                     // O(n) no total
        if (esquerda[i] <= direita[j]) {           // O(1)
            arr[k] = esquerda[i];                  // O(1)
            i++;                                   // O(1)
        } else {
            arr[k] = direita[j];                   // O(1)
            j++;                                   // O(1)
        }
        k++;                                       // O(1)
    }
    
    // Copiar elementos restantes
    while (i < n1) {                               // O(n1)
        arr[k] = esquerda[i];                      // O(1)
        i++;                                       // O(1)
        k++;                                       // O(1)
    }
    
    while (j < n2) {                               // O(n2)
        arr[k] = direita[j];                       // O(1)
        j++;                                       // O(1)
        k++;                                       // O(1)
    }
}

void merge_sort(int arr[], int inicio, int fim) {
    if (inicio < fim) {                            // O(1)
        int meio = inicio + (fim - inicio) / 2;    // O(1)
        
        merge_sort(arr, inicio, meio);             // T(n/2)
        merge_sort(arr, meio + 1, fim);            // T(n/2)
        merge(arr, inicio, meio, fim);             // O(n)
    }
}
```

**Análise:**
- **Todos os casos:** O(n log n) - sempre divide pela metade
- **Espaço:** O(n) - arrays temporários
- **Vantagem:** Performance consistente

### 11.6 Quick Sort - O Método Mais Usado

**Conceito:** Escolhe um "pivô", particiona o array (menores à esquerda, maiores à direita) e ordena recursivamente.

```c
int particionar(int arr[], int baixo, int alto) {
    int pivo = arr[alto];                          // O(1) - último elemento como pivô
    int i = baixo - 1;                             // O(1)
    
    for (int j = baixo; j < alto; j++) {           // O(n) iterações
        if (arr[j] < pivo) {                       // O(1)
            i++;                                   // O(1)
            
            // Trocar arr[i] e arr[j]
            int temp = arr[i];                     // O(1)
            arr[i] = arr[j];                       // O(1)
            arr[j] = temp;                         // O(1)
        }
    }
    
    // Colocar pivô na posição correta
    int temp = arr[i + 1];                         // O(1)
    arr[i + 1] = arr[alto];                        // O(1)
    arr[alto] = temp;                              // O(1)
    
    return i + 1;                                  // O(1)
}

void quick_sort(int arr[], int baixo, int alto) {
    if (baixo < alto) {                            // O(1)
        int pi = particionar(arr, baixo, alto);    // O(n)
        
        quick_sort(arr, baixo, pi - 1);            // T(?)
        quick_sort(arr, pi + 1, alto);             // T(?)
    }
}
```

**Análise:**
- **Melhor caso:** O(n log n) - pivô sempre divide pela metade
- **Pior caso:** O(n²) - pivô sempre é o menor/maior
- **Caso médio:** O(n log n)
- **Espaço:** O(log n) - pilha de recursão

### 11.7 Comparação dos Algoritmos de Ordenação

| Algoritmo | Melhor Caso | Caso Médio | Pior Caso | Espaço | Estável? |
|-----------|-------------|------------|-----------|---------|----------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) | Sim |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) | Não |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) | Sim |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | Sim |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | Não |

**Estabilidade:** Um algoritmo é estável se mantém a ordem relativa de elementos iguais.

### 11.8 Quando Usar Cada Algoritmo?

#### 11.8.1 Arrays Pequenos (n < 50)
**Insertion Sort** - Simples e eficiente para poucos elementos

#### 11.8.2 Arrays Grandes com Garantia de Performance
**Merge Sort** - O(n log n) garantido, mas usa mais memória

#### 11.8.3 Arrays Grandes com Boa Performance Média
**Quick Sort** - Rápido na prática, mas O(n²) no pior caso

#### 11.8.4 Situações com Pouca Memória
**Quick Sort ou Heap Sort** - Ordenam in-place

### 11.9 Algoritmo Híbrido: TimSort

Usado pelo Python e Java, combina Merge Sort e Insertion Sort:

```c
void tim_sort(int arr[], int n) {
    int MIN_MERGE = 32;
    
    // Usar insertion sort para pequenos pedaços
    for (int i = 0; i < n; i += MIN_MERGE) {       // O(n/32) iterações
        int fim = (i + MIN_MERGE - 1 < n - 1) ? 
                  (i + MIN_MERGE - 1) : (n - 1);
        insertion_sort_range(arr, i, fim);         // O(32²) = O(1024) ≈ O(1)
    }
    
    // Começar merge de tamanho MIN_MERGE
    for (int tamanho = MIN_MERGE; tamanho < n; tamanho *= 2) {  // O(log n)
        for (int inicio = 0; inicio < n; inicio += tamanho * 2) {  // O(n/tamanho)
            int meio = inicio + tamanho - 1;
            int fim = (inicio + tamanho * 2 - 1 < n - 1) ? 
                      (inicio + tamanho * 2 - 1) : (n - 1);
            
            if (meio < fim) {
                merge(arr, inicio, meio, fim);     // O(tamanho)
            }
        }
    }
}
```

**Vantagens do TimSort:**
- O(n) no melhor caso (dados já parcialmente ordenados)
- O(n log n) no pior caso
- Estável
- Adaptativo (aproveita ordem existente)

---

## Capítulo 12: Programação Dinâmica

### 12.1 O Que é Programação Dinâmica?

Imagine que você está calculando o termo 40 da sequência de Fibonacci usando recursão simples. Você percebe que está calculando fibonacci(20) centenas de vezes! Programação dinâmica resolve isso: **calcule uma vez, use sempre**.

**Princípio:** Quebrar problemas complexos em subproblemas menores e **armazenar** os resultados para evitar recálculos.

### 12.2 Quando Usar Programação Dinâmica?

#### 12.2.1 Subestrutura Ótima
A solução ótima do problema contém soluções ótimas dos subproblemas.

#### 12.2.2 Subproblemas Sobrepostos
Os mesmos subproblemas aparecem várias vezes.

### 12.3 Fibonacci: Do Exponencial ao Linear

#### 12.3.1 Versão Recursiva Ingênua - O(2ⁿ)
```c
int fib_recursivo(int n) {
    if (n <= 1) return n;                          // O(1)
    return fib_recursivo(n-1) + fib_recursivo(n-2); // 2^n chamadas
}
```

#### 12.3.2 Versão com Memoização (Top-Down) - O(n)
```c
#define MAX_N 100
int memo[MAX_N];
bool calculado[MAX_N];

int fib_memoizado(int n) {
    if (n <= 1) return n;                          // O(1)
    
    if (calculado[n]) {                            // O(1)
        return memo[n];                            // O(1) - resultado já existe
    }
    
    memo[n] = fib_memoizado(n-1) + fib_memoizado(n-2);  // Calcula apenas uma vez
    calculado[n] = true;                           // O(1)
    return memo[n];                                // O(1)
}
```

#### 12.3.3 Versão Iterativa (Bottom-Up) - O(n)
```c
int fib_dp(int n) {
    if (n <= 1) return n;                          // O(1)
    
    int dp[n + 1];                                 // O(n) espaço
    dp[0] = 0;                                     // O(1)
    dp[1] = 1;                                     // O(1)
    
    for (int i = 2; i <= n; i++) {                 // O(n) iterações
        dp[i] = dp[i-1] + dp[i-2];                 // O(1)
    }
    
    return dp[n];                                  // O(1)
}
```

#### 12.3.4 Versão Otimizada em Espaço - O(1)
```c
int fib_otimizado(int n) {
    if (n <= 1) return n;                          // O(1)
    
    int prev2 = 0, prev1 = 1, atual;              // O(1) espaço
    
    for (int i = 2; i <= n; i++) {                 // O(n) tempo
        atual = prev1 + prev2;                     // O(1)
        prev2 = prev1;                             // O(1)
        prev1 = atual;                             // O(1)
    }
    
    return atual;                                  // O(1)
}
```

### 12.4 Problema da Mochila (0/1 Knapsack)

**Problema:** Você tem uma mochila com capacidade W e n itens, cada um com peso e valor. Maximize o valor sem exceder a capacidade.

#### 12.4.1 Solução Recursiva
```c
int knapsack_recursivo(int capacidade, int pesos[], int valores[], int n) {
    // Caso base
    if (n == 0 || capacidade == 0) {              // O(1)
        return 0;
    }
    
    // Se o peso do último item é maior que a capacidade,
    // não pode ser incluído
    if (pesos[n-1] > capacidade) {                // O(1)
        return knapsack_recursivo(capacidade, pesos, valores, n-1);
    }
    
    // Retorna o máximo entre incluir ou não incluir o último item
    int incluir = valores[n-1] + 
        knapsack_recursivo(capacidade - pesos[n-1], pesos, valores, n-1);
    int nao_incluir = 
        knapsack_recursivo(capacidade, pesos, valores, n-1);
    
    return (incluir > nao_incluir) ? incluir : nao_incluir;
}
```
**Complexidade:** O(2ⁿ) - exponencial

#### 12.4.2 Solução com Programação Dinâmica
```c
int knapsack_dp(int capacidade, int pesos[], int valores[], int n) {
    // Criar tabela DP
    int dp[n + 1][capacidade + 1];                // O(n × W) espaço
    
    // Inicializar casos base
    for (int i = 0; i <= n; i++) {                // O(n)
        dp[i][0] = 0;  // Capacidade 0 = valor 0
    }
    for (int w = 0; w <= capacidade; w++) {       // O(W)
        dp[0][w] = 0;  // 0 itens = valor 0
    }
    
    // Preencher tabela bottom-up
    for (int i = 1; i <= n; i++) {                // O(n)
        for (int w = 1; w <= capacidade; w++) {   // O(W)
            if (pesos[i-1] <= w) {                 // O(1)
                // Pode incluir o item i
                int incluir = valores[i-1] + dp[i-1][w - pesos[i-1]];
                int nao_incluir = dp[i-1][w];
                dp[i][w] = (incluir > nao_incluir) ? incluir : nao_incluir;
            } else {
                // Não pode incluir o item i
                dp[i][w] = dp[i-1][w];             // O(1)
            }
        }
    }
    
    return dp[n][capacidade];                      // O(1)
}
```
**Complexidade:** O(n × W) tempo e espaço

#### 12.4.3 Reconstruindo a Solução
```c
void imprimir_solucao(int capacidade, int pesos[], int valores[], int n) {
    int dp[n + 1][capacidade + 1];
    
    // Preencher tabela (mesmo código anterior)
    // ... código do knapsack_dp ...
    
    // Reconstruir solução
    int w = capacidade;
    printf("Itens selecionados:\n");
    
    for (int i = n; i > 0 && dp[i][w] > 0; i--) { // O(n)
        if (dp[i][w] != dp[i-1][w]) {              // O(1)
            printf("Item %d (peso: %d, valor: %d)\n", 
                   i-1, pesos[i-1], valores[i-1]);
            w -= pesos[i-1];                       // O(1)
        }
    }
}
```

### 12.5 Longest Common Subsequence (LCS)

**Problema:** Encontrar a maior subsequência comum entre duas strings.

Exemplo: "ABCDGH" e "AEDFHR" → LCS = "ADH" (tamanho 3)

```c
int lcs_dp(char X[], char Y[], int m, int n) {
    int dp[m + 1][n + 1];                          // O(m × n) espaço
    
    // Casos base
    for (int i = 0; i <= m; i++) {                 // O(m)
        dp[i][0] = 0;
    }
    for (int j = 0; j <= n; j++) {                 // O(n)
        dp[0][j] = 0;
    }
    
    // Preencher tabela
    for (int i = 1; i <= m; i++) {                 // O(m)
        for (int j = 1; j <= n; j++) {             // O(n)
            if (X[i-1] == Y[j-1]) {                // O(1)
                dp[i][j] = dp[i-1][j-1] + 1;       // Caracteres iguais
            } else {
                dp[i][j] = (dp[i-1][j] > dp[i][j-1]) ? 
                           dp[i-1][j] : dp[i][j-1]; // Pega o máximo
            }
        }
    }
    
    return dp[m][n];                               // O(1)
}
```

**Complexidade:** O(m × n) tempo e espaço

### 12.6 Otimização de Espaço

Muitos problemas de DP só precisam da linha/coluna anterior:

```c
int lcs_otimizado(char X[], char Y[], int m, int n) {
    int dp[2][n + 1];                              // O(n) espaço apenas!
    
    for (int i = 0; i <= m; i++) {                 // O(m)
        for (int j = 0; j <= n; j++) {             // O(n)
            if (i == 0 || j == 0) {
                dp[i % 2][j] = 0;
            } else if (X[i-1] == Y[j-1]) {
                dp[i % 2][j] = dp[(i-1) % 2][j-1] + 1;
            } else {
                dp[i % 2][j] = (dp[(i-1) % 2][j] > dp[i % 2][j-1]) ?
                               dp[(i-1) % 2][j] : dp[i % 2][j-1];
            }
        }
    }
    
    return dp[m % 2][n];
}
```

### 12.7 Coin Change Problem

**Problema:** Dado um valor e denominações de moedas, encontrar o número mínimo de moedas para formar o valor.

```c
int coin_change(int moedas[], int m, int valor) {
    int dp[valor + 1];                             // O(V) espaço
    
    dp[0] = 0;                                     // 0 moedas para valor 0
    
    for (int v = 1; v <= valor; v++) {             // O(V)
        dp[v] = INT_MAX;                           // Inicializar como infinito
        
        for (int i = 0; i < m; i++) {              // O(m)
            if (moedas[i] <= v && dp[v - moedas[i]] != INT_MAX) {
                dp[v] = (dp[v] < dp[v - moedas[i]] + 1) ? 
                        dp[v] : dp[v - moedas[i]] + 1;
            }
        }
    }
    
    return (dp[valor] == INT_MAX) ? -1 : dp[valor];
}
```

**Complexidade:** O(m × V) onde m = número de moedas, V = valor

### 12.8 Padrões Comuns em DP

#### 12.8.1 1D DP (Linear)
- Fibonacci
- Coin Change
- Longest Increasing Subsequence

#### 12.8.2 2D DP (Tabela)
- Knapsack
- LCS
- Edit Distance

#### 12.8.3 Técnicas de Otimização
1. **Eliminar dimensões desnecessárias**
2. **Usar apenas o que é necessário da iteração anterior**
3. **Rolling array technique**

---

## Capítulo 13: Conclusão e Próximos Passos

### 13.1 O Que Aprendemos

Nesta jornada através do mundo dos algoritmos e complexidade, exploramos:

**Fundamentos:**
- O que são algoritmos e suas características
- Como criar e usar funções efetivamente
- Estruturas de dados básicas e avançadas
- Gerenciamento de memória com ponteiros

**Análise de Complexidade:**
- Notação Big O e famílias de complexidade
- Como analisar tempo e espaço
- Técnicas para otimização

**Estruturas de Dados:**
- Arrays, listas, pilhas, filas
- Árvores e suas variações (BST, AVL)
- Grafos e algoritmos de busca

**Algoritmos Clássicos:**
- Algoritmos de ordenação
- Programação dinâmica
- Algoritmos gulosos

### 13.2 Hierarquia de Eficiência

```
O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!)

Excelente → Bom → Aceitável → Ruim → Muito Ruim → Impraticável
```

### 13.3 Escolhendo o Algoritmo Certo

#### 13.3.1 Perguntas Importantes
1. **Qual o tamanho típico dos dados?**
2. **Performance ou simplicidade é mais importante?**
3. **Há restrições de memória?**
4. **Os dados têm alguma característica especial?**

#### 13.3.2 Guia de Decisão Rápida

**Para Busca:**
- Dados não ordenados: Busca linear O(n)
- Dados ordenados: Busca binária O(log n)
- Acesso frequente: Hash table O(1) médio

**Para Ordenação:**
- Arrays pequenos (< 50): Insertion sort
- Garantia de performance: Merge sort
- Performance média boa: Quick sort
- Pouca memória: Heap sort

**Para Problemas de Otimização:**
- Subestrutura ótima + subproblemas sobrepostos: DP
- Escolha local ótima leva à global: Greedy
- Espaço de busca pequeno: Força bruta

### 13.4 Dicas para Implementação

#### 13.4.1 Sempre Considere
1. **Casos extremos** (array vazio, um elemento)
2. **Overflow** em cálculos
3. **Gerenciamento de memória** (malloc/free)
4. **Validação de entrada**

#### 13.4.2 Processo de Desenvolvimento
1. **Entenda o problema completamente**
2. **Pense em exemplos pequenos**
3. **Implemente a solução mais simples primeiro**
4. **Teste com casos extremos**
5. **Otimize se necessário**

### 13.5 Próximos Tópicos para Estudar

#### 13.5.1 Algoritmos Avançados
- Algoritmos de grafos (Dijkstra, Floyd-Warshall)
- Algoritmos de string (KMP, Rabin-Karp)
- Algoritmos geométricos
- Programação linear

#### 13.5.2 Estruturas de Dados Avançadas
- B-trees e B+-trees
- Trie (árvore de prefixos)
- Segment trees
- Fenwick trees

#### 13.5.3 Tópicos Especializados
- Algoritmos paralelos
- Algoritmos aproximados
- Complexidade computacional (P vs NP)
- Criptografia e segurança

### 13.6 Recursos para Continuar Aprendendo

#### 13.6.1 Livros Recomendados
- "Introduction to Algorithms" - Cormen et al.
- "Algorithm Design" - Kleinberg & Tardos
- "The Algorithm Design Manual" - Skiena

#### 13.6.2 Plataformas Online
- LeetCode
- HackerRank
- CodeChef
- Codeforces

#### 13.6.3 Cursos Online
- Coursera (Algorithms Specialization)
- edX (MIT Introduction to Algorithms)
- Khan Academy

### 13.7 Mensagem Final

Algoritmos e estruturas de dados são as ferramentas fundamentais de todo programador. Dominar esses conceitos não apenas torna você um melhor desenvolvedor, mas também melhora sua capacidade de resolver problemas em todas as áreas da vida.

**Lembre-se:**
- **Prática** é essencial - implemente os algoritmos
- **Entendimento** é mais importante que memorização
- **Otimização prematura** é a raiz de todos os males
- **Simplicidade** muitas vezes vence complexidade

O mundo da computação está em constante evolução, mas os fundamentos que você aprendeu aqui permanecerão relevantes. Use este conhecimento como base para explorar novos horizontes e criar soluções inovadoras.

**Boa sorte em sua jornada algorítmica!**

---

## Apêndice A: Tabela de Complexidades

| Estrutura/Algoritmo | Busca | Inserção | Remoção | Espaço |
|---------------------|-------|----------|---------|---------|
| Array | O(n) | O(n) | O(n) | O(n) |
| Lista Ligada | O(n) | O(1) | O(1) | O(n) |
| Pilha | O(n) | O(1) | O(1) | O(n) |
| Fila | O(n) | O(1) | O(1) | O(n) |
| BST (pior) | O(n) | O(n) | O(n) | O(n) |
| BST (médio) | O(log n) | O(log n) | O(log n) | O(n) |
| AVL | O(log n) | O(log n) | O(log n) | O(n) |
| Hash Table | O(1)* | O(1)* | O(1)* | O(n) |

*Complexidade média; pior caso pode ser O(n)

## Apêndice B: Código de Referência

### B.1 Estruturas Básicas

```c
// Lista Ligada
typedef struct No {
    int dados;
    struct No *proximo;
} No;

// Árvore Binária
typedef struct NoArvore {
    int dados;
    struct NoArvore *esquerdo, *direito;
} NoArvore;

// Grafo (Lista de Adjacência)
typedef struct {
    No **adjacentes;
    int vertices;
} Grafo;
```

### B.2 Algoritmos Essenciais

```c
// Busca Binária
int busca_binaria(int arr[], int n, int x) {
    int esq = 0, dir = n - 1;
    while (esq <= dir) {
        int meio = esq + (dir - esq) / 2;
        if (arr[meio] == x) return meio;
        if (arr[meio] < x) esq = meio + 1;
        else dir = meio - 1;
    }
    return -1;
}

// Quick Sort
void quick_sort(int arr[], int baixo, int alto) {
    if (baixo < alto) {
        int pi = particionar(arr, baixo, alto);
        quick_sort(arr, baixo, pi - 1);
        quick_sort(arr, pi + 1, alto);
    }
}
```

---

**FIM DO LIVRO**

*"O conhecimento é o único bem que aumenta quando compartilhado."*

**Autor:** Prof. Vagner Cordeiro  
**Versão:** 1.0 - Agosto 2025  
**Páginas:** 200+  
**Exemplos de código:** 100+  
**Exercícios:** 50+
