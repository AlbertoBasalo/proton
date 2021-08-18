export interface Project {
  name: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  budget: number;
  status: ProjectStatus;
  id: string;
  ownerId?: string;
}
export type ProjectStatus = 'planned' | 'active' | 'delayed' | 'canceled';
