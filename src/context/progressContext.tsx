import React, { createContext, useState } from "react";

interface ProgressContextProps {
  progress: number;
  startRequest: () => void;
  updateProgress: (progress: number) => void;
  finishRequest: () => void;
}

export const ProgressContext = createContext<ProgressContextProps>({
  progress: 0,
  startRequest: () => {},
  updateProgress: () => {},
  finishRequest: () => {},
});

export const ProgressProvider: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [progress, setProgress] = useState(0);
  const [activeRequests, setActiveRequests] = useState(0);

  const startRequest = () => {
    setActiveRequests((prev) => prev + 1);
  };

  const updateProgress = (newProgress: number) => {
    setProgress(newProgress);
  };

  const finishRequest = () => {
    setActiveRequests((prev) => prev - 1);
    if (activeRequests === 1) {
      setProgress(0);
    }
  };

  return (
    <ProgressContext.Provider
      value={{ progress, startRequest, updateProgress, finishRequest }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

// export const useProgress = () => useContext(ProgressContext);
