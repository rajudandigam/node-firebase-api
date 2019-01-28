const express = require('express');
const app = express();
const signup = require('./routes/signup/signup');
const login = require('./routes/login/login');

app.get('/', (req, res) => {
  res.send('Welcome for api');
});

app.get('/login', (req, res) => {
  login(req, res);
});

app.get('/signup', (req, res) => {
  signup(req, res);
});

const hostName = '127.0.0.1';
const port = 3000;

app.listen(port, () => {
  console.log(`Server running at http://${hostName}:${port}`);
});
