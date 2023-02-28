import express from 'express';
import event_handler from '../controller/event_controller.js';
import authUser from '../middleware/authUser.js';
import authPayment from '../middleware/authPayment.js';
const router=express.Router();
// 
router.get('/',event_handler.my_event);
router.get('/register_event',authUser,authPayment,event_handler.all_events);
router.post('/register_event',event_handler.enroll_events);
export default router;
// 