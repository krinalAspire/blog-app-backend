const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

const userSchema=new mongoose.Schema({
    role:{
        type:String
    },
    userid:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    country:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    refreshtoken:{
        type:String,
    },
   verifytoken:{
       type:String
   }
});
//generating tokens
userSchema.methods.generateAuthToken= async function(){
    try{
        const token=jwt.sign({_id:this._id.toString()}, process.env.SECRET_KEY,{expiresIn:"15m"});
        this.tokens=this.tokens.concat({token:token})
        await this.save();
        return token;
    }catch(e){
        res.send(e);
    }
}

//converting password into hash
userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10);
    }
     next();
});

const Register=new mongoose.model("Register",userSchema);

module.exports=Register;