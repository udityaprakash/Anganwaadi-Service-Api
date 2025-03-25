var jwt = require('jsonwebtoken');
require('dotenv').config();
function wrapJWT(id){
    return jwt.sign({id: id}, process.env.QR_SECRET, {expiresIn: process.env.QR_EXPIRES_IN});
}

module.exports = {
    wrapJWT
}