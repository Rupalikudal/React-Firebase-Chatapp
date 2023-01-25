


import { useEffect, useState, } from 'react';//imported useState from react library
import { getDatabase, onChildAdded, set, push, ref  } from "firebase/database";
import { GoogleAuthProvider, signInWithPopup, getAuth  } from "firebase/auth";
import './App.css';


function App() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const googleLogin = ()=>{signInWithPopup(auth, provider).then((result) =>
    {
    // This gives Google Access Token. 
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user information
    const user = result.user;
    setUser({name:result.user.displayName, email: result.user.email})
    console.log(token, user);
  })

  .catch((error) => {
    const errorCode = error.code;  // Handle Errors here.
    const errorMessage = error.message;
    const email = error.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
  });
  }

  const[user, setUser]=useState("");
  const[chats, setChats]= useState([]);
  const [msg, setMsg]= useState("");
  const db = getDatabase();
  const chatListRef = ref(db, "chats"); //chatlistref is list of chat
  
  const updateHeight=()=>{
    const el = document.getElementById('chat');
    if(el){
      el.scrollTop = el.scrollHeight;
    }
  }

  useEffect(()=>{
    onChildAdded(chatListRef, (data) => {
      setChats(chats=>[...chats,data.val()])
      setTimeout(()=>{
        updateHeight()
      },100)
      
    });
  },[])


  const sendChat =()=>
  {
    const chatRef = push(chatListRef); //chatref is a empty chat to push in chat list ref
    set(chatRef, {
      user,message:msg
    });
    // const c = [...chats];
    // c.push(); //pushing new msg 
    // setChats(c);
    setMsg("");//to made blank input
  };




  return (
    <div>
      {
      user.email?  null: 
      <div className="sizing">
         <button className="vertical-center"
         onClick={e=>{googleLogin()}}>
          Sign In Using Google..
         </button>
        
      </div>
      }

      {
      user.email? <div>
      <h3>User: {user.name}</h3>
      <div id="chat" className="chat-container">
        {
        chats.map((c,i) => (
          <div key={i} className={`container ${c.user.email === user.email ? 'me' : ''}`}>
            <p className="chatbox">
              <strong>{c.user.name}: </strong>
              <span>{c.message}</span>
            </p>
          </div>
        ))
        }
      </div>

      <div className="btm">
        <input
          type="text" onInput={(e) => setMsg(e.target.value)} value={msg}
          placeholder="enter your chat"
          ></input>
        <button 
        onClick={(e) => sendChat()}>Send-Chat</button>
      </div>
      </div> : null
      }
    </div>
  );
}

export default App;
