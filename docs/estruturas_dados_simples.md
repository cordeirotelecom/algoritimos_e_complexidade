# 📚 Estruturas de Dados: Homogêneas, Heterogêneas e Ponteiros
## Guia Simples e Didático com Análise de Complexidade

---

## 🎯 CONCEITOS FUNDAMENTAIS

### **📐 O que são Estruturas de Dados?**

**Definição Simples:**
> Estruturas de dados são formas organizadas de armazenar e acessar informações na memória do computador.

**Analogia do Dia a Dia:**
- **Gaveta de roupas** = Array (tudo do mesmo tipo)
- **Mochila escolar** = Struct (coisas diferentes juntas)
- **Endereço da casa** = Ponteiro (indica onde algo está)

---

## 🔢 ESTRUTURAS HOMOGÊNEAS (Arrays)

### **📊 Conceito: Todos os elementos são do mesmo tipo**

**Exemplo Visual:**
```
Array de inteiros: [10][20][30][40][50]
                    ↑   ↑   ↑   ↑   ↑
Posições:           0   1   2   3   4
```

### **💻 Implementação Simples em C**

```c
#include <stdio.h>
#include <time.h>

// Declaração simples
int numeros[5];  // Complexidade: O(1) - alocação estática

// Função para preencher array
void preencher_array(int arr[], int tamanho) {
    printf("Preenchendo array...\n");
    
    for (int i = 0; i < tamanho; i++) {        // O(n) - loop executa n vezes
        arr[i] = (i + 1) * 10;                 // O(1) - atribuição direta
        printf("arr[%d] = %d\n", i, arr[i]);  // O(1) - impressão
    }
    // Complexidade total: O(n)
}

// Função para buscar elemento
int buscar_elemento(int arr[], int tamanho, int valor) {
    printf("Buscando %d no array...\n", valor);
    
    for (int i = 0; i < tamanho; i++) {        // O(n) - pior caso: percorre tudo
        if (arr[i] == valor) {                 // O(1) - comparação simples
            printf("Encontrado na posição %d\n", i);
            return i;                          // O(1) - retorno
        }
    }
    printf("Valor não encontrado\n");
    return -1;                                 // O(1) - retorno
    // Complexidade total: O(n) - busca linear
}

// Acesso direto por índice
int acessar_posicao(int arr[], int indice) {
    return arr[indice];  // O(1) - acesso direto pela fórmula: base + índice × tamanho_tipo
}
```

### **📊 Análise de Complexidade - Array**

| Operação | Complexidade | Explicação |
|----------|--------------|------------|
| **Acesso arr[i]** | O(1) | Cálculo direto: endereço_base + i × sizeof(int) |
| **Busca linear** | O(n) | Precisa verificar cada elemento até encontrar |
| **Inserção no final** | O(1) | Apenas adiciona na próxima posição livre |
| **Inserção no meio** | O(n) | Precisa mover todos elementos à direita |
| **Remoção** | O(n) | Precisa mover elementos para preencher buraco |

### **🔍 Exemplo Prático com Medição**

```c
int exemplo_array_simples() {
    int numeros[5];
    
    // Preencher - O(n)
    clock_t inicio = clock();
    preencher_array(numeros, 5);
    clock_t fim = clock();
    
    printf("Tempo para preencher: %.6f segundos\n", 
           ((double)(fim - inicio)) / CLOCKS_PER_SEC);
    
    // Acesso direto - O(1)
    inicio = clock();
    int valor = acessar_posicao(numeros, 2);  // Pega elemento na posição 2
    fim = clock();
    
    printf("numeros[2] = %d\n", valor);
    printf("Tempo para acessar: %.6f segundos\n", 
           ((double)(fim - inicio)) / CLOCKS_PER_SEC);
    
    // Busca - O(n)
    inicio = clock();
    int posicao = buscar_elemento(numeros, 5, 30);
    fim = clock();
    
    printf("Tempo para buscar: %.6f segundos\n", 
           ((double)(fim - inicio)) / CLOCKS_PER_SEC);
    
    return 0;
}
```

---

## 🎭 ESTRUTURAS HETEROGÊNEAS (Structs)

### **📊 Conceito: Elementos de tipos diferentes agrupados**

**Analogia:** Como uma ficha de cadastro que tem nome (texto), idade (número), altura (decimal)

### **💻 Implementação Simples em C**

```c
// Definição da estrutura
typedef struct {
    char nome[50];     // Array de caracteres
    int idade;         // Inteiro
    float altura;      // Número decimal
    char sexo;         // Caractere único
} Pessoa;

// Função para criar uma pessoa
Pessoa criar_pessoa(char* nome, int idade, float altura, char sexo) {
    Pessoa p;                              // O(1) - aloca espaço na stack
    
    strcpy(p.nome, nome);                  // O(n) - copia string, onde n = tamanho do nome
    p.idade = idade;                       // O(1) - atribuição direta
    p.altura = altura;                     // O(1) - atribuição direta  
    p.sexo = sexo;                         // O(1) - atribuição direta
    
    return p;                              // O(1) - retorna cópia da estrutura
    // Complexidade total: O(n) devido ao strcpy
}

// Função para imprimir dados
void imprimir_pessoa(Pessoa p) {
    printf("=== DADOS DA PESSOA ===\n");              // O(1)
    printf("Nome: %s\n", p.nome);                     // O(1) - acesso direto ao campo
    printf("Idade: %d anos\n", p.idade);              // O(1) - acesso direto
    printf("Altura: %.2f m\n", p.altura);             // O(1) - acesso direto
    printf("Sexo: %c\n", p.sexo);                     // O(1) - acesso direto
    // Complexidade total: O(1) - todos acessos diretos
}

// Comparar duas pessoas
int pessoas_iguais(Pessoa p1, Pessoa p2) {
    // Cada comparação é O(1), exceto strcmp que é O(n)
    if (strcmp(p1.nome, p2.nome) != 0) return 0;      // O(n) - compara strings
    if (p1.idade != p2.idade) return 0;               // O(1)
    if (p1.altura != p2.altura) return 0;             // O(1)
    if (p1.sexo != p2.sexo) return 0;                 // O(1)
    
    return 1;  // São iguais                          // O(1)
    // Complexidade total: O(n) devido ao strcmp
}
```

### **📊 Análise de Complexidade - Struct**

| Operação | Complexidade | Explicação |
|----------|--------------|------------|
| **Acesso p.campo** | O(1) | Offset fixo: endereço_base + deslocamento_campo |
| **Atribuição numérica** | O(1) | Copia valor diretamente |
| **Copia string** | O(n) | Precisa copiar cada caractere |
| **Comparação** | O(n) | Pior caso: strcmp percorre toda string |
| **Criação** | O(1) ou O(n) | Depende se tem strings para copiar |

### **🔍 Exemplo Prático com Medição**

```c
int exemplo_struct_simples() {
    // Criar pessoas - complexidade varia por causa das strings
    clock_t inicio = clock();
    
    Pessoa joao = criar_pessoa("João Silva", 25, 1.75, 'M');      // O(n) - strlen("João Silva")
    Pessoa maria = criar_pessoa("Maria Santos", 30, 1.65, 'F');  // O(n) - strlen("Maria Santos")
    
    clock_t fim = clock();
    printf("Tempo para criar 2 pessoas: %.6f segundos\n", 
           ((double)(fim - inicio)) / CLOCKS_PER_SEC);
    
    // Imprimir dados - O(1) para cada campo
    imprimir_pessoa(joao);
    imprimir_pessoa(maria);
    
    // Comparar pessoas - O(n) devido às strings
    inicio = clock();
    int sao_iguais = pessoas_iguais(joao, maria);
    fim = clock();
    
    printf("Pessoas são iguais? %s\n", sao_iguais ? "SIM" : "NÃO");
    printf("Tempo para comparar: %.6f segundos\n", 
           ((double)(fim - inicio)) / CLOCKS_PER_SEC);
    
    return 0;
}
```

---

## 👆 PONTEIROS

### **📊 Conceito: Variáveis que guardam endereços de memória**

**Analogia Simples:**
> Ponteiro é como o **endereço da sua casa**. Não é a casa, mas indica onde ela está.

### **💻 Implementação Simples em C**

```c
// Exemplo básico de ponteiros
void exemplo_ponteiros_basico() {
    int numero = 42;                    // O(1) - cria variável
    int* ptr = &numero;                 // O(1) - ptr aponta para numero
    
    printf("Valor de numero: %d\n", numero);           // O(1) - acesso direto
    printf("Endereço de numero: %p\n", &numero);       // O(1) - pega endereço
    printf("Valor de ptr: %p\n", ptr);                 // O(1) - mostra endereço armazenado
    printf("Valor apontado por ptr: %d\n", *ptr);      // O(1) - desreferenciamento
    
    // Modificar através do ponteiro
    *ptr = 100;                         // O(1) - altera valor via ponteiro
    printf("Novo valor de numero: %d\n", numero);      // O(1) - numero agora é 100
}

// Ponteiros com arrays
void ponteiros_com_arrays() {
    int numeros[] = {10, 20, 30, 40, 50};              // O(1) - array estático
    int* ptr = numeros;  // ptr aponta para o primeiro elemento // O(1)
    
    printf("Array via ponteiro:\n");
    for (int i = 0; i < 5; i++) {                      // O(n) - loop 5 vezes
        printf("numeros[%d] = %d\n", i, *(ptr + i));   // O(1) - aritmética de ponteiro
        // *(ptr + i) é equivalente a numeros[i]
        // Cálculo: endereço_base + i × sizeof(int)
    }
    // Complexidade total: O(n)
}

// Ponteiros com structs
void ponteiros_com_structs() {
    Pessoa joao = {"João", 25, 1.75, 'M'};             // O(1) - inicialização literal
    Pessoa* ptr_pessoa = &joao;                        // O(1) - ponteiro para struct
    
    // Duas formas de acessar campos via ponteiro:
    printf("Nome (forma 1): %s\n", (*ptr_pessoa).nome);    // O(1) - desreferencia e acessa
    printf("Idade (forma 2): %d\n", ptr_pessoa->idade);    // O(1) - notação seta (mais comum)
    
    // Modificar via ponteiro
    ptr_pessoa->idade = 26;                             // O(1) - alteração direta
    printf("Nova idade: %d\n", joao.idade);            // O(1) - joao.idade agora é 26
}
```

### **📊 Análise de Complexidade - Ponteiros**

| Operação | Complexidade | Explicação |
|----------|--------------|------------|
| **Declaração ptr** | O(1) | Apenas aloca espaço para endereço |
| **Atribuição ptr = &var** | O(1) | Copia endereço de memória |
| **Desreferenciamento *ptr** | O(1) | Acesso direto ao endereço |
| **Aritmética ptr + i** | O(1) | Soma: endereço + i × tamanho_tipo |
| **Acesso ptr->campo** | O(1) | Offset: endereço + deslocamento_campo |

### **🔍 Exemplo Prático com Alocação Dinâmica**

```c
// Alocação dinâmica simples
int* criar_array_dinamico(int tamanho) {
    int* arr = malloc(tamanho * sizeof(int));           // O(1) - alocação de memória
    
    if (arr == NULL) {                                  // O(1) - verificação de erro
        printf("Erro de alocação!\n");
        return NULL;
    }
    
    // Preencher array
    for (int i = 0; i < tamanho; i++) {                 // O(n) - loop n vezes
        arr[i] = i * i;  // Quadrado do índice            // O(1) - atribuição
    }
    
    return arr;                                         // O(1) - retorno
    // Complexidade total: O(n)
}

void exemplo_alocacao_dinamica() {
    int tamanho = 5;
    
    // Criar array dinâmico
    clock_t inicio = clock();
    int* meu_array = criar_array_dinamico(tamanho);     // O(n)
    clock_t fim = clock();
    
    if (meu_array != NULL) {
        printf("Array criado em %.6f segundos\n", 
               ((double)(fim - inicio)) / CLOCKS_PER_SEC);
        
        // Mostrar elementos
        for (int i = 0; i < tamanho; i++) {             // O(n)
            printf("arr[%d] = %d\n", i, meu_array[i]); // O(1)
        }
        
        // IMPORTANTE: Liberar memória
        free(meu_array);                                // O(1) - liberação
        meu_array = NULL;  // Boa prática               // O(1)
    }
}
```

---

## 📊 COMPARAÇÃO PRÁTICA DAS ESTRUTURAS

### **⚡ Resumo de Complexidades**

| Estrutura | Acesso | Busca | Inserção | Uso de Memória | Exemplo |
|-----------|--------|-------|----------|----------------|---------|
| **Array** | O(1) | O(n) | O(n) | Contígua, eficiente | Lista de notas |
| **Struct** | O(1) | - | O(1) | Agrupada, organizada | Dados de pessoa |
| **Ponteiro** | O(1) | - | - | Referência, flexível | Navegação em listas |

### **🎯 Quando Usar Cada Uma?**

**Array (Homogênea):**
- ✅ Coleção de elementos do mesmo tipo
- ✅ Acesso frequente por índice
- ✅ Tamanho conhecido ou fixo
- 📝 Exemplo: Lista de temperaturas diárias

**Struct (Heterogênea):**
- ✅ Agrupar dados relacionados de tipos diferentes
- ✅ Representar entidades do mundo real
- ✅ Organizar código de forma lógica
- 📝 Exemplo: Cadastro de produto (nome, preço, categoria)

**Ponteiros:**
- ✅ Alocação dinâmica de memória
- ✅ Passagem eficiente de estruturas grandes
- ✅ Implementar estruturas como listas ligadas
- 📝 Exemplo: Sistema que não sabe quantos usuários terá

---

## 💡 DICAS PRÁTICAS

### **🔧 Boas Práticas**

```c
// ✅ BOM: Verificar ponteiros antes de usar
if (ptr != NULL) {
    printf("Valor: %d\n", *ptr);
}

// ❌ RUIM: Usar ponteiro sem verificar
printf("Valor: %d\n", *ptr);  // Pode dar segmentation fault

// ✅ BOM: Liberar memória e anular ponteiro
free(ptr);
ptr = NULL;

// ❌ RUIM: Não liberar memória
// Causa memory leak!

// ✅ BOM: Inicializar arrays
int arr[5] = {0};  // Todos elementos = 0

// ✅ BOM: Usar const para ponteiros que não devem alterar dados
void imprimir_array(const int* arr, int tamanho) {
    // arr não pode ser modificado dentro da função
}
```

### **⚠️ Armadilhas Comuns**

```c
// ARMADILHA 1: Array bounds
int arr[5];
arr[10] = 100;  // ❌ ERRO! Acesso fora do limite

// ARMADILHA 2: Ponteiro para variável local
int* funcao_perigosa() {
    int x = 10;
    return &x;  // ❌ ERRO! x será destruída ao sair da função
}

// ARMADILHA 3: Double free
free(ptr);
free(ptr);  // ❌ ERRO! Liberando memória já liberada

// ARMADILHA 4: Uso após free
free(ptr);
*ptr = 10;  // ❌ ERRO! Usando ponteiro para memória liberada
```

---

## 🎓 EXERCÍCIOS SIMPLES PARA PRATICAR

### **Exercício 1: Array Básico**
```c
// Complete a função para encontrar o maior elemento
int encontrar_maior(int arr[], int tamanho) {
    // Sua implementação aqui
    // Complexidade esperada: O(n)
}
```

### **Exercício 2: Struct Simples**
```c
// Crie uma struct para representar um produto
// e uma função para calcular desconto
typedef struct {
    // Defina os campos necessários
} Produto;

float calcular_preco_com_desconto(Produto p, float desconto) {
    // Sua implementação aqui
    // Complexidade esperada: O(1)
}
```

### **Exercício 3: Ponteiros**
```c
// Complete a função para trocar valores de duas variáveis
void trocar(int* a, int* b) {
    // Sua implementação aqui
    // Complexidade esperada: O(1)
}
```

---

## 🏆 RESUMO EXECUTIVO

### **🎯 Pontos Principais**

1. **Arrays**: Elementos iguais, acesso O(1), busca O(n)
2. **Structs**: Elementos diferentes agrupados, acesso O(1) aos campos
3. **Ponteiros**: Endereços de memória, flexibilidade máxima

### **⚡ Complexidades Essenciais**

- **Acesso direto**: Sempre O(1)
- **Busca linear**: Sempre O(n)
- **Operações com strings**: Geralmente O(n)
- **Alocação/liberação**: O(1)

### **💡 Regra de Ouro**

> **"Use a estrutura mais simples que resolve seu problema"**
> - Array para coleções homogêneas
> - Struct para agrupar dados relacionados  
> - Ponteiros quando precisar de flexibilidade

---

**📚 Este guia simples fornece uma base sólida para entender estruturas de dados com foco na praticidade e análise de complexidade.**

*Última atualização: 27 de agosto de 2025*
