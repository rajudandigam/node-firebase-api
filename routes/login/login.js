const login = (req, res, admin) => {
  const db = admin.database();
  const { userName, password } = req.query;

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
