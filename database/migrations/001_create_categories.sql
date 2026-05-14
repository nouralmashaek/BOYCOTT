-- Categories for products (food, beverages, tech, clothing, etc.)
CREATE TABLE categories (
  id        SERIAL PRIMARY KEY,
  name      VARCHAR(100) NOT NULL UNIQUE,
  name_ar   VARCHAR(100),               -- Arabic name
  icon      VARCHAR(50),                -- emoji or icon key
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO categories (name, name_ar, icon) VALUES
  ('Food & Beverages', 'طعام ومشروبات', '🍔'),
  ('Fast Food', 'وجبات سريعة', '🍟'),
  ('Beverages', 'مشروبات', '☕'),
  ('Snacks', 'وجبات خفيفة', '🍫'),
  ('Dairy', 'منتجات الألبان', '🥛'),
  ('Retail', 'تسوق', '🛍️');
