const express = require("express");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/api/user/login", require("./routes/login"));

app.listen(PORT, () => console.log(`Running in PORT: ${PORT}`));
