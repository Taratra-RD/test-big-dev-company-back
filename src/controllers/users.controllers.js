const db = require("../databases/database");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**{
        "username":"user3",
        "password":"0000"
    } */

module.exports.signInUser = async (req, res, next) => {
  console.log(req.body);
  const { username, password } = req.body;

  try {
    const userQuery = "SELECT * FROM users WHERE username = ?";
    db.query(userQuery, username, async (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
      }

      if (result.length === 0) {
        return res.status(402).json({ message: "User doesn't exist!" });
      }

      const dbPassword = result[0].password;

      const pwdMatch = await bcrypt.compare(password, dbPassword);

      if (!pwdMatch) {
        return res
          .status(400)
          .json({ message: "Authentification failed incorrect password" });
      }

      const user = result[0];

      const accessToken = jwt.sign(user, "No secret", { expiresIn: "30s" });
      const refreshToken = jwt.sign(user, "No secret", { expiresIn: "1h" });

      res.cookie("access_token", accessToken, {
        secure: false,
        httpOnly: false,
      });
      res.cookie("token", refreshToken, { secure: false, httpOnly: false });

      res.status(200).json({
        Login: true,
        message: "Login successfully!",
        token: refreshToken,
      });
    });
  } catch (error) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.signUpUser = async (req, res, next) => {
  const { username, password } = req.body;
  const saltRounds = parseInt(10);
  sql = "INSERT INTO users SET ?";

  bcrypt.genSalt(saltRounds, (saltError, salt) => {
    if (saltError) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    bcrypt.hash(password, salt, (hashError, hashedPwd) => {
      if (hashError) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
      }

      const postUser = {
        username,
        password: hashedPwd,
      };

      db.query(sql, postUser, (insertError, result) => {
        if (insertError) {
          console.error(err);
          return res.status(500).json({ message: "Internal Server Error" });
        }

        res.status(201).json({ message: "User added successfully!" });
      });
    });
  });
};
