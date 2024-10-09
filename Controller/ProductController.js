const Product = require("../Models/ProductModel1");
const Billing = require("../Models/Billing");

class productController {
  static getProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching products", error: error.message });
    }
  };
  static addProduct = async (req, res) => {
    const { type, name, price } = req.body;
    console.log(req.body);
    try {
      const result = new Product({
        type: type,
        name: name,
        price: price,
      });
      // console.log(result);
      await result.save();
      // console.log(product);
      res.json({ message: "Product added successfully", result });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Error adding product", error: error.message });
    }
  };
  static deleteProduct = async (req, res) => {
    const { id } = req.params; // Assuming the product ID is passed in the URL

    try {
      // Find the product by ID and delete it
      const deletedProduct = await Product.findByIdAndDelete(id);

      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json({ message: "Product deleted successfully", deletedProduct });
    } catch (error) {
      console.error("Error deleting product:", error);
      res
        .status(500)
        .json({ message: "Error deleting product", error: error.message });
    }
  };
  static editProduct = async (req, res) => {
    const { id } = req.params; // Assuming the product ID is passed in the URL
    const { type, name, price } = req.body;

    try {
      // Find the product by its ID and update the fields
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { type, name, price }, // Fields to update
        { new: true, runValidators: true } // Options: return updated product and enforce validation
      );

      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json({ message: "Product updated successfully", updatedProduct });
    } catch (error) {
      console.error("Error updating product:", error);
      res
        .status(500)
        .json({ message: "Error updating product", error: error.message });
    }
  };
  static createBilling = async (req, res) => {
    try {
      const {
        invoice_number,
        name,
        mobile,
        DOB,
        marriage_anniversary,
        items,
        total_amount,
      } = req.body;

      // Validate required fields
      if (
        !invoice_number ||
        !name ||
        !mobile ||
        !DOB ||
        !marriage_anniversary ||
        !items ||
        !total_amount
      ) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // Create a new billing record
      const newBill = new Billing({
        invoice_number,
        name,
        mobile,
        DOB,
        marriage_anniversary,
        items,
        total_amount,
      });

      // Calculate totals
      newBill.calculateTotals();

      // Save the record to the database
      await newBill.save();

      // Send a success response
      return res.status(201).json({
        message: "Billing record created successfully",
        data: newBill,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error creating billing record", error });
    }
  };
}
module.exports = productController;
