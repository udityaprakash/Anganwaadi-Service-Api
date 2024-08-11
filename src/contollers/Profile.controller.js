const clientDB = require('../database/schema/enduser.schema');
const adminDB = require('../database/schema/adminuser.schema');
const clientProfile = async (req, res) => {
    try {
        const user = await clientDB.findOne({ _id: req.authId });
        if (!user) {
            return res.status(400).json({ status: 'failure', error: true, message: 'User not found' });
        }
        return res.status(200).json({ status: 'success', error: false, message: 'User found', data: user });
    } catch (error) {
        return res.status(500).json({ status: 'failure', error: true, message:'Something Went Wrong', data:error.message });
    }
}

const adminProfile = async (req, res) => {
    try {
        const user = await adminDB.findOne({ _id: req.authId });
        if (!user) {
            return res.status(400).json({ status: 'failure', error: true, message: 'User not found' });
        }
        return res.status(200).json({ status: 'success', error: false, message: 'User found', data: user });
    } catch (error) {
        return res.status(500).json({ status: 'failure', error: true, message:'Something Went Wrong', data:error.message });
    }
}

module.exports = { clientProfile, adminProfile };