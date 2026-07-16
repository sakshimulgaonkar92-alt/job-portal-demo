const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  college: { type: String },
  degree: { type: String },
  graduationYear: { type: Number },
  skills: [{ type: String }],
  resume: { type: String } // file path or URL
});

module.exports = mongoose.model('Student', studentSchema);