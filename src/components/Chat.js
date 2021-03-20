import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined } from '@material-ui/icons';
import { React, useState, useEffect } from 'react';
import "./styles/Chat.css";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from 'react-router';
import db from '../firebase';
import { useStateValue } from '../StateProvider';
import firebase from "firebase";

function Chat() {

    const [seed, setSeed] = useState(0);
    const [input, setInput] = useState("");
    const { chatId } = useParams();
    const [chatName, setChatName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{user}] = useStateValue();

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    useEffect(() => {
        if (chatId){
            db.collection('chats')
            .doc(chatId)
            .onSnapshot(snapshot => 
                setChatName(snapshot.data().name)
            );

            db.collection('chats')
            .doc(chatId)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot(snapshot =>
                setMessages(snapshot.docs.map(doc => doc.data()))
            );
        }
    }, [chatId]);

    const sendMessage = async (e) => {
        e.preventDefault();

        db.collection('chats')
        .doc(chatId)
        .collection('messages')
        .add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        setInput('');
    };

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/gridy/${seed}.svg`}/>

                <div className="chat__headerInfo">
                    <h3>{chatName}</h3>
                    <p>
                        Last seen{" "}
                        {new Date(
                            messages[messages.length - 1]?.timestamp?.toDate()
                        ).toUTCString()}
                    </p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {messages.map((message) => (    
                    <p className={`chat__message ${
                        message.name === user.displayName && "chat__receiver"
                    }`}>
                        <span className="chat__name">{ message.name }</span>
                        {message.message}
                        <span className="chat__timestamp">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>               
                ))}
            </div>

            <div className="chat__footer">
                <InsertEmoticon />
                <form>
                    <input 
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Type a message"
                        type="text"
                    />
                    <button onClick={sendMessage}
                    type="submit">
                        Send a Message
                    </button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat;