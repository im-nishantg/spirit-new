// model for client data
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';

const client_schema= new mongoose.Schema({
    name:{type:String, required:true, trim:true},
    lname:{type:String, trim:true},
    gender:{type:String},
    college:{type:String, required:true, trim:true},
    year:{type:String,required:true},
    city:{type:String,trim:true},
    email:{type:String, required:true,trim:true, unique:true},
    phone:{type:Number, min:1000000000, max:9999999999},
    whatsapp:{type:Number, min:1000000000, max:9999999999},
    password:{type:String,required:true, trim:true},
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ],
    join:{type:Date,default:Date.now},
    is_admin:{type:Boolean,default:0},
    referral:{type:String},
    payment_status:{type:String, default:"unpaid"},
   
})

// generation token

client_schema.methods.generateAuthToken= async function(){
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


const client_model=mongoose.model('client_data', client_schema);
export default client_model;