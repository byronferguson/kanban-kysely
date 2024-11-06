import { db } from '../db.js';
import { NewUser, User, UserUpdate } from '../types/database.js';

export async function find(
  criteria: Partial<User> = {},
  includePassword = false,
): Promise<User[]> {
  let query = db
    .selectFrom('users')
    .select(['id', 'username', 'createdAt', 'updatedAt'])
    .$if(includePassword, (qb) => qb.select('password'));

  if (criteria.id) {
    query = query.where('id', '=', criteria.id); // Kysely is immutable, you must re-assign!
  }

  if (criteria.username) {
    query = query.where('username', '=', criteria.username);
  }

  return (await query.execute()) as User[];
}

export function findById(id: number) {
  return find({ id }).then((users) => users[0]);
}

export function update(id: number, updateWith: UserUpdate) {
  return db
    .updateTable('users')
    .set(updateWith)
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst();
}

export function create(newUser: NewUser) {
  return db
    .insertInto('users')
    .values(newUser)
    .returningAll()
    .executeTakeFirst();
}

export function destroy(id: number) {
  return db
    .deleteFrom('users')
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst();
}
