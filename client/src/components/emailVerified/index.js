import React, {useState, useEffect} from "react";
import { json, Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import successImage from '../../uploads/download.png'
import { useStyles } from './style'

const AccountConfirmed = () => {
  const navigate = useNavigate();
  const {token} = useParams(); 
  const classes = useStyles(); 
//   useEffect(() => {
//     if(token){
//         const activationEmail = async () => {
//             try {
//                 const res = await fetch('/activate', {
//                     method:"POST",
//                     headers:{
//                         "Content-Type":"application/json"
//                     },
//                     body:JSON.stringify({
//                         token:token
//                     })
//                 })
//                 setSuccess(res.data.msg)
//             } catch (err) {
//                 console.log(err);
//             }
//         }
//         activationEmail()
//     }
// },[token])

  const verifyUser = async() => {
    const res = await fetch(`/activateaccount/${token}`, {
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
    }
  }

  useEffect(() => {
    verifyUser();
  },[])

  return (
    <div className={classes.maindiv}>
      <header className={classes.jumbotron}>
        <h3>
          <strong>Account confirmed!</strong>
        </h3>
      </header>
      <img src={successImage} alt='Success!'/>
      <Link to="/login" className={classes.btn} >
        Please Login
      </Link>
    </div>
  );
};

export default AccountConfirmed;