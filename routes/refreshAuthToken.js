const router = require("express").Router();
const con = require("../public/javascript/config");
const jwt = require("jsonwebtoken");

const verifyRefreshToken = (req, res, next) => {
	const refreshToken = req.cookies.refreshToken;

	try {
		const verified = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
		req.user = verified;
		next();
	} catch (err) {
		return res.status(401).send("Invalid token!");
	}
};

const checkRefereshTokenInDB = (req, res, next) => {
	const refreshToken = req.cookies.refreshToken;

	con.query(
		`SELECT userId FROM refreshToken WHERE refreshToken="${refreshToken}"`,
		(err, result) => {
			if (err) {
				console.log(err);
				return res.status(500).send("A database error has occurred.");
			}
			if (!result.length) {
				return res.status(401).send("Invalid Token");
			}
			next();
		}
	);
};

router.get(
	"/refresh-auth-token",
	verifyRefreshToken,
	checkRefereshTokenInDB,
	(req, res) => {
		const authToken = jwt.sign(
			{
				userId: req.user.userId,
			},
			process.env.AUTH_TOKEN_SECRET,
			{ expiresIn: "1m" }
		);

		const cookieConfig = {
			httpOnly: true,
			secure: false,
			signed: false,
		};

		res.cookie("authToken", authToken, cookieConfig);
		res.status(200).send("Auth token has been refreshed.");
	}
);

module.exports = router;
