const mongoose = require("mongoose");

const { Schema } = mongoose;

// const UserModel = () => {

const userSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true },
    email_verified_at: { type: Boolean, default: false },
    kyc_verified_at: { type: Boolean, default: false },
    status: { type: Boolean, default: true },
    registerMethod: { type: String },
    lastLogin: { type: Date },
    role: { type: String, default: "user" },
    mobile: { type: String, default: "" },
    dateOfBirthDay: { type: String, default: "" },
    walletType: { type: String },
    walletAddress: { type: String },
    remember_token: { type: Date },
    updated_at: { type: Date },
    created_at: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
