const mongoose = require('mongoose');

// Cart schema
const cartSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Link to User model
      required: true
    },
    items: [
      {
        image: String,
        tyre_model: String,
        tyre_size: String,
        tyre_brand: String,
        price: String
      }
    ]
  },
  {
    timestamps: true,
  }
);

const CartModel = mongoose.model('Cart', cartSchema);

module.exports = { CartModel };
