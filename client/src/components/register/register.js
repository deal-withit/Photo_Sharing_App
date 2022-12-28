import { Input } from '@mui/material';
import React , {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useStyles } from './style'
function Register() {
    
    const classes = useStyles(); 
    const navigate = useNavigate();
    const [name, setName] = useState(""); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const [cnfpassword, setCnfpassword] = useState(""); 
    const [message, setMessage] = useState(false);

    console.log(name + email + password + cnfpassword)

    const postData = async (e) => {
        e.preventDefault(); 

        const res = await fetch('/register',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name:name, email:email,password: password,cnfpassword: cnfpassword
            })
        })

        const data = await res.json();
        if(res.status === 422 || !data){
            window.alert("Registration Fail");
            console.log("Registration Fail"); 
            setName(""); 
            setEmail(""); 
            setPassword(""); 
            setCnfpassword("");
        }else{
            window.alert("Registered Successfully! Check Your Mail to activate your account."); 
            console.log("Registered Successfully!");
            setMessage(true);
            navigate('/login');
        }
    }
    return (
        <div className={classes.maindiv}>
            <h2>Register Here !</h2>
            {message ? <p style={{color:'green'}}>Registered Successfully! Activate link has been sent to your mail.</p>:""}
            <form method='POST' className={classes.formdiv}>
                
                    <Input className={classes.inputdiv} autoComplete="off" placeholder="Your Name" type="text" name="name" onChange={(e) => {setName(e.target.value)}}/>
                
                    <Input className={classes.inputdiv} autoComplete="off" placeholder="Your Email" type="text" name="email" onChange={(e) => {setEmail(e.target.value) }} />
                
                    <Input className={classes.inputdiv} autoComplete="off" placeholder="Password" type="text" name="password" onChange={(e) => {setPassword(e.target.value)}} />

                    <Input className={classes.inputdiv} autoComplete="off" placeholder="Confirm Password" type="text" name="cnfpassword" onChange={(e) => {setCnfpassword(e.target.value)}}/>
                
                
                <input className={classes.btn} style={{width:'80%', padding:'10px', margin:'5px'}} type="submit" value="Submit" onClick={postData}/>
            </form>
            <div  className={classes.btndiv}>
                <button  className={classes.btn2} onClick={() => {navigate('/login')}}>Login</button>
                <button  className={classes.btn2} onClick={() => {navigate('/')}}>Home</button>
            </div>   
        </div>
    )
}

export default Register