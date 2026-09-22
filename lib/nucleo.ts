import 'server-only'
import { cookies, headers } from 'next/headers'
import { acessoHttp, criarNucleo, sessaoArquivo, sessaoRedis } from '@erp/nucleo'
import { clienteRedis } from './redis'

/**
 * Raiz de composição da zona 1. Sessão só em LEITURA: quem grava é o shell (N3).
 * Dois domínios de negócio (N7), cada um com os caminhos que esta zona pode chamar.
 */
export const nucleo = criarNucleo({
  app: 'zona1',
  // REDIS_URL definido: Redis (showcase, produção); senão, arquivo de desenvolvimento
  sessao: clienteRedis ? sessaoRedis({ cliente: clienteRedis }) : sessaoArquivo({ dir: process.env.SESSAO_DIR ?? '/tmp/erp-sessoes' }),
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
    // gestão de acesso v2 (ADR-0014, adendo 1): só o acesso efetivo de quem está logado
    'gestao-acesso': {
      origem: process.env.ACESSO_URL ?? 'http://127.0.0.1:4020',
      caminhos: ['/v2/eu'], metodos: ['GET'], credencial: 'usuario', timeoutMs: 1000,
    },
  },
})
