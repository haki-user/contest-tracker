import express from "express";
import cors from "cors";
import { getAtcoderContests } from "./atcoderScrapper";
import { getLeetcodeContests } from "./leetcodeScrapper";
import { getCodeforcesContests } from "./codeforcesContest";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/*", async (_, res) => {
  const data = await getAtcoderContests();
  const data2 = await getLeetcodeContests();
  const data3 = await getCodeforcesContests();
  res.json({ result: [...data, ...data2, ...data3] });
});

app.listen(3000, () => {
  console.log("listening");
});
