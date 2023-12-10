import React, { useState, useEffect } from 'react';
import { IContest } from './Contests';
import './contestsCard.css';

export const ContestsCard: React.FC<IContest> = ({id, name, type, phase, frozen, durationSeconds, startTimeSeconds, relativeTimeSeconds}) => {
    const [remSeconds, setRemSeconds] = useState<number | null> (startTimeSeconds?startTimeSeconds-Math.floor(Date.now()/1000):null);
    console.log(id+type+phase+durationSeconds, frozen, relativeTimeSeconds);
    
    
    useEffect(() => {
        if(!startTimeSeconds) return;
        
        const interval = setInterval(() => {
            const newRemSeconds = startTimeSeconds - Math.floor(Date.now() / 1000);
            setRemSeconds(newRemSeconds);
            if(newRemSeconds < 0) clearInterval(interval);
        }, 1000);

        return () => clearInterval(interval);
    }, [startTimeSeconds]);

    const formatRemainingTime = (remainingTime: number) => {
        const days = Math.floor(remainingTime / (3600 * 24));
        const hours = Math.floor((remainingTime / 3600) % 24);
        const mins = Math.floor((remainingTime/60)%(60));
        const secs = Math.floor((remainingTime)%(60));
        console.log(days, hours, mins, secs); 
        // Format with leading zeros for single-digit days and hours
        const formattedDays = days < 10 ? `0${days}` : `${days}`;
        const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
        const formattedMins = mins < 10 ? `0${mins}` : `${mins}`;
        const formattedSecs = secs < 10 ? `0${secs}` : `${secs}`;

        return `${formattedDays}:${formattedHours}:${formattedMins}:${formattedSecs}`;
    }
    
    return (
        <a href={`https://codeforces.com/contests/${id}`}
            className={'contestsCard-container'}
            target="_blank"
        style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            minHeight: 50,
            margin: 5,
            padding: 10,
            backgroundColor: '#1C204B',
            color: 'white',
            boxSizing: 'border-box',
            boxShadow: '0px 1px 2px 0px rgba(0,255,255,0.2),1px 2px 4px 0px rgba(0,255,255,0.4), 2px 3px 6px 0px rgba(0,255,255,0.4), 2px 0px 10px 0px rgba(0,255,255,0.4)',
            fontWeight: 500,
        }}>
        <div style={{ 
            display: 'flex', 
            width: '100%', 
            height: '100%', 
            justifyContent: 'space-between',
            boxSizing: 'border-box',
        }} >
            <span style={{
                fontSize: 14,
                fontWeight: 600
            }}>{name}</span>
            <span style={{
                fontSize: 12,
                justifySelf: 'flex-end',
            }}>{startTimeSeconds?new Date(startTimeSeconds*1000).toLocaleString('en-US', { day: 'numeric', month: 'short', year: phase==='FINISHED'?'numeric':undefined , hour: '2-digit', minute: '2-digit' }): "NA"}</span>
        </div>
        <div>
        <span style={{
            fontSize: 14
        }}>{
            //remSeconds?`${Math.floor(remSeconds/(3600*24))}D ${Math.floor((remSeconds/3600)%24)}H`:"NA"
            remSeconds?formatRemainingTime(remSeconds):"NA"
        }</span>
        </div>
        </a>
    );
};
