"""
Exemplos Práticos de Estruturas de Dados - Aula 04
Implementação em Python com análise de performance
Curso: Algoritmos e Complexidade
Professor: Vagner Cordeiro
"""

from typing import TypeVar, Generic, Optional, List, Callable, Any, Iterator
from dataclasses import dataclass, field
import time
import sys
import gc
import psutil
import matplotlib.pyplot as plt
from collections import deque
import random

T = TypeVar('T')

# ========== LISTA LIGADA GENÉRICA ==========

@dataclass
class No(Generic[T]):
    """Nó da lista ligada com tipo genérico"""
    dados: T
    proximo: Optional['No[T]'] = None

class ListaLigada(Generic[T]):
    """
    Lista ligada genérica com operações otimizadas
    Suporta qualquer tipo de dado e operações funcionais
    """
    
    def __init__(self, comparador: Optional[Callable[[T, T], int]] = None):
        self._cabeca: Optional[No[T]] = None
        self._cauda: Optional[No[T]] = None
        self._tamanho: int = 0
        self._comparador = comparador or self._comparador_padrao
        
        # Cache para otimização de acessos
        self._cache_acesso: dict = {}
        self._max_cache: int = 100
        
        # Estatísticas de uso
        self._total_insercoes: int = 0
        self._total_remocoes: int = 0
        self._total_buscas: int = 0
        self._cache_hits: int = 0
        self._cache_misses: int = 0
    
    def _comparador_padrao(self, a: T, b: T) -> int:
        """Comparador padrão para tipos comparáveis"""
        if a < b:
            return -1
        elif a > b:
            return 1
        return 0
    
    def __len__(self) -> int:
        return self._tamanho
    
    def __bool__(self) -> bool:
        return self._tamanho > 0
    
    def __iter__(self) -> Iterator[T]:
        atual = self._cabeca
        while atual:
            yield atual.dados
            atual = atual.proximo
    
    def __getitem__(self, indice: int) -> T:
        """Acesso por índice com cache otimizado"""
        if not 0 <= indice < self._tamanho:
            raise IndexError(f"Índice {indice} fora do intervalo [0, {self._tamanho})")
        
        # Verifica cache primeiro
        if indice in self._cache_acesso:
            no_cacheado = self._cache_acesso[indice]
            if no_cacheado and hasattr(no_cacheado, 'dados'):
                self._cache_hits += 1
                return no_cacheado.dados
        
        self._cache_misses += 1
        
        # Busca sequencial otimizada
        atual = self._cabeca
        for _ in range(indice):
            atual = atual.proximo
        
        # Atualiza cache se há espaço
        if len(self._cache_acesso) < self._max_cache:
            self._cache_acesso[indice] = atual
        
        return atual.dados
    
    def inserir_inicio(self, item: T) -> None:
        """Inserção no início - O(1)"""
        novo_no = No(item)
        
        if self._cabeca is None:
            self._cabeca = self._cauda = novo_no
        else:
            novo_no.proximo = self._cabeca
            self._cabeca = novo_no
        
        self._tamanho += 1
        self._total_insercoes += 1
        self._invalidar_cache()
    
    def inserir_fim(self, item: T) -> None:
        """Inserção no fim - O(1) com referência da cauda"""
        novo_no = No(item)
        
        if self._cauda is None:
            self._cabeca = self._cauda = novo_no
        else:
            self._cauda.proximo = novo_no
            self._cauda = novo_no
        
        self._tamanho += 1
        self._total_insercoes += 1
    
    def inserir_ordenado(self, item: T) -> None:
        """Inserção mantendo ordem crescente"""
        if not self._cabeca or self._comparador(item, self._cabeca.dados) < 0:
            self.inserir_inicio(item)
            return
        
        if self._comparador(item, self._cauda.dados) > 0:
            self.inserir_fim(item)
            return
        
        # Busca posição correta
        anterior = None
        atual = self._cabeca
        
        while atual and self._comparador(item, atual.dados) > 0:
            anterior = atual
            atual = atual.proximo
        
        # Insere novo nó
        novo_no = No(item)
        novo_no.proximo = atual
        anterior.proximo = novo_no
        
        self._tamanho += 1
        self._total_insercoes += 1
        self._invalidar_cache()
    
    def buscar(self, item: T) -> Optional[int]:
        """Busca elemento e retorna índice ou None"""
        self._total_buscas += 1
        
        atual = self._cabeca
        indice = 0
        
        while atual:
            if self._comparador(item, atual.dados) == 0:
                return indice
            atual = atual.proximo
            indice += 1
        
        return None
    
    def remover_inicio(self) -> T:
        """Remove e retorna primeiro elemento"""
        if not self._cabeca:
            raise IndexError("Lista vazia")
        
        dados = self._cabeca.dados
        self._cabeca = self._cabeca.proximo
        
        if self._cabeca is None:
            self._cauda = None
        
        self._tamanho -= 1
        self._total_remocoes += 1
        self._invalidar_cache()
        return dados
    
    def remover_valor(self, item: T) -> bool:
        """Remove primeira ocorrência do valor"""
        if not self._cabeca:
            return False
        
        # Elemento na cabeça
        if self._comparador(item, self._cabeca.dados) == 0:
            self.remover_inicio()
            return True
        
        # Busca no resto da lista
        anterior = self._cabeca
        atual = anterior.proximo
        
        while atual:
            if self._comparador(item, atual.dados) == 0:
                anterior.proximo = atual.proximo
                
                if atual == self._cauda:
                    self._cauda = anterior
                
                self._tamanho -= 1
                self._total_remocoes += 1
                self._invalidar_cache()
                return True
            
            anterior = atual
            atual = atual.proximo
        
        return False
    
    def filtrar(self, predicado: Callable[[T], bool]) -> 'ListaLigada[T]':
        """Retorna nova lista com elementos que satisfazem predicado"""
        nova_lista = ListaLigada[T](self._comparador)
        
        for item in self:
            if predicado(item):
                nova_lista.inserir_fim(item)
        
        return nova_lista
    
    def mapear(self, funcao: Callable[[T], T]) -> 'ListaLigada[T]':
        """Aplica função a todos elementos e retorna nova lista"""
        nova_lista = ListaLigada[T](self._comparador)
        
        for item in self:
            nova_lista.inserir_fim(funcao(item))
        
        return nova_lista
    
    def reverter(self) -> None:
        """Reverte a lista in-place"""
        if self._tamanho <= 1:
            return
        
        anterior = None
        atual = self._cabeca
        self._cauda = self._cabeca  # O primeiro se torna último
        
        while atual:
            proximo = atual.proximo
            atual.proximo = anterior
            anterior = atual
            atual = proximo
        
        self._cabeca = anterior
        self._invalidar_cache()
    
    def ordenar(self) -> None:
        """Ordena a lista usando merge sort"""
        if self._tamanho <= 1:
            return
        
        self._cabeca = self._merge_sort(self._cabeca)
        
        # Atualiza referência da cauda
        atual = self._cabeca
        while atual.proximo:
            atual = atual.proximo
        self._cauda = atual
        
        self._invalidar_cache()
    
    def _merge_sort(self, cabeca: Optional[No[T]]) -> Optional[No[T]]:
        """Implementação recursiva do merge sort"""
        if not cabeca or not cabeca.proximo:
            return cabeca
        
        # Divide a lista
        meio = self._obter_meio(cabeca)
        segunda_metade = meio.proximo
        meio.proximo = None
        
        # Ordena recursivamente
        esquerda = self._merge_sort(cabeca)
        direita = self._merge_sort(segunda_metade)
        
        # Combina as metades ordenadas
        return self._merge(esquerda, direita)
    
    def _obter_meio(self, cabeca: No[T]) -> No[T]:
        """Obtém nó do meio usando dois ponteiros"""
        lento = cabeca
        rapido = cabeca
        anterior = None
        
        while rapido and rapido.proximo:
            anterior = lento
            lento = lento.proximo
            rapido = rapido.proximo.proximo
        
        return anterior
    
    def _merge(self, esquerda: Optional[No[T]], direita: Optional[No[T]]) -> Optional[No[T]]:
        """Combina duas listas ordenadas"""
        dummy = No(None)  # Nó dummy para simplificar código
        atual = dummy
        
        while esquerda and direita:
            if self._comparador(esquerda.dados, direita.dados) <= 0:
                atual.proximo = esquerda
                esquerda = esquerda.proximo
            else:
                atual.proximo = direita
                direita = direita.proximo
            atual = atual.proximo
        
        # Anexa elementos restantes
        atual.proximo = esquerda or direita
        
        return dummy.proximo
    
    def _invalidar_cache(self) -> None:
        """Limpa cache após modificações"""
        self._cache_acesso.clear()
    
    def estatisticas(self) -> dict:
        """Retorna estatísticas detalhadas da lista"""
        return {
            'tamanho': self._tamanho,
            'total_insercoes': self._total_insercoes,
            'total_remocoes': self._total_remocoes,
            'total_buscas': self._total_buscas,
            'cache_hits': self._cache_hits,
            'cache_misses': self._cache_misses,
            'taxa_cache_hit': self._cache_hits / max(self._cache_hits + self._cache_misses, 1),
            'memoria_aproximada_bytes': self._calcular_memoria(),
            'cache_entradas': len(self._cache_acesso)
        }
    
    def _calcular_memoria(self) -> int:
        """Calcula uso aproximado de memória"""
        if self._tamanho == 0:
            return sys.getsizeof(self)
        
        # Tamanho base do objeto + nós + dados
        tamanho_base = sys.getsizeof(self)
        tamanho_no = sys.getsizeof(No(None))
        
        # Estima tamanho dos dados (usando primeiro elemento como amostra)
        if self._cabeca:
            tamanho_dados = sys.getsizeof(self._cabeca.dados)
        else:
            tamanho_dados = 0
        
        return tamanho_base + (self._tamanho * (tamanho_no + tamanho_dados))

# ========== PILHA DINÂMICA ==========

class PilhaDinamica(Generic[T]):
    """Pilha com redimensionamento automático"""
    
    def __init__(self, capacidade_inicial: int = 8):
        self._dados: List[T] = []
        self._capacidade_inicial = capacidade_inicial
        self._fator_crescimento = 2.0
        self._fator_encolhimento = 0.25
        
        # Estatísticas
        self._total_push = 0
        self._total_pop = 0
        self._redimensionamentos = 0
        self._capacidade_maxima_alcancada = 0
    
    def push(self, item: T) -> None:
        """Adiciona item ao topo da pilha"""
        self._dados.append(item)
        self._total_push += 1
        
        # Atualiza estatísticas
        if len(self._dados) > self._capacidade_maxima_alcancada:
            self._capacidade_maxima_alcancada = len(self._dados)
    
    def pop(self) -> T:
        """Remove e retorna item do topo"""
        if not self._dados:
            raise IndexError("Pilha vazia")
        
        self._total_pop += 1
        return self._dados.pop()
    
    def peek(self) -> T:
        """Retorna item do topo sem remover"""
        if not self._dados:
            raise IndexError("Pilha vazia")
        
        return self._dados[-1]
    
    def vazia(self) -> bool:
        """Verifica se pilha está vazia"""
        return len(self._dados) == 0
    
    def tamanho(self) -> int:
        """Retorna número de elementos"""
        return len(self._dados)
    
    def limpar(self) -> None:
        """Remove todos os elementos"""
        self._dados.clear()
    
    def estatisticas(self) -> dict:
        """Retorna estatísticas da pilha"""
        return {
            'tamanho_atual': len(self._dados),
            'total_push': self._total_push,
            'total_pop': self._total_pop,
            'capacidade_maxima_alcancada': self._capacidade_maxima_alcancada,
            'redimensionamentos': self._redimensionamentos,
            'memoria_bytes': sys.getsizeof(self._dados) + sum(sys.getsizeof(item) for item in self._dados)
        }

# ========== FILA CIRCULAR ==========

class FilaCircular(Generic[T]):
    """Fila implementada com buffer circular"""
    
    def __init__(self, capacidade: int):
        if capacidade <= 0:
            raise ValueError("Capacidade deve ser positiva")
        
        self._buffer: List[Optional[T]] = [None] * capacidade
        self._inicio = 0
        self._fim = 0
        self._tamanho_atual = 0
        self._capacidade = capacidade
        
        # Estatísticas
        self._total_enqueue = 0
        self._total_dequeue = 0
        self._overflows = 0
        self._underflows = 0
    
    def enqueue(self, item: T) -> bool:
        """Adiciona item à fila. Retorna False se cheia"""
        if self.cheia():
            self._overflows += 1
            return False
        
        self._buffer[self._fim] = item
        self._fim = (self._fim + 1) % self._capacidade
        self._tamanho_atual += 1
        self._total_enqueue += 1
        
        return True
    
    def dequeue(self) -> Optional[T]:
        """Remove e retorna item da fila. None se vazia"""
        if self.vazia():
            self._underflows += 1
            return None
        
        item = self._buffer[self._inicio]
        self._buffer[self._inicio] = None  # Limpa referência
        self._inicio = (self._inicio + 1) % self._capacidade
        self._tamanho_atual -= 1
        self._total_dequeue += 1
        
        return item
    
    def peek(self) -> Optional[T]:
        """Retorna próximo item sem remover"""
        if self.vazia():
            return None
        return self._buffer[self._inicio]
    
    def vazia(self) -> bool:
        """Verifica se fila está vazia"""
        return self._tamanho_atual == 0
    
    def cheia(self) -> bool:
        """Verifica se fila está cheia"""
        return self._tamanho_atual == self._capacidade
    
    def tamanho(self) -> int:
        """Retorna número de elementos"""
        return self._tamanho_atual
    
    def utilizacao(self) -> float:
        """Retorna taxa de utilização (0.0 a 1.0)"""
        return self._tamanho_atual / self._capacidade
    
    def estatisticas(self) -> dict:
        """Retorna estatísticas da fila"""
        return {
            'tamanho_atual': self._tamanho_atual,
            'capacidade': self._capacidade,
            'utilizacao': self.utilizacao(),
            'total_enqueue': self._total_enqueue,
            'total_dequeue': self._total_dequeue,
            'overflows': self._overflows,
            'underflows': self._underflows
        }

# ========== BENCHMARK DE PERFORMANCE ==========

class BenchmarkEstruturasDeados:
    """Suite de benchmarks para estruturas de dados"""
    
    def __init__(self):
        self.resultados = {}
    
    def benchmark_lista_vs_list_python(self, tamanhos: List[int]) -> dict:
        """Compara lista ligada personalizada vs list do Python"""
        resultados = {
            'tamanhos': tamanhos,
            'lista_ligada_insercao': [],
            'python_list_insercao': [],
            'lista_ligada_busca': [],
            'python_list_busca': [],
            'lista_ligada_memoria': [],
            'python_list_memoria': []
        }
        
        for n in tamanhos:
            print(f"Benchmarking tamanho {n}...")
            
            # Benchmark lista ligada
            lista_ligada = ListaLigada[int]()
            inicio = time.perf_counter()
            for i in range(n):
                lista_ligada.inserir_fim(i)
            tempo_insercao_lista = time.perf_counter() - inicio
            
            inicio = time.perf_counter()
            for i in range(min(100, n)):
                lista_ligada.buscar(random.randint(0, n-1))
            tempo_busca_lista = time.perf_counter() - inicio
            
            memoria_lista = lista_ligada._calcular_memoria()
            
            # Benchmark list do Python
            python_list = []
            inicio = time.perf_counter()
            for i in range(n):
                python_list.append(i)
            tempo_insercao_python = time.perf_counter() - inicio
            
            inicio = time.perf_counter()
            for i in range(min(100, n)):
                random.randint(0, n-1) in python_list
            tempo_busca_python = time.perf_counter() - inicio
            
            memoria_python = sys.getsizeof(python_list) + sum(sys.getsizeof(i) for i in python_list)
            
            # Armazena resultados
            resultados['lista_ligada_insercao'].append(tempo_insercao_lista)
            resultados['python_list_insercao'].append(tempo_insercao_python)
            resultados['lista_ligada_busca'].append(tempo_busca_lista)
            resultados['python_list_busca'].append(tempo_busca_python)
            resultados['lista_ligada_memoria'].append(memoria_lista)
            resultados['python_list_memoria'].append(memoria_python)
        
        return resultados
    
    def benchmark_pilha_vs_deque(self, tamanhos: List[int]) -> dict:
        """Compara pilha personalizada vs deque do Python"""
        resultados = {
            'tamanhos': tamanhos,
            'pilha_custom_push': [],
            'deque_append': [],
            'pilha_custom_pop': [],
            'deque_pop': []
        }
        
        for n in tamanhos:
            # Benchmark pilha personalizada
            pilha = PilhaDinamica[int]()
            inicio = time.perf_counter()
            for i in range(n):
                pilha.push(i)
            tempo_push = time.perf_counter() - inicio
            
            inicio = time.perf_counter()
            while not pilha.vazia():
                pilha.pop()
            tempo_pop = time.perf_counter() - inicio
            
            # Benchmark deque
            fila_deque = deque()
            inicio = time.perf_counter()
            for i in range(n):
                fila_deque.append(i)
            tempo_append_deque = time.perf_counter() - inicio
            
            inicio = time.perf_counter()
            while fila_deque:
                fila_deque.pop()
            tempo_pop_deque = time.perf_counter() - inicio
            
            resultados['pilha_custom_push'].append(tempo_push)
            resultados['deque_append'].append(tempo_append_deque)
            resultados['pilha_custom_pop'].append(tempo_pop)
            resultados['deque_pop'].append(tempo_pop_deque)
        
        return resultados
    
    def gerar_graficos(self, resultados: dict, titulo: str):
        """Gera gráficos dos resultados do benchmark"""
        fig, ((ax1, ax2), (ax3, ax4)) = plt.subplots(2, 2, figsize=(15, 10))
        fig.suptitle(titulo, fontsize=16)
        
        tamanhos = resultados['tamanhos']
        
        # Gráfico 1: Tempo de inserção
        if 'lista_ligada_insercao' in resultados:
            ax1.plot(tamanhos, resultados['lista_ligada_insercao'], 'o-', label='Lista Ligada')
            ax1.plot(tamanhos, resultados['python_list_insercao'], 's-', label='Python List')
            ax1.set_xlabel('Tamanho')
            ax1.set_ylabel('Tempo (s)')
            ax1.set_title('Tempo de Inserção')
            ax1.legend()
            ax1.grid(True)
        
        # Gráfico 2: Tempo de busca
        if 'lista_ligada_busca' in resultados:
            ax2.plot(tamanhos, resultados['lista_ligada_busca'], 'o-', label='Lista Ligada')
            ax2.plot(tamanhos, resultados['python_list_busca'], 's-', label='Python List')
            ax2.set_xlabel('Tamanho')
            ax2.set_ylabel('Tempo (s)')
            ax2.set_title('Tempo de Busca')
            ax2.legend()
            ax2.grid(True)
        
        # Gráfico 3: Uso de memória
        if 'lista_ligada_memoria' in resultados:
            ax3.plot(tamanhos, [m/1024 for m in resultados['lista_ligada_memoria']], 'o-', label='Lista Ligada')
            ax3.plot(tamanhos, [m/1024 for m in resultados['python_list_memoria']], 's-', label='Python List')
            ax3.set_xlabel('Tamanho')
            ax3.set_ylabel('Memória (KB)')
            ax3.set_title('Uso de Memória')
            ax3.legend()
            ax3.grid(True)
        
        # Gráfico 4: Pilha/Deque
        if 'pilha_custom_push' in resultados:
            ax4.plot(tamanhos, resultados['pilha_custom_push'], 'o-', label='Pilha Push')
            ax4.plot(tamanhos, resultados['deque_append'], 's-', label='Deque Append')
            ax4.set_xlabel('Tamanho')
            ax4.set_ylabel('Tempo (s)')
            ax4.set_title('Performance Pilha vs Deque')
            ax4.legend()
            ax4.grid(True)
        
        plt.tight_layout()
        plt.savefig(f'benchmark_{titulo.lower().replace(" ", "_")}.png', dpi=300, bbox_inches='tight')
        plt.show()

# ========== APLICAÇÃO PRÁTICA: CALCULADORA COM PILHA ==========

class CalculadoraExpressoes:
    """Calculadora de expressões usando pilha"""
    
    def __init__(self):
        self.operadores = {
            '+': (1, lambda a, b: a + b),
            '-': (1, lambda a, b: a - b),
            '*': (2, lambda a, b: a * b),
            '/': (2, lambda a, b: a / b if b != 0 else float('inf')),
            '^': (3, lambda a, b: a ** b),
        }
        
        self.funcoes = {
            'sin': lambda x: __import__('math').sin(x),
            'cos': lambda x: __import__('math').cos(x),
            'sqrt': lambda x: __import__('math').sqrt(x),
            'log': lambda x: __import__('math').log(x),
            'abs': abs,
        }
    
    def avaliar(self, expressao: str) -> float:
        """Avalia expressão matemática"""
        tokens = self._tokenizar(expressao)
        postfix = self._infix_para_postfix(tokens)
        return self._avaliar_postfix(postfix)
    
    def _tokenizar(self, expressao: str) -> List[str]:
        """Converte expressão em tokens"""
        import re
        pattern = r'(\d+\.?\d*|[+\-*/^()]|[a-zA-Z]+)'
        return re.findall(pattern, expressao.replace(' ', ''))
    
    def _infix_para_postfix(self, tokens: List[str]) -> List[str]:
        """Algoritmo Shunting Yard"""
        pilha_ops = PilhaDinamica[str]()
        saida = []
        
        for token in tokens:
            if self._eh_numero(token):
                saida.append(token)
            elif token in self.funcoes:
                pilha_ops.push(token)
            elif token in self.operadores:
                while (not pilha_ops.vazia() and 
                       pilha_ops.peek() != '(' and
                       pilha_ops.peek() in self.operadores and
                       self.operadores[pilha_ops.peek()][0] >= self.operadores[token][0]):
                    saida.append(pilha_ops.pop())
                pilha_ops.push(token)
            elif token == '(':
                pilha_ops.push(token)
            elif token == ')':
                while not pilha_ops.vazia() and pilha_ops.peek() != '(':
                    saida.append(pilha_ops.pop())
                if not pilha_ops.vazia():
                    pilha_ops.pop()  # Remove '('
                if not pilha_ops.vazia() and pilha_ops.peek() in self.funcoes:
                    saida.append(pilha_ops.pop())
        
        while not pilha_ops.vazia():
            saida.append(pilha_ops.pop())
        
        return saida
    
    def _avaliar_postfix(self, tokens: List[str]) -> float:
        """Avalia expressão pós-fixa"""
        pilha = PilhaDinamica[float]()
        
        for token in tokens:
            if self._eh_numero(token):
                pilha.push(float(token))
            elif token in self.operadores:
                b = pilha.pop()
                a = pilha.pop()
                resultado = self.operadores[token][1](a, b)
                pilha.push(resultado)
            elif token in self.funcoes:
                a = pilha.pop()
                resultado = self.funcoes[token](a)
                pilha.push(resultado)
        
        return pilha.pop()
    
    def _eh_numero(self, token: str) -> bool:
        """Verifica se token é número"""
        try:
            float(token)
            return True
        except ValueError:
            return False

# ========== FUNÇÃO PRINCIPAL DE DEMONSTRAÇÃO ==========

def main():
    """Demonstração completa das estruturas de dados"""
    print("=== DEMONSTRAÇÃO ESTRUTURAS DE DADOS PYTHON ===\n")
    
    # ========== TESTE LISTA LIGADA ==========
    print("1. TESTE DA LISTA LIGADA GENÉRICA")
    print("-" * 40)
    
    lista = ListaLigada[int]()
    
    print("Inserindo elementos ordenados: ", end="")
    valores = [42, 17, 89, 3, 56, 23, 91, 7]
    for valor in valores:
        lista.inserir_ordenado(valor)
        print(valor, end=" ")
    print()
    
    print(f"Lista ordenada: {list(lista)}")
    print(f"Tamanho: {len(lista)}")
    
    # Teste de busca
    buscar = 89
    posicao = lista.buscar(buscar)
    if posicao is not None:
        print(f"Elemento {buscar} encontrado na posição {posicao}")
    
    # Operações funcionais
    pares = lista.filtrar(lambda x: x % 2 == 0)
    print(f"Números pares: {list(pares)}")
    
    quadrados = lista.mapear(lambda x: x ** 2)
    print(f"Quadrados: {list(quadrados)[:5]}...")  # Primeiros 5
    
    # Estatísticas
    stats = lista.estatisticas()
    print(f"Estatísticas: {stats}")
    
    print()
    
    # ========== TESTE PILHA ==========
    print("2. TESTE DA PILHA DINÂMICA")
    print("-" * 30)
    
    pilha = PilhaDinamica[int]()
    
    print("Adicionando elementos: ", end="")
    for i in range(1, 11):
        pilha.push(i)
        print(i, end=" ")
    print()
    
    print("Removendo elementos: ", end="")
    while not pilha.vazia():
        print(pilha.pop(), end=" ")
    print()
    
    print(f"Estatísticas da pilha: {pilha.estatisticas()}")
    
    print()
    
    # ========== TESTE FILA CIRCULAR ==========
    print("3. TESTE DA FILA CIRCULAR")
    print("-" * 30)
    
    fila = FilaCircular[int](5)
    
    print("Adicionando elementos: ", end="")
    for i in range(1, 6):
        if fila.enqueue(i):
            print(i, end=" ")
    print()
    
    # Tenta adicionar mais (overflow)
    if not fila.enqueue(6):
        print("Fila cheia! Overflow detectado.")
    
    print("Removendo 3 elementos: ", end="")
    for _ in range(3):
        item = fila.dequeue()
        if item:
            print(item, end=" ")
    print()
    
    print("Adicionando mais elementos: ", end="")
    for i in range(6, 8):
        if fila.enqueue(i):
            print(i, end=" ")
    print()
    
    print("Removendo restantes: ", end="")
    while not fila.vazia():
        item = fila.dequeue()
        if item:
            print(item, end=" ")
    print()
    
    print(f"Estatísticas da fila: {fila.estatisticas()}")
    
    print()
    
    # ========== TESTE CALCULADORA ==========
    print("4. TESTE DA CALCULADORA")
    print("-" * 25)
    
    calc = CalculadoraExpressoes()
    
    expressoes = [
        "3 + 4 * 2",
        "(3 + 4) * 2", 
        "2 ^ 3 + 1",
        "sqrt(16) + 3",
        "sin(0) + cos(0)"
    ]
    
    for expr in expressoes:
        try:
            resultado = calc.avaliar(expr)
            print(f"{expr:20} = {resultado:.6f}")
        except Exception as e:
            print(f"{expr:20} = ERRO: {e}")
    
    print()
    
    # ========== BENCHMARK DE PERFORMANCE ==========
    print("5. BENCHMARK DE PERFORMANCE")
    print("-" * 30)
    
    benchmark = BenchmarkEstruturasDeados()
    tamanhos = [100, 500, 1000, 5000]
    
    print("Executando benchmarks...")
    
    # Benchmark lista vs list
    resultado_lista = benchmark.benchmark_lista_vs_list_python(tamanhos)
    
    print("\nResultados Lista Ligada vs Python List:")
    print("Tamanho\tLista(s)\tPython(s)\tSpeedup")
    print("-" * 45)
    for i, n in enumerate(tamanhos):
        tempo_lista = resultado_lista['lista_ligada_insercao'][i]
        tempo_python = resultado_lista['python_list_insercao'][i]
        speedup = tempo_lista / tempo_python if tempo_python > 0 else 0
        print(f"{n}\t{tempo_lista:.6f}\t{tempo_python:.6f}\t{speedup:.2f}x")
    
    # Benchmark pilha vs deque
    resultado_pilha = benchmark.benchmark_pilha_vs_deque(tamanhos)
    
    print("\nResultados Pilha vs Deque:")
    print("Tamanho\tPilha(s)\tDeque(s)\tSpeedup")
    print("-" * 40)
    for i, n in enumerate(tamanhos):
        tempo_pilha = resultado_pilha['pilha_custom_push'][i]
        tempo_deque = resultado_pilha['deque_append'][i]
        speedup = tempo_pilha / tempo_deque if tempo_deque > 0 else 0
        print(f"{n}\t{tempo_pilha:.6f}\t{tempo_deque:.6f}\t{speedup:.2f}x")
    
    # Gera gráficos se matplotlib disponível
    try:
        benchmark.gerar_graficos(resultado_lista, "Lista Ligada vs Python List")
        print("\nGráficos salvos como arquivos PNG")
    except ImportError:
        print("\nMatplotlib não disponível - gráficos não gerados")
    
    print("\n=== DEMONSTRAÇÃO CONCLUÍDA ===")

if __name__ == "__main__":
    main()
