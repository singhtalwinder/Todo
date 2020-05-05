const router = require("express").Router();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const verifyEmailToken = (req, res, next) => {
	const emailToken = req.cookies.emailToken;
	try {
		const verified = jwt.verify(emailToken, process.env.EMAIL_TOKEN_SECRET);
		req.user = verified;
		next();
	} catch (err) {
		return res.status(403).send("Invalid token!");
	}
};

const transporter = nodemailer.createTransport({
	service: process.env.emailService,
	auth: {
		user: process.env.email,
		pass: process.env.emailPassword,
	},
	tls: { rejectUnauthorized: false },
});

router.get("/sendconfirmation", verifyEmailToken, (req, res) => {
	const confirmToken = jwt.sign(
		{
			email: req.user.email,
		},
		process.env.CONFIRM_TOKEN_SECRET,
		{ expiresIn: "15m" }
	);

	const url = `${process.env.server}/api/user/confirm/${confirmToken}`;
	const mailOptions = {
		from: process.env.email,
		to: req.user.email,
		subject: "Please verify your email",
		html: `Click this link to verify your email <a href=${url}>${url}</a>`,
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
			return res.status(500).send("A server error has occurred.");
		} else {
			console.log("Email sent: " + info.response);
			return res.status(200).send("Email has been sent.");
		}
	});
});

module.exports = router;
