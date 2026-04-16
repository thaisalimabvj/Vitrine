import { Link, Outlet } from 'react-router-dom';
import { ShoppingBag, Info, Mail, ShieldCheck, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Achadinhos', path: '/', icon: <ShoppingBag size={18} /> },
    { name: 'Sobre a Vitrine', path: '/sobre', icon: <Info size={18} /> },
    { name: 'Contato Direto', path: '/contato', icon: <Mail size={18} /> },
    { name: 'Privacidade', path: '/privacidade', icon: <ShieldCheck size={18} /> }
  ];

  return (
    <div className="min-h-screen bg-brand-bg font-sans text-ink lg:grid lg:grid-cols-[300px_1fr] lg:grid-rows-[1fr_auto]">
      {/* Mobile Navigation Header */}
      <header className="lg:hidden sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-4 flex justify-between items-center">
        <Link to="/" className="font-display text-2xl italic border-b-2 border-brand-primary">Vitrine Thaísa Lima</Link>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-ink focus:outline-none"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col justify-between bg-white border-r border-gray-100 p-10 h-screen sticky top-0">
        <div>
          <Link to="/" className="inline-block font-display text-3xl italic border-b-[3px] border-brand-primary mb-10">
            Vitrine Thaísa Lima
          </Link>
          
          <nav className="space-y-6">
            <div className="text-[11px] uppercase tracking-widest font-bold text-brand-primary mb-4">Navegação</div>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="flex items-center space-x-3 text-sm font-medium text-muted hover:text-ink transition-colors"
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>

          <div className="mt-16">
            <div className="text-[11px] uppercase tracking-widest font-bold text-brand-primary mb-4">A Curadoria</div>
            <p className="text-sm leading-relaxed text-muted mb-8">
              A Vitrine Thaísa Lima é um site dedicado a encontrar os melhores produtos com ótimo custo-benefício para facilitar sua rotina.
            </p>
            
            <div className="text-[11px] uppercase tracking-widest font-bold text-brand-primary mb-4">Conecte-se</div>
            <div className="text-[12px] text-muted space-y-1">
              <p>Email: thaisalima.ofertas@gmail.com</p>
              <p>Instagram: @thay_dicaseofertas</p>
            </div>
          </div>
        </div>

        <div className="text-[10px] text-gray-300 uppercase tracking-tight">
          © {new Date().getFullYear()} VITRINE THAÍSA LIMA
        </div>
      </aside>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed inset-0 z-40 lg:hidden bg-white p-8 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-display text-2xl italic border-b-2 border-brand-primary">Vitrine Thaísa Lima</span>
              <button onClick={() => setIsMenuOpen(false)}><X size={24} /></button>
            </div>
            <nav className="space-y-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-4 text-xl font-medium text-muted hover:text-ink"
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="lg:min-h-screen">
        <Outlet />
      </main>

      {/* Footer Bar - Editorial Style */}
      <footer className="lg:col-span-2 bg-ink text-white/90 px-4 lg:px-10 py-6 text-[11px] leading-relaxed">
        <div className="max-w-7xl mx-auto">
          <span className="text-brand-primary font-bold uppercase mr-3">Política de Privacidade:</span>
          Este site contém links afiliados. Como participante do programa Amazon Associates, posso ganhar comissões por compras qualificadas através de nossos links, sem qualquer custo adicional para você. Valorizamos a transparência e apenas indicamos o que realmente confiamos.
        </div>
      </footer>
    </div>
  );
}
