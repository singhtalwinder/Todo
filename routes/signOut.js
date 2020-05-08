const router = require("express").Router();
const con = require("../public/javascript/config");
const verifyAuthToken = require("../public/javascript/verifyAuthToken");

router.delete("/sign-out", verifyAuthToken, (req, res) => {
	const refreshToken = req.cookies.refreshToken;

	con.query(
		`DELETE FROM refreshToken WHERE refreshToken="${refreshToken}"`,
		(err, result) => {
			if (err) {
				console.log(err);
				return res.status(500).send("A database error has occurred.");
			}
			res.clearCookie("authToken");
			res.clearCookie("refreshToken");
			res.clearCookie("rememberMe");
			res.status(200).send("sign-out");
		}
	);
});

module.exports = router;
