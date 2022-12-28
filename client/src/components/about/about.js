import React, { useEffect,useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useStyles } from './style'
import profileImage from '../../uploads/avtar.jpg'
import { Button } from '@mui/material';


function About() {

  const [name, setName] = useState(""); 
  const [email, setEmail] = useState(""); 
  const navigate = useNavigate(); 
  const classes = useStyles();
  const callAboutPage =  async () => {
     try{
        const res = await fetch('/about', {
          method:"GET",
          headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
          },
          credentials:"include"
        }); 

        const data = await res.json();
        setName(data.name); 
        setEmail(data.email);

        if(!res.status === 200){
            const error = new Error(res.error); 
            throw error; 
        }
     }catch(err){
        console.log("ye eror hai", err); 
        navigate('/login'); 
     }
  }
  useEffect(() => {
    callAboutPage(); 

  }, []);

  function logout(){
    navigate('/logout');
  }
  
  return (
    <div className={classes.maindiv}>
        <form method='GET' className={classes.leftdiv}>
            <div><h3>User Name : </h3>{name}</div>
            <div><h3>User Email:</h3> {email}</div>
            <div><h3>College:</h3> NIT Warangal</div>
            <div><h3>Degree:</h3> MCA</div>
            <div><h3>Profession:</h3> Software Developer</div>
            <div>

            </div>
        </form>
        <div className={classes.rightdiv}>
            <div className={classes.upperdiv}>
              <img alt='profile_pic' src={profileImage} className={classes.imgbox}/>
            </div>
            <div className={classes.lowerdiv}>
              <Button className={classes.btn}>Update Profile</Button>
              <Button className={classes.btn} onClick={logout}>Log Out</Button>
            </div>
        </div>
    </div>
  )
}

export default About