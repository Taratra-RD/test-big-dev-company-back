const mysql = require("mysql2")

const db = mysql.createConnection({
    user: "root",
    password: "",
    database: "Blog"
})

db.connect((err) => {
    if (err) throw (err)
    console.log("connect to database")
})

module.exports = db