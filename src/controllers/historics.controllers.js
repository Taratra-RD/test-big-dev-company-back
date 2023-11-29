const db = require("../databases/database")
module.exports.createHistory = (content) => {
    const historyQuery = "INSERT INTO historic (content) VALUES (?)"

    db.query(historyQuery, content, (err, result) => {
        if (err) {
            console.error(err);
        }
    })
}