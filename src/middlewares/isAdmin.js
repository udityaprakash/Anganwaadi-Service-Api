const isAdmin = (req, res, next)=>{
    if(req.authUserType == 'admin'){
        next();
    }else{
        res.json({
            status:'failure',
            error:true,
            message:'Only Admins allowed here!'
        })
    }
}

module.exports = {isAdmin};