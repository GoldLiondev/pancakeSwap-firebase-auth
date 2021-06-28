const UserControllers = require("../controllers/userControllers");
const ProfileControllers = require("../controllers/profileControllers");
const passport = require("passport");
const adminRole = require("../config/adminrole");
const authRoutes = (app) => {
  app.post("/login", UserControllers.login);
  app.post("/register", UserControllers.register);
  app.post(
    "/delete",
    passport.authenticate("jwt", { session: false }),
    adminRole,
    UserControllers.deleteUser
  );
  app.post(
    "/update",
    passport.authenticate("jwt", { session: false }),
    adminRole,
    UserControllers.updateUser
  );
  app.get(
    "/getUserList",
    passport.authenticate("jwt", { session: false }),
    adminRole,
    UserControllers.getUserList
  );
  app.get(
    "/getProfile",
    passport.authenticate("jwt", { session: false }),
    adminRole,
    ProfileControllers.getProfile
  );
  app.post(
    "/updateProfile",
    passport.authenticate("jwt", { session: false }),
    ProfileControllers.updateProfile
  );
};
module.exports = authRoutes;
