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
        if (firebaseUser.role !== "admin") {
          return res
            .status(400)
            .json({ success: false, message: "Sorry you are not admin." });
        } else {
          return next();
        }
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Please login again" });
      }
    })
    .catch((err) => console.log(err));
};
