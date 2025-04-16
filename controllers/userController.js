const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const secretKey = "bzo4aAy8hEcHcNi1aBKxpwpIuVhpCKgE";

exports.registerUser = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Only Admin can register users' });
        }

        const { username, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashedPassword, role });
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(500).json({ error: 'Failed to register user' });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id, role: user.role }, secretKey, { expiresIn: '1h' });
        const { id, username: name, role } = user;
        res.json({ message: 'Login successful', token, user: { id, username: name, role } });
    } catch (error) {
        res.status(500).json({ error: 'Failed to login' });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'username', 'role']
        });
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Failed to retrieve users" });
    }
};