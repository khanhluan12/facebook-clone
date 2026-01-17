const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/UserRepository');
const { sendError } = require('../utils/response');


const verifyToken = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return sendError(res, 'Bạn chưa đăng nhập!', 401);
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET || 'access_secret');


    const currentUser = await UserRepository.findById(decoded.userId);
    
    if (!currentUser) {
      return sendError(res, 'User không còn tồn tại.', 401);
    }

    req.user = currentUser;
    next();
    
  } catch (error) {

    return sendError(res, 'Token không hợp lệ hoặc đã hết hạn.', 401);
  }
};

module.exports = { verifyToken };