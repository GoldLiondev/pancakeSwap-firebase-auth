const Users = require("../models/users");

const ProfileController = (function () {
  const getProfile = async (req, res) => {
    const { email } = req.user;

    Users.findOne({ email })
      .then((users) => {
        return res.status(200).json({ success: true, data: users });
      })
      .catch((error) => {
        return res.status(400).json({ success: false, message: error.message });
      });
  };
  const updateProfile = async (req, res) => {
    const { userName, mobile, dob } = req.body;
    const { email } = req.user;
    Users.findOne({ email })
      .then((current) => {
        if (current) {
          current.name = userName;
          current.mobile = mobile;
          current.dateOfBirthDay = dob;
          current
            .save()
            .then(() => {
              return res.status(200).json({ success: true });
            })
            .catch((error) => {
              return res.status(400).json({
                success: false,
                message: "There is some issue for update",
              });
            });
        } else {
          return res
            .status(400)
            .json({ success: false, message: "There is no that user" });
        }
      })
      .catch((error) => {
        return res.status(400).json({ success: false, message: error.message });
      });
  };
  return {
    getProfile,
    updateProfile,
  };
})();
module.exports = ProfileController;
