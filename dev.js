const { spawn } = require('child_process');
const path = require('path');

// Ensure system paths exist on Windows
if (process.platform === 'win32') {
  const sys32 = 'C:\\Windows\\System32';
  if (!process.env.PATH.toLowerCase().includes('system32')) {
    process.env.PATH = `${sys32};${process.env.PATH}`;
  }
}

const isWin = process.platform === 'win32';
const npmCmd = isWin ? 'npm.cmd' : 'npm';

console.log('========================================================');
console.log(' Launching Secure Data Exchange Platform');
console.log('========================================================\n');

// Start backend server
const server = spawn(npmCmd, ['run', 'dev'], {
  cwd: path.join(__dirname, 'server'),
  stdio: 'inherit',
  shell: true,
  env: process.env
});

// Start client frontend
const client = spawn(npmCmd, ['run', 'dev'], {
  cwd: path.join(__dirname, 'client'),
  stdio: 'inherit',
  shell: true,
  env: process.env
});

const cleanup = () => {
  console.log('\nShutting down servers...');
  server.kill();
  client.kill();
  process.exit(0);
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
