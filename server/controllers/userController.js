// Import required modules
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

// Register controller
module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        // Check if username or email already exists
        const usernameCheck = await User.findOne({ username });
        if (usernameCheck) {
            return res.json({ message: 'Username already exists' , status: false});
        }
        const emailCheck = await User.findOne({ email });
        if (emailCheck) {
            return res.json({ message: 'Email already exists', status: false });
        }

        // Hash password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({ username, email, password: hashPassword });

        // Delete user's password 
        delete user.password;

        return res.json({status: true, user });
        
    } catch (error) {
        next(error);
    }
};

// Login controller
module.exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        // Check if user exists in database
        if (!user) {
            return res.json({ message: 'Incorrect username or password' , status: false});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        // Check if password is valid
        if (!isPasswordValid) {
            return res.json({ message: 'Incorrect username or password', status: false });
        }

        // Delete user's password
        delete user.password;

        return res.json({status: true, user });
        
    } catch (error) {
        next(error);
    }
}   

// Set avatar controller
module.exports.setAvatar = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;

        // Update user's avatar image and return the updated user (new:true)
        const user = await User.findByIdAndUpdate(userId, { isAvatarImageSet:true, avatarImage: avatarImage }, { new: true });

        // Check if user exists in database
        if (!user) {
            return res.json({ message: 'User not found', status: false });
        }

        return res.json({isSet: user.isAvatarImageSet, image: user.avatarImage});
    } catch (error) {
        next(error);
    }
}

// Get all users controller
module.exports.getAllUsers = async (req, res, next) => {
    try {
        const userId = req.params.id;

        // Find all users except the current user and select only the required fields
        const users = await User.find({ _id: { $ne: userId } }).select(["email", "username", "avatarImage", "_id"]);

        // Check if users exist in database
        if (!users) {
            return res.json({ message: 'No users found', status: false });
        }
        
        return res.json({ users });
    } catch (error) {
        next(error);
    }
}
