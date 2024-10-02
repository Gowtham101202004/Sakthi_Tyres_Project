import React, { useState, useEffect } from 'react';
import './Cart.css';
import Lottie from 'lottie-react';
import empty from './empty.json';
import axios from 'axios';

function Cart() {
  const [cart, setCart] = useState([]);

  // Fetch cart items from the backend
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await axios.get('http://localhost:8080/user/cart', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Use token for auth
          },
        });
        setCart(data);
      } catch (error) {
        console.log('Failed to fetch cart items:', error);
      }
    };

    fetchCart();
  }, []);

  // Remove item from cart
  const removeFromCart = async (tyre_model, tyre_brand) => {
    try {
      await axios.delete('http://localhost:8080/user/cart', {
        data: { tyre_model, tyre_brand },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Token for auth
        },
      });
      setCart(cart.filter(item => !(item.tyre_model === tyre_model && item.tyre_brand === tyre_brand)));
    } catch (error) {
      console.log('Failed to remove item from cart:', error);
    }
  };

  return (
    <div className='cart-container'>
      <div className="cart-img">
        {cart.length === 0 ? (
          <div className="cart-empty">
            <Lottie className="empty" animationData={empty} loop={true} />
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
                <button
                  className="remove-from-cart"
                  onClick={() => removeFromCart(item.tyre_model, item.tyre_brand)}
                >
                  Remove from Cart
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Cart;
