const router = require("express").Router();
const con = require("../public/javascript/config");
const { signinValidation } = require("../public/javascript/validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/sign-in", (req, res) => {
	//Validate user information
	const { error } = signinValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	//Authenticate user
	con.query(
		`SELECT *FROM user WHERE email="${req.body.email}"`,
		async (err, result) => {
			if (err) {
				console.log(err);
				return res.status(500).send("A database error has ocurred");
			}

			//No email found
			if (!result.length)
				return res.status(400).send("Wrong E-mail or password.");

			//Not verified users
			if (!result[0].verified)
				return res.status(403).send("You are not verified.");

			//Compare password
			const validPass = await bcrypt.compare(
				req.body.password,
				result[0].password
			);

			//Incorrect password
			if (!validPass) return res.status(400).send("Wrong E-mail or password.");

			//Create auth token
			const authToken = jwt.sign(
				{
					userId: result[0].userId,
				},
				process.env.AUTH_TOKEN_SECRET,
				{ expiresIn: "6s" }
			);

			//Create refresh token
			const refreshToken = jwt.sign(
				{
					userId: result[0].userId,
				},
				process.env.REFRESH_TOKEN_SECRET
			);

			//Push token in database
			con.query(
				`INSERT INTO refreshToken VALUES (${result[0].userId}, "${refreshToken}")`,
				(err, result) => {
					if (err) {
						console.log(err);
						return res.status(500).send("A database error has occurred.");
					}
					//Set cookies
					res.cookie("authToken", authToken, {
						httpOnly: true,
					});

					if (req.body.rememberMe) {
						res.cookie("refreshToken", refreshToken, {
							httpOnly: true,
							maxAge: 1000000000,
						});

						res.cookie("rememberMe", "yes", {
							httpOnly: false,
							maxAge: 1000000000,
						});
					} else {
						res.cookie("refreshToken", refreshToken, {
							httpOnly: true,
						});

						res.cookie("rememberMe", "no", {
							httpOnly: false,
						});
					}

					res.status(200).send("sign-in");
				}
			);
		}
	);
});

module.exports = router;
