const UserControllers = require("../controllers/userControllers");
const ProfileControllers = require("../controllers/profileControllers");
const KYCControllers = require("../controllers/kycControllers");
const adminRole = require("../config/adminrole");
const authmiddle = require("../config/authmiddle");
const authRoutes = (app) => {
  app.post("/login", UserControllers.login);
  app.post("/register", UserControllers.register);
  app.post("/delete", adminRole, UserControllers.deleteUser);
  app.post("/update", adminRole, UserControllers.updateUser);
  app.get("/getUserList", adminRole, UserControllers.getUserList);
  app.get("/getProfile", authmiddle, ProfileControllers.getProfile);
  app.post("/updateProfile", authmiddle, ProfileControllers.updateProfile);
  app.post("/saveKYC", KYCControllers.saveKYC);
  app.post("/upload", KYCControllers.upload);
  app.post("/getKYC", KYCControllers.getKYC);
};
module.exports = authRoutes;
