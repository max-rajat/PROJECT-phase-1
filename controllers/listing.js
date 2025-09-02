const listing = require("../models/listing")
const user = require("../models/user")

module.exports.index = async (req, res) => {
    const alllisting = await listing.find({})
    res.render("index.ejs", { alllisting })
};


module.exports.newform = (req, res) => {
    res.render("addform.ejs")
};


module.exports.addNewLisitng = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const newlisting = new listing(req.body?.listing);
    newlisting.owner = req.user._id;
    newlisting.image = { url, filename }
    await newlisting.save()
    req.flash("success", "New listing is added")
    res.redirect("/listing")
};


module.exports.specificPost = async (req, res) => {
    let { id } = req.params;
    const listings = await listing.findById(id).populate({
        path: "reviews", populate: {
            path: "author",
        },
    }).populate("owner")
    if (!listings) {
        req.flash("error", "listing not exist")
        res.redirect("/listing")
    }
    console.log(listings)
    res.render("specific.ejs", { listings, user })

};

module.exports.editForm = async (req, res) => {
    let { id } = req.params;
    const listings = await listing.findById(id)
    if (!listings) {
        req.flash("error", "listing your are requested not exist")
      
    }
    let originalimage = listings.image.url;
    originalimage=originalimage.replace("upload", "upload/w_250")
  res.render("edit.ejs", { listings,  originalimage})
}

module.exports.editListing = async (req, res) => {
    let { id } = req.params;
    let Listing = await listing.findByIdAndUpdate(id, { ...req.body.listing })
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        Listing.image = { url, filename }
        await Listing.save();
    }
    req.flash("success", "Edited successfuly")
    res.redirect(`/listing/${id}`)
};

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    await listing.findByIdAndDelete(id)
    req.flash("success", "Deleted successfuly")
    res.redirect("/listing")
};