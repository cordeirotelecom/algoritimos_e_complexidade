"""
AULA 05 - ÁRVORES E ESTRUTURAS HIERÁRQUICAS
Implementações avançadas em Python com análise de performance

Este módulo contém:
1. AVL Tree com rotações automáticas
2. Min-Heap otimizado com análise detalhada
3. Trie para autocomplete inteligente
4. Sistema integrado de benchmark
5. Aplicações práticas reais

Autor: Curso de Algoritmos e Complexidade
Data: Agosto 2025
"""

from typing import Optional, TypeVar, Generic, List, Callable, Tuple, Dict, Any
from dataclasses import dataclass, field
from enum import Enum
import time
import random
import sys
import heapq
import json
from collections import defaultdict

T = TypeVar('T')

# =======================================
# ENUMS E CLASSES AUXILIARES
# =======================================

class TipoRotacao(Enum):
    """Tipos de rotação em árvores AVL"""
    DIREITA = "rotacao_direita"
    ESQUERDA = "rotacao_esquerda"
    ESQUERDA_DIREITA = "rotacao_esquerda_direita"
    DIREITA_ESQUERDA = "rotacao_direita_esquerda"

@dataclass
class EstatisticasPerformance:
    """Estrutura para armazenar métricas de performance"""
    operacao: str
    tempo_ms: float
    memoria_bytes: int
    comparacoes: int
    elementos_processados: int
    extras: Dict[str, Any] = field(default_factory=dict)

# =======================================
# IMPLEMENTAÇÃO AVL TREE AVANÇADA
# =======================================

@dataclass
class NoAVL(Generic[T]):
    """Nó da árvore AVL com metadados completos"""
    dados: T
    esquerda: Optional['NoAVL[T]'] = None
    direita: Optional['NoAVL[T]'] = None
    pai: Optional['NoAVL[T]'] = None
    altura: int = 0
    
    def fator_balanceamento(self) -> int:
        """Calcula fator de balanceamento: altura_esq - altura_dir"""
        altura_esq = self.esquerda.altura if self.esquerda else -1
        altura_dir = self.direita.altura if self.direita else -1
        return altura_esq - altura_dir
    
    def atualizar_altura(self) -> None:
        """Atualiza altura baseada nos filhos"""
        altura_esq = self.esquerda.altura if self.esquerda else -1
        altura_dir = self.direita.altura if self.direita else -1
        self.altura = 1 + max(altura_esq, altura_dir)
    
    def eh_folha(self) -> bool:
        """Verifica se é nó folha"""
        return self.esquerda is None and self.direita is None
    
    def grau(self) -> int:
        """Retorna grau do nó (número de filhos)"""
        return sum([1 for filho in [self.esquerda, self.direita] if filho is not None])

class ArvoreAVL(Generic[T]):
    """
    Árvore AVL auto-balanceada com análise detalhada de performance
    Garante operações O(log n) em todos os casos
    """
    
    def __init__(self, comparador: Optional[Callable[[T, T], int]] = None):
        self._raiz: Optional[NoAVL[T]] = None
        self._tamanho: int = 0
        self._comparador = comparador or self._comparador_padrao
        
        # Estatísticas detalhadas
        self._total_insercoes: int = 0
        self._total_remocoes: int = 0
        self._total_buscas: int = 0
        self._rotacoes_por_tipo: Dict[TipoRotacao, int] = {tipo: 0 for tipo in TipoRotacao}
        self._max_altura_alcancada: int = 0
        self._historico_operacoes: List[EstatisticasPerformance] = []
        
        # Cache para otimizações
        self._cache_traversal: Optional[List[T]] = None
        self._cache_altura: Optional[int] = None
    
    def _comparador_padrao(self, a: T, b: T) -> int:
        """Comparador padrão usando operadores nativos"""
        if a < b:
            return -1
        elif a > b:
            return 1
        return 0
    
    def _invalidar_caches(self) -> None:
        """Invalida caches após modificações"""
        self._cache_traversal = None
        self._cache_altura = None
    
    def inserir(self, valor: T) -> bool:
        """
        Insere valor mantendo propriedade AVL
        Retorna True se inserção foi bem-sucedida
        """
        inicio = time.perf_counter()
        tamanho_anterior = self._tamanho
        comparacoes_antes = self._contar_comparacoes()
        
        self._raiz = self._inserir_recursivo(self._raiz, valor)
        self._total_insercoes += 1
        self._invalidar_caches()
        
        # Atualiza estatísticas
        if self._raiz:
            self._max_altura_alcancada = max(self._max_altura_alcancada, self._raiz.altura)
        
        tempo_gasto = time.perf_counter() - inicio
        comparacoes_usadas = self._contar_comparacoes() - comparacoes_antes
        
        # Registra performance
        self._historico_operacoes.append(EstatisticasPerformance(
            operacao="inserir",
            tempo_ms=tempo_gasto * 1000,
            memoria_bytes=sys.getsizeof(NoAVL(valor)),
            comparacoes=comparacoes_usadas,
            elementos_processados=1,
            extras={"valor": valor, "altura_apos": self.altura()}
        ))
        
        return self._tamanho > tamanho_anterior
    
    def _inserir_recursivo(self, no: Optional[NoAVL[T]], valor: T) -> NoAVL[T]:
        """Inserção recursiva com balanceamento automático"""
        # Passo 1: Inserção BST padrão
        if no is None:
            self._tamanho += 1
            return NoAVL(valor)
        
        cmp = self._comparador(valor, no.dados)
        if cmp < 0:
            no.esquerda = self._inserir_recursivo(no.esquerda, valor)
            no.esquerda.pai = no
        elif cmp > 0:
            no.direita = self._inserir_recursivo(no.direita, valor)
            no.direita.pai = no
        else:
            # Valor duplicado - política configurável
            return no
        
        # Passo 2: Atualiza altura
        no.atualizar_altura()
        
        # Passo 3: Aplica balanceamento AVL
        return self._balancear(no, valor)
    
    def _balancear(self, no: NoAVL[T], valor: T) -> NoAVL[T]:
        """Aplica balanceamento AVL com todas as rotações"""
        fator = no.fator_balanceamento()
        
        # Caso Esquerda-Esquerda (rotação simples direita)
        if fator > 1 and self._comparador(valor, no.esquerda.dados) < 0:
            self._rotacoes_por_tipo[TipoRotacao.DIREITA] += 1
            return self._rotacao_direita(no)
        
        # Caso Direita-Direita (rotação simples esquerda)
        if fator < -1 and self._comparador(valor, no.direita.dados) > 0:
            self._rotacoes_por_tipo[TipoRotacao.ESQUERDA] += 1
            return self._rotacao_esquerda(no)
        
        # Caso Esquerda-Direita (rotação dupla)
        if fator > 1 and self._comparador(valor, no.esquerda.dados) > 0:
            self._rotacoes_por_tipo[TipoRotacao.ESQUERDA_DIREITA] += 1
            no.esquerda = self._rotacao_esquerda(no.esquerda)
            return self._rotacao_direita(no)
        
        # Caso Direita-Esquerda (rotação dupla)
        if fator < -1 and self._comparador(valor, no.direita.dados) < 0:
            self._rotacoes_por_tipo[TipoRotacao.DIREITA_ESQUERDA] += 1
            no.direita = self._rotacao_direita(no.direita)
            return self._rotacao_esquerda(no)
        
        return no
    
    def _rotacao_direita(self, y: NoAVL[T]) -> NoAVL[T]:
        """Rotação simples à direita"""
        x = y.esquerda
        T2 = x.direita
        
        # Realiza rotação
        x.direita = y
        y.esquerda = T2
        
        # Atualiza pais
        x.pai = y.pai
        y.pai = x
        if T2:
            T2.pai = y
        
        # Atualiza alturas (ordem importante!)
        y.atualizar_altura()
        x.atualizar_altura()
        
        return x
    
    def _rotacao_esquerda(self, x: NoAVL[T]) -> NoAVL[T]:
        """Rotação simples à esquerda"""
        y = x.direita
        T2 = y.esquerda
        
        # Realiza rotação
        y.esquerda = x
        x.direita = T2
        
        # Atualiza pais
        y.pai = x.pai
        x.pai = y
        if T2:
            T2.pai = x
        
        # Atualiza alturas (ordem importante!)
        x.atualizar_altura()
        y.atualizar_altura()
        
        return y
    
    def buscar(self, valor: T) -> bool:
        """Busca valor na árvore - O(log n)"""
        inicio = time.perf_counter()
        self._total_buscas += 1
        
        resultado = self._buscar_recursivo(self._raiz, valor) is not None
        
        tempo_gasto = time.perf_counter() - inicio
        self._historico_operacoes.append(EstatisticasPerformance(
            operacao="buscar",
            tempo_ms=tempo_gasto * 1000,
            memoria_bytes=0,
            comparacoes=1,  # Aproximação
            elementos_processados=1,
            extras={"valor": valor, "encontrado": resultado}
        ))
        
        return resultado
    
    def _buscar_recursivo(self, no: Optional[NoAVL[T]], valor: T) -> Optional[NoAVL[T]]:
        """Busca recursiva padrão"""
        if no is None:
            return None
        
        cmp = self._comparador(valor, no.dados)
        if cmp == 0:
            return no
        elif cmp < 0:
            return self._buscar_recursivo(no.esquerda, valor)
        else:
            return self._buscar_recursivo(no.direita, valor)
    
    def altura(self) -> int:
        """Retorna altura da árvore - O(1) com cache"""
        if self._cache_altura is None:
            self._cache_altura = self._raiz.altura if self._raiz else -1
        return self._cache_altura
    
    def tamanho(self) -> int:
        """Retorna número de elementos - O(1)"""
        return self._tamanho
    
    def vazia(self) -> bool:
        """Verifica se árvore está vazia - O(1)"""
        return self._tamanho == 0
    
    def travessia_inorder(self) -> List[T]:
        """Retorna elementos em ordem crescente - O(n)"""
        if self._cache_traversal is None:
            resultado = []
            self._inorder_recursivo(self._raiz, resultado)
            self._cache_traversal = resultado
        return self._cache_traversal.copy()
    
    def _inorder_recursivo(self, no: Optional[NoAVL[T]], resultado: List[T]) -> None:
        """Traversal in-order recursivo"""
        if no:
            self._inorder_recursivo(no.esquerda, resultado)
            resultado.append(no.dados)
            self._inorder_recursivo(no.direita, resultado)
    
    def _contar_comparacoes(self) -> int:
        """Conta total de comparações realizadas"""
        return self._total_insercoes + self._total_buscas + self._total_remocoes
    
    def relatorio_performance(self) -> Dict[str, Any]:
        """Gera relatório detalhado de performance"""
        total_rotacoes = sum(self._rotacoes_por_tipo.values())
        tempo_total = sum(op.tempo_ms for op in self._historico_operacoes)
        
        return {
            'estrutura': 'AVL Tree',
            'tamanho': self._tamanho,
            'altura': self.altura(),
            'altura_teorica_minima': int(self._tamanho.bit_length()) - 1 if self._tamanho > 0 else 0,
            'fator_eficiencia_altura': self.altura() / max(1, int(self._tamanho.bit_length()) - 1) if self._tamanho > 0 else 1.0,
            'operacoes': {
                'total_insercoes': self._total_insercoes,
                'total_buscas': self._total_buscas,
                'total_remocoes': self._total_remocoes
            },
            'rotacoes': {
                'total': total_rotacoes,
                'por_tipo': {tipo.value: count for tipo, count in self._rotacoes_por_tipo.items()},
                'rotacoes_por_insercao': total_rotacoes / max(self._total_insercoes, 1)
            },
            'performance': {
                'tempo_total_ms': tempo_total,
                'tempo_medio_por_operacao_ms': tempo_total / max(len(self._historico_operacoes), 1),
                'max_altura_alcancada': self._max_altura_alcancada
            },
            'memoria': {
                'estimativa_bytes': self._tamanho * sys.getsizeof(NoAVL(None)),
                'nos_internos': self._contar_nos_internos(),
                'nos_folha': self._contar_nos_folha()
            },
            'balanceamento': {
                'eh_balanceada': self._verificar_balanceamento_completo(),
                'fator_balanceamento_medio': self._calcular_fator_balanceamento_medio()
            }
        }
    
    def _contar_nos_internos(self) -> int:
        """Conta nós internos (não folhas)"""
        def contar(no: Optional[NoAVL[T]]) -> int:
            if no is None:
                return 0
            if no.eh_folha():
                return contar(no.esquerda) + contar(no.direita)
            return 1 + contar(no.esquerda) + contar(no.direita)
        
        return contar(self._raiz)
    
    def _contar_nos_folha(self) -> int:
        """Conta nós folha"""
        def contar(no: Optional[NoAVL[T]]) -> int:
            if no is None:
                return 0
            if no.eh_folha():
                return 1
            return contar(no.esquerda) + contar(no.direita)
        
        return contar(self._raiz)
    
    def _verificar_balanceamento_completo(self) -> bool:
        """Verifica se toda a árvore está balanceada"""
        def verificar(no: Optional[NoAVL[T]]) -> bool:
            if no is None:
                return True
            
            fator = no.fator_balanceamento()
            if abs(fator) > 1:
                return False
            
            return verificar(no.esquerda) and verificar(no.direita)
        
        return verificar(self._raiz)
    
    def _calcular_fator_balanceamento_medio(self) -> float:
        """Calcula fator de balanceamento médio de todos os nós"""
        fatores = []
        
        def coletar_fatores(no: Optional[NoAVL[T]]) -> None:
            if no:
                fatores.append(abs(no.fator_balanceamento()))
                coletar_fatores(no.esquerda)
                coletar_fatores(no.direita)
        
        coletar_fatores(self._raiz)
        return sum(fatores) / max(len(fatores), 1)

# =======================================
# IMPLEMENTAÇÃO MIN-HEAP AVANÇADA
# =======================================

class MinHeap(Generic[T]):
    """
    Min-Heap com operações O(log n) e análise detalhada de performance
    Suporta comparador customizado e estatísticas avançadas
    """
    
    def __init__(self, comparador: Optional[Callable[[T, T], int]] = None):
        self._heap: List[T] = []
        self._comparador = comparador or self._comparador_padrao
        
        # Estatísticas
        self._total_insercoes: int = 0
        self._total_remocoes: int = 0
        self._comparacoes_realizadas: int = 0
        self._trocas_realizadas: int = 0
        self._operacoes_heapify: int = 0
    
    def _comparador_padrao(self, a: T, b: T) -> int:
        """Comparador padrão"""
        if a < b:
            return -1
        elif a > b:
            return 1
        return 0
    
    def inserir(self, valor: T) -> None:
        """Insere elemento mantendo propriedade de heap - O(log n)"""
        self._heap.append(valor)
        self._total_insercoes += 1
        self._heapify_up(len(self._heap) - 1)
    
    def _heapify_up(self, indice: int) -> None:
        """Move elemento para cima até posição correta"""
        if indice == 0:
            return
        
        pai_indice = (indice - 1) // 2
        self._comparacoes_realizadas += 1
        
        if self._comparador(self._heap[indice], self._heap[pai_indice]) < 0:
            self._trocar(indice, pai_indice)
            self._heapify_up(pai_indice)
    
    def extrair_minimo(self) -> Optional[T]:
        """Remove e retorna elemento mínimo - O(log n)"""
        if not self._heap:
            return None
        
        if len(self._heap) == 1:
            self._total_remocoes += 1
            return self._heap.pop()
        
        minimo = self._heap[0]
        self._heap[0] = self._heap.pop()
        self._total_remocoes += 1
        self._heapify_down(0)
        
        return minimo
    
    def _heapify_down(self, indice: int) -> None:
        """Move elemento para baixo até posição correta"""
        menor = indice
        esq = 2 * indice + 1
        dir = 2 * indice + 2
        
        if esq < len(self._heap):
            self._comparacoes_realizadas += 1
            if self._comparador(self._heap[esq], self._heap[menor]) < 0:
                menor = esq
        
        if dir < len(self._heap):
            self._comparacoes_realizadas += 1
            if self._comparador(self._heap[dir], self._heap[menor]) < 0:
                menor = dir
        
        if menor != indice:
            self._trocar(indice, menor)
            self._heapify_down(menor)
    
    def _trocar(self, i: int, j: int) -> None:
        """Troca elementos nas posições i e j"""
        self._heap[i], self._heap[j] = self._heap[j], self._heap[i]
        self._trocas_realizadas += 1
    
    def construir_heap(self, elementos: List[T]) -> None:
        """Constrói heap a partir de lista - O(n)"""
        self._heap = elementos.copy()
        self._operacoes_heapify += 1
        
        # Heapify de baixo para cima (Floyd's algorithm)
        for i in range(len(self._heap) // 2 - 1, -1, -1):
            self._heapify_down(i)
    
    def peek(self) -> Optional[T]:
        """Retorna mínimo sem remover - O(1)"""
        return self._heap[0] if self._heap else None
    
    def tamanho(self) -> int:
        """Retorna tamanho do heap - O(1)"""
        return len(self._heap)
    
    def vazio(self) -> bool:
        """Verifica se heap está vazio - O(1)"""
        return len(self._heap) == 0
    
    def heap_sort(self, elementos: List[T]) -> List[T]:
        """Ordena elementos usando heap sort - O(n log n)"""
        heap_temporario = MinHeap(self._comparador)
        heap_temporario.construir_heap(elementos)
        
        resultado = []
        while not heap_temporario.vazio():
            resultado.append(heap_temporario.extrair_minimo())
        
        return resultado
    
    def estatisticas(self) -> Dict[str, Any]:
        """Retorna estatísticas detalhadas"""
        altura_teorica = len(self._heap).bit_length() - 1 if self._heap else 0
        
        return {
            'estrutura': 'Min-Heap',
            'tamanho': len(self._heap),
            'altura_teorica': altura_teorica,
            'operacoes': {
                'total_insercoes': self._total_insercoes,
                'total_remocoes': self._total_remocoes,
                'operacoes_heapify': self._operacoes_heapify
            },
            'performance': {
                'comparacoes_realizadas': self._comparacoes_realizadas,
                'trocas_realizadas': self._trocas_realizadas,
                'eficiencia_comparacoes': self._comparacoes_realizadas / max(self._total_insercoes + self._total_remocoes, 1)
            },
            'memoria': {
                'bytes_estimados': len(self._heap) * sys.getsizeof(self._heap[0]) if self._heap else 0,
                'overhead_lista': sys.getsizeof(self._heap)
            }
        }

# =======================================
# IMPLEMENTAÇÃO TRIE AVANÇADA
# =======================================

@dataclass
class NoTrie:
    """Nó da árvore Trie com metadados de frequência"""
    eh_fim_palavra: bool = False
    filhos: Dict[str, 'NoTrie'] = field(default_factory=dict)
    frequencia: int = 0
    profundidade: int = 0
    ultima_atualizacao: float = 0

class Trie:
    """
    Trie (árvore de prefixos) para autocomplete e busca eficiente
    Otimizada para aplicações reais com cache e compressão
    """
    
    def __init__(self):
        self._raiz = NoTrie()
        self._total_palavras: int = 0
        self._total_nos: int = 1
        self._maior_palavra: str = ""
        self._palavras_por_comprimento: Dict[int, int] = defaultdict(int)
        
        # Cache para otimização
        self._cache_sugestoes: Dict[str, List[str]] = {}
        self._max_cache = 1000
        
        # Estatísticas
        self._total_buscas: int = 0
        self._cache_hits: int = 0
        self._cache_misses: int = 0
    
    def inserir(self, palavra: str) -> None:
        """Insere palavra na Trie - O(m) onde m = len(palavra)"""
        if not palavra:
            return
        
        palavra = palavra.lower().strip()
        atual = self._raiz
        timestamp = time.time()
        
        for i, char in enumerate(palavra):
            if char not in atual.filhos:
                atual.filhos[char] = NoTrie(profundidade=i+1)
                self._total_nos += 1
            
            atual = atual.filhos[char]
            atual.ultima_atualizacao = timestamp
        
        if not atual.eh_fim_palavra:
            atual.eh_fim_palavra = True
            self._total_palavras += 1
            
            # Atualiza estatísticas
            comprimento = len(palavra)
            self._palavras_por_comprimento[comprimento] += 1
            
            if len(palavra) > len(self._maior_palavra):
                self._maior_palavra = palavra
        
        atual.frequencia += 1
        
        # Limpa cache se palavra foi modificada
        self._invalidar_cache_relacionado(palavra)
    
    def _invalidar_cache_relacionado(self, palavra: str) -> None:
        """Invalida entradas de cache relacionadas à palavra"""
        keys_para_remover = []
        for prefixo in self._cache_sugestoes.keys():
            if palavra.startswith(prefixo) or prefixo.startswith(palavra[:len(prefixo)]):
                keys_para_remover.append(prefixo)
        
        for key in keys_para_remover:
            del self._cache_sugestoes[key]
    
    def buscar(self, palavra: str) -> bool:
        """Verifica se palavra existe na Trie - O(m)"""
        self._total_buscas += 1
        no = self._buscar_no(palavra.lower().strip())
        return no is not None and no.eh_fim_palavra
    
    def _buscar_no(self, palavra: str) -> Optional[NoTrie]:
        """Busca nó correspondente à palavra"""
        atual = self._raiz
        
        for char in palavra:
            if char not in atual.filhos:
                return None
            atual = atual.filhos[char]
        
        return atual
    
    def obter_sugestoes(self, prefixo: str, limite: int = 10) -> List[str]:
        """Retorna sugestões ordenadas por relevância com cache"""
        if not prefixo:
            return []
        
        prefixo = prefixo.lower().strip()
        
        # Verifica cache
        if prefixo in self._cache_sugestoes:
            self._cache_hits += 1
            return self._cache_sugestoes[prefixo][:limite]
        
        self._cache_misses += 1
        
        # Busca sugestões
        no_prefixo = self._buscar_no(prefixo)
        if not no_prefixo:
            return []
        
        sugestoes = []
        self._coletar_palavras(no_prefixo, prefixo, sugestoes, limite * 2)
        
        # Ordena por frequência e relevância
        sugestoes.sort(key=lambda x: (-x[1], len(x[0]), x[0]))
        palavras_finais = [palavra for palavra, freq in sugestoes[:limite]]
        
        # Atualiza cache
        if len(self._cache_sugestoes) < self._max_cache:
            self._cache_sugestoes[prefixo] = palavras_finais
        
        return palavras_finais
    
    def _coletar_palavras(self, no: NoTrie, prefixo: str, 
                         sugestoes: List[Tuple[str, int]], limite: int) -> None:
        """Coleta palavras recursivamente com frequência"""
        if len(sugestoes) >= limite:
            return
        
        if no.eh_fim_palavra:
            sugestoes.append((prefixo, no.frequencia))
        
        # Ordena filhos por frequência para priorizar caminhos mais usados
        filhos_ordenados = sorted(
            no.filhos.items(),
            key=lambda x: x[1].frequencia,
            reverse=True
        )
        
        for char, filho in filhos_ordenados:
            self._coletar_palavras(filho, prefixo + char, sugestoes, limite)
    
    def sugerir_correcoes(self, palavra: str, max_distancia: int = 2) -> List[str]:
        """Sugere correções usando distância de edição"""
        palavra = palavra.lower().strip()
        sugestoes = []
        self._buscar_com_distancia(self._raiz, "", palavra, max_distancia, sugestoes)
        
        # Ordena por distância e frequência
        sugestoes.sort(key=lambda x: (x[1], -x[2]))
        return [palavra for palavra, dist, freq in sugestoes[:10]]
    
    def _buscar_com_distancia(self, no: NoTrie, palavra_atual: str, 
                             palavra_alvo: str, max_dist: int, 
                             sugestoes: List[Tuple[str, int, int]]) -> None:
        """Busca palavras com distância de edição limitada"""
        if max_dist < 0 or len(sugestoes) >= 50:  # Limita busca
            return
        
        if no.eh_fim_palavra:
            distancia = self._distancia_levenshtein(palavra_atual, palavra_alvo)
            if distancia <= max_dist:
                sugestoes.append((palavra_atual, distancia, no.frequencia))
        
        for char, filho in no.filhos.items():
            # Operações de edição: inserção, substituição, deleção
            self._buscar_com_distancia(filho, palavra_atual + char, 
                                     palavra_alvo, max_dist - 1, sugestoes)
    
    def _distancia_levenshtein(self, s1: str, s2: str) -> int:
        """Calcula distância de Levenshtein otimizada"""
        if len(s1) < len(s2):
            return self._distancia_levenshtein(s2, s1)
        
        if len(s2) == 0:
            return len(s1)
        
        # Otimização: usa apenas duas linhas em vez de matriz completa
        linha_anterior = list(range(len(s2) + 1))
        for i, c1 in enumerate(s1):
            linha_atual = [i + 1]
            for j, c2 in enumerate(s2):
                insercoes = linha_anterior[j + 1] + 1
                delecoes = linha_atual[j] + 1
                substituicoes = linha_anterior[j] + (c1 != c2)
                linha_atual.append(min(insercoes, delecoes, substituicoes))
            linha_anterior = linha_atual
        
        return linha_anterior[-1]
    
    def estatisticas(self) -> Dict[str, Any]:
        """Retorna estatísticas detalhadas da Trie"""
        taxa_cache = self._cache_hits / max(self._total_buscas, 1)
        fator_compressao = self._total_nos / max(self._total_palavras, 1)
        
        return {
            'estrutura': 'Trie',
            'conteudo': {
                'total_palavras': self._total_palavras,
                'total_nos': self._total_nos,
                'maior_palavra': self._maior_palavra,
                'comprimento_medio': sum(k * v for k, v in self._palavras_por_comprimento.items()) / max(self._total_palavras, 1)
            },
            'eficiencia': {
                'fator_compressao': fator_compressao,
                'taxa_acerto_cache': taxa_cache,
                'cache_hits': self._cache_hits,
                'cache_misses': self._cache_misses
            },
            'distribuicao': {
                'palavras_por_comprimento': dict(self._palavras_por_comprimento),
                'entradas_cache': len(self._cache_sugestoes)
            },
            'memoria': {
                'estimativa_bytes': self._calcular_memoria_estimada(),
                'nos_por_palavra': fator_compressao
            }
        }
    
    def _calcular_memoria_estimada(self) -> int:
        """Estima uso de memória da Trie"""
        # Estimativa conservadora
        bytes_por_no = 64  # NoTrie + overhead Python
        bytes_por_char = 8  # Caracteres em dicionários
        
        memoria_nos = self._total_nos * bytes_por_no
        memoria_chars = sum(len(palavra) for palavra in self._obter_todas_palavras()) * bytes_por_char
        memoria_cache = len(self._cache_sugestoes) * 100  # Estimativa do cache
        
        return memoria_nos + memoria_chars + memoria_cache
    
    def _obter_todas_palavras(self) -> List[str]:
        """Retorna todas as palavras na Trie"""
        palavras = []
        
        def coletar_todas(no: NoTrie, palavra_atual: str):
            if no.eh_fim_palavra:
                palavras.append(palavra_atual)
            
            for char, filho in no.filhos.items():
                coletar_todas(filho, palavra_atual + char)
        
        coletar_todas(self._raiz, "")
        return palavras

# =======================================
# SISTEMA DE DEMONSTRAÇÃO INTEGRADO
# =======================================

class SistemaDemonstracao:
    """Sistema completo de demonstração e benchmark de estruturas hierárquicas"""
    
    def __init__(self):
        self.avl = ArvoreAVL[int]()
        self.heap = MinHeap[int]()
        self.trie = Trie()
        self.resultados: Dict[str, Dict[str, Any]] = {}
    
    def executar_demonstracao_completa(self):
        """Executa demonstração completa com todos os benchmarks"""
        print("🌳 SISTEMA COMPLETO DE DEMONSTRAÇÃO - ÁRVORES E ESTRUTURAS HIERÁRQUICAS")
        print("=" * 80)
        print()
        
        # 1. Benchmark AVL
        self._benchmark_avl()
        
        # 2. Benchmark Heap
        self._benchmark_heap()
        
        # 3. Benchmark Trie
        self._benchmark_trie()
        
        # 4. Comparação final
        self._gerar_comparacao_final()
        
        # 5. Exportar resultados
        self._exportar_resultados()
    
    def _benchmark_avl(self):
        """Benchmark detalhado da árvore AVL"""
        print("1. 🔍 BENCHMARK ÁRVORE AVL")
        print("-" * 40)
        
        # Teste com diferentes tipos de dados
        cenarios = {
            'ordenado': list(range(1, 1001)),
            'reverso': list(range(1000, 0, -1)),
            'aleatorio': random.sample(range(1, 10001), 1000)
        }
        
        for nome, dados in cenarios.items():
            print(f"\nCenário: {nome.upper()}")
            
            avl_teste = ArvoreAVL[int]()
            
            # Medição de inserção
            inicio = time.perf_counter()
            for valor in dados:
                avl_teste.inserir(valor)
            tempo_insercao = time.perf_counter() - inicio
            
            # Medição de busca
            valores_busca = random.sample(dados, min(100, len(dados)))
            inicio = time.perf_counter()
            encontrados = sum(1 for v in valores_busca if avl_teste.buscar(v))
            tempo_busca = time.perf_counter() - inicio
            
            # Relatório
            relatorio = avl_teste.relatorio_performance()
            
            print(f"  ✓ Elementos inseridos: {avl_teste.tamanho()}")
            print(f"  ✓ Altura alcançada: {avl_teste.altura()} (ótimo: {int(len(dados).bit_length())-1})")
            print(f"  ✓ Rotações realizadas: {relatorio['rotacoes']['total']}")
            print(f"  ✓ Tempo inserção: {tempo_insercao*1000:.2f}ms")
            print(f"  ✓ Tempo busca: {tempo_busca*1000:.2f}ms ({encontrados}/100 encontrados)")
            print(f"  ✓ Fator balanceamento: {relatorio['balanceamento']['fator_balanceamento_medio']:.2f}")
            
            self.resultados[f'avl_{nome}'] = {
                'altura': avl_teste.altura(),
                'rotacoes': relatorio['rotacoes']['total'],
                'tempo_insercao_ms': tempo_insercao * 1000,
                'tempo_busca_ms': tempo_busca * 1000,
                'balanceada': relatorio['balanceamento']['eh_balanceada']
            }
    
    def _benchmark_heap(self):
        """Benchmark do Min-Heap"""
        print("\n\n2. 📊 BENCHMARK MIN-HEAP")
        print("-" * 30)
        
        # Gera dados de teste
        tamanhos = [100, 500, 1000, 5000]
        
        for tamanho in tamanhos:
            dados = [random.randint(1, tamanho * 10) for _ in range(tamanho)]
            
            print(f"\nTeste com {tamanho} elementos:")
            
            heap_teste = MinHeap[int]()
            
            # Teste construção
            inicio = time.perf_counter()
            heap_teste.construir_heap(dados.copy())
            tempo_construcao = time.perf_counter() - inicio
            
            # Teste ordenação completa
            inicio = time.perf_counter()
            ordenados = heap_teste.heap_sort(dados.copy())
            tempo_ordenacao = time.perf_counter() - inicio
            
            # Verifica ordenação
            esta_ordenado = all(ordenados[i] <= ordenados[i+1] for i in range(len(ordenados)-1))
            
            stats = heap_teste.estatisticas()
            
            print(f"  ✓ Construção heap: {tempo_construcao*1000:.2f}ms")
            print(f"  ✓ Heap sort completo: {tempo_ordenacao*1000:.2f}ms")
            print(f"  ✓ Comparações: {stats['performance']['comparacoes_realizadas']:,}")
            print(f"  ✓ Resultado correto: {'Sim' if esta_ordenado else 'Não'}")
            print(f"  ✓ Eficiência: {stats['performance']['eficiencia_comparacoes']:.2f}")
            
            self.resultados[f'heap_{tamanho}'] = {
                'tempo_construcao_ms': tempo_construcao * 1000,
                'tempo_ordenacao_ms': tempo_ordenacao * 1000,
                'comparacoes': stats['performance']['comparacoes_realizadas'],
                'correto': esta_ordenado
            }
    
    def _benchmark_trie(self):
        """Benchmark da Trie para autocomplete"""
        print("\n\n3. 🔤 BENCHMARK TRIE (AUTOCOMPLETE)")
        print("-" * 45)
        
        # Carrega dicionário de exemplo
        palavras = [
            "python", "programming", "algorithm", "structure", "data",
            "tree", "binary", "search", "complexity", "analysis",
            "implementation", "optimization", "performance", "benchmark",
            "development", "software", "computer", "science", "technology",
            "artificial", "intelligence", "machine", "learning", "neural",
            "network", "database", "framework", "library", "application"
        ]
        
        # Expande com variações
        palavras_expandidas = []
        for palavra in palavras:
            palavras_expandidas.append(palavra)
            palavras_expandidas.append(palavra + "s")  # plural
            palavras_expandidas.append(palavra + "ing")  # gerúndio
        
        # Adiciona palavras com frequências variadas
        inicio = time.perf_counter()
        for palavra in palavras_expandidas:
            freq = random.randint(1, 20)
            for _ in range(freq):
                self.trie.inserir(palavra)
        tempo_carregamento = time.perf_counter() - inicio
        
        print(f"Dicionário carregado: {self.trie._total_palavras} palavras únicas")
        print(f"Tempo de carregamento: {tempo_carregamento*1000:.2f}ms")
        
        # Teste de autocomplete
        prefixos_teste = ["prog", "alg", "comp", "tech", "data", "mach", "art"]
        
        print(f"\nTeste de autocomplete:")
        tempo_total_autocomplete = 0
        
        for prefixo in prefixos_teste:
            inicio = time.perf_counter()
            sugestoes = self.trie.obter_sugestoes(prefixo, 5)
            tempo_busca = time.perf_counter() - inicio
            tempo_total_autocomplete += tempo_busca
            
            print(f"  '{prefixo}' → {sugestoes}")
        
        # Teste de correção ortográfica
        palavras_erradas = ["programing", "algoritm", "comuter", "tecnology"]
        
        print(f"\nTeste de correção ortográfica:")
        tempo_total_correcao = 0
        
        for palavra in palavras_erradas:
            inicio = time.perf_counter()
            correcoes = self.trie.sugerir_correcoes(palavra, 2)
            tempo_correcao = time.perf_counter() - inicio
            tempo_total_correcao += tempo_correcao
            
            print(f"  '{palavra}' → {correcoes[:3]}")
        
        # Estatísticas finais
        stats = self.trie.estatisticas()
        
        print(f"\n📈 Estatísticas da Trie:")
        print(f"  ✓ Nós criados: {stats['conteudo']['total_nos']:,}")
        print(f"  ✓ Fator de compressão: {stats['eficiencia']['fator_compressao']:.2f}")
        print(f"  ✓ Taxa de acerto do cache: {stats['eficiencia']['taxa_acerto_cache']:.2%}")
        print(f"  ✓ Tempo médio autocomplete: {tempo_total_autocomplete/len(prefixos_teste)*1000:.2f}ms")
        print(f"  ✓ Tempo médio correção: {tempo_total_correcao/len(palavras_erradas)*1000:.2f}ms")
        
        self.resultados['trie'] = {
            'palavras': stats['conteudo']['total_palavras'],
            'nos': stats['conteudo']['total_nos'],
            'fator_compressao': stats['eficiencia']['fator_compressao'],
            'tempo_autocomplete_ms': tempo_total_autocomplete / len(prefixos_teste) * 1000,
            'tempo_correcao_ms': tempo_total_correcao / len(palavras_erradas) * 1000,
            'taxa_cache': stats['eficiencia']['taxa_acerto_cache']
        }
    
    def _gerar_comparacao_final(self):
        """Gera comparação final entre todas as estruturas"""
        print("\n\n4. 🏆 COMPARAÇÃO FINAL E RECOMENDAÇÕES")
        print("=" * 50)
        
        print("\n📊 TABELA COMPARATIVA DE PERFORMANCE:")
        print("-" * 80)
        print(f"{'ESTRUTURA':<20} | {'OPERAÇÃO':<15} | {'TEMPO (ms)':<12} | {'OBSERVAÇÕES'}")
        print("-" * 80)
        
        # AVL
        avl_ord = self.resultados.get('avl_ordenado', {})
        avl_ale = self.resultados.get('avl_aleatorio', {})
        print(f"{'AVL (ordenado)':<20} | {'Inserção':<15} | {avl_ord.get('tempo_insercao_ms', 0):<12.2f} | Pior caso BST")
        print(f"{'AVL (aleatório)':<20} | {'Inserção':<15} | {avl_ale.get('tempo_insercao_ms', 0):<12.2f} | Caso médio")
        
        # Heap
        heap_1000 = self.resultados.get('heap_1000', {})
        print(f"{'Heap (1000)':<20} | {'Construção':<15} | {heap_1000.get('tempo_construcao_ms', 0):<12.2f} | O(n) Floyd")
        print(f"{'Heap Sort':<20} | {'Ordenação':<15} | {heap_1000.get('tempo_ordenacao_ms', 0):<12.2f} | O(n log n)")
        
        # Trie
        trie_data = self.resultados.get('trie', {})
        print(f"{'Trie':<20} | {'Autocomplete':<15} | {trie_data.get('tempo_autocomplete_ms', 0):<12.2f} | O(p + k)")
        print(f"{'Trie':<20} | {'Correção':<15} | {trie_data.get('tempo_correcao_ms', 0):<12.2f} | Edit distance")
        
        print("\n🎯 RECOMENDAÇÕES DE USO:")
        print("+" + "-" * 70 + "+")
        print("| CENÁRIO                           | ESTRUTURA RECOMENDADA             |")
        print("+" + "-" * 70 + "+")
        print("| Buscas frequentes, dados dinâmicos| AVL Tree                          |")
        print("| Ordenação eficiente               | Heap Sort                         |")
        print("| Filas de prioridade               | Min/Max Heap                      |")
        print("| Autocomplete/Busca de prefixos    | Trie                              |")
        print("| Correção ortográfica              | Trie + Levenshtein                |")
        print("| Dados majoritariamente ordenados  | AVL (evita degeneração BST)       |")
        print("+" + "-" * 70 + "+")
        
        print("\n💡 INSIGHTS DE PERFORMANCE:")
        print(f"• AVL mantém altura O(log n) mesmo com dados ordenados")
        print(f"• Heap Sort é {heap_1000.get('tempo_ordenacao_ms', 0)/avl_ord.get('tempo_insercao_ms', 1):.1f}x mais rápido que inserção AVL ordenada")
        print(f"• Trie tem fator de compressão de {trie_data.get('fator_compressao', 0):.1f}x")
        print(f"• Cache da Trie atinge {trie_data.get('taxa_cache', 0):.1%} de acerto")
    
    def _exportar_resultados(self):
        """Exporta resultados para arquivo JSON"""
        timestamp = time.strftime("%Y%m%d_%H%M%S")
        nome_arquivo = f"benchmark_arvores_{timestamp}.json"
        
        dados_exportacao = {
            'timestamp': timestamp,
            'configuracao': {
                'sistema': 'Python',
                'estruturas_testadas': ['AVL', 'MinHeap', 'Trie'],
                'tamanhos_teste': [100, 500, 1000, 5000]
            },
            'resultados': self.resultados,
            'resumo': {
                'total_testes': len(self.resultados),
                'tempo_total_execucao': sum(
                    r.get('tempo_insercao_ms', 0) + r.get('tempo_busca_ms', 0) 
                    for r in self.resultados.values()
                )
            }
        }
        
        try:
            with open(nome_arquivo, 'w', encoding='utf-8') as f:
                json.dump(dados_exportacao, f, indent=2, ensure_ascii=False)
            
            print(f"\n💾 Resultados exportados para: {nome_arquivo}")
            print(f"📊 Total de {len(self.resultados)} testes realizados")
            
        except Exception as e:
            print(f"\n❌ Erro ao exportar resultados: {e}")

# =======================================
# EXECUÇÃO DA DEMONSTRAÇÃO
# =======================================

def main():
    """Função principal para execução da demonstração"""
    print("Iniciando demonstração completa...")
    print("Isso pode levar alguns minutos dependendo do hardware.\n")
    
    demonstrador = SistemaDemonstracao()
    
    try:
        demonstrador.executar_demonstracao_completa()
        
        print("\n" + "=" * 80)
        print("✅ DEMONSTRAÇÃO CONCLUÍDA COM SUCESSO!")
        print("=" * 80)
        print("\nEste benchmark demonstrou:")
        print("• Implementação completa de AVL, Heap e Trie")
        print("• Análise comparativa de performance")
        print("• Aplicações práticas em cenários reais")
        print("• Otimizações específicas para cada estrutura")
        print("\nTodos os resultados foram salvos para análise posterior.")
        
    except KeyboardInterrupt:
        print("\n\n⚠️  Demonstração interrompida pelo usuário")
        
    except Exception as e:
        print(f"\n\n❌ Erro durante execução: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
