const express = require("express");
const app = express();
const userRoute = require("./src/routes/users.routes");

app.use(express.json());

app.use("/api/user", userRoute);

app.listen(3000, () => {
  console.log("Server listen on port 3000");
});
