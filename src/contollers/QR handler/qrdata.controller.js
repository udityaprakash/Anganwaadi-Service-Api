const jwt = require('jsonwebtoken');
require('dotenv').config;

const adminQRData = async (req, res)=>{
    try{
        const qrJwt = await jwt.sign({
            registererId:req.authId,
            msg:'This is used to generate QR code'
        }, process.env.QR_SECRET, {expiresIn: process.env.QR_EXPIRES_IN});
        res.status(200).json({
            status:'success',
            error:false,
            data:{
                qrData:qrJwt
            },
            message:'QR code generated successfully'
        });
    }catch(err){
        res.status(500).json({
            status:'error',
            error:true,
            data:err,
            message:'Something went wrong'
        });
    }
}

module.exports = {adminQRData};