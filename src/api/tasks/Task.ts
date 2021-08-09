export interface Task {
  name: string;
  description?: string;
  done: boolean;
  id: string;
  ownerId?: string;
  projectId?: string;
}
