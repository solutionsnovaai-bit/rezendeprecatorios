import logo from '../assets/brand/logo-claro.webp'
import { Container } from './Section'
import { WhatsAppIcon, MailIcon } from './icons'
import { NAV_ITEMS, EMAIL, CNPJ, PHONE_DISPLAY, waLink } from '../lib/site'

export default function Footer() {
  return (
    <footer className="relative border-t border-papel/10 bg-noite text-papel">
      <Container className="pb-10 pt-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <img src={logo} alt="Rezende Precatórios e Investimentos" loading="lazy" className="h-[30px] w-auto" />
            <p className="mt-6 max-w-[38ch] text-[15px] leading-relaxed text-papel/45">
              Compra e antecipação de precatórios federais, estaduais e municipais, com formalização por escritura
              pública em cartório.
            </p>
            <p className="mt-5 text-[13.5px] text-papel/35">CNPJ {CNPJ}</p>
          </div>
          <nav aria-label="Rodapé">
            <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-ouro/80">Navegue</p>
            <ul className="mt-5 flex flex-col gap-2.5">
              {NAV_ITEMS.map((n) => (
                <li key={n.id}><a href={`#${n.id}`} className="text-[15.5px] text-papel/70 transition-colors hover:text-ouro">{n.label}</a></li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-ouro/80">Contato</p>
            <ul className="mt-5 flex flex-col gap-3 text-[15.5px]">
              <li>
                <a href={waLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 text-papel/70 hover:text-ouro">
                  <WhatsAppIcon className="h-[17px] w-[17px] text-ouro" />
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2.5 break-all text-papel/70 hover:text-ouro">
                  <MailIcon className="h-[17px] w-[17px] shrink-0 text-ouro" />
                  {EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-papel/[.08] pt-8 text-[13.5px] text-papel/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Rezende Precatórios e Investimentos. Todos os direitos reservados.</p>
          <p>Desenvolvido por <span className="font-semibold tracking-[0.06em] text-papel/70">NOVA AI SOLUTIONS</span></p>
        </div>
      </Container>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </footer>
  )
}
