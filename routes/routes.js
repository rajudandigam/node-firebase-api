const express = require('express');
const signup = require('./signup/signup');
const login = require('./login/login');
const admin = require('../utils/firebase/admin');
const authenticate = require('./authenticate/authenticate');

const router = express.Router();

router.get('', (req, res) => res.send('Welcome from api'));
router.post('/authenticate', (req, res) => authenticate(req, res));
// router.get('api/login', (req, res) => login(req, res, admin));
router.post('/signup', (req, res) => signup(req, res, admin));

module.exports = router;