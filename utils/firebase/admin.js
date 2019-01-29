const admin = require('firebase-admin');
const serviceAccount = require('../../secure_info/nodefirebaseapi-firebase-adminsdk.json');

const fbAdminApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://nodefirebaseapi.firebaseio.com'
});

console.log('admin name ', fbAdminApp.name);

module.exports = admin;
