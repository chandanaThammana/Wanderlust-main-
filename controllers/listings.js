const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


module.exports.index = async(req,res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}

module.exports.renderNewForm = (req,res) => {
    res.render("listings/new.ejs");
}

module.exports.showListing = async(req,res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({path: "reviews", populate: {
        path: "author"
    }}).populate("owner");
    if(!listing){
        req.flash("error", "Listing you requested for doesn't exists");
        res.redirect("/listings")
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing});
}

module.exports.createListing = async(req,res,next) => {

    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
      })
        .send()

    let url = req.file.path;
    let filename = req.file.filename;
    // console.log(url, "..", filename);
    // if(!req.body.listing){
    //     throw new ExpressError(400,"Send Valid Data For Listing!");
    // }
    // let listing = req.body.listing;
    const newListing = new Listing(req.body.listing);
    // if(!newListing.description){
    //     throw new ExpressError(400,"Description is Missing!");
    // }
    newListing.owner = req.user._id; //if new listing then the owner will be the one who created the listing
    newListing.image = {url, filename};
    newListing.geometry = response.body.features[0].geometry;

    let savedListing = await newListing.save();
    console.log(savedListing);
    // console.log(listing);
    req.flash("success", "New Listing Created")
    res.redirect("/listings")
}

module.exports.renderEditForm = async(req,res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "Listing you requested for doesn't exsits");
        res.redirect("/listings")
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_250,w_250")
    res.render("listings/edit.ejs", { listing, originalImageUrl })
}

module.exports.updateListing = async(req,res) => {
    // if(!req.body.listing){
    //     throw new ExpressError(400,"Send Valid Data For Listing!")
    // }
    let { id } =req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});

    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url , filename}
        await listing.save();
    }

    req.flash("success", "Listing Updated")
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async(req,res) => {
    let { id } = req.params;
    let deletedListing =  await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted")
    res.redirect("/listings")
}