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
export const getSelectedContestsController = async (req: Request, res: Response) => {
  try {
    const contestTypes: ContestSelection | null = JSON.parse(
      req.params.contestTypes
    );
    if (contestTypes === null) {
      // send contestTypes
      res.send;
      return;
    }
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
      case "CF" || "ICPC" || "IOI":
        const result: IContest[] = await getCodeforcesContests();
        contestsData = result.filter((contest) => contest.type === contestType);
      case "CODECHEF":
        // contestsData = await getCodechefContests();
        res.send(500);
        throw new Error("Codechef contests not available");
        contestsData = [];
      case "LEETCODE":
        contestsData = await getLeetcodeContests();
    }
    res.json({ contestsData });
  } catch (e) {
    res.send(500);
    log("Error in getContestController", e);
  }
};
