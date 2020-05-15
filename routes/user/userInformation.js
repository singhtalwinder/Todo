const router = require("express").Router();
const verifyAuthToken = require("../../public/javascript/verifyAuthToken");
const con = require("../../public/javascript/config");

router.get("/user-information", verifyAuthToken, (req, res) => {
	con.query(
		`SELECT *FROM user WHERE userId=${req.user.userId}`,
		(err, result) => {
			if (err) return res.status(500).send("A database error has ocurred");
			if (!result.length) return res.status(404).send("No user found!");

			res.status(200).send({
				firstName: result[0].firstName,
				lastName: result[0].lastName,
				email: result[0].email,
				receiveEmail: result[0].receiveEmail,
			});
		}
	);
});

module.exports = router;
