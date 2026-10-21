# Availability API — Setup

## Before the interview

Install these in advance:

- Docker Desktop (or another Docker engine with `docker compose`)
- Node.js 24+ (or 22.18+ or 23.6+)
- Optional: `docker pull node:24-alpine`, so the first build is faster

Keep port 3000 free during the interview, and 3001–3005 for anything else you start.
On Windows, use WSL or Git Bash; the npm scripts assume a POSIX shell.

## Getting started

You will receive the repo at the start of the interview. Run:

```bash
npm install               # local dependencies, so your editor has types
npm run docker:setup      # build the image (~1 min), start the app on :3000, migrate, seed
npm run docker:test       # run the tests
```

The project directory is mounted into the container. Edit locally; the server restarts on change.
Other scripts: `npm run docker:logs`, `npm run docker:shell`, `npm run docker:typecheck`,
`npm run docker:down`. `npm run` lists every script.

### Without Docker

Node runs the TypeScript directly (no build step) and SQLite needs nothing installed, so the app
also runs locally:

```bash
npm run setup             # creates .env, migrates, seeds
npm run dev               # :3000, restarts on change
npm test
```

`.env` holds `PORT` and the vendor URL; `npm run dev`, `npm start` and `npm test` load it.
Also: `npm run db:reset` (drop, migrate, re-seed) and `npm run typecheck`. `npm run check` reports
whether the app and the vendor are answering.

### Sanity checks

```bash
curl http://localhost:3000/health
curl "http://localhost:3000/api/availability?productId=pool-pass-001&date=2024-03-15"
curl "https://9a3t40rc5h.execute-api.us-west-2.amazonaws.com/prod/spa-availability?date=2024-03-15"
```

## Testing

```bash
npm run docker:test   # or `npm test` locally
```

Tests use an in-memory SQLite database, migrated and seeded by `tests/helpers/db.ts`. They never
touch `dev.sqlite3`. See `tests/availability.test.ts` for hitting the API with supertest.

## Common issues

- **`ERR_MODULE_NOT_FOUND` on your own import** — add the `.ts` extension:
  `import db from '../db.ts'`. There is no build step, so imports need the real filename.
- **`npm install` refuses to run** — your Node is older than 22.18.
- **`npm install` fails while building `sqlite3`** — the prebuilt binary download failed and npm
  fell back to compiling. Check your network or proxy and run `npm install` again.
- **`process.env.THIRD_PARTY_API_URL` is `undefined`** — `npm run setup` creates `.env`.
  Only `npm run dev`, `npm start` and `npm test` load it; plain `node src/index.ts` does not.
- **Migration fails** — `npm run migrate:rollback`, fix, `npm run migrate:latest`.
  `npm run db:reset` starts over.
- **Vendor not responding** — `npm run check` reports whether the app and the vendor answer.
