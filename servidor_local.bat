@echo off
echo ========================================
echo    ACADEMIA DE ALGORITMOS - SERVIDOR LOCAL
echo ========================================
echo.
echo Iniciando servidor local na porta 8000...
echo.
echo Acesse: http://localhost:8000
echo Para parar: Ctrl+C
echo.
echo ========================================

cd /d "%~dp0"
python -m http.server 8000 2>nul || (
    echo Python nao encontrado. Tentando Node.js...
    npx http-server . -p 8000 2>nul || (
        echo.
        echo ERRO: Nem Python nem Node.js encontrados.
        echo.
        echo SOLUCOES:
        echo 1. Instale Python: https://python.org
        echo 2. Ou instale Node.js: https://nodejs.org
        echo 3. Ou abra teste.html diretamente no navegador
        echo.
        pause
    )
)
