import db from '../../src/db.ts';

/**
 * The `test` npm script sets NODE_ENV=test, so `db` is the in-memory SQLite
 * database from knexfile.mts — tests never touch dev.sqlite3.
 *
 *   beforeAll(setupTestDb);
 *   afterAll(teardownTestDb);
 */
export async function setupTestDb(): Promise<void> {
  await db.migrate.latest();
  await db.seed.run();
}

export async function teardownTestDb(): Promise<void> {
  await db.destroy();
}

export default db;
