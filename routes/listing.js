const express = require("express")
const router = express.Router();
const asyncWrap = require("../utils/wrapAsync.js");
const listing = require("../models/listing.js");
const { isloggedin, isOwnerAuth, validateListing } = require("../middleware.js");

const listingcontroller = require("../controllers/listing.js")

const multer = require('multer')
const { storage } = require("../cloudConfig.js")
const upload = multer({ storage })

//index route
router.get("/", asyncWrap(listingcontroller.index));


// new listing form
router.get("/new", isloggedin, listingcontroller.newform)
// add new listing
router.post("/",    validateListing,
    upload.single('listing[image.url]'),

    asyncWrap(listingcontroller.addNewLisitng));

// router.post("/",upload.single('listing[image.url]'),(req,res)=>{
//     res.send(req.file);
// })

// specific post details route
router.get("/:id", asyncWrap(listingcontroller.specificPost));



// edit form
router.get("/:id/edit", asyncWrap(listingcontroller.editForm));

// edit route
router.put("/:id",
     isloggedin,
     isOwnerAuth, 
     upload.single('listing[image.url]'),
     validateListing,
      asyncWrap(listingcontroller.editListing));
//delete route

router.delete("/:id/delete", isOwnerAuth, isloggedin, asyncWrap(listingcontroller.destroyListing));


module.exports = router;