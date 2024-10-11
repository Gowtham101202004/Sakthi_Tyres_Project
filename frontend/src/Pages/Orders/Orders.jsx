import React, { useEffect, useState } from 'react';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('userdata')); // Correctly parse user data
        const userId = userData._id; // Get user ID from parsed userdata
        const token = userData.token; // Get token from parsed userdata

        // Log userId and token to ensure they are being retrieved correctly
        console.log('userId:', userId);
        console.log('token:', token);

        if (!userId || !token) {
          throw new Error('Missing user ID or token');
        }

        const response = await fetch(`http://localhost:8080/user/orders/${userId}`, {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        // Check if the response is OK (status code 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Log the data to inspect it
        console.log('Fetched orders:', data);

        // Check if the data is an array
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          console.error('Expected an array of orders, but got:', data);
          setOrders([]); 
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="orders-container">
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Total Price</th>
              <th>Payment Type</th>
              <th>Payment Method</th>
              <th>Tyre State</th>
              <th>Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>₹{order.totalPrice}</td>
                <td>{order.paymentType}</td>
                <td>{order.paymentMethod}</td>
                <td>{order.tyre_state}</td>
                <td>
                  {order.items.map((item, index) => (
                    <div key={index} className="order-item">
                      <img src={item.image} alt={item.tyre_model} className="order-item-image" />
                      <div className="order-item-details">
                        <p><strong>Model:</strong> {item.tyre_model}</p>
                        <p><strong>Brand:</strong> {item.tyre_brand}</p>
                        <p><strong>Size:</strong> {item.tyre_size}</p>
                        <p><strong>Quantity:</strong> {item.quantity}</p>
                        <p><strong>Price:</strong> ₹{item.total_price}</p>
                      </div>
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;
