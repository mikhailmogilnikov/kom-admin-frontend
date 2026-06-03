# Инструкции для агентов

## Проверки перед завершением задачи

После изменений в коде **обязательно** прогоняй обе проверки и исправляй ошибки до ответа пользователю:

```bash
bun run typecheck   # TypeScript (tsc -b)
bun run lint        # Ultracite / Biome (ultracite check)
```

Если линтер находит автоисправляемые проблемы:

```bash
bun run lint:fix
```

Затем снова `bun run lint` и `bun run typecheck`, пока обе команды не завершатся без ошибок.

Сборка (`bun run build`) — по необходимости, когда менялись зависимости, конфиг Vite/TS или нужна проверка бандла; для обычных правок достаточно `typecheck` + `lint`.

## OpenAPI / API-слой

При обновлении схемы с бэкенда:

```bash
bun run api:sync    # api:fetch-schema + api:generate
```

Не редактируй вручную `src/shared/api/schema.ts` и `openapi.json` — только через скрипты.

### Запросы к API — React Query клиенты

В компонентах и хуках используй **openapi-react-query**, а не прямые вызовы `fetchClient` / `publicFetchClient`:

| Клиент | Файл | Когда |
|--------|------|--------|
| `publicFetchQuery` | `@/shared/api/public-fetch` | Публичные ручки (логин, refresh без Bearer) |
| `fetchQuery` | `@/shared/api/fetch` | Защищённые ручки (Bearer + auto-refresh в middleware) |

```ts
// чтение
fetchQuery.useQuery("get", "/dashboard");

// мутации (POST/PATCH/DELETE и одноразовые GET)
publicFetchQuery.useMutation("post", "/user/email/login");
fetchQuery.useMutation("get", "/user/me");
```

`fetchClient` / `publicFetchClient` — только для middleware (`fetch.ts`), refresh вне React или если React Query не подходит. В `features/` и `app/` — предпочитай `*FetchQuery`.

### Роутер и сессия

- Контекст роутера: `RouterContext` в `@/app/router-context`, проброс через `<App />` → `<RouterProvider context={{ session }} />`.
- В `beforeLoad` используй `context.session`, не `useSession.getState()` (кроме `__root`, где refresh и обновление context).
- После смены сессии роутер инвалидируется в `App` (`router.invalidate()`).

## Прочее

- Линтер проекта — **Ultracite** (`eslint` в `package.json` не используется).
- Импорты из `@/shared/api/*` — напрямую из файлов, без barrel `index.ts`.
- Стиль и a11y — см. `.cursor/rules/ultracite.mdc`.
