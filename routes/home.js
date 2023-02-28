import express from 'express';
import home_event from '../controller/home_controller.js';
import data_collector from '../controller/client_controller.js';
import authUser from '../middleware/authUser.js';
import creatCA from '../controller/CA_controller.js';
import message from '../middleware/registration_mdw.js';
import authCA from '../middleware/auth_CA.js';
import auth_before from '../middleware/auth_before_everything.js';
const router=express.Router();

router.get('/',home_event.My_home);
router.get('/home',home_event.My_home);
router.get('/gallery',home_event.My_gallery);
router.get('/speakers',home_event.speakers);
router.get('/sponsors',home_event.sponsors);
router.get('/about',home_event.about);
router.get('/workshop',message);
router.get('/developer team',home_event.My_gallery);
// router.get('/events',home_event.My_gallery);
router.get('/login',home_event.My_login);
router.post('/login',data_collector.client_login);

router.get('/logout',authUser, data_collector.client_logout);
router.get('/registration', home_event.My_registration); // 👈 message (middleware)
router.post('/registration',data_collector.creat_client);
// router.get('/login',home_event.My_login);
// router.get('/registration',home_event.My_registration);

// forgot password
router.get('/forgetpassword',home_event.forgetPassword);
router.post('/forgetpassword',home_event.forgetPassword_verify);

// reset password
router.get('/reset-password/:id/:token',home_event.resetPassword);
router.post('/reset-password/:id/:token',home_event.savePassword);

//payment dashboard
// router.get('/payment_dashboard',home_event.My_payment_dashboard);

// payment getway integration
// router.get('/payments',(req,res)=>{
//     res.render('razorpay');
// })

// user dashboard//

router.get('/dashboard',authUser,home_event.client_dashboard);

// router.post('create/orderId',home_event.creatOrer)
// router.post('api/payment/verify',home_event.verifyOrder)

// route for CA
router.get('/ca',creatCA.CA_page);
router.post('/ca',creatCA.CA_Details);

router.get('/ca_login',(req,res)=>{
    res.render('ca/ca_login',{'title':'Campus Ambessador'})
})
router.post('/ca_login',creatCA.CA_login);
router.get('/ca_logout',authCA,creatCA.CA_logout)

router.get('/caDashboard',authCA,creatCA.caDashboard);

export default router;