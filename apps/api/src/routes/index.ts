import express from "express";
import {
  getContestController,
  getSelectedContestsController,
} from "../controllers/contests";

export const router = express.Router();

router.get("/", (_, res) => {
  res.send(
    `contest tracker, /contests query: ContestSelector, /contest/:contestType`
  );
});
router.get("/contests", getSelectedContestsController);
router.get("/contest/:contestType", getContestController);
