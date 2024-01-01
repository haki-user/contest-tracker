import express, { type Express } from "express";
import morgan from "morgan";
import cors from "cors";
import { router } from "./routes";

export const createServer = (): Express => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(express.json())
    .use(cors())
    .use(router);
  return app;
};
