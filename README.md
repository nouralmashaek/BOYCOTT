# BOYCOTT
application designed for the Libyan market, helps consumers identify boycotted products and suggests local alternatives.

Frontend :
React Native .
Single codebase for both iOS & Android.
Fast development, large community.

Backend :
Node.js + Express (REST API).
Lightweight and fast for this kind of lookup app.
Easy to build endpoints, returns boycott status + alternatives.
Can later add an admin panel to manage the product list.

Database :
Two databases.
Product & boycott PostgreSQL, reliable, easy to query.
Fast product search, Redis, Cache frequent lookups, instant response.

PostgreSQL:
products table → name, brand, category, is_boycotted, reason, logo.
alternatives table → linked to boycotted products, local/non-boycotted options.
brands table → parent company info.

Mobile App (React Native).
        ↓
    REST API (Node/Express).
        ↓
  PostgreSQL (Supabase).
  + Redis (cache).

