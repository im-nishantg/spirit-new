// data base connection
import mongoose from 'mongoose'

const Connect_data= async (data_url)=>{
    try{
            mongoose.connect(data_url)
            // console.log('connected successfully');
            
    }catch(err){
        console.log(err.messages);
        
    }
}

export default Connect_data