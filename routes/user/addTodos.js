const router = require("express").Router();
const { addTodosValidation } = require("../../public/javascript/validation");
const verifyAuthToken = require("../../public/javascript/verifyAuthToken");
const con = require("../../public/javascript/config");
const timeStamp = require("../../public/javascript/timeStamp");

router.post("/add-todos", verifyAuthToken, (req, res) => {
	req.body.dateTime = timeStamp(new Date(req.body.dateTime));
	const { error } = addTodosValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	con.query(
		`INSERT INTO pendingTodo (userId, description, dateTime) VALUES 
		(${req.user.userId}, "${req.body.description}", "${req.body.dateTime}")`,
		(err, result) => {
			if (err) {
				console.log(err);
				return res.status(500).send("A database error has ocurred");
			}
			res.status(200).send("Added to Pending Todos");
		}
	);
});

module.exports = router;
