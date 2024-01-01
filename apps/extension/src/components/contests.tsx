import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import type { AxiosResponse } from "axios";
import axios from "axios";
import type { IContest, ContestType, ContestSelection } from "@repo/types";
// import { log } from "@repo/logger";
import { ContestsCard } from "./contests-card";

const log = (...args: string[]): void => {
  // eslint-disable-next-line no-console -- keeping console.log for debugging
  console.log(args);
};
let controller: AbortController | null = null;
const createAbortController = (): AbortSignal => {
  if (controller) controller.abort();
  controller = new AbortController();
  return controller.signal;
};

export const Contests = forwardRef<
  { handleRefresh: () => void },
  { contestTypes: ContestSelection }
>(({ contestTypes }, ref) => {
  const [contests, setContests] = useState<IContest[]>([]);

  const handleRefresh = (): void => {
    setContests([]);
    void fetchContests();
  };
  // console.log(contestTypes);
  useImperativeHandle(ref, () => ({
    handleRefresh,
  }));

  const fetchContests = async (): Promise<void> => {
    try {
      const abortController = createAbortController();
      const res: AxiosResponse<{ status: string; contests: IContest[] }> =
        await axios.get<{ status: string; contests: IContest[] }>("contests", {
          signal: abortController,
          params: {
            phase: "BEFORE",
            contestTypes: JSON.stringify(contestTypes),
          },
        });
      // console.log("data", res.data, "datare", res.data.result);
      const data = res.data.contests.filter(
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
        JSON.stringify({ data, time: Date.now() })
      );
      localStorage.setItem("contestTypes", JSON.stringify(contestTypes));
    } catch (e) {
      log("Error Fetching Contests: ", e as string);
    }
  };

  useEffect(() => {
    setContests((data) => data.filter((contest) => contestTypes[contest.type]));
    const localContestTypes = localStorage.getItem("contest");
    if (localContestTypes) {
      const { data, time } = JSON.parse(localContestTypes) as {
        data: IContest[];
        time: number;
      };
      const localPrevContestTypes = localStorage.getItem("contestTypes");
      const prevContestTypes = (
        localPrevContestTypes ? JSON.parse(localPrevContestTypes) : null
      ) as Record<ContestType, boolean> | null;

      if (
        Date.now() - time < 1000 * 60 * 60 * 60 * 24 &&
        prevContestTypes &&
        JSON.stringify(
          Object.entries(contestTypes).sort(([aKey], [bKey]) =>
            aKey.localeCompare(bKey)
          )
        ) ===
          JSON.stringify(
            Object.entries(prevContestTypes).sort(([aKey], [bKey]) =>
              aKey.localeCompare(bKey)
            )
          )
      ) {
        setContests(data.filter((contest) => contestTypes[contest.type]));
        return;
      }
    }
    void fetchContests();
    // eslint-disable-next-line react-hooks/exhaustive-deps  -- Don't want to add fetchContests in dependency array
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
        ? contests.map((contest) => {
            return (
              <ContestsCard
                {...contest}
                key={`id${
                  contest.id
                    ? contest.id
                    : contest.name + contest.startTimeSeconds
                }`}
              />
            );
          })
        : null}
    </div>
  );
});

Contests.displayName = "Contests";
