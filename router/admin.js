const express = require('express');
const router = express.Router();
const {adminLogin, adminSignup} = require('../src/contollers/auth/admin.auth.controller');

router.post('/signup', adminSignup);
router.post('/login', adminLogin);



module.exports = router;