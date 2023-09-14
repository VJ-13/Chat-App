const User = require('../models/userModel');
const bcrypt = require('bcrypt');

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const usernameCheck = await User.findOne({ username });
        if (usernameCheck) {
            return res.json({ message: 'Username already exists' , status: false});
        }
        const emailCheck = await User.findOne({ email });
        if (emailCheck) {
            return res.json({ message: 'Email already exists', status: false });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashPassword });
        delete user.password;
        return res.json({status: true, user });
        
    } catch (error) {
        next(error);
    }
};

module.exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.json({ message: 'Incorrect username or password' , status: false});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.json({ message: 'Incorrect username or password', status: false });
        }
        delete user.password;
        return res.json({status: true, user });
        
    } catch (error) {
        next(error);
    }
}   


module.exports.setAvatar = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const user = await User.findByIdAndUpdate(userId, { isAvatarImageSet:true, avatarImage: avatarImage }, { new: true });
        if (!user) {
            return res.json({ message: 'User not found', status: false });
        }

        return res.json({isSet: user.isAvatarImageSet, image: user.avatarImage});
    } catch (error) {
        next(error);
    }
}

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const users = await User.find({ _id: { $ne: userId } }).select(["email", "username", "avatarImage", "_id"]);
        if (!users) {
            return res.json({ message: 'No users found', status: false });
        }
        return res.json({ users });
    } catch (error) {
        next(error);
    }
}
