import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    maindiv:{
        width:'50%',
        height:'70vh',
        // border:'1px solid black',
        margin:'auto',
        marginTop:'50px',
        padding:'20px',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    },
    leftdiv:{
        // border:'1px solid black',
        height:'100%',
        width:'50%',
        margin:'10px',
        padding:'10px'
    },
    rightdiv:{
        // border:'1px solid black',
        height:'100%',
        width:'50%',
        margin:'10px',
        padding:'10px',
        
    },
    upperdiv:{
        width:'90%',
        height:'50%',
        display:'flex',
        justifyContent:'center'
    },
    imgbox:{
        width:'80%',
        height:'90%',
        borderRadius:'50%',
    },
    lowerdiv:{
        width:'90%',
        height:'50%',
        display:'flex',
        justifyContent:'center'
    },
    btn:{
        height:'20%',
        padding:'15px',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        outline:'none',
        borderRadius:'10px',
        cursor:'pointer',
        fontWeight:'bold',
        fontSize:'0.7rem',
        border:'0.5px solid black',
        margin:'5px',
        "&:hover":{
            backgroundColor:'#D3EAF2',
            color:'#256A7B',
            transition:'0.4s',
        }
    }

})

export {useStyles};