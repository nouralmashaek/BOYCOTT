import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScanLine, Camera, Keyboard, ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';

export default function Scan() {
  const [manualMode, setManualMode] = useState(false);
  const [barcode, setBarcode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (barcode.trim()) {
      navigate(`/result?barcode=${barcode.trim()}`);
    }
  };

  return (
    <div className="px-4 pt-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-xl">
          <ArrowRight className="w-5 h-5" />
        </Button>
        <h1 className="font-cairo font-bold text-xl">مسح المنتج</h1>
      </div>

      {/* Scanner Area */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Card className="overflow-hidden">
          <div className="aspect-square bg-gradient-to-br from-muted to-accent/30 flex flex-col items-center justify-center relative">
            {/* Scanner Frame */}
            <div className="w-56 h-56 relative">
              <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-primary rounded-tl-xl" />
              <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-primary rounded-tr-xl" />
              <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-primary rounded-bl-xl" />
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-primary rounded-br-xl" />
              
              {/* Scanning line animation */}
              <motion.div
                className="absolute left-2 right-2 h-0.5 bg-primary/60"
                animate={{ top: ['10%', '90%', '10%'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Camera className="w-12 h-12 text-primary/30 mx-auto mb-2" />
                  <p className="font-cairo text-sm text-muted-foreground">
                    وجه الكاميرا على الباركود
                  </p>
                  <p className="font-cairo text-xs text-muted-foreground/60 mt-1">
                    أو أدخل الرقم يدوياً
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Manual Entry Toggle */}
      <div className="mt-4">
        <Button
          variant="outline"
          className="w-full font-cairo gap-2"
          onClick={() => setManualMode(!manualMode)}
        >
          <Keyboard className="w-4 h-4" />
          {manualMode ? 'إخفاء الإدخال اليدوي' : 'إدخال الباركود يدوياً'}
        </Button>
      </div>

      {/* Manual Entry */}
      <AnimatePresence>
        {manualMode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="mt-3 space-y-3">
              <Input
                type="text"
                placeholder="أدخل رقم الباركود..."
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                className="font-cairo text-center text-lg h-12 tracking-widest"
                dir="ltr"
              />
              <Button
                type="submit"
                className="w-full font-cairo font-bold gap-2 h-12"
                disabled={!barcode.trim()}
              >
                <Search className="w-4 h-4" />
                بحث عن المنتج
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tips */}
      <Card className="mt-5 p-4 bg-accent/50 border-accent">
        <h3 className="font-cairo font-bold text-sm mb-2">💡 نصائح للمسح</h3>
        <ul className="space-y-1.5 font-cairo text-xs text-muted-foreground">
          <li>• تأكد من وجود إضاءة كافية</li>
          <li>• قرّب الكاميرا من الباركود</li>
          <li>• الباركود عادة يكون على ظهر المنتج</li>
          <li>• يمكنك إدخال الرقم يدوياً إذا لم يعمل المسح</li>
        </ul>
      </Card>
    </div>
  );
}