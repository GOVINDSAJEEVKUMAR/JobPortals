const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Assuming you have a User model for employers and jobseekers
    required: true,
  },
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
