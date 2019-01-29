const signup = (req, res, db) => {
  const userRef = db.ref('users');
  const { fname, lname, email } = req.query;

  userRef.push({
    fname,
    lname,
    email
  }, function(err) {
    if(err) {
      res.send(err);
    } else {
      res.json({
        message: `${fname} ${lname} user created`
      })
    }
  });
};

module.exports = signup;
