const express = require("express");
const router = express.Router();
const passport = require("passport")
const {
     SignUp,
    Login,
    
    getUser,
    
    // getPhoto,
    Logout
} = require("../Controller/Register")
const {newJob,getallJob,loadEditJob,deleteJob} = require ("../Controller/Job")

const {MobileLogin,Otp} = require("../Controller/OtpAuth")
const {googleAuth, googleCallback,  loginSuccess} = require ("../Controller/GoogleAuth")
const upload = require ("../Middleware/Upload")
const {auth} = require("../Middleware/Auth")
// const upload = multer({ storage, fileFilter });

router.post('/', upload.single('profilePhoto'),SignUp)
// router.get("/:id",getPhoto,userVerification,)
router.post("/login",Login)
router.get("/user/:id",getUser,auth)
router.post("/logout",Logout)
router.post("/mobilelogin",MobileLogin)
router.post("/otp",Otp)








module.exports = router