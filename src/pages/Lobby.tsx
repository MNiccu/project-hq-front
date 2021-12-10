import React, {useEffect, useState} from 'react'
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";

interface ChatRow {
    id: number;
    username: string;
    message: string;
}

const ChatRows: React.FC<{rows: ChatRow[]}> = ({rows}) => {
    return <React.Fragment>{rows.map((row) => (<div key={row.id}>{row.username}: {row.message}</div>))}</React.Fragment>;
}

const Chat: React.FC = () => {

    const [connection, setConnection] = useState<HubConnection | null >(null);

    const [chatRows, setChatRows] = useState<ChatRow[]>([]);

    const [aaa, setAaa] = useState<string>("undefined");

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('http://localhost:5000/hub/chat')
            .withAutomaticReconnect()
            .build();
        setConnection(newConnection);


    }, [])

    useEffect(() => {
        if(!connection){
            return;
        }

        connection.start().then(() => {
            console.log('Connected');

            connection.on('ReceiveMessage', (username: string, message: string) => {
                console.log('Message Received');
                setChatRows(chatRows => ([...chatRows, {id: chatRows.length + 1, username, message}]));
            });
            
            connection.on('ConfirmLogin', (_ei_nain_mikko) => {
                console.log('Message Received');
                setAaa(aaa => _ei_nain_mikko);
            });
            
        });

    }, [connection])


    

    const sendMessage = async () => {
        if(!connection) {
            return;
        }

        console.log("Sending message");
        try {
            await connection.send('SendMessage', {user: aaa, message: 'TestMessage'});
            console.log("Message send");
        }catch(e){
            console.error(e);
        }
    }

    const login = async () => {
        if(!connection) {
            return;
        }
        try {
            await connection.send('Login', 'TestUser1');
            console.log("username send")
        } catch(e){
            console.error(e)
        }
    }

    const checkLogin = async () => {
        if(!connection) {
            return;
        }
        try {
            await connection.send('CheckLogin');
            console.log("confirmation request")
        } catch(e){
            console.error(e)
        }
    }

    return <div>
        <button onClick={sendMessage}>Send message</button>
        <button onClick={login}>Login</button>
        <button onClick={checkLogin}>Check login</button>
        <ChatRows rows={chatRows}></ChatRows>
        <h2 >you are: {aaa}</h2>

    </div>;
}

export default Chat;