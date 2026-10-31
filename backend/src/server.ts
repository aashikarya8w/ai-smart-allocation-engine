import app                from "./app";
import { env }           from "./config/env";
import { connectDatabase, disconnectDatabase } from "./config/database";
import { logger }        from "./utils/logger";
import fs                from "fs";
import path              from "path";

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "../uploads/resumes");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

async function startServer(): Promise<void> {
  await connectDatabase();

  const server = app.listen(env.port, () => {
    logger.info(`🚀 Server running on http://localhost:${env.port}`);
    logger.info(`🌍 Environment : ${env.nodeEnv}`);
    logger.info(`✅ Health check: http://localhost:${env.port}/api/health`);
  });

  // Graceful shutdown
  function shutdown(signal: string) {
    logger.info(`${signal} received — shutting down gracefully`);
    server.close(async () => {
      await disconnectDatabase();
      logger.info("Server closed");
      process.exit(0);
    });
  }

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT",  () => shutdown("SIGINT"));

  process.on("unhandledRejection", (reason) => {
    logger.error("Unhandled rejection:", reason);
    shutdown("UNHANDLED_REJECTION");
  });
}

startServer().catch((err) => {
  logger.error("Failed to start server:", err);
  process.exit(1);
});
