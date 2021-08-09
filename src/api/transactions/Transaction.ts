export interface Transaction {
  name: string;
  description?: string;
  date: Date;
  kind: string;
  amount: number;
  id: string;
  ownerId?: string;
  projectId?: string;
}
