import axios from "axios";
import { load } from "cheerio";
import { log } from "@repo/logger";
import { dayHM12ToSeconds } from "@repo/utils";
import { IContest } from "@repo/types";

const baseURL = "https://leetcode.com";

export const getLeetcodeContests = async () => {
  try {
    const { data } = await axios.get(baseURL + "/contest/");
    const $ = load(data, {
      xmlMode: true,
      decodeEntities: true,
    });
    // div -> div -> 2nd div
    const container = $("div.swiper-wrapper").children("div");
    const upcomingContestData: IContest[] = [];
    for (let i = 0; i < 2; i++) {
      const contest = container.eq(i);
      const contestData = contest.find("div.items-center").text().trim();
      const contestName = contestData.match(/^(\w+\s\w+\s\d+)/g)?.at(0);
      const contestDate = contestData
        .match(/(?<=\d)([a-zA-Z]+\s\w+:\w+\s\w+)/g)
        ?.at(0); // Day hh:mm AM/PM
      // convert contestDate (upcoming Day HH:MM AM/PM) to secondS
      const contestDateSeconds = contestDate
        ? dayHM12ToSeconds(contestDate)
        : Number.MAX_VALUE;
      const contestLink = baseURL + contest.find("a").attr("href");
      upcomingContestData.push({
        name: contestName ?? "NA",
        startTimeSeconds: contestDateSeconds,
        href: contestLink,
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
