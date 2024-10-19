import type { Request, Response } from "express";
import { log } from "@repo/logger";
import type { ContestType, ContestSelection, IContest } from "@repo/types";
import {
  getContests,
  getAtcoderContests,
  getCodechefContestsFromAPI,
  getCodeforcesContests,
  getLeetcodeContests,
} from "../services/contests";

// contests controller:-
export const getSelectedContestsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const query = req.query.contestTypes as string;
    if (!query) {
      res.sendStatus(400);
      return;
    }
    const contestTypes = JSON.parse(query) as ContestSelection;
    const contests = await getContests(contestTypes);
    res.json({ contests });
  } catch (e) {
    res.send(500);
    log("error in getAllContestsController", e);
  }
};

export const getContestController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const contestType: ContestType | undefined = req.params
      .contestType as ContestType;
    let contestsData: IContest[] = [];

    switch (contestType) {
      case "ATCODER":
        contestsData = await getAtcoderContests();
        break;
      case "CF":
      case "ICPC":
      case "IOI": {
        const result: IContest[] = await getCodeforcesContests();
        contestsData = result.filter((contest) => contest.type === contestType);
        break;
      }
      case "CODECHEF":
        contestsData = await getCodechefContestsFromAPI();
        throw new Error("Codechef contests not available");
        break;
      case "LEETCODE":
        contestsData = await getLeetcodeContests();
        break;
    }
    res.json({ contestsData });
  } catch (e) {
    res.sendStatus(500);
    log("Error in getContestController", e);
  }
};
