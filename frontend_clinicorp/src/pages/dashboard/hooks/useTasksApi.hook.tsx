import { useCallback } from "react"
import apiFactory from "../../../api/apiFactory"
import { ITask } from "../interfaces/task.interface"

const useTasksApi = () => {
    const getTasks = useCallback(() => {
        return apiFactory(`get-tasks`, 'get')
    }, [])

    const updateTaskStatus = useCallback((taskId: string, taskData: ITask): Promise<void> => {
        return apiFactory(`/tasks/${taskId}`, 'put', taskData);
    }, []);

    const insertTask = useCallback((taskData: ITask): Promise<void> => {
        return apiFactory(`/insert-tasks`, 'post', [taskData]);
    }, []);

    const deleteTask = useCallback((taskId: string) => {
        return apiFactory(`/tasks/${taskId}`, 'delete');
    }, []);

    return {
        getTasks,
        updateTaskStatus,
        insertTask,
        deleteTask
    }
}

export default useTasksApi