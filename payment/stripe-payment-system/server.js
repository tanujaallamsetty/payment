const express = require('express');
const stripe = require('stripe')('your_stripe_secret_key');
const admin = require('firebase-admin');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault()
});
const db = admin.firestore();

// Payment Endpoint
app.post('/create-payment-intent', async (req, res) => {
  const { amount, name } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe expects the amount in cents
      currency: 'usd',
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
      name,
      amount,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Endpoint to Save Transaction
app.post('/save-transaction', async (req, res) => {
  const { name, amount, transactionId } = req.body;

  try {
    await db.collection('transactions').add({
      name,
      amount,
      transactionId,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });
    res.status(200).send('Transaction saved successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Endpoint to Fetch Transactions
app.get('/transactions', async (req, res) => {
  try {
    const snapshot = await db.collection('transactions').get();
    const transactions = snapshot.docs.map(doc => doc.data());
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
