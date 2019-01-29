const login = (req, res, db) => {
  const userRef = db.ref('users');

  userRef.once('value', function(snapshot, prevChildKey) {
    res.json(snapshot.val());
  })
};

module.exports = login;
