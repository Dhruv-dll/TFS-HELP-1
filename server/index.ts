import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { handleDemo } from "./routes/demo";
import { getMarketData } from "./routes/marketData";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Serve data folder as static files - use absolute path from root
  const dataPath = path.resolve(path.join(__dirname, "..", "data"));
  console.log("📁 Serving data from:", dataPath);
  app.use("/data", express.static(dataPath));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
  app.get("/api/market-data", getMarketData);

  return app;
}
