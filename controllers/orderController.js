const { Order, Product } = require("../models");
const { Op } = require("sequelize");

class OrderController {
    // ---=== Admin Route ===---
    // Admin List Order - Newest Order
    static async adminListOrder(req, res, next) {
        try {
            const data = await Order.findAll({
                include: ['Profile', 'Product'],
                order: [
                    ['createdAt', 'DESC']
                ]
            })

            res.status(200).json({
                message: "Success GET Order List",
                data
            });
        } catch (error) {
            next(error);
        }
    }

    // Admin Edit Order Status
    static async adminEditOrderStatus(req, res, next) {
        try {
            const orderId = +req.params.id;

            const findOrder = await Order.findByPk(orderId);

            if (!findOrder) throw { code: 404, error: `Order with id ${orderId} is not found!` };

            const updateStatus = {
                orderStatus: req.body.orderStatus
            }

            await Order.update(updateStatus, {
                where: {
                    id: orderId
                }
            })

            res.status(200).json({
                message: `Success Edit Order with id ${findOrder.id}`
            });
        } catch (error) {
            next(error);
        }
    }

    // ---=== Customer Route ===---
    // Customer Add Order -> Update stock product
    static async customerAddOrder(req, res, next) {
        try {
            const productId = +req.params.id;

            // Find Product
            const findProduct = await Product.findByPk(productId);

            if (!findProduct) throw { code: 404, error: `Product with id ${productId} is not found!` };

            // Update Stock
            const updateStock = {
                stock: findProduct.stock - (+req.body.stock)
            }

            await findProduct.update(updateStock, {
                where: {
                    id: productId
                }
            })

            // Create New Order to Cart
            const newOrder = {
                stock: +req.body.stock,
                totalCost: findProduct.price * (+req.body.stock),
                ProfileId: req.user.profile_id,
                ProductId: productId
            }

            const data = await Order.create(newOrder)

            res.status(201).json({
                message: "Success Add New Order to Cart",
                data
            });
        } catch (error) {
            next(error);
        }
    }

    // Customer Cancell Order -> Update stock product
    static async customerCancellOrder(req, res, next) {
        try {
            const orderId = +req.params.id;

            // Find Order
            const findOrder = await Order.findByPk(orderId);

            if (!findOrder) throw { code: 404, error: `Order with id ${orderId} is not found!` };

            // After Find Order Find Product First
            const findProduct = await Product.findByPk(findOrder.ProductId);

            if (!findProduct) throw { code: 404, error: `Product with id ${findOrder.ProductId} is not found!` };

            // After Product Found -> Update Stock
            const updateStock = {
                stock: findProduct.stock + findOrder.stock
            }

            await Product.update(updateStock, {
                where: {
                    id: findProduct.id
                }
            })

            // After update stock then delete order
            await Order.destroy({
                where: {
                    id: orderId
                }
            })

            res.status(200).json({
                message: "Success Cancell Order from Cart"
            });
        } catch (error) {
            next(error);
        }
    }

    // Customer List Order - Status Cart
    static async customerListCart(req, res, next) {
        try {
            const data = await Order.findAll({
                include: ['Product'],
                order: [
                    ['createdAt', 'DESC']
                ],
                where: {
                    ProfileId: req.user.profile_id,
                    orderStatus: "Cart"
                }
            })

            res.status(200).json({
                message: "Success GET Cart List",
                data
            });
        } catch (error) {
            next(error);
        }
    }

    // Customer List Order - Status Payed Or Done
    static async customerListOrder(req, res, next) {
        try {
            const data = await Order.findAll({
                include: ['Product'],
                order: [
                    ['updatedAt', 'DESC']
                ],
                where: {
                    ProfileId: req.user.profile_id,
                    orderStatus: {
                        [Op.or]: ["Payed", "Done"]
                    }
                }
            })

            res.status(200).json({
                message: "Success GET Order List",
                data
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = OrderController;