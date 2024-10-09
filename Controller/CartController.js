// controllers/cartController.js
const CartItem = require("../Models/cartModel");

class CartController {
  static getCartItems = async (req, res) => {
    try {
      const cartItems = await CartItem.find().populate("productId");
      res.json(cartItems);
    } catch (error) {
      res.status(500).send("Error fetching cart items");
    }
  };
  static addToCart = async (req, res) => {
    const { productId } = req.body;
    try {
      let cartItem = await CartItem.findOne({ productId });

      if (cartItem) {
        cartItem.quantity += 1;
      } else {
        cartItem = new CartItem({ productId, quantity: 1 });
      }

      await cartItem.save();
      res.json(cartItem);
    } catch (error) {
      res.status(500).send("Error adding to cart");
    }
  };
  static updateCartItem = async (req, res) => {
    const { itemId, action } = req.body;
    try {
      const cartItem = await CartItem.findById(itemId);

      if (action === "increase") {
        cartItem.quantity += 1;
      } else if (action === "decrease" && cartItem.quantity > 1) {
        cartItem.quantity -= 1;
      }

      await cartItem.save();
      res.json(cartItem);
    } catch (error) {
      res.status(500).send("Error updating cart item");
    }
  };
  static delete = async (req, res) => {
    const { _id } = req.params;
    try {
      await CartItem.findByIdAndDelete(_id);
      res.status(200).send({ message: "Item removed from cart" });
    } catch (error) {
      console.log(error)
      res.status(500).send({ error: "Failed to remove item" });
    }
  };
}
module.exports = CartController;
