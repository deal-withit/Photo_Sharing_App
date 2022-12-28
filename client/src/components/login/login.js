import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStyles } from './style'
import { Input } from '@mui/material';

function Login() {

    const classes = useStyles(); 
    const navigate = useNavigate();
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");

    const postData = async (e) => {
        e.preventDefault(); 

        const res = await fetch('/login' , {
            method: "POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                email:email, password:password
            })
        })

        const data = await res.json(); 
        if(res.status === 400 || res.status === 422 || res.status===401 || !data){
            console.log("Invalid Credentials!")
            window.alert("Invalid Credentials!"); 
            navigate('/login')
        }else{
            console.log("Signed In Successfully!"); 
            window.alert("Signed In Successfully !"); 
            setEmail(""); 
            setPassword("");
            navigate('/about'); 
        }
    }
    
    return (
        <div className={classes.maindiv}>
            <h2>
                Hello This is the login Page.
            </h2>
            <form method='POST' className={classes.formdiv}>
                <Input className={classes.inputdiv} autoComplete='off' type="text" placeholder='Your Email' name="email" onChange={(e) => {setEmail(e.target.value)}}/>
                <Input className={classes.inputdiv} autoComplete='off' type="text" placeholder='Password' name="password" onChange={(e) => {setPassword(e.target.value)}}/>
                <div className={classes.btndiv} style={{flexDirection:'column'}}>
                <input className={classes.btn} style={{width:'100%', padding:'10px', margin:'5px'}} type="submit" value="Submit" onClick={postData}/>
                <button className={classes.btn} style={{width:'100%', padding:'10px', margin:'5px'}} onClick={() => {navigate('/passwordreset')}}>Forgot Password..?</button>
                </div>
                
            </form>
            <div className={classes.btndiv}>
                <button className={classes.btn2} onClick={() => {navigate('/register')}}>Register</button>
                <button className={classes.btn2} onClick={() => {navigate('/')}}>Home</button>
            </div>
        </div>
    )
}

export default Login