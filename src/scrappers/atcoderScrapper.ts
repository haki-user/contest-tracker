import axios from "axios";
import { load } from "cheerio";
import { IContest } from "../components/Contests";

const baseURL = "https://atcoder.jp";

export const getAtcoderContests = async () => {
  try {
    const { data } = await axios.get(baseURL + "/contests/");

    const $ = load(data);
    const upcomingContestsDiv = $("div#contest-table-upcoming");
    const upcomingContestsTable = upcomingContestsDiv.find("table").eq(0);
    const upcomingContestsTableRows = upcomingContestsTable.find("tr");

    const upcomingContests: IContest[] = [];
    for (let i = 1; i < upcomingContestsTableRows.length; i++) {
      const contest = upcomingContestsTableRows.eq(i);
      const contestTime = contest.find("td").eq(0).find("time").text().trim();
      const contestName = contest.find("td").eq(1).find("a").text().trim();
      const contestLink =
        baseURL + contest.find("td").eq(1).find("a").attr("href");
      const contestDuration = contest.find("td").eq(2).text().trim(); // hh:mm
      const contestDurationSeconds =
        parseInt(contestDuration.split(":")[0]) * 3600 +
        parseInt(contestDuration.split(":")[1]) * 60;
      const ratingRange = contest.find("td").eq(3).text().trim();

      upcomingContests.push({
        startTimeSeconds: Date.parse(contestTime) / 1000,
        name: contestName,
        href: contestLink,
        durationSeconds: contestDurationSeconds,
        ratingRange,
        type: "ATCODER",
        phase: "BEFORE",
        frozen: false,
      });
    }
    return upcomingContests;
  } catch (e) {
    console.log("atcoder error", e);
    return [];
  }
};
