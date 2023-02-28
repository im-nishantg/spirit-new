import jwt from "jsonwebtoken";
import client_model from "../model/cliend_model.js";

const authUser = async (req, res, next) => {
    try {
        const token = req.cookies.spirit;
        const verifyUser = jwt.verify(token, process.env.JWT_SECREAT_KEY);
        if (!verifyUser) {
            res.send('/login')
        } else {
            const client = await client_model.findOne({ _id: verifyUser._id });
            req.token = token;
            req.client = client;
        }


        next();
    } catch (error) {
        res.redirect('/login');
        console.log(error);

    }
}

export default authUser;