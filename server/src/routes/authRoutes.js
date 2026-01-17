const express = require('express');
const authController = require('../controllers/authController');
const catchAsync = require('../utils/catchAsync');
const { registerSchema, loginSchema } = require('../validations/authValidation');
const router = express.Router();

router.post('/register', validate(registerSchema), catchAsync(authController.register));
router.post('/login', validate(loginSchema), catchAsync(authController.login));

module.exports = router;