const express = require('express');
const router = express.Router();
const {adminLogin, adminSignup} = require('../src/contollers/auth/admin.auth.controller');
const { authorizeUser } = require('../src/middlewares/setAuthId.middleware');
const { isAdmin } = require('../src/middlewares/isAdmin');
const { adminQRData } = require('../src/contollers/QR handler/qrdata.controller');
const { adminProfile } = require('../src/contollers/Profile.controller');
const { sendNotificationToAllController } = require('../src/contollers/Notification/sendNotificationToAll.constroller');
const { adminMessagesHistory } = require('../src/contollers/messageHandler/adminMessages.controller');
const { returnAllUser } = require('../src/contollers/registeredUser.controller');
// const { sendNotificationToAll } = require('../src/service/notificationService.helper');
const { pendingApprovals } = require('../src/contollers/auth/pendingApprovals.controller');

router.post('/signup', adminSignup);
router.post('/login', adminLogin);
router.post('/qr',authorizeUser,isAdmin, adminQRData);
router.post('/profile', authorizeUser,isAdmin, adminProfile);
router.post('/sendNotificationToAll', authorizeUser,isAdmin,sendNotificationToAllController);
router.post('/messageHistory', authorizeUser,isAdmin,adminMessagesHistory);
router.post('/allpeople', authorizeUser,isAdmin,returnAllUser);
router.post('/pendingapprovals', authorizeUser,isAdmin, pendingApprovals);

router.all("*",(req,res)=>{
    res.status(404).json({
        status:'failure',
        error:true,
        message:"page not found/ api does'nt exist 😒."
    });
});


module.exports = router;