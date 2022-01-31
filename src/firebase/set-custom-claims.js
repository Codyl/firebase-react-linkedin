
var admin = require("firebase-admin");

var serviceAccount = require("./react-grid-contacts-firebase-adminsdk-j9swc-1f5640522b.json");

var uid = process.argv[2];

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://react-grid-contacts-default-rtdb.firebaseio.com"
});

admin.auth().setCustomUserClaims(uid, { admin: true})
.then(() => {
    console.log(`Custom claims set for user ${uid}`);
    process.exit();
})
.catch(error => {
  console.log('error');
  process.exit(1)
});