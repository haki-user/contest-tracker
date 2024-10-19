import type { IContest, ContestSelection } from "@repo/types";
import { log } from "@repo/logger";
import {
  getAtcoderContests,
  getCodechefContestsFromAPI,
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
      codechefContests,
    ] = await Promise.allSettled([
      contestTypes.ATCODER ? getAtcoderContests() : Promise.resolve([]),
      contestTypes.CF || contestTypes.ICPC || contestTypes.IOI
        ? getCodeforcesContests()
        : Promise.resolve([]),
      contestTypes.CODECHEF ? getCodechefContestsFromAPI() : Promise.resolve([]),
      contestTypes.LEETCODE ? getLeetcodeContests() : Promise.resolve([]),
    ]).then((results) =>
      results.map((promise) =>
        promise.status === "fulfilled" ? promise.value : []
      )
    );

    contests.push(
      ...atcoderContests,
      ...codeforcesContests.filter(
        (contest: IContest) => contestTypes[contest.type]
      ),
      ...leetcodeContests,
      ...codechefContests
    );
    log(contests);
    return contests;
  } catch (err) {
    log("Error getContest service", err);
    return Promise.resolve([]);
  }
};

export {
  getAtcoderContests,
  getCodeforcesContests,
  getCodechefContestsFromAPI,
  getLeetcodeContests,
};
