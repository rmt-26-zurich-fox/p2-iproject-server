const productRouter = require("express").Router();
const ProductController = require("../controllers/product-controller");
const authentication = require("../middleware/authentication");

productRouter.get("/products", ProductController.getProduct);
productRouter.post("/carts/:cakeId", authentication, ProductController.addItem);
productRouter.get("/carts", authentication, ProductController.getCart);
productRouter.patch(
  "/carts/:cartId",
  authentication,
  ProductController.patchCart
);
productRouter.delete(
  "/carts/:cartId",
  authentication,
  ProductController.deleteItem
);
productRouter.get("/payment", authentication, ProductController.payment);
productRouter.delete(
  "/carts",
  authentication,
  ProductController.removeCheckout
);

module.exports = productRouter;
