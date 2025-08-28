# Aula 03: Análise de Complexidade de Algoritmos

## Objetivos da Aula
- Compreender o conceito de complexidade computacional
- Aprender a notação Big O, Ômega e Theta
- Analisar complexidade de tempo e espaço
- Exercitar análise de algoritmos simples

## 1. Introdução à Análise de Complexidade

### Por que Analisar Algoritmos?

A análise de algoritmos nos permite:
- **Prever performance** antes de implementar
- **Comparar algoritmos** objetivamente
- **Escolher a melhor solução** para cada cenário
- **Otimizar** código de forma inteligente

### Exemplo Motivacional

Considere o problema: encontrar o maior elemento em uma lista.

**Algoritmo 1: Busca Linear**
```
maior = lista[0]
para i de 1 até n-1:
    se lista[i] > maior:
        maior = lista[i]
```

**Algoritmo 2: Ordenar e Pegar o Último**
```
ordenar(lista)
maior = lista[n-1]
```

Ambos resolvem o problema, mas qual é melhor?

## 2. Notação Assintótica

### Big O (O) - Limite Superior

**Definição:** f(n) = O(g(n)) se existem constantes c > 0 e n₀ > 0 tais que f(n) ≤ c·g(n) para todo n ≥ n₀.

**Significado prático:** "No pior caso, o algoritmo não será pior que..."

### Ômega (Ω) - Limite Inferior

**Definição:** f(n) = Ω(g(n)) se existem constantes c > 0 e n₀ > 0 tais que f(n) ≥ c·g(n) para todo n ≥ n₀.

**Significado prático:** "No melhor caso, o algoritmo precisa de pelo menos..."

### Theta (Θ) - Limite Exato

**Definição:** f(n) = Θ(g(n)) se f(n) = O(g(n)) e f(n) = Ω(g(n)).

**Significado prático:** "O algoritmo cresce exatamente na ordem de..."

## 3. Complexidades Comuns

### O(1) - Constante
- Acessar elemento de array por índice
- Operações aritméticas básicas
- Inserção/remoção no início de lista ligada

**Exemplo:**
```
def acessar_elemento(lista, indice):
    return lista[indice]  # O(1)
```

### O(log n) - Logarítmica
- Busca binária
- Operações em árvores balanceadas
- Algoritmos "dividir para conquistar"

**Exemplo:**
```
def busca_binaria(lista, item):
    inicio, fim = 0, len(lista) - 1
    while inicio <= fim:
        meio = (inicio + fim) // 2
        if lista[meio] == item:
            return meio
        elif lista[meio] < item:
            inicio = meio + 1
        else:
            fim = meio - 1
    return -1
```

### O(n) - Linear
- Busca linear
- Percorrer array/lista uma vez
- Encontrar máximo/mínimo

**Exemplo:**
```
def busca_linear(lista, item):
    for i in range(len(lista)):
        if lista[i] == item:
            return i
    return -1
```

### O(n log n) - Linearítmica
- Algoritmos eficientes de ordenação (Merge Sort, Quick Sort)
- Multiplicação de matrizes otimizada

### O(n²) - Quadrática
- Algoritmos de ordenação simples (Bubble Sort, Selection Sort)
- Comparar todos os pares de elementos

**Exemplo:**
```
def bubble_sort(lista):
    n = len(lista)
    for i in range(n):
        for j in range(0, n - i - 1):
            if lista[j] > lista[j + 1]:
                lista[j], lista[j + 1] = lista[j + 1], lista[j]
```

### O(2ⁿ) - Exponencial
- Algoritmos de força bruta para problemas NP
- Fibonacci recursivo ingênuo
- Geração de todos os subconjuntos

## 4. Análise de Complexidade de Espaço

Além do tempo, devemos analisar o **espaço (memória)** usado pelo algoritmo.

### Exemplos:

**Busca Linear:**
- Tempo: O(n)
- Espaço: O(1) - apenas variáveis auxiliares

**Merge Sort:**
- Tempo: O(n log n)
- Espaço: O(n) - array auxiliar para merge

**Quick Sort:**
- Tempo: O(n log n) médio, O(n²) pior caso
- Espaço: O(log n) - pilha de recursão

## 5. Exercícios Práticos

### Exercício 1: Análise Básica

Analise a complexidade dos seguintes algoritmos:

```python
# Algoritmo A
def soma_elementos(lista):
    soma = 0
    for elemento in lista:
        soma += elemento
    return soma
```

```python
# Algoritmo B
def produto_pares(lista):
    for i in range(len(lista)):
        for j in range(i + 1, len(lista)):
            print(lista[i] * lista[j])
```

```python
# Algoritmo C
def busca_recursiva(lista, item, inicio=0):
    if inicio >= len(lista):
        return -1
    if lista[inicio] == item:
        return inicio
    return busca_recursiva(lista, item, inicio + 1)
```

### Exercício 2: Comparação de Algoritmos

Para o problema de encontrar elementos duplicados em uma lista:

**Algoritmo 1: Força Bruta**
```python
def tem_duplicatas_v1(lista):
    for i in range(len(lista)):
        for j in range(i + 1, len(lista)):
            if lista[i] == lista[j]:
                return True
    return False
```

**Algoritmo 2: Usando Set**
```python
def tem_duplicatas_v2(lista):
    return len(lista) != len(set(lista))
```

Analise e compare ambos os algoritmos.

## 6. Gabarito dos Exercícios

### Exercício 1:

**Algoritmo A (soma_elementos):**
- Complexidade de tempo: O(n) - um loop que percorre toda a lista
- Complexidade de espaço: O(1) - apenas uma variável auxiliar

**Algoritmo B (produto_pares):**
- Complexidade de tempo: O(n²) - loops aninhados
- Complexidade de espaço: O(1) - apenas variáveis auxiliares

**Algoritmo C (busca_recursiva):**
- Complexidade de tempo: O(n) - no pior caso, percorre toda a lista
- Complexidade de espaço: O(n) - pilha de recursão com n chamadas

### Exercício 2:

**Algoritmo 1 (força bruta):**
- Tempo: O(n²) - compara cada par de elementos
- Espaço: O(1) - sem estruturas auxiliares

**Algoritmo 2 (usando set):**
- Tempo: O(n) - criar set é O(n), comparar tamanhos é O(1)
- Espaço: O(n) - set pode conter até n elementos únicos

**Conclusão:** Algoritmo 2 é mais eficiente em tempo, mas usa mais espaço.

## 7. Dicas para Análise

### Passo a Passo:
1. **Identifique loops:** Cada loop aninhado multiplica a complexidade
2. **Analise recursão:** Use árvore de recursão ou equações de recorrência
3. **Considere melhor e pior caso:** Nem sempre são iguais
4. **Não esqueça do espaço:** Memória também é um recurso limitado

### Armadilhas Comuns:
- Confundir complexidade média com pior caso
- Ignorar complexidade de espaço
- Não considerar otimizações do compilador/interpretador
- Focar apenas em Big O, ignorando constantes quando elas importam

## 8. Próximos Passos

Na próxima aula, estudaremos:
- Estruturas de dados fundamentais
- Como a escolha da estrutura afeta a complexidade
- Análise amortizada
- Algoritmos de ordenação e suas complexidades

## Resumo da Aula

- **Complexidade** mede como algoritmos se comportam com o crescimento da entrada
- **Big O** descreve o pior caso, **Ômega** o melhor caso, **Theta** o caso exato
- **Análise de espaço** é tão importante quanto análise de tempo
- **Prática** é essencial para dominar a análise de algoritmos

---

**Material preparado para estudo de Algoritmos e Complexidade**  
*Foco em compreensão teórica e aplicação prática*
