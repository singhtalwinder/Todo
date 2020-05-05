const router = require("express").Router();
const con = require("../public/javascript/config");
const { signupValidation } = require("../public/javascript/validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
	//Validate user information
	const { error } = signupValidation(req.body);
	if (error) return res.status(406).send(error.details[0].message);

	//Checking password and confirm password is same
	if (req.body.password !== req.body.confirmPassword)
		return res
			.status(406)
			.send('"Password" and "Confirm Password" fileds must be same');

	//Hash the password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	//Create user
	const values = [
		[
			req.body.firstName,
			req.body.lastName,
			req.body.email,
			hashedPassword,
			req.body.receiveEmail,
		],
	];

	//Email token
	const emailToken = jwt.sign(
		{
			email: req.body.email,
		},
		process.env.EMAIL_TOKEN_SECRET,
		{ expiresIn: "15m" }
	);

	//Cookie configuration
	const cookieConfig = {
		httpOnly: true,
		secure: false,
		signed: false,
	};

	//Insert user in database
	con.query(
		"INSERT INTO user (firstName, lastName, email, password, receiveEmail) VALUES ?",
		[values],
		(err, result) => {
			if (err) {
				//Email exists
				if (err.errno === 1062)
					return res
						.status(400)
						.send("User with the same email already exists");
				//Other errors
				return res.status(400).send(err);
			}
			res.cookie("emailToken", emailToken, cookieConfig);
			res.status(201).send("User has been created.");
		}
	);
});

module.exports = router;
