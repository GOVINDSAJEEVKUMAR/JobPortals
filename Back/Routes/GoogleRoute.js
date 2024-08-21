const express = require("express");
const router = express.Router();
const passport = require("passport");


router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: 'http://localhost:5173/home',
    failureRedirect: 'http://localhost:5173'
}));

router.get('/login/success', (req, res) => {
    if (req.user) {
        res.status(200).json({ message: "success", user: req.user });
    } else {
        res.status(401).json({ message: "unauthorized" });
    }
});

module.exports = router
