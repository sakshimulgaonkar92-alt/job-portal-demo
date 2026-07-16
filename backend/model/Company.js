const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  companyName: { type: String, required: true },
  industry: { type: String },
  website: { type: String },
  location: { type: String },
  description: { type: String }
});

module.exports = mongoose.model('Company', companySchema);