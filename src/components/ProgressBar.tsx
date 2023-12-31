import React from "react";
import { useProgress } from "../hooks/useProgress";

export const ProgressBar: React.FC = () => {
  const { progress } = useProgress();

  const style = {
    width: `${progress}%`,
    height: "10px",
    backgroundColor: "blue",
    transition: "width 0.3s ease",
  };

  return <div style={style}></div>;
};

