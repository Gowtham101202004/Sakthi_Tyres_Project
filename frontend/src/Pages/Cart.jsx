import React, { useState, useEffect } from 'react';
import './Cart.css';

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert('Item removed from cart');
  };

  return (
    <div className='cart-container'>
      <div className="cart-img"> 
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cart.map(item => (
            <div className="tire-box" key={item.id}>
              <img src={item.image} alt={item.tyre_model} />
              <div className="content">
                <h2>{item.tyre_brand}</h2>
                <h3>{item.tyre_model}</h3>
                <p>{item.tyre_size}</p>
                <div className="price">Price: {item.price}</div>
                <button className="remove-from-cart" onClick={() => removeFromCart(item.id)}>Remove from Cart</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Cart;
