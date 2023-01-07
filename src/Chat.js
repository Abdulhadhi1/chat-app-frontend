import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined,  } from '@mui/icons-material';
import { Avatar, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './Chat.css';
import axios from "axios"
import {useStateValue} from "./StateProvider"
import {useParams} from "react-router-dom"
import Pusher from "pusher-js"




function Chat() {
  const [see, setSeed] = useState("");
  const [input, setInput] = useState("")
  const [roomName, setRoomName] = useState("")
  const [updatedAt, setUpdatedAt] = useState("")
  const [messages, setMessages] = useState([]);
  const [{user}] = useStateValue();
  const {roomId} = useParams(); 

  useEffect(() => {
    if(roomId){
      axios.get(`http://localhost:5000/room/${roomId}`).then((response) =>{
        setRoomName(response.data.name);
        setUpdatedAt(response.data.updatedAt)
        
      });
      axios.get(`http://localhost:5000/messages/${roomId}`).then((responce) => {
        setMessages(responce.data);
      });  
   
    }
  },[roomId]); 
    
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);



  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input) {
      return;
    }
    await axios.post("http://localhost:5000/messages/new", {
      message:input,
      name:user.displayName,
      timestamp:new Date(),
      uid:user.uid,
      roomId:roomId,
    });
    setInput("");
  };
  
  useEffect(() =>{
    const pusher = new Pusher('617b6a7821f5eaee4af4', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function(room) {
      setMessages((prevMessages) => [...prevMessages, room])
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

 
  return (
    <div className='chat'>
      <div className='chatheader'>
      <Avatar 
        src={`https://avatars.dicebear.com/api/personas/${see}.svg`}/>

        <div className="chatheaderinfo">
          <h3>{roomName?roomName:"Welcome to ChatApp"}</h3>
          <p>{updatedAt? `Last Seen at ${new Date(updatedAt).toString().slice(0,25)}` :"click on any group" }</p>
        </div>
        <div className="chatheaderright">
          <IconButton>
            <SearchOutlined style={{color:"#e7e7e7"}}/>
          </IconButton>

          <IconButton>
            <AttachFile style={{color:"#e7e7e7"}}/>
          </IconButton>

          <IconButton>
            <MoreVert style={{color:"#e7e7e7"}}/>
          </IconButton>

       
        </div>
      
      </div>
      <div className="chatbody">
        {
          messages.map((message,index)=>(
            <p className={`chatmessage ${message.uid === user.uid && "chatrecevier"}`} key={index} >
            <span className='chatname'>{message.name}</span>
           {message.message}
            <span className='chattimestamp'>{new Date(message.timestamp).toString().slice(0,25)}</span>
            </p>
          ))
        }
      </div>
  { roomName && <div className="chatfooter">
        <InsertEmoticon />
        <form >
          <input placeholder='Type Message'
          onChange={e=>setInput(e.target.value)}
          value={input}
          />
          <button onClick={sendMessage}>Send Message</button>
        </form>
      </div>}
    </div>
  )
}

export default Chat