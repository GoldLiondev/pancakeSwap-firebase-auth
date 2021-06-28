const Validator = require("validator");
const isEmpty = require("../utils/is-Empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions

  data.username = !isEmpty(data.username) ? data.username : "";
  data.useremail = !isEmpty(data.useremail) ? data.useremail : "";
  data.password = !isEmpty(data.password) ? data.password : "";

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
  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
