const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { amount, currency = 'ZAR' } = req.body;
    if (!amount) return res.status(400).json({ error: 'Missing amount' });

    // Stripe expects amount in the smallest currency unit (cents)
    const unitAmount = Math.round(Number(amount) * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: unitAmount,
      currency: (currency || 'ZAR').toLowerCase(),
      payment_method_types: ['card'],
      // You can expand metadata here with order references if you want
    });

    return res.status(200).json({ clientSecret: paymentIntent.client_secret, id: paymentIntent.id });
  } catch (err) {
    console.error('create-payment-intent error', err);
    return res.status(500).json({ error: err.message });
  }
}
