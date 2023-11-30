const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

const userRoute = require("./src/routes/users.routes");
const postRoute = require("./src/routes/posts.routes");
const commentRoute = require("./src/routes/comments.routes");
const likeRoute = require("./src/routes/likes.routes");
const historicRoute = require("./src/routes/historics.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "PATCH"],
    credentials: true,
  })
);

app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/comment", commentRoute);
app.use("/api/like", likeRoute);
app.use("/api/historic", historicRoute);

app.listen(5000, () => {
  console.log("Server listen on port 5000");
});
