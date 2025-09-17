# Revisão de Análise de Algoritmos

## Índice
1. [Introdução à Análise de Algoritmos](#introdução-à-análise-de-algoritmos)
2. [Complexidade de Tempo e Espaço](#complexidade-de-tempo-e-espaço)
3. [Notação Big-O](#notação-big-o)
4. [Estruturas de Dados Fundamentais](#estruturas-de-dados-fundamentais)
5. [Algoritmos de Ordenação](#algoritmos-de-ordenação)
6. [Algoritmos de Busca](#algoritmos-de-busca)
7. [**RECURSIVIDADE**](#recursividade)
8. [Algoritmos em Árvores](#algoritmos-em-árvores)
9. [Algoritmos de Grafos](#algoritmos-de-grafos)
10. [Programação Dinâmica](#programação-dinâmica)
11. [Exercícios Práticos](#exercícios-práticos)

---

## Introdução à Análise de Algoritmos

### O que é um Algoritmo?
Um algoritmo é uma sequência finita de instruções bem definidas e não ambíguas para resolver um problema computacional específico.

### Características de um Bom Algoritmo:
- **Finitude**: Deve terminar após um número finito de passos
- **Definição**: Cada passo deve ser precisamente definido
- **Entrada**: Zero ou mais entradas
- **Saída**: Uma ou mais saídas
- **Efetividade**: Cada operação deve ser básica o suficiente para ser executada

### Análise de Algoritmos
A análise de algoritmos é o processo de determinar a quantidade de recursos computacionais (tempo e espaço) que um algoritmo consome.

---

## Complexidade de Tempo e Espaço

### Complexidade de Tempo
Mede o tempo de execução de um algoritmo em função do tamanho da entrada.

### Complexidade de Espaço
Mede a quantidade de memória necessária para executar um algoritmo.

### Casos de Análise:
- **Melhor Caso**: Menor tempo possível para qualquer entrada de tamanho n
- **Caso Médio**: Tempo médio para todas as entradas possíveis de tamanho n
- **Pior Caso**: Maior tempo possível para qualquer entrada de tamanho n

---

## Notação Big-O

A notação Big-O descreve o comportamento assintótico de algoritmos, ou seja, **como o tempo de execução cresce em relação ao tamanho da entrada**.

### 🎯 **Como Entender Big-O de Forma Simples:**

Imagine que você tem uma tarefa para fazer e precisa saber quanto tempo vai demorar:
- **O(1)**: Não importa quantos dados você tem, sempre demora o mesmo tempo
- **O(n)**: Se você tem 10 itens, demora X tempo. Se tem 100 itens, demora 10X tempo
- **O(n²)**: Se você tem 10 itens, demora X tempo. Se tem 100 itens, demora 100X tempo!

### 📊 **Visualização do Crescimento:**

```
Para n = 10:
O(1)     = 1          ⭐ Excelente
O(log n) = 3          ⭐ Muito bom  
O(n)     = 10         ✅ Bom
O(n log n) = 33       ✅ Aceitável
O(n²)    = 100        ⚠️ Cuidado
O(2ⁿ)    = 1024       ❌ Evitar
O(n!)    = 3,628,800  💀 Impraticável

Para n = 1000:
O(1)     = 1              ⭐ Ainda excelente
O(log n) = 10             ⭐ Ainda muito bom
O(n)     = 1,000          ✅ Ainda bom
O(n log n) = 10,000       ✅ Ainda aceitável
O(n²)    = 1,000,000      ❌ Já problemático
O(2ⁿ)    = 10^301         💀 Impossível
```

### 🏆 **Classes de Complexidade - Do Melhor ao Pior:**

| Ranking | Notação | Nome | Exemplo Prático | Quando usar |
|---------|---------|------|------------------|-------------|
| 🥇 | O(1) | **Constante** | Pegar item da geladeira | Acesso direto |
| 🥈 | O(log n) | **Logarítmica** | Buscar palavra no dicionário | Busca inteligente |
| 🥉 | O(n) | **Linear** | Ler um livro página por página | Verificar todos |
| 4º | O(n log n) | **Linearítmica** | Organizar cartas de forma eficiente | Ordenação boa |
| 5º | O(n²) | **Quadrática** | Comparar todos com todos | Pequenas entradas |
| 6º | O(n³) | **Cúbica** | Três loops aninhados | Evitar |
| 7º | O(2ⁿ) | **Exponencial** | Testar todas combinações | Só para problemas pequenos |
| 💀 | O(n!) | **Fatorial** | Testar todas permutações | Praticamente impossível |

### 🧠 **Como Calcular Big-O - Passo a Passo:**

#### **Passo 1: Identifique os loops**
```python
# Um loop = O(n)
for i in range(n):
    print(i)  # O(1)
# Total: O(n)

# Dois loops aninhados = O(n²)
for i in range(n):      # n vezes
    for j in range(n):  # n vezes para cada i
        print(i, j)     # O(1)
# Total: O(n²)
```

#### **Passo 2: Some as complexidades**
```python
# Operações em sequência se somam
for i in range(n):      # O(n)
    print(i)

for j in range(n):      # O(n)
    print(j)

# Total: O(n) + O(n) = O(2n) = O(n)
```

#### **Passo 3: Aplique as regras de simplificação**

### ⚖️ **Regras de Ouro para Big-O:**

1. **📏 Constantes são ignoradas**: 
   - O(2n) = O(n)
   - O(100) = O(1)
   - O(n/2) = O(n)

2. **👑 Termo dominante vence**: 
   - O(n² + n) = O(n²)
   - O(n + log n) = O(n)
   - O(n³ + n² + n + 1) = O(n³)

3. **😱 Sempre considere o pior caso**:
   - Mesmo que às vezes seja rápido, Big-O mede o pior cenário

### 🎮 **Exemplos Práticos com Explicação:**

#### **Exemplo 1: Busca Linear**
```python
def encontrar_numero(lista, numero):
    for i in range(len(lista)):  # No pior caso, percorre toda a lista
        if lista[i] == numero:   # O(1) para cada comparação
            return i
    return -1

# Análise: No pior caso, o número está no final ou não existe
# Precisa verificar todos os n elementos
# Complexidade: O(n)
```

#### **Exemplo 2: Busca em Pares**
```python
def encontrar_par(lista):
    for i in range(len(lista)):        # n iterações
        for j in range(i+1, len(lista)): # n-1, n-2, ..., 1 iterações
            if lista[i] + lista[j] == 10:
                return (i, j)
    return None

# Análise: Dois loops aninhados
# Total de comparações: (n-1) + (n-2) + ... + 1 = n(n-1)/2
# Complexidade: O(n²)
```

### 🔍 **Como Identificar Complexidade Rapidamente:**

```python
# Padrões comuns:

# 1. Um loop simples = O(n)
for item in lista:
    fazer_algo()

# 2. Loop dividindo pela metade = O(log n)
while n > 1:
    n = n // 2

# 3. Dois loops aninhados = O(n²)
for i in range(n):
    for j in range(n):
        fazer_algo()

# 4. Loop dentro de função recursiva = O(n²) ou mais
def recursiva(n):
    if n <= 1: return
    for i in range(n):  # O(n)
        fazer_algo()
    recursiva(n-1)      # Chama n vezes

# 5. Dividir e conquistar = O(n log n)
def merge_sort(lista):
    # Divide: O(log n) níveis
    # Conquista: O(n) em cada nível
    # Total: O(n log n)
```

### ⚡ **Dicas para Melhorar Complexidade:**

#### **✅ Do Ruim para o Bom:**

```python
# ❌ Ruim: O(n²) - Busca em lista
def buscar_duplicata_ruim(lista):
    for i in range(len(lista)):
        for j in range(i+1, len(lista)):
            if lista[i] == lista[j]:
                return True
    return False

# ✅ Bom: O(n) - Usando conjunto
def buscar_duplicata_bom(lista):
    visto = set()
    for item in lista:
        if item in visto:
            return True
        visto.add(item)
    return False
```

### 📈 **Gráfico Mental de Crescimento:**

Para entender visualmente como cada complexidade cresce:

```
n=1    n=10   n=100  n=1000
O(1):     |      |      |      |     (sempre igual)
O(log n): |     ||     |||    ||||   (cresce devagar)
O(n):     |   ||||||||||||  ||||...  (cresce linear)
O(n²):    |     ||||    ||||||||...  (cresce rápido)
O(2ⁿ):    |      💥      💥💥💥💥💥   (explode)
```

---

## Estruturas de Dados Fundamentais

### Array/Vetor
- **Acesso**: O(1)
- **Busca**: O(n)
- **Inserção**: O(n) - no meio, O(1) - no final
- **Remoção**: O(n) - no meio, O(1) - no final

### Lista Ligada
- **Acesso**: O(n)
- **Busca**: O(n)
- **Inserção**: O(1) - conhecendo a posição
- **Remoção**: O(1) - conhecendo a posição

### Pilha (Stack)
- **Push**: O(1)
- **Pop**: O(1)
- **Top**: O(1)

### Fila (Queue)
- **Enqueue**: O(1)
- **Dequeue**: O(1)
- **Front**: O(1)

---

## Algoritmos de Ordenação

### Bubble Sort
- **Complexidade**: O(n²)
- **Estável**: Sim
- **In-place**: Sim

### Selection Sort
- **Complexidade**: O(n²)
- **Estável**: Não
- **In-place**: Sim

### Insertion Sort
- **Complexidade**: O(n²) - pior caso, O(n) - melhor caso
- **Estável**: Sim
- **In-place**: Sim

### Merge Sort
- **Complexidade**: O(n log n)
- **Estável**: Sim
- **In-place**: Não

### Quick Sort
- **Complexidade**: O(n log n) - médio, O(n²) - pior caso
- **Estável**: Não
- **In-place**: Sim

---

## Algoritmos de Busca

### Busca Linear
```python
def busca_linear(lista, elemento):
    for i in range(len(lista)):
        if lista[i] == elemento:
            return i
    return -1
```
**Complexidade**: O(n)

### Busca Binária
```python
def busca_binaria(lista, elemento):
    esquerda, direita = 0, len(lista) - 1
    
    while esquerda <= direita:
        meio = (esquerda + direita) // 2
        if lista[meio] == elemento:
            return meio
        elif lista[meio] < elemento:
            esquerda = meio + 1
        else:
            direita = meio - 1
    
    return -1
```
**Complexidade**: O(log n)

---

# RECURSIVIDADE

## 🎯 **Conceitos Fundamentais - Explicação Simples**

### O que é Recursividade?
**Recursividade é como ensinar alguém a subir escadas:**
- 📝 **Regra simples**: "Para subir N degraus, suba 1 degrau e depois suba os N-1 restantes"
- 🛑 **Regra de parada**: "Se não há mais degraus (N=0), você chegou!"

**Em programação:** Uma função que chama ela mesma para resolver problemas menores do mesmo tipo.

### 🧩 **Os 3 Ingredientes Mágicos da Recursividade:**

#### 1. 🛑 **Caso Base (Base Case)**
```
A condição que PARA a recursão
Sem ele = Loop infinito = 💥 Crash!
```

#### 2. 🔄 **Caso Recursivo (Recursive Case)**  
```
A função chama ela mesma com um problema MENOR
```

#### 3. 📉 **Progresso em Direção ao Caso Base**
```
Cada chamada deve nos aproximar da parada
```

### 🏗️ **Receita Universal para Recursividade:**

```python
def minha_funcao_recursiva(problema):
    # 🛑 PRIMEIRO: Verificar caso base
    if problema_muito_simples:
        return solucao_direta
    
    # 🔄 SEGUNDO: Quebrar o problema
    problema_menor = reduzir_problema(problema)
    
    # 🔗 TERCEIRO: Chamar recursivamente  
    resultado_parcial = minha_funcao_recursiva(problema_menor)
    
    # 🎯 QUARTO: Combinar resultado
    return combinar(problema_atual, resultado_parcial)
```

---

## 📚 **Exemplos Explicados Passo a Passo**

### 🥇 **Exemplo 1: Fatorial - O Clássico**

#### **🤔 Como Pensar:**
"Para calcular 5!, preciso de 5 × 4!. Para calcular 4!, preciso de 4 × 3!..."

#### **📊 Definição Matemática:**
```
n! = n × (n-1) × (n-2) × ... × 1
Casos especiais: 0! = 1, 1! = 1
```

#### **💻 Implementação Comentada:**
```python
def fatorial(n):
    # 🛑 CASO BASE: números pequenos têm resposta direta
    if n == 0 or n == 1:
        print(f"  Caso base: {n}! = 1")
        return 1
    
    # 🔄 CASO RECURSIVO: quebrar o problema
    print(f"  Calculando {n}! = {n} × {n-1}!")
    resultado_menor = fatorial(n - 1)  # Problema menor
    resultado_final = n * resultado_menor  # Combinar
    
    print(f"  Resultado: {n}! = {resultado_final}")
    return resultado_final

# 🎮 Testando:
print("Calculando 4!:")
resultado = fatorial(4)
print(f"Resposta final: {resultado}")
```

#### **🎬 Filme da Execução:**
```
Calculando 4!:
  Calculando 4! = 4 × 3!
    Calculando 3! = 3 × 2!
      Calculando 2! = 2 × 1!
        Caso base: 1! = 1
      Resultado: 2! = 2
    Resultado: 3! = 6
  Resultado: 4! = 24
Resposta final: 24
```

#### **🧠 Visualização da Pilha de Chamadas:**
```
Descendo (Chamadas):          Subindo (Retornos):
fatorial(4)                   fatorial(4) ← 24
├─ fatorial(3)               ├─ fatorial(3) ← 6  
   ├─ fatorial(2)            │  ├─ fatorial(2) ← 2
      ├─ fatorial(1)         │  │  ├─ fatorial(1) ← 1
         └─ retorna 1        │  │  └─ 2 × 1 = 2
                             │  └─ 3 × 2 = 6  
                             └─ 4 × 6 = 24
```

### 🥈 **Exemplo 2: Fibonacci - O Famoso**

#### **🤔 Como Pensar:**
"Para saber quantos coelhos tem no mês N, preciso somar os coelhos do mês N-1 com os do mês N-2"

#### **📈 A Sequência:**
```
F(0)=0, F(1)=1, F(2)=1, F(3)=2, F(4)=3, F(5)=5, F(6)=8...
Cada número = soma dos dois anteriores
```

#### **💻 Versão Simples (Ineficiente):**
```python
def fibonacci_simples(n):
    print(f"  Calculando F({n})")
    
    # 🛑 CASOS BASE
    if n == 0:
        print(f"  Caso base: F(0) = 0")
        return 0
    if n == 1:
        print(f"  Caso base: F(1) = 1")
        return 1
    
    # 🔄 CASO RECURSIVO: somar os dois anteriores
    print(f"  F({n}) = F({n-1}) + F({n-2})")
    esquerda = fibonacci_simples(n - 1)
    direita = fibonacci_simples(n - 2)
    resultado = esquerda + direita
    
    print(f"  F({n}) = {esquerda} + {direita} = {resultado}")
    return resultado

# Problema: O(2ⁿ) - muito lento!
```

#### **🚀 Versão Otimizada com Memoização:**
```python
def fibonacci_otimizado(n, memo={}):
    """
    Memo = dicionário que lembra resultados já calculados
    Se já calculamos F(n) antes, só retornamos o valor salvo!
    """
    
    # 💾 Já calculamos antes?
    if n in memo:
        print(f"  🎯 Cache hit! F({n}) = {memo[n]} (já sabia)")
        return memo[n]
    
    print(f"  Calculando F({n}) pela primeira vez")
    
    # 🛑 CASOS BASE
    if n == 0:
        memo[n] = 0
        return 0
    if n == 1:
        memo[n] = 1
        return 1
    
    # 🔄 CASO RECURSIVO
    resultado = fibonacci_otimizado(n-1, memo) + fibonacci_otimizado(n-2, memo)
    memo[n] = resultado  # 💾 Salvar para próxima vez
    
    print(f"  💾 Salvando F({n}) = {resultado}")
    return resultado

# Complexidade melhora de O(2ⁿ) para O(n)!
```

#### **⚡ Comparação de Performance:**
```python
import time

# Teste com n=35
n = 35

# Versão lenta
inicio = time.time()
resultado1 = fibonacci_simples(35)  # Demora ~10 segundos
tempo1 = time.time() - inicio

# Versão rápida  
inicio = time.time()
resultado2 = fibonacci_otimizado(35)  # Demora ~0.001 segundos
tempo2 = time.time() - inicio

print(f"Simples: {tempo1:.3f}s")
print(f"Otimizado: {tempo2:.6f}s") 
print(f"Melhoria: {tempo1/tempo2:.0f}x mais rápido!")
```

### 🥉 **Exemplo 3: Torres de Hanói - O Espetacular**

#### **🎮 O Problema:**
- 3 torres: A, B, C
- N discos em A (maior embaixo, menor em cima)
- **Objetivo:** Mover todos para C
- **Regras:** 
  - Só move 1 disco por vez
  - Só pega o disco do topo
  - Nunca põe disco maior sobre menor

#### **🤔 Como Pensar Recursivamente:**
"Para mover N discos de A para C:"
1. 🔄 Mova N-1 discos de A para B (usando C como auxiliar)
2. 📍 Mova o disco grande de A para C  
3. 🔄 Mova N-1 discos de B para C (usando A como auxiliar)

#### **💻 Implementação Explicada:**
```python
def torres_hanoi(n, origem, destino, auxiliar, nivel=0):
    """
    n = número de discos
    origem = torre de onde tirar
    destino = torre para onde levar  
    auxiliar = torre temporária
    nivel = para identar a saída
    """
    
    identacao = "  " * nivel  # Para visualizar a recursão
    
    # 🛑 CASO BASE: só 1 disco
    if n == 1:
        print(f"{identacao}✅ Mover disco {n} de {origem} → {destino}")
        return 1  # 1 movimento
    
    print(f"{identacao}📋 Para mover {n} discos de {origem} → {destino}:")
    
    # 🔄 PASSO 1: Mover n-1 discos para auxiliar
    print(f"{identacao}  1️⃣ Primeiro: mover {n-1} discos {origem} → {auxiliar}")
    mov1 = torres_hanoi(n-1, origem, auxiliar, destino, nivel+1)
    
    # 📍 PASSO 2: Mover o disco grande
    print(f"{identacao}  2️⃣ Depois: mover disco {n} de {origem} → {destino}")
    mov2 = 1
    
    # 🔄 PASSO 3: Mover n-1 discos da auxiliar para destino
    print(f"{identacao}  3️⃣ Finalmente: mover {n-1} discos {auxiliar} → {destino}")
    mov3 = torres_hanoi(n-1, auxiliar, destino, origem, nivel+1)
    
    total = mov1 + mov2 + mov3
    print(f"{identacao}✨ Total para {n} discos: {total} movimentos")
    return total

# 🎮 Testando:
print("Resolvendo Torres de Hanói com 3 discos:")
movimentos = torres_hanoi(3, 'A', 'C', 'B')
print(f"\n🏆 Resolvido em {movimentos} movimentos!")
print(f"📊 Fórmula: 2^n - 1 = 2^3 - 1 = {2**3 - 1}")
```

---

## 🎭 **Recursividade vs Iteração - O Duelo**

### 📊 **Comparação Lado a Lado:**

#### **Fatorial Recursivo vs Iterativo:**

```python
# 🔄 VERSÃO RECURSIVA
def fatorial_recursivo(n):
    if n <= 1:
        return 1
    return n * fatorial_recursivo(n - 1)

# ➰ VERSÃO ITERATIVA  
def fatorial_iterativo(n):
    resultado = 1
    for i in range(1, n + 1):
        resultado *= i
    return resultado

# 📊 ANÁLISE:
print("Recursivo:")
print("  ✅ Mais elegante e legível")
print("  ✅ Mais próximo da definição matemática") 
print("  ❌ Usa mais memória (pilha)")
print("  ❌ Risco de stack overflow")

print("\nIterativo:")
print("  ✅ Mais eficiente em memória")
print("  ✅ Mais rápido na execução")
print("  ❌ Menos intuitivo")
print("  ❌ Mais código para casos complexos")
```

### 🎯 **Quando Usar Cada Um:**

#### **✅ Use Recursividade Quando:**
- O problema tem **estrutura naturalmente recursiva** (árvores, fractais)
- A solução recursiva é **muito mais clara** que a iterativa
- Você pode **otimizar** com memoização se necessário
- A **profundidade é limitada** (não vai estourar a pilha)

#### **✅ Use Iteração Quando:**
- **Performance** é crítica
- A **profundidade** pode ser muito grande
- A versão iterativa é **simples** de implementar
- **Memória** é limitada

---

## 🎲 **Tipos Especiais de Recursividade**

### 1. 📏 **Recursividade Linear**
```python
# Cada chamada gera APENAS UMA nova chamada
def conta_regressiva(n):
    if n <= 0:
        print("🚀 Fogo!")
        return
    
    print(f"{n}...")
    conta_regressiva(n - 1)  # Uma só chamada

# Complexidade: O(n) tempo, O(n) espaço
```

### 2. 🌳 **Recursividade Binária** 
```python
# Cada chamada gera DUAS novas chamadas
def fibonacci_binario(n):
    if n <= 1:
        return n
    
    return fibonacci_binario(n-1) + fibonacci_binario(n-2)
    #      ↑ chamada 1        ↑ chamada 2

# Complexidade: O(2ⁿ) tempo - cuidado!
```

### 3. 🏃 **Recursividade de Cauda (Tail Recursion)**
```python
# A chamada recursiva é a ÚLTIMA operação
def fatorial_cauda(n, acumulador=1):
    if n <= 1:
        return acumulador
    
    # Última operação = chamada recursiva
    return fatorial_cauda(n - 1, n * acumulador)

# Vantagem: Pode ser otimizada pelo compilador para O(1) espaço
```

### 4. 🤝 **Recursividade Mútua**
```python
# Duas funções se chamam mutuamente
def eh_par(n):
    if n == 0:
        return True
    return eh_impar(n - 1)

def eh_impar(n):
    if n == 0:
        return False  
    return eh_par(n - 1)

# Exemplo: eh_par(4) → eh_impar(3) → eh_par(2) → eh_impar(1) → eh_par(0) → True
```

---

## 🚀 **Técnicas de Otimização**

### 💾 **1. Memoização - O Cache Inteligente**

```python
# ❌ SEM memoização: O(2ⁿ)
def fib_lento(n):
    if n <= 1: return n
    return fib_lento(n-1) + fib_lento(n-2)

# ✅ COM memoização: O(n)  
def fib_rapido(n, cache={}):
    if n in cache:
        return cache[n]
    
    if n <= 1:
        cache[n] = n
        return n
    
    cache[n] = fib_rapido(n-1, cache) + fib_rapido(n-2, cache)
    return cache[n]

# 🐍 Usando decorador do Python (ainda mais fácil):
from functools import lru_cache

@lru_cache(maxsize=None)
def fib_automatico(n):
    if n <= 1: return n
    return fib_automatico(n-1) + fib_automatico(n-2)
```

### 🔄 **2. Programação Dinâmica Bottom-Up**

```python
# Em vez de recursão, construa de baixo para cima:
def fib_bottom_up(n):
    if n <= 1: return n
    
    # Tabela para guardar resultados
    dp = [0] * (n + 1)
    dp[0], dp[1] = 0, 1
    
    # Construir do menor para o maior
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    
    return dp[n]

# Complexidade: O(n) tempo, O(n) espaço
# Vantagem: Sem risco de stack overflow
```

## Recursividade em Estruturas de Dados

### 1. Soma de Elementos em Lista
```python
def soma_lista(lista):
    # Caso base: lista vazia
    if not lista:
        return 0
    
    # Caso recursivo
    return lista[0] + soma_lista(lista[1:])

# Exemplo
print(soma_lista([1, 2, 3, 4, 5]))  # Output: 15
```

### 2. Busca em Lista
```python
def busca_recursiva(lista, elemento, indice=0):
    # Caso base: elemento não encontrado
    if indice >= len(lista):
        return -1
    
    # Caso base: elemento encontrado
    if lista[indice] == elemento:
        return indice
    
    # Caso recursivo
    return busca_recursiva(lista, elemento, indice + 1)
```

### 3. Inversão de String
```python
def inverter_string(s):
    # Caso base
    if len(s) <= 1:
        return s
    
    # Caso recursivo
    return s[-1] + inverter_string(s[:-1])

# Exemplo
print(inverter_string("hello"))  # Output: "olleh"
```

### 4. Contagem de Dígitos
```python
def contar_digitos(n):
    # Caso base
    if n < 10:
        return 1
    
    # Caso recursivo
    return 1 + contar_digitos(n // 10)

# Exemplo
print(contar_digitos(12345))  # Output: 5
```

## Recursividade vs Iteração

### Quando Usar Recursividade:
✅ **Problemas que têm estrutura recursiva natural**
- Árvores e grafos
- Fractais
- Dividir e conquistar

✅ **Problemas que podem ser quebrados em subproblemas menores**
- Torres de Hanói
- Busca em profundidade

✅ **Quando a solução recursiva é mais clara e elegante**

### Quando Evitar Recursividade:
❌ **Problemas com alta sobreposição de subproblemas** (sem memoização)
- Fibonacci ingênuo

❌ **Quando a profundidade pode ser muito grande**
- Risco de stack overflow

❌ **Problemas simples onde iteração é mais eficiente**

### Comparação: Fatorial Recursivo vs Iterativo

**Recursivo:**
```python
def fatorial_recursivo(n):
    if n <= 1:
        return 1
    return n * fatorial_recursivo(n - 1)
```

**Iterativo:**
```python
def fatorial_iterativo(n):
    resultado = 1
    for i in range(1, n + 1):
        resultado *= i
    return resultado
```

**Análise:**
- **Recursivo**: Mais legível, mas usa mais memória
- **Iterativo**: Mais eficiente em memória, mas menos intuitivo

## Tipos Especiais de Recursividade

### 1. Recursividade Linear
Cada chamada recursiva gera apenas uma nova chamada.
```python
def fatorial(n):  # Exemplo já visto
    if n <= 1:
        return 1
    return n * fatorial(n - 1)
```

### 2. Recursividade Binária
Cada chamada recursiva gera duas novas chamadas.
```python
def fibonacci(n):  # Exemplo já visto
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)
```

### 3. Recursividade de Cauda (Tail Recursion)
A chamada recursiva é a última operação da função.
```python
def fatorial_cauda(n, acumulador=1):
    if n <= 1:
        return acumulador
    return fatorial_cauda(n - 1, n * acumulador)
```

**Vantagem:** Pode ser otimizada pelo compilador para usar espaço constante.

### 4. Recursividade Mútua
Duas ou mais funções se chamam mutuamente.
```python
def eh_par(n):
    if n == 0:
        return True
    return eh_impar(n - 1)

def eh_impar(n):
    if n == 0:
        return False
    return eh_par(n - 1)
```

## Técnicas de Otimização

### 1. Memoização
Armazenar resultados de chamadas anteriores para evitar recálculos.

```python
# Fibonacci com memoização usando decorador
from functools import lru_cache

@lru_cache(maxsize=None)
def fibonacci_otimizado(n):
    if n <= 1:
        return n
    return fibonacci_otimizado(n - 1) + fibonacci_otimizado(n - 2)
```

### 2. Programação Dinâmica Bottom-Up
Construir a solução de baixo para cima.

```python
def fibonacci_dp(n):
    if n <= 1:
        return n
    
    dp = [0] * (n + 1)
    dp[1] = 1
    
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    
    return dp[n]
```

## 🚨 **Problemas Comuns e Como Resolver**

### 💥 **1. Stack Overflow - A Pilha Explodiu!**

#### **🎯 O que acontece:**
```python
def conta_infinita(n):
    print(n)
    return conta_infinita(n + 1)  # ❌ Nunca para!

# RecursionError: maximum recursion depth exceeded
```

#### **🛠️ Como resolver:**
```python
# ✅ Sempre tenha um caso base claro:
def conta_segura(n, limite=1000):
    if n >= limite:  # 🛑 Caso base
        print("Parou!")
        return
    
    print(n)
    conta_segura(n + 1, limite)

# ✅ Ou aumente o limite (use com cuidado):
import sys
sys.setrecursionlimit(10000)  # Padrão: ~1000
```

### 🐛 **2. Casos Base Incorretos**

#### **❌ Problemas comuns:**
```python
# Problema 1: Esqueceu caso base
def soma_lista(lista):
    return lista[0] + soma_lista(lista[1:])  # ❌ E se lista vazia?

# Problema 2: Caso base errado  
def fatorial_errado(n):
    if n == 1:  # ❌ E se n = 0?
        return 1
    return n * fatorial_errado(n - 1)

# Problema 3: Não progride para caso base
def loop_infinito(n):
    if n == 0:
        return 0
    return loop_infinito(n)  # ❌ n nunca diminui!
```

#### **✅ Versões corretas:**
```python
# ✅ Sempre trate o caso vazio
def soma_lista_certa(lista):
    if not lista:  # Lista vazia
        return 0
    return lista[0] + soma_lista_certa(lista[1:])

# ✅ Cubra todos os casos base
def fatorial_certo(n):
    if n <= 1:  # Cobre 0 e 1
        return 1
    return n * fatorial_certo(n - 1)

# ✅ Sempre faça progresso
def contagem_certa(n):
    if n <= 0:
        return 0
    return contagem_certa(n - 1)  # n diminui!
```

### 🔧 **3. Debugging de Recursividade**

#### **🕵️ Técnica do Print Investigativo:**
```python
def debug_fibonacci(n, nivel=0):
    identacao = "  " * nivel
    print(f"{identacao}→ Entrando: fibonacci({n})")
    
    if n <= 1:
        print(f"{identacao}← Saindo: fibonacci({n}) = {n}")
        return n
    
    esquerda = debug_fibonacci(n-1, nivel+1)
    direita = debug_fibonacci(n-2, nivel+1)
    resultado = esquerda + direita
    
    print(f"{identacao}← Saindo: fibonacci({n}) = {resultado}")
    return resultado

# Teste: debug_fibonacci(4)
# Você verá exatamente o que está acontecendo!
```

#### **📊 Contando Chamadas:**
```python
contador_chamadas = 0

def fibonacci_contador(n):
    global contador_chamadas
    contador_chamadas += 1
    
    if n <= 1:
        return n
    return fibonacci_contador(n-1) + fibonacci_contador(n-2)

# Teste:
contador_chamadas = 0
resultado = fibonacci_contador(10)
print(f"Resultado: {resultado}")
print(f"Chamadas: {contador_chamadas}")
# Fibonacci(10) faz 177 chamadas! 😱
```

---

## 💡 **Dicas de Ouro para Recursividade**

### 🎯 **1. Como Projetar uma Função Recursiva:**

#### **Passo 1: Identifique o padrão**
```
"Para resolver problema de tamanho N, 
posso usar a solução de tamanho N-1?"
```

#### **Passo 2: Encontre o caso mais simples**
```
"Qual é o menor problema que sei resolver diretamente?"
```

#### **Passo 3: Conecte os dois**
```
"Como combino a solução menor com o problema atual?"
```

#### **🎮 Exemplo Prático: Soma de Lista**
```python
# Passo 1: Padrão
# soma([1,2,3,4]) = 1 + soma([2,3,4])

# Passo 2: Caso simples
# soma([]) = 0

# Passo 3: Conectar
def soma_lista(lista):
    if not lista:  # Passo 2
        return 0
    return lista[0] + soma_lista(lista[1:])  # Passo 1
```

### 🧠 **2. Truques Mentais:**

#### **🎭 "Role-Playing" Mental:**
```
"Eu sou a função soma_lista([1,2,3]).
Meu trabalho é somar essa lista.
Ei, função soma_lista([2,3])! Você pode me ajudar?
Depois eu só preciso somar 1 com sua resposta!"
```

#### **🔍 "Principio da Confiança":**
```
"Assumo que minha função funciona para problemas menores.
Só preciso focar em como usar essa resposta."
```

### ⚡ **3. Otimizações Práticas:**

#### **📦 Memoização Automática:**
```python
from functools import lru_cache

@lru_cache(maxsize=None)
def fibonacci_turbo(n):
    if n <= 1: return n
    return fibonacci_turbo(n-1) + fibonacci_turbo(n-2)

# Agora é O(n) automaticamente! 🚀
```

#### **🏃 Transformar em Iterativo:**
```python
# Se a recursividade está lenta, tente iterativo:
def fibonacci_iterativo(n):
    if n <= 1: return n
    
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b

# Mesmo resultado, O(n) tempo, O(1) espaço!
```

---

## 🎲 **Exercícios Práticos - Do Básico ao Ninja**

### 🟢 **Nível 1: Primeiro Contato**

#### **Exercício 1.1: Contagem Regressiva**
```python
# Implemente uma função que conta de n até 0
def conta_regressiva(n):
    # Seu código aqui
    pass

# Teste: conta_regressiva(5) deve imprimir: 5 4 3 2 1 0
```

#### **Exercício 1.2: Soma Simples**
```python
# Some todos os números de 1 até n
def soma_ate_n(n):
    # Seu código aqui
    pass

# Teste: soma_ate_n(5) deve retornar 15 (1+2+3+4+5)
```

#### **Exercício 1.3: Potência**
```python
# Calcule x^n recursivamente
def potencia(x, n):
    # Seu código aqui
    pass

# Teste: potencia(2, 3) deve retornar 8
```

### 🟡 **Nível 2: Esquentando**

#### **Exercício 2.1: Máximo de Lista**
```python
# Encontre o maior número em uma lista
def maximo_lista(lista):
    # Seu código aqui
    pass

# Teste: maximo_lista([3, 1, 4, 1, 5]) deve retornar 5
```

#### **Exercício 2.2: Palíndromo**
```python
# Verifique se uma string é palíndromo
def eh_palindromo(s):
    # Seu código aqui
    pass

# Teste: eh_palindromo("arara") deve retornar True
```

#### **Exercício 2.3: Busca Binária**
```python
# Implemente busca binária recursivamente
def busca_binaria(lista, elemento, inicio=0, fim=None):
    # Seu código aqui
    pass

# Teste: busca_binaria([1,2,3,4,5], 3) deve retornar 2
```

### 🔴 **Nível 3: Desafio**

#### **Exercício 3.1: Permutações**
```python
# Gere todas as permutações de uma string
def permutacoes(s):
    # Seu código aqui
    pass

# Teste: permutacoes("abc") deve retornar ["abc", "acb", "bac", "bca", "cab", "cba"]
```

#### **Exercício 3.2: Subconjuntos**
```python
# Gere todos os subconjuntos de uma lista
def subconjuntos(lista):
    # Seu código aqui
    pass

# Teste: subconjuntos([1,2]) deve retornar [[], [1], [2], [1,2]]
```

### 🏆 **Soluções Comentadas:**

#### **💡 Solução 1.1:**
```python
def conta_regressiva(n):
    # 🛑 Caso base: quando chegar a zero, para
    if n < 0:
        return
    
    # 📍 Ação: imprimir número atual
    print(n)
    
    # 🔄 Caso recursivo: chamar com n-1
    conta_regressiva(n - 1)
```

#### **💡 Solução 2.2:**
```python
def eh_palindromo(s):
    # 🛑 Caso base: string vazia ou 1 char é palíndromo
    if len(s) <= 1:
        return True
    
    # 🔍 Verificar primeiro e último caracteres
    if s[0] != s[-1]:
        return False
    
    # 🔄 Caso recursivo: verificar o meio
    return eh_palindromo(s[1:-1])
```

#### **💡 Solução 3.1:**
```python
def permutacoes(s):
    # 🛑 Caso base: string vazia
    if len(s) <= 1:
        return [s]
    
    resultado = []
    
    # Para cada caractere na string
    for i in range(len(s)):
        # Tira o caractere atual
        char = s[i]
        resto = s[:i] + s[i+1:]
        
        # 🔄 Gera permutações do resto
        for perm in permutacoes(resto):
            resultado.append(char + perm)
    
    return resultado
```

## Exercícios Práticos de Recursividade

### Nível Básico:

1. **Potência:** Calcule x^n usando recursividade.
2. **Soma de Dígitos:** Some todos os dígitos de um número.
3. **Máximo em Lista:** Encontre o maior elemento de uma lista recursivamente.

### Nível Intermediário:

4. **Palíndromo:** Verifique se uma string é palíndromo.
5. **Busca Binária:** Implemente busca binária recursiva.
6. **GCD/MDC:** Calcule o máximo divisor comum usando algoritmo de Euclides.

### Nível Avançado:

7. **Permutações:** Gere todas as permutações de uma string.
8. **Subconjuntos:** Gere todos os subconjuntos de um conjunto.
9. **N-Queens:** Resolva o problema das N rainhas.

### Soluções dos Exercícios:

```python
# 1. Potência
def potencia(x, n):
    if n == 0:
        return 1
    return x * potencia(x, n - 1)

# 2. Soma de Dígitos
def soma_digitos(n):
    if n < 10:
        return n
    return (n % 10) + soma_digitos(n // 10)

# 3. Máximo em Lista
def maximo_lista(lista):
    if len(lista) == 1:
        return lista[0]
    
    max_resto = maximo_lista(lista[1:])
    return lista[0] if lista[0] > max_resto else max_resto

# 4. Palíndromo
def eh_palindromo(s):
    if len(s) <= 1:
        return True
    
    if s[0] != s[-1]:
        return False
    
    return eh_palindromo(s[1:-1])

# 5. Busca Binária Recursiva
def busca_binaria_rec(lista, elemento, inicio=0, fim=None):
    if fim is None:
        fim = len(lista) - 1
    
    if inicio > fim:
        return -1
    
    meio = (inicio + fim) // 2
    
    if lista[meio] == elemento:
        return meio
    elif lista[meio] < elemento:
        return busca_binaria_rec(lista, elemento, meio + 1, fim)
    else:
        return busca_binaria_rec(lista, elemento, inicio, meio - 1)

# 6. GCD (Algoritmo de Euclides)
def gcd(a, b):
    if b == 0:
        return a
    return gcd(b, a % b)
```

---

## Algoritmos em Árvores

### Árvore Binária
Uma árvore onde cada nó tem no máximo dois filhos.

### Traversal de Árvore:
- **Inorder**: Esquerda → Raiz → Direita
- **Preorder**: Raiz → Esquerda → Direita
- **Postorder**: Esquerda → Direita → Raiz

```python
class No:
    def __init__(self, valor):
        self.valor = valor
        self.esquerda = None
        self.direita = None

def inorder(raiz):
    if raiz:
        inorder(raiz.esquerda)
        print(raiz.valor)
        inorder(raiz.direita)
```

---

## Algoritmos de Grafos

### Representação:
- **Lista de Adjacência**: Mais eficiente em espaço
- **Matriz de Adjacência**: Mais eficiente para consultas

### Busca em Profundidade (DFS):
```python
def dfs(grafo, inicio, visitados=set()):
    visitados.add(inicio)
    print(inicio)
    
    for vizinho in grafo[inicio]:
        if vizinho not in visitados:
            dfs(grafo, vizinho, visitados)
```

### Busca em Largura (BFS):
```python
from collections import deque

def bfs(grafo, inicio):
    visitados = set()
    fila = deque([inicio])
    
    while fila:
        no = fila.popleft()
        if no not in visitados:
            visitados.add(no)
            print(no)
            fila.extend(grafo[no])
```

---

## Programação Dinâmica

### Princípios:
1. **Subestrutura Ótima**: A solução ótima contém soluções ótimas de subproblemas
2. **Sobreposição de Subproblemas**: Os mesmos subproblemas são resolvidos múltiplas vezes

### Exemplo: Problema da Mochila
```python
def mochila(pesos, valores, capacidade):
    n = len(pesos)
    dp = [[0 for _ in range(capacidade + 1)] for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        for w in range(1, capacidade + 1):
            if pesos[i-1] <= w:
                dp[i][w] = max(
                    valores[i-1] + dp[i-1][w - pesos[i-1]],
                    dp[i-1][w]
                )
            else:
                dp[i][w] = dp[i-1][w]
    
    return dp[n][capacidade]
```

---

## Exercícios Práticos

### Exercício 1: Análise de Complexidade
Determine a complexidade dos seguintes códigos:

```python
# a)
for i in range(n):
    for j in range(n):
        print(i, j)

# b)
def busca_binaria(lista, x):
    # ... implementação da busca binária

# c)
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
```

### Exercício 2: Implementação
Implemente um algoritmo de ordenação merge sort e analise sua complexidade.

### Exercício 3: Recursividade Avançada
Implemente uma função recursiva que calcule o número de formas de subir uma escada com n degraus, onde você pode subir 1 ou 2 degraus por vez.

### Exercício 4: Programação Dinâmica
Resolva o problema de encontrar a maior subsequência crescente em um array.

---

## 📋 **Resumo Visual dos Pontos Principais**

### 🎯 **Complexidade - Cheat Sheet:**

```
📊 COMPLEXIDADES DO MELHOR AO PIOR:

🟢 O(1)     - Acesso direto         [========]
🟢 O(log n) - Busca inteligente     [===     ]  
🟡 O(n)     - Verificar todos       [========]
🟡 O(n log n) - Ordenação boa       [==========]
🟠 O(n²)    - Comparar todos x todos [====================]
🔴 O(2ⁿ)    - Explorar combinações  [💥💥💥💥💥💥💥💥💥💥]
🚫 O(n!)    - Impossível na prática [☠️☠️☠️☠️☠️☠️☠️☠️☠️☠️]
```

### 🔄 **Recursividade - Checklist:**

```
✅ ANTES DE CODIFICAR:
   □ Identifiquei o padrão recursivo?
   □ Defini o caso base claramente?
   □ Cada chamada progride para o caso base?
   □ Testei com casos pequenos?

⚠️ SINAIS DE ALERTA:
   🚨 Sem caso base → Loop infinito
   🚨 Caso base errado → Crash
   🚨 Não progride → Stack overflow  
   🚨 Muito lento → Precisa otimizar

🚀 TÉCNICAS DE OTIMIZAÇÃO:
   💾 Memoização → Guardar resultados
   🔄 Iteração → Quando possível
   📈 Bottom-up → Programação dinâmica
```

### 🧰 **Kit de Sobrevivência do Programador:**

#### **🔍 Para Análise de Algoritmos:**
```python
# 1. Conte os loops:
for i in range(n):      # O(n)
    for j in range(n):  # × O(n) = O(n²)
        operacao()      # O(1)

# 2. Identifique o padrão:
# - Dividir pela metade → O(log n)
# - Visitar todos → O(n)  
# - Comparar todos x todos → O(n²)
# - Dividir e conquistar → O(n log n)
```

#### **🔄 Para Recursividade:**
```python
# Template universal:
def resolver_recursivo(problema):
    # 🛑 SEMPRE primeiro: caso base
    if problema_simples:
        return solucao_direta
    
    # 🔧 Quebrar problema
    subproblema = reduzir(problema)
    
    # 🔄 Resolver recursivamente
    resultado_parcial = resolver_recursivo(subproblema)
    
    # 🎯 Combinar resultado
    return combinar(problema, resultado_parcial)
```

### 📚 **Estruturas de Dados - Guia Rápido:**

| Estrutura | Acesso | Busca | Inserção | Remoção | Quando Usar |
|-----------|--------|-------|----------|---------|-------------|
| **Array** | O(1) | O(n) | O(n) | O(n) | Acesso rápido por índice |
| **Lista Ligada** | O(n) | O(n) | O(1)* | O(1)* | Inserções/remoções frequentes |
| **Pilha** | O(1) topo | - | O(1) | O(1) | LIFO, desfazer, recursão |
| **Fila** | O(1) frente | - | O(1) | O(1) | FIFO, processamento ordem |
| **Hash Table** | O(1)* | O(1)* | O(1)* | O(1)* | Busca super rápida |
| **Árvore Binária** | O(log n)* | O(log n)* | O(log n)* | O(log n)* | Dados ordenados |

*\* No caso médio*

### 🎮 **Algoritmos Essenciais:**

```
🔍 BUSCA:
   Linear → O(n) → Simples, qualquer lista
   Binária → O(log n) → Lista ordenada obrigatória

📊 ORDENAÇÃO:
   Bubble/Selection → O(n²) → Só para estudar
   Insertion → O(n²) → Bom para listas pequenas
   Merge → O(n log n) → Estável, sempre eficiente
   Quick → O(n log n)* → Rápido na prática

🌳 ÁRVORES:
   DFS → Profundidade primeiro → Recursivo
   BFS → Largura primeiro → Fila

📈 OTIMIZAÇÃO:
   Programação Dinâmica → Subproblemas sobrepostos
   Guloso → Escolhas localmente ótimas
   Dividir e Conquistar → Quebrar problema
```

---

## 🏆 **Estratégias de Resolução de Problemas**

### 🧭 **Metodologia RICE:**

#### **🔍 R - Read (Ler)**
- Leia o problema 2-3 vezes
- Identifique entrada e saída
- Procure por palavras-chave (ordenado, único, etc.)

#### **🎯 I - Identify (Identificar)**
- Que tipo de problema é? (busca, ordenação, otimização...)
- Há restrições de tempo/espaço?
- Casos especiais ou edge cases?

#### **📝 C - Code (Codificar)**
- Comece com força bruta
- Otimize depois se necessário
- Teste com exemplos pequenos

#### **🧪 E - Evaluate (Avaliar)**
- Analise complexidade
- Teste edge cases
- Refatore se possível

### 🎭 **Padrões Comuns de Problemas:**

#### **1. 🔍 Problemas de Busca:**
```python
# Sinais: "encontrar", "buscar", "existe"
# Ferramentas: busca linear, binária, hash

# Exemplo: Buscar elemento em lista ordenada
def buscar(lista, x):
    # O(log n) com busca binária
    esq, dir = 0, len(lista) - 1
    while esq <= dir:
        meio = (esq + dir) // 2
        if lista[meio] == x: return meio
        elif lista[meio] < x: esq = meio + 1
        else: dir = meio - 1
    return -1
```

#### **2. 📊 Problemas de Contagem:**
```python
# Sinais: "quantos", "contar", "número de"
# Ferramentas: loops, recursão, DP

# Exemplo: Contar caminhos em grade
def contar_caminhos(m, n):
    # DP: O(m×n)
    dp = [[1]*n for _ in range(m)]
    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = dp[i-1][j] + dp[i][j-1]
    return dp[m-1][n-1]
```

#### **3. 🎯 Problemas de Otimização:**
```python
# Sinais: "máximo", "mínimo", "melhor", "ótimo"
# Ferramentas: DP, guloso, força bruta

# Exemplo: Maior soma de subarray
def maior_soma_subarray(arr):
    # Algoritmo de Kadane: O(n)
    max_atual = max_global = arr[0]
    for i in range(1, len(arr)):
        max_atual = max(arr[i], max_atual + arr[i])
        max_global = max(max_global, max_atual)
    return max_global
```

### 🚀 **Dicas para Entrevistas:**

#### **💡 Comunicação:**
- Pense em voz alta
- Explique sua abordagem antes de codificar
- Pergunte sobre edge cases
- Discuta trade-offs

#### **⏰ Gestão de Tempo:**
```
⏰ 45 minutos típicos:
   5 min → Entender problema
   10 min → Planejar solução
   20 min → Implementar
   5 min → Testar e otimizar
   5 min → Discussão final
```

#### **🎯 Progressão Típica:**
```
1. 🔴 Força bruta → Funciona mas é lento
2. 🟡 Identificar gargalos → O que está lento?
3. 🟢 Otimizar → Usar estruturas melhores
4. ⭐ Polir → Edge cases e clareza
```

---

## Bibliografia e Recursos Adicionais

### Livros Recomendados:
- "Introduction to Algorithms" - Cormen, Leiserson, Rivest, Stein
- "Algorithms" - Robert Sedgewick
- "Algorithm Design" - Jon Kleinberg, Éva Tardos

### Recursos Online:
- LeetCode: Prática de algoritmos
- HackerRank: Desafios de programação
- Coursera/edX: Cursos de algoritmos

### Visualizadores:
- VisuAlgo: Visualização de algoritmos
- Algorithm Visualizer: Animações interativas

---

*Este documento serve como um guia completo para revisão de algoritmos e análise de complexidade, com foco especial em recursividade. Continue praticando e explorando novos problemas para aprofundar seu conhecimento!*
