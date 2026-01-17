const UserRepository = require('../repositories/UserRepository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthService {
  /**
   * Đăng ký User
   * @param {string} email
   * @param {string} password
   * @param {string} name 
   */
  static async register(email, password, name) {

    const existingUser = await UserRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('Email đã được sử dụng.');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const nameParts = name ? name.split(' ') : ['User'];
    const lastName = nameParts.pop() || '';
    const firstName = nameParts.join(' ') || name;

    const userData = {
      email,
      password_hash: hashedPassword,
    };
    
    const profileData = {
      first_name: firstName,
      last_name: lastName,
    };


    const newUser = await UserRepository.create(userData, profileData);


    const { password_hash, refresh_token, ...userSafeData } = newUser;
    return userSafeData;
  }

  /**
   * Đăng nhập User
   */
  static async login(email, password) {

    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new Error('Email hoặc mật khẩu không đúng.');
    }


    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      throw new Error('Email hoặc mật khẩu không đúng.');
    }


    const accessToken = jwt.sign(
      { userId: user.user_id, email: user.email },
      process.env.JWT_ACCESS_SECRET || 'access_secret',
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { userId: user.user_id },
      process.env.JWT_REFRESH_SECRET || 'refresh_secret',
      { expiresIn: '7d' }
    );


    await UserRepository.updateRefreshToken(user.user_id, refreshToken);

    return {
      user: { id: user.user_id, email: user.email },
      accessToken,
      refreshToken, 
    };
  }
}

module.exports = AuthService;