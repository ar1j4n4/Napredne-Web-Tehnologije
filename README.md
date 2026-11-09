# MealSync — Faza 1

Minimalni, stvarno funkcionalni početni milestone projekta NWT / FESB MealSync Grupe 3. Faza 1 dokazuje jedan puni vertikalni tok bez prerane implementacije autha, narudžbi, real-timea ili završne produkcijske infrastrukture.

## Što trenutno radi

- React 19 + Vite + TypeScript frontend;
- Node.js + Express 5 + TypeScript backend;
- PostgreSQL 17 development baza kroz Docker Compose;
- Prisma 6 s minimalnim `Meal` modelom, migracijom i seedom;
- `GET /api/health`;
- `GET /api/menu?date=YYYY-MM-DD` koji stvarno čita PostgreSQL;
- React `MenuPage` prikazuje rezultat API-ja;
- neispravan datum vraća strukturirani HTTP 400 `VALIDATION_ERROR`;
- integration test provjerava health, DB-backed menu i negativni datum.

## Stack

Node.js 22+, npm 10+, React/Vite/TypeScript, Express, Zod, Prisma i PostgreSQL.

## Struktura

- `client/` — minimalni React UI;
- `server/` — Express API, Prisma schema/migration/seed i Phase-1 integration test;
- `docker-compose.yml` — development PostgreSQL i odvojena `mealsync_test` baza.

## Pokretanje od nule

```bash
cp .env.example .env
npm install
npm run db:up
npm run prisma:generate
npm run prisma:deploy
npm run prisma:seed
npm run typecheck
npm run build
npm test
npm run dev
```

Na Windows CMD-u `.env.example` kopiraj kao `.env` kroz Explorer ili `copy .env.example .env`; ostale `npm` naredbe su iste.

Frontend: `http://localhost:5173`  
API health: `http://localhost:4000/api/health`  
Menu API: `http://localhost:4000/api/menu?date=YYYY-MM-DD`

Seed puni današnji UTC datum s tri demo obroka. UI se inicijalno otvara na današnjem datumu.

## Negativni scenarij

Poziv `GET /api/menu?date=nije-datum` mora vratiti HTTP 400 i JSON s `error.code = "VALIDATION_ERROR"`. Validacija je na serveru, ne samo u UI-ju.

## Testovi

`npm test` koristi `TEST_DATABASE_URL`, prvo primjenjuje migracije na test bazu i zatim provjerava health, stvarni DB read i invalid input. Ako je Docker volume nastao prije dodavanja test baze, pokreni `docker compose down -v` pa `npm run db:up`.

## Što još namjerno nije dio Faze 1

Authentication, role/permission model, cart i orders, kitchen workflow, transaction/concurrency/idempotency pravila, cancellation, pickup lifecycle, Socket.IO, notifications/reconnect, background maintenance/no-show, analytics, puni search/filter/pagination, CI/deployment, završni OpenAPI i završni E2E dolaze u Fazama 2–4.
