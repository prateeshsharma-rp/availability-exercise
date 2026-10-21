// Why `.mts` and not `.ts`? Node strips the types here natively, so no
// transpiler is involved. knex's CLI still tries to auto-register one
// (ts-node, sucrase, @babel/register, ...) for any file ending in `.ts` and
// prints "Failed to load external module" errors when it finds none. `.mts`
// is unambiguously an ES module, so the CLI loads this file directly.
import type { Knex } from "knex";

// SQLite does not enforce foreign keys (incl. ON DELETE CASCADE) unless enabled per connection
const sqlitePool = {
  afterCreate: (conn: any, done: (err?: Error) => void) => {
    conn.run('PRAGMA foreign_keys = ON', done);
  }
};

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./dev.sqlite3"
    },
    useNullAsDefault: true,
    pool: sqlitePool,
    migrations: {
      directory: "./migrations",
      extension: "ts"
    },
    seeds: {
      directory: "./seeds"
    }
  },

  test: {
    client: "sqlite3",
    connection: ":memory:",
    useNullAsDefault: true,
    pool: sqlitePool,
    migrations: {
      directory: "./migrations",
      extension: "ts"
    },
    seeds: {
      directory: "./seeds"
    }
  }
};

export default config;
