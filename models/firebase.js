const admin = require("firebase-admin");
const serviceAccount = require("./restaurante-82ef5-firebase-adminsdk-n9gv3-087ad84d93.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://restaurante-82ef5-default-rtdb.firebaseio.com"
});

const db = admin.firestore();

module.exports = db;