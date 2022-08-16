const { getPagination, getPagingData } = require("../helpers/pagination");
const { Op } = require("sequelize");
const { Product } = require("../models");
const axios = require("axios");

class ProductController {
    // ---=== Admin Route ===---
    // Admin List Product - Newest Update
    static async adminListProduct(req, res, next) {
        try {
            const data = await Product.findAll({
                order: [
                    ['updatedAt', 'DESC']
                ]
            })

            res.status(200).json({
                message: "Success GET Product List",
                data
            });
        } catch (error) {
            next(error);
        }
    }

    // Admin Add Product
    static async adminAddProduct(req, res, next) {
        try {
            const newProduct = {
                name: req.body.name,
                price: +req.body.price,
                stock: +req.body.stock,
                weight: +req.body.weight,
                imageUrl: req.body.imageUrl
            }

            const data = await Product.create(newProduct)

            res.status(201).json({
                message: "Success Add New Product",
                data
            });
        } catch (error) {
            next(error);
        }
    }

    // Admin Edit Product
    static async adminEditProduct(req, res, next) {
        try {
            const productId = +req.params.id;

            const findProduct = await Product.findByPk(productId);

            if (!findProduct) throw { code: 404, error: `Product with id ${productId} is not found!` };

            const updateProduct = {
                name: req.body.name,
                price: +req.body.price,
                stock: +req.body.stock,
                weight: +req.body.weight,
                imageUrl: req.body.imageUrl
            }

            await Product.update(updateProduct, {
                where: {
                    id: productId
                }
            })

            res.status(200).json({
                message: `Success Edit Product with id ${findProduct.id}`
            });
        } catch (error) {
            next(error);
        }
    }

    // Admin Edit Product Status
    static async adminEditProductStatus(req, res, next) {
        try {
            const productId = +req.params.id;

            const findProduct = await Product.findByPk(productId);

            if (!findProduct) throw { code: 404, error: `Product with id ${productId} is not found!` };

            const updateStatus = {
                productStatus: req.body.productStatus,
            }

            await Product.update(updateStatus, {
                where: {
                    id: productId
                }
            })

            res.status(200).json({
                message: `Success Edit Product with id ${findProduct.id}`
            });
        } catch (error) {
            next(error);
        }
    }

    // ---=== Customer Route ===---
    // Customer List Product - Newest Product - Active only
    static async customerListProduct(req, res, next) {
        try {
            const data = await Product.findAll({
                order: [
                    ['createdAt', 'DESC']
                ],
                where: {
                    productStatus: "Active"
                }
            })

            res.status(200).json({
                message: "Success GET Product List",
                data
            });
        } catch (error) {
            next(error);
        }
    }

    static async customerListProductPagination(req, res, next) {
        try {
            const { page, size, name, min, max } = req.query;
            let search = {
                productStatus: "Active"
            }
            if (name) {
                search.name = {
                    [Op.iLike]: `%${name}%`
                }
            }
            if (min && max) {
                search.price = {
                    [Op.gte]: min,
                    [Op.lte]: max
                }
            } else if (max) {
                search.price = {
                    [Op.lte]: max
                }
            } else if (min) {
                search.price = {
                    [Op.gte]: min,
                }
            }

            const { limit, offset } = getPagination(page, size);
            const data = await Product.findAndCountAll({
                order: [
                    ['createdAt', 'DESC']
                ],
                where: search,
                limit,
                offset
            })
            const response = getPagingData(data, page, limit);
            res.status(200).json({
                message: "Succes read Product Pagination Filter",
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    // Customer Detail Product - In Add to Cart Page
    static async customerDetailProduct(req, res, next) {
        try {
            const productId = req.params.id;

            const data = await Product.findByPk(productId)

            if (!data) throw { code: 404, error: `Failed to read Food with id ${productId}` };

            const qrCodeData = await axios({
                method: "get",
                url: `https://api.happi.dev/v1/qrcode?data=http://localhost:8080/product-detail/${data.id}&width=&dots=000000&bg=FFFFFF&apikey=${process.env.SECRET_HAPPI_API_KEY}`,
            })

            data.dataValues.qrcode = qrCodeData.data.qrcode;

            res.status(200).json({
                message: "Success GET Detail Product",
                data
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ProductController;