const express = require('express');
const router = express.Router();
const {adminLogin, adminSignup} = require('../src/contollers/auth/admin.auth.controller');

router.post('/signup', adminSignup);
router.post('/login', adminLogin);

router.all("*",(req,res)=>{
    res.status(404).json({
        status:'failure',
        error:true,
        message:"page not found/ api does'nt exist 😒."
    });
});


module.exports = router;