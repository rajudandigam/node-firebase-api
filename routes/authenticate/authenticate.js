const jwt = require('jsonwebtoken');
const {
  secret,
  userName: userNameKey,
  password: passwordKey
} = require('../../secure_info/credentials');  

const authenticate = (req, res) => {
  const { userName, password } = req.body;

  if(userName === userNameKey && password === passwordKey) {
    const token = jwt.sign({ check: true }, secret, { expiresIn: 3600 });

    res.json({
      token,
      message: 'authentication successful'
    });
  } else {
    res.json({
      message: 'Credentials doesnt match'
    });
  }
};

module.exports = authenticate;