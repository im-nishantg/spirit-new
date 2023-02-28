import mongoose from "mongoose";

const enrolled_schema=new mongoose.Schema({
    name:{type:String,require:true},
    event_name:{type:String,require:true},
    email:{type:String,require:true},
    phone:{type:Number},
    year:{type:String},
    college:{type:String},
    whatsapp:{type:Number},
    subevent:{type:String}
    
})

const enrolled_user_model=mongoose.model("enrolled_user",enrolled_schema);
export default enrolled_user_model;