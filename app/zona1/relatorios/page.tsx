import { exigirModulo } from '@/lib/pagina'
import { listarRecursos } from '@/lib/dominio-a'

/** Módulo restrito: sem concessão, 404 — nem o menu nem a URL revelam que existe. */
export default async function Relatorios() {
  await exigirModulo('zona1.relatorios')
  const recursos = await listarRecursos()
  const comCusto = recursos.filter((r) => r.custo)
  return (
    <>
      <h1>Relatórios</h1>
      <p>{recursos.length} recursos no seu escopo; {comCusto.length} com custo visível.</p>
    </>
  )
}
