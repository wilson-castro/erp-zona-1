import { criarProxy } from '@erp/nucleo/proxy'

export default criarProxy({ prefixo: '/zona1', rotaLogin: '/login', publicos: ['/zona1/api/health'] })

export const config = { matcher: ['/zona1', '/zona1/:caminho*'] }
