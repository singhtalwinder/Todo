const router = require("express").Router();
const jwt = require("jsonwebtoken");

router.get("/confirm-email/:confirmToken", (req, res) => {
	const confirmToken = req.params.confirmToken;
	try {
		const verified = jwt.verify(confirmToken, process.env.CONFIRM_TOKEN_SECRET);
		const resetPasswordToken = jwt.sign(
			{
				email: verified.email,
			},
			process.env.RESET_PASSWORD_TOKEN_SECRET,
			{ expiresIn: "15m" }
		);
		res.cookie("resetPasswordToken", resetPasswordToken, {
			httpOnly: true,
		});
		return res.redirect(`${process.env.frontend}/reset-password`);
	} catch (err) {
		return res.status(401).send("Invalid token!");
	}
});

module.exports = router;
