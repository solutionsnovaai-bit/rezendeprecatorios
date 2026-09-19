import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Seo from './components/Seo'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import { MarqueeBand } from './components/Marquee'
import Espera from './components/Espera'
import Processo from './components/Processo'
import Destrave from './components/Destrave'
import Confianca from './components/Confianca'
import Documentos from './components/Documentos'
import FAQ from './components/FAQ'
import Proposta from './components/Proposta'
import Footer from './components/Footer'
import WhatsAppFab from './components/WhatsAppFab'

const FAIXA_A = ['Precatório federal', 'Precatório estadual', 'Precatório municipal', 'RPV', 'Cessão em cartório']
const FAIXA_B = ['Escritura pública', 'Pagamento à vista', 'Análise sem custo', 'Mais de 10 anos', 'Seu advogado junto']

export default function App() {
  const [loading, setLoading] = useState(true)
  const finish = useCallback(() => setLoading(false), [])

  useEffect(() => {
    document.body.classList.toggle('is-loading', loading)
    if (loading) window.scrollTo(0, 0)
  }, [loading])

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
  }, [])

  return (
    <>
      <Seo />
      <AnimatePresence>{loading && <Loader key="loader" onFinish={finish} />}</AnimatePresence>
      <Navbar show={!loading} />
      <main>
        <Hero ready={!loading} />
        <div className="relative z-20 -mt-4">
          <MarqueeBand items={FAIXA_A} tone="ouro" duration={52} />
        </div>
        <Espera />
        <Processo />
        <Destrave />
        <Confianca />
        <div className="relative z-10">
          <MarqueeBand items={FAIXA_B} tone="light" duration={58} reverse />
        </div>
        <Documentos />
        <FAQ />
        <Proposta />
      </main>
      <Footer />
      <WhatsAppFab show={!loading} />
    </>
  )
}
