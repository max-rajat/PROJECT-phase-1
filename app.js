if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

console.log(process.env.SECRET)

const express = require("express")
const app = express();
const mongoose = require("mongoose")//its a db
const methodOverride = require("method-override");// its is used for delete,put or patch
const ejsMate = require("ejs-mate");// for layouts like navbar,footer
const path = require("path")
const user = require("./models/user.js") //it's a user Schema
const ExpressError = require("./utils/ExpressError.js")
const passport = require("passport")
const LocalStrategy = require("passport-local")
const session = require("express-session")
const MongoStore = require('connect-mongo')

app.use(express.json()); // handles JSON body
app.use(express.static(path.join(__dirname, "/public")))
app.engine("ejs", ejsMate)
app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs")

//routes
const Listing = require("./routes/listing.js")
const review = require("./routes/review.js")
const users = require("./routes/user.js")

const flash = require("connect-flash")

const atlasurl = process.env.ATLASDB_URL;


const store = MongoStore.create({
    mongoUrl:atlasurl,
    crypto: {
      secret:process.env.SECRET,
    },
    touchAfter: 24 * 3600,
})

store.on("error",()=>{
    console.log("error in mongo atlas",err)
})

const sessionoption = {
     store,
    secret:process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: +7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
}
app.use(session(sessionoption))





app.use(flash());
//passport
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser())
passport.deserializeUser(user.deserializeUser())

app.use((req, res, next) => {
    res.locals.successmsg = req.flash("success");
    res.locals.errormsg = req.flash("error");
    res.locals.currentuser = req.user;
    next();
})
    app.use("/listing", Listing)
app.use("/listings/:id/review", review)
app.use("/", users)


app.all("/*splat", (req, res, next) => {
    next(new ExpressError(404, "Page not found "))
})

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "somthing is wrong" } = err;
    res.status(statusCode).render("error.ejs", { message })
    // res.status(statusCode).send(message)
});

//'mongodb://127.0.0.1:27017/project';

main().then((res) => {
    console.log("connected to Db!")
}).catch((err) => {
    console.log(err)
})
async function main() {
    await mongoose.connect(atlasurl);
};


const port = 3000;

app.listen(port, (req, res) => {
    console.log(`Hey You are in ${port}`)
})

