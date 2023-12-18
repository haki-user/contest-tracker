import './App.css'
import axios from 'axios';
import { Contests } from './components/Contests';

// axios.defaults.baseURL = "https://codeforces.com/api/";
axios.defaults.baseURL = "http://localhost:3000/"

function App() {

  return (
    <div>
      <Contests></Contests>
    </div>
  )
}

export default App
