const client = require('../../database/schema/enduser.schema');
const setDeviceid = async (req, res) => {

    const {deviceid} = req.body;
    const userId = req.authId;
    // console.log(userId);

    if(!deviceid){
        return res.status(400).json({
            status: 'failure',
            error: true,
            message: 'Please provide all the required fields like deviceid'
        });
    }
    const user = await client.findOneAndUpdate({_id: userId},{
        deviceId: deviceid
    });
    if(!user){
        return res.status(404).json({
            status: 'failure',
            error: true,
            message: 'User not found'
        });
    }
    res.status(200).json({
        status: 'success',
        error: false,
        data:{
            user
        },
        message: 'Device ID updated successfully'
    });
}

module.exports = {
    setDeviceid
}