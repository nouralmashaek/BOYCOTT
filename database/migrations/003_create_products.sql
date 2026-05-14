-- Individual products under a brand
CREATE TABLE products (
  id            SERIAL PRIMARY KEY,
  name          VARCHAR(200) NOT NULL,
  name_ar       VARCHAR(200),
  slug          VARCHAR(200) NOT NULL UNIQUE,
  brand_id      INTEGER NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  category_id   INTEGER REFERENCES categories(id),
  barcode       VARCHAR(50) UNIQUE,                  -- EAN/UPC barcode for scanner
  description   TEXT,
  description_ar TEXT,
  image_url     TEXT,
  tags          TEXT[],                              -- searchable tags e.g. ['soda','cola','soft drink']
  is_boycotted  BOOLEAN GENERATED ALWAYS AS (FALSE) STORED, -- computed later via trigger
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Drop the generated column and replace with a real one + trigger
ALTER TABLE products DROP COLUMN is_boycotted;
ALTER TABLE products ADD COLUMN is_boycotted BOOLEAN NOT NULL DEFAULT FALSE;

-- Trigger: auto-set product boycott status from its brand
CREATE OR REPLACE FUNCTION sync_product_boycott()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE products
  SET is_boycotted = NEW.is_boycotted
  WHERE brand_id = NEW.id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_brand_boycott_sync
AFTER UPDATE OF is_boycotted ON brands
FOR EACH ROW EXECUTE FUNCTION sync_product_boycott();

-- Indexes
CREATE INDEX idx_products_brand      ON products(brand_id);
CREATE INDEX idx_products_category   ON products(category_id);
CREATE INDEX idx_products_barcode    ON products(barcode);
CREATE INDEX idx_products_boycotted  ON products(is_boycotted);
CREATE INDEX idx_products_search     ON products USING gin (
  to_tsvector(
    'english',
    COALESCE(name, '') || ' ' ||
    COALESCE(array_to_string(tags, ' '), '')
  )
);
