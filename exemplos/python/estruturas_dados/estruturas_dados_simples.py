"""
ESTRUTURAS DE DADOS SIMPLES - Python
Homogêneas, Heterogêneas e Referências
Cada operação comentada com sua complexidade
"""

import time
from typing import List, Dict

# ====================================
# 1. ESTRUTURAS HOMOGÊNEAS (LISTAS)
# ====================================

def exemplo_lista_basica():
    """Exemplo com lista homogênea em Python"""
    print("\n=== LISTA HOMOGÊNEA ===")
    
    # Criação de lista - O(n)
    numeros = [10, 20, 30, 40, 50]                      # O(n) - cria lista com n elementos
    print(f"Lista criada: {numeros}")                   # O(n) - impressão da lista
    
    # Acesso direto - O(1)
    valor = numeros[2]                                   # O(1) - acesso por índice
    print(f"Elemento na posição 2: {valor}")            # O(1) - impressão
    
    # Busca linear - O(n)
    procurado = 30
    posicao = -1
    for i, num in enumerate(numeros):                    # O(n) - percorre lista
        if num == procurado:                             # O(1) - comparação
            posicao = i                                  # O(1) - atribuição
            break                                        # O(1) - saída do loop
    
    if posicao != -1:                                    # O(1) - verificação
        print(f"Valor {procurado} encontrado na posição {posicao}")
    else:
        print(f"Valor {procurado} não encontrado")
    
    # Busca com método built-in - O(n)
    try:
        pos_builtin = numeros.index(30)                  # O(n) - busca interna
        print(f"Usando .index(): posição {pos_builtin}")
    except ValueError:
        print("Valor não encontrado")

def operacoes_lista_simples():
    """Operações básicas com listas"""
    print("\n=== OPERAÇÕES COM LISTA ===")
    
    numeros = []                                         # O(1) - lista vazia
    
    # Adição no final - O(1) amortizado
    print("Adicionando elementos:")
    for i in range(5):                                   # O(n) - loop 5 vezes
        numeros.append(i * 10)                           # O(1) - adiciona no final
        print(f"Adicionado {i * 10}, lista: {numeros}") # O(n) - impressão da lista
    
    # Soma dos elementos - O(n)
    soma = sum(numeros)                                  # O(n) - percorre toda lista
    print(f"Soma dos elementos: {soma}")
    
    # Remoção - O(n) no pior caso
    if numeros:                                          # O(1) - verificação se não vazia
        removido = numeros.pop(2)                        # O(n) - remove índice 2, move elementos
        print(f"Removido elemento {removido}, lista: {numeros}")

# ====================================
# 2. ESTRUTURAS HETEROGÊNEAS (CLASSES/DICTS)
# ====================================

class Funcionario:
    """Classe simples para representar funcionário"""
    
    def __init__(self, nome: str, idade: int, salario: float):
        """Construtor - O(1) para atribuições numéricas, O(n) para strings"""
        self.nome = nome                                 # O(1) - atribuição de referência
        self.idade = idade                               # O(1) - atribuição direta  
        self.salario = salario                           # O(1) - atribuição direta
    
    def __str__(self):
        """Representação string - O(1)"""
        return f"{self.nome}, {self.idade} anos, R$ {self.salario:.2f}"
    
    def aumentar_salario(self, percentual: float):
        """Aumenta salário - O(1)"""
        self.salario *= (1 + percentual / 100)          # O(1) - cálculo e atribuição

def exemplo_classe_simples():
    """Exemplo com classe/struct em Python"""
    print("\n=== CLASSE/STRUCT ===")
    
    # Criação - O(1)
    func1 = Funcionario("Ana Silva", 28, 3500.50)       # O(1) - criação do objeto
    print(f"Funcionário criado: {func1}")               # O(1) - chamada do __str__
    
    # Acesso aos atributos - O(1)
    print(f"Nome: {func1.nome}")                        # O(1) - acesso direto
    print(f"Idade: {func1.idade}")                      # O(1) - acesso direto
    print(f"Salário: R$ {func1.salario:.2f}")           # O(1) - acesso direto
    
    # Modificação - O(1)
    func1.aumentar_salario(10)                           # O(1) - chamada de método
    print(f"Após aumento: {func1}")

def exemplo_lista_objetos():
    """Lista de objetos (array de structs)"""
    print("\n=== LISTA DE OBJETOS ===")
    
    # Criação da lista - O(n)
    empresa = [                                          # O(n) - lista com n funcionários
        Funcionario("João", 30, 4000.0),                # O(1) - cada criação
        Funcionario("Maria", 25, 3800.0),               # O(1)
        Funcionario("Pedro", 35, 4500.0)                # O(1)
    ]
    
    # Exibir todos - O(n)
    print("Lista de funcionários:")
    for i, func in enumerate(empresa):                   # O(n) - percorre lista
        print(f"{i+1}. {func}")                         # O(1) - impressão
    
    # Encontrar maior salário - O(n)
    func_maior_salario = max(empresa, key=lambda f: f.salario)  # O(n) - percorre comparando
    print(f"Maior salário: {func_maior_salario}")

# ====================================
# 3. REFERÊNCIAS (Similar a ponteiros)
# ====================================

def exemplo_referencias_simples():
    """Demonstra como funcionam referências em Python"""
    print("\n=== REFERÊNCIAS ===")
    
    # Lista original
    lista_original = [1, 2, 3, 4, 5]                    # O(n) - criação
    print(f"Lista original: {lista_original}")
    
    # Referência (como ponteiro)
    lista_ref = lista_original                           # O(1) - cópia de referência
    print(f"Referência: {lista_ref}")
    
    # Modificação via referência - O(1)
    lista_ref[2] = 999                                   # O(1) - alteração por índice
    print(f"Após alterar via referência:")
    print(f"Lista original: {lista_original}")          # Mudou também!
    print(f"Referência: {lista_ref}")
    
    # Demonstrar que são o mesmo objeto
    print(f"São o mesmo objeto? {lista_original is lista_ref}")  # O(1) - comparação de identidade

def trocar_valores_funcao(lista: List[int], pos1: int, pos2: int):
    """Troca valores em posições específicas - O(1)"""
    print(f"Antes da troca: {lista}")
    
    # Troca usando tupla (Pythônico) - O(1)
    lista[pos1], lista[pos2] = lista[pos2], lista[pos1] # O(1) - troca atômica
    
    print(f"Após a troca: {lista}")

def exemplo_mutabilidade():
    """Demonstra mutabilidade vs imutabilidade"""
    print("\n=== MUTABILIDADE ===")
    
    # Lista mutável
    numeros = [1, 2, 3]                                  # O(1) - lista pequena
    numeros_ref = numeros                                # O(1) - referência
    
    numeros.append(4)                                    # O(1) - adiciona elemento
    print(f"Lista após append: {numeros}")
    print(f"Referência também mudou: {numeros_ref}")
    
    # String imutável
    texto = "Hello"                                      # O(1) - string pequena
    texto_ref = texto                                    # O(1) - referência
    
    texto = texto + " World"                             # O(n) - cria nova string
    print(f"String após concatenação: '{texto}'")
    print(f"Referência não mudou: '{texto_ref}'")

# ====================================
# 4. DICIONÁRIOS (Hash Tables)
# ====================================

def exemplo_dicionario_simples():
    """Dicionário como hash table"""
    print("\n=== DICIONÁRIO (HASH TABLE) ===")
    
    # Criação - O(n)
    funcionarios = {                                     # O(n) - n pares chave-valor
        "001": "Ana Silva",                              # O(1) - cada inserção
        "002": "João Santos", 
        "003": "Maria Oliveira"
    }
    
    # Acesso - O(1) médio
    codigo = "002"
    if codigo in funcionarios:                           # O(1) - verificação de chave
        nome = funcionarios[codigo]                      # O(1) - acesso por chave
        print(f"Funcionário {codigo}: {nome}")
    
    # Inserção - O(1) médio
    funcionarios["004"] = "Pedro Costa"                  # O(1) - nova entrada
    print(f"Dicionário após inserção: {funcionarios}")
    
    # Iteração - O(n)
    print("Todos os funcionários:")
    for codigo, nome in funcionarios.items():           # O(n) - percorre todos
        print(f"  {codigo}: {nome}")                    # O(1) - impressão

# ====================================
# 5. MEDIÇÃO DE PERFORMANCE
# ====================================

def medir_performance_busca():
    """Compare busca em lista vs dicionário"""
    print("\n=== COMPARAÇÃO DE PERFORMANCE ===")
    
    tamanho = 10000
    
    # Criar lista grande - O(n)
    lista_grande = list(range(tamanho))                  # O(n) - lista com n elementos
    
    # Criar dicionário grande - O(n)
    dict_grande = {i: f"valor_{i}" for i in range(tamanho)}  # O(n) - n inserções
    
    # Busca na lista - O(n)
    inicio = time.time()                                 # O(1) - marca tempo
    resultado_lista = 9999 in lista_grande              # O(n) - busca linear
    tempo_lista = time.time() - inicio                  # O(1) - calcula tempo
    
    # Busca no dicionário - O(1)
    inicio = time.time()                                 # O(1) - marca tempo
    resultado_dict = 9999 in dict_grande               # O(1) - busca hash
    tempo_dict = time.time() - inicio                   # O(1) - calcula tempo
    
    print(f"Busca em lista de {tamanho} elementos:")
    print(f"  Resultado: {resultado_lista}")
    print(f"  Tempo: {tempo_lista:.6f} segundos")
    
    print(f"Busca em dicionário de {tamanho} elementos:")
    print(f"  Resultado: {resultado_dict}")
    print(f"  Tempo: {tempo_dict:.6f} segundos")
    
    if tempo_lista > 0 and tempo_dict > 0:
        speedup = tempo_lista / tempo_dict
        print(f"  Dicionário é {speedup:.1f}x mais rápido!")

# ====================================
# FUNÇÃO PRINCIPAL
# ====================================

def main():
    """Executa todos os exemplos"""
    print("DEMONSTRAÇÃO DE ESTRUTURAS DE DADOS EM PYTHON")
    print("=" * 50)
    
    inicio_programa = time.time()                        # O(1) - marca início
    
    # Executar exemplos
    exemplo_lista_basica()                               # O(n) - listas
    operacoes_lista_simples()                            # O(n) - operações
    exemplo_classe_simples()                             # O(1) - classes
    exemplo_lista_objetos()                              # O(n) - lista de objetos
    exemplo_referencias_simples()                        # O(n) - referências
    
    # Teste de troca
    print("\n=== TESTE DE TROCA ===")
    minha_lista = [10, 20, 30, 40, 50]                  # O(1) - lista pequena
    trocar_valores_funcao(minha_lista, 1, 3)             # O(1) - troca
    
    exemplo_mutabilidade()                               # O(n) - strings
    exemplo_dicionario_simples()                         # O(n) - dicionários
    medir_performance_busca()                            # O(n) - comparação
    
    tempo_total = time.time() - inicio_programa          # O(1) - calcula tempo
    
    print("\n" + "=" * 50)
    print(f"Tempo total de execução: {tempo_total:.6f} segundos")
    print("Programa finalizado com sucesso!")

if __name__ == "__main__":
    main()

"""
RESUMO DE COMPLEXIDADES EM PYTHON:

Listas:
- Acesso por índice: O(1)
- Busca: O(n)
- Append: O(1) amortizado
- Insert no meio: O(n)
- Pop do final: O(1)
- Pop do meio: O(n)

Dicionários:
- Acesso por chave: O(1) médio
- Inserção: O(1) médio
- Remoção: O(1) médio
- Busca de chave: O(1) médio

Classes/Objetos:
- Acesso a atributo: O(1)
- Criação: O(1) + complexidade do construtor
- Método simples: O(1)

Strings (Imutáveis):
- Acesso por índice: O(1)
- Concatenação: O(n) - cria nova string
- Busca: O(n)

Principais diferenças do C:
- Python gerencia memória automaticamente
- Não há ponteiros explícitos, apenas referências
- Listas são dinâmicas por padrão
- Dicionários são hash tables built-in eficientes
"""
