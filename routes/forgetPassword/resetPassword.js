const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const con = require("../../public/javascript/config");
const {
	resetPasswordValidation,
} = require("../../public/javascript/validation");

const verifyResetPasswordToken = (req, res, next) => {
	const resetPasswordToken = req.cookies.resetPasswordToken;

	try {
		const verified = jwt.verify(
			resetPasswordToken,
			process.env.RESET_PASSWORD_TOKEN_SECRET
		);
		req.user = verified;
		next();
	} catch (err) {
		return res.status(401).send("Invalid token!");
	}
};

router.post("/reset-password", verifyResetPasswordToken, async (req, res) => {
	//Validate user information
	const { error } = resetPasswordValidation(req.body);
	if (error) return res.status(406).send(error.details[0].message);

	//Checking password and confirm password is same
	if (req.body.password !== req.body.confirmPassword)
		return res
			.status(406)
			.send('"Password" and "Confirm Password" fileds must be same');

	//Hash the password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	con.query(
		`UPDATE user SET password="${hashedPassword}" WHERE email="${req.user.email}"`,
		(err, result) => {
			if (err) {
				console.log(err);
				return res.status(500).send("Database error has occurred.");
			}
			return res.status(202).send("Password has been changed");
		}
	);
});

module.exports = router;
