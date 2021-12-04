import React, {useState} from 'react';
import './App.css';
import Lobby from "./pages/Lobby";
import Game from './pages/Game'

function App() {
    const [state,setState] = useState(false);

  return (
    <div className="App">
                <button onClick={() => {setState(!state)}}>Test</button>

     <Game state={state}/>
    </div>
  );
}

export default App;
