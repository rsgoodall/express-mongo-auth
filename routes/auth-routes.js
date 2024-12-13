const express = require('express');
const router = express.Router();

const { authenticateUser } = require('../middleware/authentication');
const { verifyEmail, register, login, logout, forgotPassword, resetPassword } = require('../controllers/auth-controller');

router.post('/register', register);

router.post('/login', login);
router.delete('/logout',authenticateUser, logout);

router.post('/verify-email', verifyEmail);
router.post('/reset-password', resetPassword);
router.post('/forgot-password', forgotPassword);

module.exports = router;