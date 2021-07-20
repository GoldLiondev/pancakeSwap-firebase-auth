const mongoose = require("mongoose");

const { Schema } = mongoose;

// const KYCModel = () => {

const kycSchema = new Schema(
    {
        email: { type: String },
        name: { type: String },
        surname: { type: String },
        birthday: { type: String },
        phone: { type: String },
        country: { type: String },
        town: { type: String },
        postal: { type: String },
        direction: { type: String },
        nationality: { type: String },
        usperson: { type: String },
        exposedperson: { type: String },
        radio1: { type: String },
        radio2: { type: String },
        radio3: { type: String },
        radio4: { type: String },
        radio5: { type: String },
        radio6: { type: String },
        professional_customer: { type: Boolean, default: false },
        passport: { type: String },
        vectorHand: { type: String },
        updated_at: { type: Date },
        created_at: { type: Date },
    },
    { timestamps: true }
);

module.exports = mongoose.model("KYCs", kycSchema);
