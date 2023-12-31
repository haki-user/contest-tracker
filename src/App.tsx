import "./App.css";
import axios from "axios";
import { ProgressProvider } from './context/progressContext'
// import { ProgressBar } from './components/ProgressBar';
import { Contests } from "./components/Contests";
import { ProgressBar } from "react-axios-progressbar";

// axios.defaults.baseURL = "https://codeforces.com/api/";
axios.defaults.baseURL = "https://api-contest-tracker.onrender.com/";
const axiosInstance = axios;
function App() {
  return (
    <ProgressProvider>
      <div>
        <ProgressBar axiosInstance={axiosInstance}/>
        <Contests></Contests>
      </div>
    </ProgressProvider>
  );
}

export default App;
