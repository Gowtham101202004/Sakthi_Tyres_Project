import React, { useState, useEffect } from 'react';
import './Cart.css';
import Lottie from 'lottie-react';
import empty from './empty.json';

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const removeFromCart = (tyre_model, tyre_brand) => {
    const updatedCart = cart.filter(item => 
      !(item.tyre_model === tyre_model && item.tyre_brand === tyre_brand)
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert('Item removed from cart');
  };

  return (
    <div className='cart-container'>
      <div className="cart-img"> 
        {cart.length === 0 ? (
          <div className="cart-empty">
            <Lottie className="empty" animationData={empty} loop={true}/>
            <p>Your cart is empty</p>
          </div>
        ) : (
          cart.map(item => (
            <div className="cart-tire-box" key={`${item.tyre_model}-${item.tyre_brand}`}>
              <img src={item.image} alt={item.tyre_model} />
              <div className="content">
                <h2>{item.tyre_brand}</h2>
                <h3>{item.tyre_model}</h3>
                <p>{item.tyre_size}</p>
                <div className="price">Price: {item.price}</div>
                <button className="remove-from-cart" onClick={() => removeFromCart(item.tyre_model, item.tyre_brand)}>Remove from Cart</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Cart;

