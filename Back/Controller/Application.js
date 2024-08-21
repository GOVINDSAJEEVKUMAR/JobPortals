const express = require("express");
const Application = require("../Models/Application");
const EmployeeSchema = require("../Models/EmployeeSchema");
const UserSchema = require("../Models/UserSchema");
const mongoose = require("mongoose");

// Helper function to send error response
const sendErrorResponse = (res, status, msg) => {
    return res.status(status).json({ msg });
};

const applyJob = async (req, res) => {
    const { jobId, jobseekerId, employerId } = req.body;
    console.log("jobId:", jobId);
    console.log("jobseekerId:", jobseekerId);
    console.log("employerId:", employerId);
    
    



    if (!mongoose.Types.ObjectId.isValid(jobId)) {
        return res.status(400).json({ error: 'Invalid job ID' });
    }
    if (!mongoose.Types.ObjectId.isValid(jobseekerId)) {
        return res.status(400).json({ error: 'Invalid jobseeker ID' });
    }
    if (!mongoose.Types.ObjectId.isValid(employerId)) {
        return res.status(400).json({ error: 'Invalid employer ID' });
    }
    
    

    try {
        const application = new Application({
            job: jobId,
            jobseeker: jobseekerId,
            employer: employerId,
            resume: req.file.path,
        });
        console.log("jobId:", jobId, "jobseekerId:", jobseekerId, "employerId:", employerId);
        await application.save();
        res.status(201).json({ message: 'Application submitted successfully' });
        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: { path: 'applicant' },
        });

        if (!job) {
            return res.status(404).json({
                message: 'Job not found.',
                success: false,
            });
        }

        return res.status(200).json({
            job,
            success: true,
        });
    } catch (error) {
        console.error("Error fetching applicants:", error);
        res.status(500).json({ msg: "Server error" });
    }
};

const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;

        if (!status) {
            return res.status(400).json({
                message: 'Status is required',
                success: false,
            });
        }

        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({
                message: "Application not found.",
                success: false,
            });
        }

        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "Status updated successfully.",
            success: true,
        });
    } catch (error) {
        console.error("Error updating status:", error);
        res.status(500).json({ msg: "Server error" });
    }
};

module.exports = { applyJob, getApplicants, updateStatus };
