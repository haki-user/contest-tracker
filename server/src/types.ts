type Contest_type = "CF" | "IOI" | "ICPC" | "ATCODER" | "LEETCODE" | "CODECHEF";

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