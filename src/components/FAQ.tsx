import { useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Sheet, Container, Heading } from './Section'
import { PlusIcon, WhatsAppIcon } from './icons'
import { waLink, EASE } from '../lib/site'

const QA: { q: string; a: ReactNode }[] = [
  { q: 'O que é, na prática, antecipar um precatório?', a: 'É uma cessão de crédito. Você transfere para a Rezende o direito de receber aquele valor do poder público e recebe o pagamento à vista, agora. A partir daí, quem espera na fila somos nós.' },
  { q: 'Como tenho segurança de que vou receber?', a: 'A cessão é feita por escritura pública, lavrada em cartório, com as duas partes presentes. É um ato público, com fé pública, e o pagamento acontece dentro dessa formalização. Nada é combinado só por conversa.' },
  { q: 'Vocês compram qualquer precatório?', a: 'Analisamos precatórios federais, estaduais e municipais, além de RPV. Cada crédito passa por uma análise antes da proposta, porque a situação do processo e o ente devedor mudam a operação.' },
  { q: 'Posso antecipar só uma parte do crédito?', a: 'Em muitos casos sim, é possível ceder parte do valor e continuar na fila com o restante. Isso é avaliado caso a caso na análise.' },
  { q: 'E os honorários do meu advogado?', a: 'Entram na conversa desde o começo. O ideal é que o seu advogado participe da operação, e a parte dele é respeitada na formalização.' },
  { q: 'Quanto tempo leva?', a: 'Depende da documentação e da agenda do cartório. Com os documentos em mãos, o caminho é curto: análise, proposta, escritura e pagamento.' },
  { q: 'Preciso ir até vocês?', a: 'A conversa começa pelo WhatsApp, de onde você estiver. A assinatura acontece no cartório, que é onde a operação ganha segurança jurídica.' },
  { q: 'Sou advogado e tenho clientes nessa situação. Dá para trabalharmos juntos?', a: 'Dá. Temos canal para parceria com advogados que acompanham carteiras de precatórios. Chama no WhatsApp que a gente explica como funciona.' },
]

function Item({ q, a, aberto, onToggle, id }: { q: string; a: ReactNode; aberto: boolean; onToggle: () => void; id: string }) {
  return (
    <div className={`rounded-[24px] border transition-colors duration-300 ${aberto ? 'border-azul/30 bg-white shadow-[0_20px_50px_-34px_rgba(12,33,73,.5)]' : 'border-tinta/[.09] bg-white/60'}`}>
      <h3>
        <button onClick={onToggle} aria-expanded={aberto} aria-controls={id} className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left sm:px-7 sm:py-6">
          <span className="font-display text-[19px] leading-snug text-tinta sm:text-[22px]">{q}</span>
          <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all duration-300 ${aberto ? 'rotate-45 bg-marinho text-papel' : 'bg-tinta/[.06] text-marinho'}`}>
            <PlusIcon className="h-4 w-4" />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {aberto && (
          <motion.div id={id} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: EASE }} className="overflow-hidden">
            <p className="px-6 pb-6 text-[16px] leading-relaxed text-tinta/65 sm:px-7 sm:pb-7">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [aberto, setAberto] = useState(0)
  return (
    <Sheet id="duvidas" tone="light">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Heading tone="light" kicker="Dúvidas" title={<>Perguntas que <span className="italic text-azul">todo mundo faz</span>.</>} lead="Se a sua não estiver aqui, pergunte direto. Respondemos sem enrolação." />
          <a href={waLink('Olá! Tenho uma dúvida sobre antecipação de precatório: ')} target="_blank" rel="noopener noreferrer"
            className="btn-linha-escura mt-8 inline-flex h-13 items-center gap-2.5 rounded-full px-6 py-3.5 text-[15.5px] font-semibold">
            <WhatsAppIcon className="h-[17px] w-[17px] text-azul" />
            Perguntar agora
          </a>
        </div>
        <div className="flex flex-col gap-3">
          {QA.map((item, i) => (
            <Item key={item.q} id={`faq-${i}`} q={item.q} a={item.a} aberto={aberto === i} onToggle={() => setAberto(aberto === i ? -1 : i)} />
          ))}
        </div>
      </Container>
    </Sheet>
  )
}
