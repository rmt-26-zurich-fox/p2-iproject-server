const productRouter = require("express").Router();
const ProductController = require("../controllers/productController");

productRouter.get("/", ProductController.fetchAllProduct);
productRouter.post("/add", ProductController.addNewProduct);
productRouter.get("/:name", ProductController.fetchAdminProduct);
productRouter.get("/:name/:productId", ProductController.getOneProduct);


module.exports = productRouter;
