# 📚 LISTA COMPLETA DE CONCEITOS - Algoritmos e Complexidade
## Teoricos, Práticos e Exemplos do Dia a Dia

---

## 🎯 PARTE I: CONCEITOS TEÓRICOS FUNDAMENTAIS

### **📐 1. ANÁLISE DE ALGORITMOS**

#### **1.1 Complexidade de Tempo**
**Definição:** Medida de quanto tempo um algoritmo leva para executar em função do tamanho da entrada.

**Notações Assintóticas:**
- **Big O (O):** Limite superior - "no máximo"
- **Big Ω (Ω):** Limite inferior - "no mínimo" 
- **Big Θ (Θ):** Limite exato - "exatamente"

**Exemplo Matemático:**
```
f(n) = 3n² + 2n + 1
- O(n²) porque 3n² domina para n grande
- Ω(n²) porque mesmo no melhor caso é quadrático
- Θ(n²) porque Big O = Big Ω
```

**Exemplo do Dia a Dia - Organizar Livros:**
- **O(1):** Pegar um livro específico se souber exatamente onde está
- **O(n):** Procurar um livro passando por todos até encontrar
- **O(n²):** Organizar por autor comparando cada livro com todos os outros

#### **1.2 Complexidade de Espaço**
**Definição:** Quantidade de memória adicional que um algoritmo usa.

**Categorias:**
- **In-place:** O(1) - usa apenas espaço constante extra
- **Linear:** O(n) - espaço proporcional à entrada
- **Quadrático:** O(n²) - matriz de adjacência para grafos

**Exemplo do Dia a Dia - Fazer uma Lista de Compras:**
- **O(1):** Memorizar apenas o próximo item (pilha mental)
- **O(n):** Escrever todos os itens em papel
- **O(n²):** Anotar cada item junto com todos os preços de todas as lojas

#### **1.3 Análise de Melhor, Pior e Caso Médio**

**Quick Sort Exemplo:**
- **Melhor caso Θ(n log n):** Pivô sempre divide pela metade
- **Pior caso Θ(n²):** Array já ordenado, pivô sempre o menor
- **Caso médio Θ(n log n):** Pivô divide razoavelmente bem na maioria das vezes

**Exemplo do Dia a Dia - Procurar Vaga de Estacionamento:**
- **Melhor caso:** Primeira vaga que você vê está livre
- **Pior caso:** Dar volta completa no quarteirão
- **Caso médio:** Encontrar vaga na metade do percurso

### **📊 2. ORDENS DE CRESCIMENTO**

#### **2.1 Hierarquia Completa**
```
O(1) < O(log log n) < O(log n) < O(n^(1/2)) < O(n) < O(n log n) < O(n²) < O(n³) < O(2^n) < O(n!) < O(n^n)
```

**Comparação Prática para n = 1.000.000:**

| Complexidade | Operações | Tempo (1ns/op) | Exemplo Prático |
|--------------|-----------|----------------|-----------------|
| **O(1)** | 1 | 1 nanosegundo | Acesso a array |
| **O(log n)** | ~20 | 20 ns | Busca em árvore |
| **O(n)** | 1.000.000 | 1 ms | Ler arquivo |
| **O(n log n)** | ~20.000.000 | 20 ms | Ordenação eficiente |
| **O(n²)** | 10¹² | 16 minutos | Bubble sort |
| **O(2^n)** | 2^(10^6) | Idade do universo × 10^(300000) | Força bruta |

#### **2.2 Análise Amortizada**
**Conceito:** Custo médio de uma operação em uma sequência de operações.

**Exemplo - Array Dinâmico:**
```c
// Inserção em array que dobra de tamanho quando cheio
void inserir(ArrayDinamico* arr, int valor) {
    if (arr->tamanho == arr->capacidade) {
        // Dobrar capacidade - operação custosa O(n)
        redimensionar(arr, arr->capacidade * 2);
    }
    arr->dados[arr->tamanho++] = valor; // O(1)
}
```

**Análise Amortizada:**
- Inserções simples: O(1)
- Redimensionamentos: O(n) mas raros
- **Custo amortizado: O(1)** por inserção

**Exemplo do Dia a Dia - Mudança de Casa:**
- Guardar roupas no armário: O(1) - rápido
- Quando armário lota, comprar armário maior: O(n) - demorado
- **Amortizado:** O(1) porque não muda de armário toda hora

### **🔄 3. TÉCNICAS DE ANÁLISE**

#### **3.1 Método da Árvore de Recursão**
**Para analisar algoritmos recursivos dividir-e-conquistar.**

**Exemplo - Merge Sort:**
```
T(n) = 2T(n/2) + O(n)

Árvore:
           n        ← 1 nível × n trabalho
         /   \
       n/2   n/2     ← 2 níveis × n/2 trabalho cada = n total
      / |   | \
    n/4 n/4 n/4 n/4  ← 4 níveis × n/4 trabalho cada = n total

Altura: log n
Trabalho por nível: n
Total: n × log n = O(n log n)
```

#### **3.2 Método Mestre (Master Theorem)**
**Fórmula para recorrências do tipo:** T(n) = aT(n/b) + f(n)

**Casos:**
1. Se f(n) = O(n^(log_b(a) - ε)), então T(n) = Θ(n^(log_b(a)))
2. Se f(n) = Θ(n^(log_b(a))), então T(n) = Θ(n^(log_b(a)) × log n)
3. Se f(n) = Ω(n^(log_b(a) + ε)), então T(n) = Θ(f(n))

**Exemplo Prático:**
```
Merge Sort: T(n) = 2T(n/2) + n
a=2, b=2, f(n)=n
log_2(2) = 1, f(n) = n = n¹
Caso 2: T(n) = Θ(n log n)
```

---

## 🏗️ PARTE II: ESTRUTURAS DE DADOS

### **📚 4. ESTRUTURAS LINEARES**

#### **4.1 Arrays (Vetores)**
**Características:**
- Acesso aleatório O(1)
- Inserção/remoção O(n) no meio
- Memória contígua (cache-friendly)

**Código Conceitual:**
```c
typedef struct {
    int dados[1000];
    int tamanho;
} Array;

// Acesso direto - O(1)
int obter(Array* arr, int indice) {
    return arr->dados[indice]; // Cálculo: base + indice × sizeof(int)
}

// Inserção no meio - O(n)
void inserir(Array* arr, int indice, int valor) {
    // Mover elementos: [indice..tamanho-1] → [indice+1..tamanho]
    for (int i = arr->tamanho; i > indice; i--) {
        arr->dados[i] = arr->dados[i-1];
    }
    arr->dados[indice] = valor;
    arr->tamanho++;
}
```

**Exemplos do Dia a Dia:**
- **Lista de presença:** Nomes numerados sequencialmente
- **Assentos do cinema:** Fileira A, assento 15 = acesso direto
- **Playlist musical:** Faixa 5 = acesso imediato

#### **4.2 Listas Ligadas**
**Características:**
- Acesso sequencial O(n)
- Inserção/remoção O(1) com ponteiro
- Memória espalhada (cache-unfriendly)

**Código Conceitual:**
```c
typedef struct No {
    int dados;
    struct No* proximo;
} No;

typedef struct {
    No* cabeca;
    int tamanho;
} ListaLigada;

// Busca - O(n)
No* buscar(ListaLigada* lista, int valor) {
    No* atual = lista->cabeca;
    while (atual && atual->dados != valor) {
        atual = atual->proximo; // Seguir ponteiro
    }
    return atual;
}

// Inserção no início - O(1)
void inserir_inicio(ListaLigada* lista, int valor) {
    No* novo = malloc(sizeof(No));
    novo->dados = valor;
    novo->proximo = lista->cabeca;
    lista->cabeca = novo;
    lista->tamanho++;
}
```

**Exemplos do Dia a Dia:**
- **Corrente de pessoas:** Cada pessoa segura na próxima
- **Caça ao tesouro:** Cada pista leva à próxima localização
- **Lista de espera:** Cada pessoa sabe quem é a próxima

#### **4.3 Pilhas (Stacks) - LIFO**
**Princípio:** Last In, First Out

**Operações Fundamentais:**
- **Push:** Adicionar no topo O(1)
- **Pop:** Remover do topo O(1)
- **Top/Peek:** Ver o topo sem remover O(1)

**Código Conceitual:**
```c
typedef struct {
    int dados[1000];
    int topo;
} Pilha;

void push(Pilha* p, int valor) {
    p->dados[++p->topo] = valor;
}

int pop(Pilha* p) {
    return p->dados[p->topo--];
}
```

**Exemplos do Dia a Dia:**
- **Pilha de pratos:** Último colocado é o primeiro retirado
- **Histórico do navegador:** Botão "voltar" desfaz última ação
- **Ctrl+Z (undo):** Desfaz operações na ordem inversa
- **Chamadas de função:** Função atual termina antes de voltar à anterior

**Aplicações Técnicas:**
- **Verificação de parênteses balanceados**
- **Avaliação de expressões matemáticas**
- **Algoritmos de backtracking**

#### **4.4 Filas (Queues) - FIFO**
**Princípio:** First In, First Out

**Operações Fundamentais:**
- **Enqueue:** Adicionar no final O(1)
- **Dequeue:** Remover do início O(1)
- **Front:** Ver primeiro elemento O(1)

**Código Conceitual:**
```c
typedef struct {
    int dados[1000];
    int inicio, fim;
} Fila;

void enqueue(Fila* f, int valor) {
    f->dados[f->fim] = valor;
    f->fim = (f->fim + 1) % 1000; // Fila circular
}

int dequeue(Fila* f) {
    int valor = f->dados[f->inicio];
    f->inicio = (f->inicio + 1) % 1000;
    return valor;
}
```

**Exemplos do Dia a Dia:**
- **Fila do banco:** Primeiro a chegar é primeiro a ser atendido
- **Impressora:** Documentos impressos na ordem de chegada
- **Fila de processos:** CPU atende processos em ordem
- **Streaming de vídeo:** Frames exibidos em ordem

**Aplicações Técnicas:**
- **Algoritmos de busca (BFS)**
- **Sistemas operacionais (escalonamento)**
- **Redes de computadores (buffers)**

### **📊 5. ESTRUTURAS HIERÁRQUICAS**

#### **5.1 Árvores Binárias**
**Definição:** Cada nó tem no máximo 2 filhos (esquerda e direita).

**Propriedades Matemáticas:**
- **Altura mínima:** ⌊log₂(n)⌋ (árvore completa)
- **Altura máxima:** n-1 (árvore degenerada)
- **Número máximo de nós no nível h:** 2^h
- **Número máximo total com altura h:** 2^(h+1) - 1

**Código Conceitual:**
```c
typedef struct No {
    int dados;
    struct No* esquerda;
    struct No* direita;
} No;

// Altura da árvore - O(n)
int altura(No* raiz) {
    if (!raiz) return -1;
    int alt_esq = altura(raiz->esquerda);
    int alt_dir = altura(raiz->direita);
    return 1 + (alt_esq > alt_dir ? alt_esq : alt_dir);
}

// Contar nós - O(n)
int contar_nos(No* raiz) {
    if (!raiz) return 0;
    return 1 + contar_nos(raiz->esquerda) + contar_nos(raiz->direita);
}
```

**Exemplos do Dia a Dia:**
- **Árvore genealógica:** Pais → filhos
- **Organograma da empresa:** Chefe → subordinados
- **Torneio eliminatório:** Cada confronto elimina metade
- **Sistema de arquivos:** Pastas e subpastas

#### **5.2 Árvore Binária de Busca (BST)**
**Propriedade:** Para todo nó:
- Subárvore esquerda: todos valores < nó
- Subárvore direita: todos valores > nó

**Operações:**
- **Busca:** O(log n) melhor caso, O(n) pior caso
- **Inserção:** O(log n) melhor caso, O(n) pior caso
- **Remoção:** O(log n) melhor caso, O(n) pior caso

**Código Conceitual:**
```c
// Busca em BST
No* buscar_bst(No* raiz, int valor) {
    if (!raiz || raiz->dados == valor)
        return raiz;
    
    if (valor < raiz->dados)
        return buscar_bst(raiz->esquerda, valor);
    else
        return buscar_bst(raiz->direita, valor);
}

// Inserção em BST
No* inserir_bst(No* raiz, int valor) {
    if (!raiz) {
        No* novo = malloc(sizeof(No));
        novo->dados = valor;
        novo->esquerda = novo->direita = NULL;
        return novo;
    }
    
    if (valor < raiz->dados)
        raiz->esquerda = inserir_bst(raiz->esquerda, valor);
    else if (valor > raiz->dados)
        raiz->direita = inserir_bst(raiz->direita, valor);
    
    return raiz;
}
```

**Exemplo Prático - Sistema de Login:**
```
        "maria"
       /       \
   "ana"       "pedro"
   /   \       /     \
"bob" "carlos" "joão" "sofia"
```

- Buscar "joão": maria → pedro → joão (3 comparações)
- Em lista linear: potencialmente 7 comparações

**Aplicações:**
- **Dicionários e índices**
- **Sistemas de banco de dados**
- **Compiladores (tabela de símbolos)**

#### **5.3 Árvores Balanceadas (AVL, Red-Black)**
**Problema das BSTs:** Podem degenerar em lista (O(n))
**Solução:** Manter balanceamento automático

**AVL Trees:**
- **Condição:** |altura(esq) - altura(dir)| ≤ 1 para todo nó
- **Garantia:** Altura sempre O(log n)
- **Rotações:** Rebalanceiam a árvore

**Exemplo do Dia a Dia:**
- **Organograma balanceado:** Evita hierarquias muito profundas
- **Árvore de decisão:** Cada pergunta divide problema pela metade

### **🗂️ 6. ESTRUTURAS DE DISPERSÃO**

#### **6.1 Hash Tables (Tabelas Hash)**
**Princípio:** Mapear chaves para índices usando função hash.

**Função Hash Ideal:**
- **Determinística:** Mesma entrada → mesmo hash
- **Uniforme:** Distribui chaves uniformemente
- **Rápida:** O(1) para calcular

**Código Conceitual:**
```c
#define TABLE_SIZE 1000

typedef struct Entry {
    char chave[50];
    int valor;
    struct Entry* proximo; // Para tratamento de colisões
} Entry;

typedef struct {
    Entry* tabela[TABLE_SIZE];
} HashTable;

// Função hash simples
unsigned int hash(const char* chave) {
    unsigned int hash = 0;
    while (*chave) {
        hash = (hash * 31) + *chave++;
    }
    return hash % TABLE_SIZE;
}

// Inserção - O(1) médio
void inserir(HashTable* ht, const char* chave, int valor) {
    unsigned int indice = hash(chave);
    Entry* nova = malloc(sizeof(Entry));
    strcpy(nova->chave, chave);
    nova->valor = valor;
    nova->proximo = ht->tabela[indice]; // Encadeamento
    ht->tabela[indice] = nova;
}

// Busca - O(1) médio
int* buscar(HashTable* ht, const char* chave) {
    unsigned int indice = hash(chave);
    Entry* atual = ht->tabela[indice];
    
    while (atual) {
        if (strcmp(atual->chave, chave) == 0)
            return &atual->valor;
        atual = atual->proximo;
    }
    return NULL;
}
```

**Tratamento de Colisões:**
1. **Encadeamento (Chaining):** Lista ligada em cada posição
2. **Endereçamento aberto:** Procurar próxima posição livre

**Exemplos do Dia a Dia:**
- **Agenda telefônica:** Nome → número
- **Dicionário:** Palavra → definição
- **Cache do navegador:** URL → página
- **Login:** Username → dados do usuário

**Aplicações:**
- **Banco de dados (índices)**
- **Compiladores (tabela de símbolos)**
- **Sistemas operacionais (tabela de processos)**

---

## 🔄 PARTE III: ALGORITMOS FUNDAMENTAIS

### **🔀 7. ALGORITMOS DE ORDENAÇÃO**

#### **7.1 Algoritmos Simples O(n²)**

**Bubble Sort:**
```c
void bubble_sort(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        int trocou = 0;
        for (int j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                trocar(&arr[j], &arr[j+1]);
                trocou = 1;
            }
        }
        if (!trocou) break; // Otimização: já ordenado
    }
}
```

**Características:**
- **Estável:** Não altera ordem de elementos iguais
- **In-place:** O(1) espaço extra
- **Melhor caso:** O(n) com otimização

**Exemplo do Dia a Dia:** Organizar cartas comparando adjacentes.

**Selection Sort:**
```c
void selection_sort(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        int min_idx = i;
        for (int j = i+1; j < n; j++) {
            if (arr[j] < arr[min_idx])
                min_idx = j;
        }
        trocar(&arr[i], &arr[min_idx]);
    }
}
```

**Características:**
- **Não estável:** Pode alterar ordem de elementos iguais
- **In-place:** O(1) espaço extra
- **Invariante:** Sempre O(n²) comparações

**Exemplo do Dia a Dia:** Escolher o menor repetidamente.

**Insertion Sort:**
```c
void insertion_sort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int chave = arr[i];
        int j = i - 1;
        
        while (j >= 0 && arr[j] > chave) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = chave;
    }
}
```

**Características:**
- **Estável:** Mantém ordem de elementos iguais
- **In-place:** O(1) espaço extra
- **Adaptativo:** O(n) para arrays quase ordenados

**Exemplo do Dia a Dia:** Organizar cartas conforme recebe.

#### **7.2 Algoritmos Eficientes O(n log n)**

**Merge Sort:**
```c
void merge_sort(int arr[], int esq, int dir) {
    if (esq < dir) {
        int meio = esq + (dir - esq) / 2;
        
        merge_sort(arr, esq, meio);
        merge_sort(arr, meio + 1, dir);
        merge(arr, esq, meio, dir);
    }
}

void merge(int arr[], int esq, int meio, int dir) {
    // Criar arrays temporários
    int n1 = meio - esq + 1;
    int n2 = dir - meio;
    int L[n1], R[n2];
    
    // Copiar dados
    for (int i = 0; i < n1; i++) L[i] = arr[esq + i];
    for (int j = 0; j < n2; j++) R[j] = arr[meio + 1 + j];
    
    // Mergear arrays ordenados
    int i = 0, j = 0, k = esq;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j])
            arr[k++] = L[i++];
        else
            arr[k++] = R[j++];
    }
    
    // Copiar elementos restantes
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}
```

**Características:**
- **Estável:** Mantém ordem de elementos iguais
- **Garantido:** Sempre O(n log n)
- **Espaço:** O(n) extra

**Exemplo do Dia a Dia:** Juntar duas filas ordenadas em uma fila maior ordenada.

**Quick Sort:**
```c
void quick_sort(int arr[], int baixo, int alto) {
    if (baixo < alto) {
        int pi = particionar(arr, baixo, alto);
        
        quick_sort(arr, baixo, pi - 1);
        quick_sort(arr, pi + 1, alto);
    }
}

int particionar(int arr[], int baixo, int alto) {
    int pivo = arr[alto]; // Último elemento como pivô
    int i = baixo - 1;
    
    for (int j = baixo; j < alto; j++) {
        if (arr[j] < pivo) {
            i++;
            trocar(&arr[i], &arr[j]);
        }
    }
    trocar(&arr[i + 1], &arr[alto]);
    return i + 1;
}
```

**Características:**
- **Não estável:** Pode alterar ordem de elementos iguais
- **In-place:** O(log n) espaço (pilha de recursão)
- **Médio:** O(n log n), **Pior:** O(n²)

**Exemplo do Dia a Dia:** Organizar biblioteca separando livros pelo autor do meio.

#### **7.3 Algoritmos Especiais**

**Counting Sort (não comparativo):**
```c
void counting_sort(int arr[], int n, int max_val) {
    int count[max_val + 1] = {0};
    
    // Contar frequências
    for (int i = 0; i < n; i++)
        count[arr[i]]++;
    
    // Reconstruir array ordenado
    int idx = 0;
    for (int i = 0; i <= max_val; i++) {
        while (count[i]-- > 0)
            arr[idx++] = i;
    }
}
```

**Complexidade:** O(n + k) onde k é o range dos valores
**Quando usar:** Valores inteiros em range pequeno

**Exemplo do Dia a Dia:** Organizar notas de 0 a 10 contando quantos alunos tiraram cada nota.

### **🔍 8. ALGORITMOS DE BUSCA**

#### **8.1 Busca Linear**
```c
int busca_linear(int arr[], int n, int valor) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == valor)
            return i;
    }
    return -1;
}
```

**Complexidade:** O(n)
**Vantagem:** Funciona em arrays não ordenados
**Exemplo do Dia a Dia:** Procurar uma pessoa em uma fila

#### **8.2 Busca Binária**
```c
int busca_binaria(int arr[], int n, int valor) {
    int esq = 0, dir = n - 1;
    
    while (esq <= dir) {
        int meio = esq + (dir - esq) / 2;
        
        if (arr[meio] == valor)
            return meio;
        else if (arr[meio] < valor)
            esq = meio + 1;
        else
            dir = meio - 1;
    }
    return -1;
}
```

**Complexidade:** O(log n)
**Pré-requisito:** Array deve estar ordenado
**Exemplo do Dia a Dia:** Procurar palavra no dicionário abrindo no meio

#### **8.3 Busca Interpolada**
```c
int busca_interpolada(int arr[], int n, int valor) {
    int esq = 0, dir = n - 1;
    
    while (esq <= dir && valor >= arr[esq] && valor <= arr[dir]) {
        // Estimativa inteligente da posição
        int pos = esq + ((valor - arr[esq]) * (dir - esq)) / (arr[dir] - arr[esq]);
        
        if (arr[pos] == valor)
            return pos;
        else if (arr[pos] < valor)
            esq = pos + 1;
        else
            dir = pos - 1;
    }
    return -1;
}
```

**Complexidade:** O(log log n) para dados uniformemente distribuídos
**Exemplo do Dia a Dia:** Procurar página 500 em livro de 1000 páginas abrindo em ~50%

### **🌐 9. ALGORITMOS EM GRAFOS**

#### **9.1 Conceitos Básicos**
**Grafo:** G = (V, E) onde V são vértices e E são arestas

**Representações:**
1. **Matriz de Adjacência:** O(V²) espaço, O(1) para verificar aresta
2. **Lista de Adjacência:** O(V + E) espaço, O(grau) para verificar aresta

**Código - Lista de Adjacência:**
```c
typedef struct No {
    int vertice;
    int peso;
    struct No* proximo;
} No;

typedef struct {
    No** adj;  // Array de listas
    int num_vertices;
} Grafo;

void adicionar_aresta(Grafo* g, int origem, int destino, int peso) {
    No* novo = malloc(sizeof(No));
    novo->vertice = destino;
    novo->peso = peso;
    novo->proximo = g->adj[origem];
    g->adj[origem] = novo;
}
```

#### **9.2 Busca em Profundidade (DFS)**
```c
void dfs(Grafo* g, int v, int visitado[]) {
    visitado[v] = 1;
    printf("%d ", v);
    
    No* adj = g->adj[v];
    while (adj) {
        if (!visitado[adj->vertice])
            dfs(g, adj->vertice, visitado);
        adj = adj->proximo;
    }
}
```

**Complexidade:** O(V + E)
**Aplicações:**
- Detecção de ciclos
- Componentes conectados
- Ordenação topológica

**Exemplo do Dia a Dia:** Explorar labirinto indo o mais fundo possível antes de voltar

#### **9.3 Busca em Largura (BFS)**
```c
void bfs(Grafo* g, int inicio) {
    int visitado[g->num_vertices] = {0};
    Fila fila;
    init_fila(&fila);
    
    visitado[inicio] = 1;
    enqueue(&fila, inicio);
    
    while (!fila_vazia(&fila)) {
        int v = dequeue(&fila);
        printf("%d ", v);
        
        No* adj = g->adj[v];
        while (adj) {
            if (!visitado[adj->vertice]) {
                visitado[adj->vertice] = 1;
                enqueue(&fila, adj->vertice);
            }
            adj = adj->proximo;
        }
    }
}
```

**Complexidade:** O(V + E)
**Aplicações:**
- Menor caminho (grafos não ponderados)
- Árvore geradora mínima
- Teste de bipartição

**Exemplo do Dia a Dia:** Explorar vizinhança visitando todas as casas da mesma rua antes de mudar de rua

#### **9.4 Algoritmo de Dijkstra (Menor Caminho)**
```c
#define INFINITO 999999

void dijkstra(Grafo* g, int origem) {
    int dist[g->num_vertices];
    int visitado[g->num_vertices] = {0};
    
    // Inicializar distâncias
    for (int i = 0; i < g->num_vertices; i++)
        dist[i] = INFINITO;
    dist[origem] = 0;
    
    for (int count = 0; count < g->num_vertices - 1; count++) {
        int u = min_distancia(dist, visitado, g->num_vertices);
        visitado[u] = 1;
        
        No* adj = g->adj[u];
        while (adj) {
            int v = adj->vertice;
            if (!visitado[v] && dist[u] + adj->peso < dist[v])
                dist[v] = dist[u] + adj->peso;
            adj = adj->proximo;
        }
    }
}
```

**Complexidade:** O(V²) ou O((V + E) log V) com heap
**Aplicação:** GPS, roteamento de redes

**Exemplo do Dia a Dia:** Encontrar caminho mais rápido entre duas cidades considerando trânsito

---

## 💡 PARTE IV: CONCEITOS PRÁTICOS E APLICAÇÕES

### **🛠️ 10. TÉCNICAS DE IMPLEMENTAÇÃO**

#### **10.1 Gerenciamento de Memória em C**

**Alocação Estática:**
```c
int array[1000];        // Stack - liberada automaticamente
static int global[1000]; // Segmento de dados - vida do programa
```

**Alocação Dinâmica:**
```c
// Malloc - alocar memória
int* ptr = malloc(n * sizeof(int));
if (ptr == NULL) {
    fprintf(stderr, "Erro de alocação!\n");
    exit(1);
}

// Realloc - redimensionar
ptr = realloc(ptr, 2 * n * sizeof(int));

// Free - liberar memória
free(ptr);
ptr = NULL; // Boa prática
```

**Exemplo Prático - Array Dinâmico:**
```c
typedef struct {
    int* dados;
    int tamanho;
    int capacidade;
} ArrayDinamico;

void redimensionar(ArrayDinamico* arr) {
    arr->capacidade *= 2;
    arr->dados = realloc(arr->dados, arr->capacidade * sizeof(int));
}
```

#### **10.2 Ponteiros e Referências**

**Ponteiros Simples:**
```c
int x = 10;
int* p = &x;    // p aponta para x
*p = 20;        // x agora vale 20
```

**Ponteiros para Estruturas:**
```c
typedef struct {
    int x, y;
} Ponto;

Ponto p1 = {3, 4};
Ponto* ptr = &p1;
ptr->x = 5;     // Equivale a (*ptr).x = 5
```

**Ponteiros para Ponteiros:**
```c
int x = 10;
int* p = &x;
int** pp = &p;
**pp = 30;      // x agora vale 30
```

**Exemplo Prático - Lista Ligada:**
```c
void inserir_ordenado(No** cabeca, int valor) {
    No* novo = malloc(sizeof(No));
    novo->dados = valor;
    
    if (!*cabeca || (*cabeca)->dados > valor) {
        novo->proximo = *cabeca;
        *cabeca = novo;
        return;
    }
    
    No* atual = *cabeca;
    while (atual->proximo && atual->proximo->dados < valor) {
        atual = atual->proximo;
    }
    novo->proximo = atual->proximo;
    atual->proximo = novo;
}
```

#### **10.3 Recursão vs Iteração**

**Fibonacci Recursivo:**
```c
int fib_recursivo(int n) {
    if (n <= 1) return n;
    return fib_recursivo(n-1) + fib_recursivo(n-2);
}
// Complexidade: O(2^n) - muito ineficiente!
```

**Fibonacci Iterativo:**
```c
int fib_iterativo(int n) {
    if (n <= 1) return n;
    int a = 0, b = 1, c;
    for (int i = 2; i <= n; i++) {
        c = a + b;
        a = b;
        b = c;
    }
    return b;
}
// Complexidade: O(n) - muito melhor!
```

**Quando Usar Recursão:**
- ✅ Problema naturalmente recursivo (árvores, grafos)
- ✅ Código mais limpo e legível
- ❌ Cuidado com stack overflow
- ❌ Pode ser menos eficiente

### **🔧 11. TÉCNICAS DE OTIMIZAÇÃO**

#### **11.1 Memoização (Programação Dinâmica)**
```c
#define MAX_N 1000
int memo[MAX_N];

int fib_memo(int n) {
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n]; // Já calculado
    
    memo[n] = fib_memo(n-1) + fib_memo(n-2);
    return memo[n];
}

// Inicializar: for(int i = 0; i < MAX_N; i++) memo[i] = -1;
```

**Princípio:** Armazenar resultados de subproblemas para evitar recálculo

**Exemplo do Dia a Dia:** Anotar resultados de contas complicadas para não refazer

#### **11.2 Cache Locality**
```c
// Ruim para cache - acesso por coluna
for (int j = 0; j < N; j++) {
    for (int i = 0; i < N; i++) {
        matriz[i][j] = 0;
    }
}

// Bom para cache - acesso por linha
for (int i = 0; i < N; i++) {
    for (int j = 0; j < N; j++) {
        matriz[i][j] = 0;
    }
}
```

**Princípio:** Acessar dados que estão próximos na memória

#### **11.3 Escolha do Algoritmo por Contexto**
```c
void ordenar_inteligente(int arr[], int n) {
    if (n < 20) {
        insertion_sort(arr, n);     // Melhor para n pequeno
    } else if (verificar_quase_ordenado(arr, n)) {
        insertion_sort(arr, n);     // O(n) para quase ordenado
    } else {
        quick_sort(arr, 0, n-1);    // Melhor para n grande
    }
}
```

### **🎯 12. DEBUGGING E ANÁLISE**

#### **12.1 Instrumentação de Código**
```c
typedef struct {
    long long comparacoes;
    long long trocas;
    double tempo_execucao;
} Estatisticas;

void bubble_sort_instrumentado(int arr[], int n, Estatisticas* stats) {
    clock_t inicio = clock();
    stats->comparacoes = stats->trocas = 0;
    
    for (int i = 0; i < n-1; i++) {
        for (int j = 0; j < n-i-1; j++) {
            stats->comparacoes++;
            if (arr[j] > arr[j+1]) {
                trocar(&arr[j], &arr[j+1]);
                stats->trocas++;
            }
        }
    }
    
    clock_t fim = clock();
    stats->tempo_execucao = ((double)(fim - inicio)) / CLOCKS_PER_SEC;
}
```

#### **12.2 Testes de Unidade**
```c
void testar_busca_binaria() {
    int arr[] = {1, 3, 5, 7, 9, 11, 13};
    int n = 7;
    
    // Teste: elemento existe
    assert(busca_binaria(arr, n, 7) == 3);
    
    // Teste: elemento não existe
    assert(busca_binaria(arr, n, 6) == -1);
    
    // Teste: primeiro elemento
    assert(busca_binaria(arr, n, 1) == 0);
    
    // Teste: último elemento
    assert(busca_binaria(arr, n, 13) == 6);
    
    printf("Todos os testes de busca binária passaram!\n");
}
```

#### **12.3 Validação de Entrada**
```c
int buscar_seguro(int arr[], int n, int valor) {
    // Validar parâmetros
    if (arr == NULL) {
        fprintf(stderr, "Erro: Array é NULL\n");
        return -2; // Código de erro específico
    }
    
    if (n <= 0) {
        fprintf(stderr, "Erro: Tamanho inválido: %d\n", n);
        return -2;
    }
    
    // Implementação normal
    for (int i = 0; i < n; i++) {
        if (arr[i] == valor)
            return i;
    }
    return -1; // Não encontrado
}
```

---

## 🏆 PARTE V: APLICAÇÕES DO MUNDO REAL

### **📱 13. APLICAÇÕES EM TECNOLOGIA**

#### **13.1 Sistemas de Busca (Google, Bing)**
**Problemas:**
- Indexar bilhões de páginas web
- Responder consultas em milissegundos
- Ranquear resultados por relevância

**Estruturas de Dados Utilizadas:**
- **Trie:** Para autocompletar buscas
- **Hash Tables:** Indexação de palavras
- **Grafos:** Algoritmo PageRank para relevância
- **Heaps:** Manter top-k resultados

**Exemplo Simplificado - Índice Invertido:**
```c
typedef struct {
    char palavra[50];
    ListaLigada* documentos; // IDs dos documentos que contêm a palavra
} EntradaIndice;

HashTable indice_invertido;

// Buscar documentos que contêm uma palavra
ListaLigada* buscar_palavra(const char* palavra) {
    EntradaIndice* entrada = buscar_hash(&indice_invertido, palavra);
    return entrada ? entrada->documentos : NULL;
}
```

#### **13.2 Redes Sociais (Facebook, Instagram)**
**Problemas:**
- Encontrar amigos em comum
- Sugerir conexões
- Feed de notícias em tempo real
- Detectar comunidades

**Estruturas de Dados Utilizadas:**
- **Grafos:** Rede de amizades
- **Filas de Prioridade:** Timeline ordenada por relevância
- **Cache LRU:** Páginas acessadas recentemente
- **Hash Tables:** Busca rápida de usuários

**Exemplo - Sugestão de Amigos:**
```c
// Encontrar amigos em comum entre user1 e user2
ListaLigada* amigos_em_comum(Grafo* rede_social, int user1, int user2) {
    ListaLigada* amigos1 = obter_amigos(rede_social, user1);
    ListaLigada* amigos2 = obter_amigos(rede_social, user2);
    ListaLigada* comuns = criar_lista();
    
    No* atual1 = amigos1->cabeca;
    while (atual1) {
        if (buscar_lista(amigos2, atual1->dados)) {
            inserir_lista(comuns, atual1->dados);
        }
        atual1 = atual1->proximo;
    }
    
    return comuns;
}
```

#### **13.3 Sistemas de Navegação (GPS)**
**Problemas:**
- Encontrar menor caminho entre dois pontos
- Considerar trânsito em tempo real
- Recalcular rota dinamicamente

**Algoritmos Utilizados:**
- **Dijkstra:** Menor caminho básico
- **A*:** Dijkstra com heurística (mais eficiente)
- **Contraction Hierarchies:** Pré-processamento para consultas rápidas

**Exemplo - A* Algorithm:**
```c
typedef struct {
    int vertice;
    double g_score; // Distância real da origem
    double f_score; // g_score + heurística
} NoA;

double heuristica_euclidiana(Coordenada a, Coordenada b) {
    double dx = a.x - b.x;
    double dy = a.y - b.y;
    return sqrt(dx*dx + dy*dy);
}

ListaLigada* a_star(Grafo* mapa, int origem, int destino) {
    FilaPrioridade aberta;
    Conjunto fechada;
    
    NoA inicio = {origem, 0, heuristica_euclidiana(obter_coord(origem), obter_coord(destino))};
    inserir_fila_prioridade(&aberta, inicio);
    
    while (!vazia(&aberta)) {
        NoA atual = extrair_min(&aberta);
        
        if (atual.vertice == destino) {
            return reconstruir_caminho(origem, destino);
        }
        
        adicionar_conjunto(&fechada, atual.vertice);
        
        // Explorar vizinhos...
    }
    
    return NULL; // Caminho não encontrado
}
```

### **🏪 14. APLICAÇÕES EM E-COMMERCE**

#### **14.1 Sistema de Recomendação**
**Problema:** Sugerir produtos relevantes para cada usuário

**Técnicas:**
- **Filtragem Colaborativa:** "Usuários similares compraram..."
- **Filtragem por Conteúdo:** "Produtos similares..."
- **Sistemas Híbridos:** Combinação de ambas

**Exemplo - Filtragem Colaborativa Simples:**
```c
typedef struct {
    int usuario_id;
    int produto_id;
    float avaliacao;
} Avaliacao;

// Encontrar usuários similares
float similaridade_coseno(int user1, int user2, Avaliacao avaliacoes[], int n) {
    float produto_escalar = 0;
    float norma1 = 0, norma2 = 0;
    
    for (int i = 0; i < n; i++) {
        if (avaliacoes[i].usuario_id == user1) {
            for (int j = 0; j < n; j++) {
                if (avaliacoes[j].usuario_id == user2 && 
                    avaliacoes[j].produto_id == avaliacoes[i].produto_id) {
                    produto_escalar += avaliacoes[i].avaliacao * avaliacoes[j].avaliacao;
                    break;
                }
            }
            norma1 += avaliacoes[i].avaliacao * avaliacoes[i].avaliacao;
        }
        if (avaliacoes[i].usuario_id == user2) {
            norma2 += avaliacoes[i].avaliacao * avaliacoes[i].avaliacao;
        }
    }
    
    return produto_escalar / (sqrt(norma1) * sqrt(norma2));
}
```

#### **14.2 Controle de Estoque**
**Problema:** Gerenciar milhões de produtos em tempo real

**Estruturas de Dados:**
- **Hash Tables:** Busca rápida de produtos por ID
- **Árvores B+:** Índices de banco de dados
- **Heaps:** Produtos com estoque baixo (prioridade)

**Exemplo - Sistema de Alerta de Estoque:**
```c
typedef struct {
    int produto_id;
    int quantidade;
    int estoque_minimo;
} Produto;

typedef struct {
    Produto produto;
    int prioridade; // Baseado em popularidade, margem, etc.
} ItemEstoqueBaixo;

MinHeap alerta_estoque;

void verificar_estoque(Produto produto) {
    if (produto.quantidade <= produto.estoque_minimo) {
        ItemEstoqueBaixo item = {produto, calcular_prioridade(produto)};
        inserir_heap(&alerta_estoque, item);
        
        // Notificar sistema de compras
        notificar_reposicao(produto.produto_id);
    }
}
```

### **🏦 15. APLICAÇÕES EM SISTEMAS FINANCEIROS**

#### **15.1 Sistemas de Trading (Bolsa de Valores)**
**Problemas:**
- Executar milhões de operações por segundo
- Manter order book em tempo real
- Garantir fairness (FIFO para mesmos preços)

**Estruturas de Dados:**
- **Heaps:** Order book (compra/venda)
- **Hash Tables:** Busca rápida de ordens
- **Filas:** FIFO para mesmos preços

**Exemplo - Order Book Simplificado:**
```c
typedef struct {
    int ordem_id;
    double preco;
    int quantidade;
    time_t timestamp;
} Ordem;

typedef struct {
    MaxHeap compras;    // Preços maiores têm prioridade
    MinHeap vendas;     // Preços menores têm prioridade
    HashTable ordens_ativas;
} OrderBook;

void processar_ordem_compra(OrderBook* book, Ordem ordem) {
    // Verificar se há vendas compatíveis
    while (!vazio(&book->vendas) && 
           peek_min(&book->vendas).preco <= ordem.preco &&
           ordem.quantidade > 0) {
        
        Ordem venda = extrair_min(&book->vendas);
        int quantidade_executada = min(ordem.quantidade, venda.quantidade);
        
        // Executar transação
        executar_transacao(ordem, venda, quantidade_executada);
        
        ordem.quantidade -= quantidade_executada;
        venda.quantidade -= quantidade_executada;
        
        if (venda.quantidade > 0) {
            inserir_heap(&book->vendas, venda);
        }
    }
    
    // Se sobrou quantidade, adicionar ao book
    if (ordem.quantidade > 0) {
        inserir_heap(&book->compras, ordem);
        inserir_hash(&book->ordens_ativas, ordem.ordem_id, ordem);
    }
}
```

#### **15.2 Detecção de Fraude**
**Problema:** Identificar transações suspeitas em tempo real

**Técnicas:**
- **Análise de Grafos:** Detectar padrões suspeitos de transferências
- **Machine Learning:** Classificar transações
- **Time Series:** Detectar comportamentos anômalos

**Exemplo - Sistema de Score de Risco:**
```c
typedef struct {
    int conta_origem;
    int conta_destino;
    double valor;
    time_t timestamp;
    char pais_origem[3];
    char pais_destino[3];
} Transacao;

double calcular_score_risco(Transacao t, HistoricoTransacoes* historico) {
    double score = 0.0;
    
    // Valor muito alto
    if (t.valor > 10000) score += 3.0;
    
    // Horário suspeito (madrugada)
    struct tm* tm_info = localtime(&t.timestamp);
    if (tm_info->tm_hour >= 2 && tm_info->tm_hour <= 5) score += 2.0;
    
    // Países diferentes
    if (strcmp(t.pais_origem, t.pais_destino) != 0) score += 1.5;
    
    // Múltiplas transações em pouco tempo
    int transacoes_recentes = contar_transacoes_ultimas_horas(historico, t.conta_origem, 1);
    if (transacoes_recentes > 5) score += 2.0;
    
    // Primeiro relacionamento entre contas
    if (!existe_relacionamento_anterior(historico, t.conta_origem, t.conta_destino)) {
        score += 1.0;
    }
    
    return score;
}

int analisar_transacao(Transacao t) {
    double score = calcular_score_risco(t, &historico_global);
    
    if (score >= 5.0) {
        return BLOQUEAR_TRANSACAO;
    } else if (score >= 3.0) {
        return REQUERER_AUTENTICACAO_ADICIONAL;
    } else {
        return APROVAR_TRANSACAO;
    }
}
```

---

## 📊 RESUMO EXECUTIVO - GUIA RÁPIDO

### **🎯 Escolha Rápida de Estruturas de Dados**

| Operação Principal | Melhor Estrutura | Complexidade | Quando Usar |
|-------------------|------------------|--------------|-------------|
| **Acesso por índice** | Array | O(1) | Dados de tamanho fixo |
| **Inserção frequente no início** | Lista Ligada | O(1) | Tamanho variável |
| **Busca frequente** | Hash Table | O(1) médio | Chave-valor rápido |
| **Dados sempre ordenados** | BST | O(log n) | Busca e inserção ordenada |
| **LIFO (desfazer ações)** | Pilha | O(1) | Histórico, navegador |
| **FIFO (fila de espera)** | Fila | O(1) | Processos, impressão |
| **Prioridades** | Heap | O(log n) | Agendamento, Dijkstra |

### **⚡ Escolha Rápida de Algoritmos de Ordenação**

| Situação | Melhor Algoritmo | Complexidade | Motivo |
|----------|------------------|--------------|--------|
| **n < 50** | Insertion Sort | O(n²) | Overhead baixo |
| **Array quase ordenado** | Insertion Sort | O(n) | Adaptativo |
| **Estabilidade importante** | Merge Sort | O(n log n) | Sempre estável |
| **Uso geral** | Quick Sort | O(n log n) médio | Rápido in-place |
| **Garantia O(n log n)** | Heap Sort | O(n log n) | Sempre O(n log n) |
| **Inteiros range pequeno** | Counting Sort | O(n + k) | Não comparativo |

### **🔍 Escolha Rápida de Algoritmos de Busca**

| Dados | Algoritmo | Complexidade | Pré-requisito |
|-------|-----------|--------------|---------------|
| **Não ordenados** | Busca Linear | O(n) | Nenhum |
| **Ordenados** | Busca Binária | O(log n) | Array ordenado |
| **Distribuição uniforme** | Busca Interpolada | O(log log n) | Array ordenado uniformemente |
| **Chave-valor** | Hash Table | O(1) médio | Função hash boa |

### **💡 Dicas de Otimização Rápida**

1. **Para loops aninhados:** Verifique se pode quebrar cedo
2. **Para recursão:** Considere memoização ou versão iterativa
3. **Para ordenação:** Use algoritmo híbrido baseado no tamanho
4. **Para busca:** Use estrutura adequada aos padrões de acesso
5. **Para memória:** Prefira alocação local quando possível

### **⚠️ Armadilhas Comuns**

1. **Overflow em multiplicações:** Use long long ou verificação
2. **Ponteiros NULL:** Sempre validar antes de usar
3. **Memory leaks:** Todo malloc precisa de free correspondente
4. **Array bounds:** Verificar índices antes de acessar
5. **Comparison instável:** Cuidado com float equality

---

## 🎓 CONCEITOS PARA ENTREVISTAS

### **📝 Perguntas Frequentes**

**1. "Explique Big O Notation"**
- Foca no crescimento assintótico
- Ignora constantes e termos menores
- Exemplo: 3n² + 2n + 1 = O(n²)

**2. "Array vs Lista Ligada"**
- Array: acesso O(1), inserção O(n)
- Lista: acesso O(n), inserção O(1)
- Cache locality favorece arrays

**3. "Como implementar Hash Table?"**
- Função hash + tratamento de colisões
- Chaining ou open addressing
- Load factor < 0.75 para performance

**4. "Detectar ciclo em lista ligada"**
- Algoritmo de Floyd (tortoise and hare)
- Dois ponteiros: lento e rápido
- Se encontram = há ciclo

**5. "Inverter string recursivamente"**
```c
void inverter(char* str, int inicio, int fim) {
    if (inicio >= fim) return;
    trocar(&str[inicio], &str[fim]);
    inverter(str, inicio + 1, fim - 1);
}
```

### **🧠 Problemas Clássicos**

**1. Duas Somas (Two Sum)**
```c
int* dois_soma(int nums[], int n, int target) {
    HashTable ht;
    for (int i = 0; i < n; i++) {
        int complemento = target - nums[i];
        int* indice = buscar_hash(&ht, complemento);
        if (indice) {
            int* resultado = malloc(2 * sizeof(int));
            resultado[0] = *indice;
            resultado[1] = i;
            return resultado;
        }
        inserir_hash(&ht, nums[i], i);
    }
    return NULL;
}
```

**2. Validar Parênteses**
```c
int parenteses_validos(char* s) {
    Pilha pilha;
    init_pilha(&pilha);
    
    for (int i = 0; s[i]; i++) {
        if (s[i] == '(' || s[i] == '[' || s[i] == '{') {
            push(&pilha, s[i]);
        } else {
            if (vazia(&pilha)) return 0;
            char topo = pop(&pilha);
            if ((s[i] == ')' && topo != '(') ||
                (s[i] == ']' && topo != '[') ||
                (s[i] == '}' && topo != '{')) {
                return 0;
            }
        }
    }
    return vazia(&pilha);
}
```

**3. Merge de Duas Listas Ordenadas**
```c
No* merge_listas(No* l1, No* l2) {
    No dummy = {0, NULL};
    No* atual = &dummy;
    
    while (l1 && l2) {
        if (l1->dados <= l2->dados) {
            atual->proximo = l1;
            l1 = l1->proximo;
        } else {
            atual->proximo = l2;
            l2 = l2->proximo;
        }
        atual = atual->proximo;
    }
    
    atual->proximo = l1 ? l1 : l2;
    return dummy.proximo;
}
```

---

## 📚 REFERENCIAS E PRÓXIMOS PASSOS

### **📖 Bibliografia Recomendada**
1. **Cormen, Leiserson, Rivest, Stein** - "Introduction to Algorithms"
2. **Robert Sedgewick** - "Algorithms in C"
3. **Steven Skiena** - "The Algorithm Design Manual"
4. **Jon Bentley** - "Programming Pearls"

### **🌐 Recursos Online**
1. **LeetCode** - Problemas práticos
2. **HackerRank** - Challenges algorítmicos
3. **Coursera/edX** - Cursos de universidades
4. **GitHub** - Implementações open source

### **💻 Próximos Tópicos para Estudo**
1. **Programação Dinâmica Avançada**
2. **Algoritmos de Grafos (Fluxo Máximo, etc.)**
3. **Algoritmos Aproximados**
4. **Estruturas de Dados Avançadas (Segment Trees, etc.)**
5. **Análise Amortizada Detalhada**

---

**📚 Esta lista completa de conceitos serve como referência abrangente para algoritmos e estruturas de dados, cobrindo teoria, prática e aplicações do mundo real.**

*Última atualização: 27 de agosto de 2025*
