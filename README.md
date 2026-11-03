# MealSync — Faza 1 (radni milestone)

Ovaj repozitorij trenutno ima osnovni React/Vite frontend, Node/Express backend i root npm workspace. Sljedeći PR-ovi Faze 1 dodaju PostgreSQL/Prisma sloj, dnevni jelovnik, UI povezivanje i integracijske testove.

## Trenutno dostupno

- React/Vite bootstrap u `client/`;
- Express API bootstrap u `server/`;
- `GET /api/health`;
- root workspace skripte za `dev`, `typecheck` i `build`.

## Lokalni početak

1. Instaliraj Node.js 22+ i npm 10+.
2. Kopiraj `.env.example` u `.env`.
3. Pokreni `npm install`.
4. Pokreni `npm run typecheck` i `npm run build`.
5. Pokreni `npm run dev`.

Ovaj README je namjerno ograničen na stanje nakon root-workspace PR-a; završni Phase-1 README bit će dopunjen nakon integracije baze, menu flowa i testova.
