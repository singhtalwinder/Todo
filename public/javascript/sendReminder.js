const con = require("./config");
const transporter = require("./transpoter");
const { sendReminderValidation } = require("./validation");
const timeStamp = require("./timeStamp");

const sendReminder = () => {
	con.query("SELECT *FROM pendingTodo ORDER BY dateTime ASC", (err, result) => {
		if (err) throw err;
		for (let data of result) {
			const { error } = sendReminderValidation({ dateTime: data.dateTime });
			if (error) {
				con.query(
					`SELECT email FROM user WHERE userId=${data.userId}`,
					(err, result) => {
						if (err) throw err;
						sendMail(result[0].email, data.description);
						moveToFinishedTodos(data.userId, timeStamp(data.reg_date));
					}
				);
			} else {
				break;
			}
		}
	});
};

const sendMail = async (email, description) => {
	const mailOptions = {
		from: process.env.email,
		to: email,
		subject: description,
	};

	await transporter
		.sendMail(mailOptions)
		.then((response) => {
			console.log(response);
		})
		.catch((err) => {
			console.log(err);
		});
};

const moveToFinishedTodos = (userId, reg_date) => {
	con.query(
		`INSERT INTO finishedTodo SELECT *FROM pendingTodo 
	WHERE 
		userId = ${userId} 
		AND reg_date = "${reg_date}"`,
		(err, result) => {
			if (err) throw err;
		}
	);

	con.query(
		`DELETE FROM pendingTodo 
	WHERE
		userId = ${userId} 
		AND reg_date = "${reg_date}"`,
		(err, result) => {
			if (err) throw err;
		}
	);
};

module.exports = sendReminder;
