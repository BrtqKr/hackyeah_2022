export type TaskStatus = 'completed' | 'inProgress' | 'failed';

export interface Task {
    id: string;
    status: TaskStatus;
    title: string;
    description: string,
}