const express = require('express');
const router = express.Router();
const {clientLogin, clientSignup, clientLoginWithOTP} = require('../src/contollers/auth/client.auth.controller');
const {clientQrVerification} = require('../src/contollers/QR handler/qrdata.controller');
const { authorizeUser } = require('../src/middlewares/setAuthId.middleware');
const { clientProfile } = require('../src/contollers/Profile.controller');
const {clientMessagesHistory} = require('../src/contollers/messageHandler/clientMessages.controller');

router.post('/signup', clientSignup);
router.post('/login', clientLogin);
router.post('/loginWithOTP', clientLoginWithOTP);


router.post('/getRegistered', authorizeUser, clientQrVerification);
router.post('/profile', authorizeUser, clientProfile);
router.post('/messageHistory', authorizeUser, clientMessagesHistory);

router.all("*",(req,res)=>{
    res.status(404).json({
        status:'failure',
        error:true,
        message:"page not found/ api does'nt exist 😒."
    });
});

module.exports = router;