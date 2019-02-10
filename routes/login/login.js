const { database: { realtime, firestore } } = require('../../config/config');

const checkRealtime = async (userRef, res, password) => {
  const snapshot = await userRef.once('value');

  if(!snapshot) {
    res.json({
      message: 'something went wrong. Please try again later'
    });
  }

  if(snapshot.exists()) {
    if(snapshot.val().password === password) {
      res.json({
        message: `Welcome ${snapshot.key} Your logged in!!!`
      });
    } else {
      res.json({
        message: 'Credentials doesnt match'
      });
    }
  } else {
    res.json({
      message: 'Account doesnt exist'
    });
  }
};

const checkFirestore = async (userDoc, res, password) => {
  const doc = await userDoc.get();

  if(!doc) {
    res.json({
      message: 'something went wrong. Please try again later'
    });
  }

  if(!doc.exists) {
    res.json({
      message: 'Account doesnt exist'
    });
  } else {
    if(doc.data().password === password){
      res.json({
        message: `Welcome ${doc.id}. Your logged in!!!`
      });
    } else {
      res.json({
        message: 'Credentials doesnt match'
      });
    }
  }
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

  else {
    res.json({
      message: "Update the config for data base"
    });
  }
};

module.exports = login;
