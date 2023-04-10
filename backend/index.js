const express = require("express");

const cors = require("cors");
const { connection } = require("./config/db");
const { UserController } = require("./routes/user.route");
const { UseranalyticsController } = require("./routes/useranalytics.route");
const { PostController } = require("./routes/post.route");

require("dotenv").config();

const app = express();

app.use(cors());

app.use(express.json());

const PORT = 8080 || process.env.PORT;

app.use("/users", UserController);
app.use("/posts", PostController);
app.use("/analytics", UseranalyticsController);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("connection established");
    console.log("listening on port", PORT);
  } catch (err) {
    console.log("something went wrong");
    console.log(err);
  }
});
