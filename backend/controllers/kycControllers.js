const firebaseAdmin = require("../firebase-admin");
const Users = require("../models/users");
const KYCs = require("../models/kyc");
const UserController = (function () {
  const getKYC = async (req, res) => {
    const { data } = req.body;
    KYCs.findOne({ email: data })
      .then((KYC) => {
        return res.status(200).json({ success: true, data: KYC });
      })
      .catch((error) => {
        return res.status(400).json({ success: false, message: error.message });
      });
  };

  const saveKYC = async (req, res) => {
    const {
      email,
      name,
      apellido,
      birthDay,
      phone,
      country,
      town,
      postal,
      direction,
      nationality,
      UScitizen,
      citizen,
      radio1,
      radio2,
      radio3,
      radio4,
      radio5,
      radio6,
      professionalcustomer,
      Hand,
      Passport,
    } = req.body;

    try {
      KYCs.findOne({ email: email })
        .then((user) => {
          if (user) {
            user.email = email;
            user.name = name;
            user.apellido = apellido;
            user.birthDay = birthDay;
            user.phone = phone;
            user.country = country;
            user.town = town;
            user.postal = postal;
            user.direction = direction;
            user.nationality = nationality;
            user.UScitizen = UScitizen;
            user.citizen = citizen;
            user.radio1 = radio1;
            user.radio2 = radio2;
            user.radio3 = radio3;
            user.radio4 = radio4;
            user.radio5 = radio5;
            user.radio6 = radio6;
            user.professionalcustomer = professionalcustomer;
            user.Hand = `passport`;
            user.Passport = `vectorHand`;
            user
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
            const newKYCs = new KYCs({
              email: email,
              name: name,
              surname: apellido,
              birthday: birthDay,
              phone: phone,
              country: country,
              town: town,
              postal: postal,
              direction: direction,
              nationality: nationality,
              usperson: UScitizen,
              exposedperson: citizen,
              radio1: radio1,
              radio2: radio2,
              radio3: radio3,
              radio4: radio4,
              radio5: radio5,
              radio6: radio6,
              professional_customer: professionalcustomer,
              vectorHand: `vectorHand`,
              passport: `passport`,
            });
            newKYCs
              .save()
              .then(() => {
                return res.status(200).json({ success: true });
              })
              .catch((err) =>
                res.status(400).json({ success: false, err: err })
              );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  };

  const upload = async (req, res) => {
    try {
      if (!req.files) {
        res.send({
          status: false,
          message: "No file uploaded",
        });
      } else {
        //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
        let image = req.files.image;
        let name = req.body.name;
        console.log(name);
        // Use the mv() method to place the file in upload directory(i.e. "uploads")
        image.mv("./uploads/" + name + ".png");

        //send response
        res.send({
          status: true,
          message: "File is uploaded",
          data: {
            name: name + ".png",
            mimetype: image.mimetype,
            size: image.size,
            success: true,
          },
        });
      }
    } catch (err) {
      res.send({
        success: false,
        message: "There is some issue for upload",
      });
    }
  };

  const deleteUser = async (req, res) => {
    const { email } = req.body;
    await firebaseAdmin
      .auth()
      .getUserByEmail(email)
      .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        const { uid } = userRecord;
        firebaseAdmin
          .auth()
          .deleteUser(uid)
          .then(() => {
            Users.findOneAndDelete({ email }).then(() => {
              return res.json({ success: true });
            });
          });
      })
      .catch((error) => {
        return res.status(400).json({ success: false, error });
      });
  };

  return {
    getKYC,
    saveKYC,
    deleteUser,
    upload,
  };
})();
module.exports = UserController;
