const mongoose = require("mongoose");

const { Schema } = mongoose;

// const UserModel = () => {

const activitySchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId },
    device: { type: String },
    browser: { type: String },
    ip: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);
