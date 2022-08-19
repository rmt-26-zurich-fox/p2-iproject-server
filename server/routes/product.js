const productRouter = require("express").Router();
const ProductController = require("../controllers/productController");

productRouter.get("/", ProductController.fetchAllProduct);
productRouter.post("/add", ProductController.addNewProduct);
productRouter.get("/:id", ProductController.fetchProductProvider);
productRouter.get("/:id/:productId", ProductController.getOneProduct);


module.exports = productRouter;
