import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Search, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { alternatives } from '@/data/db';
import AlternativeCard from '@/components/product/AlternativeCard';

const categories = [
  { value: 'all', label: 'الكل' },
  { value: 'food', label: 'طعام' },
  { value: 'beverages', label: 'مشروبات' },
  { value: 'personal_care', label: 'عناية' },
  { value: 'cleaning', label: 'تنظيف' },
  { value: 'snacks', label: 'وجبات' },
  { value: 'dairy', label: 'ألبان' },
];

export default function Alternatives() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('health');

  const isLoading = false;

  const filtered = alternatives
    .filter(a => {
      const matchesSearch = !search ||
        a.name_ar?.includes(search) ||
        a.name_en?.toLowerCase().includes(search.toLowerCase()) ||
        a.brand?.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'all' || a.category === category;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'health') return (b.health_score || 0) - (a.health_score || 0);
      if (sortBy === 'price_low') return (a.price_lyd || 0) - (b.price_lyd || 0);
      if (sortBy === 'price_high') return (b.price_lyd || 0) - (a.price_lyd || 0);
      return 0;
    });

  return (
    <div className="px-4 pt-6">

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-xl">
          <ArrowRight className="w-5 h-5" />
        </Button>
        <h1 className="font-cairo font-bold text-xl">البدائل المحلية</h1>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="ابحث عن بديل..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="font-cairo pr-10 h-11"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-4">
        <div className="overflow-x-auto flex-1">
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
      </div>

      {/* Sort */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-cairo text-sm text-muted-foreground">
          {filtered.length} بديل
        </span>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-36 h-8 font-cairo text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="health" className="font-cairo text-xs">الأصح أولاً</SelectItem>
            <SelectItem value="price_low" className="font-cairo text-xs">الأرخص أولاً</SelectItem>
            <SelectItem value="price_high" className="font-cairo text-xs">الأغلى أولاً</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results */}
      {isLoading ? null : filtered.length > 0 ? (
        <div className="space-y-3 pb-4">
          {filtered.map((alt, i) => (
            <AlternativeCard key={alt.id} alternative={alt} index={i} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <ShoppingBag className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
          <p className="font-cairo text-muted-foreground">لا توجد بدائل مسجلة</p>
        </div>
      )}

    </div>
  );
}