const express = require("express")
const router = express.Router();
const user = require("../models/user.js")
const asyncWrap = require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const usercontroller=require("../controllers/user.js")


router.get("/signup",usercontroller.signupForm)

router.post("/signup", asyncWrap(usercontroller.Signup));

router.get("/login",usercontroller.loginForm )

router.post("/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: '/login',
    failureFlash: true,
  }),usercontroller.Login
  )

router.get("/logout", usercontroller.Logout)
module.exports = router;