import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ScanLine, Home, ShoppingBag, Search } from 'lucide-react';

const navItems = [
  { path: '/', icon: Home, label: 'الرئيسية', labelEn: 'Home' },
  { path: '/scan', icon: ScanLine, label: 'مسح', labelEn: 'Scan' },
  { path: '/products', icon: Search, label: 'المنتجات', labelEn: 'Products' },
  { path: '/alternatives', icon: ShoppingBag, label: 'البدائل', labelEn: 'Alternatives' },
];

export default function MobileNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-t border-border safe-area-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-all duration-200 ${
                isActive ? 'bg-primary/10' : ''
              }`}>
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className="text-[10px] font-cairo font-semibold">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}