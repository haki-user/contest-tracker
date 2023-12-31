import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
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
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setContests((data) => data.filter((contest) => contestTypes[contest.type]));
    fetch_contests();
  }, [contestTypes]);

  useEffect(() => {
    // console.log("useEffect");
    if (localStorage.getItem("contests")) {
      const { data, time } = JSON.parse(
        localStorage.getItem("contests") || "{}"
      );
    // console.log(data, Date.now() - time);
      if (Date.now() - time < 1000 * 60 * 60 * 60 * 24) {
        setContests(data);
        return;
      }
    }
    fetch_contests();
  }, []);

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
