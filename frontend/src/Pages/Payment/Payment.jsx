import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import './Payment.css';

const Payment = ({ onClose }) => { // Accept onClose prop
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardholderName, setCardholderName] = useState(""); 
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: cardholderName,
      },
    });

    if (error) {
      setError(error.message);
      setIsProcessing(false);
      return;
    }

    const response = await fetch("http://localhost:8080/user/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentMethodId: paymentMethod.id,
        amount: 5000,
      }),
    });

    const paymentResult = await response.json();

    if (paymentResult.error) {
      setError(paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Payment successful!");
        onClose(); // Call onClose to notify the Cart component
      }
    }
    setIsProcessing(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    onClose(); // Call onClose to notify the Cart component
  };

  return (
    isModalOpen && (
      <div className="modal-overlay" onClick={closeModal}>
        <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
          <button className="close-button-payment" onClick={closeModal}>&times;</button>
          <form onSubmit={handleSubmit} className="payment-form">
            <input
              type="text"
              placeholder="Cardholder Name"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              required
              className="cardholder-name-input"
            />
            <div className="card-info">
              <CardElement className="card-element" />
            </div>
            <button disabled={!stripe || isProcessing} type="submit" className="payment-button">
              {isProcessing ? "Processing…" : "Pay"}
            </button>
            {error && <div className="error">{error}</div>}
          </form>
        </div>
      </div>
    )
  );
};

export default Payment;
