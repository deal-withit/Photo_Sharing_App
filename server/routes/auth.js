const express = require('express')
const router = express.Router();
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
require('../db/conn'); 
const User = require("../models/userSchema")
const authenticate = require('../middleware/authenticate')
const Token = require('../models/token'); 
const sendEmail = require('../utils/sendEmail')
const sendEmailForUpdatePassword = require('../utils/sendEmailForUpdatePassword')
const crypto = require('crypto');

router.get('/', (req,res) => {
    res.send("Hello home page");
})

router.get('/contact',(req,res) => {
    res.send("Hello from contact page."); 
})

//Register Route
router.post('/register', async (req,res) => {

    const {name, email, password, cnfpassword} = req.body; 
    if(!name || !email || !password || !cnfpassword){
        return res.status(422).json({Error: " Please fill all the details."})
    }

    try{
        const userExist = await User.findOne({ email: email }); 

        if(userExist){
            return res.status(422).json({error: "Email Already Exist."}); 

        }else if(password != cnfpassword){
            return res.status(422).json({error: "Password does not match."});

        }else{
            const token = jwt.sign({email: email}, process.env.SECRET_KEY);
            const user = new User({ name: name, email:email, password: password, cnfpassword: cnfpassword, confirmationCode:token });
            await user.save(); 

            //const url = `${CLIENT_URL}/activate/${token}`
            res.status(201).json({message: "User Registered Successfully! Please check your mail."});
            
            sendEmail.sendConfirmationEmail(user.name, user.email, user.confirmationCode); 
            //res.redirect("/"); 
        }
    }catch(err){
        console.log(err);
    }
})

router.get('/activateaccount/:token', async (req,res) => {
    
    const {token} = req.params;

    try{
        const validUser = await User.findOne({confirmationCode: token}); 

        const verifyAccount = jwt.verify(token, process.env.SECRET_KEY); 
        //console.log("valid user" , validUser); 
        //console.log("verifyAccount", verifyAccount);
        if(verifyAccount && validUser._id){
            res.status(201).json({message: "Valid User!"}); 
            console.log("valid user"); 
        }else{
            console.log("invalid user")
            return res.status(401).json({error: "User is not Valid!"}); 
            
        } 
        const user = await User.findOne({email:verifyAccount.email})
        //console.log("User is ", user, user.id); 
        const updateUserVerificationStatus = await User.findByIdAndUpdate({_id:user.id}, {verified:true}); 
        //console.log("updated : ", updateUserVerificationStatus);
        updateUserVerificationStatus.save(); 
    }catch(err){
        console.log(err);
        return res.status(401).json({error: "Invalid token!"});
    }
    
})


//Login route
router.post('/login', async(req,res) => {
    
    try{

        const {email, password} = req.body; 

        if(!email || !password){
            return res.status(422).json({error: "Please fill in the details. "}); 
        }

        const userLogin = await User.findOne({email: email}); 
        if(userLogin){
            console.log(userLogin.verified); 
            if (!userLogin.verified) {
                console.log("Not verified")
                return res.status(401).send({
                  message: "Pending Account. Please Verify Your Email!"
                });
            }
            const isMatching = await bcrypt.compare(password, userLogin.password);
            const token = await userLogin.generateAuthToken(); 

            res.cookie("jwtoken", token, {
                expires:new Date(Date.now() + 25892000000),
                httpOnly:true
            })
            if(!isMatching){
                return res.status(400).json({error:"Invalid Credentials"});  
            }else {
                return res.status(200).json({message:"User Signed in Successfully."})
            }   
        }else{
            return res.status(400).json({error: "Invalid Credentials"}); 
        }
    } catch(err) {
        console.log(err);
    }
})

router.get('/about', authenticate, (req, res) => {
    res.send(req.rootUser);
})

router.get("/logout", (req,res)=>{
    res.clearCookie("jwtoken",{path:"/"});
    res.status(200).send('User Logged Out'); 
});


//send email link for updating password. 
router.post('/passwordupdatelink', async(req, res) => {
    console.log("abcde",req.body)
    const {email} = req.body; 

    if(!email) {
        res.status(401).json({message: "Email not found."})
    }

    try{
        const userFind = await User.findOne({email:email})
        
        const token = jwt.sign({_id: userFind._id}, process.env.SECRET_KEY, {
            expiresIn:"120s"
        });

        const setusertoken = await User.findByIdAndUpdate({_id:userFind._id}, {verifytoken:token}, {new:true})

        if(setusertoken){
            sendEmailForUpdatePassword.sendPasswordUpdateEmail(email, userFind, setusertoken); 
            res.status(201).json({message: "Password update link sent to your mail. "})
        }
    }catch(err){
        console.log(err);
    }
})

//Verifying User for Updating Password. 

router.get('/forgotpassword/:id/:token', async(req,res) => {
    const {id, token} = req.params; 

    try{
        const validUser = await User.findOne({_id:id, verifytoken: token})
        
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        if(validUser && verifyToken._id){
            res.status(201).json({message: "Valid User!"}); 
        }else{
            res.status(401).json({error: "User does not Exist"}); 
        }
    }catch (err) {
        res.status(401).json({error: "Error Occurred in getting user."})
    }
})

//change password route
router.post("/:id/:token", async(req,res) => {
    const {id, token} = req.params; 

    const {password} = req.body; 

    try{
        const validUser = await User.findOne({_id:id, verifytoken: token})
        
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        if(validUser && verifyToken._id){
            const newPassword = await bcrypt.hash(password, 12); 

            const setnewuserpass = await User.findByIdAndUpdate({_id:id}, {password:newPassword}, {cnfpassword: newPassword}); 

            setnewuserpass.save(); 
            res.status(201).json({message: "Password Updated !"});
        }else{
            return res.status(401).json({error: "User does not Exist"});
        }
    }catch(err){
        return res.status(401).json({error: "Error"})
    }
})
module.exports = router; 