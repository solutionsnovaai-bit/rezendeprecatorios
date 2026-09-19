import { Container, Kicker } from './Section'
import { FOTOS } from '../lib/fotos'

function Faixa({ fotos, duration, reverse }: { fotos: typeof FOTOS; duration: number; reverse?: boolean }) {
  const loop = [...fotos, ...fotos]
  const Row = ({ hidden }: { hidden?: boolean }) => (
    <ul className="flex shrink-0 items-center gap-4 pr-4 sm:gap-6 sm:pr-6" aria-hidden={hidden || undefined}>
      {loop.map((f, i) => (
        <li key={i} className="group relative h-[240px] w-[320px] shrink-0 overflow-hidden rounded-[26px] border border-papel/10 sm:h-[300px] sm:w-[400px] lg:h-[360px] lg:w-[480px]">
          <img
            src={f.small} srcSet={`${f.small} 760w, ${f.src} 1400w`} sizes="(min-width: 1024px) 480px, 320px"
            alt={f.alt} loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]"
          />
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-noite/80 via-transparent to-transparent" />
          <span className="absolute bottom-5 left-6 font-display text-[19px] text-papel sm:text-[22px]">{f.legenda}</span>
        </li>
      ))}
    </ul>
  )
  return (
    <div className="marquee-wrap relative overflow-hidden">
      <div className="marquee-track" data-reverse={reverse} style={{ ['--dur' as string]: `${duration}s` }}>
        <Row />
        <Row hidden />
      </div>
    </div>
  )
}

export default function Destrave() {
  return (
    <section id="destrave" className="grao relative -mt-12 overflow-hidden rounded-t-[40px] bg-noite pb-28 pt-24 sm:rounded-t-[56px] lg:rounded-t-[76px] lg:pb-36 lg:pt-32">
      <div aria-hidden className="pointer-events-none absolute inset-x-[8%] top-0 h-px bg-gradient-to-r from-transparent via-ouro/50 to-transparent" />
      <Container className="max-w-[1280px]">
        <Kicker>O depois</Kicker>
        <h2 className="mt-6 max-w-[20ch] font-display text-[clamp(2.4rem,5.6vw,4.4rem)] font-medium leading-[1.04] tracking-[-0.02em] text-papel">
          O que o seu dinheiro <span className="italic text-ouro">destrava</span>.
        </h2>
        <p className="mt-5 max-w-[46rem] text-[16.5px] leading-relaxed text-papel/60 sm:text-[18px]">
          Quitar dívidas, comprar a casa, trocar o carro, viajar com a família ou simplesmente dormir tranquilo. O
          destino do dinheiro é escolha sua. A nossa parte é fazer ele chegar.
        </p>
      </Container>

      <div className="mt-14 flex flex-col gap-4 sm:gap-6 lg:mt-20">
        <Faixa fotos={FOTOS} duration={70} />
        <Faixa fotos={[...FOTOS].reverse()} duration={86} reverse />
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-noite to-transparent sm:w-40" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-noite to-transparent sm:w-40" />
    </section>
  )
}
