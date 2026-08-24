# Luque's Cake & Treats — "Zip 9459" starter scaffold

Overview
- Mobile: Expo (React Native) app (customer-facing) with product catalog, cart skeleton, checkout placeholders.
- Admin: Next.js web dashboard (product CRUD and orders list skeleton).
- Backend: Supabase (Postgres + Auth + Storage). SQL schema & seed included.
- Payments: Stripe placeholders (test mode). For full mobile card/ApplePay/GooglePay you will need EAS builds and stripe-react-native plugin.

Quick start (local)
1. Create a Supabase project and copy SUPABASE_URL and SUPABASE_ANON_KEY (and SERVICE_ROLE key for server operations).
2. Run SQL in supabase/schema.sql to create tables and seed sample data.
3. Create a Stripe account (South Africa) and capture keys for test mode.
4. Copy .env.example -> .env.local (admin) and mobile/.env (mobile) and fill values.

Admin (Next.js)
cd admin
npm install
cp .env.example .env.local  # fill values
npm run dev

Mobile (Expo)
cd mobile
npm install
# create mobile/.env with SUPABASE_URL and SUPABASE_ANON_KEY and STRIPE keys
npx expo start

Notes
- Mobile Stripe Native integrations require EAS builds and adding stripe-react-native plugin; for development the scaffold uses Stripe test placeholders.
- Push notifications require Expo push credentials and EAS.
- Replace seed data with your real products and images (Supabase Storage recommended).

If you want I will:
- Create a GitHub repo and push everything (provide owner/repo).
- Set up a CI pipeline, EAS config, or integrate stripe-react-native and implement full PaymentSheet flow.