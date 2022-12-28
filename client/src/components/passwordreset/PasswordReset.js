import React,{useState} from 'react'
import { useStyles } from './style';

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState(false);
  const classes = useStyles(); 
  const setInputVal = (e) =>{
    setEmail(e.target.value); 
  }
  const sendLink = async (e) => {
    e.preventDefault(); 
  
    const res = await fetch("/passwordupdatelink", {
      method:'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({email})
    }); 

    const data = await res.json(); 
    if(res.status == 201){
      setEmail(""); 
      setMsg(true); 
    }
  }

  return (
    <div className={classes.maindiv}>
      {msg ? <p style={{color:'green', fontWeight:'bold'}}>Password reset link sent  Successfully to your Email.</p>:""}
      <form className={classes.formdiv}>
        <input className={classes.inputdiv} placeholder='Enter Your Email' type="text" name="email" onChange={setInputVal}/>
       <input className={classes.btn} style={{width:'80%', padding:'10px', margin:'5px'}} type="submit" value="Submit" onClick={sendLink}/>
      </form>
    </div>
  )
}

export default PasswordReset