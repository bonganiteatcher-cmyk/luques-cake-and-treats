import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function AdminHome() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(20).then(r => { if (!r.error) setOrders(r.data || []); });
    supabase.from('products').select('*').then(r => { if (!r.error) setProducts(r.data || []); });
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>Zip 9459 — Admin</h1>
      <section>
        <h2>Recent orders</h2>
        <ul>
          {orders.map(o => <li key={o.id}>#{o.id} — {o.customer_name || 'Guest'} — {o.order_status} — R{o.total}</li>)}
        </ul>
      </section>
      <section>
        <h2>Products</h2>
        <ul>
          {products.map(p => <li key={p.id}>{p.title} — R{p.price}</li>)}
        </ul>
      </section>
      <p>Next: wire up admin auth, product CRUD, order detail & status update endpoints using service role key on server-side.</p>
    </div>
  );
}
