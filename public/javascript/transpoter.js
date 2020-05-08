const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
	service: process.env.emailService,
	auth: {
		user: process.env.email,
		pass: process.env.emailPassword,
	},
	tls: { rejectUnauthorized: false },
});

module.exports = transporter;
