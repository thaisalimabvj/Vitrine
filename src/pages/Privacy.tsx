import { motion } from 'motion/react';

export default function Privacy() {
  return (
    <div className="p-6 lg:p-12 max-w-4xl">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-[11px] uppercase tracking-[2px] font-bold text-gray-400 mb-6 uppercase">Jurídico</div>
        <h1 className="font-display text-5xl text-ink mb-12 italic border-b-[3px] border-brand-primary inline-block">Política de Privacidade</h1>
        
        <div className="font-sans text-muted leading-relaxed text-base space-y-10">
          <div>
            <p className="font-bold text-brand-primary uppercase tracking-widest text-xs mb-4">
              Importante: Divulgação de Afiliados
            </p>
            <div className="bg-white p-8 border border-gray-100 italic font-serif text-lg leading-relaxed text-ink/80">
              "Este site pode conter links afiliados. Como participante do programa Amazon Associates, posso ganhar comissões por compras qualificadas, sem custo adicional para você."
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="font-display text-2xl text-ink italic">Coleta de Informações</h2>
            <p>
              Não coletamos informações pessoais identificáveis de nossos visitantes, a menos que você as forneça voluntariamente através do nosso formulário de contato.
            </p>
          </div>
          
          <div className="space-y-4">
            <h2 className="font-display text-2xl text-ink italic">Cookies e Links de Terceiros</h2>
            <p>
              Nosso site contém links para sites externos, especificamente a Amazon. Quando você clica em um link de afiliado, um "cookie" pode ser colocado no seu navegador para garantir que o site de destino saiba que você veio através de nossa indicação.
            </p>
            <p>
              Recomendamos que você consulte as políticas de privacidade desses sites de terceiros, pois não temos controle sobre suas práticas de coleta de dados.
            </p>
          </div>
          
          <div className="space-y-4">
            <h2 className="font-display text-2xl text-ink italic">Uso das Informações</h2>
            <p>
              As informações fornecidas via formulário de contato serão utilizadas exclusivamente para responder às suas solicitações e nunca serão vendidas ou compartilhadas com terceiros.
            </p>
            <p>
              Em caso de dúvidas, entre em contato via: thaisalima.ofertas@gmail.com
            </p>
          </div>
          
          <p className="text-[10px] text-gray-300 uppercase tracking-widest mt-20">
            Última atualização: {new Date().toLocaleDateString()}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
