import { motion } from 'motion/react';
import { Send, MapPin, Mail, Instagram } from 'lucide-react';

export default function Contact() {
  return (
    <div className="p-6 lg:p-12 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-[11px] uppercase tracking-[2px] font-bold text-gray-400 mb-6 uppercase">Contato</div>
          <h1 className="font-display text-5xl lg:text-7xl text-ink mb-12 italic border-b-[3px] border-brand-primary inline-block">Vamos conversar?</h1>
          <p className="font-sans text-base text-muted mb-12 leading-relaxed">
            Tem alguma dúvida sobre um produto ou gostaria de sugerir um achadinho? Adoramos ouvir nossos leitores!
          </p>

          <div className="space-y-10">
            <div className="flex items-start space-x-6">
              <Mail className="text-brand-primary mt-1" size={20} />
              <div>
                <p className="font-sans text-xs uppercase tracking-widest font-bold text-gray-400 mb-1">Email</p>
                <p className="font-sans text-lg text-ink">thaisalima.ofertas@gmail.com</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-6">
              <Instagram className="text-brand-primary mt-1" size={20} />
              <div>
                <p className="font-sans text-xs uppercase tracking-widest font-bold text-gray-400 mb-1">Instagram</p>
                <p className="font-sans text-lg text-ink">@thay_dicaseofertas</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white p-8 lg:p-12 border border-gray-100"
        >
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-6">
              <div>
                <label className="block font-sans text-[11px] uppercase tracking-widest font-bold mb-3 text-gray-400">Nome</label>
                <input
                  type="text"
                  placeholder="Seu nome"
                  className="w-full bg-brand-bg/30 border-b border-gray-200 py-3 font-sans focus:border-brand-primary outline-none transition-all"
                />
              </div>
              <div>
                <label className="block font-sans text-[11px] uppercase tracking-widest font-bold mb-3 text-gray-400">Email</label>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full bg-brand-bg/30 border-b border-gray-200 py-3 font-sans focus:border-brand-primary outline-none transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block font-sans text-[11px] uppercase tracking-widest font-bold mb-3 text-gray-400">Mensagem</label>
              <textarea
                rows={4}
                placeholder="Como podemos ajudar?"
                className="w-full bg-brand-bg/30 border-b border-gray-200 py-3 font-sans focus:border-brand-primary outline-none transition-all resize-none"
              ></textarea>
            </div>
            <button className="w-full bg-ink text-white font-sans text-xs font-bold uppercase tracking-widest py-4 hover:bg-brand-primary transition-colors">
              Enviar Mensagem
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
