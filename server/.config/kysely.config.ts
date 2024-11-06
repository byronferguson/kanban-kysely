import { defineConfig } from 'kysely-ctl';
import { db } from '../src/db.js';

export default defineConfig({
  kysely: db,
  // migrations: { // optional.
  //   allowJS, // optional. controls whether `.js`, `.cjs` or `.mjs` migrations are allowed. default is `false`.
  //   getMigrationPrefix, // optional. a function that returns a migration prefix. affects `migrate make` command. default is `() => ${Date.now()}_`.
  //   migrationFolder, // optional. name of migrations folder. default is `'migrations'`.
  //   migrator, // optional. a `Kysely` migrator instance. default is `Kysely`'s `Migrator`.
  //   provider, // optional. a `Kysely` migration provider instance. default is `kysely-ctl`'s `TSFileMigrationProvider`.
  // },
  // seeds: { // optional.
  //   allowJS, // optional. controls whether `.js`, `.cjs` or `.mjs` seeds are allowed. default is `false`.
  //   getSeedPrefix, // optional. a function that returns a seed prefix. affects `seed make` command. default is `() => ${Date.now()}_`.
  //   provider, // optional. a seed provider instance. default is `kysely-ctl`'s `FileSeedProvider`.
  //   seeder, // optional. a seeder instance. default is `kysely-ctl`'s `Seeder`.
  //   seedFolder, // optional. name of seeds folder. default is `'seeds'`.
  // }
});
