const express = require("express");
const Job = require("../Models/JobSchema");


const newJob = async (req, res) => {
  try {
    const { title, description, details } = req.body;
    let Job = await Job.create({
      title,
      description,
      details
    })
    res.status(200).json(Job);
  } catch (error) {
    res.status(500).json({ msg: error });

  }
};
const getallJob = async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.status(200).json(jobs); // Directly sending the jobs array
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
const loadEditJob = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    
        if (!updatedJob) {
          return res.status(404).json({ message: 'Job not found' });
        }
    
        res.json(updatedJob);
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Server error' });
      }
    };
    
    const deleteJob = async (req, res) => {
      try {
        const { id } = req.params;
        const deletedJob = await Job.findByIdAndDelete(id);
    
        if (!deletedJob) {
          return res.status(404).json({ message: 'Job not found' });
        }
    
        res.json({ message: 'Job deleted successfully' });
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Server error' });
      }
    };
  
module.exports = {
    newJob,
    getallJob,
    loadEditJob,
    deleteJob
}