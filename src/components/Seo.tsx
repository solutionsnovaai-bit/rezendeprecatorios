import { Helmet } from 'react-helmet-async'
import { SITE_URL, EMAIL, CNPJ, PHONE_E164 } from '../lib/site'

const TITLE = 'Rezende Precatórios e Investimentos | Antecipe o seu precatório'
const DESCRIPTION =
  'Antecipação de precatórios federais, estaduais e municipais com escritura pública em cartório e pagamento à vista. Mais de 10 anos de experiência.'

export default function Seo() {
  const url = `${SITE_URL}/`
  const image = `${SITE_URL}/og-rezende.jpg`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'Rezende Precatórios e Investimentos',
    description: DESCRIPTION,
    url, image,
    logo: `${SITE_URL}/icon-512.png`,
    email: EMAIL,
    telephone: `+${PHONE_E164}`,
    taxID: CNPJ,
    areaServed: { '@type': 'Country', name: 'Brasil' },
    address: { '@type': 'PostalAddress', addressCountry: 'BR' },
    makesOffer: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Antecipação de precatório federal' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Antecipação de precatório estadual' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Antecipação de precatório municipal' } },
    ],
  }
  return (
    <Helmet htmlAttributes={{ lang: 'pt-BR' }}>
      <title>{TITLE}</title>
      <meta name="description" content={DESCRIPTION} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content="Rezende Precatórios e Investimentos" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content="Rezende Precatórios | Antecipe o valor que já é seu" />
      <meta property="og:description" content={DESCRIPTION} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Rezende Precatórios | Antecipe o valor que já é seu" />
      <meta name="twitter:description" content={DESCRIPTION} />
      <meta name="twitter:image" content={image} />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  )
}
