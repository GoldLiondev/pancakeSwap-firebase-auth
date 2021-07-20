const Validator = require("validator");
const isEmpty = require("../utils/is-Empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions

  data.username = !isEmpty(data.username) ? data.username : "";
  data.useremail = !isEmpty(data.useremail) ? data.useremail : "";

  //Name Checks
  if (Validator.isEmpty(data.username)) {
    errors.username = "Name field is required";
  }
  // Email checks
  if (Validator.isEmpty(data.useremail)) {
    errors.useremail = "Email field is required";
  } else if (!Validator.isEmail(data.useremail)) {
    errors.useremail = "Email is invalid";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
