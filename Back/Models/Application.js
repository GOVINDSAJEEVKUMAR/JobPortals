const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  jobseeker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  resume: {
    type: String,  // Store the path to the resume file
    required: true,
  },
  status: {
    type: String,
    enum: ['Applied', 'Accepted', 'Rejected'],
    default: 'Applied',
  },
}, { timestamps: true });

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
