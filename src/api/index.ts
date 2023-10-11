import {Product} from '../types';

export default {
  setupPayment: async (product: Product, amount: number) => {
    const res = await fetch('http://127.0.0.1:5000/pay-intent', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({product, amount}),
    });
    return res.json();
  },
};
