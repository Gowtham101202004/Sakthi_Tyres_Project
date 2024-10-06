const stripe = require("stripe")("sk_test_51Q5g2GD7L0PMiSZDhFvmNhs9e8WhuuSk8rACVYS4yC1fDiJGHJafxENgjZaoydq8PidAyPtfcnCY5aUOfwW5ooXG00pOW8Q5Jz"); // Your Stripe secret key
const createPaymentIntent = async (req, res) => {
  const { paymentMethodId, amount, returnUrl } = req.body; 

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "inr", 
      payment_method: paymentMethodId,
      amount: 5000,
      confirm: true,
      // return_url: returnUrl, 
      automatic_payment_methods: {
        enabled: true, 
        allow_redirects: 'never', 
      }
    });

    res.send({ paymentIntent });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = { createPaymentIntent };
