const express=require("express")
const router=express.Router({mergeParams:true});
const asyncWrap=require("../utils/wrapAsync.js");
const Review=require("../models/review.js")
const listing=require("../models/listing.js")
const {validateReview,isloggedin,isReviewAuth}=require("../middleware.js")
const reviewController=require("../controllers/review.js")



// post reviews
router.post("/",isloggedin,validateReview,asyncWrap(reviewController.postReview)
);
// delete review
router.delete("/:reviewId",isloggedin,isReviewAuth,asyncWrap(reviewController.destroyReview))
//review validation

module.exports=router;