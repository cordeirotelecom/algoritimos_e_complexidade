# Laboratório Avançado: Estruturas de Dados Dinâmicas

**Curso:** Algoritmos e Complexidade  
**Professor:** Vagner Cordeiro  
**Duração:** 4 horas (2 sessões de 2h)  
**Pré-requisitos:** Conhecimento básico de ponteiros, malloc/free, conceitos de OOP

---

## Objetivos do Laboratório

### Objetivos Primários
- **Implementar** estruturas de dados dinâmicas robustas em C e Python
- **Analisar** performance e uso de memória em cenários reais
- **Depurar** problemas comuns como vazamentos de memória e corrupção de dados
- **Comparar** diferentes implementações e suas implicações de performance

### Objetivos Secundários  
- **Desenvolver** aplicações práticas usando as estruturas implementadas
- **Aplicar** técnicas de profiling e debugging avançado
- **Otimizar** código para diferentes cenários de uso
- **Documentar** decisões de design e trade-offs

---

## Parte 1: Implementação e Testes Básicos (120 minutos)

### Exercício 1.1: Lista Ligada Genérica em C (40 min)

**Objetivo:** Implementar uma lista ligada que funcione com qualquer tipo de dado.

#### Especificações Técnicas:
- **Entrada:** Ponteiros void* para dados genéricos
- **Saída:** Estrutura de dados funcional com operações CRUD
- **Complexidade Esperada:** O(1) para inserção/remoção no início, O(n) para acesso por índice

```c
// Arquivo: lista_generica.h
// Complete a implementação seguindo o template:

typedef struct No {
    void *dados;
    struct No *proximo;
} No;

typedef struct {
    No *cabeca;
    No *cauda;
    size_t tamanho;
    size_t tamanho_elemento;
    
    // Função para comparar elementos
    int (*comparar)(const void *a, const void *b);
    
    // Função para liberar memoria de elementos
    void (*destruir_elemento)(void *elemento);
} ListaGenerica;

// TODO: Implemente estas funções
ListaGenerica* lista_criar(size_t tamanho_elemento);
void lista_destruir(ListaGenerica *lista);
int lista_inserir_ordenado(ListaGenerica *lista, const void *dados);
int lista_buscar(const ListaGenerica *lista, const void *dados, size_t *posicao);
int lista_remover_valor(ListaGenerica *lista, const void *dados);
void lista_imprimir(const ListaGenerica *lista, void (*imprimir)(const void *));
```

#### Casos de Teste Obrigatórios:

```c
// teste_lista_generica.c
#include <assert.h>
#include <string.h>

// Teste 1: Lista de inteiros
void teste_lista_inteiros() {
    ListaGenerica *lista = lista_criar(sizeof(int));
    
    // Inserção de elementos
    int valores[] = {42, 17, 89, 3, 56};
    for (int i = 0; i < 5; i++) {
        assert(lista_inserir_ordenado(lista, &valores[i]) == 0);
    }
    
    assert(lista->tamanho == 5);
    
    // Teste de busca
    int busca = 89;
    size_t posicao;
    assert(lista_buscar(lista, &busca, &posicao) == 0);
    
    // Teste de remoção
    assert(lista_remover_valor(lista, &busca) == 0);
    assert(lista->tamanho == 4);
    
    lista_destruir(lista);
}

// Teste 2: Lista de strings
typedef struct {
    char nome[50];
    int idade;
} Pessoa;

int comparar_pessoas(const void *a, const void *b) {
    const Pessoa *p1 = (const Pessoa *)a;
    const Pessoa *p2 = (const Pessoa *)b;
    return strcmp(p1->nome, p2->nome);
}

void teste_lista_pessoas() {
    ListaGenerica *lista = lista_criar(sizeof(Pessoa));
    lista->comparar = comparar_pessoas;
    
    Pessoa pessoas[] = {
        {"Alice", 30},
        {"Bob", 25}, 
        {"Carol", 35},
        {"David", 28}
    };
    
    // TODO: Implemente os testes para estruturas complexas
    // - Inserção ordenada por nome
    // - Busca por pessoa específica
    // - Remoção e verificação de integridade
    // - Teste de vazamentos de memória
    
    lista_destruir(lista);
}

int main() {
    printf("Executando testes da lista genérica...\n");
    
    teste_lista_inteiros();
    printf("✓ Teste de inteiros passou\n");
    
    teste_lista_pessoas();
    printf("✓ Teste de pessoas passou\n");
    
    printf("Todos os testes passaram!\n");
    return 0;
}
```

#### Critérios de Avaliação:
- **Funcionalidade (40%):** Todos os testes passam
- **Robustez (30%):** Tratamento de erros e casos extremos
- **Eficiência (20%):** Complexidade temporal adequada
- **Código (10%):** Legibilidade e documentação

---

### Exercício 1.2: Stack-based Calculator em Python (40 min)

**Objetivo:** Implementar uma calculadora que processa expressões matemáticas usando pilha.

#### Especificações:
- **Entrada:** Expressões matemáticas em notação infixa
- **Saída:** Resultado numérico ou mensagem de erro
- **Suporte:** Operadores básicos (+, -, *, /), parênteses, funções (sin, cos, log)

```python
# Arquivo: calculadora_avancada.py
from typing import List, Union, Optional
import math
import re

class CalculadoraAvancada:
    """
    Calculadora que processa expressões matemáticas complexas
    """
    
    def __init__(self):
        # TODO: Inicialize as estruturas necessárias
        pass
    
    def processar_expressao(self, expressao: str) -> float:
        """
        Processa uma expressão matemática e retorna o resultado
        
        Args:
            expressao: String contendo a expressão matemática
            
        Returns:
            Resultado numérico da expressão
            
        Raises:
            ValueError: Se a expressão for inválida
            ZeroDivisionError: Se houver divisão por zero
        """
        # TODO: Implemente o processamento completo
        # 1. Tokenização da expressão
        # 2. Conversão infixa -> pós-fixa (Shunting Yard)
        # 3. Avaliação da expressão pós-fixa
        pass
    
    def tokenizar(self, expressao: str) -> List[str]:
        """Converte expressão em lista de tokens"""
        # TODO: Implemente tokenização robusta
        # Deve lidar com números decimais, funções, operadores
        pass
    
    def infixa_para_posfixa(self, tokens: List[str]) -> List[str]:
        """Implementa algoritmo Shunting Yard"""
        # TODO: Converta notação infixa para pós-fixa
        pass
    
    def avaliar_posfixa(self, tokens: List[str]) -> float:
        """Avalia expressão em notação pós-fixa usando pilha"""
        # TODO: Use pilha para avaliar expressão pós-fixa
        pass
```

#### Casos de Teste Exigidos:

```python
# teste_calculadora.py
import unittest
import math

class TestCalculadoraAvancada(unittest.TestCase):
    
    def setUp(self):
        self.calc = CalculadoraAvancada()
    
    def test_operacoes_basicas(self):
        """Teste operações aritméticas básicas"""
        test_cases = [
            ("2 + 3", 5),
            ("10 - 4", 6),
            ("3 * 7", 21),
            ("15 / 3", 5),
            ("2 ** 3", 8),  # Potenciação
        ]
        
        for expressao, esperado in test_cases:
            with self.subTest(expressao=expressao):
                resultado = self.calc.processar_expressao(expressao)
                self.assertAlmostEqual(resultado, esperado, places=6)
    
    def test_precedencia_operadores(self):
        """Teste precedência de operadores"""
        test_cases = [
            ("2 + 3 * 4", 14),      # Não (2+3)*4 = 20
            ("(2 + 3) * 4", 20),    # Parênteses mudam precedência
            ("2 ** 3 ** 2", 512),   # Associatividade à direita
            ("10 - 4 - 2", 4),      # Associatividade à esquerda
        ]
        
        for expressao, esperado in test_cases:
            with self.subTest(expressao=expressao):
                resultado = self.calc.processar_expressao(expressao)
                self.assertAlmostEqual(resultado, esperado, places=6)
    
    def test_funcoes_matematicas(self):
        """Teste funções matemáticas"""
        test_cases = [
            ("sin(0)", 0),
            ("cos(0)", 1),
            ("sqrt(16)", 4),
            ("log(2.718281828)", 1),
            ("abs(-5)", 5),
        ]
        
        for expressao, esperado in test_cases:
            with self.subTest(expressao=expressao):
                resultado = self.calc.processar_expressao(expressao)
                self.assertAlmostEqual(resultado, esperado, places=3)
    
    def test_expressoes_complexas(self):
        """Teste expressões complexas"""
        test_cases = [
            ("(3 + 4) * (2 + 1)", 21),
            ("sqrt(sin(0)**2 + cos(0)**2)", 1),
            ("2 * (3 + 4) - 5 / (2 - 1)", 9),
        ]
        
        for expressao, esperado in test_cases:
            with self.subTest(expressao=expressao):
                resultado = self.calc.processar_expressao(expressao)
                self.assertAlmostEqual(resultado, esperado, places=6)
    
    def test_casos_erro(self):
        """Teste casos que devem gerar erro"""
        casos_erro = [
            "1 / 0",           # Divisão por zero
            "2 + + 3",         # Operador duplicado
            "(2 + 3",          # Parênteses não fechado
            "2 + 3)",          # Parênteses extra
            "sqrt(-1)",        # Raiz de número negativo
        ]
        
        for expressao in casos_erro:
            with self.subTest(expressao=expressao):
                with self.assertRaises((ValueError, ZeroDivisionError)):
                    self.calc.processar_expressao(expressao)

if __name__ == "__main__":
    unittest.main()
```

---

### Exercício 1.3: Performance Benchmarking (40 min)

**Objetivo:** Comparar performance de diferentes implementações de estruturas de dados.

#### Especificações do Benchmark:

```python
# benchmark_estruturas.py
import time
import random
import psutil
import matplotlib.pyplot as plt
from typing import List, Dict, Callable
import gc

class BenchmarkEstruturasDeados:
    """
    Suite completa de benchmarks para estruturas de dados
    """
    
    def __init__(self):
        self.resultados = {}
        self.tamanhos_teste = [100, 500, 1000, 5000, 10000, 50000]
    
    def benchmark_lista_vs_array(self) -> Dict:
        """Compara lista ligada vs array para diferentes operações"""
        
        resultados = {
            'tamanhos': self.tamanhos_teste,
            'insercao_inicio_lista': [],
            'insercao_inicio_array': [],
            'acesso_aleatorio_lista': [],
            'acesso_aleatorio_array': [],
            'busca_sequencial_lista': [],
            'busca_sequencial_array': [],
        }
        
        for n in self.tamanhos_teste:
            print(f"Testando tamanho {n}...")
            
            # TODO: Implemente benchmarks para:
            # 1. Inserção no início (lista vs array com shift)
            # 2. Acesso aleatório por índice  
            # 3. Busca sequencial
            # 4. Uso de memória
            
            # Exemplo de estrutura:
            # tempo_lista = self._benchmark_insercao_lista(n)
            # tempo_array = self._benchmark_insercao_array(n)
            # resultados['insercao_inicio_lista'].append(tempo_lista)
            # resultados['insercao_inicio_array'].append(tempo_array)
        
        return resultados
    
    def _benchmark_insercao_lista(self, n: int) -> float:
        """Benchmark específico para inserção em lista ligada"""
        # TODO: Implemente
        pass
    
    def _benchmark_insercao_array(self, n: int) -> float:
        """Benchmark específico para inserção em array"""
        # TODO: Implemente
        pass
    
    def benchmark_pilha_implementacoes(self) -> Dict:
        """Compara diferentes implementações de pilha"""
        
        implementacoes = {
            'lista_python': list,
            'pilha_array': None,  # Sua implementação
            'pilha_ligada': None, # Sua implementação
        }
        
        # TODO: Teste push/pop intensivo em diferentes implementações
        pass
    
    def benchmark_memoria(self) -> Dict:
        """Analisa uso de memória de diferentes estruturas"""
        
        # TODO: Use psutil para medir uso real de memória
        # Compare overhead de ponteiros vs arrays contíguos
        pass
    
    def gerar_relatorio(self):
        """Gera gráficos e relatório dos benchmarks"""
        
        # TODO: Use matplotlib para gerar gráficos comparativos
        # - Tempo vs tamanho para diferentes operações
        # - Uso de memória vs tamanho
        # - Throughput (ops/sec) para diferentes estruturas
        pass

# Exemplo de uso
def executar_benchmarks():
    benchmark = BenchmarkEstruturasDeados()
    
    print("Executando benchmarks...")
    
    # Execute os benchmarks
    resultado_lista_array = benchmark.benchmark_lista_vs_array()
    resultado_pilhas = benchmark.benchmark_pilha_implementacoes()
    resultado_memoria = benchmark.benchmark_memoria()
    
    # Gere relatório
    benchmark.gerar_relatorio()
    
    print("Benchmarks concluídos! Verifique os gráficos gerados.")

if __name__ == "__main__":
    executar_benchmarks()
```

---

## Parte 2: Aplicações Práticas Avançadas (120 minutos)

### Exercício 2.1: Sistema de Undo/Redo (50 min)

**Objetivo:** Implementar sistema de desfazer/refazer usando pilhas para um editor de texto.

#### Especificações:

```python
# editor_com_undo.py
from typing import List, Optional, Any
from abc import ABC, abstractmethod
from dataclasses import dataclass
import time

class Comando(ABC):
    """Interface para o padrão Command"""
    
    @abstractmethod
    def executar(self) -> None:
        pass
    
    @abstractmethod
    def desfazer(self) -> None:
        pass
    
    @abstractmethod
    def descricao(self) -> str:
        pass

@dataclass
class ComandoInserirTexto(Comando):
    editor: 'EditorTexto'
    posicao: int
    texto: str
    
    def executar(self) -> None:
        # TODO: Implemente inserção de texto
        pass
    
    def desfazer(self) -> None:
        # TODO: Implemente remoção do texto inserido
        pass
    
    def descricao(self) -> str:
        return f"Inserir '{self.texto}' na posição {self.posicao}"

@dataclass  
class ComandoRemoverTexto(Comando):
    editor: 'EditorTexto'
    posicao: int
    quantidade: int
    texto_removido: str = ""
    
    def executar(self) -> None:
        # TODO: Implemente remoção de texto
        pass
    
    def desfazer(self) -> None:
        # TODO: Implemente restauração do texto
        pass
    
    def descricao(self) -> str:
        return f"Remover {self.quantidade} caracteres da posição {self.posicao}"

class EditorTexto:
    """Editor de texto com sistema de undo/redo"""
    
    def __init__(self, max_historico: int = 100):
        self.conteudo: List[str] = []
        self.pilha_undo: List[Comando] = []
        self.pilha_redo: List[Comando] = []
        self.max_historico = max_historico
        
    def executar_comando(self, comando: Comando) -> None:
        """Executa comando e adiciona ao histórico"""
        # TODO: Implemente execução de comando
        # - Execute o comando
        # - Adicione à pilha de undo
        # - Limpe pilha de redo
        # - Mantenha tamanho máximo do histórico
        pass
    
    def undo(self) -> bool:
        """Desfaz último comando"""
        # TODO: Implemente undo
        # - Retire comando da pilha undo
        # - Execute desfazer()
        # - Adicione à pilha redo
        pass
    
    def redo(self) -> bool:
        """Refaz último comando desfeito"""
        # TODO: Implemente redo
        pass
    
    def inserir_texto(self, posicao: int, texto: str) -> None:
        """Interface pública para inserção"""
        comando = ComandoInserirTexto(self, posicao, texto)
        self.executar_comando(comando)
    
    def remover_texto(self, posicao: int, quantidade: int) -> None:
        """Interface pública para remoção"""
        comando = ComandoRemoverTexto(self, posicao, quantidade)
        self.executar_comando(comando)
    
    def obter_conteudo(self) -> str:
        """Retorna conteúdo atual como string"""
        return ''.join(self.conteudo)
    
    def historico_undo(self) -> List[str]:
        """Retorna descrições dos comandos que podem ser desfeitos"""
        return [cmd.descricao() for cmd in reversed(self.pilha_undo)]
    
    def historico_redo(self) -> List[str]:
        """Retorna descrições dos comandos que podem ser refeitos"""
        return [cmd.descricao() for cmd in reversed(self.pilha_redo)]
```

#### Casos de Teste:

```python
# teste_editor.py
import unittest

class TestEditorTexto(unittest.TestCase):
    
    def setUp(self):
        self.editor = EditorTexto()
    
    def test_insercao_basica(self):
        """Teste inserção básica de texto"""
        self.editor.inserir_texto(0, "Hello")
        self.assertEqual(self.editor.obter_conteudo(), "Hello")
        
        self.editor.inserir_texto(5, " World")
        self.assertEqual(self.editor.obter_conteudo(), "Hello World")
    
    def test_undo_redo_insercao(self):
        """Teste undo/redo para inserção"""
        self.editor.inserir_texto(0, "Hello")
        self.editor.inserir_texto(5, " World")
        
        # Desfaz última inserção
        self.assertTrue(self.editor.undo())
        self.assertEqual(self.editor.obter_conteudo(), "Hello")
        
        # Refaz inserção
        self.assertTrue(self.editor.redo())
        self.assertEqual(self.editor.obter_conteudo(), "Hello World")
    
    def test_remocao_com_undo(self):
        """Teste remoção com undo"""
        self.editor.inserir_texto(0, "Hello World")
        self.editor.remover_texto(5, 6)  # Remove " World"
        self.assertEqual(self.editor.obter_conteudo(), "Hello")
        
        # Desfaz remoção
        self.assertTrue(self.editor.undo())
        self.assertEqual(self.editor.obter_conteudo(), "Hello World")
    
    def test_historico_limitado(self):
        """Teste limite do histórico"""
        editor = EditorTexto(max_historico=3)
        
        # Adiciona mais comandos que o limite
        for i in range(5):
            editor.inserir_texto(i, str(i))
        
        # Deve ter no máximo 3 comandos no histórico
        self.assertLessEqual(len(editor.pilha_undo), 3)
    
    def test_redo_limpo_apos_novo_comando(self):
        """Teste que redo é limpo após novo comando"""
        self.editor.inserir_texto(0, "Hello")
        self.editor.inserir_texto(5, " World")
        
        # Desfaz
        self.editor.undo()
        self.assertTrue(len(self.editor.pilha_redo) > 0)
        
        # Novo comando deve limpar redo
        self.editor.inserir_texto(5, " Python")
        self.assertEqual(len(self.editor.pilha_redo), 0)

if __name__ == "__main__":
    unittest.main()
```

---

### Exercício 2.2: Simulador de Fila de Atendimento (40 min)

**Objetivo:** Simular sistema de atendimento com múltiplas filas e prioridades.

```python
# simulador_atendimento.py
from typing import List, Optional, Dict
from dataclasses import dataclass
from enum import Enum
import random
import time
from queue import PriorityQueue
import statistics

class TipoCliente(Enum):
    NORMAL = 1
    PREFERENCIAL = 2
    VIP = 3

@dataclass
class Cliente:
    id: int
    nome: str
    tipo: TipoCliente
    tempo_chegada: float
    tempo_atendimento_estimado: int  # segundos
    
    def __lt__(self, other):
        # VIP > Preferencial > Normal
        return self.tipo.value > other.tipo.value

@dataclass
class Atendente:
    id: int
    nome: str
    cliente_atual: Optional[Cliente] = None
    tempo_fim_atendimento: float = 0
    total_atendimentos: int = 0
    tempo_total_atendimento: float = 0
    
    def esta_livre(self, tempo_atual: float) -> bool:
        return tempo_atual >= self.tempo_fim_atendimento
    
    def iniciar_atendimento(self, cliente: Cliente, tempo_atual: float):
        self.cliente_atual = cliente
        self.tempo_fim_atendimento = tempo_atual + cliente.tempo_atendimento_estimado
        self.total_atendimentos += 1
        self.tempo_total_atendimento += cliente.tempo_atendimento_estimado

class SimuladorAtendimento:
    """Simula sistema de atendimento bancário/hospitalar"""
    
    def __init__(self, num_atendentes: int = 3):
        self.fila_normal = []
        self.fila_preferencial = []
        self.fila_vip = []
        
        self.atendentes = [
            Atendente(i, f"Atendente {i+1}") 
            for i in range(num_atendentes)
        ]
        
        self.clientes_atendidos = []
        self.tempo_simulacao = 0
        self.estatisticas = {
            'tempo_espera_por_tipo': {tipo: [] for tipo in TipoCliente},
            'clientes_desistencias': 0,
            'tempo_medio_atendimento': 0,
        }
    
    def adicionar_cliente(self, cliente: Cliente):
        """Adiciona cliente à fila apropriada"""
        # TODO: Implemente adição à fila correta baseada no tipo
        pass
    
    def obter_proximo_cliente(self) -> Optional[Cliente]:
        """Obtém próximo cliente seguindo prioridades"""
        # TODO: Implemente lógica de prioridade
        # VIP > Preferencial > Normal
        # Dentro do mesmo tipo, FIFO
        pass
    
    def simular_dia_atendimento(self, duracao_horas: int = 8) -> Dict:
        """Simula um dia completo de atendimento"""
        
        duracao_segundos = duracao_horas * 3600
        tempo_atual = 0
        
        # Gera chegadas de clientes durante o dia
        cronograma_chegadas = self._gerar_cronograma_chegadas(duracao_segundos)
        
        proxima_chegada_idx = 0
        
        while tempo_atual < duracao_segundos or self._tem_clientes_na_fila():
            
            # Processa chegadas de novos clientes
            while (proxima_chegada_idx < len(cronograma_chegadas) and 
                   cronograma_chegadas[proxima_chegada_idx].tempo_chegada <= tempo_atual):
                
                cliente = cronograma_chegadas[proxima_chegada_idx]
                self.adicionar_cliente(cliente)
                proxima_chegada_idx += 1
            
            # Libera atendentes que terminaram
            for atendente in self.atendentes:
                if (atendente.cliente_atual and 
                    tempo_atual >= atendente.tempo_fim_atendimento):
                    
                    cliente_atendido = atendente.cliente_atual
                    tempo_espera = atendente.tempo_fim_atendimento - cliente_atendido.tempo_atendimento_estimado - cliente_atendido.tempo_chegada
                    
                    self.clientes_atendidos.append({
                        'cliente': cliente_atendido,
                        'tempo_espera': tempo_espera,
                        'atendente': atendente.id
                    })
                    
                    self.estatisticas['tempo_espera_por_tipo'][cliente_atendido.tipo].append(tempo_espera)
                    
                    atendente.cliente_atual = None
            
            # Atribui novos clientes aos atendentes livres
            for atendente in self.atendentes:
                if atendente.esta_livre(tempo_atual):
                    proximo_cliente = self.obter_proximo_cliente()
                    if proximo_cliente:
                        atendente.iniciar_atendimento(proximo_cliente, tempo_atual)
            
            tempo_atual += 1  # Avança 1 segundo
        
        return self._calcular_estatisticas_finais()
    
    def _gerar_cronograma_chegadas(self, duracao: int) -> List[Cliente]:
        """Gera cronograma realístico de chegadas"""
        clientes = []
        cliente_id = 1
        
        # TODO: Implemente geração realística
        # - Mais chegadas em horários de pico
        # - Distribuição realística de tipos de cliente
        # - Tempos de atendimento variáveis por tipo
        
        return clientes
    
    def _tem_clientes_na_fila(self) -> bool:
        """Verifica se há clientes em qualquer fila"""
        return (len(self.fila_normal) > 0 or 
                len(self.fila_preferencial) > 0 or 
                len(self.fila_vip) > 0)
    
    def _calcular_estatisticas_finais(self) -> Dict:
        """Calcula estatísticas finais da simulação"""
        # TODO: Calcule e retorne estatísticas detalhadas
        # - Tempo médio de espera por tipo
        # - Taxa de utilização dos atendentes
        # - Picos de fila durante o dia
        # - Tempo total de simulação
        pass

# Exemplo de uso e teste
def exemplo_simulador():
    simulador = SimuladorAtendimento(num_atendentes=4)
    
    # Simula um dia de atendimento
    estatisticas = simulador.simular_dia_atendimento(duracao_horas=8)
    
    print("=== RELATÓRIO DE ATENDIMENTO ===")
    # TODO: Imprima estatísticas formatadas

if __name__ == "__main__":
    exemplo_simulador()
```

---

### Exercício 2.3: Projeto Final - Navegador Web Simplificado (30 min)

**Objetivo:** Implementar funcionalidades básicas de um navegador usando estruturas de dados.

```python
# navegador_web.py
from typing import List, Optional, Dict
from dataclasses import dataclass
import time
import json

@dataclass
class PaginaWeb:
    url: str
    titulo: str
    conteudo: str
    timestamp: float
    tempo_carregamento: float

class HistoricoNavegacao:
    """Gerencia histórico de navegação com undo/redo"""
    
    def __init__(self, max_historico: int = 50):
        # TODO: Implemente usando estruturas apropriadas
        pass
    
    def visitar_pagina(self, pagina: PaginaWeb):
        """Adiciona página ao histórico"""
        # TODO: Implemente
        pass
    
    def voltar(self) -> Optional[PaginaWeb]:
        """Volta para página anterior"""
        # TODO: Implemente
        pass
    
    def avancar(self) -> Optional[PaginaWeb]:
        """Avança para próxima página"""
        # TODO: Implemente
        pass

class CachePaginas:
    """Cache LRU para páginas web"""
    
    def __init__(self, capacidade: int = 20):
        # TODO: Implemente cache LRU usando estruturas apropriadas
        pass
    
    def obter_pagina(self, url: str) -> Optional[PaginaWeb]:
        """Obtém página do cache"""
        # TODO: Implemente
        pass
    
    def armazenar_pagina(self, pagina: PaginaWeb):
        """Armazena página no cache"""
        # TODO: Implemente
        pass

class GerenciadorAbas:
    """Gerencia múltiplas abas do navegador"""
    
    def __init__(self):
        # TODO: Implemente usando estruturas apropriadas
        pass
    
    def nova_aba(self) -> int:
        """Cria nova aba e retorna ID"""
        # TODO: Implemente
        pass
    
    def fechar_aba(self, aba_id: int) -> bool:
        """Fecha aba especificada"""
        # TODO: Implemente
        pass
    
    def alternar_aba(self, aba_id: int) -> bool:
        """Alterna para aba especificada"""
        # TODO: Implemente
        pass

class NavegadorWeb:
    """Navegador web simplificado"""
    
    def __init__(self):
        self.historico = HistoricoNavegacao()
        self.cache = CachePaginas()
        self.gerenciador_abas = GerenciadorAbas()
        self.aba_atual = 0
        
    def navegar_para(self, url: str) -> bool:
        """Navega para URL especificada"""
        # TODO: Implemente navegação completa
        # - Verifica cache primeiro
        # - Simula carregamento se necessário
        # - Atualiza histórico
        # - Armazena no cache
        pass
    
    def simular_carregamento_pagina(self, url: str) -> PaginaWeb:
        """Simula carregamento de página web"""
        # TODO: Simule carregamento com delay realístico
        pass

# Teste integrado do navegador
def teste_navegador():
    nav = NavegadorWeb()
    
    # TODO: Implemente teste completo
    # - Navegação por múltiplas páginas
    # - Uso do botão voltar/avançar
    # - Teste do cache (hit/miss)
    # - Múltiplas abas
    # - Relatório de performance
    
    pass

if __name__ == "__main__":
    teste_navegador()
```

---

## Parte 3: Debugging e Otimização (30 minutos)

### Exercício 3.1: Detecção de Vazamentos de Memória

```c
// memory_profiler.c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Estrutura para rastrear alocações
typedef struct AlocacaoInfo {
    void *endereco;
    size_t tamanho;
    const char *arquivo;
    int linha;
    struct AlocacaoInfo *proxima;
} AlocacaoInfo;

// Lista global de alocações
static AlocacaoInfo *lista_alocacoes = NULL;
static size_t total_alocado = 0;
static size_t total_liberado = 0;

// Macros para substituir malloc/free
#define malloc_debug(tamanho) malloc_rastreado(tamanho, __FILE__, __LINE__)
#define free_debug(ptr) free_rastreado(ptr, __FILE__, __LINE__)

void* malloc_rastreado(size_t tamanho, const char *arquivo, int linha) {
    // TODO: Implemente malloc com rastreamento
    // - Aloque memória
    // - Registre alocação na lista
    // - Atualize estatísticas
}

void free_rastreado(void *ptr, const char *arquivo, int linha) {
    // TODO: Implemente free com rastreamento
    // - Encontre alocação na lista
    // - Remova da lista
    // - Libere memória
    // - Atualize estatísticas
}

void relatorio_memoria() {
    // TODO: Gere relatório de vazamentos
    printf("=== RELATÓRIO DE MEMÓRIA ===\n");
    printf("Total alocado: %zu bytes\n", total_alocado);
    printf("Total liberado: %zu bytes\n", total_liberado);
    printf("Vazamento: %zu bytes\n", total_alocado - total_liberado);
    
    // Liste vazamentos específicos
}

// Exemplo de uso
void exemplo_com_vazamento() {
    // TODO: Crie exemplos intencionais de vazamento
    // para testar o sistema de detecção
}
```

### Exercício 3.2: Profiling de Performance

```python
# profiler_performance.py
import time
import psutil
import tracemalloc
from functools import wraps
from typing import Callable, Dict, Any

class ProfilerPerformance:
    """Profiler personalizado para análise de performance"""
    
    def __init__(self):
        self.estatisticas = {}
    
    def cronometrar(self, nome: str = None):
        """Decorator para cronometrar funções"""
        def decorator(func: Callable) -> Callable:
            nome_funcao = nome or func.__name__
            
            @wraps(func)
            def wrapper(*args, **kwargs):
                # TODO: Implemente cronometragem
                # - Tempo de execução
                # - Uso de CPU
                # - Uso de memória
                # - Número de chamadas
                pass
            
            return wrapper
        return decorator
    
    def profile_memoria(self, func: Callable) -> Dict[str, Any]:
        """Faz profiling detalhado de memória"""
        # TODO: Use tracemalloc para análise detalhada
        pass
    
    def gerar_relatorio(self):
        """Gera relatório completo de performance"""
        # TODO: Gere relatório formatado
        pass

# Exemplo de uso
@ProfilerPerformance().cronometrar("teste_lista")
def teste_performance_lista():
    # TODO: Implemente teste que será perfilado
    pass
```

---

## Critérios de Avaliação Final

### Distribuição de Pontos (Total: 100 pontos)

**Implementação Básica (40 pontos)**
- Lista genérica em C: 15 pontos
- Calculadora em Python: 15 pontos  
- Benchmarks: 10 pontos

**Aplicações Avançadas (40 pontos)**
- Sistema Undo/Redo: 15 pontos
- Simulador de Atendimento: 15 pontos
- Navegador Web: 10 pontos

**Qualidade e Debugging (20 pontos)**
- Tratamento de erros: 5 pontos
- Testes unitários: 5 pontos
- Profiling/debugging: 5 pontos
- Documentação: 5 pontos

### Critérios Específicos

**Excelente (90-100 pontos)**
- Todas as funcionalidades implementadas
- Código robusto com tratamento completo de erros
- Testes abrangentes e documentação clara
- Otimizações evidentes e análise de performance

**Bom (75-89 pontos)**
- Maioria das funcionalidades implementadas
- Tratamento básico de erros
- Alguns testes e documentação adequada

**Satisfatório (60-74 pontos)**
- Funcionalidades básicas implementadas
- Tratamento mínimo de erros
- Pouca documentação

**Insatisfatório (<60 pontos)**
- Implementação incompleta
- Sem tratamento de erros
- Código não funcional

---

## Recursos Adicionais

### Ferramentas Recomendadas

**Para C:**
- Valgrind (detecção de vazamentos)
- GDB (debugging)
- Perf (profiling de performance)

**Para Python:**
- pytest (testes)
- memory_profiler (análise de memória)
- cProfile (profiling)
- pympler (análise detalhada de memória)

### Dicas de Implementação

1. **Sempre teste casos extremos:** listas vazias, elementos únicos, capacidade máxima
2. **Use ferramentas de análise:** não confie apenas em testes manuais
3. **Documente decisões de design:** explique por que escolheu determinada abordagem
4. **Implemente incrementalmente:** teste cada função antes de prosseguir
5. **Considere eficiência:** analise complexidade temporal e espacial

### Material de Consulta

- **Livros:** "Introduction to Algorithms" (Cormen), "Data Structures and Algorithms in C" (Horowitz)
- **Documentação:** Referências oficiais das linguagens
- **Ferramentas:** Man pages do Linux, documentação do GDB/Valgrind

---

**Boa sorte no laboratório! Lembre-se: o objetivo é aprender, então não hesite em fazer perguntas e experimentar diferentes abordagens.**
