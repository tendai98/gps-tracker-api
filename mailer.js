const nodemailer = require('nodemailer');
const config = require('./config.json')

let mailer = {}
let mailObject = {}

const createTransporter = (service) => {

	mailer.transporter = nodemailer.createTransport({
		service: service,
		auth: {
			user: config.email ,
			pass: config.password
		}
	});
}


const sendEmail = (subject, data, destination, res) => {

	mailObject.from = config.email
	mailObject.to = destination
	mailObject.subject = subject
	mailObject.html = data

	if(mailer.transporter){
		mailer.transporter.sendMail(mailObject, (error, info) => {
			if(error){
				res.json({resp:'error', errorMessage:"Error has occured:[ADD_USER]"})
			}else{
				res.json({resp:'error', errorMessage:"Success"})
			}
		})
	}else{
		res.json({resp:'error', errorMessage:'Error on executing mail transporter'})
	}
}


module.exports = { 'createTransporter': createTransporter, 'sendMail': sendEmail }
