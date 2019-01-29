const express = require('express');
const app = express();
const signup = require('./routes/signup/signup');
const login = require('./routes/login/login');
const admin = require('./utils/firebase/admin');
const db = admin.database();

app.get('/', (req, res) => {
  res.send('Welcome for api');
});

app.get('/login', (req, res) => {
  login(req, res, db);
});

app.get('/signup', (req, res) => {
  signup(req, res, db);
});

const hostName = '127.0.0.1';
const port = 3000;

app.listen(port, () => {
  console.log(`Server running at http://${hostName}:${port}`);
});
