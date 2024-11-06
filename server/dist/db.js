import 'dotenv/config';
import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely';
import pg from 'pg';
import { maskPII } from './utils/string.js';
const dialect = new PostgresDialect({
    pool: new pg.Pool({
        connectionString: process.env.DB_URL || undefined,
        max: 10,
    }),
});
export const db = new Kysely({
    dialect,
    plugins: [new CamelCasePlugin()],
    log(event) {
        if (event.level === 'error') {
            console.error('Query failed : ', {
                durationMs: event.queryDurationMillis,
                error: event.error,
                sql: event.query.sql,
                params: event.query.parameters.map(maskPII),
            });
        }
        console.log('Query executed : ', {
            durationMs: event.queryDurationMillis,
            sql: event.query.sql,
            params: event.query.parameters.map(maskPII),
        });
    },
});
