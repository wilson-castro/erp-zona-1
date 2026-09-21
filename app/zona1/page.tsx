import { nucleo } from '@/lib/nucleo'
import { exigirModulo } from '@/lib/pagina'
import { listarRecursos } from '@/lib/dominio-a'
import { BotaoDeAviso } from './BotaoDeAviso'

type Indicador = { nome: string; valor: number }

export default async function Painel() {
  await exigirModulo('zona1.painel')
  const [recursos, indicadores] = await Promise.all([
    listarRecursos(),
    nucleo.destino('dominio-b').get<Indicador[]>('/v1/indicadores').then((r) => r.body ?? []),
  ])
  return (
    <>
      <h1>Painel da zona 1</h1>
      <section aria-labelledby="indicadores">
        <h2 id="indicadores">Indicadores (domínio B)</h2>
        <ul>{indicadores.map((i) => <li key={i.nome}>{i.nome}: {i.valor}</li>)}</ul>
      </section>
      <section aria-labelledby="recursos">
        <h2 id="recursos">Recursos (domínio A)</h2>
        <ul>{recursos.map((r) => <li key={r.id}><a href={`/zona1/recursos/${r.id}`}>{r.nome}</a></li>)}</ul>
      </section>
      <BotaoDeAviso texto={`${recursos.length} recursos visíveis para você`} />
    </>
  )
}
