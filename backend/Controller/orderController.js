const { orderModel } = require('../Models/orderModel');

const createOrder = async (req, res) => {
    try {
        const { userId, items, totalPrice, paymentType, paymentMethod, tyre_state } = req.body;
        const order = new orderModel({
            userId,
            items,
            totalPrice,
            paymentType,
            paymentMethod,
            tyre_state,
        });
        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserOrders = async (req, res) => {
    try {
        const userId = req.params.id;
        const orders = await orderModel.find({ userId });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createOrder, getUserOrders };
