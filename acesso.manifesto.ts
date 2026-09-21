import { definirManifesto } from '@erp/contratos'

/** Catálogo da zona 1: módulos, perfis próprios e o que cada perfil concede por padrão (N6). */
export default definirManifesto({
  zona: 'zona1',
  modulos: [
    { id: 'zona1.painel', rotulo: 'Painel da zona 1', prefixo: '/zona1', restritoPorPadrao: false },
    { id: 'zona1.relatorios', rotulo: 'Relatórios', prefixo: '/zona1/relatorios', restritoPorPadrao: true },
  ],
  perfis: [{ id: 'zona1.analista', rotulo: 'Analista da zona 1' }],
  concessoes: { 'zona1.analista': ['zona1.relatorios'] },
})
