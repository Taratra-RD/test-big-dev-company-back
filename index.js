const express = require("express");
const app = express();
const userRoute = require("./src/routes/users.routes");
const postRoute = require("./src/routes/posts.routes");

app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/post", postRoute);

app.listen(3000, () => {
  console.log("Server listen on port 3000");
});
