const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const {
    createTokenUser,
    attachCookiesToResponse,
    checkPermissions,
} = require('../utils');

/*
 * Get all users
 */
const getAllUsers = async (req, res) => {
    console.log(req.user);
    const users = await User.find({ role: 'user' }).select('-password');
    res.status(StatusCodes.OK).json({ users });
};

/*
 * Get a single user
 */
const getSingleUser = async (req, res) => {
    const user = await User.findOne({ _id: req.params.id }).select('-password');
    if (!user) {
        throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`);
    }
    checkPermissions(req.user, user._id);
    res.status(StatusCodes.OK).json({ user });
};

/*
 * Show the current user
 */
const showCurrentUser = async (req, res) => {
    res.status(StatusCodes.OK).json({ user: req.user });
};

/*
 * Update user
 */
const updateUser = async (req, res) => {
    const { email, name } = req.body;
    if (!email || !name) {
        throw new CustomError.BadRequestError('Please provide all values');
    }
    const user = await User.findOne({ _id: req.user.userId });

    user.email = email;
    user.name = name;

    await user.save();

    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });
    res.status(StatusCodes.OK).json({ user: tokenUser });
};

/*
 * Update user password
 */
const updateUserPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        throw new CustomError.BadRequestError('Please provide both values');
    }
    const user = await User.findOne({ _id: req.user.userId });

    const isPasswordCorrect = await user.comparePassword(oldPassword);
    if (!isPasswordCorrect) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }
    user.password = newPassword;

    await user.save();
    res.status(StatusCodes.OK).json({ msg: 'Success! Password Updated.' });
};

module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword,
};