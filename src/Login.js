import React from 'react'
import './Login.css';
import {Button} from "@mui/material"
import {auth, provider,} from "./firebase"
import {signInWithPopup} from "firebase/auth"
import {useStateValue} from "./StateProvider";
import {actionTypes} from "./reducer"

function Login() {

  const [state,dispatch] = useStateValue();
  console.log(state)

    const signIn = () =>{
        signInWithPopup(auth,provider,)
        .then((result) => {
         dispatch ({
          type:actionTypes.SET_USER,
          user: result.user
         })
        })
        .catch((err) =>{

        alert(err.message)
        });

     

    };

  return (
    <div className='Login'>
        <div className="Logincontainer">
            <img src='https://cdn.iconscout.com/icon/free/png-256/chat-bubble-talk-message-communication-comment-10-3297.png'
             alt='logo' />
            <div className="Logintext">
            <h1>Sign In To Chatapp</h1>
            </div>
            <Button onClick={signIn}>sign in google</Button>
            
        </div>
    </div>
  )
}

export default Login;