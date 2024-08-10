const express = require('express');
const router = express.Router();
const {clientLogin, clientSignup} = require('../src/contollers/auth/client.auth.controller');
const {clientQrVerification} = require('../src/contollers/QR handler/qrdata.controller');
const { authorizeUser } = require('../src/middlewares/setAuthId.middleware');
router.post('/signup', clientSignup);
router.post('/login', clientLogin);
router.post('/getRegistered', authorizeUser, clientQrVerification);

router.all("*",(req,res)=>{
    res.status(404).json({
        status:'failure',
        error:true,
        message:"page not found/ api does'nt exist 😒."
    });
});

module.exports = router;