import React, { useState, useEffect } from "react";
import type { IContest } from "@repo/types";
import "./contestsCard.css";

// const colors = {
//   CF: "red",
//   IOI: "red",
//   ICPC: "red",
//   ATCODER: "grey",
//   LEETCODE: "#e6ad10",
//   CODECHEF: "#2F5496",
//   TOPCODER: "#3B5998",
//   OTHER: "#000000",
// };

export function ContestsCard({
  // id,
  name,
  type,
  phase,
  // frozen,
  // durationSeconds,
  startTimeSeconds,
  // relativeTimeSeconds,
  href,
}: IContest): JSX.Element {
  const [remSeconds, setRemSeconds] = useState(
    startTimeSeconds ? startTimeSeconds - Math.floor(Date.now() / 1000) : null
  );
  const [notify, setNotify] = useState(false);

  useEffect(() => {
    if (!startTimeSeconds) return;

    const interval = setInterval(() => {
      const newRemSeconds = startTimeSeconds - Math.floor(Date.now() / 1000);
      setRemSeconds(newRemSeconds);
      if (newRemSeconds < 0) clearInterval(interval);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [startTimeSeconds]);

  // handle reminder extension
  useEffect(() => {
    if (notify) {
      // console.log("remSeconds", remSeconds);
      const timeout = setTimeout(() => {
        // console.log("remSeconds", remSeconds);
        // console.log("Notification");
        // eslint-disable-next-line no-alert -- keeping alert for debugging
        // use browser notifications chrome

        // alert(`Contest is about to start`);
        // chrome.notifications.create(
        //   notificationId?: string,
        //   options: NotificationOptions,
        //   callback?: function,
        // );
        setNotify(false);
      }, 4 * 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [notify]);

  const formatRemainingTime = (remainingTime: number): string => {
    if (remainingTime < 0) return "00:00:00:00";
    const days = Math.floor(remainingTime / (3600 * 24));
    const hours = Math.floor((remainingTime / 3600) % 24);
    const mins = Math.floor((remainingTime / 60) % 60);
    const secs = Math.floor(remainingTime % 60);
    // Format with leading zeros for single-digit days and hours
    const formattedDays = days < 10 ? `0${days}` : `${days}`;
    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMins = mins < 10 ? `0${mins}` : `${mins}`;
    const formattedSecs = secs < 10 ? `0${secs}` : `${secs}`;

    return `${formattedDays}:${formattedHours}:${formattedMins}:${formattedSecs}`;
  };

  return (
    <div
      // href={`https://codeforces.com/contests/${id}`}
      className="contestsCard-container bg-opacity-90 bg-[#1C204B] backdrop-blur-3xl"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: 50,
        margin: 5,
        padding: 10,
        // backgroundColor: type==='ATCODER'?"#242831":"#1C204B",
        // backgroundColor: "#1C204B",
        color: "white",
        boxSizing: "border-box",
        // boxShadow:
        // "0px 1px 2px 0px rgba(0,255,255,0.2),1px 2px 4px 0px rgba(0,255,255,0.4), 2px 3px 6px 0px rgba(0,255,255,0.4), 2px 0px 10px 0px rgba(0,255,255,0.4)",
        fontWeight: 500,
      }}
    >
      <a
        href={href}
        rel="noopener"
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
        target="_blank"
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            justifyContent: "space-between",
            boxSizing: "border-box",
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontWeight: 600,
            }}
            className="hover:brightness-95 hover:underline"
          >
            {name}
          </span>
          <span
            style={{
              fontSize: 12,
              justifySelf: "flex-end",
            }}
          >
            {startTimeSeconds
              ? new Date(startTimeSeconds * 1000).toLocaleString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: phase === "FINISHED" ? "numeric" : undefined,
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "NA"}
          </span>
        </div>
      </a>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span
          style={{
            fontSize: 14,
            color:
              remSeconds && remSeconds / 60 / 60 / 24 < 1 ? "red" : "white",
          }}
        >
          {
            //remSeconds?`${Math.floor(remSeconds/(3600*24))}D ${Math.floor((remSeconds/3600)%24)}H`:"NA"
            remSeconds ? formatRemainingTime(remSeconds) : "NA"
          }
        </span>
        <span
          className="contest-type"
          style={{
            margin: "10px",
            // color: colors[type]
            color: "#FF8E2B",
          }}
        >
          {type}
        </span>
        {/* <button
          onClick={() => {
            setNotify((prev) => !prev);
          }}
          style={{
            marginLeft: "auto",
            marginRight: 8,
            backgroundColor: "transparent",
            boxShadow: "none",
            border: "none",
          }}
          type="button"
        >
          {notify ? <BellIconActive /> : <BellIcon />}
        </button> */}
      </div>
    </div>
  );
}

function BellIcon(): JSX.Element {
  return (
    <svg
      fill="#ffff"
      height="18"
      viewBox="0 -960 960 960"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" />
    </svg>
  );
}

function BellIconActive(): JSX.Element {
  return (
    <svg
      fill="#ffff"
      height="18"
      viewBox="0 -960 960 960"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M80-560q0-100 44.5-183.5T244-882l47 64q-60 44-95.5 111T160-560H80Zm720 0q0-80-35.5-147T669-818l47-64q75 55 119.5 138.5T880-560h-80ZM160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" />
    </svg>
  );
}
