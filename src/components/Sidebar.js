import {React, useState, useEffect} from 'react';
import './styles/Sidebar.css';
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';
import db from "../firebase";
import { useStateValue } from '../StateProvider';

function Sidebar() {

    const [chats, setChats] = useState([]);
    const[{ user }] = useStateValue();

    useEffect(() => {
        const unsubscribe = db.collection('chats').onSnapshot(snapshot => {
            setChats(snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    data: doc.data()
                }
            )))
        })

        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user?.photoURL} />
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start a new chat"
                    type="text" />
                </div>
            </div>

            <div className="sidebar__chats">
                <SidebarChat addNewChat/>
                {chats.map(chat => {
                    return (
                    <SidebarChat key={chat.id} id={chat.id} 
                        name={chat.data.name} />
                    );
                })}
            </div>
        </div>
    );
}

export default Sidebar;