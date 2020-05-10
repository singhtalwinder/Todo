const router = require("express").Router();
const jwt = require("jsonwebtoken");
const transporter = require("../../public/javascript/transpoter");
const con = require("../../public/javascript/config");

const checkEmailInDB = (req, res, next) => {
	con.query(
		`SELECT userId, verified FROM user WHERE email="${req.body.email}"`,
		(err, result) => {
			if (err) {
				console.log(err);
				return res.status(500).send("A database error has occured.");
			}

			if (!result.length) {
				return res.status(401).send("No such email exists.");
			}

			if (!result[0].verified) {
				return res.status(403).send("You are not verified.");
			}

			next();
		}
	);
};

router.post("/send-confirmation-email", checkEmailInDB, async (req, res) => {
	const confirmToken = jwt.sign(
		{
			email: req.body.email,
		},
		process.env.CONFIRM_TOKEN_SECRET,
		{ expiresIn: "15m" }
	);

	const url = `${process.env.server}/api/user/forget-password/confirm-email/${confirmToken}`;
	const mailOptions = {
		from: process.env.email,
		to: req.body.email,
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
