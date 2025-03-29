const msgLog = require('../../database/schema/notificationHistory.schema');
const clientdb = require('../../database/schema/enduser.schema');

const clientMessagesHistory = async (req,res)=>{
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        // console.log('here');

        var user =await clientdb.findOne({_id:req.authId}).select('registeredAt');
        // console.log(user);

        const totalMsgs = await msgLog.countDocuments({
            sendBy: user.registeredAt,
            $or: [
                { sendTo: { $in: [req.authId] } },
                { sendTo: { $size: 0 } }
            ]
        });

        var msgs = await msgLog.find({sendBy:user.registeredAt, 
            $or: [
                { sendTo: { $in: [req.authId] } },
                { sendTo: { $size: 0 } }
            ]
            // sendTo:{ $in: [req.authId] || [] }
        })
        // .populate('sendBy')
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
                page:page,
                limit:limit
            });
        }

        return res.status(200).json({
            status:'success',
            error:false,
            message:`Messages found ${totalMsgs}`,
            currentPage: page,
            totalPages: Math.ceil(totalMsgs / limit),
            totalMessages: totalMsgs,
            data:msgs,
            page:page,
            limit:limit
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