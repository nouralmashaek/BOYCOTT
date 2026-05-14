-- Libyan / non-boycotted alternatives for boycotted products/brands
CREATE TABLE alternatives (
  id                  SERIAL PRIMARY KEY,
  boycotted_brand_id  INTEGER REFERENCES brands(id) ON DELETE CASCADE,
  boycotted_product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,

  -- The alternative can be a local Libyan brand OR a non-boycotted brand
  alt_brand_name      VARCHAR(200) NOT NULL,
  alt_brand_name_ar   VARCHAR(200),
  alt_product_name    VARCHAR(200),
  alt_product_name_ar VARCHAR(200),
  alt_image_url       TEXT,
  alt_brand_logo_url  TEXT,

  is_libyan           BOOLEAN DEFAULT FALSE,         -- is it a Libyan product?
  is_available_in_ly  BOOLEAN DEFAULT TRUE,          -- available in Libyan market?
  category_id         INTEGER REFERENCES categories(id),

  similarity_score    SMALLINT CHECK (similarity_score BETWEEN 1 AND 5), -- how close is it (1-5)
  notes               TEXT,                          -- e.g. "available in most Libyan supermarkets"
  notes_ar            TEXT,
  verified            BOOLEAN DEFAULT FALSE,

  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW(),

  -- Must link to either a brand or a product, not neither
  CONSTRAINT chk_alt_target CHECK (
    boycotted_brand_id IS NOT NULL OR boycotted_product_id IS NOT NULL
  )
);

CREATE INDEX idx_alt_brand    ON alternatives(boycotted_brand_id);
CREATE INDEX idx_alt_product  ON alternatives(boycotted_product_id);
CREATE INDEX idx_alt_libyan   ON alternatives(is_libyan);


-- User reports / community suggestions
CREATE TABLE alternative_reports (
  id              SERIAL PRIMARY KEY,
  alternative_id  INTEGER REFERENCES alternatives(id) ON DELETE CASCADE,
  report_type     VARCHAR(50) CHECK (report_type IN ('upvote','downvote','incorrect','suggest')),
  comment         TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
