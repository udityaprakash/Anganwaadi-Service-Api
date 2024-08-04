const express = require('express');
const router = express.Router();
const {clientLogin, clientSignup} = require('../src/contollers/auth/client.auth.controller');

router.post('/signup', clientSignup);
router.post('/login', clientLogin);



module.exports = router;