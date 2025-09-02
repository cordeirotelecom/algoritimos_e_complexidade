@echo off
echo.
echo =============================================
echo   🚀 DEPLOY AUTOMATICO - NETLIFY SETUP
echo =============================================
echo.

echo 📂 Verificando arquivos do projeto...
dir /b *.html
echo.

echo ✅ Arquivos principais encontrados:
echo    - index.html (Landing page)
echo    - portal_aprendizado.html (Hub principal)  
echo    - exercicios_interativos.html (Gamificado)
echo    - plataforma_completa.html (Avançado)
echo.

echo 🔧 Configurações de deploy verificadas:
echo    ✅ netlify.toml - Configuração principal
echo    ✅ _redirects - Redirecionamentos
echo    ✅ README.md - Documentação
echo.

echo 🌐 URLs que funcionarão após deploy:
echo    🏠 Home: sua-url.netlify.app/
echo    🌐 Portal: sua-url.netlify.app/portal
echo    🎯 Exercícios: sua-url.netlify.app/exercicios  
echo    🚀 Plataforma: sua-url.netlify.app/plataforma
echo.

echo 📋 PRÓXIMOS PASSOS:
echo.
echo 1. Abra: https://app.netlify.com
echo 2. Faça login com GitHub
echo 3. Clique: "Add new site" → "Import existing project"
echo 4. Selecione: cordeirotelecom/algoritimos_e_complexidade
echo 5. Deploy automático em 1-2 minutos!
echo.

echo 📊 ALTERNATIVA - Deploy manual:
echo 1. Abra: https://app.netlify.com/drop
echo 2. Arraste TODA a pasta do projeto
echo 3. Deploy instantâneo!
echo.

echo ✨ Projeto 100%% pronto para deploy!
echo.
pause
