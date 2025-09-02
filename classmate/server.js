const express=require("express");
const app= express();
app.set("view engine","ejs");
const path=require("path")
app.set("views",path.join(__dirname, "views"))
const flash=require("connect-flash")

app.use(flash())
// const cookieparser=require("cookie-parser")
// app.use(cookieparser("screetcode"))

// app.get("/signedcookie",(req,res)=>{
//     res.cookie("Made-In","India",{signed:true});
//     res.send("signedcookies got")
// })
// app.get("/verify",(req,res)=>{
//     console.log(req.signedCookies,"true")
   
    
//     res.send("verified")
// })
// app.get("/getcookies",(req,res)=>{
//     res.cookie("name","rajat");
//     res.cookie("made-in","india")
//     res.send("cookies are added")
// })

// app.get("/",(req,res)=>{
//     console.log(req.cookies)
//     res.send("home page")
// })

// app.get("/greet",(req,res)=>{
//     let {name="anonymous"}=req.cookies;
//     res.send(`hello ${name}`)
// })
// app.get("/extrabit",(req,res)=>{
//     res.cookie("russia","putin")
//     res.cookie("narendra","modi")
//    res.cookie("up","yogi",{signed:true})
//     res.send("extra")
// })

// app.get("/result",(req,res)=>{
// console.log(req.cookies)
// console.log("signed cookies",req.signedCookies)
// res.send("result done")
// })
const session=require("express-session")
const sessionopt={
    secret:"mybooststring",
    resave:false,
    saveUninitialized:true,

}
app.use(session(sessionopt))
// app.get("/reqcount",(req,res)=>{
// if(req.session.count){
//     req.session.count++;
// }else{
//     req.session.count=1;
// }
//  res.send(`the count is ${req.session.count}`)
// })
app.get("/register",(req,res)=>{
   let {name="anonymous"}=req.query
req.session.name=name;
if(name==="anonymous"){
 req.flash("error","user not registered")
}else{
    req.flash("success","user registered")
}

   res.redirect("/greet")
})
app.get("/greet",(req,res)=>{
        res.locals.errormsg=req.flash("error")
    res.locals.successmsg=req.flash("success")

    res.render("flashi.ejs",{name:req.session.name})
})


app.listen(3000,()=>{
    console.log("working on 3000 port ")
})