import c1 from '../assets/fotos/still-01-casal.webp'
import c1s from '../assets/fotos/still-01-casal@760.webp'
import c2 from '../assets/fotos/still-02-sedan.webp'
import c2s from '../assets/fotos/still-02-sedan@760.webp'
import c3 from '../assets/fotos/still-03-farol.webp'
import c3s from '../assets/fotos/still-03-farol@760.webp'
import c4 from '../assets/fotos/still-04-lancha.webp'
import c4s from '../assets/fotos/still-04-lancha@760.webp'
import c5 from '../assets/fotos/still-05-jetski.webp'
import c5s from '../assets/fotos/still-05-jetski@760.webp'
import c6 from '../assets/fotos/still-06-veleiro.webp'
import c6s from '../assets/fotos/still-06-veleiro@760.webp'
import c7 from '../assets/fotos/still-07-aviao.webp'
import c7s from '../assets/fotos/still-07-aviao@760.webp'
import c8 from '../assets/fotos/still-08-mala.webp'
import c8s from '../assets/fotos/still-08-mala@760.webp'
import c9 from '../assets/fotos/still-09-chaves.webp'
import c9s from '../assets/fotos/still-09-chaves@760.webp'
import c10 from '../assets/fotos/still-10-casa.webp'
import c10s from '../assets/fotos/still-10-casa@760.webp'

export type Foto = { src: string; small: string; alt: string; legenda: string }

export const FOTOS: Foto[] = [
  { src: c9, small: c9s, alt: 'Chaves sobre a bancada de um imóvel novo', legenda: 'A casa própria' },
  { src: c2, small: c2s, alt: 'Sedan de luxo preto em garagem de concreto', legenda: 'O carro que ficou esperando' },
  { src: c1, small: c1s, alt: 'Mãos de um casal apoiadas na mesa da cozinha', legenda: 'A tranquilidade em casa' },
  { src: c7, small: c7s, alt: 'Vista da janela do avião acima das nuvens', legenda: 'A viagem adiada' },
  { src: c4, small: c4s, alt: 'Lancha navegando ao pôr do sol', legenda: 'O sonho antigo' },
  { src: c10, small: c10s, alt: 'Casa de alto padrão iluminada ao anoitecer', legenda: 'O padrão de vida' },
  { src: c3, small: c3s, alt: 'Detalhe do farol de um carro premium à noite', legenda: 'A troca de carro' },
  { src: c6, small: c6s, alt: 'Convés de veleiro ao pôr do sol', legenda: 'O tempo livre' },
  { src: c8, small: c8s, alt: 'Mala de couro em sala de embarque', legenda: 'A viagem em família' },
  { src: c5, small: c5s, alt: 'Jetski cortando o mar ao entardecer', legenda: 'O lazer sem culpa' },
]
