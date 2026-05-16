import React from 'react';
import { ShieldAlert, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BoycottBadge({ isBoycotted }) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-cairo font-bold text-sm ${
        isBoycotted
          ? 'bg-destructive/10 text-destructive border border-destructive/20'
          : 'bg-primary/10 text-primary border border-primary/20'
      }`}
    >
      {isBoycotted ? (
        <>
          <ShieldAlert className="w-5 h-5" />
          <span>منتج مقاطع ❌</span>
        </>
      ) : (
        <>
          <ShieldCheck className="w-5 h-5" />
          <span>منتج آمن ✅</span>
        </>
      )}
    </motion.div>
  );
}