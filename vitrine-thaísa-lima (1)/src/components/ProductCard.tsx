import { motion } from 'motion/react';
import { ExternalLink, Star } from 'lucide-react';

export interface Product {
  id: string | number;
  title: string;
  description: string;
  opinion: string;
  price: string;
  image: string;
  amazonUrl: string;
  rating: number;
  createdAt?: any;
}

export default function ProductCard({ product }: { product: Product, key?: number | string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="bg-white border border-gray-100 p-4 flex flex-col justify-between h-full"
    >
      <div>
        <div className="aspect-[4/3] relative overflow-hidden bg-gray-50 mb-4">
          <img
            src={product.image}
            alt={product.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>
        
        <h3 className="font-sans font-bold text-base text-ink mb-1">
          {product.title}
        </h3>
        
        <p className="font-sans text-[12px] text-muted leading-relaxed mb-4">
          {product.description}
        </p>

        <div className="bg-[#fdf5ef] p-3 border-l-2 border-brand-primary mb-6">
          <p className="font-serif italic text-[11px] text-ink">
            {product.opinion}
          </p>
        </div>
      </div>

      <a
        href={product.amazonUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-ink text-white text-[11px] font-bold uppercase tracking-widest py-3 text-center hover:bg-brand-primary transition-colors"
      >
        Ver na Amazon
      </a>
    </motion.div>
  );
}
