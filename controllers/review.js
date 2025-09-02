const Review=require("../models/review")
const listing=require("../models/listing")


module.exports.postReview=async(req,res)=>{
const cmnt=await listing.findById(req.params.id);
let newReview= new Review(req.body.review);
newReview.author=req.user._id
console.log(newReview.author)
cmnt.reviews.push(newReview);
await newReview.save();
await cmnt.save();
console.log("review saved")
req.flash("success","Review Added")
res.redirect(`/listing/${req.params.id}`)

};

module.exports.destroyReview=async(req,res)=>{
    let {id,reviewId}= req.params;
    await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
    await Review.findByIdAndDelete(reviewId);
     req.flash("success","Review Deleted")
   res.redirect(`/listing/${id}`)
};