import dotenv from 'dotenv';
dotenv.config();
import client_model from "../model/cliend_model.js";
import Jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import enrolled_user_model from '../model/enrolled_user.js';





// async..await is not allowed in global scope, must use a wrapper



class home_event {
    static My_home = (req, res) => {
        res.render('pages/home', { 'title': 'Home' });
    }
    static My_gallery = (req, res) => {
        res.render('pages/gallery', { 'title': 'Gallery' })
    }

    static My_login = (req, res) => {
        res.render('registration/login', { 'title': 'login here' })
    }
    static My_registration = (req, res) => {
        res.render('registration/registration', { 'title': 'Registration| Spirit23' })
    }

    static speakers = (req, res) => {
        res.render('pages/speakers', { 'title': 'Speakers | Spirit23' });
    }
    static about = (req, res) => {
        res.render('pages/about', { 'title': 'About us| Spirit23' })
    }
    static sponsors = (req, res) => {
        res.render('pages/sponsors', { 'title': 'Sponsors| Spirit23' });
    }

    static forgetPassword = (req, res) => {
        res.render('registration/forget-password')
    }
    // static My_payment_dashboard=(req,res)=>{
    //     res.render('payments/payment_dashboard',{'title':'Payment| Spirit23'})
    // }

    static forgetPassword_verify = async (req, res) => {
        try {
            const { email } = req.body;
            // make sure user exist with this email
            const result = await client_model.findOne({ email: email });
            if (!result) {
                //res.send('user not registered');
                res.render('registration/forget-password', { messages: 'User not registered' })

                return;
            }
            // res.send(email);
            const secret = process.env.JWT_SECREAT_KEY + result.password;
            const payload = {
                email: result.email,
                id: result._id
            }
            const token = Jwt.sign(payload, secret, { expiresIn: '15m' });
            // link
            const link = `https://www.spiritiitbhu.com/reset-password/${result._id}/${token}`
            // const link = `hii`
            // console.log(link);
            // const testAccount = await nodemailer.createTestAccount();

            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user:process.env.userMail,// generated ethereal user
                    pass: process.env.userPassword// generated ethereal password//hpepzgtpgvscgfql

                },
            });
            const mailOption = {
                from:'sp48840@gmail.com', // sender address
                to: result.email,//result.email, // list of receivers
                subject: "Password reset", // Subject line
                text: `hey ${result.name} this is Team spirit please click the link below to reset your
                password!! Thank you!!`, // plain text body
                html: `
                <h3> Hey <strong style="color:white; background:blue;"> ${result.name} </strong>, this is Team Spirit.</h3>
                <br>
                <h5>We recived a request to reset your password for account.</h5><br>
                <p style="color:blue;"> Click the link below 👇👇 to reset your password!</p><br>
                ${link}
                
                `, // html body
            };

            transporter.sendMail(mailOption, function (error, info) {
                if (error) {
                    console.log(error);

                }//mrwddeyjdyqywkbh
                else {
                    console.log('Mail send successfully!!');

                }
            });


            //res.send('password reset link has been sent to your email')
            res.render('registration/forget-password', { messages: 'Password reset link has been sent to your Email' })


        } catch (error) {
            console.log(error);

        }
    }

    static resetPassword = async (req, res) => {

        const { id, token } = req.params;
        // res.send(req.params);
        // check if this id is real

        const result = await client_model.findOne({ _id: id })
        // res.send(result)

        if (!result) {
            var messages="Not a valid!!";
            res.render('error/greet', { 'title': 'error|Spirit23', messages, state:false});
            return;
        }
        //  id is valid
        const secret = process.env.JWT_SECREAT_KEY + result.password;

        try {
            const paylod = Jwt.verify(token, secret)
            // console.log(paylod);

            // console.log('baba');
        

            res.render('registration/reset-password', { email: result.email });
        } catch (error) {
            console.log(error);

        }
    }

    static savePassword = async (req, res) => {
        const { id, token } = req.params;
        const { password, cpassword } = req.body;

        const result = await client_model.findOne({ _id: id });
        if (!result) {
            res.render('registration/reset-password', { email:"",messages:"Invalid id.." });
            return;
        }

        const secret = process.env.JWT_SECREAT_KEY + result.password;
        try {

            const paylode = Jwt.verify(token, secret);
            console.log('paylod verifyed');

            if (password !== cpassword) {
                res.render('registration/reset-password', { email:result.email,messages:"Both passwords should be same!" });
                return

            }
            const hashPassword = await bcrypt.hash(password, 10);
            // console.log(result.password);

            const data = await client_model.findByIdAndUpdate(id, { password: hashPassword });
            res.render('registration/reset-password', { email:result.email,messages:"Password reset successful!" });
            // console.log(data.password);




        } catch (error) {
            console.log(error);

        }
    }
    // dashboard//

    static client_dashboard=async(req,res)=>{
        const token = req.cookies.spirit;
        const verifyUser = Jwt.verify(token, process.env.JWT_SECREAT_KEY);
        try{
            if(!verifyUser){
                var messages="You are not a registered user!!!"
                res.render('error/greet',{"title":'Dashboard| Spirit23',messages,state:false});
                return;
            }
            const data=await client_model.findOne({_id:verifyUser._id});
            const event_data=await enrolled_user_model.find({email:data.email});
            // console.log(typeof(event_data));
            
            res.render('pages/dashboard',{val:event_data,data:data});
        }catch(err){
            console.log(err.messages);
            
        }
       
    }
}


export default home_event;