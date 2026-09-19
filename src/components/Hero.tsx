import { useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import heroDesktop from '../assets/brand/hero-desktop.webp'
import heroMobile from '../assets/brand/hero-mobile.webp'
import { waLink, EASE, CNPJ } from '../lib/site'
import { WhatsAppIcon, ArrowIcon } from './icons'

const SELOS = ['Escritura pública em cartório', 'Mais de 10 anos de experiência', `CNPJ ${CNPJ}`]

export default function Hero({ ready }: { ready: boolean }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const mx = useMotionValue(0.7)
  const my = useMotionValue(0.4)
  const sx = useSpring(mx, { stiffness: 120, damping: 24, mass: 0.6 })
  const sy = useSpring(my, { stiffness: 120, damping: 24, mass: 0.6 })

  const luzX = useTransform(sx, (v) => `${v * 100}%`)
  const luzY = useTransform(sy, (v) => `${v * 100}%`)
  const luz = useMotionTemplate`radial-gradient(38vw 38vw at ${luzX} ${luzY}, rgba(255,255,255,.95) 0%, rgba(255,255,255,.35) 32%, rgba(245,241,232,0) 68%)`
  const brilho = useMotionTemplate`radial-gradient(26vw 26vw at ${luzX} ${luzY}, rgba(26,138,216,.16) 0%, rgba(26,138,216,0) 70%)`
  const imgX = useTransform(sx, [0, 1], [14, -14])
  const imgY = useTransform(sy, [0, 1], [10, -10])
  const copyX = useTransform(sx, [0, 1], [-6, 6])

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }

  const item = (delay: number) => ({
    initial: { opacity: 0, y: 26, filter: 'blur(8px)' },
    animate: ready ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {},
    transition: { duration: 1, ease: EASE, delay: 0.3 + delay },
  })

  return (
    <section
      id="inicio" ref={ref} onPointerMove={onMove}
      className="hero grao relative isolate min-h-[100svh] overflow-hidden bg-papel pb-20 lg:flex lg:items-center lg:pb-0"
    >
      {/* o logo do hero reage ao mouse, sem cursor customizado */}
      <motion.div className="absolute inset-0" style={reduce ? undefined : { x: imgX, y: imgY }}
        initial={{ opacity: 0, scale: 1.04 }} animate={ready ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 1.7, ease: EASE, delay: 0.05 }}>
        <picture>
          <source media="(min-width: 1024px)" srcSet={heroDesktop} />
          <img src={heroMobile} alt="Rezende Precatórios e Investimentos" className="hero-img" {...({ fetchpriority: 'high' } as Record<string, string>)} decoding="async" />
        </picture>
      </motion.div>

      {/* luz que acompanha o cursor */}
      {!reduce && (
        <>
          <motion.div aria-hidden className="pointer-events-none absolute inset-0 mix-blend-soft-light" style={{ background: luz }} />
          <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: brilho }} />
        </>
      )}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-papel" />

      <motion.div className="hero-copy relative z-10 px-6 sm:px-10 lg:px-0" style={reduce ? undefined : { x: copyX }}>
        <motion.div {...item(0)} className="inline-flex items-center gap-2.5 rounded-full border border-marinho/15 bg-white/70 py-1.5 pl-2 pr-4 text-[12.5px] font-semibold text-marinho backdrop-blur-sm">
          <span className="rounded-full bg-marinho px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-papel">Precatórios</span>
          Federal, estadual e municipal
        </motion.div>

        <motion.h1 {...item(0.08)} className="hero-title mt-6 font-display font-medium leading-[1.02] tracking-[-0.025em] text-tinta">
          O dinheiro já é seu.
          <span className="block italic text-marinho">A gente antecipa a data.</span>
        </motion.h1>

        <motion.p {...item(0.18)} className="mt-6 max-w-[34rem] text-[17px] leading-relaxed text-tinta/65 lg:text-[18.5px]">
          Transforme o seu precatório em dinheiro à vista, sem esperar anos na fila do governo. Todo o processo é feito
          em cartório, por escritura pública, com acompanhamento do seu advogado.
        </motion.p>

        <motion.div {...item(0.3)} className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap">
          <a href={waLink()} target="_blank" rel="noopener noreferrer"
            className="btn-azul inline-flex h-14 items-center justify-center gap-2.5 whitespace-nowrap rounded-full px-7 text-[16px] font-bold">
            <WhatsAppIcon className="h-5 w-5" />
            Solicitar proposta
          </a>
          <a href="#como-funciona" className="btn-linha-escura inline-flex h-14 items-center justify-center gap-2 whitespace-nowrap rounded-full px-7 text-[16px] font-semibold">
            Como funciona
            <ArrowIcon className="h-4 w-4" />
          </a>
        </motion.div>

        <motion.ul {...item(0.4)} className="mt-9 flex flex-col gap-2.5 text-[14.5px] text-tinta/55">
          {SELOS.map((s) => (
            <li key={s} className="flex items-center gap-2.5">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-marinho/10 text-marinho">
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={3}><path d="m5 12 5 5L19 7" /></svg>
              </span>
              {s}
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  )
}
