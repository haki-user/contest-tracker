export type ContestType =
  | "ATCODER"
  | "CF"
  | "CODECHEF"
  | "ICPC"
  | "IOI"
  | "LEETCODE";

export type ContestPhase =
  | "BEFORE"
  | "CODING"
  | "FINISHED"
  | "PENDING_SYSTEM_TEST"
  | "SYSTEM_TEST";

export type ContestSelection = Record<ContestType, boolean>;

export interface IContest {
  id?: number;
  name: string;
  type: ContestType;
  phase: ContestPhase;
  frozen: boolean;
  durationSeconds: number;
  startTimeSeconds?: number;
  relativeTimeSeconds?: number;
  href?: string;
  ratingRange?: string;
}
