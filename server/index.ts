#!/usr/bin/env node
// Pure frontend server using Vite directly  
// This replaces the Express server for a frontend-only application

import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { writeFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

console.log(`${new Date().toLocaleTimeString()} [frontend] Starting Vite development server...`);
console.log(`${new Date().toLocaleTimeString()} [frontend] Application will serve on port 5000`);

// Create a temporary vite config override for Replit
const replitViteConfig = `import { defineConfig, mergeConfig } from "vite";
import baseConfig from "../vite.config.js";

export default defineConfig(mergeConfig(baseConfig, {
  server: {
    host: "0.0.0.0",
    port: 5000,
    allowedHosts: [
      "0a83ffaa-73b0-4fc2-8358-ea21512a5ffa-00-1b7ms1tgglf9w.riker.replit.dev",
      ".replit.dev",
      "localhost",
      "127.0.0.1"
    ],
  },
}));
`;

writeFileSync(join(rootDir, 'server', 'replit.vite.config.js'), replitViteConfig);

// Start Vite with the custom config
const viteProcess = exec('npx vite --config server/replit.vite.config.js', {
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