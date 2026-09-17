@echo off
title LeadHunter Pro - Iniciar Servidor e Link Publico
chcp 65001 > nul
cls
echo =======================================================
echo   LeadHunter Pro - Inicializador Sob Demanda
echo =======================================================
echo.
echo [1/3] Encerrando eventuais processos antigos na porta 3000...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000') do (
    taskkill /F /PID %%a > nul 2>&1
)
taskkill /F /IM cloudflared.exe > nul 2>&1

echo [2/3] Iniciando servidor Next.js de producao...
start /B npx next start -p 3000

echo [3/3] Iniciando link publico Cloudflare...
start /B cloudflared.exe tunnel --url http://localhost:3000 --logfile cloudflare-tunnel.log

echo.
echo Aguardando inicializacao e gerando link...
timeout /t 4 /nobreak > nul

echo.
echo =======================================================
echo   SISTEMA ONLINE COM SUCESSO!
echo =======================================================
echo.
echo   * Acesso Local:    http://localhost:3000
echo.
echo   * Para ver o Link Publico (Cloudflare):
echo     Abra o arquivo cloudflare-tunnel.log ou consulte a janela.
echo.
echo   * Para ENCERRAR quando terminar a apresentacao:
echo     Basta dar um duplo clique em "parar.bat".
echo =======================================================
echo.
start http://localhost:3000
pause
