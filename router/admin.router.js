const express = require('express');
const router = express.Router();
const {adminLogin, adminSignup} = require('../src/contollers/auth/admin.auth.controller');
const { authorizeUser } = require('../src/middlewares/setAuthId.middleware');
const { isAdmin } = require('../src/middlewares/isAdmin');
const { adminQRData } = require('../src/contollers/QR handler/qrdata.controller');

router.post('/signup', adminSignup);
router.post('/login', adminLogin);
router.get('/qr',authorizeUser,isAdmin, adminQRData);

router.all("*",(req,res)=>{
    res.status(404).json({
        status:'failure',
        error:true,
        message:"page not found/ api does'nt exist 😒."
    });
});


module.exports = router;