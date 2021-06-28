const firebaseClient = require("firebase");

const firebaseConfig = require("../config/firebaseConfig.json");

firebaseClient.initializeApp(firebaseConfig);

module.exports = firebaseClient;
