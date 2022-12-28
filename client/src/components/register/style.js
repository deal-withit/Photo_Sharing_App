import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
   maindiv:{
     width:'30%',
     height:'90vh',
     display:'flex',
     justifyContent:'center',
     alignItems:'center',
    //  border:'1px solid black',
     flexDirection:'column',
     margin:'auto',
     backgroundImage:`url(https://images.pexels.com/photos/2088172/pexels-photo-2088172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
     backgroundSize:'cover'
   },
   formdiv:{
    width:'80%',
    height:'60vh',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    // border:'1px solid black',
    flexDirection:'column',
    padding:'20px',
    color:'white'
   },
   
   inputdiv:{
    width:'60%',
    padding:'10px',
    outline:'none',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    border:'none',
    borderBottom:'0.5px solid black',
    textAlign:'center',
    margin:'20px',
    background:'transparent',
    color:'white'
   },
   btn:{
        width:'30%',
        padding:'15px',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        outline:'none',
        border:'none',
        borderRadius:'10px',
        cursor:'pointer',
        fontWeight:'bold',
        fontSize:'1rem',
        color:'white',
        border:'0.5px solid white',
        background:'transparent',
        "&:hover":{
            backgroundColor:'#D3EAF2',
            color:'#256A7B',
            transition:'0.4s',
        }
   },
   btndiv:{
    width:'90%',
      display:'flex',
      justifyContent:'space-evenly',
      alignItems:'center',
      flexDirection:'row',
    //   border:'1px solid red',
      margin:'10px'
   },
   btn2:{
    width:'30%',
    padding:'15px',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    outline:'none',
    border:'none',
    borderRadius:'10px',
    cursor:'pointer',
    fontWeight:'bold',
    fontSize:'1rem',
    color:'white',
    background:'transparent',
    border:'0.5px solid white',
    "&:hover":{
        backgroundColor:'#D3EAF2',
        color:'#256A7B',
        transition:'0.4s',
    }
  },
})

export {useStyles}; 