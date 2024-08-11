const jwt = require('jsonwebtoken');
const clientDB = require('../../database/schema/enduser.schema');
const adminDB = require('../../database/schema/adminuser.schema');
const jwtError = require('../../service/jwtError.helper');
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

const clientQrVerification = async (req, res)=>{
    try{
        const qrData = req.body.qrData;
        try{
            var qrJwt = await jwt.verify(qrData, process.env.QR_SECRET);
        }catch(err){
            res.status(400).json(jwtError(err));
            return;
        }
        const adminData = await adminDB.findById(qrJwt.registererId).select('name phoneNumber blocked');
        if(!adminData){
            res.status(404).json({
                status:'failure',
                error:true,
                message:'Invalid QR Code'
            });
            return;
        }
        if(adminData.blocked){
            res.status(403).json({
                status:'failure',
                error:true,
                message:'You cannot get Registered Here'
            });
            return;
        }
        const clientData = await clientDB.findByIdAndUpdate(req.authId,{
            registeredAt:qrJwt.registererId,
        });
        if(!clientData){
            res.status(404).json({
                status:'failure',
                error:true,
                message:'Client not found in Database'
            });
            return;
        }
        res.status(200).json({
            status:'success',
            error:false,
            data:{
                message:'You have been successfully registered',
                registererInfo:adminData
            },
            message:`QR code verified successfully and registered at admin ${adminData.name}`
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

module.exports = {adminQRData, clientQrVerification};