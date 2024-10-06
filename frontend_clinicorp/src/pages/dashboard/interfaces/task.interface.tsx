export interface ITask {
    id?: string;
    description: string;
    responsable: string;
    status: 'todo' | 'doing' | 'done';
    computer?: string;
    createdAt?: string;
}