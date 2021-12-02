import React from 'react';

import './App.css';
import Lobby from "./pages/Lobby";
import Navigation from './components/Navigation';
import Login from "./components/Login"
import Game from './components/Game';
import 'bootstrap/dist/css/bootstrap.css'
import {useState, useEffect} from "react"
import {Context} from "./components/TestContext"

const App = () => {

  const [isLoginView, setIsLoginView] = useState(true)

  const changeView = () => {
    setIsLoginView(!isLoginView)
}


  return (
    <Context.Provider value={ {isLoginView, setIsLoginView} }>

    <div className="App">

     <Lobby/>
      <header className="App-header">
        <Navigation></Navigation>
      </header>
      <body>
      {isLoginView ? <Login></Login> : <Game></Game>}
        <button onClick={changeView}>swap</button>
       
      </body>

    </div>
    
    </Context.Provider>
  );
}

export default App;