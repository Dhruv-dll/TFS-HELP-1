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

  // Serve data folder as static files
  // Use the current directory and go up to reach data folder
  app.use("/data", express.static("./data"));
  app.get("/data/:filename", (req, res) => {
    const filename = req.params.filename;
    res.sendFile(path.resolve("./data", filename));
  });

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
  app.get("/api/market-data", getMarketData);

  return app;
}
