import ca_model from "../model/ca_details.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import client_model from "../model/cliend_model.js";
// import ca_model from "../model/ca_details.js";


class creatCA{
    static CA_page=(req,res)=>{
        res.render('ca/campusA' ,{'title':'CA'});
    }
    static CA_Details=async(req,res)=>{
        try{
            const {name,lname,email,phone,gender,college,year,whatsapp,address,code,question}=req.body;
            const hashPassword = await bcrypt.hash(req.body.password, 10);
            const CA= await ca_model.findOne({email:email});
            if (CA) {
                var messages="Email already exist!!";
                res.render('error/greet', { 'title': 'error', messages, state:false});
                // console.log(messages);
                
            }
            else{
                const ca_Doc=new ca_model({
                    name:name,
                    lname:lname,
                    email:email,
                    password:hashPassword,
                    phone:phone,
                    gender:gender,
                    college:college,
                    year:year,
                    whatsapp:whatsapp,
                    address:address,
                    code:code,
                    question:question
                })

                const result= await ca_Doc.save();
                res.redirect('/ca_login');
                
            }
        }catch(err){
            console.log(err.message);
            
        }
    }

    static CA_login=async(req,res)=>{
        try{

            let token;
            const { email, password } = req.body;
            const result = await ca_model.findOne({ email: email });
            if (result != null) {
                const isClient = await bcrypt.compare(password, result.password)
                token = await result.generateAuthToken();
                res.cookie("CA", token, {
                    expiresIn: "5d",
                    httpOnly: true
                })
                if (result.email == email && isClient) {
                    // generate token
                    // const token = jwt.sign({ userID: result._id }, process.env.JWT_SECREAT_KEY, { expiresIn: '5d' });
                    // console.log(token);
    
    
                    // res.send(`hey ${result.name} welcome to spirit family
                    // this is your dashboard.`);
                    res.redirect('/caDashboard');
                
                    // toggle_log();
                }
                else {
                    // var messages="Wrong EmailId or Password";
                    var messages="Wrong email id or password!!";
                    res.render('error/greet', { 'title': 'error|Spirit23', messages, state:false});
    
                }
            }else{
                var messages="No such user exist!!";
                res.render('error/greet', { 'title': 'error|Spirit23', messages, state:false});
            }
        }
        catch(err){
            console.log(err);
            
        }
       

    }
    static caDashboard= async(req,res)=>{
        const token = req.cookies.CA;
        const verifyUser = jwt.verify(token, process.env.JWT_SECREAT_KEY);
        const cadata=await ca_model.findOne({_id:verifyUser._id});
        
        if(!cadata){
            res.send("no ca available");
        }
        const spiritid=cadata.SpiritID;
        const user=await client_model.find({referral:spiritid})
        // console.log(cadata.SpiritID);
        
        res.render('ca/ca_dashboard',{data:user, ID:spiritid});
    }

    static CA_logout= async(req,res)=>{
        try {
            req.client.tokens = req.client.tokens.filter((token) => {
                return token.token != req.token
            })

            res.clearCookie("CA");
            console.log('CA logout successfully');
            res.redirect('/ca_login');



            await req.client.save();
        }
        catch (err) {
            console.log(err);

        }
    }
}

export default creatCA;