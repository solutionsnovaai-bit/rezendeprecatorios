import type { ReactNode } from 'react'

export function Sheet({
  id, tone = 'dark', children, className = '', glow = false,
}: { id?: string; tone?: 'dark' | 'light' | 'paper'; children: ReactNode; className?: string; glow?: boolean }) {
  const toneClass =
    tone === 'light'
      ? 'bg-creme text-tinta shadow-[0_-30px_80px_-40px_rgba(12,33,73,.35)]'
      : tone === 'paper'
        ? 'bg-papel text-tinta shadow-[0_-30px_80px_-40px_rgba(12,33,73,.3)]'
        : 'bg-noite text-papel shadow-[0_-30px_80px_-30px_rgba(0,0,0,.7)]'
  return (
    <section
      id={id}
      className={`relative -mt-12 overflow-x-clip rounded-t-[40px] pb-[calc(6rem+3rem)] pt-24 sm:rounded-t-[56px] lg:rounded-t-[76px] lg:pb-[calc(8rem+3rem)] lg:pt-32 ${toneClass} ${className}`}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-t-[40px] sm:rounded-t-[56px] lg:rounded-t-[76px]">
        {glow && (
          <div className="absolute left-1/2 top-0 h-[460px] w-[min(1100px,120vw)] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: 'radial-gradient(closest-side, rgba(26,138,216,.28), transparent)' }} />
        )}
        <div className={`absolute inset-x-[8%] top-0 h-px bg-gradient-to-r from-transparent to-transparent ${tone === 'dark' ? 'via-ouro/50' : 'via-marinho/15'}`} />
      </div>
      <div className="relative">{children}</div>
    </section>
  )
}

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1280px] px-6 sm:px-10 ${className}`}>{children}</div>
}

export function Kicker({ children, tone = 'dark' }: { children: ReactNode; tone?: 'dark' | 'light' }) {
  return (
    <p className={`flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.28em] ${tone === 'dark' ? 'text-ouro' : 'text-azul'}`}>
      <span className={`h-px w-8 ${tone === 'dark' ? 'bg-ouro/60' : 'bg-azul/50'}`} />
      {children}
    </p>
  )
}

export function Heading({
  title, lead, align = 'left', tone = 'dark', kicker, className = '',
}: { title: ReactNode; lead?: ReactNode; align?: 'left' | 'center'; tone?: 'dark' | 'light'; kicker?: string; className?: string }) {
  return (
    <div className={`${align === 'center' ? 'mx-auto text-center' : ''} max-w-[48rem] ${className}`}>
      {kicker && (
        <div className={align === 'center' ? 'flex justify-center' : ''}>
          <Kicker tone={tone}>{kicker}</Kicker>
        </div>
      )}
      <h2 className={`mt-6 font-display text-[clamp(2.4rem,5.6vw,4.4rem)] font-medium leading-[1.04] tracking-[-0.02em] ${tone === 'dark' ? 'text-papel' : 'text-tinta'}`}>
        {title}
      </h2>
      {lead && <p className={`mt-5 max-w-[46rem] text-[16.5px] leading-relaxed sm:text-[18px] ${tone === 'dark' ? 'text-papel/60' : 'text-tinta/65'}`}>{lead}</p>}
    </div>
  )
}
