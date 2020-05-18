const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const sendReminder = require("./public/javascript/sendReminder");
const deleteNotVerifiedUsers = require("./public/javascript/deleteNotVerifiedUsers");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", require("./routes/signIn/signIn"));
app.use("/api/user", require("./routes/signUp/signUp"));
app.use("/api/user", require("./routes/signOut/signOut"));
app.use("/api/user", require("./routes/signIn/refreshAuthToken"));
app.use("/api/user", require("./routes/signUp/sendConfirmationEmail"));
app.use("/api/user", require("./routes/signUp/confirmEmail"));

app.use("/api/user", require("./routes/user/userInformation"));
app.use("/api/user", require("./routes/user/finishedTodos"));
app.use("/api/user", require("./routes/user/pendingTodos"));
app.use("/api/user", require("./routes/user/addTodos"));

app.use(
	"/api/user/forget-password",
	require("./routes/forgetPassword/sendConfirmationEmail")
);
app.use(
	"/api/user/forget-password",
	require("./routes/forgetPassword/confirmEmail")
);
app.use(
	"/api/user/forget-password",
	require("./routes/forgetPassword/resetPassword")
);

setInterval(sendReminder, 60000);
setInterval(deleteNotVerifiedUsers, 15 * 60000);
app.listen(PORT, () => {
	console.log(`Running at PORT: ${PORT}`);
});
