# 🌳 Laboratório 05: Árvores e Estruturas Hierárquicas
## Algoritmos e Complexidade - Exercícios Práticos

---

## 🎯 Objetivos do Laboratório

1. **Implementar** árvores binárias de busca (BST) e AVL
2. **Comparar** performance entre diferentes estruturas
3. **Desenvolver** sistema de autocomplete com Trie
4. **Analisar** complexidade computacional na prática
5. **Criar** aplicações reais usando heaps

---

## 📋 Exercício 1: BST vs AVL - Análise Comparativa

### **Parte A: Implementação BST Básica**

Implemente uma BST em C com as seguintes funcionalidades:

```c
// Estrutura básica fornecida
typedef struct No {
    int valor;
    struct No* esquerda;
    struct No* direita;
    int altura;  // Para cálculos posteriores
} No;

typedef struct {
    No* raiz;
    int tamanho;
    unsigned long comparacoes;
} BST;
```

**Funções a implementar:**

1. `BST* criar_bst()`
2. `No* inserir(BST* arvore, int valor)`
3. `bool buscar(BST* arvore, int valor)`
4. `No* remover(BST* arvore, int valor)`
5. `int altura_arvore(No* raiz)`
6. `void imprimir_inorder(No* raiz)`

### **Parte B: Teste de Performance**

Execute os seguintes cenários e documente os resultados:

#### **Cenário 1: Dados Ordenados (Pior Caso)**
```c
// Insira valores 1, 2, 3, ..., 1000 em ordem
// Meça:
// - Altura final da árvore
// - Número de comparações para inserir
// - Tempo médio de busca para 100 elementos aleatórios
```

#### **Cenário 2: Dados Aleatórios (Caso Médio)**
```c
// Insira 1000 valores aleatórios
// Compare com cenário anterior
```

#### **Tabela de Resultados Esperada:**

| **Cenário** | **Altura** | **Comparações** | **Tempo Busca** |
|-------------|------------|-----------------|-----------------|
| Ordenado | ~1000 | ~500,500 | Alto |
| Aleatório | ~10-20 | ~10,000 | Baixo |

---

## 📋 Exercício 2: Implementação AVL Completa

### **Parte A: Estrutura Avançada**

```c
typedef struct NoAVL {
    int valor;
    struct NoAVL* esquerda;
    struct NoAVL* direita;
    int altura;
    int fator_balanceamento;
} NoAVL;

typedef struct {
    NoAVL* raiz;
    int tamanho;
    unsigned long rotacoes_direita;
    unsigned long rotacoes_esquerda;
    unsigned long rotacoes_duplas;
} ArvoreAVL;
```

### **Funções de Rotação a Implementar:**

```c
NoAVL* rotacao_direita(NoAVL* y);
NoAVL* rotacao_esquerda(NoAVL* x);
NoAVL* rotacao_esquerda_direita(NoAVL* z);
NoAVL* rotacao_direita_esquerda(NoAVL* z);
```

### **Parte B: Sistema de Balanceamento**

Implemente a lógica de balanceamento que:

1. **Calcula** fator de balanceamento após cada inserção
2. **Identifica** qual tipo de rotação aplicar
3. **Executa** a rotação adequada
4. **Atualiza** alturas e fatores

### **Parte C: Comparação com BST**

Execute o mesmo teste do Exercício 1 e compare:

| **Métrica** | **BST (Ordenado)** | **AVL (Ordenado)** | **Melhoria** |
|-------------|-------------------|-------------------|--------------|
| Altura | 1000 | ~10 | 99% |
| Busca (ms) | Alto | Baixo | 90%+ |
| Rotações | 0 | ~990 | Custo inicial |

---

## 📋 Exercício 3: MinHeap e Fila de Prioridade

### **Parte A: Implementação Heap**

```python
class MinHeap:
    def __init__(self):
        self.heap = []
        self.comparacoes = 0
    
    def inserir(self, valor):
        # Implementar heapify up
        pass
    
    def extrair_minimo(self):
        # Implementar heapify down
        pass
    
    def heapify_up(self, indice):
        # Algoritmo de subida
        pass
    
    def heapify_down(self, indice):
        # Algoritmo de descida
        pass
```

### **Parte B: Simulador de Hospital**

Implemente um sistema de triagem hospitalar:

```python
class PacienteHospital:
    def __init__(self, nome, gravidade, tempo_chegada):
        self.nome = nome
        self.gravidade = gravidade  # 1=crítico, 5=leve
        self.tempo_chegada = tempo_chegada
    
    def __lt__(self, outro):
        # Prioridade: gravidade primeiro, depois tempo chegada
        if self.gravidade != outro.gravidade:
            return self.gravidade < outro.gravidade
        return self.tempo_chegada < outro.tempo_chegada

class TriagemHospital:
    def __init__(self):
        self.fila_prioridade = MinHeap()
    
    def adicionar_paciente(self, paciente):
        # Adicionar à fila de prioridade
        pass
    
    def atender_proximo(self):
        # Atender paciente com maior prioridade
        pass
```

### **Parte C: Teste do Sistema**

Simule 50 pacientes chegando com:
- Gravidades aleatórias (1-5)
- Tempos de chegada sequenciais
- Nomes gerados automaticamente

**Resultado esperado:** Pacientes críticos (gravidade 1) sempre atendidos primeiro.

---

## 📋 Exercício 4: Sistema de Autocomplete com Trie

### **Parte A: Implementação Trie**

```python
class NoTrie:
    def __init__(self):
        self.filhos = {}
        self.eh_fim_palavra = False
        self.frequencia = 0

class Trie:
    def __init__(self):
        self.raiz = NoTrie()
        self.total_palavras = 0
    
    def inserir(self, palavra):
        # Implementar inserção
        pass
    
    def buscar(self, palavra):
        # Verificar se palavra existe
        pass
    
    def obter_sugestoes(self, prefixo, limite=10):
        # Retornar palavras que começam com prefixo
        pass
```

### **Parte B: Sistema de Autocomplete**

```python
class SistemaAutocomplete:
    def __init__(self):
        self.trie = Trie()
        self.historico_busca = {}
    
    def carregar_dicionario(self, arquivo):
        # Carregar palavras de arquivo
        pass
    
    def obter_sugestoes_inteligentes(self, prefixo):
        # Combinar frequência da Trie + histórico usuário
        pass
    
    def registrar_selecao(self, palavra):
        # Atualizar estatísticas de uso
        pass
```

### **Parte C: Teste de Performance**

Carregue um dicionário com 10,000 palavras e teste:

1. **Tempo de carregamento**
2. **Uso de memória** (número de nós criados)
3. **Tempo médio de autocomplete** para prefixos de 1-5 caracteres
4. **Qualidade das sugestões**

---

## 📋 Exercício 5: Aplicação Integrada

### **Objetivo:** Sistema de Busca Inteligente

Desenvolva um sistema que combine todas as estruturas:

```python
class SistemaBuscaInteligente:
    def __init__(self):
        self.indice_avl = ArvoreAVL()      # Índice principal
        self.cache_heap = MinHeap()        # Cache por popularidade
        self.autocomplete = Trie()         # Sugestões
        
        # Estatísticas
        self.total_buscas = 0
        self.cache_hits = 0
        self.tempo_resposta = []
    
    def indexar_documento(self, id_doc, palavras):
        """Indexa documento nas estruturas"""
        pass
    
    def buscar(self, termo):
        """Busca inteligente com cache e sugestões"""
        pass
    
    def obter_sugestoes(self, prefixo):
        """Autocomplete baseado em popularidade"""
        pass
    
    def gerar_relatorio(self):
        """Estatísticas de performance"""
        pass
```

### **Funcionalidades Requeridas:**

1. **Indexação:** Inserir documentos na AVL por ID
2. **Busca Rápida:** Cache dos documentos mais acessados no heap
3. **Autocomplete:** Sugestões baseadas na Trie
4. **Análise:** Relatório de performance e estatísticas

### **Casos de Teste:**

```python
# Dados de exemplo
documentos = {
    1: ["python", "programming", "tutorial", "beginner"],
    2: ["algorithm", "complexity", "analysis", "advanced"],
    3: ["data", "structure", "tree", "implementation"],
    # ... mais 100 documentos
}

# Teste de carga
sistema = SistemaBuscaInteligente()
for doc_id, palavras in documentos.items():
    sistema.indexar_documento(doc_id, palavras)

# Teste de busca
termos_busca = ["python", "algorithm", "data", "prog", "tree"]
for termo in termos_busca:
    resultado = sistema.buscar(termo)
    sugestoes = sistema.obter_sugestoes(termo[:3])
    print(f"'{termo}': {len(resultado)} docs, sugestões: {sugestoes}")

# Relatório final
print(sistema.gerar_relatorio())
```

---

## 📊 Critérios de Avaliação

### **Implementação (40 pontos)**
- ✅ **BST funcional** (10 pts)
- ✅ **AVL com rotações** (15 pts) 
- ✅ **Heap completo** (10 pts)
- ✅ **Trie básica** (5 pts)

### **Análise de Performance (30 pontos)**
- ✅ **Medições precisas** (10 pts)
- ✅ **Comparações detalhadas** (10 pts)
- ✅ **Interpretação correta** (10 pts)

### **Aplicação Prática (20 pontos)**
- ✅ **Sistema hospitalar** (10 pts)
- ✅ **Autocomplete funcional** (10 pts)

### **Documentação (10 pontos)**
- ✅ **Código comentado** (5 pts)
- ✅ **Relatório de resultados** (5 pts)

---

## 🚀 Desafios Extras (Bonus)

### **Desafio 1: Red-Black Tree**
Implemente uma Red-Black Tree e compare com AVL.

### **Desafio 2: B-Tree**
Crie uma B-Tree de ordem 5 para simular índice de banco de dados.

### **Desafio 3: Trie Comprimida**
Implemente uma Patricia Trie (compressed trie) para otimizar memória.

### **Desafio 4: Análise Big-O Experimental**
Prove experimentalmente as complexidades teóricas com datasets grandes.

---

## 📚 Recursos Adicionais

### **Datasets para Teste:**
- `palavras_portugues.txt` - 50,000 palavras
- `numeros_aleatorios.txt` - 100,000 números
- `documentos_teste.json` - 1,000 documentos

### **Ferramentas de Benchmark:**
```python
import time
import memory_profiler
import matplotlib.pyplot as plt

def medir_performance(funcao, *args):
    inicio = time.perf_counter()
    resultado = funcao(*args)
    fim = time.perf_counter()
    
    return resultado, (fim - inicio) * 1000  # ms
```

### **Visualização de Árvores:**
```python
def imprimir_arvore_visual(raiz, nivel=0, prefixo="Raiz: "):
    if raiz is not None:
        print(" " * (nivel * 4) + prefixo + str(raiz.valor))
        if raiz.esquerda or raiz.direita:
            if raiz.esquerda:
                imprimir_arvore_visual(raiz.esquerda, nivel + 1, "Esq: ")
            else:
                print(" " * ((nivel + 1) * 4) + "Esq: None")
            
            if raiz.direita:
                imprimir_arvore_visual(raiz.direita, nivel + 1, "Dir: ")
            else:
                print(" " * ((nivel + 1) * 4) + "Dir: None")
```

---

## ⏰ Cronograma Sugerido

| **Tempo** | **Atividade** |
|-----------|---------------|
| 30 min | Exercício 1 - BST básica |
| 45 min | Exercício 2 - AVL completa |
| 30 min | Exercício 3 - Heap e hospital |
| 30 min | Exercício 4 - Trie autocomplete |
| 45 min | Exercício 5 - Sistema integrado |
| 30 min | Análise e documentação |

**Total:** 3h30min

---

## 🎯 Entrega

**Formato:** Arquivo ZIP contendo:
1. **Códigos fonte** (.c, .py)
2. **Relatório PDF** com análises
3. **Screenshots** dos testes
4. **Datasets** utilizados

**Deadline:** Uma semana após a aula

**Submissão:** Email para professor com assunto "Lab05-[SeuNome]"
