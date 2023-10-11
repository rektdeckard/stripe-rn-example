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
  console.log({product});

  const paymentIntent = await stripe.paymentIntents.create({
    amount: product.price * amount,
    currency: 'usd',
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send(paymentIntent);
});

app.post('/buy', async (req, res) => {
  console.log('BUY BABY');
});

app.listen(port, () => {
  console.log(`Server started, listening on port ${port}`);
});
