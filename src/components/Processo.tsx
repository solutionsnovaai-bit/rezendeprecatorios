import { motion } from 'framer-motion'
import { Sheet, Container, Heading } from './Section'
import { EASE, waLink } from '../lib/site'
import { WhatsAppIcon } from './icons'

const PASSOS = [
  { n: '01', titulo: 'Você envia os dados do precatório', texto: 'Número do processo, tribunal e ente devedor. Se não tiver em mãos, a gente ajuda a localizar.' },
  { n: '02', titulo: 'Análise e proposta', texto: 'Conferimos a situação do crédito e apresentamos a proposta por escrito, sem compromisso e sem custo.' },
  { n: '03', titulo: 'Escritura pública em cartório', texto: 'A cessão é formalizada em cartório, por escritura pública, com a presença das partes. É o que dá segurança jurídica para os dois lados.', destaque: true },
  { n: '04', titulo: 'Pagamento à vista', texto: 'Com a escritura assinada, o valor combinado é transferido para a sua conta.' },
]

export default function Processo() {
  return (
    <Sheet id="como-funciona" tone="paper">
      <Container>
        <Heading
          tone="light"
          kicker="Como funciona"
          title={<>Quatro etapas, <span className="italic text-azul">nenhuma surpresa</span>.</>}
          lead="Transparência não é palavra bonita no site: é o processo inteiro documentado, do primeiro contato à transferência."
        />

        <div className="mt-14 grid gap-4 lg:mt-20 lg:grid-cols-2">
          {PASSOS.map((p, i) => (
            <motion.article
              key={p.n}
              initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: EASE, delay: (i % 2) * 0.08 }}
              className={`relative overflow-hidden rounded-[30px] p-8 sm:p-10 ${p.destaque ? 'bg-noite text-papel lg:col-span-2' : 'border border-tinta/[.08] bg-white'}`}
            >
              {p.destaque && (
                <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full" style={{ background: 'radial-gradient(closest-side, rgba(26,138,216,.3), transparent)' }} />
              )}
              <div className="relative flex items-start gap-6">
                <span className={`font-display text-[clamp(2.4rem,4vw,3.4rem)] leading-none ${p.destaque ? 'text-ouro' : 'text-tinta/15'}`}>{p.n}</span>
                <div>
                  <h3 className={`font-display text-[clamp(1.5rem,2.6vw,2.1rem)] leading-tight ${p.destaque ? 'text-papel' : 'text-tinta'}`}>{p.titulo}</h3>
                  <p className={`mt-3 max-w-[52ch] text-[16px] leading-relaxed ${p.destaque ? 'text-papel/65' : 'text-tinta/60'}`}>{p.texto}</p>
                  {p.destaque && (
                    <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-ouro/40 bg-ouro/10 px-4 py-2 text-[13.5px] font-semibold text-ouro">
                      O seu advogado pode acompanhar todas as etapas
                    </p>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <a href={waLink('Olá! Quero começar a análise do meu precatório.')} target="_blank" rel="noopener noreferrer"
            className="btn-azul inline-flex h-14 items-center gap-2.5 rounded-full px-7 text-[16px] font-bold">
            <WhatsAppIcon className="h-5 w-5" />
            Começar a análise
          </a>
          <p className="text-[14.5px] text-tinta/50">Análise e proposta sem custo e sem compromisso.</p>
        </div>
      </Container>
    </Sheet>
  )
}
