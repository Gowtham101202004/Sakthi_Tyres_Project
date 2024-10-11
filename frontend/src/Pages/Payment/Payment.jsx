// Payment.jsx

import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import jsPDF from "jspdf"; // Import jsPDF
import "jspdf-autotable"; // Optional: For better table formatting
import './Payment.css'; 
import QR_Gpay from './google_pay_qr.png'; // Ensure the path is correct

const Payment = ({ onClose, items, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardholderName, setCardholderName] = useState(""); 
  const [paymentType, setPaymentType] = useState(null); // 'Online' or 'Offline'
  const [onlinePaymentMethod, setOnlinePaymentMethod] = useState(null); // 'Card' or 'Gpay'
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [billData, setBillData] = useState(null);

  // Calculate total price for all items
  const calculateTotalPrice = () => {
    let total = 0;
    items.forEach(item => {
      const priceNumber = item.numericPrice; // Use numericPrice from Cart.jsx
      const quantity = item.quantity || 1;
      if (!isNaN(priceNumber)) {
        total += priceNumber * quantity;
      }
    });
    return Math.round(total); 
  };

  const totalPrice = calculateTotalPrice();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
  
    const cardElement = elements.getElement(CardElement);
  
    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: cardholderName,
      },
    });
  
    if (stripeError) {
      setError(stripeError.message);
      setIsProcessing(false);
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8080/user/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          amount: totalPrice * 100, // Stripe expects amount in cents
        }),
      });
  
      const paymentResult = await response.json();
  
      if (paymentResult.error) {
        setError(paymentResult.error);
      } else {
        if (paymentResult.paymentIntent.status === "succeeded") {
          const bill = generateBill('Online', 'Card');
          await sendOrderDetails(bill); // Send order details to the backend
          setPaymentSuccess(true);
          onPaymentSuccess(bill);
        }
      }
    } catch (err) {
      setError("Payment processing failed.");
    }
  
    setIsProcessing(false);
  };
  
  const handleGpay = async () => {
    const bill = generateBill('Online', 'Gpay');
    await sendOrderDetails(bill); // Send order details to the backend
    setPaymentSuccess(true);
    onPaymentSuccess(bill);
  };
  
  const handleBookOrder = async () => {
    const bill = generateBill('Offline', 'Cash');
    await sendOrderDetails(bill); // Send order details to the backend
    setPaymentSuccess(true);
    onPaymentSuccess(bill);
  };
  
  const sendOrderDetails = async (bill) => {
    try {
      const userData = JSON.parse(localStorage.getItem('userdata')); // Correctly parse user data
      const response = await fetch("http://localhost:8080/user/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userData.token}`, // Use the token from parsed userdata
        },
        body: JSON.stringify({
          userId: userData._id, // Use user ID from parsed userdata
          ...bill
        }),
      });
  
      const result = await response.json();
  
      if (result.error) {
        setError(result.error);
      }
    } catch (err) {
      setError("Order processing failed.");
    }
  };

  const generateBill = (paymentTypeSelected, paymentMethodSelected) => {
    const tyreState = paymentTypeSelected === 'Online' ? 'Ordered' : 'Booked';
    const bill = {
      items: items.map(item => ({
        image: item.image,
        tyre_model: item.tyre_model,
        tyre_brand: item.tyre_brand,
        tyre_size: item.tyre_size,
        quantity: item.quantity || 1,
        total_price: Math.round(item.numericPrice * (item.quantity || 1)), // Round to nearest integer
      })),
      totalPrice: totalPrice,
      paymentType: paymentTypeSelected,
      paymentMethod: paymentMethodSelected,
      tyre_state: tyreState,
    };
    setBillData(bill);
    return bill;
  };

  const closeModal = () => {
    setPaymentSuccess(false);
    setBillData(null);
    onClose(); // Close the modal
  };

  // Function to handle bill download
  const handleDownload = () => {
    if (!billData) return;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Tyre Recipt", doc.internal.pageSize.getWidth() / 2, 22, { align: 'center' });
    doc.setFontSize(12);
    const tableColumn = [ "Tyre Model", "Tyre Brand", "Tyre Size", "Quantity", "Total Price"];
    const tableRows = [];

    billData.items.forEach(item => {
      const itemData = [
        // "", // Placeholder for Image
        item.tyre_model,
        item.tyre_brand,
        item.tyre_size,
        item.quantity,
        `₹${item.total_price}`
      ];
      tableRows.push(itemData);
    });

    // Add autoTable
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      theme: 'striped',
    });

    // Add summary
    const finalY = doc.lastAutoTable.finalY; // The y position where the table ended
    doc.text(`Total Price: ₹${billData.totalPrice}`, 14, finalY + 10);
    doc.text(`Payment Type: ${billData.paymentType}`, 14, finalY + 16);
    doc.text(`Payment Method: ${billData.paymentMethod}`, 14, finalY + 22);
    doc.text(`Tyre State: ${billData.tyre_state}`, 14, finalY + 28);

    // Save the PDF
    doc.save("bill.pdf");
  };

  // Rendering different views based on payment state
  const renderInitialOptions = () => (
    <div className="payment-options">
      <h2>Total Price: ₹<span>{totalPrice}</span></h2>
      <h2>Select Payment Type</h2>
      <button className="option-button" onClick={() => setPaymentType('Online')}>Online</button>
      <button className="option-button" onClick={() => setPaymentType('Offline')}>Offline</button>
    </div>
  );

  const renderOnlineOptions = () => (
    <div className="online-options">
      <h2>Select Payment Method</h2>
      <button className="option-button" onClick={() => setOnlinePaymentMethod('Card')}>Card</button>
      <button className="option-button" onClick={() => setOnlinePaymentMethod('Gpay')}>Gpay</button>
      <button className="back-button" onClick={() => { setPaymentType(null); setOnlinePaymentMethod(null); }}>Back</button>
    </div>
  );

  const renderOfflineOptions = () => (
    <div className="offline-options">
      <p className="not-deliverable">
        <span>On Cash Payment </span>
        (not deliverable)
      </p>
      <button className="book-order-button" onClick={handleBookOrder}>Book Order</button>
      <button className="back-button" onClick={() => setPaymentType(null)}>Back</button>
    </div>
  );

  const renderCardPayment = () => (
    <div className="card-payment">
      <h2>Pay Using Card</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Cardholder's Name"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          required
          className="cardholder-name-input"
        />
        <div className="card-info">
          <CardElement className="card-element" />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button
          type="submit"
          className="payment-button"
          disabled={isProcessing || !stripe}
        >
          {isProcessing ? "Processing…" : `Pay ₹${totalPrice}`}
        </button>
        <button className="back-button" type="button" onClick={() => setOnlinePaymentMethod(null)}>Back</button>
      </form>
    </div>
  );

  const renderGpayPayment = () => (
    <div className="gpay-payment">
      <h2>Scan the QR to Pay via Gpay</h2>
      <img src={QR_Gpay} alt="Gpay QR Code" className="gpay-qr" />
      <button className="payment-button" onClick={handleGpay}>Paid</button>
      <button className="back-button" onClick={() => setOnlinePaymentMethod(null)}>Back</button>
    </div>
  );

  const renderBill = () => (
    <div className="bill-container">
      <div className="bill-content">
        {/* <button className="close-bill-button" onClick={closeModal}>&times;</button> */}
        <h2 className="bill-title">Bill</h2>
        <table className="bill-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Tyre Model</th>
              <th>Tyre Brand</th>
              <th>Tyre Size</th>
              <th>Quantity</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {billData.items.map((item, index) => (
              <tr key={index}>
                <td><img src={item.image} alt={item.tyre_model} className="bill-item-image" /></td>
                <td>{item.tyre_model}</td>
                <td>{item.tyre_brand}</td>
                <td>{item.tyre_size}</td>
                <td>{item.quantity}</td>
                <td>₹{item.total_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="bill-summary">
          <table className="bill-table">
            <tbody>
              <tr>
                <td><strong>Total Price</strong></td>
                <td>₹ {billData.totalPrice}</td>
              </tr>
              <tr>
                <td><strong>Payment Type</strong></td>
                <td>{billData.paymentType}</td>
              </tr>
              <tr>
                <td><strong>Payment Method</strong></td>
                <td>{billData.paymentMethod}</td>
              </tr>
              <tr>
                <td><strong>Tyre State</strong></td>
                <td>{billData.tyre_state}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Download Button */}
        <button className="download-button" onClick={handleDownload}>Download</button>
      </div>
    </div>
  );

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button-payment" onClick={closeModal}>&times;</button>

        {/* If payment is successful, show the bill */}
        {paymentSuccess && billData ? (
          renderBill()
        ) : (
          <>
            {/* Render different sections based on paymentType and onlinePaymentMethod */}
            {!paymentType && renderInitialOptions()}

            {paymentType === 'Online' && !onlinePaymentMethod && renderOnlineOptions()}

            {paymentType === 'Online' && onlinePaymentMethod === 'Card' && renderCardPayment()}

            {paymentType === 'Online' && onlinePaymentMethod === 'Gpay' && renderGpayPayment()}

            {paymentType === 'Offline' && renderOfflineOptions()}
          </>
        )}
      </div>
    </div>
  );
};

export default Payment;
