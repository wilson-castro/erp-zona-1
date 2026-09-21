import { exigirModulo } from '@/lib/pagina'
import { lerRecurso } from '@/lib/dominio-a'

export default async function PaginaDoRecurso({ params }: { params: Promise<{ id: string }> }) {
  await exigirModulo('zona1.painel')
  const { id } = await params
  const recurso = await lerRecurso(id)
  return (
    <>
      <h1>{recurso.nome}</h1>
      <p>Identificador: {recurso.id} · versão {recurso.versao}</p>
      {/* O bloco some no DOMÍNIO. Não vem no payload e é renderizado como nada. */}
      {recurso.custo && (
        <section aria-labelledby="custo">
          <h2 id="custo">Custo</h2>
          <p>Valor: {recurso.custo.valor} · Centro: {recurso.custo.centro}</p>
        </section>
      )}
      <p><a href="/zona1">Voltar ao painel</a></p>
    </>
  )
}
