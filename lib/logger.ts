import pino from "pino";

const isEdge = process.env.NEXT_RUNTIME === "edge";
const isProduction = process.env.NODE_ENV === "production";

const logger = pino({
  level: process.env.LOG_LEVEL || "info",
});


export default logger;