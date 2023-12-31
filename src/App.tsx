import React, { useState, useRef } from "react";
import "./App.css";
import axios from "axios";
import { Contests } from "./components/Contests";
import { ProgressBar } from "react-axios-progressbar";
import { Contest_type } from "./components/Contests";

// axios.defaults.baseURL = "https://codeforces.com/api/";
axios.defaults.baseURL = "https://api-contest-tracker.onrender.com/";
const axiosInstance = axios;
function App() {
  const [isHome, setIsHome] = useState(true);
  const [contestType, setContestType] = useState<{
    [key in Contest_type]: boolean;
  }>({
    CF: true,
    IOI: true,
    ICPC: true,
    LEETCODE: true,
    ATCODER: true,
    CODECHEF: true,
  });
  const refreshButtonRef = useRef<{ handleRefresh: () => void }>(null);
  const toggleContestType = (contest: Contest_type) => {
    setContestType((prev) => {
      return { ...prev, [contest]: !prev[contest] };
    });
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <ProgressBar axiosInstance={axiosInstance} />
      <div
        className="header"
        style={{
          paddingTop: 10,
          overflow: "hidden",
          backgroundColor: "purple",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <button onClick={() => setIsHome(true)} style={{}}>
            Home
          </button>
          <button onClick={() => setIsHome(false)}>profile</button>
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
          {Object.entries(contestType).map(([key, value], index) => {
            return (
              <div
                key={index}
                style={{
                  borderRight:
                    index < Object.keys(contestType).length - 1
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
                  name={`inp-cont-type-${key}`}
                  id={`inp-cont-type-${key}`}
                  type="checkbox"
                  checked={value}
                  onChange={() => toggleContestType(key as Contest_type)}
                />
              </div>
            );
          })}
        </div>
        <button onClick={() => refreshButtonRef.current?.handleRefresh()}>
          Refresh
        </button>
      </div>
      {isHome ? (
        <Contests contestTypes={contestType} ref={refreshButtonRef}></Contests>
      ) : (
        <div>profile</div>
      )}
    </div>
  );
}

export default App;
