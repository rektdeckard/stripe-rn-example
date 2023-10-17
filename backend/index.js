'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

const stripe = require('stripe')(
  'sk_test_51NzmdrDWNuWgSjc6iH2AGyyKQZkztIXpwDewUinkaAw4tQNo1Hi8ucrdtFzsZWsDxyACqKPHYSBTvo4EAvyG0taK00SxlHEOuo',
);

app.post('/generate-invoice', () => {});

app.post('/pay-intent', async (req, res) => {
  const {product, amount} = req.body;
  console.log({product, amount});

  const paymentIntent = await stripe.paymentIntents.create({
    payment_method_types: ['card'],
    amount: product.price * amount,
    currency: 'usd',
  });

  res.send(paymentIntent);
});

app.post('/buy', async (req, res) => {
  console.log('BUY BABY');
});

app.listen(port, () => {
  console.log(`Server started, listening on port ${port}`);
});
