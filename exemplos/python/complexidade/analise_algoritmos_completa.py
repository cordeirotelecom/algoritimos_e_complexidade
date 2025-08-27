"""
REVISÃO COMPLETA: ANÁLISE DE ALGORITMOS E ESTRUTURAS DE DADOS
Exemplos práticos em Python com análise passo a passo

Este arquivo demonstra:
1. Todas as classes de complexidade O(1), O(log n), O(n), O(n²), etc.
2. Estruturas homogêneas, heterogêneas e referências
3. Comparações práticas de performance
4. Problemas computacionais reais
5. Análise matemática detalhada
"""

import time
import random
import math
import matplotlib.pyplot as plt
import numpy as np
from typing import List, Tuple, Dict, Any, Optional
from dataclasses import dataclass
from collections import defaultdict

# ========================================
# ESTRUTURAS DE DADOS HETEROGÊNEAS
# ========================================

@dataclass
class Pessoa:
    """Exemplo de estrutura heterogênea usando dataclass"""
    nome: str           # String
    idade: int          # Inteiro
    salario: float      # Ponto flutuante
    ativo: bool         # Booleano
    habilidades: List[str]  # Lista (estrutura dinâmica)

@dataclass
class ResultadoAnalise:
    """Estrutura para armazenar resultados de análise"""
    algoritmo: str
    tamanho_entrada: int
    operacoes: int
    tempo_ms: float
    complexidade: str

# ========================================
# ALGORITMOS O(1) - TEMPO CONSTANTE
# ========================================

def acessar_elemento(arr: List[int], indice: int) -> int:
    """Acesso direto a elemento - sempre O(1)"""
    return arr[indice]  # Sempre 1 operação

def calcular_area_circulo(raio: float) -> float:
    """Cálculo matemático - sempre O(1)"""
    return math.pi * raio * raio  # Sempre 2 operações

def eh_par(numero: int) -> bool:
    """Verificação simples - sempre O(1)"""
    return numero % 2 == 0  # Sempre 1 operação

def get_first_last(arr: List[int]) -> Tuple[int, int]:
    """Acesso aos extremos - sempre O(1)"""
    return arr[0], arr[-1]  # Python otimiza acesso ao final

def demonstrar_o1():
    """Demonstra comportamento O(1) com arrays de tamanhos diferentes"""
    print("=== DEMONSTRAÇÃO O(1) - TEMPO CONSTANTE ===")
    
    # Arrays de tamanhos muito diferentes
    pequeno = list(range(10))
    grande = list(range(100000))
    
    # Teste 1: Acesso por índice
    inicio = time.perf_counter()
    valor1 = acessar_elemento(pequeno, 5)
    tempo1 = (time.perf_counter() - inicio) * 1000
    
    inicio = time.perf_counter()
    valor2 = acessar_elemento(grande, 50000)
    tempo2 = (time.perf_counter() - inicio) * 1000
    
    print(f"Acesso lista[10]:     {valor1} em {tempo1:.6f} ms")
    print(f"Acesso lista[100000]: {valor2} em {tempo2:.6f} ms")
    
    # Teste 2: Operações matemáticas
    inicio = time.perf_counter()
    area1 = calcular_area_circulo(5.0)
    tempo3 = (time.perf_counter() - inicio) * 1000
    
    inicio = time.perf_counter()
    area2 = calcular_area_circulo(50000.0)
    tempo4 = (time.perf_counter() - inicio) * 1000
    
    print(f"Cálculo área r=5:     {area1:.2f} em {tempo3:.6f} ms")
    print(f"Cálculo área r=50000: {area2:.2f} em {tempo4:.6f} ms")
    print("Conclusão: Tempo constante independente do tamanho!\n")

# ========================================
# ALGORITMOS O(log n) - LOGARÍTMICO
# ========================================

def busca_binaria(arr: List[int], alvo: int) -> Tuple[int, int]:
    """
    Busca binária clássica - O(log n)
    Retorna: (índice_encontrado, número_de_operações)
    """
    esquerda, direita = 0, len(arr) - 1
    operacoes = 0
    
    while esquerda <= direita:
        operacoes += 1
        meio = (esquerda + direita) // 2
        
        if arr[meio] == alvo:
            return meio, operacoes
        elif arr[meio] < alvo:
            esquerda = meio + 1
        else:
            direita = meio - 1
    
    return -1, operacoes

def busca_binaria_recursiva(arr: List[int], alvo: int, esquerda: int = 0, 
                          direita: int = None, operacoes: int = 0) -> Tuple[int, int]:
    """Versão recursiva da busca binária"""
    if direita is None:
        direita = len(arr) - 1
    
    operacoes += 1
    
    if esquerda > direita:
        return -1, operacoes
    
    meio = (esquerda + direita) // 2
    
    if arr[meio] == alvo:
        return meio, operacoes
    elif arr[meio] < alvo:
        return busca_binaria_recursiva(arr, alvo, meio + 1, direita, operacoes)
    else:
        return busca_binaria_recursiva(arr, alvo, esquerda, meio - 1, operacoes)

def demonstrar_olog_n():
    """Demonstra crescimento logarítmico"""
    print("=== DEMONSTRAÇÃO O(log n) - LOGARÍTMICO ===")
    
    tamanhos = [100, 1000, 10000, 100000, 1000000]
    
    print("| Tamanho | Operações | Log₂(n) Teórico | Diferença |")
    print("|---------|-----------|-----------------|-----------|")
    
    for tamanho in tamanhos:
        # Cria array ordenado
        arr = list(range(0, tamanho * 2, 2))  # 0, 2, 4, 6, 8...
        
        # Busca elemento no meio
        alvo = tamanho  # Aproximadamente no meio
        _, operacoes = busca_binaria(arr, alvo)
        
        log_teorico = math.log2(tamanho)
        diferenca = abs(operacoes - log_teorico)
        
        print(f"| {tamanho:7d} | {operacoes:9d} | {log_teorico:13.1f} | {diferenca:7.1f} |")
    
    print("\nComparação Recursiva vs Iterativa:")
    arr = list(range(0, 10000, 2))
    alvo = 5000
    
    # Versão iterativa
    inicio = time.perf_counter()
    _, ops_iter = busca_binaria(arr, alvo)
    tempo_iter = (time.perf_counter() - inicio) * 1000
    
    # Versão recursiva
    inicio = time.perf_counter()
    _, ops_rec = busca_binaria_recursiva(arr, alvo)
    tempo_rec = (time.perf_counter() - inicio) * 1000
    
    print(f"Iterativa: {ops_iter} operações em {tempo_iter:.6f} ms")
    print(f"Recursiva: {ops_rec} operações em {tempo_rec:.6f} ms")
    print("Observação: Ambas O(log n), recursiva usa mais memória!\n")

# ========================================
# ALGORITMOS O(n) - LINEAR
# ========================================

def busca_linear(arr: List[int], alvo: int) -> Tuple[int, int]:
    """Busca linear simples - O(n)"""
    operacoes = 0
    
    for i, elemento in enumerate(arr):
        operacoes += 1
        if elemento == alvo:
            return i, operacoes
    
    return -1, operacoes

def encontrar_maior(arr: List[int]) -> Tuple[int, int]:
    """Encontra maior elemento - O(n)"""
    if not arr:
        return None, 0
    
    maior = arr[0]
    operacoes = 1
    
    for elemento in arr[1:]:
        operacoes += 1
        if elemento > maior:
            maior = elemento
    
    return maior, operacoes

def contar_ocorrencias(arr: List[int], alvo: int) -> Tuple[int, int]:
    """Conta ocorrências de um elemento - O(n)"""
    contador = 0
    operacoes = 0
    
    for elemento in arr:
        operacoes += 1
        if elemento == alvo:
            contador += 1
    
    return contador, operacoes

def filtrar_pares(arr: List[int]) -> Tuple[List[int], int]:
    """Filtra números pares - O(n)"""
    pares = []
    operacoes = 0
    
    for numero in arr:
        operacoes += 1
        if numero % 2 == 0:
            pares.append(numero)
    
    return pares, operacoes

def demonstrar_on():
    """Demonstra crescimento linear"""
    print("=== DEMONSTRAÇÃO O(n) - LINEAR ===")
    
    tamanhos = [1000, 5000, 10000, 50000, 100000]
    
    print("| Tamanho | Busca Linear | Encontrar Maior | Contar Pares |")
    print("|---------|--------------|-----------------|--------------|")
    
    for tamanho in tamanhos:
        # Cria array com valores aleatórios
        arr = [random.randint(1, 1000) for _ in range(tamanho)]
        
        # Teste 1: Busca linear (pior caso - elemento não existe)
        inicio = time.perf_counter()
        _, ops_busca = busca_linear(arr, -1)  # Elemento inexistente
        tempo_busca = (time.perf_counter() - inicio) * 1000
        
        # Teste 2: Encontrar maior
        inicio = time.perf_counter()
        _, ops_maior = encontrar_maior(arr)
        tempo_maior = (time.perf_counter() - inicio) * 1000
        
        # Teste 3: Filtrar pares
        inicio = time.perf_counter()
        _, ops_pares = filtrar_pares(arr)
        tempo_pares = (time.perf_counter() - inicio) * 1000
        
        print(f"| {tamanho:7d} | {ops_busca:4d} ({tempo_busca:5.2f}ms) | "
              f"{ops_maior:4d} ({tempo_maior:5.2f}ms) | "
              f"{ops_pares:4d} ({tempo_pares:5.2f}ms) |")
    
    print("Observação: Operações crescem proporcionalmente a n!\n")

# ========================================
# ALGORITMOS O(n²) - QUADRÁTICO
# ========================================

def bubble_sort(arr: List[int]) -> Tuple[List[int], int, int]:
    """Bubble sort clássico - O(n²)"""
    arr_copia = arr.copy()
    n = len(arr_copia)
    operacoes = 0
    trocas = 0
    
    for i in range(n):
        for j in range(0, n - 1 - i):
            operacoes += 1  # Comparação
            if arr_copia[j] > arr_copia[j + 1]:
                arr_copia[j], arr_copia[j + 1] = arr_copia[j + 1], arr_copia[j]
                trocas += 1
    
    return arr_copia, operacoes, trocas

def selection_sort(arr: List[int]) -> Tuple[List[int], int, int]:
    """Selection sort - O(n²)"""
    arr_copia = arr.copy()
    n = len(arr_copia)
    operacoes = 0
    trocas = 0
    
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            operacoes += 1
            if arr_copia[j] < arr_copia[min_idx]:
                min_idx = j
        
        if min_idx != i:
            arr_copia[i], arr_copia[min_idx] = arr_copia[min_idx], arr_copia[i]
            trocas += 1
    
    return arr_copia, operacoes, trocas

def encontrar_todos_pares_soma(arr: List[int], soma_alvo: int) -> Tuple[List[Tuple[int, int]], int]:
    """Encontra todos os pares que somam um valor - O(n²)"""
    pares = []
    operacoes = 0
    
    for i in range(len(arr)):
        for j in range(i + 1, len(arr)):
            operacoes += 1
            if arr[i] + arr[j] == soma_alvo:
                pares.append((arr[i], arr[j]))
    
    return pares, operacoes

def matriz_multiplicacao(A: List[List[int]], B: List[List[int]]) -> Tuple[List[List[int]], int]:
    """Multiplicação de matrizes - O(n³) mas demonstramos O(n²) para uma linha"""
    if len(A[0]) != len(B):
        raise ValueError("Dimensões incompatíveis")
    
    linhas_A, colunas_A = len(A), len(A[0])
    linhas_B, colunas_B = len(B), len(B[0])
    
    resultado = [[0 for _ in range(colunas_B)] for _ in range(linhas_A)]
    operacoes = 0
    
    # Calcula apenas a primeira linha para demonstrar O(n²)
    for j in range(colunas_B):
        for k in range(colunas_A):
            operacoes += 1
            resultado[0][j] += A[0][k] * B[k][j]
    
    return resultado, operacoes

def demonstrar_on2():
    """Demonstra crescimento quadrático"""
    print("=== DEMONSTRAÇÃO O(n²) - QUADRÁTICO ===")
    
    tamanhos = [100, 200, 500, 1000, 2000]  # Menores para O(n²)
    
    print("| Tamanho | Bubble Sort | Selection Sort | Pares Soma | Teórico n² |")
    print("|---------|-------------|----------------|------------|------------|")
    
    for tamanho in tamanhos:
        # Array em ordem reversa (pior caso para ordenação)
        arr = list(range(tamanho, 0, -1))
        
        # Teste 1: Bubble Sort
        inicio = time.perf_counter()
        _, ops_bubble, _ = bubble_sort(arr)
        tempo_bubble = (time.perf_counter() - inicio) * 1000
        
        # Teste 2: Selection Sort
        inicio = time.perf_counter()
        _, ops_selection, _ = selection_sort(arr)
        tempo_selection = (time.perf_counter() - inicio) * 1000
        
        # Teste 3: Encontrar pares (array menor para performance)
        arr_pequeno = [random.randint(1, 50) for _ in range(min(tamanho, 500))]
        inicio = time.perf_counter()
        _, ops_pares = encontrar_todos_pares_soma(arr_pequeno, 50)
        tempo_pares = (time.perf_counter() - inicio) * 1000
        
        teorico_n2 = tamanho * tamanho // 4  # Aproximação
        
        print(f"| {tamanho:7d} | {ops_bubble:6d} ({tempo_bubble:5.1f}ms) | "
              f"{ops_selection:6d} ({tempo_selection:4.1f}ms) | "
              f"{ops_pares:4d} ({tempo_pares:4.1f}ms) | {teorico_n2:8d} |")
    
    print("Observação: Tempo cresce quadraticamente com n!\n")

# ========================================
# ESTRUTURAS COM REFERÊNCIAS (PONTEIROS)
# ========================================

class No:
    """Nó para lista ligada"""
    def __init__(self, dados: Any):
        self.dados = dados
        self.proximo: Optional['No'] = None

class ListaLigada:
    """Lista ligada simples"""
    def __init__(self):
        self.inicio: Optional[No] = None
        self.tamanho = 0
    
    def inserir_inicio(self, valor: Any) -> None:
        """Inserir no início - O(1)"""
        novo = No(valor)
        novo.proximo = self.inicio
        self.inicio = novo
        self.tamanho += 1
    
    def buscar(self, valor: Any) -> Tuple[Optional[No], int]:
        """Buscar elemento - O(n)"""
        atual = self.inicio
        operacoes = 0
        
        while atual is not None:
            operacoes += 1
            if atual.dados == valor:
                return atual, operacoes
            atual = atual.proximo
        
        return None, operacoes
    
    def remover(self, valor: Any) -> Tuple[bool, int]:
        """Remover elemento - O(n)"""
        if self.inicio is None:
            return False, 0
        
        operacoes = 1
        
        # Se é o primeiro elemento
        if self.inicio.dados == valor:
            self.inicio = self.inicio.proximo
            self.tamanho -= 1
            return True, operacoes
        
        atual = self.inicio
        while atual.proximo is not None:
            operacoes += 1
            if atual.proximo.dados == valor:
                atual.proximo = atual.proximo.proximo
                self.tamanho -= 1
                return True, operacoes
            atual = atual.proximo
        
        return False, operacoes
    
    def para_lista(self) -> List[Any]:
        """Converte para lista Python"""
        resultado = []
        atual = self.inicio
        while atual is not None:
            resultado.append(atual.dados)
            atual = atual.proximo
        return resultado

def demonstrar_referencias():
    """Demonstra uso de referências e estruturas dinâmicas"""
    print("=== DEMONSTRAÇÃO REFERÊNCIAS E LISTAS LIGADAS ===")
    
    # Cria lista ligada
    lista = ListaLigada()
    
    # Insere elementos
    print("Inserindo elementos 10, 20, 30, 40, 50...")
    for valor in [10, 20, 30, 40, 50]:
        lista.inserir_inicio(valor)
    
    print(f"Lista: {lista.para_lista()}")
    print(f"Tamanho: {lista.tamanho}")
    
    # Testa busca
    print("\nTestando busca:")
    valores_busca = [10, 30, 50, 99]
    
    for valor in valores_busca:
        no, operacoes = lista.buscar(valor)
        if no:
            print(f"Valor {valor} encontrado após {operacoes} operações")
        else:
            print(f"Valor {valor} NÃO encontrado após {operacoes} operações")
    
    # Comparação de performance: Lista vs Array
    print("\nComparação Performance Lista Ligada vs Array Python:")
    
    tamanhos = [1000, 5000, 10000]
    for tamanho in tamanhos:
        # Prepara dados
        dados = list(range(tamanho))
        
        # Lista Python (array dinâmico)
        inicio = time.perf_counter()
        array_python = dados.copy()
        tempo_array = (time.perf_counter() - inicio) * 1000
        
        # Lista ligada
        inicio = time.perf_counter()
        lista_ligada = ListaLigada()
        for item in dados:
            lista_ligada.inserir_inicio(item)
        tempo_lista = (time.perf_counter() - inicio) * 1000
        
        print(f"n={tamanho:5d}: Array {tempo_array:6.2f}ms | Lista Ligada {tempo_lista:6.2f}ms")
    
    print("\nVantagens e Desvantagens:")
    print("ARRAY (Lista Python):")
    print("  + Acesso O(1) por índice")
    print("  + Memória contígua (melhor cache)")
    print("  + Menos overhead por elemento")
    print("  - Inserção no meio O(n)")
    print("  - Tamanho fixo (realocação custosa)")
    
    print("LISTA LIGADA:")
    print("  + Inserção O(1) no início")
    print("  + Tamanho dinâmico flexível")
    print("  + Inserção/remoção eficiente")
    print("  - Acesso sequencial O(n)")
    print("  - Overhead de ponteiros")
    print("  - Fragmentação de memória\n")

# ========================================
# ESTRUTURAS HOMOGÊNEAS vs HETEROGÊNEAS
# ========================================

def demonstrar_estruturas():
    """Demonstra estruturas homogêneas vs heterogêneas"""
    print("=== DEMONSTRAÇÃO ESTRUTURAS HOMOGÊNEAS vs HETEROGÊNEAS ===")
    
    # Estrutura HOMOGÊNEA - Lista de números
    print("1. ESTRUTURA HOMOGÊNEA (Lista de inteiros):")
    notas_homogenea = [85, 90, 78, 92, 88]
    
    print(f"   Notas: {notas_homogenea}")
    print(f"   Tipo: Todos elementos são 'int'")
    print(f"   Operações matemáticas diretas:")
    print(f"   Média: {sum(notas_homogenea) / len(notas_homogenea):.1f}")
    print(f"   Máximo: {max(notas_homogenea)}")
    print(f"   Mínimo: {min(notas_homogenea)}")
    
    # Estrutura HETEROGÊNEA - Objeto Pessoa
    print("\n2. ESTRUTURA HETEROGÊNEA (Classe Pessoa):")
    aluno = Pessoa(
        nome="João Silva",
        idade=20,
        salario=1500.50,
        ativo=True,
        habilidades=["Python", "JavaScript", "SQL"]
    )
    
    print(f"   Nome: {aluno.nome}")
    print(f"   Idade: {aluno.idade} anos")
    print(f"   Salário: R$ {aluno.salario:.2f}")
    print(f"   Ativo: {'Sim' if aluno.ativo else 'Não'}")
    print(f"   Habilidades: {', '.join(aluno.habilidades)}")
    print(f"   Tipos: str, int, float, bool, List[str]")
    
    # Lista de estruturas heterogêneas
    print("\n3. LISTA DE ESTRUTURAS HETEROGÊNEAS:")
    turma = [
        Pessoa("Ana Costa", 19, 1200.00, True, ["Python", "C++"]),
        Pessoa("Carlos Lima", 21, 1800.75, False, ["Java", "Spring"]),
        Pessoa("Maria Santos", 20, 1400.25, True, ["JavaScript", "React", "Node.js"])
    ]
    
    print(f"   Turma com {len(turma)} alunos:")
    for i, pessoa in enumerate(turma):
        status = "Ativo" if pessoa.ativo else "Inativo"
        print(f"   [{i}] {pessoa.nome}, {pessoa.idade} anos, "
              f"R$ {pessoa.salario:.2f}, {status}")
        print(f"       Habilidades: {len(pessoa.habilidades)} -> {pessoa.habilidades}")
    
    # Análise da turma
    print("\n4. ANÁLISES COMPLEXAS COM ESTRUTURAS HETEROGÊNEAS:")
    
    # Média de idades
    idades = [p.idade for p in turma]
    print(f"   Média de idade: {sum(idades) / len(idades):.1f} anos")
    
    # Salário total dos ativos
    salario_ativos = sum(p.salario for p in turma if p.ativo)
    print(f"   Salário total (ativos): R$ {salario_ativos:.2f}")
    
    # Habilidades mais comuns
    todas_habilidades = []
    for pessoa in turma:
        todas_habilidades.extend(pessoa.habilidades)
    
    contador_habilidades = defaultdict(int)
    for habilidade in todas_habilidades:
        contador_habilidades[habilidade] += 1
    
    print("   Habilidades mais comuns:")
    for habilidade, count in sorted(contador_habilidades.items(), 
                                  key=lambda x: x[1], reverse=True):
        print(f"     {habilidade}: {count} pessoa(s)")
    
    # Demonstração de flexibilidade
    print("\n5. FLEXIBILIDADE DAS ESTRUTURAS:")
    
    # Homogênea: operações matemáticas simples
    numeros = [1, 2, 3, 4, 5]
    dobrados = [x * 2 for x in numeros]  # Fácil transformação
    print(f"   Homogênea - Dobrar valores: {numeros} -> {dobrados}")
    
    # Heterogênea: operações complexas personalizadas
    def calcular_bonus(pessoa: Pessoa) -> float:
        """Calcula bônus baseado em idade e habilidades"""
        base = pessoa.salario * 0.1
        bonus_idade = (pessoa.idade - 18) * 50
        bonus_habilidades = len(pessoa.habilidades) * 100
        return base + bonus_idade + bonus_habilidades if pessoa.ativo else 0
    
    print("   Heterogênea - Cálculo de bônus personalizado:")
    for pessoa in turma:
        bonus = calcular_bonus(pessoa)
        print(f"     {pessoa.nome}: R$ {bonus:.2f}")
    
    print("\nConclusão:")
    print("HOMOGÊNEAS: Simples, eficientes, operações matemáticas diretas")
    print("HETEROGÊNEAS: Complexas, flexíveis, modelam entidades reais\n")

# ========================================
# ANÁLISE COMPARATIVA VISUAL
# ========================================

def gerar_grafico_complexidade():
    """Gera gráfico comparando diferentes complexidades"""
    print("=== GERANDO ANÁLISE VISUAL DE COMPLEXIDADE ===")
    
    # Valores de n para plotar
    n_values = np.arange(1, 101)
    
    # Calcula diferentes complexidades
    o1 = np.ones_like(n_values)  # O(1)
    o_log_n = np.log2(n_values)  # O(log n)
    o_n = n_values               # O(n)
    o_n_log_n = n_values * np.log2(n_values)  # O(n log n)
    o_n2 = n_values ** 2         # O(n²)
    o_2n = 2 ** (n_values / 10)  # O(2^n) - escala reduzida
    
    # Cria o gráfico
    plt.figure(figsize=(12, 8))
    
    plt.plot(n_values, o1, label='O(1)', linewidth=2, color='green')
    plt.plot(n_values, o_log_n, label='O(log n)', linewidth=2, color='blue')
    plt.plot(n_values, o_n, label='O(n)', linewidth=2, color='orange')
    plt.plot(n_values, o_n_log_n, label='O(n log n)', linewidth=2, color='purple')
    plt.plot(n_values, o_n2, label='O(n²)', linewidth=2, color='red')
    plt.plot(n_values[:30], o_2n[:30], label='O(2ⁿ)', linewidth=2, color='black')
    
    plt.xlabel('Tamanho da entrada (n)', fontsize=12)
    plt.ylabel('Número de operações', fontsize=12)
    plt.title('Comparação de Complexidades Algorítmicas', fontsize=14, fontweight='bold')
    plt.legend(fontsize=11)
    plt.grid(True, alpha=0.3)
    plt.yscale('log')  # Escala logarítmica para visualizar melhor
    
    # Adiciona anotações
    plt.annotate('Excelente', xy=(80, 1), xytext=(85, 2),
                arrowprops=dict(arrowstyle='->', color='green'),
                fontsize=10, color='green')
    
    plt.annotate('Impraticável\npara n > 30', xy=(25, o_2n[24]), xytext=(40, 1000),
                arrowprops=dict(arrowstyle='->', color='red'),
                fontsize=10, color='red')
    
    plt.tight_layout()
    plt.savefig('complexidade_algoritmos.png', dpi=300, bbox_inches='tight')
    plt.show()
    
    print("Gráfico salvo como 'complexidade_algoritmos.png'")

def executar_benchmark_completo():
    """Executa benchmark completo comparando todas as complexidades"""
    print("=== BENCHMARK COMPLETO DE COMPLEXIDADES ===")
    
    resultados = []
    
    # Testa diferentes tamanhos
    tamanhos = [100, 500, 1000, 5000, 10000]
    
    for tamanho in tamanhos:
        print(f"\nTestando com n = {tamanho}")
        
        # Prepara dados
        arr_ordenado = list(range(tamanho))
        arr_desordenado = list(range(tamanho))
        random.shuffle(arr_desordenado)
        
        # Teste O(1) - Acesso direto
        inicio = time.perf_counter()
        _ = acessar_elemento(arr_ordenado, tamanho // 2)
        tempo_o1 = (time.perf_counter() - inicio) * 1000
        
        # Teste O(log n) - Busca binária
        inicio = time.perf_counter()
        _, ops_log = busca_binaria(arr_ordenado, tamanho // 2)
        tempo_log = (time.perf_counter() - inicio) * 1000
        
        # Teste O(n) - Busca linear
        inicio = time.perf_counter()
        _, ops_n = busca_linear(arr_desordenado, tamanho - 1)  # Pior caso
        tempo_n = (time.perf_counter() - inicio) * 1000
        
        # Teste O(n²) - Bubble sort (apenas para tamanhos menores)
        if tamanho <= 2000:
            arr_copia = arr_desordenado.copy()
            inicio = time.perf_counter()
            _, ops_n2, _ = bubble_sort(arr_copia)
            tempo_n2 = (time.perf_counter() - inicio) * 1000
        else:
            ops_n2, tempo_n2 = "N/A", "N/A"
        
        # Armazena resultados
        resultados.extend([
            ResultadoAnalise("Acesso O(1)", tamanho, 1, tempo_o1, "O(1)"),
            ResultadoAnalise("Busca Binária", tamanho, ops_log, tempo_log, "O(log n)"),
            ResultadoAnalise("Busca Linear", tamanho, ops_n, tempo_n, "O(n)"),
        ])
        
        if tempo_n2 != "N/A":
            resultados.append(
                ResultadoAnalise("Bubble Sort", tamanho, ops_n2, tempo_n2, "O(n²)")
            )
        
        print(f"  O(1):     {tempo_o1:8.4f} ms")
        print(f"  O(log n): {tempo_log:8.4f} ms ({ops_log} ops)")
        print(f"  O(n):     {tempo_n:8.4f} ms ({ops_n} ops)")
        if tempo_n2 != "N/A":
            print(f"  O(n²):    {tempo_n2:8.4f} ms ({ops_n2} ops)")
    
    return resultados

def demonstrar_trade_offs():
    """Demonstra trade-offs importantes na escolha de algoritmos"""
    print("=== DEMONSTRAÇÃO DE TRADE-OFFS ===")
    
    print("1. MEMÓRIA vs TEMPO:")
    
    # Exemplo: Busca em array vs hash table (dict)
    tamanho = 10000
    dados = list(range(tamanho))
    
    # Array: O(n) busca, pouca memória
    inicio = time.perf_counter()
    _, ops_array = busca_linear(dados, tamanho - 1)
    tempo_array = (time.perf_counter() - inicio) * 1000
    memoria_array = len(dados) * 4  # Aproximação: 4 bytes por int
    
    # Hash table: O(1) busca, mais memória
    dict_dados = {v: i for i, v in enumerate(dados)}
    inicio = time.perf_counter()
    _ = dict_dados.get(tamanho - 1, -1)
    tempo_dict = (time.perf_counter() - inicio) * 1000
    memoria_dict = len(dict_dados) * 8  # Aproximação: overhead do dict
    
    print(f"Array:  {tempo_array:6.2f}ms, ~{memoria_array:6d} bytes, {ops_array} operações")
    print(f"Dict:   {tempo_dict:6.2f}ms, ~{memoria_dict:6d} bytes, 1 operação")
    print(f"Trade-off: Dict usa {memoria_dict/memoria_array:.1f}x mais memória")
    
    print("\n2. SIMPLICIDADE vs PERFORMANCE:")
    
    # Ordenação: Bubble sort vs Python sort
    arr_test = [random.randint(1, 1000) for _ in range(1000)]
    
    # Bubble sort: simples, O(n²)
    inicio = time.perf_counter()
    _, ops_bubble, _ = bubble_sort(arr_test.copy())
    tempo_bubble = (time.perf_counter() - inicio) * 1000
    
    # Python sort: complexo, O(n log n)
    inicio = time.perf_counter()
    sorted(arr_test)
    tempo_python = (time.perf_counter() - inicio) * 1000
    
    print(f"Bubble Sort: {tempo_bubble:6.2f}ms, ~{ops_bubble} operações, simples")
    print(f"Python Sort: {tempo_python:6.2f}ms, ~{len(arr_test) * math.log2(len(arr_test)):.0f} operações, complexo")
    print(f"Speedup: {tempo_bubble/tempo_python:.1f}x mais rápido")
    
    print("\n3. QUANDO USAR CADA COMPLEXIDADE:")
    print("O(1):     Sempre preferível quando possível")
    print("O(log n): Excelente até milhões de elementos")
    print("O(n):     Bom até centenas de milhares")
    print("O(n log n): Aceitável para ordenação até milhões")
    print("O(n²):    Apenas para n < 1000, ou problemas pequenos")
    print("O(2ⁿ):    Apenas para n < 30, problemas exponenciais")

# ========================================
# FUNÇÃO PRINCIPAL
# ========================================

def main():
    """Executa todas as demonstrações"""
    print("🔍 REVISÃO COMPLETA: ANÁLISE DE ALGORITMOS E ESTRUTURAS DE DADOS")
    print("=" * 70)
    print()
    
    # Configura matplotlib para melhor visualização
    plt.style.use('default')
    
    # Executa todas as demonstrações
    demonstrar_o1()
    demonstrar_olog_n()
    demonstrar_on()
    demonstrar_on2()
    demonstrar_referencias()
    demonstrar_estruturas()
    demonstrar_trade_offs()
    
    # Executa benchmark completo
    resultados = executar_benchmark_completo()
    
    # Gera gráfico de complexidade
    try:
        gerar_grafico_complexidade()
    except ImportError:
        print("Matplotlib não disponível - pulando geração de gráficos")
    
    print("\n🎯 RESUMO FINAL:")
    print("=" * 50)
    print("✅ O(1): Tempo constante - acesso direto, operações matemáticas")
    print("✅ O(log n): Logarítmico - busca binária, árvores balanceadas")
    print("✅ O(n): Linear - percorrer dados, busca simples")
    print("✅ O(n log n): Linearítmico - ordenação eficiente")
    print("✅ O(n²): Quadrático - algoritmos simples, comparações duplas")
    print("✅ O(2ⁿ): Exponencial - problemas NP, força bruta")
    
    print("\n📊 ESTRUTURAS DE DADOS:")
    print("=" * 50)
    print("✅ Homogêneas: Mesmo tipo, operações matemáticas diretas")
    print("✅ Heterogêneas: Tipos diferentes, modelagem complexa")
    print("✅ Arrays: Acesso O(1), inserção O(n)")
    print("✅ Listas Ligadas: Inserção O(1), acesso O(n)")
    print("✅ Hash Tables: Busca O(1), mais memória")
    
    print("\n💡 PRINCÍPIOS FUNDAMENTAIS:")
    print("=" * 50)
    print("• Analise sempre o tamanho esperado dos dados")
    print("• Considere trade-offs: tempo vs memória vs simplicidade")
    print("• O(n²) é perigoso para n > 10.000")
    print("• Busca binária exige dados ordenados")
    print("• Meça performance real, não apenas teórica")
    print("• Escolha a estrutura de dados adequada ao problema")
    
    print("\n🚀 DIRETRIZES PRÁTICAS:")
    print("=" * 50)
    print("1. Para busca frequente: use hash tables (dict)")
    print("2. Para dados ordenados: use busca binária")
    print("3. Para inserções frequentes: considere listas ligadas")
    print("4. Para cálculos matemáticos: prefira arrays numpy")
    print("5. Para problemas pequenos: simplicidade > performance")
    print("6. Para problemas grandes: otimização é crítica")
    
    print(f"\n✅ Análise completa executada com {len(resultados)} testes!")
    print("📈 Dados coletados e análise matemática validada.")

if __name__ == "__main__":
    main()
