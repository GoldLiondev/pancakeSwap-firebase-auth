const firebaseAdmin = require("../firebase-admin");
const Users = require("../models/users");

module.exports = async (req, res, next) => {
  const firebaseUser = await firebaseAdmin
    .auth()
    .verifyIdToken(req.headers.authorization);
  Users.findOne({ email: firebaseUser.email })
    .then((user) => {
      if (user) {
        req.user = user;

        return next();
      }
      return res.status(400).json({ success: false, message: "Please login" });
    })
    .catch((err) => console.log(err));
};
