const listing=require("./models/listing.js")
const Review=require("./models/review.js")
const ExpressError=require("./utils/ExpressError.js")
const {listingSchema,reviewSchema}=require("./joischema.js")


module.exports.isloggedin=(req,res,next)=>{ 
    if(!req.isAuthenticated()){
          req.session.redirectUrl=req.originalUrl;
        req.flash("error","please login first")
        return res.redirect("/login")
    }
    next();
};
module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}
module.exports.isOwnerAuth= async(req,res,next)=>{
    let {id}=req.params;
let listed=await listing.findById(id)
if(res.locals.currentuser && !listed.owner._id.equals(res.locals.currentuser._id)){
    req.flash("error","you don't have access to edit this Lisitng")
     return res.redirect(`/listing/${id}`)
}
next();
}

module.exports.isReviewAuth= async(req,res,next)=>{
    let {id,reviewId}=req.params;
let review=await Review.findById(reviewId)
if(!review.author.equals(res.locals.currentuser._id)){
    req.flash("error","you don't have access to delete this Review")
     return res.redirect(`/listing/${id}`)
}
next();
}

module.exports.validateListing = ((req,res,next)=>{
let error=listingSchema?.validate(req.body)
if(error){
    let errmsg=error.details.map((el)=> el.message).join(",")
    throw new ExpressError(400,errmsg)
} else{
    next();
}
})
module.exports.validateReview = ((req,res,next)=>{
    let error=reviewSchema?.validate(req.body)
if(error){
    let errmsg=error.details.map((el)=>el.message).join(",")
    throw new ExpressError(400,errmsg)
} else{
    next();
}
})