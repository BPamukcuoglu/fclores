export type ReportStatus =
  | 'timestamped'
  | 'pending';

export interface Report {
  id: number;
  department: string;
  instructor: string;
  semester: string;
  course: string;
  status: ReportStatus;
  createdAt: Date;
  excelRaw: string;
  clo?: string;
  checksum?: string;
  txnId?: string;
}
