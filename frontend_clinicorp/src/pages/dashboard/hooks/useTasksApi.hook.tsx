import { useCallback } from "react"
import apiFactory from "../../../api/apiFactory"

const useTasksApi = () => {
    const getTasks = useCallback(() => {
        return apiFactory(`get-tasks`, 'get')
    }, [])

    const updateTaskStatus = useCallback((taskId: string, taskData: { description: string; responsable: string; computer: string; status: 'todo' | 'doing' | 'done' }): Promise<void> => {
        return apiFactory(`/tasks/${taskId}`, 'put', taskData);
    }, []);

    const insertTask = useCallback((taskData: { description: string; responsable: string; status: 'todo' | 'doing' | 'done' }): Promise<void> => {
        return apiFactory(`/insert-tasks`, 'post', [taskData]); // Enviar como array de tarefas
    }, []);

    return {
        getTasks,
        updateTaskStatus,
        insertTask
    }
}

export default useTasksApi