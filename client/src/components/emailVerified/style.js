import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    maindiv:{
        width:'95%',
        height:'90vh',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
    },
    jumbotron:{
        margin:'10px'
    },
    btn:{
        margin:'10px',
        padding:'10px',
        height:'20px',
        width:'120px',
        backgroundColor:'green',
        color:'white',
        fontWeight:'bold',
        textDecoration:'none',
        display:'flex',
        alignItems:"center",
        justifyContent:'center',
        borderRadius:'10px',
        border:'none',
        outline:'none',
        "&:hover":{
            backgroundColor:'white',
            color:'green', 
            transition:'0.5s',
            border:'0.5px solid green'
        }
    }
})

export {useStyles};