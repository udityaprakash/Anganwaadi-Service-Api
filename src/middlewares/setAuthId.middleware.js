const jwt = require('jsonwebtoken');
const jwtError = require('../service/jwtError.helper');
const authorizeUser =(req, res, next)=>{
    if(req.headers.authorization){
        try{
            req.authToken = req.headers.authorization;
            const authToken = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
            req.data = decoded;
            req.authId = decoded._id;
            req.authUserType = decoded.userType;
            next();
        } catch (error) {
            res.status(401).json(jwtError(error));
        }
    }else{
        res.status(401).json({
            status:'failure',
            error:true,
            message:'Unauthorized access or missing auth token'
        });
    }
}

module.exports = {authorizeUser};