export type InvoiceStatus =
  | 'timestamped'
  | 'pending';

export interface Invoice {
  id: string;
  department: string;
  course: string;
  status: InvoiceStatus;
  createdAt: Date;
}
