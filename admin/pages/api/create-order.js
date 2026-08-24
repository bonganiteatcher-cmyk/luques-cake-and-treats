import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const {
    customer_name,
    customer_phone,
    delivery_type,
    zone_id,
    delivery_address,
    pickup_time,
    items,
    total,
    paymentIntentId
  } = req.body;

  if (!total || !items || !Array.isArray(items)) {
    return res.status(400).json({ error: 'Missing order data' });
  }

  try {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return res.status(500).json({ error: 'Supabase service key not configured' });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Create order
    const orderPayload = {
      user_id: null,
      customer_name: customer_name || 'Guest',
      customer_phone: customer_phone || null,
      delivery_type: delivery_type || 'pickup',
      zone_id: zone_id || null,
      delivery_address: delivery_address || null,
      pickup_time: pickup_time || null,
      total: total,
      payment_status: 'paid',
      order_status: 'new'
    };

    const { data: orderData, error: orderError } = await supabase.from('orders').insert(orderPayload).select().single();
    if (orderError) throw orderError;

    const orderId = orderData.id;

    // Insert order items
    const itemsPayload = items.map(i => ({
      order_id: orderId,
      product_id: i.product_id || null,
      variant_id: i.variant_id || null,
      title: i.title || null,
      unit_price: i.unit_price || 0,
      quantity: i.quantity || 1,
      notes: i.notes || null
    }));

    const { error: itemsError } = await supabase.from('order_items').insert(itemsPayload);
    if (itemsError) throw itemsError;

    // Record payment
    const paymentPayload = {
      order_id: orderId,
      provider: 'stripe',
      provider_payment_id: paymentIntentId || null,
      status: 'succeeded',
      amount: total
    };

    const { error: paymentError } = await supabase.from('payments').insert(paymentPayload);
    if (paymentError) throw paymentError;

    return res.status(200).json({ orderId });
  } catch (err) {
    console.error('create-order error', err);
    return res.status(500).json({ error: err.message });
  }
}
