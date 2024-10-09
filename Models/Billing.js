// Models/Billing.js
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    item_name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { _id: false }
);

const billingSchema = new mongoose.Schema({
  invoice_number: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  DOB: { type: Date, required: true },
  marriage_anniversary: { type: Date, required: true },
  items: [itemSchema],
  total_amount: { type: String, required: true },
  discount_amount: { type: String, default: 0 }, // 2% discount on total_amount
  gst: { type: String, default: 0 }, // 5% GST on amount after discount
  sgst: { type: String, default: 0 }, // 2.5% SGST
  cgst: { type: String, default: 0 }, // 2.5% CGST
  final_amount: { type: String, default: 0 }, // final amount after discount and GST
  billing_date: { type: Date, default: Date.now },
});

// Method to calculate totals
billingSchema.methods.calculateTotals = function () {
  const discountRate = 0.02; // 2%
  const gstRate = 0.05; // 5%

  // Calculate discount
  this.discount_amount = this.total_amount * discountRate;

  // Amount after discount
  const amountAfterDiscount = this.total_amount - this.discount_amount;

  // Calculate GST
  this.gst = amountAfterDiscount * gstRate;
  this.sgst = this.gst / 2; // 2.5% SGST
  this.cgst = this.gst / 2; // 2.5% CGST

  // Calculate final amount
  this.final_amount = amountAfterDiscount + this.gst;

  return this.final_amount; // Return the final amount
};

const Billing = mongoose.model("Billing", billingSchema);

module.exports = Billing;
