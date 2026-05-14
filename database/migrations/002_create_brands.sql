-- Parent companies / brands
CREATE TABLE brands (
  id              SERIAL PRIMARY KEY,
  name            VARCHAR(150) NOT NULL,
  name_ar         VARCHAR(150),
  slug            VARCHAR(150) NOT NULL UNIQUE,      -- e.g. "coca-cola"
  parent_company  VARCHAR(150),                       -- e.g. "The Coca-Cola Company"
  country_of_origin VARCHAR(100),
  logo_url        TEXT,
  website         TEXT,
  is_boycotted    BOOLEAN NOT NULL DEFAULT FALSE,
  boycott_reason  TEXT,                               -- why it's boycotted
  boycott_reason_ar TEXT,                             -- Arabic reason
  boycott_since   DATE,                               -- when boycott started
  boycott_sources TEXT[],                             -- array of source URLs
  verified        BOOLEAN DEFAULT FALSE,              -- admin verified
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Fast lookup on slug and boycott status
CREATE INDEX idx_brands_slug        ON brands(slug);
CREATE INDEX idx_brands_boycotted   ON brands(is_boycotted);
CREATE INDEX idx_brands_name        ON brands USING gin (
  to_tsvector('english', COALESCE(name, ''))
);