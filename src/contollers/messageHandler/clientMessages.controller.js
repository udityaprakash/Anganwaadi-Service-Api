const msgLog = require('../../database/schema/notificationHistory.schema');

const clientMessagesHistory = async (req,res)=>{
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        console.log('adminId: ',req.body.adminId);

        var msgs = await msgLog.find({sendBy:req.body.adminId, 
            $or: [
                { sendTo: { $in: [req.authId] } },
                { sendTo: { $size: 0 } }
            ]
            // sendTo:{ $in: [req.authId] || [] }
        })
        // .populate('sendBy')
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({createdAt:-1});
        if(!msgs){
            return res.status(200).json({
                status:'success',
                error:false,
                message:'No messages found',
                data:[]
            });
        }

        return res.status(200).json({
            status:'success',
            error:false,
            message:`Messages found ${msgs.length}`,
            currentPage: page,
            totalPages: Math.ceil(msgs.length / limit),
            data:msgs
        });

    }catch(err){
        res.status(500).json({
            status:'failure',
            error:true,
            data:err,
            message:'Internal server error'
        })
    }
}

module.exports = {clientMessagesHistory};