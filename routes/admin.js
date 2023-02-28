import data_collector from '../controller/client_controller.js';
import express from 'express';
import admin from '../controller/admin_controller.js';
import client_model from '../model/cliend_model.js';
import bodyParser from 'body-parser';
const router = express.Router();
import session from 'express-session';
import authAdmin from '../middleware/adminAuth.js';
// import config from '../config/config'
router.use(session({
    secret: "mysecreatkey",
    resave: true,
    saveUninitialized: true
}));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
// import client_model from '../model/cliend_model.js';


// router.get('/',data_collector.fatch_client);
router.get('/', authAdmin.is_logout, admin.adm_login);
router.post('/', admin.admin_verify)
router.get('/admin_home', authAdmin.is_login, admin.adminHome)
router.get('/admin_home/events', authAdmin.is_login, admin.events_reg)
// router.get('/admin_home',data_collector.fatch_client );
router.get('/logout', authAdmin.is_login, admin.admin_logout);


// temporery router
// router.get('/123', data_collector.fatch_client);
// router.get('*',(req,res)=>{
//     res.redirect('/admin');
// });

export default router;