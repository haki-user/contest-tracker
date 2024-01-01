import express from "express";
import { getContestController, getSelectedContestsController } from "../controllers/contests";

export const router = express.Router();

router.get("/contests", getSelectedContestsController);
router.get("/contest", getContestController);