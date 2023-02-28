import dotenv from 'dotenv';
dotenv.config();
import jwt from "jsonwebtoken";
import client_model from "../model/cliend_model.js";
import alert from "alert";
import api from 'api';


const authPayment = async (req, res, next) => {
    try {
        const token = req.cookies.spirit;
        const verifyUser = jwt.verify(token, process.env.JWT_SECREAT_KEY);
        if (!verifyUser) {
            res.send("please login before payment")
        } else {

            const client = await client_model.findOne({ _id: verifyUser._id });
            const sdk = api('https://townscript-api.readme.io/openapi/630541de9807941f67a9343a');

            sdk.gettingAttendeesData({
                eventCode: process.env.event_code,
                authorization:process.env.townStoken //'sha512-HoEnugi7+IBT0aHFoKaWnl4eMJtHz/rpdbhF+pW635tXoSpP1AWuH5cs6ib80damPQ7lCL4wgynpEnhV4JcRPA==?2q8g'
            })
                .then(({ data }) => {
                   console.log(typeof(data));
                 
                })
                // .catch(err => console.error(err));
            if (client.payment_status == "unpaid") {

               res.redirect('/payments');

            }

        }


        next();
    } catch (error) {
        res.send('err');
        console.log(error);

    }
}

export default authPayment;