const clientDB = require('../../database/schema/enduser.schema'); 
const {sendNotificationToAll} = require('../../service/notificationService.helper');
const msgLog = require('../../database/schema/notificationHistory.schema');

const sendNotificationToSelected = async (req, res) => {
    try{
        var msg = req.body.message;
        var userIds = req.body.userIds;
        console.log(userIds);
        if(!userIds || userIds.length === 0){
            return res.status(400).json({
                status: 'failure',
                error: true,
                data: null,
                message: 'userIds are required'
            });
        }
        msg = msg ? msg : 'You have new Notification. Click to View!';
        const newMsg = new msgLog({
            message: msg,
            sendBy: req.authId,
            sendToAll: false,
            sendTo:userIds,
        });
        await newMsg.save();
        const fetchAllUsers = await clientDB.find({_id:{
            $in: userIds
        } ,registeredAt: req.authId,
        deviceId: { $exists: true, $ne: null }}).select('deviceId');
        const deviceIds = fetchAllUsers.map(user => user.deviceId);
        console.log(fetchAllUsers+ " device ids are: "+deviceIds);  
        const n = await sendNotificationToAll(msg, deviceIds);
        console.log(n);
        res.status(200).json({
            status: 'success',
            data: n,
            error: false,
            message: 'Notification sent to all users'}
        );

    }catch(err){
        console.log(err);
        res.status(500).json({
            status: 'failure',
            error: true,
            data: err,
            message: 'Internal server error'
        });
    }
};

module.exports = { sendNotificationToSelected };