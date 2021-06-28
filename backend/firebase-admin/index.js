const firebaseAdmin = require("firebase-admin");

const serviceAccount = require("../config/serviceAccountKey.json");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

module.exports = firebaseAdmin;
