import { Avatar } from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import db from '../firebase';
import './styles/SidebarChat.css';

function SidebarChat({ id, name, addNewChat }) {

    const [seed, setSeed] = useState(0);
    const [messages, setMessages] = useState("");

    useEffect(() => {
        if(id){
            db.collection('chats')
            .doc(id)
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => 
                setMessages(snapshot.docs.map((doc) => doc.data()))
            );
        }
        
    }, [id]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    const createChat = () => {
        const chatName = prompt("Please enter chat name");

        if (chatName){
            db.collection('chats').add({
                name: chatName,
            });
        }
    };

    return !addNewChat ? (
        <Link to={`/chats/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/gridy/${seed}.svg`} />
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
    ) : (
        <div onClick={createChat}
        className="sidebarChat">
            <h2>Add New Chat</h2>
        </div>
    );
}

export default SidebarChat;