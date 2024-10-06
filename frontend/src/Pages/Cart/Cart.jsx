import React, { useState, useEffect } from 'react';
import './Cart.css';
import Lottie from 'lottie-react';
import empty from './empty.json';
import trash from './trash.svg';
import buy from './buy.svg';
import loadingAnimation from './loading.json'; 
import axios from 'axios';
import Payment from '../Payment/Payment'; 

// company logos
import apollo from '../../assets/Welcome/Dealers/apollo.png';
import bridgestone from '../../assets/Welcome/Dealers/bridgestone.png';
import jk from '../../assets/Welcome/Dealers/jk.png';

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Fetch cart items from the backend
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await axios.get('http://localhost:8080/user/cart', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, 
          },
        });
        setCart(data);
      } catch (error) {
        console.log('Failed to fetch cart items:', error);
      } finally {
        setLoading(false);
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

  const handleBuyClick = () => {
    setIsPaymentModalOpen(true);
  };

  // Function to close the payment modal
  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false); 
  };

  return (
    <div className='cart-container'>
      <div className="cart-img">
        {loading ? (
          <div className="cart-loading">
            <Lottie className="loading" animationData={loadingAnimation} loop={true} />
          </div>
        ) : cart.length === 0 ? (
          <div className="cart-empty">
            <Lottie className="empty" animationData={empty} loop={true} />
            <p>Your cart is empty</p>
          </div>
        ) : (
          cart.map(item => (
            <div className="cart-tire-box" key={`${item.tyre_model}-${item.tyre_brand}`}>
              <img src={item.image} alt={item.tyre_model} />
              <div className="content">
                <h2>
                  {item.tyre_brand === 'Apollo' && <img src={apollo} alt="Apollo" />}
                  {item.tyre_brand === 'Bridgestone' && <img src={bridgestone} alt="Bridgestone" />}
                  {item.tyre_brand === 'JK' && <img src={jk} alt="JK" />}
                  {(item.tyre_brand !== 'Apollo' && item.tyre_brand !== 'Bridgestone' && item.tyre_brand !== 'JK') && item.tyre_brand}
                </h2>
                <h3>{item.tyre_model}</h3>
                <p>{item.tyre_size}</p>
                <div className="price">Price: {item.price}</div>
                <div className='buttons-container'>
                  <button className='remove-button'
                    onClick={() => removeFromCart(item.tyre_model, item.tyre_brand)}>
                    <img src={trash} className='trash-icon' alt="Remove"/>
                  </button>
                  <button className='buy-button' onClick={handleBuyClick}> 
                    <img src={buy} className='buy-icon' alt="Buy"/>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Render the Payment component conditionally and pass the onClose prop */}
      {isPaymentModalOpen && <Payment onClose={handleClosePaymentModal} />} 
    </div>
  );
}

export default Cart;
