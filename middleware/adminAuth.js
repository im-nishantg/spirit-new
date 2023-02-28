class authAdmin{
    static is_login=async(req,res,next)=>{
        try{
            if(req.session.client_id){
               
            }
            else{res.redirect('/admin')
            }

            next();

        }catch(error){
            console.log(error);
            
        }
    }

    static is_logout= async(req,res,next)=>{
        try{
            if(req.session.client_id){
                res.redirect('/admin/admin_home');
                console.log('i am here');
                
            }
            next();
        }catch(error){
            console.log(error);
            
        }
    }

}

export default authAdmin;