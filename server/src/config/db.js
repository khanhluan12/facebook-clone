import "dotenv/config";
import { PrismaClient } from '@prisma/client'; // ✅ Dùng Named Import

// ✅ Khởi tạo trực tiếp, không dùng .default
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function checkConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Kết nối tới Supabase PostgreSQL thành công!');
  } catch (error) {
    console.error('❌ Lỗi kết nối Prisma:', error);
    process.exit(1);
  }
}

checkConnection();

export default prisma;