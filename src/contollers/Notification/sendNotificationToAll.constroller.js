const clientDB = require('../../database/schema/enduser.schema'); 
const {sendNotificationToAll} = require('../../service/notificationService.helper');

const sendNotificationToAllController = async (req, res) => {
    try{
        const fetchAllUsers = await clientDB.find({registeredAt: req.authId}).select('deviceId');
        const deviceIds = fetchAllUsers.map(user => user.deviceId);
        console.log(deviceIds);
        const n = await sendNotificationToAll('Hello', deviceIds);
        console.log(n);
        res.status(200).json({
            status: 'success',
            data: n,
            error: false,
            message: 'Notification sent to all users'}
        );

    }catch(err){
        res.status(500).json({
            status: 'failure',
            error: true,
            data: err,
            message: 'Internal server error'
        });
    }
};

module.exports = { sendNotificationToAllController };