const router = require("express").Router();
const jwt = require("jsonwebtoken");
const transporter = require("../public/javascript/transpoter");

const verifyEmailToken = (req, res, next) => {
	const emailToken = req.cookies.emailToken;
	try {
		const verified = jwt.verify(emailToken, process.env.EMAIL_TOKEN_SECRET);
		req.user = verified;
		next();
	} catch (err) {
		return res.status(401).send("Invalid token!");
	}
};

router.get("/send-confirmation-email", verifyEmailToken, async (req, res) => {
	const confirmToken = jwt.sign(
		{
			email: req.user.email,
		},
		process.env.CONFIRM_TOKEN_SECRET,
		{ expiresIn: "15m" }
	);

	const url = `${process.env.server}/api/user/confirm-email/${confirmToken}`;
	const mailOptions = {
		from: process.env.email,
		to: req.user.email,
		subject: "Please verify your email",
		html: `Click this link to verify your email <a href=${url}>${url}</a>`,
	};

	await transporter
		.sendMail(mailOptions)
		.then((response) => {
			console.log(response);
			return res.status(200).send("Confirmation email has been sent");
		})
		.catch((err) => {
			console.log(err);
			return res
				.status(500)
				.send("An error occurred while sending confirmation email");
		});
});

module.exports = router;
