import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { ContestsCard } from './ContestsCard';

 type Contest_type = 'CF' | 'IOI' | 'ICPC';

 type Contest_phase = 
    'BEFORE' |
    'CODING' |
    'PENDING_SYSTEM_TEST' |
    'SYSTEM_TEST' |
    'FINISHED';


export interface IContest {
    id: number;
    name: string;
    type: Contest_type;
    phase: Contest_phase;
    frozen: boolean;
    durationSeconds: number;
    startTimeSeconds?: number;
    relativeTimeSeconds?: number;
}

export const Contests: React.FC = () => {
	const [contests, setContests] = useState<IContest[]>([]);

    const fetch_contests = async () => {
        try {
            const res: AxiosResponse<{status: string, result: IContest[]}> = await axios.get<{status: string, result: IContest[]}>('contest.list', {
                params: {
                    phase:'BEFORE'
                }
            });
            console.log(res.data.result);
            const data = res.data.result.filter(contest => contest.phase==="BEFORE");
            setContests(data.sort((a, b) => {
                return (
                    a.startTimeSeconds&&b.startTimeSeconds?a.startTimeSeconds-b.startTimeSeconds:Number.MAX_SAFE_INTEGER);
            }));
            localStorage.setItem('contests', JSON.stringify({ data: data, time: Date.now() }));
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
      console.log("useEffect");
      if (localStorage.getItem('contests')) {
        const { data, time } = JSON.parse(localStorage.getItem('contests') || '{}');
        console.log(data, Date.now()-time);
        if (Date.now() - time < 1000 * 60 * 5) {
          setContests(data);
          return;
        }
      }
        fetch_contests();
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', boxSizing: 'border-box', overflow: 'visible',  width: '100%', height: '100%' }}>
            {contests.length>0 ? contests.map((contest, idx) => {
                return ( 
                <ContestsCard {...contest} key={idx}></ContestsCard>
                );
            }): null}
        </div>
    ) 
};
