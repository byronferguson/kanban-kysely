import { db } from '../db.js';
export async function find(criteria = {}, includePassword = false) {
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
    return (await query.execute());
}
export function findById(id) {
    return find({ id }).then((users) => users[0]);
}
export function update(id, updateWith) {
    return db
        .updateTable('users')
        .set(updateWith)
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirst();
}
export function create(newUser) {
    return db
        .insertInto('users')
        .values(newUser)
        .returningAll()
        .executeTakeFirst();
}
export function destroy(id) {
    return db
        .deleteFrom('users')
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirst();
}
