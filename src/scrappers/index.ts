import express from "express";
import cors from "cors";
import { getAtcoderContests } from "./atcoderScrapper.ts";
import { getLeetcodeContests } from "./leetcodeScrapper.ts";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/*", async (_, res) => {
  const data = await getAtcoderContests();
  const data2 = await getLeetcodeContests();
  res.json({ result: [...data, ...data2] });
});

app.listen(3000, () => {
  console.log("listening");
});
