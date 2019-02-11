const express = require('express');
const jwt = require('jsonwebtoken');
const login = require('./login/login');
const admin = require('../utils/firebase/admin');
const { secret } = require('../secure_info/credentials');

const ProtectedRoutes = express.Router();

ProtectedRoutes.use((req, res, next) => {
  const token = req.headers['access-token'];

  if(token) {
    jwt.verify(token, secret, (err, decoded) => {
      if(err) {
        res.json({
          success: false,
          message: 'Failed to authenticate token'
        })
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(403).send({
      message: 'Please provide the token'
    });
  }
});

ProtectedRoutes.get('/login', (req, res) => login(req, res, admin));

module.exports = ProtectedRoutes;