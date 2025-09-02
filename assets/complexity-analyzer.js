// Sistema Avançado de Análise de Complexidade
class ComplexityAnalyzer {
    constructor() {
        this.patterns = {
            // Padrões de loops
            simpleLoop: /for\s*\([^)]*\)\s*{[^{}]*}/g,
            nestedLoop: /for\s*\([^)]*\)\s*{[^{}]*for\s*\([^)]*\)/g,
            whileLoop: /while\s*\([^)]*\)\s*{[^{}]*}/g,
            
            // Padrões de recursão
            recursiveCall: /(\w+)\s*\([^)]*\).*\1\s*\(/g,
            divideConquer: /(\/\s*2|\/\/\s*2|>>|\>\>\s*1)/g,
            
            // Padrões de estruturas de dados
            arrayCreation: /(new\s+\w+\[|\[\s*\]|list\s*\(|malloc)/g,
            sorting: /(\.sort\s*\(|sorted\s*\(|qsort|mergesort|quicksort)/g,
            
            // Padrões de busca
            binarySearch: /(binary.*search|mid\s*=|left.*right)/gi,
            linearSearch: /(in\s+\w+|indexOf|find)/g
        };
        
        this.complexityDatabase = {
            'bubble_sort': { time: 'O(n²)', space: 'O(1)', description: 'Algoritmo de ordenação por bolha' },
            'merge_sort': { time: 'O(n log n)', space: 'O(n)', description: 'Algoritmo de ordenação por intercalação' },
            'quick_sort': { time: 'O(n log n)', space: 'O(log n)', description: 'Algoritmo de ordenação rápida' },
            'binary_search': { time: 'O(log n)', space: 'O(1)', description: 'Busca binária em array ordenado' },
            'linear_search': { time: 'O(n)', space: 'O(1)', description: 'Busca linear em array' },
            'fibonacci': { time: 'O(2^n)', space: 'O(n)', description: 'Fibonacci recursivo' },
            'fibonacci_dp': { time: 'O(n)', space: 'O(n)', description: 'Fibonacci com programação dinâmica' }
        };
    }

    analyzeCode(code, language = 'python') {
        const analysis = {
            steps: [],
            timeComplexity: 'O(1)',
            spaceComplexity: 'O(1)',
            summary: '',
            detailedAnalysis: {},
            optimizationSuggestions: []
        };

        // Pré-processamento do código
        const cleanCode = this.preprocessCode(code);
        
        // Análise de estrutura
        analysis.steps.push(...this.analyzeStructure(cleanCode));
        
        // Análise de loops
        const loopAnalysis = this.analyzeLoops(cleanCode);
        analysis.steps.push(...loopAnalysis.steps);
        analysis.timeComplexity = loopAnalysis.complexity;
        
        // Análise de recursão
        const recursionAnalysis = this.analyzeRecursion(cleanCode);
        analysis.steps.push(...recursionAnalysis.steps);
        if (recursionAnalysis.complexity !== 'O(1)') {
            analysis.timeComplexity = recursionAnalysis.complexity;
        }
        
        // Análise de espaço
        const spaceAnalysis = this.analyzeSpace(cleanCode);
        analysis.steps.push(...spaceAnalysis.steps);
        analysis.spaceComplexity = spaceAnalysis.complexity;
        
        // Detecção de algoritmos conhecidos
        const algorithmAnalysis = this.detectKnownAlgorithms(cleanCode);
        analysis.steps.push(...algorithmAnalysis.steps);
        if (algorithmAnalysis.complexity !== 'O(1)') {
            analysis.timeComplexity = algorithmAnalysis.complexity;
        }
        
        // Análise de operações custosas
        analysis.steps.push(...this.analyzeExpensiveOperations(cleanCode));
        
        // Sugestões de otimização
        analysis.optimizationSuggestions = this.generateOptimizationSuggestions(cleanCode, analysis.timeComplexity);
        
        // Resumo final
        analysis.summary = this.generateSummary(analysis);
        
        return analysis;
    }

    preprocessCode(code) {
        // Remove comentários e strings para evitar falsos positivos
        return code
            .replace(/\/\/.*$/gm, '') // Comentários C++/Java
            .replace(/#.*$/gm, '') // Comentários Python
            .replace(/\/\*[\s\S]*?\*\//g, '') // Comentários multi-linha
            .replace(/"[^"]*"/g, '""') // Strings
            .replace(/'[^']*'/g, "''"); // Strings simples
    }

    analyzeStructure(code) {
        const steps = [];
        
        // Contagem de funções
        const functions = (code.match(/def\s+\w+|function\s+\w+|\w+\s*\(/g) || []).length;
        if (functions > 0) {
            steps.push({
                title: "📋 Análise Estrutural",
                explanation: `Código contém ${functions} função(ões). Analisando cada uma separadamente.`,
                type: "structure"
            });
        }
        
        // Contagem de linhas
        const lines = code.split('\n').filter(line => line.trim()).length;
        steps.push({
            title: "📊 Métricas do Código",
            explanation: `Código tem ${lines} linhas efetivas. Tamanho influencia na complexidade de manutenção.`,
            type: "metrics"
        });
        
        return steps;
    }

    analyzeLoops(code) {
        const steps = [];
        let complexity = 'O(1)';
        
        // Detecção de loops simples
        const simpleLoops = (code.match(/for\s*\(/g) || []).length + 
                           (code.match(/while\s*\(/g) || []).length;
        
        if (simpleLoops === 0) {
            steps.push({
                title: "🔄 Análise de Loops",
                explanation: "Nenhum loop detectado. Todas as operações são executadas em tempo constante.",
                type: "loop"
            });
            return { steps, complexity: 'O(1)' };
        }
        
        // Detecção de loops aninhados
        const nestedLoopPattern = /for\s*\([^{]*{[^}]*for\s*\(/g;
        const nestedLoops = (code.match(nestedLoopPattern) || []).length;
        
        if (nestedLoops > 0) {
            steps.push({
                title: "🔄 Loops Aninhados Detectados",
                explanation: `${nestedLoops} loop(s) aninhado(s) encontrado(s). Cada elemento do loop externo executa o loop interno completo.`,
                type: "nested-loop"
            });
            
            if (nestedLoops === 1) {
                complexity = 'O(n²)';
                steps.push({
                    title: "⚠️ Complexidade Quadrática",
                    explanation: "Loops aninhados resultam em complexidade O(n²). Para n=1000, serão ~1.000.000 operações.",
                    type: "complexity-warning"
                });
            } else if (nestedLoops >= 2) {
                complexity = 'O(n³)';
                steps.push({
                    title: "🚨 Complexidade Cúbica",
                    explanation: "Múltiplos loops aninhados resultam em complexidade O(n³) ou superior. Considere otimização.",
                    type: "complexity-critical"
                });
            }
        } else if (simpleLoops === 1) {
            complexity = 'O(n)';
            steps.push({
                title: "🔄 Loop Linear",
                explanation: "Um loop simples detectado. Complexidade linear O(n) - tempo de execução proporcional ao tamanho da entrada.",
                type: "loop"
            });
        } else if (simpleLoops > 1) {
            complexity = 'O(n)';
            steps.push({
                title: "🔄 Múltiplos Loops",
                explanation: `${simpleLoops} loops sequenciais detectados. Complexidade ainda é O(n) pois não são aninhados.`,
                type: "loop"
            });
        }
        
        return { steps, complexity };
    }

    analyzeRecursion(code) {
        const steps = [];
        let complexity = 'O(1)';
        
        // Detecção de funções recursivas
        const funcNames = (code.match(/def\s+(\w+)/g) || []).map(m => m.replace('def ', ''));
        
        for (const funcName of funcNames) {
            const funcPattern = new RegExp(`def\\s+${funcName}[^}]*${funcName}\\s*\\(`, 's');
            if (funcPattern.test(code)) {
                steps.push({
                    title: "🔄 Recursão Detectada",
                    explanation: `Função '${funcName}' é recursiva. Analisando padrão de recursão...`,
                    type: "recursion"
                });
                
                // Verifica se é divisão e conquista
                if (this.patterns.divideConquer.test(code)) {
                    complexity = 'O(log n)';
                    steps.push({
                        title: "⚡ Divisão e Conquista",
                        explanation: "Padrão de divisão por 2 detectado (ex: busca binária). Complexidade logarítmica O(log n).",
                        type: "divide-conquer"
                    });
                } else {
                    // Recursão simples (ex: Fibonacci)
                    complexity = 'O(2^n)';
                    steps.push({
                        title: "🚨 Recursão Exponencial",
                        explanation: "Recursão sem otimização detectada. Complexidade exponencial O(2^n). Considere memoização.",
                        type: "exponential-recursion"
                    });
                }
            }
        }
        
        return { steps, complexity };
    }

    analyzeSpace(code) {
        const steps = [];
        let complexity = 'O(1)';
        
        // Detecção de estruturas auxiliares
        const arrayCreations = (code.match(this.patterns.arrayCreation) || []).length;
        
        if (arrayCreations > 0) {
            complexity = 'O(n)';
            steps.push({
                title: "💾 Análise de Espaço",
                explanation: `${arrayCreations} estrutura(s) de dados auxiliar(es) detectada(s). Espaço adicional O(n) necessário.`,
                type: "space"
            });
        }
        
        // Detecção de recursão (stack space)
        if (code.includes('def ') && code.match(/\w+\s*\(/)) {
            const recursivePattern = /def\s+(\w+)[^}]*\1\s*\(/;
            if (recursivePattern.test(code)) {
                steps.push({
                    title: "📚 Espaço de Pilha",
                    explanation: "Recursão detectada. Utiliza espaço adicional na pilha proporcional à profundidade da recursão.",
                    type: "stack-space"
                });
                if (complexity === 'O(1)') complexity = 'O(n)';
            }
        }
        
        return { steps, complexity };
    }

    detectKnownAlgorithms(code) {
        const steps = [];
        let complexity = 'O(1)';
        
        // Ordenação
        if (this.patterns.sorting.test(code)) {
            complexity = 'O(n log n)';
            steps.push({
                title: "🔀 Algoritmo de Ordenação",
                explanation: "Algoritmo de ordenação detectado. Complexidade típica O(n log n) para algoritmos eficientes.",
                type: "sorting"
            });
        }
        
        // Busca binária
        if (this.patterns.binarySearch.test(code)) {
            complexity = 'O(log n)';
            steps.push({
                title: "🎯 Busca Binária",
                explanation: "Padrão de busca binária detectado. Divide espaço de busca pela metade a cada iteração.",
                type: "binary-search"
            });
        }
        
        // Busca linear
        if (this.patterns.linearSearch.test(code) && !this.patterns.binarySearch.test(code)) {
            complexity = 'O(n)';
            steps.push({
                title: "🔍 Busca Linear",
                explanation: "Busca linear detectada. Examina elementos sequencialmente até encontrar o alvo.",
                type: "linear-search"
            });
        }
        
        return { steps, complexity };
    }

    analyzeExpensiveOperations(code) {
        const steps = [];
        
        // Operações de string
        if (code.includes('+') && (code.includes('"') || code.includes("'"))) {
            steps.push({
                title: "⚠️ Concatenação de Strings",
                explanation: "Concatenação de strings em loop pode ser custosa. Considere usar join() ou StringBuilder.",
                type: "string-concat"
            });
        }
        
        // Cópias desnecessárias
        if (code.includes('.copy()') || code.includes('clone()')) {
            steps.push({
                title: "📋 Operações de Cópia",
                explanation: "Operações de cópia detectadas. Cada cópia é O(n) em tempo e espaço.",
                type: "copy-operations"
            });
        }
        
        return steps;
    }

    generateOptimizationSuggestions(code, complexity) {
        const suggestions = [];
        
        if (complexity === 'O(n²)') {
            suggestions.push({
                issue: "Complexidade Quadrática",
                suggestion: "Considere usar estruturas de dados como HashMap/Dictionary para reduzir buscas de O(n) para O(1).",
                impact: "Pode reduzir complexidade para O(n)"
            });
        }
        
        if (complexity === 'O(2^n)') {
            suggestions.push({
                issue: "Complexidade Exponencial",
                suggestion: "Implemente memoização ou programação dinâmica para evitar recálculos.",
                impact: "Pode reduzir complexidade para O(n) ou O(n²)"
            });
        }
        
        if (code.includes('sort') && code.includes('for')) {
            suggestions.push({
                issue: "Ordenação em Loop",
                suggestion: "Evite ordenar dentro de loops. Ordene uma vez antes do loop ou use estruturas ordenadas.",
                impact: "Reduz complexidade significativamente"
            });
        }
        
        return suggestions;
    }

    generateSummary(analysis) {
        const timeDesc = this.getComplexityDescription(analysis.timeComplexity);
        const spaceDesc = this.getComplexityDescription(analysis.spaceComplexity);
        
        let summary = `📊 **Análise Completa:**\n\n`;
        summary += `⏱️ **Complexidade de Tempo:** ${analysis.timeComplexity}\n`;
        summary += `${timeDesc}\n\n`;
        summary += `💾 **Complexidade de Espaço:** ${analysis.spaceComplexity}\n`;
        summary += `${spaceDesc}\n\n`;
        
        if (analysis.optimizationSuggestions.length > 0) {
            summary += `🚀 **Otimizações Possíveis:** ${analysis.optimizationSuggestions.length} sugestão(ões) encontrada(s).`;
        } else {
            summary += `✅ **Status:** Algoritmo bem otimizado para o problema proposto.`;
        }
        
        return summary;
    }

    getComplexityDescription(complexity) {
        const descriptions = {
            'O(1)': 'Execução em tempo constante - excelente performance independente do tamanho da entrada.',
            'O(log n)': 'Crescimento logarítmico - muito eficiente, divide problema pela metade a cada passo.',
            'O(n)': 'Crescimento linear - performance proporcional ao tamanho da entrada.',
            'O(n log n)': 'Complexidade linearítmica - típica de algoritmos de ordenação eficientes.',
            'O(n²)': 'Crescimento quadrático - adequado para entradas pequenas a médias.',
            'O(n³)': 'Crescimento cúbico - pode ser lento para entradas grandes.',
            'O(2^n)': 'Crescimento exponencial - apenas viável para entradas muito pequenas.'
        };
        
        return descriptions[complexity] || 'Complexidade variável dependendo da implementação.';
    }

    // Método para análise visual com gráficos
    generateComplexityChart(complexity) {
        const data = this.generateChartData(complexity);
        return {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: `Crescimento da Complexidade: ${complexity}`
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Tamanho da Entrada (n)'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Operações'
                        }
                    }
                }
            }
        };
    }

    generateChartData(complexity) {
        const sizes = [1, 10, 100, 1000, 10000];
        const operations = sizes.map(n => this.calculateOperations(n, complexity));
        
        return {
            labels: sizes,
            datasets: [{
                label: complexity,
                data: operations,
                borderColor: this.getComplexityColor(complexity),
                backgroundColor: this.getComplexityColor(complexity, 0.1),
                tension: 0.1
            }]
        };
    }

    calculateOperations(n, complexity) {
        switch(complexity) {
            case 'O(1)': return 1;
            case 'O(log n)': return Math.log2(n);
            case 'O(n)': return n;
            case 'O(n log n)': return n * Math.log2(n);
            case 'O(n²)': return n * n;
            case 'O(n³)': return n * n * n;
            case 'O(2^n)': return Math.min(Math.pow(2, n), 1000000); // Limitado para visualização
            default: return n;
        }
    }

    getComplexityColor(complexity, alpha = 1) {
        const colors = {
            'O(1)': `rgba(39, 174, 96, ${alpha})`,      // Verde
            'O(log n)': `rgba(52, 152, 219, ${alpha})`, // Azul
            'O(n)': `rgba(241, 196, 15, ${alpha})`,     // Amarelo
            'O(n log n)': `rgba(230, 126, 34, ${alpha})`, // Laranja
            'O(n²)': `rgba(231, 76, 60, ${alpha})`,     // Vermelho
            'O(n³)': `rgba(155, 89, 182, ${alpha})`,    // Roxo
            'O(2^n)': `rgba(192, 57, 43, ${alpha})`     // Vermelho escuro
        };
        
        return colors[complexity] || `rgba(149, 165, 166, ${alpha})`;
    }
}

// Instância global do analisador
const complexityAnalyzer = new ComplexityAnalyzer();

// Função para exportar relatório
function exportAnalysisReport(analysis, code) {
    const report = `
# Relatório de Análise de Complexidade

## Código Analisado
\`\`\`
${code}
\`\`\`

## Resultados

**Complexidade de Tempo:** ${analysis.timeComplexity}
**Complexidade de Espaço:** ${analysis.spaceComplexity}

## Análise Detalhada

${analysis.steps.map(step => `
### ${step.title}
${step.explanation}
`).join('\n')}

## Sugestões de Otimização

${analysis.optimizationSuggestions.map(suggestion => `
**${suggestion.issue}**
- Sugestão: ${suggestion.suggestion}
- Impacto: ${suggestion.impact}
`).join('\n')}

## Resumo

${analysis.summary}

---
*Relatório gerado automaticamente pela Plataforma de Análise de Algoritmos*
`;

    return report;
}
