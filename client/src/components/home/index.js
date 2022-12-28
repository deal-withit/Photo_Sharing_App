import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useStyles } from './style'
function Home() {

  const navigate = useNavigate(); 
  const classes = useStyles()
  return (
    <div className={classes.mainpage}>
       
        <h2>Welcome to the Photo Sharing App !</h2>
        <div className={classes.maindiv}>
          <h2 className={classes.head}>Login In to connect with People! </h2>
          <div className={classes.btndiv}>
            <button className={classes.btn} onClick={() => {navigate('/about')}}>About Me</button>
            <button className={classes.btn} onClick={() => {navigate('/login')}}>Login</button>
            <button className={classes.btn} onClick={() => {navigate('/register')}}>Register</button> 
          </div>
        </div>  
    </div>
  )
}

export default Home;
