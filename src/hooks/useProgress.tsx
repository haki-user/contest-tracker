import { useContext } from "react";
import { ProgressContext } from "../context/progressContext";
export const useProgress = () => useContext(ProgressContext);
