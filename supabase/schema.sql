-- Supabase schema for Luque's Cake & Treats (Zip 9459)
-- Run this in the SQL editor for your Supabase project.

-- Zones
create table zones (
  id serial primary key,
  name text not null,
  postcode text,
  fee numeric(10,2) not null,
  radius_km integer,
  created_at timestamptz default now()
);

-- Products
create table products (
  id serial primary key,
  title text not null,
  description text,
  price numeric(10,2) not null,
  images text[], -- storage paths
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Variants (size/flavor/option)
create table product_variants (
  id serial primary key,
  product_id integer references products(id) on delete cascade,
  name text not null,
  price_delta numeric(10,2) default 0,
  inventory integer default 100,
  created_at timestamptz default now()
);

-- Orders
create table orders (
  id serial primary key,
  user_id uuid, -- optional for guest
  customer_name text,
  customer_phone text,
  delivery_type text check (delivery_type in ('pickup','delivery')),
  zone_id integer references zones(id),
  delivery_address jsonb,
  pickup_time timestamptz,
  total numeric(10,2) not null,
  payment_status text default 'pending',
  order_status text default 'new', -- new, preparing, ready, completed, canceled
  created_at timestamptz default now()
);

-- Order items
create table order_items (
  id serial primary key,
  order_id integer references orders(id) on delete cascade,
  product_id integer references products(id),
  variant_id integer references product_variants(id),
  title text,
  unit_price numeric(10,2),
  quantity integer default 1,
  notes text
);

-- Payments (server record)
create table payments (
  id serial primary key,
  order_id integer references orders(id),
  provider text,
  provider_payment_id text,
  status text,
  amount numeric(10,2),
  created_at timestamptz default now()
);

-- Seed zones
insert into zones (name, postcode, fee, radius_km) values
('Welkom CBD','9459',30.00,5),
('Nearby suburbs','9459',50.00,10),
('Outer suburbs',NULL,80.00,20),
('Beyond area',NULL,120.00,50);

-- Sample products
insert into products (title, description, price, images) values
('Classic Vanilla Cake','A moist vanilla cake with buttercream frosting.',450.00, array['cakes/vanilla-1.jpg']),
('Chocolate Brownies (6)','Fudgy brownies, pack of 6.',80.00, array['treats/brownies-6.jpg']);

-- Sample variants
insert into product_variants (product_id, name, price_delta, inventory) values
(1,'6 inch', -50.00, 10),
(1,'8 inch', 0.00, 8),
(1,'10 inch', 150.00, 4),
(2,'Pack of 6', 0.00, 25);
