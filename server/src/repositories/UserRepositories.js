const prisma = require('../config/db');

class UserRepository {
  /**
   * Tìm User theo Email
   * @param {string} email
   */
  static async findByEmail(email) {
    return await prisma.users.findUnique({
      where: { email: email },
    });
  }

  /**
   * Tìm User theo ID
   * @param {string} id
   */
  static async findById(id) {
    return await prisma.users.findUnique({
      where: { user_id: id },
      include: {
        user_profiles: true 
      }
    });
  }

  /**
   * Tạo User mới + Profile (Transaction)
   * Bắt buộc dùng $transaction khi ghi 2 bảng
   * @param {object} userData - Dữ liệu bảng users
   * @param {object} profileData - Dữ liệu bảng user_profiles
   */
  static async create(userData, profileData) {
    return await prisma.$transaction(async (tx) => {
      // 1. Tạo User
      const newUser = await tx.users.create({
        data: {
          email: userData.email,
          password_hash: userData.password_hash,
          ...(userData.phone_number && { phone_number: userData.phone_number }),
          ...(userData.gender && { gender: userData.gender }),
        },
      });


      await tx.user_profiles.create({
        data: {
          user_id: newUser.user_id,
          first_name: profileData.first_name || '',
          last_name: profileData.last_name || '',
        }
      });

      return newUser;
    });
  }

  /**
   * Cập nhật Refresh Token vào DB
   * @param {string} userId
   * @param {string} token
   */
  static async updateRefreshToken(userId, token) {
    return await prisma.users.update({
      where: { user_id: userId },
      data: { refresh_token: token }, // Giả định DB có field này
    });
  }
}

module.exports = UserRepository;