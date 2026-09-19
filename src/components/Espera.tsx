import { useRef } from 'react'
import { motion, useInView, useScroll, useSpring, useTransform } from 'framer-motion'
import { Sheet, Container, Heading } from './Section'
import { waLink, EASE } from '../lib/site'
import { WhatsAppIcon } from './icons'

const ETAPAS = [
  { titulo: 'A ação é julgada', texto: 'O juiz reconhece que o poder público deve a você.' },
  { titulo: 'Trânsito em julgado', texto: 'Não cabe mais recurso. A dívida vira certa e definitiva.' },
  { titulo: 'O precatório é expedido', texto: 'O tribunal comunica o ente devedor e o crédito entra na fila.' },
  { titulo: 'A fila de pagamento', texto: 'Aqui mora o problema: a espera pode levar anos, e o dinheiro fica parado.' },
]

export default function Espera() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.6'] })
  const linha = useSpring(scrollYProgress, { stiffness: 110, damping: 28 })
  const cardRef = useRef<HTMLDivElement>(null)
  const visivel = useInView(cardRef, { once: true, margin: '-100px' })
  const escala = useTransform(linha, [0, 1], [0.96, 1])

  return (
    <Sheet id="espera" tone="dark" glow>
      <Container>
        <Heading
          kicker="A fila do precatório"
          title={<>Você já esperou <span className="italic text-ouro">tempo demais</span>.</>}
          lead="O crédito é seu, reconhecido pela Justiça. O que falta é a data do pagamento, e essa data quem define é o governo."
        />

        <div ref={ref} className="relative mt-14 lg:mt-20">
          <div aria-hidden className="absolute left-[27px] top-3 bottom-10 w-px bg-papel/12 lg:left-0 lg:right-0 lg:top-[27px] lg:h-px lg:w-auto lg:bottom-auto" />
          <motion.div aria-hidden style={{ scaleY: linha }} className="absolute left-[27px] top-3 bottom-10 w-px origin-top bg-gradient-to-b from-ceu to-ouro lg:hidden" />
          <motion.div aria-hidden style={{ scaleX: linha }} className="absolute left-0 right-0 top-[27px] hidden h-px origin-left bg-gradient-to-r from-ceu via-azul to-ouro shadow-[0_0_16px_rgba(26,138,216,.8)] lg:block" />

          <ol className="relative grid gap-9 lg:grid-cols-4 lg:gap-6">
            {ETAPAS.map((e, i) => (
              <li key={e.titulo} className="relative flex gap-6 lg:block">
                <span className={`relative grid h-14 w-14 shrink-0 place-items-center rounded-full border font-display text-[19px] shadow-[0_0_0_8px_#071426] ${i === 3 ? 'border-ouro/60 bg-ouro text-tinta' : 'border-papel/20 bg-noite text-papel/70'}`}>
                  {i + 1}
                </span>
                <div className="pt-2 lg:pt-8">
                  <h3 className={`font-display text-[23px] leading-tight ${i === 3 ? 'text-ouro' : 'text-papel'}`}>{e.titulo}</h3>
                  <p className="mt-2 max-w-[32ch] text-[15.5px] leading-relaxed text-papel/55">{e.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* o corte: antes e depois */}
        <motion.div ref={cardRef} style={{ scale: escala }} className="mt-14 grid gap-4 lg:mt-20 lg:grid-cols-2">
          <div className="rounded-[30px] border border-papel/10 bg-papel/[.03] p-8 sm:p-10">
            <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-papel/40">Esperando na fila</p>
            <p className="mt-6 font-display text-[clamp(3rem,7vw,5rem)] leading-none text-papel/85">
              {visivel ? 'anos' : 'anos'}
            </p>
            <p className="mt-5 max-w-[34ch] text-[16px] leading-relaxed text-papel/55">
              Sem data certa, sem previsão e sem poder usar o dinheiro. Enquanto isso, a vida continua cobrando.
            </p>
          </div>
          <div className="borda-ouro relative overflow-hidden rounded-[30px] p-8 sm:p-10">
            <div aria-hidden className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full" style={{ background: 'radial-gradient(closest-side, rgba(232,178,60,.25), transparent)' }} />
            <p className="relative text-[12px] font-semibold uppercase tracking-[0.24em] text-ouro">Antecipando com a Rezende</p>
            <p className="relative mt-6 font-display text-[clamp(3rem,7vw,5rem)] leading-none text-papel">dias</p>
            <p className="relative mt-5 max-w-[34ch] text-[16px] leading-relaxed text-papel/65">
              Análise, proposta, escritura em cartório e pagamento. Você recebe à vista e decide o que fazer com o que
              é seu.
            </p>
            <a href={waLink('Olá! Quero saber em quanto tempo consigo antecipar o meu precatório.')} target="_blank" rel="noopener noreferrer"
              className="btn-ouro relative mt-8 inline-flex h-13 items-center gap-2.5 rounded-full px-6 py-3.5 text-[15.5px] font-bold">
              <WhatsAppIcon className="h-[17px] w-[17px]" />
              Quero saber o meu prazo
            </a>
          </div>
        </motion.div>
      </Container>
    </Sheet>
  )
}
