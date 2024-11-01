import React, { useState, useRef } from "react";
import "./App.css";
import axios from "axios";
import type { ContestType, ContestSelection } from "@repo/types";
import { ProgressBar } from "react-axios-progressbar";
import { Contests } from "./components/contests";
import { Profile } from "./components/profile";

const url = import.meta.env.VITE_API_URL as string;
axios.defaults.baseURL = url;
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
    setContestTypes((prev: ContestSelection) => {
      return { ...prev, [contest]: !prev[contest] };
    });
  };

  return (
    <div
      style={{ position: "relative", width: "100%", height: "100%" }}
      className=" bg-transparent overflow-hidden h-[600px]"
    >
      <div className="background fixed  h-full -z-10 blur-d">
        <img
          className="object-fill w-[500px] min-w-[320px] h-[100vh]"
          src="/jjk-gojo.jpg"
        />
      </div>
      <ProgressBar axiosInstance={axiosInstance} />
      <div
        className="header overflow-hidden bg-fuchsia-800 bg-opacity-50 backdrop-blur-md mix-blend-hard-light"
        style={{
          position: "sticky",
          zIndex: 1,
          top: 0,
          paddingTop: 10,
          overflow: "hidden",
          // backgroundColor: "purple",
        }}
      >
        <div className="ml-1 flex flex-row gap-1">
          <button
            onClick={() => {
              setIsHome(true);
            }}
            type="button"
            className="text-xs bg-stone-500 hover:bg-stone-400 active:bg-stone-300 rounded-sm px-2"
          >
            Home
          </button>
          <button
            onClick={() => {
              setIsHome(false);
            }}
            type="button"
            className="text-xs bg-stone-500 hover:bg-stone-400 active:bg-stone-300 rounded-sm px-2"
          >
            Profile
          </button>
          <button
            onClick={() => refreshButtonRef.current?.handleRefresh()}
            type="button"
            className="text-xs bg-stone-500 hover:bg-stone-400 active:bg-stone-300 rounded-sm px-2"
          >
            Refresh
          </button>
        </div>
        <div
          className="contest-type flex flex-row justify-around m-2"
          // style={{
          //   display: "flex",
          //   flexDirection: "row",
          //   justifyContent: "space-around",
          //   margin: 5,
          //   gap: 2,
          // }}
        >
          {Object.entries(contestTypes)
            .sort(([aKey], [bKey]) => aKey.localeCompare(bKey))
            .map(([key, value], index) => {
              return (
                <div
                  key={key}
                  className={`${
                    Boolean(value) ? "text-[#800080] bg-white" : "text-white"
                  } border-[2px] border-white rounded-lg px-2 backdrop-blur-sm`}
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
                    checked={Boolean(value)}
                    id={`inp-cont-type-${key}`}
                    name={`inp-cont-type-${key}`}
                    onChange={() => {
                      toggleContestType(key as ContestType);
                    }}
                    type="checkbox"
                    className="appearance-none"
                  />
                </div>
              );
            })}
        </div>
      </div>
      <div className="body overflow-scroll max-h-full w-full no-scrollbar m-auto min-h-full h-[536px]">
        {isHome ? (
          <Contests contestTypes={contestTypes} ref={refreshButtonRef} />
        ) : (
          <Profile />
        )}
      </div>
    </div>
  );
}

export default App;
