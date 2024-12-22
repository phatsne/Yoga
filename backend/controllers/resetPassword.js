const User = require('../models/user');
const mailSender = require('../utils/mailSender');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

// ================ resetPasswordToken ================
exports.resetPasswordToken = async (req, res) => {
    try {
        // extract email 
        const { email } = req.body;

        // email validation
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Your Email is not registered with us'
            });
        }

        // generate token
        const token = crypto.randomBytes(20).toString("hex");

        // update user by adding token & token expire date
        const updatedUser = await User.findOneAndUpdate(
            { email: email },
            { token: token, resetPasswordTokenExpires: Date.now() + 5 * 60 * 1000 },
            { new: true }); // by marking true, it will return updated user


        // create url
        const url = `https://study-notion-mern-stack.netlify.app/update-password/${token}`;

        // send email containing url
        await mailSender(email, 'Password Reset Link', `Password Reset Link : ${url}`);

        // return succes response
        res.status(200).json({
            success: true,
            message: 'Email sent successfully , Please check your mail box and change password'
        })
    }

    catch (error) {
        console.log('Error while creating token for reset password');
        console.log(error)
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Error while creating token for reset password'
        })
    }
}



// ================ resetPassword ================
exports.resetPassword = async (req, res) => {
    try {
        // extract data
        const token = req.body?.token || req.cookies?.token || req.header('Authorization')?.replace('Bearer ', '');
        const { password, confirmPassword } = req.body;

        // validation
        if (!token || !password || !confirmPassword) {
            return res.status(401).json({
                success: false,
                message: "All fields are required!"
            });
        }

        // validate both passwords
        if (password !== confirmPassword) {
            return res.status(401).json({
                success: false,
                message: 'Passwords are not matched'
            });
        }

        // find user by token from DB
        const userDetails = await User.findOne({ token: token });
        
        // Check if user exists
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: 'Invalid reset token or user not found'
            });
        }

        // check token expiration
        if (userDetails.resetPasswordTokenExpires <= Date.now()) {
            return res.status(401).json({
                success: false,
                message: 'Token is expired, please regenerate token'
            });
        }

        // hash new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // update user with New Password and clear token
        await User.findOneAndUpdate(
            { token },
            { 
                password: hashedPassword,
                token: null,  // Clear the token after use
                resetPasswordTokenExpires: null
            },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: 'Password reset successfully'
        });
    }
    catch (error) {
        console.error('Error while resetting password:', error);
        return res.status(500).json({
            success: false,
            message: 'Error while resetting password',
            error: error.message
        });
    }
}