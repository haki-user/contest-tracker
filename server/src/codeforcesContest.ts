import axios, {AxiosResponse } from 'axios';
import { IContest } from './types';

export const getCodeforcesContests = async () => {
  try {
     const codeforces: AxiosResponse<{ status: string; result: IContest[] }> =
        await axios.get<{ status: string; result: IContest[] }>(
          "https://codeforces.com/api/contest.list",
          {
            params: {
              phase: "BEFORE",
            },
          }
        );
      // add url to codeforces contests
      codeforces.data.result.forEach((contest) => {
        contest.href = `https://codeforces.com/contests/${contest.id}`;
      });
    // const { data } = await axios.get('https://codeforces.com/api/contest.list');
    const contests = codeforces.data.result.filter((contest) => contest.phase === 'BEFORE');
   // const upcomingContests: IContest[] = [];
   // for (let i = 0; i < contests.length; i++) {
   //   const contest = contests[i];
   //   if (contest.phase === 'BEFORE') {
   //     upcomingContests.push({
   //       startTimeSeconds: contest.startTimeSeconds,
   //       name: contest.name,
   //       href: 'https://codeforces.com/contests/' + contest.id,
   //       durationSeconds: contest.durationSeconds,
   //       ratingRange: contest.name,
   //       type: contest.type,
   //       phase: contest.phase,
   //       frozen: contest.frozen,
   //     });
   //   }
   // }
    return contests;
  } catch(e) {
    console.log('codeforces error', e);
    return [];
  }
}

// getCodeforcesContests();