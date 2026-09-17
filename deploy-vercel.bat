@echo off
title LeadHunter Pro - Deploy na Vercel
chcp 65001 > nul
cls
echo =======================================================
echo     LeadHunter Pro - Assistente de Deploy Vercel
echo =======================================================
echo.
echo O repositorio local esta 100%% preparado e commitado!
echo.
echo Escolha como deseja publicar na Vercel:
echo.
echo   [1] Deploy Direto via Terminal (Vercel CLI)
echo       - Vai abrir a autenticacao da Vercel e publicar
echo.
echo   [2] Conectar com seu GitHub
echo       - Exibe o passo a passo para conectar ao GitHub e Vercel
echo.
echo   [3] Cancelar
echo.
set /p opcao="Digite a opcao desejada (1, 2 ou 3): "

if "%opcao%"=="1" goto DEPLOY_CLI
if "%opcao%"=="2" goto AJUDA_GITHUB
goto FIM

:DEPLOY_CLI
echo.
echo =======================================================
echo   Iniciando Deploy Vercel...
echo =======================================================
echo.
echo Siga as instrucoes na tela para autenticar na sua conta Vercel:
echo.
npx vercel --prod
echo.
echo Deploy finalizado! Verifique o link gerado acima.
pause
goto FIM

:AJUDA_GITHUB
echo.
echo =======================================================
echo   Passo a Passo GitHub + Vercel (Recomendado)
echo =======================================================
echo.
echo 1. Crie um novo repositorio vazio no seu GitHub: https://github.com/new
echo.
echo 2. Execute estes comandos no seu terminal:
echo    "C:\Program Files\Git\cmd\git.exe" remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
echo    "C:\Program Files\Git\cmd\git.exe" push -u origin main
echo.
echo 3. Acesse https://vercel.com/new e clique em "Import" no repositorio.
echo.
echo 4. A Vercel vai compilar e gerar seu link permanente gratuito!
echo =======================================================
echo.
pause
goto FIM

:FIM
