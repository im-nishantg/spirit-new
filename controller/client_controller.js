import client_model from "../model/cliend_model.js";
import bcrypt from 'bcrypt';
import flash from "express-flash";
import jwt from 'jsonwebtoken';

// const toggle_log=async(req,res)=>{
//     const token = req.cookies.spirit;
//     const verifyUser = jwt.verify(token, process.env.JWT_SECREAT_KEY);
//     const clint_detail=await client_model.findOne({_id:verifyUser._id})
//     console.log(token,verifyUser,clint_detail);
    
// }
class data_collector {
    static creat_client = async (req, res) => {
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        try {
            const { name,lname, gender, college, year, city,referral, email, phone,whatsapp } = req.body;
            const client = await client_model.findOne({ email: email });
            if (client) {
                var messages="Email already exist!!";
                res.render('error/greet', { 'title': 'error|Spirit23', messages, state:false});
                console.log(messages);
                
            }
            else {
                const client_doc = new client_model({
                    name: name,
                    lname:lname,
                    gender: gender,
                    college: college,
                    year: year,
                    city: city,
                    referral:referral,
                    email: email,
                    phone: phone,
                    whatsapp:whatsapp,
                    password: hashPassword,

                })
                const result = await client_doc.save();
                // console.log(typeof(result.gender));


                const saved_Client = await client_model.findOne({ email: email });
                // generate JWT token
                // const token = jwt.sign({ userID: saved_Client._id }, process.env.JWT_SECREAT_KEY, { expiresIn: '5d' });
                // console.log(token);



            }
            // req.flash('message','Registration successful')
            res.redirect('/login');
            
            // console.log(result);

        } catch (error) {
            console.log(error);

        }
    }

    // static fatch_client = async (req, res) => {
    //     try {
    //         const result = await client_model.find();
    //         res.render('admin', { 'title': 'Admin Pannel', data: result });
    //     } catch (error) {
    //         console.log(error);

    //     }
    // }

    static client_login = async (req, res) => {
        try {
            let token;
            const { email, password } = req.body;
            const result = await client_model.findOne({ email: email });
            if (result != null) {
                const isClient = await bcrypt.compare(password, result.password)
                token = await result.generateAuthToken();
                res.cookie("spirit", token, {
                    expiresIn: "5d",
                    httpOnly: true
                })
                if (result.email == email && isClient) {
                    // generate token
                    // const token = jwt.sign({ userID: result._id }, process.env.JWT_SECREAT_KEY, { expiresIn: '5d' });
                    // console.log(token);


                    // res.send(`hey ${result.name} welcome to spirit family
                    // this is your dashboard.`);
                    res.redirect('/dashboard');
                    // res.render('events/event', { 'title':`welcome😍 ${result.name}`, messages:`${result.name}`});
                    // toggle_log();
                }
                else {
                    var messages="Wrong EmailId or Password";
                    res.render('error/greet', { 'title': `Login failed ☹️|Spirit23`, messages, state:false });

                }
            }
            else {
                var messages="You are not a registered user!"
                res.render('error/greet', { 'title': `Login failed ☹️|Spirit23`, messages, state:false });
            }
        } catch (err) {
            console.log(err);

        }
    }

    static client_logout = async (req, res) => {
        try {
            req.client.tokens = req.client.tokens.filter((token) => {
                return token.token != req.token
            })

            res.clearCookie("spirit");
            console.log('log out successfully');
            res.redirect('/login');



            await req.client.save();
        }
        catch (err) {
            console.log(err);

        }

    }


    // reset email
    // static sendClientPasswordResetEmail= async(req,res)=>{
    //     try{
    //         const {email}=req.body;
    //         if(email){
    //             const client=await client_model.findOne({email:email})
    //             const secret=client._id + process.env.JWT_SECREAT_KEY;
    //             if(client){
    //                 const token = jwt.sign({ userID: client._id }, secret, { expiresIn: '15m' });
    //                 // console.log(token);
    //             }else{
    //                 res.send("email does not exist")
    //             }
    //         }else{
    //             res.send("email required")
    //         }
    //     }catch(error){
    //         console.log(error);

    //     }
    // }
}

export default data_collector;