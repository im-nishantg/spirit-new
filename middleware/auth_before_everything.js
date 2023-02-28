import jwt from "jsonwebtoken";
import client_model from "../model/cliend_model.js";

const auth_before = async (req, res, next) => {
    try {
        const token = req.cookies.spirit;
        const verifyUser = jwt.verify(token, process.env.JWT_SECREAT_KEY);
        if(verifyUser){
            res.redirect('/mydb');
        }


        next();
    } catch (error) {
        res.redirect('/login');
        console.log(error);

    }
}

export default auth_before;