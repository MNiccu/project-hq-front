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

    const [userName, setUserName] = useState<string>("undefined");

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
            
            connection.on('ConfirmLogin', (username) => {
                console.log('Message Received');
                setUserName(userName => username);
            });
            
        });

    }, [connection])


    

    const sendMessage = async () => {
        if(!connection) {
            return;
        }

        console.log("Sending message");
        try {
            await connection.send('SendMessage', {user: userName, message: 'TestMessage'});
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

    const joinGroup = async () => {
        if(!connection) {
            return;
        }
        try {
            await connection.send('JoinGroup', 'TestGroup1');
            
        } catch(e){
            console.error(e)
        }
    }

    const messageGroup = async () => {
        if(!connection) {
            return;
        }
        console.log("Sending group message");
        try {
            await connection.send('SendMessageToGroup', 'TestGroup1', {user: userName, message: 'TestMessage to group'});
            console.log("group Message send");
        }catch(e){
            console.error(e);
        }
    }

    return <div>
        <button onClick={sendMessage}>Send message</button>
        <button onClick={login}>Login</button>
        <button onClick={checkLogin}>Check login</button>
        <button onClick={joinGroup}>Join Group</button>
        <button onClick={messageGroup}>send msg to group</button>
        <ChatRows rows={chatRows}></ChatRows>
        <h2 >you are: {userName}</h2>

    </div>;
}

export default Chat;