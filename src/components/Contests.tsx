import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import axios, { AxiosResponse, CancelTokenSource } from "axios";
import { ContestsCard } from "./ContestsCard";
// import { getAtcoderContests } from '../scrappers/atcoderScrapper'

export type Contest_type =
  | "CF"
  | "IOI"
  | "ICPC"
  | "ATCODER"
  | "LEETCODE"
  | "CODECHEF";

type Contest_phase =
  | "BEFORE"
  | "CODING"
  | "PENDING_SYSTEM_TEST"
  | "SYSTEM_TEST"
  | "FINISHED";

export interface IContest {
  id?: number;
  name: string;
  type: Contest_type;
  phase: Contest_phase;
  frozen: boolean;
  durationSeconds: number;
  startTimeSeconds?: number;
  relativeTimeSeconds?: number;
  href?: string;
  ratingRange?: string;
}

let cancelTokenSource: CancelTokenSource | null;
const createCancelToken = () => {
  cancelTokenSource = axios.CancelToken.source();
  return cancelTokenSource.token;
};
export const Contests = forwardRef<
  {
    handleRefresh: () => void;
  },
  {
    contestTypes: { [key in Contest_type]: boolean };
  }
>(({ contestTypes }, ref) => {
  const [contests, setContests] = useState<IContest[]>([]);

  const handleRefresh = () => {
    setContests([]);
    fetch_contests();
  };
  // console.log(contestTypes);
  useImperativeHandle(ref, () => ({
    handleRefresh,
  }));

  const fetch_contests = async () => {
    console.log("fetch");
    if (cancelTokenSource) cancelTokenSource.cancel();
    const cancelToken = createCancelToken();
    try {
      const res: AxiosResponse<{ status: string; result: IContest[] }> =
        await axios.get<{ status: string; result: IContest[] }>(
          "contest.list",
          {
            cancelToken,
            params: {
              phase: "BEFORE",
              contestTypes,
            },
          }
        );
      // console.log("data", res.data, "datare", res.data.result);
      const data = res.data.result.filter(
        (contest) => contest.phase === "BEFORE" && contestTypes[contest.type]
      );

      setContests(
        data.sort((a, b) => {
          return a.startTimeSeconds && b.startTimeSeconds
            ? a.startTimeSeconds - b.startTimeSeconds
            : Number.MAX_SAFE_INTEGER;
        })
      );
      localStorage.setItem(
        "contests",
        JSON.stringify({ data: data, time: Date.now() })
      );
      localStorage.setItem("contestTypes", JSON.stringify(contestTypes));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log("useEffect");
    setContests((data) => data.filter((contest) => contestTypes[contest.type]));
    if (localStorage.getItem("contests")) {
      const {
        data,
        time,
      }: {
        data: IContest[];
        time: number;
      } = JSON.parse(localStorage.getItem("contests") || "{}");
      const prevContestTypes: Record<Contest_type, boolean> = JSON.parse(
        localStorage.getItem("contestTypes") || "{}"
      );

      if (
        Date.now() - time < 1000 * 60 * 60 * 60 * 24 &&
        contestTypes &&
        prevContestTypes &&
        JSON.stringify(Object.entries(contestTypes).sort()) ===
          JSON.stringify(Object.entries(prevContestTypes).sort())
      ) {
        console.log("local");
        setContests(data.filter((contest) => contestTypes[contest.type]));
        return;
      }
    }
    fetch_contests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contestTypes]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        overflow: "visible",
        width: "100%",
        height: "100%",
        padding: 6,
      }}
    >
      {contests.length > 0
        ? contests.map((contest, idx) => {
            return <ContestsCard {...contest} key={idx}></ContestsCard>;
          })
        : null}
    </div>
  );
});
