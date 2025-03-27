const clientdb = require('../database/schema/enduser.schema');
async function returnAllUser(req, res) {
    try{

        var page = req.query.page || 1;
        var limit = req.query.limit || 10;
    
        var totalcount = await clientdb.find({registeredAt: req.authId}).countDocuments();
        // if (page > totalcount) {
        //     return res.status(404).json({
        //         status: 'failure',
        //         error: true,
        //         message: 'Page not found'
        //     });
        // }
    
        var users =await clientdb.find({registeredAt: req.authId})
        .skip((page - 1) * limit)
        .limit(limit)
        res.status(200).json({
            status: 'success',
            error: false,
            message: 'All users',
            data: users,
            currentpage: parseInt(page),
            totalpages: Math.ceil(totalcount / limit)
        });
    }catch(err){
        res.status(500).json({
            status: 'failure',
            error: true,
            message: 'Internal server error'
        });
    }
}

module.exports = {  returnAllUser };