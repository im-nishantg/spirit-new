// message for bad responses

const message=(req,res,next)=>{
    try{
        res.render('error/comming_soon',{'title':'Spirit2023'});
    }
    catch(err){
        console.log(err);
        
    }
}

export default message;