const { createJWT, isTokenValid, attachCookiesToResponse } = require('./jwt');
const createTokenUser = require('./create-token-user');
const checkPermissions = require('./check-permissions');
const createHash = require('./create-hash');
const sendVerificationEmail = require('./send-verification-email');
const sendResetPasswordEmail = require('./send-reset-password-email');

module.exports = {
    createJWT,
    isTokenValid,
    attachCookiesToResponse,
    createTokenUser,
    checkPermissions,
    createHash,
    sendVerificationEmail,
    sendResetPasswordEmail,
}