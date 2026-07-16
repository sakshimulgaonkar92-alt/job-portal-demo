const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const Student = require('../model/Student');
const Company = require('../model/Company');
const Experiencedvetern = require('../model/Experiencedvetern');

const JWT_SECRET = 'your_jwt_secret_key';

// Register user based on role
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role, ...profileData } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'Name, email, password, and role are required' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    let profile;
    if (role === 'student') {
      profile = new Student({ user: user._id, ...profileData });
    } else if (role === 'company') {
      profile = new Company({ user: user._id, ...profileData });
    } else if (role === 'experienced') {
      profile = new Experiencedvetern({ user: user._id, ...profileData });
    } else {
      return res.status(400).json({ error: 'Invalid role' });
    }
    await profile.save();

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all users of a role
exports.getUsersByRole = async (req, res) => {
  try {
    const { role } = req.params;
    const users = await User.find({ role });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single user with profile
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    let profile;
    if (user.role === 'student') {
      profile = await Student.findOne({ user: user._id });
    } else if (user.role === 'company') {
      profile = await Company.findOne({ user: user._id });
    } else if (user.role === 'experienced') {
      profile = await Experiencedvetern.findOne({ user: user._id });
    }
    res.json({ user, profile });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    let Model;
    if (user.role === 'student') Model = Student;
    else if (user.role === 'company') Model = Company;
    else if (user.role === 'experienced') Model = Experiencedvetern;
    const profile = await Model.findOneAndUpdate({ user: user._id }, req.body, { new: true });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete user and profile
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (user.role === 'student') await Student.findOneAndDelete({ user: user._id });
    else if (user.role === 'company') await Company.findOneAndDelete({ user: user._id });
    else if (user.role === 'experienced') await Experiencedvetern.findOneAndDelete({ user: user._id });
    await User.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};