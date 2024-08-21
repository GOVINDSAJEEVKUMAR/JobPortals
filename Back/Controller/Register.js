const User = require('../Models/UserSchema');
const Employee = require('../Models/EmployeeSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const upload = require('../Middleware/Upload');
const { userVerification, refreshToken, auth } = require("../Middleware/Auth");

// SignUp
const SignUp = async (req, res) => {
    const {
        name, age, dob, email, password, phone, education, stream,
        companyName, designation, years, skills, hobbies, drinkingOrSmoking,
        height, weight, role
    } = req.body;

    // Handle file upload
    const profilePhoto = req.file ? req.file.filename : '';

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create a new user based on the role
        let newUser;
        if (role === 'Employee') {
            newUser = new Employee({
                profilePhoto,
                name,
                age,
                dob,
                email,
                password: hashedPassword,
                phone,
                education,
                stream,
                companyName,
                designation,
                years,
                skills,
                hobbies,
                drinkingOrSmoking,
                height,
                weight,
                role
            });
        } else if (role === 'Job Seeker') {
            newUser = new User({
                profilePhoto,
                name,
                age,
                dob,
                email,
                password: hashedPassword,
                phone,
                education,
                stream,
                skills,
                hobbies,
                drinkingOrSmoking,
                height,
                weight,
                role
            });
        } else {
            return res.status(400).json({ success: false, message: 'Invalid role selected' });
        }

        // Save the user to the database
        await newUser.save();

        // Respond with the newly created user
        res.status(201).json({ success: true, message: 'User details and photo saved successfully!', user: newUser });
    } catch (err) {
        // Handle any errors that occurred during the save process
        res.status(500).json({ success: false, message: 'Error creating user', error: err.message });
    }
};

// Login
const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check in both User and Employee collections
        let user = await User.findOne({ email });
        if (!user) {
            user = await Employee.findOne({ email });
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ success: false, message: "Incorrect password" });
        }

        const accessToken = jwt.sign({ email: email }, "jwt-secret", { expiresIn: "1m" });
        const refreshToken = jwt.sign({ email: email }, "jwt-refresh-secret", { expiresIn: "5m" });

        res.cookie('accessToken', accessToken, { maxAge: 60000, httpOnly: true, secure: true, sameSite: "strict" });
        res.cookie('refreshToken', refreshToken, { maxAge: 300000, httpOnly: true, secure: true, sameSite: "strict" });

        return res.status(200).json({ success: true, message: "Login success", data: { user, token: accessToken } });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};
// Get all users
const Get = async (req, res) => {
    try {
        const users = await User.find();
        const employees = await Employee.find();
        return res.status(200).json([...users, ...employees]);
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
// Get single user by ID
const getUser = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        if (!user) {
            user = await Employee.findById(req.params.id);
            if (!user) return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// Logout
const Logout = (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return res.status(200).json({ success: true, message: "Logged Out" });
};

module.exports = {
    SignUp,
    Get,
    Login,
    getUser,
    Logout
};
