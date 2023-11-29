const mysql = require("mysql2");

const db = mysql.createConnection({
  user: "inventa",
  password: "0",
  database: "Blog",
});

db.connect((err) => {
  if (err) throw err;
  console.log("connect to database");
});

module.exports = db;
