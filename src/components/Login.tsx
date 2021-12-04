import React, { createContext, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import {useState, useEffect} from "react"
import {Context} from './TestContext'


const Login = () => {
    const context = useContext(Context);

    console.log('Context content', context);

    const [usernameField, setUsernameField] = useState("")
    const [lobbyIdField, setLobbyIdField] = useState("")
    

    //event handlers for fields
    const handleUsername = (
        e: React.ChangeEvent<HTMLInputElement> ) => {
            setUsernameField(e.currentTarget.value)
    };
    const handleLobbyId = (
        e: React.ChangeEvent<HTMLInputElement> ) => {
            setLobbyIdField(e.currentTarget.value)
    };

    const createLobby = () => {
       context.setIsLoginView(false);
    }
    const joinLobby = () => {
        context.setIsLoginView(false);
    }

   

    return (
      
        <div className="container">		
            <div className="card my-4 w-75 mx-auto" > 
                <h2 className="mt-1">Login</h2>
                <div className="form-group mt-3">
                    <label>Username</label>
                    <input onChange={handleUsername} id="usernameField" value={usernameField} type="text" placeholder="Enter username"></input>		
                </div>
                
                <div>
                    <button className="btn btn-primary mt-2" onClick={createLobby} >Create a Lobby</button>
                    <p className="mt-3">OR</p>
                </div>

                <div className="form-group ">
                    <h4>Join an existing Lobby</h4>
                    <label>Lobby id</label>
                    <input onChange={handleLobbyId} id="lobbyIdField" value={lobbyIdField} type="text" placeholder="Enter lobby id"></input>		
                    
                    <button className="btn btn-primary " onClick={joinLobby} >Join</button>
                </div>
            </div>
        </div>

      
    );
  }
  
  export default Login;