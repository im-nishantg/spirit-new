import client_model from "../model/cliend_model.js";
import data_collector from "./client_controller.js";
import bcrypt from 'bcrypt';
import enrolled_user_model from "../model/enrolled_user.js";
// import jwt from 'jsonwebtoken';





class admin{
static adm_login= async(req,res)=>{
    try{
        res.render('admin/admin_login',{'title':'login admin'});
    }
    catch(error){
        console.log(error);
        
    }
}
static admin_verify=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const result= await client_model.findOne({email:email});
        if(result!=null){
            // const token=result.generateAuthToken();
            const passwordMatch=await bcrypt.compare(password,result.password)
            if(passwordMatch){
                if(result.is_admin===false){
                    res.render('admin/admin_login',{'title':'login admin', messages:'Wrong email id or password🫤'});
                }
                else{
                    req.session.client_id=result._id;
                    res.redirect('/admin');
                    
                }
            }
            else{
                res.render('admin/admin_login',{'title':'login admin', messages:'Wrong email id or password 🫤'});
            }
           
        }
        else{
            res.render('admin/admin_login',{'title':'login admin', messages:'Wrong email id or password 🫤'});
            
        }
    }catch(err){
        console.log(err);
        
    }
        
   
}

static adminHome=async(req,res)=>{
    try{ 
        const all_result= await client_model.find();

        res.render('admin/admin',{data:all_result});
    }catch(error){
        console.log(error);
        
    }
}

static events_reg= async(req,res)=>{
    try{
        const scientific=await enrolled_user_model.find({"event_name":"Scientific"});
        const rhetorica=await enrolled_user_model.find({"event_name":"Rhetorica"});
        const magnacarta=await enrolled_user_model.find({"event_name":"Magna-Carta"});
        res.render('admin/events_reg',{scientific,magnacarta,rhetorica});
        
    }catch(error){
        console.log(error);
        
    }
}


static admin_logout= async(req,res)=>{

    try{
        req.session.destroy();
        res.redirect('/admin')
    } catch(error){
        console.log(error);
        
    }
}



}

export default admin;