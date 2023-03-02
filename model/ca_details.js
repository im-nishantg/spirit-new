import mongoose from "mongoose";
import  jwt  from "jsonwebtoken";
import crypto from 'crypto';

// const n = crypto.randomInt(0, 1000000);
// console.log(n);
// var idca;




const caSchema= new mongoose.Schema({
    name:{type:String, require:true, trim:true},
    lname:{type:String, require:true, trim:true},
    email:{type:String,require:true, trim:true, unique:true},
    phone:{type:Number, min:1000000000, max:9999999999},
    gender:{type:String},
    college:{type:String, require:true},
    year:{type:String},
    whatsapp:{type:Number,require:true,min:1000000000, max:9999999999},
    address:{type:String},
    code:{type:Number},
    password:{type:String,require:true, trim:true},
    question:{type:String, require:true},
    SpiritID:{type:String},//Date.now().toString(36)  //.substr(2, 6)
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ],
    join:{type:Date,default:Date.now()}
})

caSchema.methods.generateAuthToken= async function(){
    try{
        let token=jwt.sign({_id:this._id},process.env.JWT_SECREAT_KEY);
        console.log(token);
        
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(err){
    console.log(err);
    
}
}


const ca_model=mongoose.model('CA_Detail', caSchema);
export default ca_model;