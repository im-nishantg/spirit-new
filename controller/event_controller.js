import client_model from "../model/cliend_model.js";
import enrolled_user_model from "../model/enrolled_user.js";
import jwt from "jsonwebtoken";

class event_handler {
  static my_event = (req, res) => {
    res.render("events/event", { title: "Upcoming events!", messages: "" });
    // console.log(req.cookies.spirit);
  };

  static all_events = async (req, res) => {
    const token = req.cookies.spirit;
    const verifyUser = jwt.verify(token, process.env.JWT_SECREAT_KEY);
    if (!verifyUser) {
      res.send("error 404");
    } else {
      const clint_detail = await client_model.findOne({ _id: verifyUser._id });
      console.log(token);

      res.render("events/evenst_registration", { data: clint_detail });
    }
  };

  static enroll_events = async (req, res) => {
    try {
      const token = req.cookies.spirit;
      const verifyUser = jwt.verify(token, process.env.JWT_SECREAT_KEY);
      if (!verifyUser) {
        res.send("error 404");
      } else {
        const { name,email, select1, select2, phone, whatsapp, college, year } =
          req.body;
        // const id = verifyUser._id;
        const email_=await enrolled_user_model.findOne({email:email})
        const event_=await enrolled_user_model.findOne({subevent:select2})

        if(email_ && event_){
          let messages="Great! you are already registered for this event.";
            res.render('error/greet', { 'title': `Events|Spirit23`, messages, state:true });
            return;
        }
        else{
          const user_doc = new enrolled_user_model({
            name:name,
            email: email,
            event_name: select1,
            subevent: select2,
            phone: phone,
            whatsapp: whatsapp,
            college: college,
            year: year,
          });
  
          await user_doc.save();
          res.redirect('/dashboard');
        }

        
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export default event_handler;
