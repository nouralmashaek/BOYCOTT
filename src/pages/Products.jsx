import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Search, Filter, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { products } from '@/data/db';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '@/components/product/ProductCard';

const categories = [
  { value: 'all', label: 'الكل' },
  { value: 'food', label: 'طعام' },
  { value: 'beverages', label: 'مشروبات' },
  { value: 'personal_care', label: 'عناية' },
  { value: 'cleaning', label: 'تنظيف' },
  { value: 'snacks', label: 'وجبات' },
  { value: 'dairy', label: 'ألبان' },
];

export default function Products() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const isLoading = false;

  const filtered = products.filter(p => {
    const matchesSearch = !search ||
      p.name_ar?.includes(search) ||
      p.name_en?.toLowerCase().includes(search.toLowerCase()) ||
      p.brand?.toLowerCase().includes(search.toLowerCase()) ||
      p.barcode?.includes(search);
    const matchesCategory = category === 'all' || p.category === category;
    return matchesSearch && matchesCategory;
  });

  const boycotted = filtered.filter(p => p.is_boycotted);
  const safe = filtered.filter(p => !p.is_boycotted);

  return (
    <div className="px-4 pt-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-xl">
          <ArrowRight className="w-5 h-5" />
        </Button>
        <h1 className="font-cairo font-bold text-xl">المنتجات</h1>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="ابحث بالاسم أو الباركود..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="font-cairo pr-10 h-11"
        />
      </div>

      {/* Category Filter */}
      <div className="overflow-x-auto -mx-4 px-4 mb-4">
        <Tabs value={category} onValueChange={setCategory}>
          <TabsList className="bg-muted/50 w-max">
            {categories.map(c => (
              <TabsTrigger key={c.value} value={c.value} className="font-cairo text-xs px-3">
                {c.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Results */}
      {isLoading ? null : (
  <>
          {boycotted.length > 0 && (
            <div className="mb-4">
              <h2 className="font-cairo font-bold text-sm text-destructive flex items-center gap-1.5 mb-2">
                <ShieldAlert className="w-4 h-4" />
                منتجات مقاطعة ({boycotted.length})
              </h2>
              <div className="space-y-2">
                {boycotted.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
              </div>
            </div>
          )}
          {safe.length > 0 && (
            <div className="mb-4">
              <h2 className="font-cairo font-bold text-sm text-primary flex items-center gap-1.5 mb-2">
                منتجات آمنة ({safe.length})
              </h2>
              <div className="space-y-2">
                {safe.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
              </div>
            </div>
          )}
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="font-cairo text-muted-foreground">لا توجد نتائج</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}