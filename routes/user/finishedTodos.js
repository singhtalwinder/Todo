const router = require("express").Router();
const verifyAuthToken = require("../../public/javascript/verifyAuthToken");
const con = require("../../public/javascript/config");

router.get("/finished-todos", verifyAuthToken, (req, res) => {
	con.query(
		`SELECT *FROM finishedTodo WHERE userId=${req.user.userId} ORDER BY dateTime ASC`,
		(err, result) => {
			if (err) return res.status(500).send("A database error has ocurred");
			if (!result.length) return res.status(404).send("No Todo found!");

			res.status(200).send(result);
		}
	);
});

module.exports = router;
