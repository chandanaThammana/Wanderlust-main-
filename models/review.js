const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comment: String,
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now() // Correct way to set the default value to the current date
      },
      author: {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
})

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;