function jwtError(error) {
  switch (error.name) {
    case 'TokenExpiredError':
      return {
        status: 'success',
        error: true,
        data:{
          jwtError:true,
          jwtErrorCode:103,
        },
        message: 'Jwt Token has expired'
    };
    case 'JsonWebTokenError':
      return {
        status: 'success',
        error: true,
        data:{
          jwtError:true,
          jwtErrorCode:107,
        },
        message: 'Invalid Jwt token'
    };
    default:
      return {
        status: 'success',
        error: true,
        data:{
          jwtError:true,
          jwtErrorCode:112,
        },
        message: 'An error occurred while verifying Jwt Token'
    };
  }
}

module.exports = jwtError;

