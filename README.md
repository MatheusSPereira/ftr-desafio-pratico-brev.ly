# brev.ly

Encurtador de URLs: cria links curtos, redireciona para a URL original contando os acessos, lista/exclui links e exporta um relatório em CSV.

## Stack

**Backend** (`server/`): Fastify, TypeScript, Drizzle ORM, PostgreSQL, Cloudflare R2 (upload do CSV exportado), Zod, Swagger (`/docs`).

**Frontend** (`web/`): Vite, React, TypeScript, TailwindCSS, React Router, TanStack React Query, React Hook Form, Zod.

## Estrutura

```
server/   API REST (rotas → handlers → services → db)
web/      SPA React (pages → components → hooks → api)
```

## Subindo com Docker Compose (recomendado)

Sobe banco, API e frontend (servido via nginx) de uma vez:

```bash
cd server
cp .env.example .env   # ajuste as credenciais do Cloudflare R2 se for usar a exportação de CSV
docker compose up -d --build
```

- Frontend: http://localhost:5173
- API: http://localhost:3333
- Docs da API (Swagger): http://localhost:3333/docs

As migrations do banco rodam automaticamente ao subir o container `server`.

## Rodando em desenvolvimento (sem Docker no frontend)

Útil quando você está mexendo no `web/` e quer hot-reload.

```bash
# 1. Banco de dados
cd server
cp .env.example .env
docker compose up -d db

# 2. API
npm install
npm run db:migrate
npm run dev          # http://localhost:3333

# 3. Frontend (outro terminal)
cd ../web
cp .env.example .env
npm install
npm run dev           # http://localhost:5173
```

Se o container `web` do Docker estiver rodando, ele vai ocupar a porta 5173 — pare-o antes (`docker compose stop web` dentro de `server/`) para rodar o `npm run dev` do frontend na mesma porta.

## Variáveis de ambiente

**`server/.env`** — ver `server/.env.example`. `CLOUDFLARE_*` só são necessárias para a exportação de CSV funcionar de verdade (sem credenciais reais, o endpoint de export retorna 500). `VITE_BACKEND_URL`/`VITE_FRONTEND_URL`/`WEB_PORT` nesse arquivo são lidas pelo `docker-compose.yml` para buildar o frontend.

**`web/.env`** — ver `web/.env.example`. `VITE_BACKEND_URL` é a URL da API usada pelo frontend; `VITE_FRONTEND_URL` é usada para montar a URL curta completa exibida/copiada na listagem. Ambas são embutidas no bundle em tempo de build (Vite), então mudanças exigem rebuild.

## Notas e decisões de implementação

- **`created_at` usa `timestamp with time zone`.** Uma coluna `timestamp` sem timezone é ambígua: o driver Node pode reinterpretar o valor usando o timezone do processo que está lendo, gerando um deslocamento de horas dependendo de onde a API roda. `timestamptz` sempre grava/lê um instante absoluto e correto, independente do timezone do processo.
- **Redirect usa `useQuery`, não `useMutation`, para incrementar o acesso.** Chamar `mutate()` manualmente dentro de um `useEffect` no mount tem uma race condition real com o React 18 StrictMode em desenvolvimento: o efeito "transitório" (setup → cleanup → setup) do StrictMode pode iniciar a requisição numa instância da mutation que é descartada antes da resposta chegar, perdendo o `onSuccess`/`isSuccess` e travando a página. `useQuery` com uma `queryKey` por slug deduplica isso nativamente, sem precisar de `ref` ou `setTimeout` como guarda.
- **Altura de página usa `h-dvh`, não `h-screen`.** `100vh` em navegadores mobile não desconta a barra de endereço, cortando conteúdo. `dvh` (dynamic viewport height) resolve isso.
- **Layout de altura flexível usa `min-h-0` + `flex-1` + `self-stretch`**, não `max-h-[calc(...)]` com valores fixos nem `max-h-full` (percentual) — porcentagem de altura não resolve de forma confiável através de múltiplos níveis de flexbox aninhados.
- **A exportação de CSV depende de credenciais reais do Cloudflare R2** configuradas em `server/.env`. Sem elas, o botão "Baixar CSV" no frontend mostra corretamente uma mensagem de erro (o backend responde 500).
