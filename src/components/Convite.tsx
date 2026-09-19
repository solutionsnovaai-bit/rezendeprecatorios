import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import sedan from '../assets/fotos/still-02-sedan.webp'
import sedanSm from '../assets/fotos/still-02-sedan@760.webp'
import { Container } from './Section'
import { waLink } from '../lib/site'
import { WhatsAppIcon } from './icons'

export default function Convite() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const escala = useTransform(scrollYProgress, [0, 1], [1.12, 1.02])

  return (
    <section ref={ref} aria-label="A vida que espera do outro lado" className="relative isolate -mt-12 overflow-hidden rounded-t-[40px] bg-noite sm:rounded-t-[56px] lg:rounded-t-[76px]">
      <motion.img
        src={sedanSm}
        srcSet={`${sedanSm} 760w, ${sedan} 1400w`}
        sizes="100vw"
        alt="Sedan de luxo preto estacionado em garagem de concreto"
        loading="lazy"
        style={{ y, scale: escala }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-noite via-noite/85 to-noite/35" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-noite/90 via-transparent to-noite/60" />

      <Container className="relative flex min-h-[520px] flex-col justify-center py-24 lg:min-h-[640px] lg:py-32">
        <div className="max-w-[40rem]">
          <p className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.28em] text-ouro">
            <span className="h-px w-8 bg-ouro/60" />
            Do outro lado da fila
          </p>
          <h2 className="mt-6 font-display text-[clamp(2.3rem,5.4vw,4.2rem)] font-medium leading-[1.04] tracking-[-0.02em] text-papel">
            O que está parado na fila <span className="italic text-ouro">já podia estar na sua garagem</span>.
          </h2>
          <p className="mt-5 max-w-[44ch] text-[16.5px] leading-relaxed text-papel/65">
            Você não precisa do dinheiro daqui a alguns anos. Precisa agora, enquanto ainda dá para escolher o que
            fazer com ele.
          </p>
          <a
            href={waLink('Olá! Quero antecipar o meu precatório e saber a proposta.')}
            target="_blank" rel="noopener noreferrer"
            className="btn-ouro mt-9 inline-flex h-14 items-center gap-2.5 rounded-full px-7 text-[16px] font-bold"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Quero minha proposta
          </a>
        </div>
      </Container>
    </section>
  )
}
