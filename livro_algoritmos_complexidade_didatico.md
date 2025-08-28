# Algoritmos e Complexidade Computacional
## Livro Didático Universitário

---

**Autor:** Prof. Vagner Cordeiro  
**Instituição:** Universidade do Vale do Itajaí - UNIVALI  
**Campus:** São José, Santa Catarina, Brasil  
**Disciplina:** ARA0174 - Algoritmos e Complexidade  
**Curso:** Sistemas de Informação  
**Ano:** 2025  

---

> *"No coração de Santa Catarina, onde a inovação tecnológica floresce entre o mar e a serra, estudamos algoritmos não apenas como ferramentas, mas como a linguagem fundamental da computação moderna."*

---

## Apresentação

Este livro foi desenvolvido especificamente para os estudantes de **Sistemas de Informação** da região do Grande Florianópolis, Santa Catarina. Nosso objetivo é apresentar os fundamentos de algoritmos e complexidade computacional de forma **didática**, **teórica** e **aplicada** ao contexto brasileiro de desenvolvimento de software.

### Por que Estudar Algoritmos em Santa Catarina?

Santa Catarina é um dos principais polos tecnológicos do Brasil. Em São José e região, temos:

- **Empresas de tecnologia** que demandam profissionais qualificados
- **Startups inovadoras** que precisam de soluções eficientes
- **Centros de pesquisa** que avançam a ciência da computação
- **Universidades** que formam os profissionais do futuro

Dominar algoritmos é **essencial** para se destacar neste cenário competitivo.

---

## Sumário

### **PARTE I - FUNDAMENTOS** (Páginas 1-20)
- **Capítulo 1:** O que são Algoritmos?
- **Capítulo 2:** Estruturas de Dados Básicas
- **Capítulo 3:** Funções e Modularização

### **PARTE II - ANÁLISE DE COMPLEXIDADE** (Páginas 21-40)
- **Capítulo 4:** Por que Analisar Eficiência?
- **Capítulo 5:** Notação Big O na Prática
- **Capítulo 6:** Comparando Algoritmos

### **PARTE III - ALGORITMOS FUNDAMENTAIS** (Páginas 41-60)
- **Capítulo 7:** Algoritmos de Busca
- **Capítulo 8:** Algoritmos de Ordenação
- **Capítulo 9:** Recursão e Divisão

### **PARTE IV - APLICAÇÕES PRÁTICAS** (Páginas 61-70)
- **Capítulo 10:** Algoritmos no Mundo Real
- **Capítulo 11:** Escolhendo o Algoritmo Certo
- **Capítulo 12:** Próximos Passos

---

# PARTE I - FUNDAMENTOS

## Capítulo 1: O que são Algoritmos?

### 1.1 Uma Definição Simples

Imagine que você precisa explicar para um amigo como chegar da UNIVALI São José até o Shopping Kobrasol. Você daria instruções passo a passo:

1. "Saia da universidade e vire à direita na BR-101"
2. "Continue por 3 km até o viaduto"
3. "Entre à esquerda em direção ao shopping"
4. "Estacione no piso G2"

Isso é um **algoritmo**: uma sequência finita de instruções precisas para resolver um problema.

### 1.2 Características dos Algoritmos

Todo algoritmo deve ter:

#### **Entrada Definida**
- Quais informações preciso para começar?
- Exemplo: "Localização atual" e "Destino desejado"

#### **Passos Claros**
- Cada instrução deve ser não ambígua
- Exemplo: "Vire à direita" (não "vire para um lado")

#### **Saída Específica**
- Qual resultado espero obter?
- Exemplo: "Chegada ao destino"

#### **Finitude**
- O algoritmo deve terminar em tempo finito
- Não pode ficar "andando em círculos"

### 1.3 Algoritmos no Cotidiano de SC

**Exemplo 1: Sistema de Transporte Público de Florianópolis**
- **Problema:** Encontrar a melhor rota de ônibus
- **Entrada:** Origem, destino, horário
- **Algoritmo:** Busca em grafo com pesos (tempo, distância)
- **Saída:** Sequência de ônibus e horários

**Exemplo 2: Sistema de Delivery em São José**
- **Problema:** Otimizar rotas de entrega
- **Entrada:** Lista de endereços, tempo máximo
- **Algoritmo:** Problema do caixeiro viajante aproximado
- **Saída:** Ordem ótima de entregas

### 1.4 Por que Estudar Teoria?

Muitos estudantes perguntam: *"Por que não aprender só a programar?"*

A resposta está na **durabilidade do conhecimento**:

- **Linguagens de programação** mudam (Pascal → C → Java → Python → ?)
- **Frameworks** evoluem constantemente
- **Algoritmos fundamentais** permanecem relevantes há décadas

> Alan Turing desenvolveu conceitos em 1936 que ainda usamos hoje!

---

## Capítulo 2: Estruturas de Dados Básicas

### 2.1 O que são Estruturas de Dados?

Estruturas de dados são formas de **organizar e armazenar** informações no computador para que possam ser usadas de forma eficiente.

**Analogia do Mundo Real:**
- **Biblioteca:** Livros organizados por assunto, autor, ano
- **Supermercado:** Produtos organizados por categoria
- **Arquivo de documentos:** Pastas organizadas alfabeticamente

### 2.2 Arrays (Vetores)

**Conceito:** Coleção de elementos do mesmo tipo, armazenados em posições consecutivas.

**Analogia:** Apartamentos numerados em um edifício em Balneário Camboriú
- Apartamento 101, 102, 103... (índices 0, 1, 2...)
- Cada apartamento tem o mesmo "tipo" (estrutura)
- Para acessar o apartamento 105, você vai diretamente lá

**Características:**
- **Acesso:** O(1) - acesso direto por índice
- **Busca:** O(n) - pode precisar verificar todos
- **Inserção/Remoção:** O(n) - pode precisar mover elementos

**Quando usar:**
- Quando você precisa de acesso rápido por posição
- Quando o tamanho é relativamente fixo
- Para operações matemáticas em sequências

### 2.3 Listas Ligadas

**Conceito:** Elementos conectados através de ponteiros, como vagões de trem.

**Analogia:** Caça ao tesouro na praia de Jurere
- Cada pista te leva para a próxima localização
- Você não sabe onde estão todas as pistas
- Para chegar à pista 5, precisa passar pelas anteriores

**Características:**
- **Acesso:** O(n) - precisa percorrer desde o início
- **Inserção/Remoção:** O(1) - se souber a posição
- **Flexibilidade:** Tamanho dinâmico

**Quando usar:**
- Quando o tamanho varia muito
- Quando você faz muitas inserções/remoções
- Quando não precisa de acesso aleatório

### 2.4 Pilhas (Stacks)

**Conceito:** Estrutura LIFO (Last In, First Out) - último a entrar, primeiro a sair.

**Analogia:** Pilha de pratos em um restaurante de Florianópolis
- Você sempre pega o prato de cima
- O último prato colocado é o primeiro a ser retirado

**Operações Básicas:**
- **Push:** Adicionar elemento no topo
- **Pop:** Remover elemento do topo
- **Top/Peek:** Ver o elemento do topo sem remover

**Aplicações Práticas:**
- Desfazer (Ctrl+Z) em editores de texto
- Navegação de páginas web (botão "Voltar")
- Avaliação de expressões matemáticas

### 2.5 Filas (Queues)

**Conceito:** Estrutura FIFO (First In, First Out) - primeiro a entrar, primeiro a sair.

**Analogia:** Fila do ônibus na TICEN (Terminal de São José)
- Primeiro da fila é o primeiro a entrar no ônibus
- Novos passageiros entram no final da fila

**Operações Básicas:**
- **Enqueue:** Adicionar elemento no final
- **Dequeue:** Remover elemento do início
- **Front:** Ver o primeiro elemento

**Aplicações Práticas:**
- Processamento de tarefas em sistemas
- Gerenciamento de impressões
- Algoritmos de busca em grafos (BFS)

---

## Capítulo 3: Funções e Modularização

### 3.1 Por que Usar Funções?

Imagine construir uma casa em São José sem plantas ou divisões:
- Seria caótico e difícil de organizar
- Problemas seriam difíceis de localizar
- Melhorias seriam complicadas de implementar

**Funções** são como os cômodos de uma casa: cada uma tem um **propósito específico** e **bem definido**.

### 3.2 Benefícios da Modularização

#### **Reutilização**
- Escreva uma vez, use várias vezes
- Exemplo: Função para calcular distância entre duas cidades de SC

#### **Organização**
- Código mais legível e estruturado
- Cada função resolve um problema específico

#### **Manutenção**
- Mudanças localizadas
- Testes independentes

#### **Trabalho em Equipe**
- Diferentes pessoas podem trabalhar em funções diferentes
- Como equipes de construção civil especializadas

### 3.3 Passagem de Parâmetros

**Por Valor:**
- Copia o valor da variável
- Modificações não afetam a variável original
- Como tirar uma fotocópia de um documento

**Por Referência:**
- Passa o endereço da variável
- Modificações afetam a variável original
- Como emprestar o documento original

### 3.4 Escopo de Variáveis

**Variáveis Locais:**
- Existem apenas dentro da função
- Como objetos dentro de um quarto de hotel

**Variáveis Globais:**
- Acessíveis de qualquer lugar do programa
- Como a recepção de um hotel - todos conhecem

**Boas Práticas:**
- Prefira variáveis locais
- Use variáveis globais apenas quando necessário
- Mantenha as funções focadas e pequenas

---

# PARTE II - ANÁLISE DE COMPLEXIDADE

## Capítulo 4: Por que Analisar Eficiência?

### 4.1 O Problema da Escala

Considere o sistema de trânsito da Grande Florianópolis:

**Cenário 1:** 10 carros
- Qualquer organização funciona
- Tempo de viagem é mínimo

**Cenário 2:** 100.000 carros (realidade atual)
- Organização se torna crucial
- Pequenas ineficiências causam grandes problemas

O mesmo acontece com algoritmos!

### 4.2 Exemplo Prático: Busca de CEP

Imagine que você trabalha nos Correios de SC e precisa encontrar um endereço:

**Método 1: Busca Linear**
- Verificar cada CEP da lista, um por um
- Para 100.000 CEPs, pode precisar verificar todos

**Método 2: Busca Binária** 
- CEPs organizados em ordem
- Eliminar metade das possibilidades a cada passo
- Para 100.000 CEPs, máximo de 17 verificações

**Diferença:** 100.000 vs 17 operações!

### 4.3 Por que não Cronometrar?

Muitos estudantes perguntam: *"Por que não medir o tempo diretamente?"*

**Problemas da medição direta:**
- Depende do computador usado
- Varia com a carga do sistema
- Pode variar com os dados específicos
- Não revela o comportamento geral

**Vantagens da análise teórica:**
- Independente do hardware
- Revela comportamento fundamental
- Permite comparação justa
- Prediz comportamento em qualquer escala

### 4.4 O que Realmente Importa?

Para grandes volumes de dados, o que importa é **como o tempo cresce** conforme aumentamos a entrada.

**Crescimento Linear:** Dobrar a entrada dobra o tempo
**Crescimento Quadrático:** Dobrar a entrada quadruplica o tempo
**Crescimento Logarítmico:** Dobrar a entrada adiciona constante ao tempo

---

## Capítulo 5: Notação Big O na Prática

### 5.1 O que é Big O?

Big O descreve **como o tempo de execução cresce** em relação ao tamanho da entrada, focando no **pior caso**.

**Analogia:** Tempo para atravessar SC de carro
- **O(1):** Sempre o mesmo tempo (helicóptero)
- **O(n):** Proporcional à distância (velocidade constante)
- **O(n²):** Para cada km, precisa voltar ao início (muito ineficiente!)

### 5.2 As Principais Complexidades

#### **O(1) - Tempo Constante**
Tempo não muda com o tamanho da entrada.

**Exemplos:**
- Acessar um elemento de array por índice
- Operações matemáticas básicas
- Verificar se um número é par

**Analogia:** Pegar um livro específico se você souber exatamente onde está na biblioteca.

#### **O(log n) - Tempo Logarítmico**
Tempo cresce lentamente, mesmo para entradas grandes.

**Exemplos:**
- Busca binária
- Inserção em árvore balanceada
- Algumas operações de hash

**Analogia:** Encontrar uma palavra no dicionário - você elimina metade das páginas a cada passo.

#### **O(n) - Tempo Linear**
Tempo proporcional ao tamanho da entrada.

**Exemplos:**
- Buscar um elemento específico em lista não ordenada
- Calcular média de uma lista
- Imprimir todos os elementos

**Analogia:** Verificar cada casa de uma rua procurando um endereço específico.

#### **O(n log n) - Tempo Linearítmico**
Eficiência típica dos melhores algoritmos de ordenação.

**Exemplos:**
- Merge Sort
- Heap Sort
- Quick Sort (caso médio)

**Analogia:** Organizar livros: dividir em grupos menores, organizar cada grupo, depois combinar.

#### **O(n²) - Tempo Quadrático**
Para cada elemento, analisa todos os outros.

**Exemplos:**
- Bubble Sort
- Selection Sort
- Algumas operações em matrizes

**Analogia:** Comparar cada pessoa de uma festa com todas as outras pessoas.

#### **O(2ⁿ) - Tempo Exponencial**
Cresce muito rapidamente. Geralmente impraticável para n > 30.

**Exemplos:**
- Algumas soluções de força bruta
- Problema da mochila sem otimização
- Fibonacci recursivo simples

**Analogia:** Cada nova variável dobra todas as possibilidades anteriores.

### 5.3 Visualizando o Crescimento

Para n = 1.000.000 (um milhão):

| Complexidade | Operações | Tempo Aproximado* |
|--------------|-----------|-------------------|
| O(1) | 1 | < 1 microssegundo |
| O(log n) | ~20 | < 1 microssegundo |
| O(n) | 1.000.000 | 1 milissegundo |
| O(n log n) | ~20.000.000 | 20 milissegundos |
| O(n²) | 1.000.000.000.000 | ~3 horas |
| O(2ⁿ) | 2^1.000.000 | Mais que a idade do universo |

*Considerando ~1 bilhão de operações por segundo

### 5.4 Regras Práticas

#### **Ignore Constantes**
- O(2n) = O(n)
- O(n + 100) = O(n)

#### **Foque no Termo Dominante**
- O(n² + n + 1) = O(n²)
- O(n log n + n) = O(n log n)

#### **Analise Loops**
- 1 loop = O(n)
- 2 loops aninhados = O(n²)
- 3 loops aninhados = O(n³)

---

## Capítulo 6: Comparando Algoritmos

### 6.1 Exemplo Prático: Ordenação de Notas

Imagine que você é professor em uma universidade de SC e precisa ordenar as notas de 1000 alunos.

#### **Bubble Sort - O(n²)**
```
Para cada nota:
    Para cada outra nota:
        Se estiver fora de ordem, troque
```
- **Operações:** ~500.000 comparações
- **Tempo:** Alguns segundos
- **Vantagem:** Fácil de entender
- **Desvantagem:** Muito lento para listas grandes

#### **Merge Sort - O(n log n)**
```
Divida a lista ao meio
Ordene cada metade recursivamente
Combine as metades ordenadas
```
- **Operações:** ~10.000 comparações
- **Tempo:** Milissegundos
- **Vantagem:** Sempre eficiente
- **Desvantagem:** Usa mais memória

### 6.2 Trade-offs Importantes

#### **Tempo vs Espaço**
- Algoritmos mais rápidos podem usar mais memória
- Exemplo: Merge Sort (rápido, mais memória) vs Bubble Sort (lento, pouca memória)

#### **Simplicidade vs Eficiência**
- Algoritmos simples são fáceis de implementar e entender
- Algoritmos eficientes podem ser mais complexos

#### **Caso Médio vs Pior Caso**
- Quick Sort: O(n log n) em média, O(n²) no pior caso
- Merge Sort: Sempre O(n log n)

### 6.3 Quando Usar Cada Abordagem?

#### **Para Pequenos Conjuntos (n < 100)**
- Simplicidade importa mais que eficiência
- Bubble Sort pode ser aceitável

#### **Para Conjuntos Médios (100 < n < 10.000)**
- Eficiência começa a importar
- Quick Sort ou Merge Sort

#### **Para Grandes Conjuntos (n > 10.000)**
- Eficiência é crucial
- Apenas algoritmos O(n log n) ou melhores

#### **Para Dados Críticos**
- Consistência importa
- Merge Sort (sempre O(n log n))

### 6.4 Análise de Casos Reais

**Sistema de E-commerce de Florianópolis:**
- **Busca de produtos:** Índices - O(log n)
- **Recomendações:** Algoritmos complexos - O(n log n)
- **Carrinho de compras:** Operações simples - O(1)

**App de Transporte:**
- **Localizar motoristas próximos:** Busca espacial - O(log n)
- **Calcular rota:** Dijkstra - O(n log n)
- **Atualizar posição:** Inserção - O(1)

---

# PARTE III - ALGORITMOS FUNDAMENTAIS

## Capítulo 7: Algoritmos de Busca

### 7.1 Por que Buscar?

A busca é uma das operações mais fundamentais em computação. Exemplos do dia a dia:

- **Google:** Buscar páginas relevantes entre bilhões
- **WhatsApp:** Encontrar uma conversa específica
- **Netflix:** Encontrar um filme
- **GPS:** Encontrar a melhor rota

### 7.2 Busca Linear

**Conceito:** Verificar cada elemento sequencialmente até encontrar o desejado.

**Quando usar:**
- Lista não está ordenada
- Lista pequena (< 100 elementos)
- Implementação simples é prioritária

**Complexidade:** O(n)

**Analogia:** Procurar uma pessoa específica verificando cada rosto em uma festa.

### 7.3 Busca Binária

**Conceito:** Em uma lista ordenada, eliminar metade das possibilidades a cada passo.

**Pré-requisito:** Lista deve estar ordenada

**Algoritmo:**
1. Compare com o elemento do meio
2. Se for igual, encontrou!
3. Se for menor, busque na metade esquerda
4. Se for maior, busque na metade direita
5. Repita até encontrar ou esgotar possibilidades

**Complexidade:** O(log n)

**Analogia:** Adivinhar um número entre 1 e 1000
- "É maior ou menor que 500?"
- "É maior ou menor que 750?"
- Etc.

### 7.4 Comparação Prática

Para encontrar um elemento em uma lista de 1 milhão:

| Algoritmo | Pior Caso | Caso Médio |
|-----------|-----------|------------|
| Busca Linear | 1.000.000 | 500.000 |
| Busca Binária | 20 | 10 |

**Diferença:** 50.000x mais rápido!

### 7.5 Aplicações Reais em SC

**Sistema da Receita Federal:**
- **Busca por CPF:** Busca binária em base ordenada
- **Validação:** O(log n) para milhões de registros

**Sistema Hospitalar:**
- **Busca por prontuário:** Índices ordenados
- **Emergência:** Busca rápida é vital

**E-commerce Regional:**
- **Busca por produto:** Combinação de técnicas
- **Filtros:** Múltiplas buscas simultâneas

---

## Capítulo 8: Algoritmos de Ordenação

### 8.1 Por que Ordenar?

Dados ordenados permitem:
- **Busca mais rápida** (busca binária)
- **Melhor apresentação** (relatórios organizados)
- **Detecção de padrões** (dados agrupados)
- **Operações otimizadas** (merge, união)

### 8.2 Bubble Sort

**Conceito:** Comparar elementos adjacentes e trocar se estiverem fora de ordem.

**Funcionamento:**
- Compare cada par de elementos adjacentes
- Troque se estiverem fora de ordem
- Repita até nenhuma troca ser necessária

**Complexidade:** O(n²)

**Analogia:** Bolhas de ar subindo na água - elementos "leves" sobem gradualmente.

**Quando usar:**
- Listas muito pequenas (< 20 elementos)
- Quando simplicidade é mais importante que eficiência
- Para fins educacionais

### 8.3 Selection Sort

**Conceito:** Encontrar o menor elemento e colocá-lo na primeira posição, depois o segundo menor na segunda posição, etc.

**Funcionamento:**
1. Encontre o menor elemento
2. Troque com o primeiro elemento
3. Encontre o segundo menor
4. Troque com o segundo elemento
5. Continue até ordenar tudo

**Complexidade:** O(n²)

**Analogia:** Selecionar a pessoa mais baixa para a frente da fila, depois a segunda mais baixa, etc.

### 8.4 Merge Sort

**Conceito:** Dividir a lista ao meio, ordenar cada metade recursivamente, depois combinar.

**Funcionamento:**
1. Se a lista tem 1 elemento, está ordenada
2. Divida a lista ao meio
3. Ordene recursivamente cada metade
4. Combine as duas metades ordenadas

**Complexidade:** O(n log n)

**Vantagens:**
- Sempre O(n log n), mesmo no pior caso
- Estável (mantém ordem relativa de elementos iguais)
- Funciona bem com listas grandes

**Desvantagem:**
- Usa O(n) espaço adicional

### 8.5 Quick Sort

**Conceito:** Escolher um "pivot", partilhar a lista em elementos menores e maiores que o pivot, ordenar recursivamente.

**Funcionamento:**
1. Escolha um pivot
2. Partilhe: elementos < pivot à esquerda, > pivot à direita
3. Ordene recursivamente cada parte

**Complexidade:** 
- **Melhor/Médio:** O(n log n)
- **Pior caso:** O(n²)

**Vantagens:**
- Muito rápido na prática
- Usa pouco espaço adicional (in-place)

**Desvantagem:**
- Pode degradar para O(n²) com pivots ruins

### 8.6 Escolhendo o Algoritmo Certo

**Para dados pequenos (n < 50):**
- Bubble Sort ou Selection Sort
- Simplicidade é mais importante

**Para dados médios (50 < n < 10.000):**
- Quick Sort (boa performance média)
- Implementação não muito complexa

**Para dados grandes (n > 10.000):**
- Merge Sort (garantia de performance)
- Quick Sort otimizado

**Para dados críticos:**
- Merge Sort (performance previsível)
- Heap Sort (O(n log n) garantido + in-place)

---

## Capítulo 9: Recursão e Divisão

### 9.1 O que é Recursão?

Recursão é quando uma função **chama a si mesma** para resolver uma versão menor do mesmo problema.

**Analogia:** Matrioskas (bonecas russas)
- Cada boneca contém uma boneca menor
- Eventualmente chegamos à menor boneca
- O problema se resolve "de dentro para fora"

### 9.2 Componentes da Recursão

#### **Caso Base**
Condição que para a recursão - a "boneca menor"

#### **Caso Recursivo**
Como dividir o problema em uma versão menor

#### **Progresso**
Cada chamada deve se aproximar do caso base

### 9.3 Exemplo: Fatorial

**Problema:** Calcular n! = n × (n-1) × (n-2) × ... × 1

**Definição Recursiva:**
- Caso base: 0! = 1
- Caso recursivo: n! = n × (n-1)!

**Por que funciona?**
- 5! = 5 × 4!
- 4! = 4 × 3!
- 3! = 3 × 2!
- 2! = 2 × 1!
- 1! = 1 × 0!
- 0! = 1 (caso base)

### 9.4 Vantagens da Recursão

#### **Simplicidade Conceitual**
- Muitos problemas são naturalmente recursivos
- Código mais limpo e legível

#### **Divide e Conquista**
- Quebra problemas complexos em partes menores
- Cada parte é mais fácil de resolver

### 9.5 Cuidados com Recursão

#### **Stack Overflow**
- Muitas chamadas recursivas consomem memória
- Caso base mal definido pode causar recursão infinita

#### **Eficiência**
- Pode resolver o mesmo subproblema várias vezes
- Fibonacci recursivo é exemplo clássico de ineficiência

### 9.6 Aplicações Práticas

**Estruturas de Dados:**
- Percorrer árvores
- Buscar em grafos
- Processar listas ligadas

**Algoritmos:**
- Merge Sort
- Quick Sort
- Busca binária

**Problemas Reais:**
- Processamento de arquivos em diretórios
- Análise de expressões matemáticas
- Algoritmos de inteligência artificial

---

# PARTE IV - APLICAÇÕES PRÁTICAS

## Capítulo 10: Algoritmos no Mundo Real

### 10.1 Cenários de Santa Catarina

#### **Porto de Itajaí**
**Problema:** Otimizar carregamento de contêineres
**Algoritmo:** Bin packing (empacotamento)
**Complexidade:** NP-difícil, soluções aproximadas O(n log n)
**Impacto:** Economia de milhões em logística

#### **Energisa SC**
**Problema:** Roteamento ótimo para leitura de medidores
**Algoritmo:** Problema do carteiro chinês
**Complexidade:** O(n³) com algoritmo de emparelhamento
**Impacto:** Redução de 30% no tempo de coleta

#### **Sistema de Trânsito de Florianópolis**
**Problema:** Sincronização de semáforos
**Algoritmo:** Programação linear inteira
**Complexidade:** Exponencial, usa heurísticas
**Impacto:** Melhoria no fluxo de veículos

### 10.2 Empresas de Tecnologia em SC

#### **Softplan (Florianópolis)**
**Área:** Software jurídico
**Desafios:**
- Busca em milhões de documentos legais
- Processamento de texto em tempo real
- Análise de padrões em contratos

**Algoritmos usados:**
- Indexação: Árvores B+ - O(log n)
- Busca textual: KMP ou Boyer-Moore - O(n+m)
- Machine Learning: Redes neurais - Complexidade variável

#### **WEG (Jaraguá do Sul)**
**Área:** Automação industrial
**Desafios:**
- Controle de motores em tempo real
- Otimização de consumo energético
- Análise preditiva de falhas

**Algoritmos usados:**
- Controle PID: O(1) por iteração
- Otimização: Algoritmos genéticos - O(g×p×f)
- Previsão: Séries temporais - O(n log n)

### 10.3 Startups Catarinenses

#### **Fintech em Florianópolis**
**Problema:** Detecção de fraudes em tempo real
**Solução:** 
- Algoritmos de machine learning
- Análise de grafos de transações
- Processamento em streaming

**Complexidades:**
- Random Forest: O(n log n × árvores)
- Detecção de anomalias: O(n²) ou O(n log n) otimizado
- Grafos: O(V + E) para busca

#### **E-commerce Regional**
**Problema:** Sistema de recomendações
**Solução:**
- Filtragem colaborativa
- Análise de clusters de usuários
- Processamento de big data

**Complexidades:**
- Similaridade de usuários: O(n²)
- K-means: O(n×k×i×d)
- MapReduce: O(n) distribuído

### 10.4 Setor Público

#### **Tribunal de Justiça de SC**
**Problema:** Classificação automática de processos
**Solução:**
- Processamento de linguagem natural
- Classificação por machine learning
- Busca semântica

**Impacto:**
- Redução de 50% no tempo de triagem
- Melhoria na distribuição de processos
- Maior eficiência judicial

#### **Secretaria da Fazenda**
**Problema:** Detecção de sonegação fiscal
**Solução:**
- Análise de redes de empresas
- Detecção de padrões suspeitos
- Cross-matching de bases de dados

**Algoritmos:**
- Algoritmos de grafos: O(V log V + E)
- Clustering: O(n²) ou O(n log n)
- Join de databases: O(n log n)

---

## Capítulo 11: Escolhendo o Algoritmo Certo

### 11.1 Critérios de Decisão

#### **Tamanho dos Dados**
- **Pequeno (< 1.000):** Simplicidade primeiro
- **Médio (1.000 - 100.000):** Equilíbrio eficiência/simplicidade
- **Grande (> 100.000):** Eficiência é crucial

#### **Frequência de Uso**
- **Uso único:** Algoritmo simples pode ser suficiente
- **Uso frequente:** Investir em otimização vale a pena

#### **Recursos Disponíveis**
- **Memória limitada:** Algoritmos in-place
- **Processamento limitado:** Pré-processamento pode ajudar
- **Tempo real:** Algoritmos com tempo previsível

#### **Características dos Dados**
- **Dados ordenados:** Aproveitar a ordenação
- **Dados com duplicatas:** Algoritmos estáveis
- **Dados dinâmicos:** Estruturas que suportam inserção/remoção

### 11.2 Guia de Decisão para Busca

```
Dados estão ordenados?
├─ SIM → Busca Binária O(log n)
└─ NÃO → Posso ordenar?
    ├─ SIM → Ordenar + Busca Binária O(n log n + q log n)
    └─ NÃO → Busca Linear O(n)
```

**Considerações especiais:**
- Para múltiplas buscas: vale ordenar primeiro
- Para busca única: busca linear pode ser melhor
- Para busca aproximada: hash tables

### 11.3 Guia de Decisão para Ordenação

```
Tamanho dos dados?
├─ < 50 elementos → Bubble/Selection Sort (simplicidade)
├─ 50-10.000 → Quick Sort (performance média)
└─ > 10.000 → 
    └─ Performance previsível necessária?
        ├─ SIM → Merge Sort O(n log n) garantido
        └─ NÃO → Quick Sort otimizado
```

### 11.4 Otimizações Práticas

#### **Algoritmos Híbridos**
- Quick Sort + Insertion Sort para arrays pequenos
- Timsort (Python): Merge + Insertion adaptativo

#### **Cache-Friendly Algorithms**
- Considerar localidade de memória
- Algoritmos que acessam dados sequencialmente

#### **Paralelização**
- Merge Sort paralelo
- Quick Sort paralelo
- Map-Reduce para big data

### 11.5 Casos de Estudo

#### **Sistema de Votação Eletrônica**
**Requisitos:**
- Confiabilidade máxima
- Performance previsível
- Auditabilidade

**Escolhas:**
- Ordenação: Merge Sort (O(n log n) garantido)
- Busca: Busca binária (O(log n))
- Validação: Algoritmos determinísticos

#### **Sistema de Streaming (Netflix)**
**Requisitos:**
- Baixa latência
- Alto throughput
- Escalabilidade

**Escolhas:**
- Cache: Hash tables (O(1) médio)
- Recomendações: Algoritmos aproximados
- Load balancing: Consistent hashing

#### **Sistema Bancário**
**Requisitos:**
- Correção absoluta
- Consistência
- Auditoria completa

**Escolhas:**
- Transações: ACID properties
- Backup: Algoritmos de checksums
- Fraude: Machine learning + regras determinísticas

---

## Capítulo 12: Próximos Passos

### 12.1 Especializações na Área

#### **Inteligência Artificial**
**Algoritmos fundamentais:**
- Redes neurais e deep learning
- Algoritmos genéticos
- Busca heurística (A*)
- Machine learning (SVM, Random Forest)

**Complexidades típicas:**
- Treinamento: O(n×d×i) onde i = iterações
- Inferência: O(d) a O(n log n)

**Onde estudar em SC:**
- UFSC - Programa de Pós-graduação em Ciência da Computação
- FURB - Mestrado em Computação Aplicada

#### **Desenvolvimento de Jogos**
**Algoritmos específicos:**
- Pathfinding (A*, Dijkstra)
- Detecção de colisão
- Culling algorithms
- Algoritmos de rendering

**Empresas em SC:**
- Aquiris Game Studio (Porto Alegre - próximo)
- Hoplon (Florianópolis)

#### **Segurança da Informação**
**Algoritmos criptográficos:**
- RSA, AES, SHA
- Algoritmos de hash
- Assinaturas digitais

**Complexidades:**
- Criptografia: O(n) a O(n³)
- Quebra: Exponencial (segurança baseada nisso)

### 12.2 Preparação para o Mercado

#### **Habilidades Técnicas Essenciais**
1. **Domínio de estruturas de dados básicas**
2. **Análise de complexidade automática**
3. **Implementação eficiente em pelo menos 2 linguagens**
4. **Debugging e profiling de algoritmos**

#### **Habilidades Complementares**
1. **Comunicação técnica clara**
2. **Trabalho em equipe**
3. **Gestão de projetos**
4. **Aprendizado contínuo**

### 12.3 Oportunidades em Santa Catarina

#### **Mercado de Trabalho**
**Florianópolis:**
- Maior polo tecnológico de SC
- Startups em crescimento
- Empresas consolidadas

**Joinville:**
- Foco em automação industrial
- WEG e empresas do setor

**Blumenau:**
- Setor têxtil + tecnologia
- Havan e e-commerce

**Itajaí:**
- Logística e portos
- Sistemas de gestão

#### **Salários Médios (2025)**
- **Júnior:** R$ 4.000 - R$ 6.000
- **Pleno:** R$ 6.000 - R$ 10.000
- **Sênior:** R$ 10.000 - R$ 18.000
- **Especialista:** R$ 15.000+

### 12.4 Recursos para Estudo Contínuo

#### **Livros Recomendados**
1. **"Introduction to Algorithms"** - Cormen, Leiserson, Rivest, Stein
2. **"Algorithm Design Manual"** - Steven Skiena
3. **"Algorithms"** - Robert Sedgewick

#### **Plataformas Online**
1. **LeetCode:** Problemas para entrevistas
2. **HackerRank:** Desafios programação
3. **Coursera/edX:** Cursos universitários
4. **YouTube:** Canais especializados

#### **Competições**
1. **Maratona de Programação SBC**
2. **Google Code Jam**
3. **Codeforces**
4. **AtCoder**

### 12.5 Projetos Práticos

#### **Nível Iniciante**
1. **Sistema de biblioteca:** Busca e ordenação básica
2. **Calculadora:** Parsing de expressões
3. **Jogo da velha:** Algoritmo minimax simples

#### **Nível Intermediário**
1. **Sistema de recomendações:** Filtragem colaborativa
2. **Pathfinding visual:** Implementar A*
3. **Compressor de arquivos:** Huffman coding

#### **Nível Avançado**
1. **Database simples:** B-trees, indexação
2. **Compilador simples:** Parsing, otimização
3. **Sistema distribuído:** Consistent hashing

### 12.6 Considerações Éticas

#### **Responsabilidade Social**
- Algoritmos afetam vidas reais
- Bias em machine learning
- Privacidade de dados

#### **Sustentabilidade**
- Algoritmos eficientes consomem menos energia
- Green computing
- Otimização de recursos

#### **Transparência**
- Algoritmos devem ser auditáveis
- Explicabilidade em IA
- Accountability em decisões automatizadas

---

## Conclusão

### O Futuro dos Algoritmos

A área de algoritmos está em constante evolução. Novas técnicas como **computação quântica**, **neuromorphic computing** e **edge computing** estão criando novos paradigmas.

### Santa Catarina no Cenário Nacional

Nossa região tem potencial para ser referência nacional em:
- **Inovação tecnológica**
- **Qualidade de vida + tecnologia**
- **Sustentabilidade digital**
- **Educação de qualidade**

### Mensagem Final

Dominar algoritmos não é apenas sobre código - é sobre **raciocínio lógico**, **resolução de problemas** e **pensamento sistemático**. Essas habilidades são valiosas em qualquer carreira e te acompanharão por toda a vida profissional.

Seja curioso, pratique constantemente e lembre-se: cada problema resolvido te torna um profissional mais completo.

**Sucesso na sua jornada em algoritmos e complexidade!**

---

**Prof. Vagner Cordeiro**  
*UNIVALI - São José, SC*  
*2025*

---

> *"Em Santa Catarina, entre o mar e a serra, formamos profissionais que dominam não apenas a tecnologia, mas a arte de resolver problemas com elegância e eficiência."*
