const router = require("express").Router();
const jwt = require("jsonwebtoken");
const con = require("../public/javascript/config");

router.get("/confirm/:confirmToken", (req, res) => {
	const confirmToken = req.params.confirmToken;
	try {
		const verified = jwt.verify(confirmToken, process.env.CONFIRM_TOKEN_SECRET);
		con.query(
			`UPDATE user SET verified=true WHERE email="${verified.email}"`,
			(err, result) => {
				if (err) {
					console.log(err);
					return res.status(500).send("Database error has occurred.");
				}
				return res.status(202).redirect(`${process.env.frontend}/`);
			}
		);
	} catch (err) {
		return res.status(403).send("Invalid token!");
	}
});

module.exports = router;
