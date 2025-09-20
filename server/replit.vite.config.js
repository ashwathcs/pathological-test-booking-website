import { defineConfig, mergeConfig } from "vite";
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
