// models/productModel.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  status:{
    type: String,
    enum: ["product", "cart"],
    default: "product"
  }
});

const product = mongoose.model("Product", productSchema);
module.exports = product;
