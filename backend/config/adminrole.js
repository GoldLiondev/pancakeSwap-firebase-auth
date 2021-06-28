module.exports = (req, res, next) => {
  if (req.user.role == "admin") {
    return next();
  }
  return res
    .status(400)
    .json({ success: false, message: "Sorry you are not admin" });
};
