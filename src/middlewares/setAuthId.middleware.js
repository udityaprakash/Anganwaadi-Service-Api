const jwt = require('jsonwebtoken');
const authorizeUser =(req, res, next)=>{
    if(req.headers.authorization){
        req.authToken = req.headers.authorization;
        const authToken = req.headers.authorization.split(' ')[1];
        const decoded = verifyJwt(authToken);
        req.data = decoded;
        req.authId = decoded._id;
        req.authUserType = decoded.userType;
        next();
    }else{
        res.status(401).json({
            status:'failure',
            error:true,
            message:'Unauthorized access or missing auth token'
        });
    }
}


const verifyJwt = (authToken)=>{
    return jwt.verify(authToken, process.env.JWT_SECRET);
}

module.exports = {authorizeUser};