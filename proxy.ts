import { criarProxy } from '@erp/nucleo/proxy'

// Sem esta fábrica, cada zona reimplementaria cookie e CSP e divergiria (limitação 4).
export default criarProxy({ prefixo: '/zona1', rotaLogin: '/login' })

export const config = { matcher: ['/zona1', '/zona1/:caminho*'] }
