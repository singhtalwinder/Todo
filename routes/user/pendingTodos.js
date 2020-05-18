const router = require("express").Router();
const verifyAuthToken = require("../../public/javascript/verifyAuthToken");
const con = require("../../public/javascript/config");

router.get("/pending-todos", verifyAuthToken, (req, res) => {
	con.query(
		`SELECT *FROM pendingTodo WHERE userId=${req.user.userId}`,
		(err, result) => {
			if (err) return res.status(500).send("A database error has ocurred");
			if (!result.length) return res.status(404).send("No Todo found!");

			res.status(200).send(result);
		}
	);
});

module.exports = router;
