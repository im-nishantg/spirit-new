import jwt from "jsonwebtoken";
import ca_model from "../model/ca_details.js";

const authCA = async (req, res, next) => {
    try {
        const token = req.cookies.CA;
        const verifyUser = jwt.verify(token, process.env.JWT_SECREAT_KEY);
        if (!verifyUser) {
            res.send('/ca_login');
        } else {
            const client = await ca_model.findOne({ _id: verifyUser._id });
            req.token = token;
            req.client = client;
        }


        next();
    } catch (error) {
        res.redirect('/ca_login');
        console.log(error);

    }
}

export default authCA;