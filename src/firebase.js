import {initializeApp} from "firebase/app";
import {getAuth,  GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {

    apiKey: "AIzaSyBrbJMLVkffHxrCeGZGS3Mpy7gMT95UIPc",
  
    authDomain: "whatsappclone-4f316.firebaseapp.com",
  
    projectId: "whatsappclone-4f316",
  
    storageBucket: "whatsappclone-4f316.appspot.com",
  
    messagingSenderId: "997420464347",
  
    appId: "1:997420464347:web:bea925db1d81233bc6f4fe",
  
    measurementId: "G-927TN23P9J"
  
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  export  {app, auth, provider,}