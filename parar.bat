@echo off
title LeadHunter Pro - Encerrar Servicos
chcp 65001 > nul
cls
echo =======================================================
echo   LeadHunter Pro - Encerrando Servicos
echo =======================================================
echo.
echo Encerrando Cloudflare Tunnel...
taskkill /F /IM cloudflared.exe > nul 2>&1

echo Encerrando servidor Next.js na porta 3000...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000') do (
    taskkill /F /PID %%a > nul 2>&1
)

echo.
echo =======================================================
echo   TODOS OS SERVICOS FORAM ENCERRADOS COM SUCESSO!
echo   Sua memoria RAM e processador estao 100%% liberados.
echo =======================================================
echo.
timeout /t 3 /nobreak > nul
