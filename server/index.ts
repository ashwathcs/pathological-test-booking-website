#!/usr/bin/env node
// Pure frontend server using Vite directly
// This replaces the Express server for a frontend-only application

import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

console.log(`${new Date().toLocaleTimeString()} [frontend] Starting Vite development server...`);
console.log(`${new Date().toLocaleTimeString()} [frontend] Application will serve on port 5000`);

// Start Vite with proper configuration
const viteProcess = exec('npx vite --port 5000 --host 0.0.0.0', {
  cwd: rootDir,
  stdio: 'inherit'
});

viteProcess.stdout?.on('data', (data) => {
  console.log(data.toString());
});

viteProcess.stderr?.on('data', (data) => {
  console.error(data.toString());
});

viteProcess.on('exit', (code) => {
  console.log(`${new Date().toLocaleTimeString()} [frontend] Vite process exited with code ${code}`);
  process.exit(code || 0);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log(`${new Date().toLocaleTimeString()} [frontend] Shutting down...`);
  viteProcess.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log(`${new Date().toLocaleTimeString()} [frontend] Shutting down...`);
  viteProcess.kill('SIGTERM');
});