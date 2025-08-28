# 🔍 Laboratório Prático: Análise de Algoritmos e Big O

## 📋 Objetivo
Aplicar na prática os conceitos de análise de complexidade e notação Big O através de exercícios progressivos.

## 🛠️ Exercícios Práticos

### **Exercício 1: Identificação de Complexidade**
Analise os seguintes algoritmos e determine sua complexidade:

```python
# Algoritmo A
def algoritmo_a(arr):
    return arr[0] + arr[-1]

# Algoritmo B  
def algoritmo_b(arr):
    for i in range(len(arr)):
        print(arr[i])

# Algoritmo C
def algoritmo_c(arr):
    for i in range(len(arr)):
        for j in range(len(arr)):
            if i != j:
                print(arr[i], arr[j])

# Algoritmo D
def algoritmo_d(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
```

**Sua tarefa:**
1. Identifique a complexidade de cada algoritmo
2. Justifique sua resposta
3. Ordene do mais eficiente para o menos eficiente

---

### **Exercício 2: Implementação e Análise**
Implemente os seguintes algoritmos e meça sua performance:

#### **2.1 Busca Linear vs Busca Binária**
```python
def busca_linear(arr, target):
    # TODO: Implementar busca linear
    # Contar número de comparações
    pass

def busca_binaria(arr, target):
    # TODO: Implementar busca binária
    # Contar número de comparações
    pass

# Teste com arrays de tamanhos: 100, 1000, 10000
# Compare o número de operações
```

#### **2.2 Algoritmos de Ordenação**
```python
def bubble_sort(arr):
    # TODO: Implementar bubble sort
    # Contar comparações e trocas
    pass

def selection_sort(arr):
    # TODO: Implementar selection sort
    # Contar comparações e trocas
    pass

# Compare performance com arrays:
# - Ordenado: [1, 2, 3, ..., n]
# - Reverso: [n, n-1, ..., 1]
# - Aleatório: shuffle([1, 2, ..., n])
```

---

### **Exercício 3: Estruturas de Dados**

#### **3.1 Lista vs Array**
Implemente e compare:

```python
# Lista ligada simples
class No:
    def __init__(self, dados):
        self.dados = dados
        self.proximo = None

class ListaLigada:
    def __init__(self):
        self.inicio = None
    
    def inserir(self, dados):
        # TODO: Implementar inserção
        pass
    
    def buscar(self, dados):
        # TODO: Implementar busca
        pass

# Compare com lista Python normal
# Meça tempo de inserção e busca
```

#### **3.2 Estruturas Homogêneas vs Heterogêneas**
```python
# Estrutura homogênea
notas = [85, 90, 78, 92, 88]

# Estrutura heterogênea
class Aluno:
    def __init__(self, nome, idade, notas):
        self.nome = nome
        self.idade = idade
        self.notas = notas

alunos = [
    Aluno("Ana", 20, [85, 90]),
    Aluno("João", 19, [78, 92]),
    Aluno("Maria", 21, [88, 95])
]

# TODO: Implementar funções para:
# 1. Calcular média das notas (homogênea)
# 2. Calcular média por aluno (heterogênea)
# 3. Encontrar aluno com maior média
# Compare complexidade e facilidade de uso
```

---

### **Exercício 4: Problemas Reais**

#### **4.1 Sistema de Busca**
Você está desenvolvendo um sistema de busca para uma biblioteca:

```python
class Livro:
    def __init__(self, isbn, titulo, autor, ano):
        self.isbn = isbn
        self.titulo = titulo
        self.autor = autor
        self.ano = ano

# TODO: Implementar diferentes estratégias de busca:
# 1. Busca linear por título
# 2. Busca binária por ISBN (assume ordenado)
# 3. Hash table para busca O(1)

# Analise qual estratégia usar para:
# - 100 livros
# - 10.000 livros  
# - 1.000.000 livros
```

#### **4.2 Análise de Redes Sociais**
```python
# Representação de uma rede social
usuarios = [
    {"id": 1, "nome": "Ana", "amigos": [2, 3, 5]},
    {"id": 2, "nome": "Bruno", "amigos": [1, 4]},
    {"id": 3, "nome": "Carlos", "amigos": [1, 5]},
    # ... mais usuários
]

# TODO: Implementar algoritmos para:
# 1. Encontrar amigos em comum O(n²)
# 2. Verificar se dois usuários são conectados
# 3. Encontrar o usuário com mais amigos

# Analise como a complexidade afeta uma rede com:
# - 1.000 usuários
# - 1.000.000 usuários
```

---

### **Exercício 5: Otimização**

#### **5.1 Problema dos Dois Números**
Dado um array e um valor alvo, encontre dois números que somam o alvo:

```python
# Solução O(n²) - força bruta
def dois_numeros_v1(arr, alvo):
    # TODO: Implementar com loops aninhados
    pass

# Solução O(n) - hash table
def dois_numeros_v2(arr, alvo):
    # TODO: Implementar com hash table
    pass

# Compare performance e uso de memória
```

#### **5.2 Encontrar Duplicatas**
```python
# O(n²) - comparação direta
def encontrar_duplicatas_v1(arr):
    # TODO: Implementar
    pass

# O(n) - usando set
def encontrar_duplicatas_v2(arr):
    # TODO: Implementar
    pass

# O(n log n) - ordenando primeiro
def encontrar_duplicatas_v3(arr):
    # TODO: Implementar
    pass

# Analise quando usar cada abordagem
```

---

## 📊 Relatório de Análise

Para cada exercício, documente:

### **Tabela de Complexidade**
| Algoritmo | Melhor Caso | Caso Médio | Pior Caso | Espaço |
|-----------|-------------|------------|-----------|---------|
| Busca Linear | O(1) | O(n) | O(n) | O(1) |
| Busca Binária | O(1) | O(log n) | O(log n) | O(1) |
| ... | ... | ... | ... | ... |

### **Medições Práticas**
```
Tamanho: 1000
- Busca Linear: 0.001ms (500 operações)
- Busca Binária: 0.0001ms (10 operações)

Tamanho: 10000  
- Busca Linear: 0.01ms (5000 operações)
- Busca Binária: 0.0001ms (14 operações)
```

### **Gráfico de Performance**
Crie gráficos mostrando:
- Tempo de execução vs tamanho da entrada
- Número de operações vs tamanho da entrada
- Comparação entre diferentes algoritmos

---

## 🎯 Critérios de Avaliação

### **Implementação (40%)**
- [ ] Código funcional e correto
- [ ] Contagem de operações implementada
- [ ] Estruturas de dados adequadas

### **Análise Teórica (30%)**
- [ ] Complexidade identificada corretamente
- [ ] Justificativa matemática clara
- [ ] Comparação entre algoritmos

### **Medições Práticas (20%)**
- [ ] Testes com diferentes tamanhos
- [ ] Medição de tempo precisa
- [ ] Contagem de operações

### **Relatório (10%)**
- [ ] Documentação clara
- [ ] Conclusões baseadas em dados
- [ ] Recomendações práticas

---

## 🚀 Desafios Extras

### **Desafio 1: Algoritmo Misterioso**
Analise este algoritmo e determine sua complexidade:

```python
def algoritmo_misterioso(n):
    count = 0
    i = 1
    while i < n:
        j = 1
        while j < i:
            count += 1
            j *= 2
        i += 1
    return count
```

### **Desafio 2: Otimização Extrema**
Dado o problema: "Encontrar o elemento que aparece apenas uma vez em um array onde todos os outros aparecem exatamente duas vezes"

Implemente soluções com:
- O(n²) tempo, O(1) espaço
- O(n) tempo, O(n) espaço  
- O(n) tempo, O(1) espaço (dica: XOR)

### **Desafio 3: Análise Real**
Escolha um algoritmo de um projeto real (GitHub) e:
1. Identifique sua complexidade
2. Proponha melhorias
3. Implemente e teste as melhorias
4. Documente os resultados

---

## 📚 Recursos Adicionais

### **Ferramentas Recomendadas**
- **Python**: `time`, `timeit`, `cProfile`
- **Visualização**: `matplotlib`, `seaborn`
- **Análise**: `numpy`, `pandas`

### **Links Úteis**
- [Big O Cheat Sheet](http://bigocheatsheet.com/)
- [Algorithm Visualizer](https://algorithm-visualizer.org/)
- [Time Complexity Analysis](https://www.khanacademy.org/computing/computer-science/algorithms)

### **Checklist Final**
- [ ] Todos os algoritmos implementados
- [ ] Complexidade analisada teoricamente
- [ ] Performance medida praticamente
- [ ] Resultados documentados
- [ ] Conclusões formuladas
- [ ] Código comentado e organizado

---

**⏰ Tempo Estimado:** 4-6 horas
**📅 Entrega:** Upload dos arquivos Python + relatório em PDF

**💡 Dica:** Comece com exercícios simples e vá aumentando a complexidade. Sempre teste com dados pequenos primeiro!
