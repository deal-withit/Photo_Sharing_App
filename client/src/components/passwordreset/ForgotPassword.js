import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'
import { useStyles } from './style';
const ForgotPassword = () => {

    const classes = useStyles();
    const navigate = useNavigate(); 
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState(false); 
    const {id, token} = useParams() 

    const setInputVal = (e) =>{
        setPassword(e.target.value); 
    }

    const verifyUser = async() => {
        const res = await fetch(`/forgotpassword/${id}/${token}`, {
            method:'GET', 
            headers:{
                "Content-Type":"application/json"
            }
        }); 

        const data = await res.json(); 
        if(res.status == 201){
            console.log("User is Valid"); 
        }else{
            console.log("User is not Valid.")
            navigate('/errorpage');
        }
    }


    const changePassword = async (e) => {
        e.preventDefault(); 

        const res = await fetch(`/${id}/${token}`, {
            method:'POST', 
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({password})
        });

        const data = await res.json(); 
        if(res.status == 201){
            setPassword("");  
            setMsg(true); 
        }else{
            window.alert("Token expired, Please generate new link.")
            setMsg(false);
        }

    }

    useEffect(() => {
        verifyUser();
    },[])
    return (
        <div className={classes.maindiv}>
            <h2>Enter your new password</h2>
            {msg ? <p style={{color:'green'}}>Password Changed Successfully !</p>:""}
            <form className={classes.formdiv}>
                <input className={classes.inputdiv} placeholder='Enter New Password.' type="password" name="password" onChange={setInputVal}/>
                <input className={classes.btn} style={{width:'80%', padding:'10px', margin:'5px'}} type="submit" value="Change Password" onClick={changePassword}/>
            </form>
        </div>
    )
}

export default ForgotPassword