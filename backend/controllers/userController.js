const User = require('../models/userModel');
const { hashPassword, comparePassword, generateToken } = require('../middlewares/auth');

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const {
            fullName,
            email,
            password,
            profileImage,
            homeLocation,
        } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await hashPassword(password);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            profileImage: profileImage || "https://www.w3schools.com/w3images/avatar2.png",
            homeLocation: homeLocation || null,
        });

        await newUser.save();

        const token = generateToken(newUser);
        res.status(201).json({ token, userId: newUser._id });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Login an existing user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const passwordMatch = await comparePassword(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user);
        res.status(200).json({ token, userId: user._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};