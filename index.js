const express = require("express");
const app = express();
const userRoute = require("./src/routes/users.routes");
const postRoute = require("./src/routes/posts.routes");
const commentRoute = require("./src/routes/comments.routes");
const likeRoute = require("./src/routes/likes.routes");
const historicRoute = require("./src/routes/historics.routes");

app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/comment", commentRoute);
app.use("/api/like", likeRoute);
app.use("/api/historic", historicRoute);

app.listen(3000, () => {
  console.log("Server listen on port 3000");
});
