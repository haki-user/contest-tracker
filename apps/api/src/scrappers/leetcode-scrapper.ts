import axios from "axios";
import { load } from "cheerio";
import { log } from "@repo/logger";
import { dayHM12ToSeconds } from "@repo/utils";
import type { IContest } from "@repo/types";

const baseURL = "https://leetcode.com";

export const getLeetcodeContests = async (): Promise<IContest[]> => {
  const query = `
    query upcomingContests {
      upcomingContests {
        title
        titleSlug
        startTime
      }
    }
  `;

  try {
    const res = await axios.post(
      `${baseURL}/graphql`,
      {
        query: query,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Referer: "https://leetcode.com",
        },
      }
    );

    const upcomingContestData: IContest[] = [];
    const upcomingContests = res.data.data.upcomingContests;
    console.log({upcomingContests}, res.data)
    for (let i = 0; i < upcomingContests.length; i++) {
      const upcomingContest = upcomingContests[i];
      upcomingContestData.push({
        name: upcomingContest.title ?? "NA",
        startTimeSeconds: upcomingContest.startTime,
        href: `${baseURL}/contest/${upcomingContest.titleSlug}`,
        type: "LEETCODE",
        phase: "BEFORE",
        frozen: false,
        durationSeconds: 90 * 60,
      });
    }

    return upcomingContestData;
  } catch (err) {
    log("leetcode error", err);
    throw new Error("Error Scrapping Leetcode Contests");
  }
};
