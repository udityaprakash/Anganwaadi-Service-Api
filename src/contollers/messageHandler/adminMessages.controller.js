const msgLog = require('../../database/schema/notificationHistory.schema');

const adminMessagesHistory = async (req,res)=>{
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        
        var totalMessages =await msgLog.countDocuments({sendBy: req.authId});
        // console.log("page: "+page," limit : "+limit, " totalMessages: "+totalMessages);

        var msgs = await msgLog.find({sendBy: req.authId})
        .sort({createdAt:-1})
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();
        if(!msgs){
            return res.status(200).json({
                status:'success',
                error:false,
                message:'No messages found',
                data:[],
                limit:limit,
                page:page
            });
        }

        return res.status(200).json({
            status:'success',
            error:false,
            message:`Messages found ${totalMessages}`,
            currentPage: page,
            totalPages: Math.ceil(totalMessages / limit),
            totalMessages: totalMessages,
            data:msgs,
            limit:limit,
            page:page
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