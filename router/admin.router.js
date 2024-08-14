const express = require('express');
const router = express.Router();
const {adminLogin, adminSignup} = require('../src/contollers/auth/admin.auth.controller');
const { authorizeUser } = require('../src/middlewares/setAuthId.middleware');
const { isAdmin } = require('../src/middlewares/isAdmin');
const { adminQRData } = require('../src/contollers/QR handler/qrdata.controller');
const { adminProfile } = require('../src/contollers/Profile.controller');
const { sendNotificationToAllController } = require('../src/contollers/Notification/sendNotificationToAll.constroller');
// const { sendNotificationToAll } = require('../src/service/notificationService.helper');

router.post('/signup', adminSignup);
router.post('/login', adminLogin);
router.get('/qr',authorizeUser,isAdmin, adminQRData);
router.get('/profile', authorizeUser,isAdmin, adminProfile);
router.post('/sendNotificationToAll', authorizeUser,isAdmin,sendNotificationToAllController);

router.all("*",(req,res)=>{
    res.status(404).json({
        status:'failure',
        error:true,
        message:"page not found/ api does'nt exist 😒."
    });
});


module.exports = router;