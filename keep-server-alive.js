const { spawn } = require('child_process');

function start() {
  console.log('[WATCHDOG] Iniciando Next.js Server na porta 3000...');
  const proc = spawn('cmd.exe', ['/c', 'npx', 'next', 'start', '-p', '3000'], {
    stdio: ['ignore', 'inherit', 'inherit'],
    cwd: process.cwd(),
  });

  proc.on('close', (code) => {
    console.log('[WATCHDOG] Servidor finalizou com codigo ' + code + '. Reiniciando em 1s...');
    setTimeout(start, 1000);
  });

  proc.on('error', (err) => {
    console.error('[WATCHDOG] Erro:', err);
    setTimeout(start, 2000);
  });
}

start();
