module.exports.checkUserConnected = (req, res, next) => {
  if (req.cookies.access_token) {
    // User is connected, proceed to the next middleware or route handler
    next();
  } else {
    res
      .status(401)
      .json({ valid: false, message: "Unauthorized: User not logged in!" });
  }
};
