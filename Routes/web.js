// routes/web.js
const express = require("express");
const router = express.Router();
const productController = require("../Controller/ProductController");
const cartController = require("../Controller/CartController");
const CartController = require("../Controller/CartController");

// Product routes
router.get("/products", productController.getProducts);
router.post("/products", productController.addProduct); // New API endpoint for adding a product
router.delete("/products/:id", productController.deleteProduct);
router.put("/products/:id", productController.editProduct);
router.post("/billings",productController.createBilling);


// Cart routes
router.get("/cart", cartController.getCartItems);
router.post("/cart", cartController.addToCart);
router.put("/cart", cartController.updateCartItem);
router.delete("/cart/:_id", CartController.delete);

module.exports = router;
