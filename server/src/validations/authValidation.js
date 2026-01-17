const { z } = require("zod");

const registerSchema = z.object({
  email: z.string().email({ message: "Email không hợp lệ" }),
  password: z.string().min(6, { message: "Mật khẩu phải ≥ 6 ký tự" }),
  name: z.string().min(2, { message: "Tên phải ≥ 2 ký tự" })
});

const loginSchema = z.object({
  email: z.string().email({ message: "Email không hợp lệ" }),
  password: z.string().min(6, { message: "Mật khẩu phải ≥ 6 ký tự" })
});

module.exports = {
  registerSchema,
  loginSchema
};
