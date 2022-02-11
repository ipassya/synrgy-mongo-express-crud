const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const port = 3000;
dotenv.config({ path: "./config/config.env" });

app.set("view engine", "ejs"); // Template Engine ejs
app.use(express.static("public")); // Static Files
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser()); // for parsing cookies

// Mongodb Connection
const connectDB = require("./models/connection");
connectDB();

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});

const adminRouter = require("./routes/admin");
const studentRouter = require("./routes/student");
const authRouter = require("./routes/auth");
app.use(adminRouter);
app.use(studentRouter);
app.use(authRouter);
