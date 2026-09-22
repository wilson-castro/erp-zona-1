import 'server-only'
import { cookies, headers } from 'next/headers'
import { acessoHttp, criarNucleo, sessaoArquivo } from '@erp/nucleo'

/**
 * Raiz de composição da zona 1. Sessão só em LEITURA: quem grava é o shell (N3).
 * Dois domínios de negócio (N7), cada um com os caminhos que esta zona pode chamar.
 */
export const nucleo = criarNucleo({
  app: 'zona1',
  sessao: sessaoArquivo({ dir: process.env.SESSAO_DIR ?? '/tmp/erp-sessoes' }),
  lerCookieDeSessao: async () => (await cookies()).get('__Host-session')?.value,
  // núcleo 8: o proxy pôs um traceparent na requisição; cada chamada ao domínio leva um filho
  lerTraceparent: async () => (await headers()).get('traceparent') ?? undefined,
  acesso: acessoHttp({ destino: 'gestao-acesso' }),
  destinos: {
    'dominio-a': {
      origem: process.env.DOMINIO_A_URL ?? 'http://127.0.0.1:4001',
      caminhos: ['/v1/recursos', '/v1/recursos/:id'], metodos: ['GET'], credencial: 'usuario', timeoutMs: 2000,
    },
    'dominio-b': {
      origem: process.env.DOMINIO_B_URL ?? 'http://127.0.0.1:4002',
      caminhos: ['/v1/indicadores'], metodos: ['GET'], credencial: 'usuario', timeoutMs: 2000,
    },
    'gestao-acesso': {
      origem: process.env.ACESSO_URL ?? 'http://127.0.0.1:4010',
      caminhos: ['/v1/modulos-permitidos'], metodos: ['GET'], credencial: 'usuario', timeoutMs: 1000,
    },
  },
})
