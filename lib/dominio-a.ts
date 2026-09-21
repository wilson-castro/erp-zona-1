import 'server-only'
import { cache } from 'react'
import { NaoEncontrado } from '@erp/nucleo'
import { notFound } from 'next/navigation'
import { nucleo } from './nucleo'

/**
 * Tipos LOCAIS da zona (D2): só esta zona consome o domínio A. `custo` é opcional e
 * AUSENTE quando o domínio não concede — nunca null, nunca placeholder.
 */
export type Recurso = {
  readonly id: string
  readonly nome: string
  readonly versao: number
  readonly custo?: { readonly valor: number; readonly centro: string }
}

export const listarRecursos = cache(async () =>
  (await nucleo.destino('dominio-a').get<Recurso[]>('/v1/recursos')).body ?? [])

export const lerRecurso = cache(async (id: string) => {
  try {
    const r = await nucleo.destino('dominio-a').get<Recurso>('/v1/recursos/:id', { params: { id } })
    return r.body ?? notFound()
  } catch (e) {
    // "não existe" e "você não pode ver" são indistinguíveis, de propósito
    if (e instanceof NaoEncontrado) notFound()
    throw e
  }
})
