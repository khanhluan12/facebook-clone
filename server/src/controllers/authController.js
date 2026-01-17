const authService = require('../services/authService');
const { sendSuccess } = require('../utils/response');



const register = catchAsync(async (req, res) => {
  const { email, password, name } = req.body;

  const data = await authService.register(email, password, name);
  return sendSuccess(res, 'Đăng ký thành công', data, 201);
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const data = await authService.login(email, password);
  return sendSuccess(res, 'Đăng nhập thành công', data);
});

module.exports = {
  register,
  login,
};