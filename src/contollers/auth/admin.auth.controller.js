const admin = require('../../database/schema/adminuser.schema');
const jwt = require('jsonwebtoken');
const adminSignup = async (req, res) => {
    const { phoneNumber, mPin, name } = req.body;
    const adminUser = new admin({
        phoneNumber,
        mPin,
        name
    });
    try {
        await adminUser.save();
        res.status(201).json({
            status: 'success',
            error: false,
            message: 'Admin user created successfully'
        });
    } catch (error) {
        res.status(400).json({
            status: 'failure',
            error: true,
            data: error,
            message: 'Admin user creation failed'
        });
    }
}

const adminLogin = async (req, res) => {
    const { phoneNumber, mPin, deviceId } = req.body;
    if(!phoneNumber || !mPin || !deviceId){
        return res.status(400).json({
            status: 'failure',
            error: true,
            message: 'Please provide all the required fields'
        });
    }
    try {
        const adminUser = await admin.findOneAndUpdate({ phoneNumber, mPin },{deviceId},{new:true});
        if (!adminUser) {
            return res.status(404).json({
                status: 'failure',
                error: true,
                message: 'Invalid credentials'
            });
        }
        const authToken = await jwt.sign({ id: adminUser._id }, process.env.JWT_SECRET);
        res.status(200).json({
            status: 'success',
            error: false,
            data:{
                adminUser,
                authToken
            },
            message: 'Admin user logged in successfully'
        });
    }catch(error){
        res.status(400).json({
            status: 'failure',
            error: true,
            data: error,
            message: 'Admin user login failed'
        });
    } 
}

module.exports = {
    adminSignup,
    adminLogin
}