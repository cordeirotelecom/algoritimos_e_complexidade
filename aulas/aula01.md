
# Aula 01: Algoritmos – Funções e Passagem de Parâmetros (Versão Didática)

> **Objetivo:** Aprender o que é algoritmo, como criar funções, como passar valores para funções e entender o escopo das variáveis, de forma simples e prática.

---

## 1. O que é um Algoritmo? (Explicação Simples)

Um **algoritmo** é como uma receita de bolo: uma lista de passos para resolver um problema.

**Exemplo do dia a dia:**
- Receita para escovar os dentes:
    1. Pegar a escova
    2. Colocar pasta
    3. Escovar os dentes
    4. Enxaguar a boca

**Características de um algoritmo:**
- Tem começo e fim (finitude)
- Cada passo é claro (definição)
- Pode ter entrada (ingredientes)
- Tem saída (bolo pronto)
- Cada passo pode ser feito (efetividade)

---

## 2. Funções: O que são e para que servem?

**Função** é um bloco de código que faz uma tarefa específica. Imagine uma função como uma “máquina” que recebe algo, faz um trabalho e devolve um resultado.

**Analogia:**
- Função = Liquidificador
- Entrada = Frutas
- Saída = Suco

**Por que usar funções?**
- Deixa o código organizado (modularidade)
- Evita repetição (reutilização)
- Facilita manutenção e leitura

---

## 3. Como criar uma função em C (Passo a Passo)

```c
// Exemplo: Função que calcula o quadrado de um número
int quadrado(int numero) {         // O(1) – operação simples
    return numero * numero;       // O(1)
}
```

**Explicando:**
- `int` → tipo do resultado (número inteiro)
- `quadrado` → nome da função
- `(int numero)` → recebe um número inteiro
- `return` → devolve o resultado

**Como usar a função:**

```c
#include <stdio.h>

int quadrado(int numero) {
    return numero * numero; // O(1)
}

int main() {
    int valor = 5; // O(1)
    printf("O quadrado de %d é %d\n", valor, quadrado(valor)); // O(1)
    return 0;
}
```

**Saída:**
```
O quadrado de 5 é 25
```

**Complexidade:** Todas as linhas acima são O(1) (tempo constante).

---

## 4. Mais Exemplos de Funções (Passo a Passo)

### 4.1 Função que verifica se um número é par

**Conceito:** Um número par é divisível por 2. Usamos o operador `%` (resto da divisão).

```c
int eh_par(int numero) {
    return (numero % 2 == 0);  // O(1) - verifica resto da divisão
}
```

**Como funciona:**
- Se `numero % 2` for 0 → é par → retorna 1 (verdadeiro)
- Se `numero % 2` for 1 → é ímpar → retorna 0 (falso)

**Exemplo completo:**

```c
#include <stdio.h>

int quadrado(int numero) {
    return numero * numero;  // O(1)
}

int eh_par(int numero) {
    return (numero % 2 == 0);  // O(1)
}

int main() {
    int valor = 5;  // O(1)
    printf("O quadrado de %d é %d\n", valor, quadrado(valor));  // O(1)
    printf("%d é %s\n", valor, eh_par(valor) ? "par" : "ímpar");  // O(1)
    return 0;
}
```

**Saída:**
```
O quadrado de 5 é 25
5 é ímpar
```

---
```

## 5. Passagem de Parâmetros: Como enviar dados para funções

**Analogia:** Imagine que você vai emprestar um livro para um amigo. Existem duas formas:

1. **Xerox do livro** (passagem por valor) → ele pode rabiscar a xerox, mas seu livro original fica intacto
2. **Livro original** (passagem por referência) → ele pode escrever no livro e isso afeta o seu livro

### 5.1 Passagem por Valor (Cópia dos dados)

Na **passagem por valor**, a função recebe uma **cópia** do valor. Mudanças não afetam a variável original.

```c
#include <stdio.h>

void incrementa_valor(int x) {
    x = x + 1;  // O(1) - modifica apenas a cópia
    printf("Dentro da função: %d\n", x);  // O(1)
}

int main() {
    int numero = 10;  // O(1)
    printf("Antes da função: %d\n", numero);  // O(1)
    incrementa_valor(numero);  // O(1) - passa cópia de numero
    printf("Depois da função: %d\n", numero);  // O(1)
    return 0;
}
```

**Saída:**
```
Antes da função: 10
Dentro da função: 11
Depois da função: 10  ← número original não mudou!
```

**Por que não mudou?** A função trabalhou com uma cópia, não com o número original.

### 5.2 Passagem por Referência (Usando o endereço)

Na **passagem por referência**, enviamos o **endereço** da variável. Mudanças afetam a variável original.

```c
#include <stdio.h>

void incrementa_referencia(int *x) {
    *x = *x + 1;  // O(1) - modifica o valor no endereço
    printf("Dentro da função: %d\n", *x);  // O(1)
}

int main() {
    int numero = 10;  // O(1)
    printf("Antes da função: %d\n", numero);  // O(1)
    incrementa_referencia(&numero);  // O(1) - passa endereço de numero
    printf("Depois da função: %d\n", numero);  // O(1)
    return 0;
}
**Saída:**
```
Antes da função: 10
Dentro da função: 11
Depois da função: 11  ← número original mudou!
```

**Por que mudou?** A função trabalhou diretamente com o endereço da variável original.

**Símbolos importantes:**
- `&numero` → pega o endereço da variável `numero`
- `*x` → acessa o valor que está no endereço `x`

### 5.3 Passagem de Arrays (Sempre por referência)

**Conceito:** Arrays são sempre passados por referência em C, mesmo sem usar `*` ou `&`.

```c
#include <stdio.h>

void imprime_array(int arr[], int tamanho) {
    for (int i = 0; i < tamanho; i++) {  // O(n) - percorre n elementos
        printf("%d ", arr[i]);  // O(1) - imprime cada elemento
    }
    printf("\n");  // O(1)
}

void dobra_valores(int arr[], int tamanho) {
    for (int i = 0; i < tamanho; i++) {  // O(n) - percorre n elementos
        arr[i] = arr[i] * 2;  // O(1) - dobra cada elemento
    }
}

int main() {
    int numeros[] = {1, 2, 3, 4, 5};  // O(1) - criação do array
    int tam = 5;  // O(1)
    
    printf("Array original: ");  // O(1)
    imprime_array(numeros, tam);  // O(n)
    
    dobra_valores(numeros, tam);  // O(n)
    
    printf("Array modificado: ");  // O(1)
    imprime_array(numeros, tam);  // O(n)
    
    return 0;
}
```

**Saída:**
```
Array original: 1 2 3 4 5
Array modificado: 2 4 6 8 10
```

**Complexidade total:** O(n), onde n é o tamanho do array.

---
```

## 6. Escopo de Variáveis: Onde as variáveis "vivem"

**Analogia:** Pense nas variáveis como pessoas em diferentes cômodos de uma casa:
- **Locais:** vivem apenas em um quarto específico
- **Globais:** podem circular por toda a casa

### 6.1 Variáveis Locais (Vivem apenas dentro da função)

```c
#include <stdio.h>

void funcao_exemplo() {
    int local = 20;  // O(1) - variável local desta função
    printf("Variável local: %d\n", local);  // O(1)
}

int main() {
    int local = 10;  // O(1) - outra variável local (diferente!)
    printf("Variável local do main: %d\n", local);  // O(1)
    funcao_exemplo();  // O(1)
    printf("De volta ao main: %d\n", local);  // O(1) - ainda vale 10
    return 0;
}
```

**Saída:**
```
Variável local do main: 10
Variável local: 20
De volta ao main: 10
```

**Explicação:** Cada função tem sua própria variável `local`. Elas não se misturam!

### 6.2 Variáveis Globais (Vivem em toda a casa)

```c
#include <stdio.h>

int global = 100;  // O(1) - variável global (fora de todas as funções)

void modifica_global() {
    global = global + 50;  // O(1) - modifica a variável global
    printf("Global modificada: %d\n", global);  // O(1)
}

int main() {
    printf("Global inicial: %d\n", global);  // O(1)
    modifica_global();  // O(1)
    printf("Global no main: %d\n", global);  // O(1)
    return 0;
}
```

**Saída:**
```
Global inicial: 100
Global modificada: 150
Global no main: 150
```

**Explicação:** A variável global pode ser acessada e modificada por qualquer função.

**⚠️ Cuidado:** Use variáveis globais com moderação, pois podem tornar o código difícil de entender.

---
```

## 7. Exemplos Práticos Simplificados

### 7.1 Calculadora Básica com Funções

```c
#include <stdio.h>

float somar(float a, float b) {
    return a + b;  // O(1)
}

float subtrair(float a, float b) {
    return a - b;  // O(1)
}

void menu() {
    printf("\n=== CALCULADORA SIMPLES ===\n");  // O(1)
    printf("1. Somar\n");                       // O(1)
    printf("2. Subtrair\n");                    // O(1)
    printf("Escolha: ");                        // O(1)
}

int main() {
    int opcao;                           // O(1)
    float num1, num2, resultado;         // O(1)
    
    menu();                              // O(1)
    scanf("%d", &opcao);                 // O(1)
    
    printf("Digite dois números: ");     // O(1)
    scanf("%f %f", &num1, &num2);       // O(1)
    
    if (opcao == 1) {                    // O(1)
        resultado = somar(num1, num2);   // O(1)
        printf("%.2f + %.2f = %.2f\n", num1, num2, resultado);
    } else if (opcao == 2) {             // O(1)
        resultado = subtrair(num1, num2); // O(1)
        printf("%.2f - %.2f = %.2f\n", num1, num2, resultado);
    }
    
    return 0;
}
```

**Complexidade total:** O(1) - operações constantes

### 7.2 Funções Matemáticas Básicas

```c
#include <stdio.h>

int eh_par(int n) {
    return (n % 2 == 0);  // O(1)
}

int fatorial_simples(int n) {
    int resultado = 1;    // O(1)
    for (int i = 1; i <= n; i++) {  // O(n) - loop n vezes
        resultado *= i;   // O(1)
    }
    return resultado;     // O(1)
}

int main() {
    int numero = 5;       // O(1)
    
    printf("Número: %d\n", numero);                           // O(1)
    printf("É par? %s\n", eh_par(numero) ? "Sim" : "Não");   // O(1)
    printf("Fatorial: %d\n", fatorial_simples(numero));      // O(n)
    
    return 0;
}
```

**Saída:**
```
Número: 5
É par? Não
Fatorial: 120
```

---

## 8. Exercícios Práticos (Para Fixar o Aprendizado)

### 8.1 Exercícios Básicos

**1. Área do Círculo**
Crie uma função que calcule a área de um círculo dado o raio.
```c
float area_circulo(float raio) {
    return 3.14159 * raio * raio;  // O(1)
}
```

**2. Conversor de Temperatura**
Implemente uma função que converta Celsius para Fahrenheit.
```c
float celsius_para_fahrenheit(float celsius) {
    return (celsius * 9.0 / 5.0) + 32.0;  // O(1)
}
```

**3. Maior de Três Números**
Desenvolva uma função que encontre o maior entre três números.
```c
int maior_de_tres(int a, int b, int c) {
    if (a >= b && a >= c) return a;       // O(1)
    if (b >= c) return b;                 // O(1)
    return c;                             // O(1)
}
```

### 8.2 Exercícios para Praticar

**4. Contador de Dígitos**
Crie uma função que conte quantos dígitos tem um número.

**5. Verificador de Número Primo**
Implemente uma função que verifica se um número é primo.

**6. Calculadora de Média**
Desenvolva uma função que calcule a média de um array de números.

---

## 9. Resumo da Aula (Pontos Principais)

### 9.1 O Que Aprendemos

✅ **Algoritmos** são como receitas: sequência de passos para resolver problemas

✅ **Funções** são blocos de código reutilizáveis que fazem tarefas específicas

✅ **Passagem por valor** envia cópia → não modifica original

✅ **Passagem por referência** envia endereço → modifica original

✅ **Variáveis locais** vivem apenas dentro da função

✅ **Variáveis globais** podem ser acessadas por qualquer função

### 9.2 Complexidades Aprendidas

- **O(1):** Operações simples (atribuições, comparações)
- **O(n):** Loops que percorrem arrays
- **O(n²):** Loops aninhados

### 9.3 Dicas Importantes

💡 **Nome das funções:** Use nomes descritivos (`calcular_area` em vez de `calc`)

💡 **Uma função, uma tarefa:** Cada função deve fazer apenas uma coisa

💡 **Comentários:** Explique O QUE a função faz, não COMO

💡 **Teste sempre:** Verifique se a função funciona com diferentes valores

---

## 10. Próxima Aula

Na **Aula 02**, vamos estudar:

🔹 **Estruturas de dados homogêneas** (arrays/vetores)  
🔹 **Estruturas de dados heterogêneas** (structs)  
🔹 **Ponteiros em detalhes** (como funcionam na prática)  
🔹 **Gerenciamento de memória**  

**Prepare-se para** entender como organizar e manipular dados de forma eficiente!

---

## Bibliografia e Referências

📚 **Livros:**
- Cormen, T.H. et al. *Introduction to Algorithms*, 4ª ed., Cap. 1-2
- Kernighan, B.W.; Ritchie, D.M. *The C Programming Language*, 2ª ed., Cap. 1-4

📚 **Recursos Online:**
- [Visualgo.net](https://visualgo.net) - Visualização de algoritmos
- [GeeksforGeeks](https://geeksforgeeks.org) - Tutoriais detalhados

---

**✨ Parabéns! Você completou sua primeira aula sobre algoritmos e funções! ✨**

*Lembre-se: a prática leva à perfeição. Implemente os exercícios e experimente criar suas próprias funções!*
