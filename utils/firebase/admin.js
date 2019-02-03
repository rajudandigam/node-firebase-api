const admin = require('firebase-admin');
const serviceAccount = require('../../secure_info/nodefirebaseapi-firebase-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://nodefirebaseapi.firebaseio.com'
});

module.exports = admin;
