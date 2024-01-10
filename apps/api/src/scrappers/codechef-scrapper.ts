// import type { ElementHandle } from "puppeteer";
import { launch } from "puppeteer";
import { log } from "@repo/logger";
import type { IContest } from "@repo/types";
import {
  convertDateTimeToAbsoluteSeconds,
  convertTimeToSeconds,
} from "@repo/utils";

type PartialIContest = Partial<IContest> & {
  name: string | undefined;
  href: string | undefined;
  startTime: string | null;
  startDate: string | null;
  duration: string | null;
};

const baseURL = "https://codechef.com";

export const getCodechefContests = async (): Promise<IContest[]> => {
  try {
    const browser = await launch({
      headless: true,
      defaultViewport: null,
    });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );
    await page.setViewport({ width: 1366, height: 768 });

    await page.goto(`${baseURL}/contests`, {
      waitUntil: "domcontentloaded",
    });
    await page.waitForSelector("._dataTable__container_1c9os_369");
    await page.waitForSelector("._reminder__cell_1c9os_445"); // for upcoming contests the bell reminder is present, so wait for it to load
    const upcomingContestData: PartialIContest[] = await page.evaluate(() => {
      const tables = document
        .querySelector("#root")
        ?.querySelector("div")
        ?.querySelectorAll("._dataTable__container_1c9os_369");
      const upcomingContestTable =
        tables && tables.length > 2 ? tables[1] : null;
      if (!upcomingContestTable)
        throw new Error("Codechef scrapper error,No upcoming contests found");

      const rows = Array.from(upcomingContestTable.querySelectorAll("tr"));

      const data: PartialIContest[] = rows.map((ele) => {
        const td = ele.querySelectorAll("td");
        // const id = td[0].textContent || undefined; // code
        const name =
          (td.length > 0 && td[1].querySelector("span")?.textContent) ||
          undefined;
        const href =
          (td.length > 0 && td[1].querySelector("a")?.href) || undefined;
        const [startDate, startTime] =
          td.length > 1
            ? Array.from(td[2].querySelectorAll("p"))?.map(
                (ele) => ele.textContent
              )
            : [];
        const duration =
          (td.length > 2 && td[3].querySelector("p")?.textContent) || null;
        return {
          name,
          href,
          startDate,
          startTime,
          duration,
        };
      });
      return data;
    });
    const final: IContest[] = upcomingContestData
      .filter((contest) => contest.name !== undefined)
      .map((contest) => {
        return {
          name: contest.name || "NA",
          href: contest.href,
          startTimeSeconds:
            contest.startDate && contest.startTime
              ? convertDateTimeToAbsoluteSeconds(
                  contest.startDate,
                  contest.startTime
                )
              : undefined,
          durationSeconds: convertTimeToSeconds(contest.duration || "NA"),
          type: "CODECHEF",
          frozen: false,
          phase: "BEFORE",
        };
      });
    return final;
  } catch (e) {
    log("CodeChef error", e);
    throw new Error("Error Scrapping Codechef Contests");
  }
};
