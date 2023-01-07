import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react' 
import './Sidebarchat.css';
import axios from "axios"
import { Link } from 'react-router-dom';

function Sidebarchat({addNewchat,name,id}) {
    const [see, setSeed] = useState("");
    
    useEffect(() => {
      setSeed(Math.floor(Math.random() * 5000));
    }, []);

  const createChat = async() => {
    const roomName = prompt ("please  enter name for the group");
    if (roomName) {
      try {
        await axios.post("http://localhost:5000/group/create",{
             
        groupName: roomName,
      
        });
      } catch (error) {
        console.log(error);

      }
    }
  };

  return !addNewchat ? (
  <Link to={`/rooms/${id}`}>
    <div className='sidebarchat'>
        <Avatar
        src={`https://avatars.dicebear.com/api/personas/${see}.svg`}/>
        <div className="sidebarchatinfo">
          <h2>{name}</h2>
        </div>

    </div></Link>
  ): (
    <div className='sidebarchat' onClick={createChat} >
      <h2>Add New Chat</h2>
    </div>
  )
}

export default Sidebarchat
