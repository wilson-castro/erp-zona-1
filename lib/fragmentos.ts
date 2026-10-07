import 'server-only'
import { cookies } from 'next/headers'
import { criarFragmento } from '@erp/nucleo'

/**
 * Fragmentos que a zona 1 pede a outras zonas (ADR-0011). A origem vem do ambiente (decisão 4: o `zonas.json` é do
 * shell) e é a rede interna da zona dona, sem passar pelo shell; os nomes permitidos ficam aqui. O cookie de sessão
 * segue como veio: quem diz quem é o usuário é a zona dona.
 */
export const fragmentos = criarFragmento({
  zonas: {
    zona2: { origem: process.env.ZONA2_URL ?? 'http://127.0.0.1:3002', fragmentos: ['tarefas'] },
  },
  lerCookieDeSessao: async () => (await cookies()).get('__Host-session')?.value,
})
