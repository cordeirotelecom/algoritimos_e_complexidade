---
marp: true
theme: default
class: invert
paginate: true
backgroundColor: white
math: mathjax
style: |
  section {
    background-color: white;
    color: #000080;
    border: 3px solid #000080;
    font-family: Arial, sans-serif;
    font-size: 16px;
  }
  h1, h2, h3 {
    color: #000080;
  }
  code {
    background-color: #f0f0f0;
    color: #000080;
  }
  pre {
    background-color: #f0f0f0;
    border: 1px solid #000080;
  }
---

# Algoritmos e Complexidade
## Aula 04: Estruturas de Dados Avançadas - Árvores, Hash Tables e Grafos

**Prof. Vagner Cordeiro**  
**Sistemas de Informação**  
**Universidade - 2024**

---

## Agenda da Aula

1. **Árvores Binárias: Fundamentos e Implementação**
2. **Árvores Binárias de Busca (BST)**
3. **Árvores Balanceadas: AVL e Red-Black**
4. **Hash Tables: Teoria e Implementação**
5. **Funções de Hash e Tratamento de Colisões**
6. **Grafos: Representação e Algoritmos Básicos**
7. **Algoritmos de Busca: DFS e BFS**
8. **Aplicações Práticas e Análise de Performance**

---

## Objetivos de Aprendizagem

### Ao final desta aula, o estudante será capaz de:

**Estruturas Hierárquicas:**
- **Implementar** árvores binárias e suas operações fundamentais
- **Analisar** complexidade de operações em árvores balanceadas e não balanceadas
- **Aplicar** algoritmos de balanceamento em estruturas críticas

**Hash Tables:**
- **Projetar** funções de hash eficientes para diferentes tipos de dados
- **Implementar** estratégias de resolução de colisões
- **Otimizar** performance através de análise de fator de carga

**Grafos:**
- **Representar** grafos usando listas de adjacência e matrizes
- **Implementar** algoritmos fundamentais de busca e travessia
- **Resolver** problemas práticos usando teoria de grafos

---

## 1. Árvores Binárias: Fundamentos Matemáticos

### Definição Formal

Uma **árvore binária** é uma estrutura hierárquica onde cada nó tem no máximo dois filhos:

$$T = (V, E)$$

Onde:
- $V$ = Conjunto de vértices (nós)
- $E$ = Conjunto de arestas (conexões pai-filho)
- Para cada nó $v \in V$: $|\text{filhos}(v)| \leq 2$

### Propriedades Matemáticas Fundamentais

**Altura e Nós:**
- **Altura máxima:** $h_{max} = n - 1$ (árvore degenerada)
- **Altura mínima:** $h_{min} = \lfloor \log_2 n \rfloor$ (árvore completa)
- **Número máximo de nós no nível $i$:** $2^i$
- **Número máximo de nós com altura $h$:** $2^{h+1} - 1$

**Relações Importantes:**
$$n_{folhas} = n_{internos} + 1$$
$$n_{total} = 2 \times n_{internos} + 1$$

---

## Implementação de Árvore Binária em C

### Estrutura Básica e Operações

```c
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

typedef struct NoArvore {
    int dados;
    struct NoArvore *esquerda;
    struct NoArvore *direita;
    int altura;  // Para árvores balanceadas
} NoArvore;

typedef struct {
    NoArvore *raiz;
    int tamanho;
    int altura_maxima;
} ArvoreBinaria;

// Criação de nó
NoArvore* criar_no(int valor) {
    NoArvore *novo = malloc(sizeof(NoArvore));
    if (novo != NULL) {
        novo->dados = valor;
        novo->esquerda = NULL;
        novo->direita = NULL;
        novo->altura = 0;
    }
    return novo;
}

// Inicialização da árvore
ArvoreBinaria* inicializar_arvore() {
    ArvoreBinaria *arvore = malloc(sizeof(ArvoreBinaria));
    if (arvore != NULL) {
        arvore->raiz = NULL;
        arvore->tamanho = 0;
        arvore->altura_maxima = 0;
    }
    return arvore;
}
```

### Algoritmos de Travessia

```c
// Travessia Em-Ordem (In-Order): Esquerda -> Raiz -> Direita
void traversia_em_ordem(NoArvore *raiz) {
    if (raiz != NULL) {
        traversia_em_ordem(raiz->esquerda);
        printf("%d ", raiz->dados);
        traversia_em_ordem(raiz->direita);
    }
}

// Travessia Pré-Ordem (Pre-Order): Raiz -> Esquerda -> Direita
void traversia_pre_ordem(NoArvore *raiz) {
    if (raiz != NULL) {
        printf("%d ", raiz->dados);
        traversia_pre_ordem(raiz->esquerda);
        traversia_pre_ordem(raiz->direita);
    }
}

// Travessia Pós-Ordem (Post-Order): Esquerda -> Direita -> Raiz
void traversia_pos_ordem(NoArvore *raiz) {
    if (raiz != NULL) {
        traversia_pos_ordem(raiz->esquerda);
        traversia_pos_ordem(raiz->direita);
        printf("%d ", raiz->dados);
    }
}

// Travessia por Nível (Level-Order) usando Fila
void traversia_por_nivel(NoArvore *raiz) {
    if (raiz == NULL) return;
    
    // Implementação usando array como fila circular
    NoArvore *fila[1000];  // Assumindo no máximo 1000 nós
    int inicio = 0, fim = 0;
    
    fila[fim++] = raiz;
    
    while (inicio < fim) {
        NoArvore *atual = fila[inicio++];
        printf("%d ", atual->dados);
        
        if (atual->esquerda != NULL)
            fila[fim++] = atual->esquerda;
        if (atual->direita != NULL)
            fila[fim++] = atual->direita;
    }
}
```

**Análise de Complexidade das Travessias:**
- **Tempo:** $T(n) = O(n)$ - cada nó visitado exatamente uma vez
- **Espaço:** $S(n) = O(h)$ - altura da árvore na pilha de recursão

---

## 2. Árvores Binárias de Busca (BST)

### Propriedade Fundamental

Para todo nó $x$ em uma BST:
$$\forall y \in \text{subárvore\_esquerda}(x): y.valor < x.valor$$
$$\forall z \in \text{subárvore\_direita}(x): z.valor > x.valor$$

### Operações Fundamentais

```c
// Busca em BST
NoArvore* buscar_bst(NoArvore *raiz, int valor) {
    // Caso base: árvore vazia ou valor encontrado
    if (raiz == NULL || raiz->dados == valor)
        return raiz;
    
    // Valor menor: busca na subárvore esquerda
    if (valor < raiz->dados)
        return buscar_bst(raiz->esquerda, valor);
    
    // Valor maior: busca na subárvore direita
    return buscar_bst(raiz->direita, valor);
}

// Inserção em BST
NoArvore* inserir_bst(NoArvore *raiz, int valor) {
    // Caso base: posição de inserção encontrada
    if (raiz == NULL)
        return criar_no(valor);
    
    // Determina direção da inserção
    if (valor < raiz->dados) {
        raiz->esquerda = inserir_bst(raiz->esquerda, valor);
    } else if (valor > raiz->dados) {
        raiz->direita = inserir_bst(raiz->direita, valor);
    }
    // Valor igual: não insere duplicatas
    
    return raiz;
}

// Encontra o menor valor (mais à esquerda)
NoArvore* encontrar_minimo(NoArvore *raiz) {
    while (raiz->esquerda != NULL)
        raiz = raiz->esquerda;
    return raiz;
}

// Remoção em BST
NoArvore* remover_bst(NoArvore *raiz, int valor) {
    if (raiz == NULL)
        return raiz;
    
    // Localiza o nó a ser removido
    if (valor < raiz->dados) {
        raiz->esquerda = remover_bst(raiz->esquerda, valor);
    } else if (valor > raiz->dados) {
        raiz->direita = remover_bst(raiz->direita, valor);
    } else {
        // Nó encontrado - casos de remoção
        
        // Caso 1: Nó folha ou com apenas um filho
        if (raiz->esquerda == NULL) {
            NoArvore *temp = raiz->direita;
            free(raiz);
            return temp;
        } else if (raiz->direita == NULL) {
            NoArvore *temp = raiz->esquerda;
            free(raiz);
            return temp;
        }
        
        // Caso 2: Nó com dois filhos
        // Encontra o sucessor in-order (menor na subárvore direita)
        NoArvore *temp = encontrar_minimo(raiz->direita);
        
        // Substitui o valor do nó
        raiz->dados = temp->dados;
        
        // Remove o sucessor
        raiz->direita = remover_bst(raiz->direita, temp->dados);
    }
    
    return raiz;
}
```

**Análise de Complexidade BST:**
- **Melhor/Médio caso:** $O(\log n)$ - árvore balanceada
- **Pior caso:** $O(n)$ - árvore degenerada (lista)

---

## 3. Árvores AVL: Auto-Balanceamento

### Propriedade AVL

Para todo nó $x$:
$$|\text{altura}(\text{esquerda}(x)) - \text{altura}(\text{direita}(x))| \leq 1$$

### Rotações para Balanceamento

```c
// Calcula altura do nó
int altura_no(NoArvore *no) {
    if (no == NULL)
        return -1;
    return no->altura;
}

// Calcula fator de balanceamento
int fator_balanceamento(NoArvore *no) {
    if (no == NULL)
        return 0;
    return altura_no(no->esquerda) - altura_no(no->direita);
}

// Atualiza altura do nó
void atualizar_altura(NoArvore *no) {
    if (no != NULL) {
        int altura_esq = altura_no(no->esquerda);
        int altura_dir = altura_no(no->direita);
        no->altura = 1 + ((altura_esq > altura_dir) ? altura_esq : altura_dir);
    }
}

// Rotação à direita
NoArvore* rotacao_direita(NoArvore *y) {
    NoArvore *x = y->esquerda;
    NoArvore *T2 = x->direita;
    
    // Executa rotação
    x->direita = y;
    y->esquerda = T2;
    
    // Atualiza alturas
    atualizar_altura(y);
    atualizar_altura(x);
    
    // Nova raiz
    return x;
}

// Rotação à esquerda
NoArvore* rotacao_esquerda(NoArvore *x) {
    NoArvore *y = x->direita;
    NoArvore *T2 = y->esquerda;
    
    // Executa rotação
    y->esquerda = x;
    x->direita = T2;
    
    // Atualiza alturas
    atualizar_altura(x);
    atualizar_altura(y);
    
    // Nova raiz
    return y;
}

// Inserção AVL com balanceamento
NoArvore* inserir_avl(NoArvore *raiz, int valor) {
    // 1. Inserção normal de BST
    if (raiz == NULL)
        return criar_no(valor);
    
    if (valor < raiz->dados)
        raiz->esquerda = inserir_avl(raiz->esquerda, valor);
    else if (valor > raiz->dados)
        raiz->direita = inserir_avl(raiz->direita, valor);
    else  // Valores iguais não são permitidos
        return raiz;
    
    // 2. Atualiza altura do nó atual
    atualizar_altura(raiz);
    
    // 3. Obtém fator de balanceamento
    int balance = fator_balanceamento(raiz);
    
    // 4. Casos de rotação
    
    // Caso Esquerda-Esquerda
    if (balance > 1 && valor < raiz->esquerda->dados)
        return rotacao_direita(raiz);
    
    // Caso Direita-Direita
    if (balance < -1 && valor > raiz->direita->dados)
        return rotacao_esquerda(raiz);
    
    // Caso Esquerda-Direita
    if (balance > 1 && valor > raiz->esquerda->dados) {
        raiz->esquerda = rotacao_esquerda(raiz->esquerda);
        return rotacao_direita(raiz);
    }
    
    // Caso Direita-Esquerda
    if (balance < -1 && valor < raiz->direita->dados) {
        raiz->direita = rotacao_direita(raiz->direita);
        return rotacao_esquerda(raiz);
    }
    
    // Retorna o nó (inalterado)
    return raiz;
}
```

**Garantias AVL:**
- **Altura:** $h = O(\log n)$ - limitada por $1.44 \log_2 n$
- **Operações:** $O(\log n)$ garantido para busca, inserção e remoção

---

## 4. Hash Tables: Fundamentos Teóricos

### Definição e Princípios

Uma **hash table** mapeia chaves para valores usando uma função de hash:

$$h: K \rightarrow \{0, 1, 2, ..., m-1\}$$

Onde:
- $K$ = Espaço de chaves (potencialmente infinito)
- $m$ = Tamanho da tabela (finito)
- $h(k)$ = Índice da tabela para a chave $k$

### Implementação Básica

```c
#define TAMANHO_TABELA 1009  // Número primo para melhor distribuição

typedef struct EntradaHash {
    char *chave;
    int valor;
    struct EntradaHash *proximo;  // Para encadeamento
} EntradaHash;

typedef struct {
    EntradaHash **tabela;
    int tamanho;
    int elementos;
    double fator_carga_maximo;
} TabelaHash;

// Inicialização da tabela hash
TabelaHash* criar_tabela_hash(int tamanho) {
    TabelaHash *tabela = malloc(sizeof(TabelaHash));
    if (tabela == NULL) return NULL;
    
    tabela->tamanho = tamanho;
    tabela->elementos = 0;
    tabela->fator_carga_maximo = 0.75;
    
    tabela->tabela = calloc(tamanho, sizeof(EntradaHash*));
    if (tabela->tabela == NULL) {
        free(tabela);
        return NULL;
    }
    
    return tabela;
}

// Função hash simples (djb2)
unsigned long hash_djb2(const char *str) {
    unsigned long hash = 5381;
    int c;
    
    while ((c = *str++))
        hash = ((hash << 5) + hash) + c;  // hash * 33 + c
    
    return hash;
}

// Função hash com módulo
int hash_funcao(TabelaHash *tabela, const char *chave) {
    return hash_djb2(chave) % tabela->tamanho;
}
```

### Tratamento de Colisões: Encadeamento

```c
// Inserção com encadeamento
void inserir_hash(TabelaHash *tabela, const char *chave, int valor) {
    int indice = hash_funcao(tabela, chave);
    
    // Verifica se chave já existe
    EntradaHash *atual = tabela->tabela[indice];
    while (atual != NULL) {
        if (strcmp(atual->chave, chave) == 0) {
            atual->valor = valor;  // Atualiza valor existente
            return;
        }
        atual = atual->proximo;
    }
    
    // Cria nova entrada
    EntradaHash *nova = malloc(sizeof(EntradaHash));
    if (nova == NULL) return;
    
    nova->chave = malloc(strlen(chave) + 1);
    strcpy(nova->chave, chave);
    nova->valor = valor;
    nova->proximo = tabela->tabela[indice];
    
    tabela->tabela[indice] = nova;
    tabela->elementos++;
    
    // Verifica necessidade de redimensionamento
    double fator_carga = (double)tabela->elementos / tabela->tamanho;
    if (fator_carga > tabela->fator_carga_maximo) {
        redimensionar_tabela(tabela);
    }
}

// Busca na tabela hash
int* buscar_hash(TabelaHash *tabela, const char *chave) {
    int indice = hash_funcao(tabela, chave);
    
    EntradaHash *atual = tabela->tabela[indice];
    while (atual != NULL) {
        if (strcmp(atual->chave, chave) == 0) {
            return &atual->valor;
        }
        atual = atual->proximo;
    }
    
    return NULL;  // Não encontrado
}

// Remoção da tabela hash
bool remover_hash(TabelaHash *tabela, const char *chave) {
    int indice = hash_funcao(tabela, chave);
    
    EntradaHash *atual = tabela->tabela[indice];
    EntradaHash *anterior = NULL;
    
    while (atual != NULL) {
        if (strcmp(atual->chave, chave) == 0) {
            if (anterior == NULL) {
                tabela->tabela[indice] = atual->proximo;
            } else {
                anterior->proximo = atual->proximo;
            }
            
            free(atual->chave);
            free(atual);
            tabela->elementos--;
            return true;
        }
        anterior = atual;
        atual = atual->proximo;
    }
    
    return false;  // Não encontrado
}
```

### Redimensionamento Dinâmico

```c
void redimensionar_tabela(TabelaHash *tabela) {
    int tamanho_antigo = tabela->tamanho;
    EntradaHash **tabela_antiga = tabela->tabela;
    
    // Dobra o tamanho e encontra próximo primo
    tabela->tamanho = proximo_primo(tamanho_antigo * 2);
    tabela->tabela = calloc(tabela->tamanho, sizeof(EntradaHash*));
    tabela->elementos = 0;
    
    if (tabela->tabela == NULL) {
        // Falha na alocação - reverte
        tabela->tamanho = tamanho_antigo;
        tabela->tabela = tabela_antiga;
        return;
    }
    
    // Reinsere todos os elementos
    for (int i = 0; i < tamanho_antigo; i++) {
        EntradaHash *atual = tabela_antiga[i];
        while (atual != NULL) {
            EntradaHash *proximo = atual->proximo;
            
            // Reinsere na nova tabela
            int novo_indice = hash_funcao(tabela, atual->chave);
            atual->proximo = tabela->tabela[novo_indice];
            tabela->tabela[novo_indice] = atual;
            tabela->elementos++;
            
            atual = proximo;
        }
    }
    
    free(tabela_antiga);
}

bool eh_primo(int n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 == 0 || n % 3 == 0) return false;
    
    for (int i = 5; i * i <= n; i += 6) {
        if (n % i == 0 || n % (i + 2) == 0)
            return false;
    }
    return true;
}

int proximo_primo(int n) {
    while (!eh_primo(n))
        n++;
    return n;
}
```

**Análise de Performance Hash Tables:**
- **Tempo médio:** $O(1)$ para busca, inserção e remoção
- **Pior caso:** $O(n)$ quando todas as chaves colidem
- **Fator de carga ideal:** $\alpha = 0.75$

---

## 5. Funções de Hash Avançadas

### Hash para Diferentes Tipos de Dados

```c
// Hash para inteiros (multiplicação)
unsigned int hash_inteiro(int chave, int tamanho_tabela) {
    const double A = 0.6180339887;  // (√5 - 1) / 2
    double produto = chave * A;
    double fracao = produto - (int)produto;
    return (int)(tamanho_tabela * fracao);
}

// Hash para strings (polinomial rolling hash)
unsigned long hash_polinomial(const char *str, int tamanho_tabela) {
    const int p = 31;  // Número primo
    const int m = 1e9 + 9;  // Módulo grande
    long long hash_value = 0;
    long long p_pow = 1;
    
    for (const char *c = str; *c; c++) {
        hash_value = (hash_value + (*c - 'a' + 1) * p_pow) % m;
        p_pow = (p_pow * p) % m;
    }
    
    return hash_value % tamanho_tabela;
}

// Hash para estruturas complexas
typedef struct {
    int id;
    char nome[50];
    double salario;
} Funcionario;

unsigned int hash_funcionario(const Funcionario *func, int tamanho_tabela) {
    unsigned int hash = 0;
    
    // Combina hash de diferentes campos
    hash ^= hash_inteiro(func->id, tamanho_tabela);
    hash ^= hash_polinomial(func->nome, tamanho_tabela) << 1;
    hash ^= hash_inteiro((int)(func->salario * 100), tamanho_tabela) << 2;
    
    return hash % tamanho_tabela;
}
```

### Tratamento de Colisões: Endereçamento Aberto

```c
typedef struct {
    char *chave;
    int valor;
    bool ocupado;
    bool removido;  // Para lazy deletion
} EntradaHashAberto;

typedef struct {
    EntradaHashAberto *tabela;
    int tamanho;
    int elementos;
    int removidos;
} TabelaHashAberto;

// Sondagem linear
int sondagem_linear(TabelaHashAberto *tabela, const char *chave) {
    int indice = hash_funcao_simples(chave, tabela->tamanho);
    int original = indice;
    
    while (tabela->tabela[indice].ocupado) {
        if (!tabela->tabela[indice].removido && 
            strcmp(tabela->tabela[indice].chave, chave) == 0) {
            return indice;  // Encontrado
        }
        indice = (indice + 1) % tabela->tamanho;
        
        if (indice == original) {
            return -1;  // Tabela cheia
        }
    }
    
    return indice;  // Posição livre
}

// Sondagem quadrática
int sondagem_quadratica(TabelaHashAberto *tabela, const char *chave) {
    int indice = hash_funcao_simples(chave, tabela->tamanho);
    int i = 0;
    
    while (i < tabela->tamanho) {
        int pos = (indice + i * i) % tabela->tamanho;
        
        if (!tabela->tabela[pos].ocupado || 
            (!tabela->tabela[pos].removido && 
             strcmp(tabela->tabela[pos].chave, chave) == 0)) {
            return pos;
        }
        i++;
    }
    
    return -1;  // Não encontrado/sem espaço
}

// Double hashing
int double_hashing(TabelaHashAberto *tabela, const char *chave) {
    int hash1 = hash_funcao_simples(chave, tabela->tamanho);
    int hash2 = 7 - (hash_funcao_simples(chave, 7));  // Função auxiliar
    int i = 0;
    
    while (i < tabela->tamanho) {
        int pos = (hash1 + i * hash2) % tabela->tamanho;
        
        if (!tabela->tabela[pos].ocupado || 
            (!tabela->tabela[pos].removido && 
             strcmp(tabela->tabela[pos].chave, chave) == 0)) {
            return pos;
        }
        i++;
    }
    
    return -1;
}
```

---

## 6. Grafos: Representação e Algoritmos Fundamentais

### Definições Matemáticas

Um **grafo** é uma tupla $G = (V, E)$ onde:
- $V$ = Conjunto finito de vértices
- $E \subseteq V \times V$ = Conjunto de arestas

**Classificações:**
- **Direcionado vs Não-direcionado**
- **Ponderado vs Não-ponderado** 
- **Conectado vs Desconectado**
- **Cíclico vs Acíclico**

### Representações de Grafos

```c
#define MAX_VERTICES 100

// 1. Matriz de Adjacência
typedef struct {
    int matriz[MAX_VERTICES][MAX_VERTICES];
    int num_vertices;
    bool direcionado;
} GrafoMatriz;

// Inicialização matriz de adjacência
GrafoMatriz* criar_grafo_matriz(int vertices, bool direcionado) {
    GrafoMatriz *grafo = malloc(sizeof(GrafoMatriz));
    grafo->num_vertices = vertices;
    grafo->direcionado = direcionado;
    
    // Inicializa matriz com zeros
    for (int i = 0; i < vertices; i++) {
        for (int j = 0; j < vertices; j++) {
            grafo->matriz[i][j] = 0;
        }
    }
    
    return grafo;
}

// Adiciona aresta na matriz
void adicionar_aresta_matriz(GrafoMatriz *grafo, int origem, int destino) {
    if (origem >= 0 && origem < grafo->num_vertices &&
        destino >= 0 && destino < grafo->num_vertices) {
        
        grafo->matriz[origem][destino] = 1;
        
        if (!grafo->direcionado) {
            grafo->matriz[destino][origem] = 1;
        }
    }
}

// 2. Lista de Adjacência
typedef struct NoAdjacencia {
    int vertice;
    int peso;  // Para grafos ponderados
    struct NoAdjacencia *proximo;
} NoAdjacencia;

typedef struct {
    NoAdjacencia **listas;
    int num_vertices;
    bool direcionado;
} GrafoLista;

// Inicialização lista de adjacência
GrafoLista* criar_grafo_lista(int vertices, bool direcionado) {
    GrafoLista *grafo = malloc(sizeof(GrafoLista));
    grafo->num_vertices = vertices;
    grafo->direcionado = direcionado;
    
    grafo->listas = calloc(vertices, sizeof(NoAdjacencia*));
    
    return grafo;
}

// Adiciona aresta na lista
void adicionar_aresta_lista(GrafoLista *grafo, int origem, int destino, int peso) {
    // Adiciona aresta origem -> destino
    NoAdjacencia *novo = malloc(sizeof(NoAdjacencia));
    novo->vertice = destino;
    novo->peso = peso;
    novo->proximo = grafo->listas[origem];
    grafo->listas[origem] = novo;
    
    // Se não direcionado, adiciona aresta destino -> origem
    if (!grafo->direcionado) {
        novo = malloc(sizeof(NoAdjacencia));
        novo->vertice = origem;
        novo->peso = peso;
        novo->proximo = grafo->listas[destino];
        grafo->listas[destino] = novo;
    }
}
```

**Comparação de Representações:**

| **Aspecto** | **Matriz** | **Lista** |
|-------------|------------|-----------|
| **Espaço** | $O(V^2)$ | $O(V + E)$ |
| **Verificar aresta** | $O(1)$ | $O(V)$ |
| **Adicionar aresta** | $O(1)$ | $O(1)$ |
| **Iterar vizinhos** | $O(V)$ | $O(\text{grau})$ |

---

## 7. Algoritmos de Busca em Grafos

### Busca em Profundidade (DFS)

```c
void dfs_recursivo(GrafoLista *grafo, int vertice, bool visitado[]) {
    visitado[vertice] = true;
    printf("%d ", vertice);
    
    NoAdjacencia *adj = grafo->listas[vertice];
    while (adj != NULL) {
        if (!visitado[adj->vertice]) {
            dfs_recursivo(grafo, adj->vertice, visitado);
        }
        adj = adj->proximo;
    }
}

// DFS iterativo usando pilha
void dfs_iterativo(GrafoLista *grafo, int inicio) {
    bool visitado[MAX_VERTICES] = {false};
    int pilha[MAX_VERTICES];
    int topo = -1;
    
    // Empilha vértice inicial
    pilha[++topo] = inicio;
    
    while (topo >= 0) {
        int vertice = pilha[topo--];
        
        if (!visitado[vertice]) {
            visitado[vertice] = true;
            printf("%d ", vertice);
            
            // Adiciona vizinhos não visitados à pilha
            NoAdjacencia *adj = grafo->listas[vertice];
            while (adj != NULL) {
                if (!visitado[adj->vertice]) {
                    pilha[++topo] = adj->vertice;
                }
                adj = adj->proximo;
            }
        }
    }
}

// Aplicação: Detecção de ciclos
bool tem_ciclo_dfs(GrafoLista *grafo) {
    bool visitado[MAX_VERTICES] = {false};
    bool pilha_recursao[MAX_VERTICES] = {false};
    
    for (int i = 0; i < grafo->num_vertices; i++) {
        if (!visitado[i]) {
            if (dfs_ciclo_util(grafo, i, visitado, pilha_recursao)) {
                return true;
            }
        }
    }
    return false;
}

bool dfs_ciclo_util(GrafoLista *grafo, int vertice, 
                   bool visitado[], bool pilha_recursao[]) {
    visitado[vertice] = true;
    pilha_recursao[vertice] = true;
    
    NoAdjacencia *adj = grafo->listas[vertice];
    while (adj != NULL) {
        if (!visitado[adj->vertice]) {
            if (dfs_ciclo_util(grafo, adj->vertice, visitado, pilha_recursao)) {
                return true;
            }
        } else if (pilha_recursao[adj->vertice]) {
            return true;  // Ciclo encontrado
        }
        adj = adj->proximo;
    }
    
    pilha_recursao[vertice] = false;
    return false;
}
```

### Busca em Largura (BFS)

```c
void bfs(GrafoLista *grafo, int inicio) {
    bool visitado[MAX_VERTICES] = {false};
    int fila[MAX_VERTICES];
    int frente = 0, tras = 0;
    
    // Marca o vértice inicial como visitado e o enfileira
    visitado[inicio] = true;
    fila[tras++] = inicio;
    
    while (frente < tras) {
        int vertice = fila[frente++];
        printf("%d ", vertice);
        
        // Visita todos os vizinhos não visitados
        NoAdjacencia *adj = grafo->listas[vertice];
        while (adj != NULL) {
            if (!visitado[adj->vertice]) {
                visitado[adj->vertice] = true;
                fila[tras++] = adj->vertice;
            }
            adj = adj->proximo;
        }
    }
}

// BFS para encontrar menor caminho (número de arestas)
int* menor_caminho_bfs(GrafoLista *grafo, int origem, int destino) {
    bool visitado[MAX_VERTICES] = {false};
    int distancia[MAX_VERTICES];
    int pai[MAX_VERTICES];
    int fila[MAX_VERTICES];
    int frente = 0, tras = 0;
    
    // Inicialização
    for (int i = 0; i < grafo->num_vertices; i++) {
        distancia[i] = -1;
        pai[i] = -1;
    }
    
    visitado[origem] = true;
    distancia[origem] = 0;
    fila[tras++] = origem;
    
    while (frente < tras) {
        int vertice = fila[frente++];
        
        NoAdjacencia *adj = grafo->listas[vertice];
        while (adj != NULL) {
            if (!visitado[adj->vertice]) {
                visitado[adj->vertice] = true;
                distancia[adj->vertice] = distancia[vertice] + 1;
                pai[adj->vertice] = vertice;
                fila[tras++] = adj->vertice;
                
                // Se encontrou o destino, para a busca
                if (adj->vertice == destino) {
                    return pai;  // Retorna array de pais para reconstruir caminho
                }
            }
            adj = adj->proximo;
        }
    }
    
    return NULL;  // Caminho não encontrado
}

// Reconstrói caminho a partir do array de pais
void imprimir_caminho(int pai[], int origem, int destino) {
    if (pai[destino] == -1) {
        printf("Caminho não existe de %d para %d\n", origem, destino);
        return;
    }
    
    int caminho[MAX_VERTICES];
    int tamanho = 0;
    int atual = destino;
    
    // Reconstrói caminho de trás para frente
    while (atual != -1) {
        caminho[tamanho++] = atual;
        atual = pai[atual];
    }
    
    // Imprime caminho de frente para trás
    printf("Caminho de %d para %d: ", origem, destino);
    for (int i = tamanho - 1; i >= 0; i--) {
        printf("%d", caminho[i]);
        if (i > 0) printf(" -> ");
    }
    printf("\n");
}
```

**Análise de Complexidade:**
- **DFS:** $T(V + E)$, $S(V)$ para pilha/recursão
- **BFS:** $T(V + E)$, $S(V)$ para fila

---

## 8. Aplicações Práticas e Sistemas Reais

### Sistema de Recomendação usando Grafos

```c
typedef struct {
    int usuario_id;
    char nome[100];
    int interesses[10];  // IDs de categorias de interesse
    int num_interesses;
} Usuario;

typedef struct {
    Usuario usuarios[1000];
    GrafoLista *grafo_amizades;
    TabelaHash *tabela_usuarios;
    int num_usuarios;
} RedeSocial;

// Calcula similaridade entre usuários
double calcular_similaridade(Usuario *u1, Usuario *u2) {
    int interesses_comuns = 0;
    int total_interesses = u1->num_interesses + u2->num_interesses;
    
    for (int i = 0; i < u1->num_interesses; i++) {
        for (int j = 0; j < u2->num_interesses; j++) {
            if (u1->interesses[i] == u2->interesses[j]) {
                interesses_comuns++;
                break;
            }
        }
    }
    
    if (total_interesses == 0) return 0.0;
    return (2.0 * interesses_comuns) / total_interesses;
}

// Recomenda amigos baseado em amigos de amigos
void recomendar_amigos(RedeSocial *rede, int usuario_id) {
    bool visitado[MAX_VERTICES] = {false};
    int candidatos[MAX_VERTICES];
    double scores[MAX_VERTICES];
    int num_candidatos = 0;
    
    // BFS de profundidade 2 para encontrar amigos de amigos
    NoAdjacencia *amigos = rede->grafo_amizades->listas[usuario_id];
    
    while (amigos != NULL) {
        int amigo_id = amigos->vertice;
        NoAdjacencia *amigos_do_amigo = rede->grafo_amizades->listas[amigo_id];
        
        while (amigos_do_amigo != NULL) {
            int candidato_id = amigos_do_amigo->vertice;
            
            if (candidato_id != usuario_id && !visitado[candidato_id]) {
                visitado[candidato_id] = true;
                candidatos[num_candidatos] = candidato_id;
                
                // Calcula score baseado em similaridade
                scores[num_candidatos] = calcular_similaridade(
                    &rede->usuarios[usuario_id], 
                    &rede->usuarios[candidato_id]
                );
                
                num_candidatos++;
            }
            amigos_do_amigo = amigos_do_amigo->proximo;
        }
        amigos = amigos->proximo;
    }
    
    // Ordena candidatos por score
    for (int i = 0; i < num_candidatos - 1; i++) {
        for (int j = 0; j < num_candidatos - i - 1; j++) {
            if (scores[j] < scores[j + 1]) {
                // Troca scores
                double temp_score = scores[j];
                scores[j] = scores[j + 1];
                scores[j + 1] = temp_score;
                
                // Troca candidatos
                int temp_id = candidatos[j];
                candidatos[j] = candidatos[j + 1];
                candidatos[j + 1] = temp_id;
            }
        }
    }
    
    // Mostra top 5 recomendações
    printf("Recomendações de amizade para %s:\n", 
           rede->usuarios[usuario_id].nome);
    int limite = (num_candidatos < 5) ? num_candidatos : 5;
    for (int i = 0; i < limite; i++) {
        printf("%d. %s (Score: %.2f)\n", 
               i + 1, 
               rede->usuarios[candidatos[i]].nome, 
               scores[i]);
    }
}
```

### Sistema de Cache com LRU usando Hash + Lista Duplamente Ligada

```c
typedef struct NoCache {
    char *chave;
    int valor;
    struct NoCache *anterior;
    struct NoCache *proximo;
} NoCache;

typedef struct {
    TabelaHash *hash_table;
    NoCache *cabeca;
    NoCache *cauda;
    int capacidade;
    int tamanho_atual;
} CacheLRU;

CacheLRU* criar_cache_lru(int capacidade) {
    CacheLRU *cache = malloc(sizeof(CacheLRU));
    cache->hash_table = criar_tabela_hash(capacidade * 2);
    cache->capacidade = capacidade;
    cache->tamanho_atual = 0;
    
    // Nós sentinelas para simplificar operações
    cache->cabeca = malloc(sizeof(NoCache));
    cache->cauda = malloc(sizeof(NoCache));
    cache->cabeca->proximo = cache->cauda;
    cache->cauda->anterior = cache->cabeca;
    cache->cabeca->anterior = NULL;
    cache->cauda->proximo = NULL;
    
    return cache;
}

void mover_para_cabeca(CacheLRU *cache, NoCache *no) {
    // Remove nó da posição atual
    no->anterior->proximo = no->proximo;
    no->proximo->anterior = no->anterior;
    
    // Insere após a cabeça
    no->proximo = cache->cabeca->proximo;
    no->anterior = cache->cabeca;
    cache->cabeca->proximo->anterior = no;
    cache->cabeca->proximo = no;
}

int obter_cache_lru(CacheLRU *cache, const char *chave) {
    NoCache *no = (NoCache*)buscar_hash(cache->hash_table, chave);
    
    if (no != NULL) {
        // Move para frente (mais recentemente usado)
        mover_para_cabeca(cache, no);
        return no->valor;
    }
    
    return -1;  // Não encontrado
}

void inserir_cache_lru(CacheLRU *cache, const char *chave, int valor) {
    NoCache *no = (NoCache*)buscar_hash(cache->hash_table, chave);
    
    if (no != NULL) {
        // Atualiza valor existente
        no->valor = valor;
        mover_para_cabeca(cache, no);
        return;
    }
    
    // Cria novo nó
    NoCache *novo = malloc(sizeof(NoCache));
    novo->chave = malloc(strlen(chave) + 1);
    strcpy(novo->chave, chave);
    novo->valor = valor;
    
    if (cache->tamanho_atual >= cache->capacidade) {
        // Remove LRU (último nó antes da cauda)
        NoCache *lru = cache->cauda->anterior;
        remover_hash(cache->hash_table, lru->chave);
        
        lru->anterior->proximo = lru->proximo;
        lru->proximo->anterior = lru->anterior;
        
        free(lru->chave);
        free(lru);
        cache->tamanho_atual--;
    }
    
    // Insere novo nó na frente
    novo->proximo = cache->cabeca->proximo;
    novo->anterior = cache->cabeca;
    cache->cabeca->proximo->anterior = novo;
    cache->cabeca->proximo = novo;
    
    inserir_hash(cache->hash_table, chave, (int)novo);
    cache->tamanho_atual++;
}
```

**Performance do Cache LRU:**
- **Get:** $O(1)$ médio
- **Put:** $O(1)$ médio
- **Espaço:** $O(\text{capacidade})$

---

## 9. Conclusões e Próximos Passos

### Resumo de Estruturas de Dados

| **Estrutura** | **Busca** | **Inserção** | **Remoção** | **Uso Ideal** |
|---------------|-----------|--------------|-------------|---------------|
| **Array** | $O(n)$ | $O(n)$ | $O(n)$ | Acesso sequencial |
| **BST** | $O(\log n)$ | $O(\log n)$ | $O(\log n)$ | Dados ordenados |
| **AVL** | $O(\log n)$ | $O(\log n)$ | $O(\log n)$ | Busca frequente |
| **Hash Table** | $O(1)$ | $O(1)$ | $O(1)$ | Acesso aleatório |
| **Grafo (Lista)** | $O(V+E)$ | $O(1)$ | $O(V)$ | Relações complexas |

### Preparação para Aulas Futuras

**Aula 05:** Algoritmos de Grafos Avançados
- Algoritmos de caminho mínimo (Dijkstra, Floyd-Warshall)
- Árvores de espalhamento mínimo (Kruskal, Prim)
- Ordenação topológica e componentes fortemente conexos

**Aula 06:** Programação Dinâmica
- Princípios de otimalidade e subestrutura
- Memoização vs tabulação
- Problemas clássicos: fibonacci, knapsack, LCS

---

## Bibliografia e Recursos Avançados

### Livros Especializados
- **Weiss, M. A.** *Data Structures and Algorithm Analysis in C*
- **Sedgewick, R.** *Algorithms in C++*, Parts 1-5
- **Skiena, S. S.** *The Algorithm Design Manual*

### Ferramentas de Visualização
- **VisuAlgo:** Animações interativas de estruturas de dados
- **Data Structure Visualizations:** USF Computer Science
- **Algorithm Visualizer:** Implementações visuais

### Implementações de Referência
- **GNU C Library:** Implementações otimizadas
- **OpenJDK Collections:** Java standard library
- **Boost C++ Libraries:** Estruturas avançadas

---

# Encerramento da Aula

## Algoritmos e Complexidade - Aula 04
*Estruturas de Dados Avançadas - Árvores, Hash Tables e Grafos*

**Próxima Aula:** Algoritmos de Grafos Avançados e Caminhos Mínimos
**Projeto Prático:** Implementar sistema de cache LRU completo

### Exercícios Recomendados
1. Implementar AVL tree com todas as operações
2. Criar hash table com redimensionamento dinâmico  
3. Desenvolver sistema de navegação usando BFS/DFS

---
