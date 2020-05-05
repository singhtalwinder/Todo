const express = require("express");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

//app.use('/api/user', require('./routes/signin'));
app.use("/api/user", require("./routes/signup"));
//app.use('/api/user', require('./routes/signout'));
app.use("/api/user", require("./routes/sendconfirmation"));
app.use("/api/user", require("./routes/confirm"));

app.listen(PORT, () => console.log(`Running in PORT: ${PORT}`));
