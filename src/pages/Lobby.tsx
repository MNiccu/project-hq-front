import React, {useEffect, useState} from 'react'
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";

interface ChatRow {
    id: number;
    username: string;
    message: string;
}

const ChatRows: React.FC<{rows: ChatRow[]}> = ({rows}) => {
    return <React.Fragment>{rows.map((row) => (<div key={row.id}>{row.message}</div>))}</React.Fragment>;
}

const Chat: React.FC = () => {

    const [connection, setConnection] = useState<HubConnection | null >(null);

    const [chatRows, setChatRows] = useState<ChatRow[]>([]);


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
        });

    }, [connection])

    const sendMessage = async () => {
        if(!connection) {
            return;
        }

        console.log("Sending message");
        try {
            await connection.send('SendMessage', {user: 'TestUser1', message: 'TestMessage'});
            console.log("Message send");
        }catch(e){
            console.error(e);
        }
    }


    return <div>
        <button onClick={sendMessage}>Send message</button>
        <ChatRows rows={chatRows}></ChatRows>

    </div>;
}

export default Chat;