import React, { useState, useEffect } from 'react';
import './Cart.css';
import Lottie from 'lottie-react';
import empty from './empty.json';
import trash from './trash.svg';
import buy from './buy.svg';
import loadingAnimation from './loading.json'; 
import axios from 'axios';
import Payment from '../Payment/Payment'; 

// Company logos
import apollo from '../../assets/Welcome/Dealers/apollo.png';
import bridgestone from '../../assets/Welcome/Dealers/bridgestone.png';
import jk from '../../assets/Welcome/Dealers/jk.png';
import {useNavigate} from 'react-router-dom';

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate('/cart/orders');
  };
  
  handleOrderClick
  // Fetch cart items from the backend
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await axios.get('http://localhost:8080/user/cart', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, 
          },
        });

        const initializedCart = data.map(item => ({
          ...item,
          quantity: item.quantity >= 1 ? item.quantity : 1,
          numericPrice: parseFloat(item.price.replace(/[^0-9.-]+/g,"")) || 0,
        }));
        setCart(initializedCart);
      } catch (error) {
        console.log('Failed to fetch cart items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const removeFromCart = async (tyre_model, tyre_brand) => {
    try {
      await axios.delete('http://localhost:8080/user/cart', {
        data: { tyre_model, tyre_brand },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCart(cart.filter(item => !(item.tyre_model === tyre_model && item.tyre_brand === tyre_brand)));
    } catch (error) {
      console.log('Failed to remove item from cart:', error);
    }
  };

  const handleQuantityChange = (e, item) => {
    const value = e.target.value;
    const quantity = parseInt(value, 10);
    if (isNaN(quantity) || quantity < 1) {
      return;
    }
    const updatedCart = cart.map(cartItem =>
      cartItem.tyre_model === item.tyre_model && cartItem.tyre_brand === item.tyre_brand
        ? { ...cartItem, quantity }
        : cartItem
    );
    setCart(updatedCart);
  };

  const handleBuyClick = (item) => {
    setSelectedItems([item]); 
    setIsPaymentModalOpen(true);
  };

  // Function to close the payment modal
  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false); 
    setSelectedItems([]);
  };

  // Function to handle successful payment and generate bill
  const handlePaymentSuccess = (bill) => {
    setCart(cart.filter(cartItem => !(cartItem.tyre_model === bill.items[0].tyre_model && cartItem.tyre_brand === bill.items[0].tyre_brand)));
    alert("Payment successful! Bill has been generated.");
  };
  

  return (
    <div className='cart-container'>
      <div>
        <button className='cart-container-button' onClick={handleOrderClick}>My Orders</button>
      </div>
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
          cart.map(item => {
            const { numericPrice, quantity } = item;
            const totalPrice = Math.round(numericPrice * quantity); // Round to nearest integer
            return (
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
                  <div className="price"><span>Price:</span> ₹{totalPrice}</div>
                  <label className="quantity-label">
                    Quantity  &nbsp;&nbsp;
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(e, item)}
                      className="quantity-input"
                    />
                  </label>
                  <div className='buttons-container'>
                    <button className='remove-button' onClick={() => removeFromCart(item.tyre_model, item.tyre_brand)}>
                      <img src={trash} className='trash-icon' alt="Remove" />
                    </button>
                    <button className='buy-button' onClick={() => handleBuyClick(item)}>
                      <img src={buy} className='buy-icon' alt="Buy" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {isPaymentModalOpen && selectedItems.length > 0 && (
        <Payment
          onClose={handleClosePaymentModal}
          items={selectedItems}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}

export default Cart;
