import React, { useState, useRef } from "react";
import "./App.css";
import axios from "axios";
import type { ContestType, ContestSelection } from "@repo/types";
import { ProgressBar } from "react-axios-progressbar";
import { Contests } from "./components/contests";

axios.defaults.baseURL = "http://localhost:5001/";
const axiosInstance = axios;

function App(): JSX.Element {
  const [isHome, setIsHome] = useState(true);
  const [contestTypes, setContestTypes] = useState(
    (localStorage.getItem("contestTypes")
      ? JSON.parse(localStorage.getItem("contestTypes") || "")
      : {
          CF: true,
          IOI: true,
          ICPC: true,
          LEETCODE: true,
          ATCODER: true,
          CODECHEF: true,
        }) as ContestSelection
  );
  const refreshButtonRef = useRef<{ handleRefresh: () => void }>(null);
  const toggleContestType = (contest: ContestType): void => {
    setContestTypes((prev) => {
      return { ...prev, [contest]: !prev[contest] };
    });
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <ProgressBar axiosInstance={axiosInstance} />
      <div
        className="header"
        style={{
          position: "sticky",
          zIndex: 1,
          top: 0,
          paddingTop: 10,
          overflow: "hidden",
          backgroundColor: "purple",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <button
            onClick={() => {
              setIsHome(true);
            }}
            style={{}}
            type="button"
          >
            Home
          </button>
          <button
            onClick={() => {
              setIsHome(false);
            }}
            type="button"
          >
            profile
          </button>
        </div>
        <div
          className="contest-type"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            margin: 5,
            gap: 2,
          }}
        >
          {Object.entries(contestTypes)
            .sort(([aKey], [bKey]) => aKey.localeCompare(bKey))
            .map(([key, value], index) => {
              return (
                <div
                  key={key}
                  style={{
                    borderRight:
                      index < Object.keys(contestTypes).length - 1
                        ? "1px solid #ccc"
                        : "none",
                  }}
                >
                  <label
                    htmlFor={`inp-cont-type-${key}`}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    {key}
                  </label>
                  <input
                    checked={value}
                    id={`inp-cont-type-${key}`}
                    name={`inp-cont-type-${key}`}
                    onChange={() => {
                      toggleContestType(key as ContestType);
                    }}
                    type="checkbox"
                  />
                </div>
              );
            })}
        </div>
        <button
          onClick={() => refreshButtonRef.current?.handleRefresh()}
          type="button"
        >
          Refresh
        </button>
      </div>
      <div className="body">
        {isHome ? (
          <Contests contestTypes={contestTypes} ref={refreshButtonRef} />
        ) : (
          <div>profile</div>
        )}
      </div>
    </div>
  );
}

export default App;
