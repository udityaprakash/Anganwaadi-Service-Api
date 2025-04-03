const tempdb = require('../../database/schema/tempAuth.schema');
const pendingApprovals = async (req, res) => {
    const userId = req.authId;
    // console.log(req.authId, " ", userId);

    try {
        const pendingUsers = await tempdb.find({ registeredAt:userId })
        .sort({ createdAt: -1 });

        res.status(200).json({
            status: 'success',
            error: false,
            data: pendingUsers,
            message: 'Pending approvals retrieved successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'failure',
            error: true,
            data:error,
            message: 'Internal server error'
        });
    }
}

module.exports = {
    pendingApprovals
}