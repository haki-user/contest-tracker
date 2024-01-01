import type { RequestHandler } from "express";
import { Router } from "express";
import {
  getContestController,
  getSelectedContestsController,
} from "../controllers/contests";

export const router = Router();

router.get("/", (_, res) => {
  res.send(
    `contest tracker, /contests query: ContestSelector, /contest/:contestType`
  );
});
router.get("/contests", getSelectedContestsController as RequestHandler);
router.get("/contest/:contestType", getContestController as RequestHandler);
