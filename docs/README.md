# Документация API — KOM Admin

Спецификация REST API для админ-панели УК «Ключи Москвы» описывает только **то, что уже реализовано на фронтенде**: вход, дашборд и справочник ЖК.

- Полная спецификация: [openapi.yaml](./openapi.yaml) (OpenAPI 3.1)
- Базовый путь: `/api/v1`
- **Access:** `Authorization: Bearer <accessToken>` (localStorage `access_token`)
- **Refresh:** HttpOnly cookie `refresh_token` (только auth-ручки, `credentials: "include"`)

## Вне scope

Страницы-заглушки **не** имеют endpoints в этой спецификации:

| Маршрут UI | Файл |
|------------|------|
| `/objects` | `src/routes/_private/objects.tsx` |
| `/users` | `src/routes/_private/users.tsx` |
| `/requests` | `src/routes/_private/requests.tsx` |

Вкладки в шапке на эти URL остаются; при появлении реального UI — отдельное расширение OpenAPI.

## Карта: UI → API

| Блок UI | Файл / компонент | Endpoint |
|---------|------------------|----------|
| Форма входа | `features/auth/ui/login-form.tsx`, `use-login.ts` | `POST /auth/login` |
| Проверка сессии | `routes/_private/route.tsx`, `use-session.ts` | access JWT; при 401 → `POST /auth/refresh` |
| Профиль в шапке | `features/header/ui/user.tsx` | `GET /auth/me` |
| Выход | `features/header/ui/user.tsx` | `POST /auth/logout` + очистка localStorage и cookie |
| Выбор ЖК | `features/dashboard/ui/complex-selector.tsx` | `GET /residential-complexes` + клиентское значение `all` |
| Вся страница дашборда | `routes/_private/index.tsx` + `features/dashboard/ui/*` | `GET /dashboard` |
| Период (календарь) | `features/dashboard/ui/date-range-picker.tsx` | query `dateFrom`, `dateTo` — **UI пока не передаёт в данные** |

## Endpoints

### Auth

Два токена:

| Токен | Где хранится | Как отправляется |
|-------|--------------|------------------|
| Access JWT | `localStorage` → `access_token` | `Authorization: Bearer …` на всех защищённых ручках |
| Refresh | Cookie `refresh_token` (HttpOnly, Secure, SameSite=Lax) | Браузер сам на `POST /auth/login`, `/auth/refresh`, `/auth/logout` при `credentials: "include"` |

```http
POST /api/v1/auth/login
Content-Type: application/json

{ "email": "admin@example.com", "password": "password123" }
```

Ответ: `{ "accessToken": "<jwt>" }` + заголовок `Set-Cookie: refresh_token=…; HttpOnly; Secure; …`.

```http
POST /api/v1/auth/refresh
Cookie: refresh_token=...
```

Без `Authorization`. Ответ: новый `{ "accessToken" }`, при ротации — новый `Set-Cookie`.

```http
GET /api/v1/auth/me
Authorization: Bearer <accessToken>
```

Ответ: `{ "id", "email", "displayName", "initials" }`.

```http
POST /api/v1/auth/logout
Authorization: Bearer <accessToken>
Cookie: refresh_token=...
```

Ответ `204`, cookie сбрасывается (`Max-Age=0`).

### Справочник ЖК

```http
GET /api/v1/residential-complexes
Authorization: Bearer <token>
```

Ответ: `{ "items": [{ "id": "residential-complex-1", "name": "ЖК «Солнечный город»" }, ...] }`.

### Дашборд

```http
GET /api/v1/dashboard
Authorization: Bearer <token>
```

Query (все опциональны):

| Параметр | Описание |
|----------|----------|
| `complexId` | `residential-complex-1` … `4` — графики по домам; без параметра — по ЖК |
| `dateFrom` | `YYYY-MM-DD` — для будущей привязки DateRangePicker |
| `dateTo` | `YYYY-MM-DD` |

Пример с фильтром ЖК:

```http
GET /api/v1/dashboard?complexId=residential-complex-1
Authorization: Bearer <token>
```

Тело ответа — поля:

| Поле | Виджет на фронте |
|------|------------------|
| `metrics` | 5× `MetricCard` |
| `financialSummary` | карточка «Финансовая статистика» |
| `recentActivity` | «Недавняя активность» |
| `occupancyChart` | `OccupancyChart` |
| `apartmentTypesChart` | `ApartmentTypesChart` |
| `revenueChart` | `RevenueChart` |
| `paymentsDynamicChart` | `PaymentsDynamicChart` |
| `requestsDynamicChart` | `RequestsDynamicChart` |
| `paymentStatusChart` | `PaymentStatusChart` |
| `comparisonRadarChart` | `ComparisonRadarChart` |
| `filters` | эхо применённых `complexId`, `dateFrom`, `dateTo` |

## Деньги и JWT

- Суммы в API — объект `Money`: `amountMinor` (копейки), `currency: "RUB"`. Формат «12.5М ₽» — на клиенте.
- Access JWT payload: `sub` (number), `exp` (unix). См. `src/features/auth/lib/decode-token.ts`.
- Refresh в cookie — opaque или отдельный JWT; фронт не декодирует.

## CORS и cookies

Если API на другом origin, backend должен отдавать `Access-Control-Allow-Credentials: true` и конкретный `Access-Control-Allow-Origin` (не `*`). Все auth-запросы с cookie — с `credentials: "include"`.

## Просмотр спецификации

- [Swagger Editor](https://editor.swagger.io/) — вставить содержимое `openapi.yaml`
- Redoc / Stoplight — импорт файла
- `npx @redocly/cli lint docs/openapi.yaml` — локальная проверка (при установленном CLI)

## Следующие шаги для интеграции

1. Backend реализует paths из `openapi.yaml`.
2. Фронт: `VITE_API_BASE_URL`, клиент в `shared/api` с `credentials: "include"` для auth, interceptor 401 → `POST /auth/refresh`, замена mock в `use-login.ts`.
3. Loader дашборда: `GET /dashboard?complexId=...`.
4. Подключить `DateRangePicker` к query `dateFrom` / `dateTo`.
