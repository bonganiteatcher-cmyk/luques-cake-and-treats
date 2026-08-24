### Server endpoints (Payments & Orders)

I added two server API endpoints (Next.js) to the admin app that will be used by the mobile app to perform secure server-side operations:

- POST /api/create-payment-intent
  - Request body: { amount: number, currency?: string }
  - Response: { clientSecret, id }
  - Creates a Stripe PaymentIntent using STRIPE_SECRET_KEY and returns the client secret to present a PaymentSheet on the mobile app.

- POST /api/create-order
  - Request body: { customer_name, customer_phone, delivery_type, zone_id, delivery_address, pickup_time, items: [], total, paymentIntentId }
  - Creates an `orders` row and `order_items`, then records a `payments` row using SUPABASE_SERVICE_ROLE_KEY.

Important: these endpoints require the following environment variables to be set (server / repo secrets):
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY
- STRIPE_SECRET_KEY

Do NOT commit any keys to the repository. Add them in GitHub → Settings → Secrets before deploying.
