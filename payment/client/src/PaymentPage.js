// import React, { useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import axios from 'axios';

// const stripePromise = loadStripe('your_stripe_public_key');

// const PaymentPage = () => {
//   const [name, setName] = useState('');
//   const [amount, setAmount] = useState('');
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const { data: { clientSecret, name, amount } } = await axios.post('http://localhost:3000/create-payment-intent', { amount, name });

//     const result = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: elements.getElement(CardElement),
//         billing_details: { name },
//       },
//     });

//     if (result.error) {
//       console.error(result.error.message);
//     } else {
//       if (result.paymentIntent.status === 'succeeded') {
//         const transactionId = result.paymentIntent.id;
//         await axios.post('http://localhost:3000/save-transaction', { name, amount, transactionId });
//         alert('Payment Successful');
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
//       <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required />
//       <CardElement />
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// const WrappedPaymentPage = () => (
//   <Elements stripe={stripePromise}>
//     <PaymentPage />
//   </Elements>
// );

// export default WrappedPaymentPage;



// import React, { useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import axios from 'axios';

// const stripePromise = loadStripe('your_stripe_public_key');

// const PaymentPage = () => {
//   const [name, setName] = useState('');
//   const [amount, setAmount] = useState('');
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:3000/create-payment-intent', { amount, name });
//       const { clientSecret } = response.data;

//       const result = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//           billing_details: { name },
//         },
//       });

//       if (result.error) {
//         console.error(result.error.message);
//       } else {
//         if (result.paymentIntent.status === 'succeeded') {
//           const transactionId = result.paymentIntent.id;
//           await axios.post('http://localhost:3000/save-transaction', { name, amount, transactionId });
//           alert('Payment Successful');
//         }
//       }
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
//       <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required />
//       <CardElement />
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// const WrappedPaymentPage = () => (
//   <Elements stripe={stripePromise}>
//     <PaymentPage />
//   </Elements>
// );

// export default WrappedPaymentPage;

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('your_stripe_public_key');

const PaymentPage = () => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/create-payment-intent', { amount, name });
      const { clientSecret } = response.data;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { name },
        },
      });

      if (result.error) {
        console.error(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          const transactionId = result.paymentIntent.id;
          await axios.post('http://localhost:3000/save-transaction', { name, amount, transactionId });
          alert('Payment Successful');
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required />
      <CardElement className="StripeElement" />
      <button type="submit">Submit</button>
    </form>
  );
};

const WrappedPaymentPage = () => (
  <Elements stripe={stripePromise}>
    <PaymentPage />
  </Elements>
);

export default WrappedPaymentPage;


