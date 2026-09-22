import { nucleo } from '@/lib/nucleo'
import { acessoEfetivo, exigirModulo } from '@/lib/pagina'
import { listarRecursos } from '@/lib/dominio-a'
import { BotaoDeAviso } from './BotaoDeAviso'

type Indicador = { nome: string; valor: number }

export default async function Painel() {
  await exigirModulo('zona1', 'painel.ver')
  // Relatórios só aparecem para quem tem a funcionalidade: ausência de permissão é ausência de elemento (invariante 8)
  const relatorios = (await acessoEfetivo()).modulos.find((m) => m.id === 'zona1')?.funcionalidades.includes('relatorios.ver')
  // Cada bloco depende de um domínio. Um domínio fora apaga o bloco dele, não a página.
  const [recursos, indicadores] = await Promise.all([
    listarRecursos().catch(() => null),
    nucleo.destino('dominio-b').get<Indicador[]>('/v1/indicadores').then((r) => r.body ?? [], () => null),
  ])
  return (
    <>
      <h1>Painel da zona 1</h1>
      {relatorios && <p><a href="/zona1/relatorios">Relatórios</a></p>}
      <section aria-labelledby="indicadores">
        <h2 id="indicadores">Indicadores (domínio B)</h2>
        {indicadores
          ? <ul>{indicadores.map((i) => <li key={i.nome}>{i.nome}: {i.valor}</li>)}</ul>
          : <p>Indicadores indisponíveis no momento.</p>}
      </section>
      <section aria-labelledby="recursos">
        <h2 id="recursos">Recursos (domínio A)</h2>
        {recursos
          ? <ul>{recursos.map((r) => <li key={r.id}><a href={`/zona1/recursos/${r.id}`}>{r.nome}</a></li>)}</ul>
          : <p>Recursos indisponíveis no momento.</p>}
      </section>
      {recursos && <BotaoDeAviso texto={`${recursos.length} recursos visíveis para você`} />}
    </>
  )
}
