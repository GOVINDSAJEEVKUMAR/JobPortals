const express = require('express')
const router = express.Router()
const {applyJob,getApplicants,updateStatus} = require ("../Controller/Application")
const upload = require ("../Middleware/Upload")


router.post('/apply/:id', upload.single('resume'), applyJob);
// router.get("/getapply",getApply)

module.exports = router