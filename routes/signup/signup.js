const { database: { realtime, firestore } } = require('../../config/config');

const insertUserRealtime = async (userRef, data, res) => {
  const err = await userRef.set(data);

  if(err) {
    res.send(err);
  } else {
    res.json({
      message: `${data.fname} ${data.lname} user created`
    });
  }
};

const insertUserFirestore = async (userRef, data, res) => {
  const doc = await userRef.set(data);

  if(doc) {
    res.json({
      message: `${data.fname} ${data.lname} user created`
    });
  } else {
    res.json({
      message: 'something went wrong. Please try again later'
    });
  }
};

const signup = async (req, res, admin) => {
  const { fname, lname, email, password, userName } = req.query;
  const data = {
    fname,
    lname,
    email,
    password,
    userName
  };

  if(realtime) {
    const db = admin.database();
    const userRef = db.ref('users').child(userName);
    const snapshot = await userRef.once('value');

    if(!snapshot) {
      res.json({
        message: 'something went wrong. Please try again later'
      });
    }

    if(snapshot.exists()) {
      res.json({
        message: `${userName} User Name already exists. Please try different`
      });
    } else {
      insertUserRealtime(userRef, data, res); 
    }
  }

  if(firestore) {
    const db = admin.firestore();
    const userRef = db.collection('users').doc(userName);
    const doc = await userRef.get();

    if(!doc) {
      res.json({
        message: 'something went wrong. Please try again later'
      });
    }

    if(doc.exists) {
      res.json({
        message: `${userName} User Name already exists. Please try different`
      });
    } else {
      insertUserFirestore(userRef, data, res);
    }
  }
};

module.exports = signup;
