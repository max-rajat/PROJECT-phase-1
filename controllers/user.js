const user=require("../models/user")
module.exports.signupForm= (req, res) => {
  res.render("./users/signup.ejs")
};

module.exports.Signup=async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newuser = new user({ email, username })
    const registereduser = await user.register(newuser, password)
    console.log(registereduser,"regisuser")
    req.login(registereduser, (err) => {
      if (err) {
        return next(err)
      }
      req.flash("success", "user is registered")
      res.redirect("/listing")
    })

  } catch (e) {
    req.flash("error", e.message)
    res.redirect("/signup")
  }

};

module.exports.loginForm=(req, res) => {
  res.render("./users/login.ejs")
}

module.exports.Login=async (req,res,next) => {
    req.flash("success", "welcome back to stay.me")
    let redirectUrl=res.locals.redirectUrl || "/listing"
res.redirect(redirectUrl)
}

module.exports.Logout=(req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", " you are logged out")
    res.redirect("/listing")
  })
}