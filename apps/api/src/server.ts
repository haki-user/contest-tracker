import express, { json } from "express";
import type { Express } from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import { router } from "./routes";

const limiter = rateLimit({
  windowMs: 1000 * 60 * 15, // 15 minutes
  max: 100, // limit each IP to 500 requests per windowMs
  standardHeaders: "draft-7",
});

export const createServer = (): Express => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(json())
    .use(cors())
    .use(helmet())
    .use(limiter)
    .use(router);
  return app;
};
