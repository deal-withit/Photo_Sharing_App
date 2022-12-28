const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cnfpassword:{
        type:String,
        required:true
    },
    verified:{
        type: Boolean, 
        default: false
    },
    confirmationCode: { 
        type: String, 
        unique: true 
    },
    tokens: [
        {
            token:{
                type:String,
                required:true
            }
        }
    ],
    verifytoken:{
        type:String,
    }
})




userSchema.pre('save', async function(next) {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12); 
        this.cnfpassword = await bcrypt.hash(this.cnfpassword,12);
    }
    next();
})

// we are generating token
userSchema.methods.generateAuthToken = async function (){
    try{
        let token = jwt.sign({_id: this._id}, process.env.SECRET_KEY);
        console.log(token)
        this.tokens = this.tokens.concat({token: token}); 
        await this.save(); 
        return token; 
    }catch (err) {
        console.log(err)
    }
}
const User = mongoose.model('USER', userSchema);
module.exports = User; 