const express    = require('express');
const router     = express.Router();
const Job        = require('../Models/JobSchema');
const {restrict}       = require('../Middleware/Auth');
const { newJob,getallJob,loadEditJob,deleteJob} = require ('../Controller/Job')


router.post("/addjob",newJob)
router.get("/getalljob",getallJob)
router.put("/editjob/:id",restrict,loadEditJob)
router.delete("/deletejob/:id",restrict,deleteJob)



module.exports = router
