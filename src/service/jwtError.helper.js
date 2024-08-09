function jwtError(error) {
  switch (error.name) {
    case 'TokenExpiredError':
      return {
        status: 'failure',
        error: true,
        message: 'Auth token has expired'
    };
    case 'JsonWebTokenError':
      return {
        status: 'failure',
        error: true,
        message: 'Invalid auth token'
    };
    default:
      return {
        status: 'failure',
        error: true,
        message: 'An error occurred while verifying'
    };
  }
}

module.exports = jwtError;

