import React from 'react';
import './Cart.css';

function Cart({ cartItems, removeFromCart }) {  // Receiving cartItems and removeFromCart as props
  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.tyre_model} />
            <div className="cart-details">
              <h3>{item.tyre_brand}</h3>
              <p>{item.tyre_model}</p>
              <p>{item.tyre_size}</p>
              <p className="price">Price: {item.price}</p>
              <button className="remove-from-cart" onClick={() => removeFromCart(item.id)}>Remove from Cart</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;
