const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://sakshimulgaonkar92_db_user:ELe4mBZoBIg6JCOg@cluster0.vaojusw.mongodb.net/jobportal?appName=Cluster0');
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;