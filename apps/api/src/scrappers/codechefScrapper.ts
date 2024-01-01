// import axios from 'axios';
// import puppeteer from 'puppeteer';
// import { IContest } from './types';
//
// const baseURL = 'https://codechef.com';
//
// export const getCodechefContests = async () => {
//   try {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto(baseURL + '/contests');
//     // tbody.MuiTableBody-root (rows) -> tr.MuiTableRow-root (row) -> (td.MuiTableCell-root (cell) -> div class="jss61 jss66" -> p (contst name)), (td.MuiTableCell-root (cell) -> div class="jss61 jss66" -> div (class="_timer__container_1c9os_518") -> p, p (start date))
//     const table =
//     const tableRows;
//     const contests: IContest[] = [];
//     return contests;
//   } catch(e) {
//     console.log('codechef error', e);
//     return [];
//   }
// }
//
// getCodechefContests();
//import axios from 'axios';
import puppeteer from "puppeteer";
import { log } from "@repo/logger";
//import { IContest } from './types';

const baseURL = "https://codechef.com";

export const getCodechefContests = async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(baseURL + "/contests");

    // Wait for the table to be rendered (you may need to adjust the selector)
    await page.waitForSelector("tbody.MuiTableBody-root");

    const tableRows = await page.$$(
      "tbody.MuiTableBody-root tr.MuiTableRow-root"
    );
    const contests = [];
    console.log(tableRows, tableRows.toString());
    for (const row of tableRows) {
      const columns = await row.$$("td.MuiTableCell-root");

      // Extract contest name
      const contestName = await columns[0].$eval("div.jss61.jss66 p", (el) => {
        if (el && el.textContent) el.textContent.trim();
        return "non";
      });

      // Extract start date
      const startDate = await columns[1].$eval(
        "div.jss61.jss66 div._timer__container_1c9os_518 p",
        (el) => {
          if (el && el.textContent) el.textContent.trim();
          return 0;
        }
      );

      contests.push({
        name: contestName,
        startTimeSeconds: startDate || 0,
      });
    }

    await browser.close();
    console.log(contests);
    return contests;
  } catch (e) {
    log("CodeChef error", e);
    throw new Error("Error Scrapping Codechef Contests");
  }
};

getCodechefContests();
