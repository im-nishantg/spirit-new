import mongoose from "mongoose";
import  jwt  from "jsonwebtoken";

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
    SpiritID:{type:String, default:'SP'+Math.random().toString().substr(2, 6)},//Date.now().toString(36)
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