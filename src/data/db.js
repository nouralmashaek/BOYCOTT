export const products = [
  {
    id: '1',
    barcode: '7290000000001',
    name_ar: 'كوكاكولا',
    name_en: 'Coca-Cola',
    brand: 'Coca-Cola',
    category: 'beverages',
    country_of_origin: 'USA',
    is_boycotted: true,
    boycott_reason: 'الشركة تدعم الاحتلال الإسرائيلي',
    image_url: '',
  },
  {
    id: '2',
    barcode: '7290000000002',
    name_ar: 'ماء ليبيانا',
    name_en: 'Libyana Water',
    brand: 'Libyana',
    category: 'beverages',
    country_of_origin: 'Libya',
    is_boycotted: false,
    boycott_reason: '',
    image_url: '',
  },
];

export const alternatives = [
  {
    id: '1',
    name_ar: 'عصير ليبي طبيعي',
    name_en: 'Libyan Natural Juice',
    brand: 'ليبي',
    category: 'beverages',
    replaces_category: 'beverages',
    health_score: 90,
    price_lyd: 5,
    is_libyan: true,
    available_in: 'طرابلس، بنغازي',
    image_url: '',
  },
];