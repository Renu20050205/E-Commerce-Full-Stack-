const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productImage: {
        type: String,
        required: true,
        trim: true,
    },
    productName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    category: {
        type: String,
        enum: ["clothes", "food", "toy", "electronic", "books"],
        required: true,
        trim: true,
        lowercase: true,
    },
    productDescription: {
        type: String,
        required: true,
        trim: true,
    },

    productPrice: {
        type: Number,
        required: true,

    },

    productRatings: {
        type: Number,
        required: true,

    },
    isFreeDelivery: {
        type: Boolean,
        default: true
    },


}, { timestamps: true });
module.exports = new mongoose.model("product", productSchema);