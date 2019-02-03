const { database: { realtime, firestore } } = require('../../config/config');

const checkRealtime = (userRef, res, password) => {
  userRef.once('value', (snapshot) => {
    if(snapshot.exists()) {
      if(snapshot.val().password === password) {
        res.json(`Welcome ${snapshot.key} Your logged in!!!`);
      } else {
        res.json('Credentials doesnt match');
      }
    } else {
      res.json('Account doesnt exist');
    }
  });
};

const checkFirestore = (userDoc, res, password) => {
  userDoc.get()
    .then( doc => {
      if(!doc.exists) {
        res.json('Account doesnt exist');
      } else {
        if(doc.data().password === password){
          res.json(`Welcome ${doc.id} Your logged in!!!`);
        } else {
          res.json('Credentials doesnt match');
        }
      }
    })
    .catch( err => {
      console.log('Getting user error ', err);
      res.json('something went wrong. Please try again later');
    })
};

const login = (req, res, admin) => {
  const { userName, password } = req.query;

  if(realtime) {
    const db = admin.database();

    checkRealtime(db.ref(`users/${userName}`), res, password);
  }

  if(firestore) {
    const db = admin.firestore();

    checkFirestore(db.collection('users').doc(userName), res, password);
  }
};

module.exports = login;
