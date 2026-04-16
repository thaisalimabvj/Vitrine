import { motion } from 'motion/react';
import ProductCard, { Product } from '../components/ProductCard';
import { useState, useEffect } from 'react';
import { subscribeToProducts } from '../services/productService';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToProducts((data) => {
      setProducts(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="p-6 lg:p-12">
      {/* Hero Section */}
      <header className="mb-10 lg:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-4xl lg:text-7xl text-ink leading-none mb-4">
            Top 5 produtos para casa em 2026
          </h1>
          <p className="font-serif italic text-lg lg:text-xl text-muted mb-2">
            Produtos que facilitam a rotina de dona de casa.
          </p>
          <div className="text-[11px] uppercase tracking-[2px] font-bold text-brand-primary">
            Achadinhos da Amazon que valem a pena
          </div>
        </motion.div>
      </header>

      {/* Product Grid */}
      <section>
        {loading ? (
          <div className="py-20 text-center font-serif italic text-muted">Buscando melhores ofertas...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {products.length === 0 && (
              <div className="bg-[#f9f9f9] border border-dashed border-gray-300 flex items-center justify-center p-8 text-center min-h-[300px]">
                <span className="font-sans text-[12px] uppercase tracking-widest text-gray-400 font-bold">
                  Novas ofertas<br />em breve
                </span>
              </div>
            )}
            {products.length > 0 && products.length < 5 && (
              <div className="bg-[#f9f9f9] border border-dashed border-gray-300 flex items-center justify-center p-8 text-center min-h-[300px]">
                <span className="font-sans text-[12px] uppercase tracking-widest text-gray-400 font-bold">
                  Novas ofertas<br />todos os dias
                </span>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Simplified CTA for Editorial Theme */}
      <section className="mt-20 lg:mt-32 border-t border-gray-100 pt-16 pb-20 max-w-2xl">
        <h2 className="font-display text-3xl italic text-ink mb-6">Não perca nenhuma oferta.</h2>
        <p className="font-sans text-sm text-muted mb-8 leading-relaxed">
          Siga-nos nas redes sociais para ver os achadinhos em tempo real e garantir os melhores cupons de desconto.
        </p>
        <a 
          href="https://www.instagram.com/thay_dicaseofertas" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block bg-ink text-white font-sans text-xs font-bold uppercase tracking-widest px-10 py-4 hover:bg-brand-primary transition-colors"
        >
          Ver no Instagram
        </a>
      </section>
    </div>
  );
}
