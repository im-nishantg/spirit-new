import mongoose from "mongoose";

const paymentDetailsSchema = new mongoose.Schema({
	name:{type:String},
	email:{type:String},
	orderId: {
		type: String,
		required: true
	},
	receiptId: {
		type: String
	},
	paymentId: {
		type: String,
	},
	signature: {
		type: String,
	},
	amount: {
		type: Number
	},
	currency: {
		type: String
	},
	join: {type:Date,default:Date.now},
	status: {
		type: String
	}
})

const payment_model = mongoose.model('PaymentDetail', paymentDetailsSchema)
export default payment_model;