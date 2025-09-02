# 🚀 Algoritmos e Complexidade - Plataforma Educacional Completa

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-site-id/deploy-status.svg)](https://app.netlify.com/sites/your-site-name/deploys)
[![GitHub Stars](https://img.shields.io/github/stars/cordeirotelecom/algoritimos_e_complexidade?style=social)](https://github.com/cordeirotelecom/algoritimos_e_complexidade/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/cordeirotelecom/algoritimos_e_complexidade?style=social)](https://github.com/cordeirotelecom/algoritimos_e_complexidade/network/members)

> 🎯 **Plataforma interativa e gamificada para aprendizado de algoritmos e análise de complexidade computacional**

## 🌟 Visão Geral

Esta é uma plataforma educacional completa que oferece uma experiência imersiva de aprendizado em algoritmos e complexidade computacional, combinando teoria sólida com prática intensiva através de múltiplas linguagens de programação.

### 🎮 **Acesso Rápido**
- 🌐 **Demo Online**: [algoritimoscomplexidade.netlify.app](https://algoritimoscomplexidade.netlify.app)
- 🎯 **Exercícios Interativos**: Sistema gamificado com 15+ exercícios
- 🚀 **Plataforma Completa**: Python, C, estruturas de dados e análise IA
- 📚 **Portal de Aprendizado**: Hub central com todos os recursos

## ✨ Principais Funcionalidades

### 🐍 **Seção Python Completa**
- **15+ exercícios** distribuídos em 5 categorias
- Desde básico (Hello World) até avançado (algoritmos complexos)
- **Exemplos práticos**: Listas, dicionários, ordenação, busca
- **Códigos funcionais** prontos para execução

### ⚡ **Linguagem C com Foco em Ponteiros**
- **Manipulação de ponteiros** e aritmética
- **Alocação dinâmica** de memória
- **Arrays e matrizes** com operações avançadas
- **Gerenciamento de memória** (malloc/free)

### 🗂️ **Estruturas de Dados Avançadas**
- **Ponteiros**: Básicos, múltiplos níveis, aritmética
- **Vetores dinâmicos**: Implementação com redimensionamento
- **Matrizes esparsas**: Otimização para dados com zeros
- **Listas ligadas**: Implementação completa

### 📊 **Analisador de Complexidade com IA**
- **Análise automática** de qualquer código
- **Múltiplas linguagens**: Python, C/C++, Java, JavaScript
- **Análise passo a passo** com explicações detalhadas
- **Gráficos interativos** de crescimento da complexidade
- **Sugestões de otimização** inteligentes
- **Exportação de relatórios** em Markdown

### 🎮 **Sistema Gamificado**
- **XP e badges** por exercícios completados
- **Sequência de conquistas** e progresso visual
- **Feedback em tempo real** com editor integrado
- **3 níveis de dificuldade**: Iniciante, Intermediário, Avançado

## 🛠️ Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Editor de Código**: CodeMirror com syntax highlighting
- **Gráficos**: Chart.js para visualizações
- **Análise de Código**: Engine personalizado de complexidade
- **Deploy**: Netlify com CI/CD automático
- **Versionamento**: Git & GitHub

## 📁 Estrutura do Projeto

```
algoritimos_github/
├── 🌐 portal_aprendizado.html     # Hub principal
├── 🎯 exercicios_interativos.html # Sistema gamificado
├── 🚀 plataforma_completa.html    # Plataforma avançada
├── 📚 docs/                       # Documentação
├── 🎨 assets/                     # CSS, JS, recursos
│   ├── exercicios-interativos.css
│   ├── algorithm-system.js
│   └── complexity-analyzer.js
├── 🔬 exercicios/                 # Listas e laboratórios
├── 📖 aulas/                      # Conteúdo teórico
├── 💻 exemplos/                   # Códigos C e Python
└── 📊 netlify.toml               # Configuração deploy
```

## 🚀 Como Usar

### 1. **Acesso Online** (Recomendado)
Visite: [algoritimoscomplexidade.netlify.app](https://algoritimoscomplexidade.netlify.app)

### 2. **Instalação Local**
```bash
# Clone o repositório
git clone https://github.com/cordeirotelecom/algoritimos_e_complexidade.git

# Entre no diretório
cd algoritimos_e_complexidade

# Abra o portal principal
open portal_aprendizado.html
```

### 3. **Desenvolvimento**
```bash
# Para desenvolvimento com live server
npm install -g live-server
live-server --port=8080
```

## 🎯 Fluxo de Aprendizado Recomendado

### **Iniciantes** 🌱
1. **Portal de Aprendizado** → Visão geral
2. **Exercícios Interativos** → Nível Iniciante
3. **Python Básico** → Sintaxe fundamental
4. **Analisador de Complexidade** → Primeiros códigos

### **Intermediários** 🚀
1. **Linguagem C** → Ponteiros e arrays
2. **Estruturas de Dados** → Vetores e matrizes
3. **Exercícios Avançados** → Desafios complexos
4. **Laboratórios Práticos** → IDE setup

### **Avançados** 🔥
1. **Matrizes Esparsas** → Otimizações
2. **Análise Personalizada** → Próprios algoritmos
3. **Contribuição** → Pull requests welcome

## 📊 Exemplos de Uso

### **Análise Automática de Bubble Sort**
```python
def bubble_sort(arr):
    for i in range(len(arr)):
        for j in range(len(arr)-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
```

**Resultado da Análise IA:**
- ⏱️ **Tempo:** O(n²) - Loops aninhados detectados
- 💾 **Espaço:** O(1) - Sem estruturas auxiliares
- 🚀 **Sugestão:** Use merge sort para listas grandes
- 📈 **Gráfico:** Crescimento quadrático visualizado

### **Ponteiros em C**
```c
int* ptr = &valor;
printf("Via ponteiro: %d", *ptr);
*ptr = 100; // Modifica valor original
```

## 🎓 Objetivos Educacionais

Ao completar este curso, você será capaz de:

- ✅ **Dominar** análise de complexidade Big O
- ✅ **Implementar** algoritmos em Python e C
- ✅ **Otimizar** código identificando gargalos
- ✅ **Trabalhar** com ponteiros e gerenciamento de memória
- ✅ **Comparar** diferentes abordagens algorítmicas
- ✅ **Desenvolver** intuição sobre performance

## 🤝 Contribuições

Contribuições são bem-vindas! Por favor:

1. **Fork** o projeto
2. **Crie** uma branch para sua feature
3. **Commit** suas mudanças
4. **Push** para a branch
5. **Abra** um Pull Request

### **Áreas que Precisam de Ajuda:**
- 🔧 Novos algoritmos e estruturas
- 🌐 Traduções para outros idiomas
- 🎨 Melhorias na interface
- 📚 Mais exercícios práticos
- 🐛 Correções de bugs

## 📈 Roadmap

### **v2.0** (Em desenvolvimento)
- [ ] Suporte a mais linguagens (Java, JavaScript)
- [ ] Algoritmos de grafos interativos
- [ ] Sistema de usuários com progresso salvo
- [ ] Mobile app companion

### **v1.5** (Próxima versão)
- [ ] Algoritmos de ordenação visualizados
- [ ] Mais exercícios de ponteiros
- [ ] Sistema de rankings
- [ ] Certificados de conclusão

## 🏆 Conquistas do Projeto

- 🎯 **50+ exercícios** em múltiplas linguagens
- 🤖 **IA integrada** para análise de código
- 🎮 **Gamificação** completa com XP e badges
- 📊 **Visualizações** interativas de complexidade
- 🌐 **Deploy automático** via Netlify
- 📱 **Design responsivo** para todos dispositivos

## 📞 Suporte

- 🐛 **Issues**: [GitHub Issues](https://github.com/cordeirotelecom/algoritimos_e_complexidade/issues)
- 💬 **Discussões**: [GitHub Discussions](https://github.com/cordeirotelecom/algoritimos_e_complexidade/discussions)
- 📧 **Email**: cordeiro@exemplo.com
- 🌐 **Site**: [Demo Online](https://algoritmos-complexidade.netlify.app)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## ⭐ Star o Projeto

Se este projeto foi útil para você, considere dar uma ⭐ no GitHub!

---

<div align="center">

**Desenvolvido com ❤️ para a comunidade de desenvolvimento**

[🌐 Demo](https://algoritmos-complexidade.netlify.app) • [📚 Documentação](docs/) • [🤝 Contribuir](CONTRIBUTING.md)

</div>
