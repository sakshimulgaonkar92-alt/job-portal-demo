const mongoose = require('mongoose');

const experiencedveternSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  currentCompany: { type: String },
  yearsOfExperience: { type: Number, required: true },
  previousCompanies: [{ type: String }],
  skills: [{ type: String }],
  resume: { type: String }
});

module.exports = mongoose.model('Experiencedvetern', experiencedveternSchema);