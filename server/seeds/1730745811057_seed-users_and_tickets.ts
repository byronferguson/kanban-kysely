import { sql, type Kysely } from 'kysely';
import { Database, NewTicket } from '../src/types/database.js';
import { hashPassword } from '../src/utils/auth.js';

const seeds: NewTicket[] = [
  {
    name: 'Design landing page',
    status: 'in-progress',
    description: 'Create wireframes and mockups for the landing page.',
  },
  {
    name: 'Set up project repository',
    status: 'done',
    description:
      'Create a new repository on GitHub and initialize it with a README file.',
  },
  {
    name: 'Implement authentication',
    status: 'todo',
    description: 'Set up user authentication using JWT tokens.',
  },
  {
    name: 'Test the API',
    status: 'todo',
    description: 'Test the API using Insomnia.',
  },
  {
    name: 'Deploy to production',
    status: 'todo',
    description: 'Deploy the application to Render.',
  },
];

export async function seed(db: Kysely<Database>): Promise<void> {
  await sql`TRUNCATE TABLE users RESTART IDENTITY CASCADE`.execute(db);

  // Raw SQL Method
  // await sql`
  // 	INSERT INTO users (username, password)
  // 	VALUES
  // 		('JollyGuru', ${await hashPassword('password')}),
  // 		('SunnyScribe', ${await hashPassword('password')}),
  // 		('RadiantComet', ${await hashPassword('password')}),
  // 		('byron', ${await hashPassword('password')})
  // `.execute(db);

  // Query Builder Method
  const records = await db
    .insertInto('users')
    .values([
      { username: 'JollyGuru', password: await hashPassword('password') },
      { username: 'SunnyScribe', password: await hashPassword('password') },
      { username: 'RadiantComet', password: await hashPassword('password') },
      { username: 'byron', password: await hashPassword('password') },
      { username: 'courtney', password: await hashPassword('password') },
    ])
    .returning('id')
    .execute();

  const ids = records.map((record) => record.id);

  await db
    .insertInto('tickets')
    .values(
      seeds.map((seed) => ({
        ...seed,
        assignedUserId: randomElement<number>(ids),
      })),
    )
    .execute();
}

function randomElement<T = unknown>(items: Array<T>) {
  return items[Math.floor(Math.random() * items.length)];
}
