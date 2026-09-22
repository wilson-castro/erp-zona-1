# erp-zona-1

**Zona 1**, de exemplo: mostra um módulo livre e um restrito, com dados de dois domínios.

| | |
|---|---|
| Porta | `3001` (acessada pelo navegador **só via shell**, `http://localhost:3000`) |
| Rotas | `/zona1` (livre), `/zona1/relatorios` (restrito), `/zona1/recursos/[id]` |
| Chama | `dominio-a` (`:4001`), `dominio-b` (`:4002`), `gestao-acesso` (`:4010`) — declarados em `lib/nucleo.ts` (registro de destinos) |
| Depende de | `@erp/nucleo`, `@erp/moldura`, `@erp/contratos` (Verdaccio local `:4873`) |

## Responsabilidades

O que esta parte faz, o que nunca faz e o vocabulário usado aqui (BFF, zona, Server Action…), explicados
do zero: [`docs/RESPONSABILIDADES.md`](https://github.com/ArtroxGabriel/nextjs-mfe/blob/bff-multizone/docs/RESPONSABILIDADES.md)
no repositório principal, seção 4.2.

## Onde fica cada coisa

| Arquivo | Para quê |
|---|---|
| `app/` | páginas e Server Actions desta aplicação |
| `lib/nucleo.ts` | instância do núcleo: sessão, destinos permitidos, gestão de acesso |
| `lib/pagina.ts` | liga ao Next o kit do núcleo (`criarPaginas`: sessão, `exigirModulo`, `acaoProtegida`) e da moldura (menu, toast); igual nas quatro apps |
| `lib/redis.ts` | cliente do store de sessão, usado só se `REDIS_URL` estiver definido (senão, arquivo) |
| `acesso.manifesto.ts` | módulos, perfis e concessões desta aplicação (`pnpm registrar` envia) |
| `proxy.ts` | camada 1: cookie de sessão e CSP |

## Comandos

```bash
pnpm install
pnpm dev          # desenvolvimento, porta 3001
pnpm typecheck
pnpm registrar    # registra o manifesto na gestão de acesso
```

A base inteira (subir, verificar ponta a ponta) é operada pelo repositório principal `nextjs-mfe`: veja o README de lá.

## Regras

Invariantes do projeto: `AGENTS.md` no repositório principal. Nesta
aplicação, o que mais importa: toda página chama `exigirModulo` e toda Server Action usa
`acaoProtegida`; domínio só por `nucleo.destino(...)`, nunca `fetch` direto.
