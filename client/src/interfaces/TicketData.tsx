export interface TicketData {
  id?: number;
  name: string | null;
  description: string | null;
  status: string | null;
  assignedUserId: number | null;
}
