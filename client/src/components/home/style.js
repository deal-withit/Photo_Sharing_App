import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    mainpage:{
        width:'100%',
        height:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column'
    },
    maindiv:{
        width:'40%',
        height:'30vh',
        padding:'10px',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px'
    },
    head:{
        color:'blue',
    },
    btndiv:{
        width:'90%',
        height:'80%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row-reverse'
    },
    btn:{
        width:'40%',
        height:'20%',
        padding:'20px',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        margin:'20px',
        outline:'none',
        border:'none',
        borderRadius:'10px',
        cursor:'pointer',
        fontWeight:'bold',
        "&:hover":{
            backgroundColor:'cyan',
            border:'1px solid #008B8B',
            transition:'0.9s',
        }
    },
    

})

export {useStyles}; 