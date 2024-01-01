import { Request, Response } from "express";
import { log } from "@repo/logger";
import { ContestType, ContestSelection, IContest } from "@repo/types";
import {
  getContests,
  getAtcoderContests,
  // getCodechefContests,
  getCodeforcesContests,
  getLeetcodeContests,
} from "../services/contests";

// contests controller:-
export const getSelectedContestsController = async (
  req: Request,
  res: Response
) => {
  try {
    const query = req.query.contestType as string;
    if (!query) {
      res.sendStatus(400);
      return;
    }
    const contestTypes: ContestSelection = JSON.parse(query);
    const contests = await getContests(contestTypes);
    res.json({ contests });
  } catch (e) {
    res.send(500);
    log("error in getAllContestsController", e);
  }
};

export const getContestController = async (req: Request, res: Response) => {
  try {
    const contestType: ContestType | undefined = req.params
      .contestType as ContestType;
    let contestsData: IContest[] = [];

    switch (contestType) {
      case "ATCODER":
        contestsData = await getAtcoderContests();
        break;
      case "CF" || "ICPC" || "IOI":
        const result: IContest[] = await getCodeforcesContests();
        contestsData = result.filter((contest) => contest.type === contestType);
        break;
      case "CODECHEF":
        // contestsData = await getCodechefContests();
        throw new Error("Codechef contests not available");
        break;
      case "LEETCODE":
        contestsData = await getLeetcodeContests();
        break;
    }
    res.json({ contestsData });
    return;
  } catch (e) {
    res.sendStatus(500);
    log("Error in getContestController", e);
  }
};
