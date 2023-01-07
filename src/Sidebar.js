import { ChatBubble, DonutLarge, MoreVert, SearchOutlined } from '@mui/icons-material';
import { Avatar, IconButton } from '@mui/material';
import axios from 'axios';
import React from 'react'
import { useEffect, useState } from 'react';
import './Sidebar.css';
import Sidebarchat from './Sidebarchat';
import {useStateValue} from "./StateProvider"
import Pusher from "pusher-js"

function Sidebar() {
    const [{user}] = useStateValue();
    const [rooms, setRooms] = useState([]);


    useEffect (() => {
      axios.get("http://localhost:5000/all/rooms").then((response) => {
        setRooms(response.data)
      });

     

    },[]);

    useEffect(() =>{
      const pusher = new Pusher('617b6a7821f5eaee4af4', {
        cluster: 'ap2'
      });

      const channel = pusher.subscribe('room');
      channel.bind('inserted', function(room) {
        setRooms((prevRooms) => [...prevRooms, room])
      });

      return () => {
        channel.unbind_all();
        channel.unsubscribe();
      };

    },[])
 

  return (
    <div className='sidebar'>
        <div className="sidebarheader">
            <Avatar src={user.photoURL}/>
            <div className="sidebarheaderright">
                <IconButton>
               <DonutLarge  style={{color:"#e7e7e7"}}/>
                </IconButton>

                <IconButton>
               <ChatBubble  style={{color:"#e7e7e7"}} />
                </IconButton>

                <IconButton>
               <MoreVert   style={{color:"#e7e7e7"}} />
                </IconButton>

            </div>
        </div>
        <div className="sidebarsearch">
          <div className="sidebarsearchcontainer">
            <SearchOutlined style={{color:"#252525"}} />
            <input placeholder='Search new chat' />
             
          </div>
        </div>
        <div className="sidebarchats">
          <Sidebarchat addNewchat/>
          {rooms.map((room) => (<Sidebarchat key= {room._id} id={room._id} name={room.name} />
            ))}
          
        </div>
    </div>
  );
};

export default Sidebar