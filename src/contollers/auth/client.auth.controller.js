const client = require('../../database/schema/enduser.schema');
const tempdb = require('../../database/schema/tempAuth.schema');
const jwt = require('jsonwebtoken');
const { verifyqrData } = require('../QR handler/qrdata.controller');

const clientSignup = async (req, res) => {
    const { phoneNumber, name ,deviceId} = req.body;
    if(!phoneNumber || !deviceId || !name){
        return res.status(400).json({
            status: 'failure',
            error: true,
            message: 'Please provide all the required fields'
        });
    }
    const clientUser = new client({
        phoneNumber,
        deviceId,
        name,
        registeredName: name,
    });
    try {
        const existingAdmin = await client.findOne({ phoneNumber });
        if (existingAdmin) {
            return res.status(400).json({
                status: 'failure',
                error: true,
                message: 'Phone number is already registered'
            });
        }
        await clientUser.save();
        const authToken = await jwt.sign({ id: clientUser._id, userType:'client' }, process.env.JWT_SECRET);
        res.status(201).json({
            status: 'success',
            error: false,
            data:{
                clientUser,
                authToken
            },
            message: 'User created successfully'
        });
    } catch (error) {
        res.status(400).json({
            status: 'failure',
            error: true,
            data: error,
            message: 'Client user creation failed'
        });
    }
}

const clientLogin = async (req, res) => {
    const { phoneNumber, deviceId } = req.body;
    if(!phoneNumber || !deviceId){
        return res.status(400).json({
            status: 'failure',
            error: true,
            message: 'Please provide all the required fields'
        });
    }
    try {
        const clientUser = await client.findOneAndUpdate({ phoneNumber },{deviceId},{new:true});
        if (!clientUser) {
            return res.status(404).json({
                status: 'failure',
                error: true,
                message: 'Phone number Invalid'
            });
        }
        const authToken = await jwt.sign({ id: clientUser._id, userType:'client' }, process.env.JWT_SECRET);
        res.status(200).json({
            status: 'success',
            error: false,
            data:{
                clientUser,
                authToken
            },
            message: 'Client user logged in successfully'
        });
    } catch (error) {
        res.status(400).json({
            status: 'failure',
            error: true,
            data: error,
            message: 'Client user login failed'
        });
    }
}

const clientLoginWithOTP = async (req, res) => {
    const {phonenumber} = req.body;
    if(!phonenumber){
        return res.status(400).json({
            status: 'failure',
            error: true,
            message: 'Please provide all the required fields like number'
        });
    }
    try{
        var userexist = await client.findOne({phoneNumber: phonenumber});
        if(!userexist){
            return res.json({
                status: 'failure',
                error: true,
                message: 'Phone number is not registered. Kindly signup first'
            });
        }

        var user = await tempdb.findOne({phoneNumber: phonenumber});
        if(user){
            await tempdb.findOneAndReplace({phoneNumber: phonenumber}, {
                phoneNumber: phonenumber,
                name: userexist.name,
                registeredAt: userexist.registeredAt,
                otp: Math.floor(1000 + Math.random() * 9000),
                isFresh: false
            });          
        }else{

            var clientUser = new tempdb({
                phoneNumber: phonenumber,
                name: userexist.name,
                registeredAt: userexist.registeredAt,
                otp: Math.floor(1000 + Math.random() * 9000),
                isFresh: false
            }); 
    
            await clientUser.save();
        }

        res.status(200).json({
            status: 'success',
            error: false,
            message: 'OTP sent successfully'
        });

        

    }catch(e){
        console.log(e);
        res.status(500).json({
            status: 'failure',
            error: true,
            message: 'Internal server error'
        });
    }
}

const clientSignupWithOTP = async (req, res) => {

    try{

        const {name, phoneNumber, qrdata} = req.body;
        if(!name || !phoneNumber || !qrdata){
            return res.status(400).json({
                status: 'failure',
                error: true,
                message: 'Please provide all the required fields like name, phoneNumber and qrdata'
            });
        }
        var qrres =await verifyqrData(qrdata);
        if(!qrres.success){
            return res.status(400).json({
                status: 'failure',
                error: true,
                message: 'Rescan the QR code',
                data: qrres.error
            });
        }
        const userexist = await client.findOne({phoneNumber: phoneNumber});
        if(userexist){
            return res.status(400).json({
                status: 'failure',
                error: true,
                message: 'Phone number is already registered'
            });
        }
        const user = await tempdb.findOne({phoneNumber: phoneNumber});
        if(user){
            await tempdb.findOneAndReplace({phoneNumber: phoneNumber}, {
                phoneNumber: phoneNumber,
                name: name,
                registeredAt: qrres.data.registererId,
                otp: Math.floor(1000 + Math.random() * 9000),
                isFresh: true
            });          
        }else{
    
            var clientUser = new tempdb({
                phoneNumber: phoneNumber,
                name: name,
                registeredAt: qrres.data.registererId,
                otp: Math.floor(1000 + Math.random() * 9000),
                isFresh: true
            }); 
    
            await clientUser.save();
        }
    
        res.status(200).json({
            status: 'success',
            error: false,
            data:{
                phoneNumber: phoneNumber,
                name: name,
                registeredAt: qrres.data.registererId,
                otp: Math.floor(1000 + Math.random() * 9000),
                isFresh: true
            },
            message: 'OTP sent successfully'
        });
    }catch(e){
        res.status(500).json({
            status: 'failure',
            error: true,
            message: 'Internal server error'
        });
    }

}

const verifyOTP = async (req,res) => {

    const {phoneNumber, otp} = req.body;
    if(!phoneNumber || !otp){
        return res.status(400).json({
            status: 'failure',
            error: true,
            message: 'Please provide all the required fields like phoneNumber and otp'
        });
    }

    const userexist = await tempdb.findOne({phoneNumber: phoneNumber});
    const checkindb = await client.findOne({phoneNumber: phoneNumber});
    if(!userexist){
        if(!checkindb){

            return res.status(400).json({
                status: 'failure',
                error: true,
                message: 'Phone number is not registered. Kindly signup first'
            });

        }else{
            return res.status(400).json({
                status: 'failure',
                error: true,
                message: 'Phone number is already registered kindly login'
            });
        }

    }
    if(userexist.otp !== otp){
        return res.status(400).json({
            status: 'failure',
            error: true,
            message: 'Invalid OTP'
        });
    }
    var clientUser;
    if(userexist.isFresh){
        clientUser = new client({
            phoneNumber: userexist.phoneNumber,
            name: userexist.name,
            registeredName: userexist.name,
            registeredAt: userexist.registeredAt,
        });
        await clientUser.save();
    }

    await tempdb.findOneAndDelete({phoneNumber: phoneNumber});
    const authToken = await jwt.sign({ id: checkindb._id, userType:'client' }, process.env.JWT_SECRET);

    res.status(200).json({
        status: 'success',
        error: false,
        data:{
            clientUser,
            authToken
        },
        message: 'Client user logged in successfully'
    });

}

module.exports = {
    clientSignup,
    clientLogin,
    clientLoginWithOTP,
    clientSignupWithOTP,
    verifyOTP
}