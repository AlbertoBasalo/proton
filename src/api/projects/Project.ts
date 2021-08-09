export interface Project {
  name: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  budget: number;
  status: string;
  id: string;
  ownerId?: string;
}
