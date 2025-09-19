import express from "express";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

// Simple static file serving for frontend only
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (req.path.startsWith("/api")) {
      log(`${req.method} ${req.path} ${res.statusCode} in ${duration}ms`);
    }
  });

  next();
});

// For frontend-only app, all API calls should go to external backend
app.use('/api/*', (req, res) => {
  res.status(503).json({ 
    message: "API calls should be directed to external backend service",
    hint: "Configure VITE_API_BASE_URL environment variable"
  });
});

(async () => {
  // Setup Vite for development or serve static files for production
  if (app.get("env") === "development") {
    await setupVite(app);
  } else {
    serveStatic(app);
  }

  // Serve the frontend app on port 5000
  const port = parseInt(process.env.PORT || '5000', 10);
  
  app.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`Frontend application serving on port ${port}`);
    if (app.get("env") === "development") {
      log("Configure external backend API URL with VITE_API_BASE_URL");
    }
  });
})();