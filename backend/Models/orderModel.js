const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        items: [
            {
                image: String,
                tyre_model: String,
                tyre_brand: String,
                tyre_size: String,
                quantity: Number,
                total_price: Number,
            },
        ],
        totalPrice: Number,
        paymentType: String,
        paymentMethod: String,
        tyre_state: String,
    },
    {
        timestamps: true,
    }
);

const orderModel = mongoose.model('Order', orderSchema);

module.exports = { orderModel };
