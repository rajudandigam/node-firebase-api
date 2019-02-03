const login = (req, res, admin) => {
  const db = admin.database();
  const { userName, password } = req.query;

  db.ref(`users/${userName}`).once('value', (snapshot) => {
    if(snapshot.exists()) {
      res.json('Your logged in. Welcome!!!');
    } else {
      res.json('Account doesnt exist');
    }
  });
};

module.exports = login;
