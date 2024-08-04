const express = require('express');
const router = express.Router();
const {clientLogin, clientSignup} = require('../src/contollers/auth/client.auth.controller');

router.post('/signup', clientSignup);
router.post('/login', clientLogin);

router.all("*",(req,res)=>{
    res.status(404).json({
        status:'failure',
        error:true,
        message:"page not found/ api does'nt exist 😒."
    });
});

module.exports = router;