import { useRef, type PointerEvent } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Sheet, Container, Kicker } from './Section'
import pin from '../assets/brand/pin.webp'
import { CNPJ, EASE } from '../lib/site'

const NUMEROS = [
  { valor: '+10', rotulo: 'anos de experiência em antecipação de créditos' },
  { valor: '100%', rotulo: 'das cessões feitas por escritura pública em cartório' },
  { valor: 'Brasil', rotulo: 'precatórios federais, estaduais e municipais' },
]

export default function Confianca() {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 150, damping: 18 })
  const ry = useSpring(useTransform(mx, [0, 1], [-10, 10]), { stiffness: 150, damping: 18 })
  const gx = useTransform(mx, [0, 1], ['0%', '100%'])
  const gy = useTransform(my, [0, 1], ['0%', '100%'])
  const glare = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,.45), transparent 48%)`

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }
  const reset = () => { mx.set(0.5); my.set(0.5) }

  return (
    <Sheet tone="light">
      <Container className="grid items-center gap-14 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-20">
        <div>
          <Kicker tone="light">Sobre a Rezende</Kicker>
          <h2 className="mt-6 font-display text-[clamp(2.3rem,5.2vw,4.2rem)] font-medium leading-[1.04] tracking-[-0.02em] text-tinta">
            Compra de precatórios <span className="italic text-azul">com hora e cartório marcados</span>.
          </h2>
          <div className="mt-6 flex flex-col gap-4 text-[16.5px] leading-relaxed text-tinta/65">
            <p>
              Somos especializados na compra de precatórios, com mais de 10 anos de experiência em investimentos e
              antecipação de créditos reconhecidos pelo poder público.
            </p>
            <p>
              Cada operação é formalizada por escritura pública, em cartório, com o titular do crédito e, quando ele
              quiser, com o advogado do processo presente. Nada é feito por acordo verbal e nada é assinado sem você
              entender o que está assinando.
            </p>
          </div>

          <dl className="mt-10 grid gap-6 border-t border-tinta/10 pt-8 sm:grid-cols-3">
            {NUMEROS.map((n) => (
              <div key={n.rotulo}>
                <dt className="font-display text-[clamp(1.9rem,3.2vw,2.6rem)] leading-none text-marinho">{n.valor}</dt>
                <dd className="mt-3 text-[14px] leading-snug text-tinta/55">{n.rotulo}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-[14px] text-tinta/45">CNPJ {CNPJ}</p>
        </div>

        <div className="flex justify-center" style={{ perspective: 1200 }}>
          <motion.div
            ref={ref} onPointerMove={onMove} onPointerLeave={reset}
            style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative w-[min(88vw,520px)] overflow-hidden rounded-[32px] border border-tinta/10 bg-white shadow-[0_50px_110px_-50px_rgba(12,33,73,.7)]"
          >
            <img src={pin} alt="Pin comemorativo da Rezende Precatórios e Investimentos" loading="lazy" className="h-full w-full object-cover" />
            <motion.div aria-hidden className="pointer-events-none absolute inset-0 mix-blend-soft-light" style={{ background: glare }} />
          </motion.div>
        </div>
      </Container>
    </Sheet>
  )
}
