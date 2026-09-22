import { definirManifestoDeModulo } from '@erp/contratos'

/**
 * O módulo da zona 1 e o catálogo de funcionalidades que o código dela usa (ADR-0014, adendo 1).
 * Perfis e concessões moram na gestão de acesso, não aqui (invariante 17).
 */
export default definirManifestoDeModulo({
  id: 'zona1',
  nome: 'Zona 1 — painel e relatórios',
  funcionalidades: ['painel.ver', 'relatorios.ver'],
})
