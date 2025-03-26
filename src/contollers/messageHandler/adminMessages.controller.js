const msgLog = require('../../database/schema/notificationHistory.schema');

const adminMessagesHistory = async (req,res)=>{
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        // console.log("page: "+page," limit : "+limit);

        var msgs = await msgLog.find({sendBy: req.authId})
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

module.exports = {adminMessagesHistory};