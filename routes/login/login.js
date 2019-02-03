const { database: { realtime, firestore } } = require('../../config/config');

const checkRealtime = (userRef, res) => {

};

const checkFirestore = (userRef, res) => {

};

const login = (req, res, admin) => {
  const { userName, password } = req.query;

  if(realtime) {
    const db = admin.database();

    checkRealtime(db.ref(`users/${userName}`), res);
  }

  if(firestore) {
    const db = admin.firestore();

    checkFirestore(db.collection('users').doc(userName), res);
  }

  db.ref(`users/${userName}`).once('value', (snapshot) => {
    if(snapshot.exists()) {
      if(snapshot.val().password === password) {
        res.json(`Welcome ${userName} Your logged in!!!`);
      } else {
        res.json('Credentials doesnt match');
      }
    } else {
      res.json('Account doesnt exist');
    }
  });
};

module.exports = login;
