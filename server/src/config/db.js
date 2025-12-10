const { Pool } = require('pg');
require('dotenv').config(); 

// Cấu hình kết nối từ biến môi trường
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
      
        rejectUnauthorized: false
    }
});

// Kiểm tra kết nối
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Lỗi khi kết nối tới PostgreSQL/Supabase:', err.stack);
    }
    client.query('SELECT NOW()', (err, result) => {
        release();
        if (err) {
            return console.error('Lỗi khi thực hiện query kiểm tra:', err.stack);
        }
        console.log('Kết nối tới Supabase PostgreSQL thành công! Thời gian hiện tại:', result.rows[0].now);
    });
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    pool, // Export pool nếu cần truy cập client trực tiếp
};