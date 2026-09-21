'use client'

import { emitirToast } from '@erp/moldura'

/** Recebe só uma string. Invariante 2: nada do objeto do domínio atravessa para o cliente. */
export function BotaoDeAviso({ texto }: { texto: string }) {
  return <button type="button" onClick={() => emitirToast({ tipo: 'info', texto })}>Avisar no toast do shell</button>
}
