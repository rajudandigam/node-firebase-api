const { database: { realtime, firestore } } = require('../../config/config');

const insertUserRealtime = (userRef, data, res) => {
  userRef.set(data, function(err) {
    if(err) {
      res.send(err);
    } else {
      res.json({
        message: `${data.fname} ${data.lname} user created`
      })
    }
  });
};

const insertUserFirestore = (userRef, data, res) => {
  userRef.set(data)
    .then( doc => {
      console.log('Added doc', doc);
      res.json({
        message: `${data.fname} ${data.lname} user created`
      })
    })
    .catch( err => {
      console.log('Setting user error ', err);
      res.json('something went wrong. Please try again later');
    })
};

const signup = (req, res, admin) => {
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

    userRef.once('value', (snapshot) => {
      if(snapshot.exists()) {
        res.json('User Name already exists. Please try different')
      } else {
        insertUserRealtime(userRef, data, res); 
      }
    });
  }

  if(firestore) {
    const db = admin.firestore();
    const userRef = db.collection('users').doc(userName);

    userRef.get()
      .then( doc => {
        if(!doc.exists) {
          insertUserFirestore(userRef, data, res);
        } else {
          console.log('User Name already exists. Please try different');
        }
      })
      .catch( err => {
        console.log('Getting doc error ', err);
        res.json('something went wrong. Please try again later');
      });
  }
};

module.exports = signup;
