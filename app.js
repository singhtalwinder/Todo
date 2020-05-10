const express = require("express");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", require("./routes/signIn"));
app.use("/api/user", require("./routes/signUp"));
app.use("/api/user", require("./routes/signOut"));
app.use("/api/user", require("./routes/refreshAuthToken"));
app.use("/api/user", require("./routes/sendConfirmationEmail"));
app.use("/api/user", require("./routes/confirmEmail"));

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

app.listen(PORT, () => console.log(`Running in PORT: ${PORT}`));
