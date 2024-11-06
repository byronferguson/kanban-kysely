import { db } from '../db.js';
import { NewTicket, Ticket, TicketUpdate } from '../types/database.js';

export function find(criteria: Partial<Ticket> = {}) {
  let query = db
    .selectFrom('tickets')
    .selectAll('tickets')
    .innerJoin('users', 'assignedUserId', 'users.id')
    .select(['users.username']);

  if (criteria.id) {
    query = query.where('tickets.id', '=', criteria.id);
  }

  if (criteria.status) {
    query = query.where('status', '=', criteria.status);
  }

  if (criteria.assignedUserId) {
    query = query.where('assignedUserId', '=', criteria.assignedUserId);
  }

  return query.execute();
}

export function findById(id: number) {
  return find({ id }).then((tickets) => tickets[0]);
}

export function update(id: number, updateWith: TicketUpdate) {
  return db
    .updateTable('tickets')
    .set(updateWith)
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst();
}

export function create(newTicket: NewTicket) {
  return db
    .insertInto('tickets')
    .values(newTicket)
    .returningAll()
    .executeTakeFirst();
}

export function destroy(id: number) {
  return db
    .deleteFrom('tickets')
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst();
}
