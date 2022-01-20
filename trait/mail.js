const nodemailer = require('nodemailer');

class mail {
	
	async sand(to,subject,html){
		try {
			let testAccount = await nodemailer.createTestAccount();
			let transporter = nodemailer.createTransport({
				host: process.env.MAIL_HOST,
				port: process.env.MAIL_PORT,
				secure: false, // true for 465, false for other ports
				auth: {
				  user: process.env.mail_username, // generated ethereal user
				  pass: process.env.MAIL_PASSWORD, // generated ethereal password
				},
			});
			let info = await transporter.sendMail({
				from: process.env.mail_username, // sender address
				to: to, // list of receivers
				subject: subject, // Subject line
				text: html, // plain text body
				html: html, // html body
			});
			return true;
		} catch (err) {
			return true;
		}
	}
	
}


module.exports = new mail();