import type { IContest, ContestSelection } from "@repo/types";
import { log } from "@repo/logger";
import {
  getAtcoderContests,
  getCodechefContests,
  getCodeforcesContests,
  getLeetcodeContests,
} from "../scrappers";

export const getContests = async (
  contestTypes: ContestSelection
): Promise<IContest[]> => {
  try {
    const contests: IContest[] = [];
    const [
      atcoderContests,
      codeforcesContests,
      leetcodeContests,
      // codechefContests,
    ] = await Promise.all([
      contestTypes.ATCODER ? getAtcoderContests() : Promise.resolve([]),
      contestTypes.CF || contestTypes.ICPC || contestTypes.IOI
        ? getCodeforcesContests()
        : Promise.resolve([]),
      // contestTypes.CODECHEF ? getCodechefContests() : Promise.resolve([]),
      contestTypes.LEETCODE ? getLeetcodeContests() : Promise.resolve([]),
    ]);

    contests.push(
      ...atcoderContests,
      ...codeforcesContests.filter(
        (contest: IContest) => contestTypes[contest.type]
      ),
      ...leetcodeContests
    );
    return contests;
  } catch (err) {
    log("Error getCotnest service", err);
    return Promise.resolve([]);
  }
};

export {
  getAtcoderContests,
  getCodeforcesContests,
  getCodechefContests,
  getLeetcodeContests,
};
