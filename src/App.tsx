import "./App.css";
import axios from "axios";
import { Contests } from "./components/Contests";

// axios.defaults.baseURL = "https://codeforces.com/api/";
axios.defaults.baseURL = "https://api-contest-tracker.onrender.com/";

function App() {
  return (
    <div>
      <Contests></Contests>
    </div>
  );
}

export default App;
