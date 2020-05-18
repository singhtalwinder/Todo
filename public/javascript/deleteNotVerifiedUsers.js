const con = require("./config");
const { deleteNotVerifiedUserValidation } = require("./validation");

const deleteNotVerifiedUsers = () => {
	con.query(
		`SELECT userId, reg_date FROM user WHERE verified=${false} ORDER BY reg_date ASC`,
		(err, result) => {
			if (err) throw err;
			for (let data of result) {
				const { error } = deleteNotVerifiedUserValidation({
					reg_date: data.reg_date,
				});

				if (error) break;
				con.query(
					`DELETE FROM user WHERE userId=${data.userId}`,
					(err, result) => {
						if (err) throw err;
					}
				);
			}
		}
	);
};

module.exports = deleteNotVerifiedUsers;
