import { motion } from 'motion/react';

export default function About() {
  return (
    <div className="p-6 lg:p-12 max-w-4xl">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-[11px] uppercase tracking-[2px] font-bold text-gray-400 mb-6 uppercase">Sobre Nós</div>
        <h1 className="font-display text-5xl lg:text-7xl text-ink mb-12 italic border-b-[3px] border-brand-primary inline-block">Fazemos a curadoria para o seu lar.</h1>
        
        <div className="space-y-8 font-sans text-muted leading-relaxed text-base">
          <p>
            A <strong>Vitrine Thaísa Lima</strong> nasceu da paixão por encontrar soluções inteligentes que realmente funcionam no dia a dia. Sabemos que a rotina de cuidar de uma casa pode ser exaustiva, mas os produtos certos podem transformá-la em algo muito mais leve e prazeroso.
          </p>
          
          <p>
            Nosso objetivo é pesquisar, testar e selecionar apenas o que há de melhor em custo-benefício na Amazon. Não indicamos apenas produtos; indicamos facilidade, organização e beleza para o seu cantinho.
          </p>
          
          <div className="bg-[#fdfaf6] p-8 lg:p-12 border-l-4 border-brand-primary">
            <h2 className="font-display text-2xl text-ink mb-4 italic uppercase tracking-tight">Nossa Missão</h2>
            <p className="font-serif text-xl italic text-ink/80 opacity-70">
              "Ajudar donas de casa e entusiastas da organização a encontrarem produtos que tragam mais tempo livre e alegria para dentro de casa."
            </p>
          </div>

          <p>
            Somos apaixonados por <strong>achadinhos</strong> e acreditamos que você não precisa gastar uma fortuna para ter uma casa digna de revista. Tudo começa com escolhas inteligentes.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
