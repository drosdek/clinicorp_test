import React, { useEffect, useState } from 'react';
import Column from '../../components/column';
import useTasksApi from './hooks/useTasksApi.hook';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ITask } from './interfaces/task.interface';
import { Fab, Grid, Grid2, IconButton } from '@mui/material';
import { Add as AddIcon, SwapHoriz } from '@mui/icons-material';
import NewTaskModal from '../../components/taskmodal/newtaskmodal';

const Dashboard: React.FC = () => {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const { getTasks, updateTaskStatus, insertTask } = useTasksApi();

    useEffect(() => {
        const fetchTasks = async () => {
            const result = await getTasks();
            const validatedTasks = result.map((task: any) => ({
                ...task,
                status: validateStatus(task.status)
            }));
            setTasks(validatedTasks);
        };
        fetchTasks();
    }, []);

    const validateStatus = (status: string): 'todo' | 'doing' | 'done' => {
        if (status === 'todo' || status === 'doing' || status === 'done') {
            return status;
        }
        throw new Error(`Invalid status received: ${status}`);
    };

    const handleTaskUpdate = async (taskId: string, newStatus: 'todo' | 'doing' | 'done') => {
        const taskToUpdate = tasks.find((task) => task.id === taskId);

        if (!taskToUpdate || !taskToUpdate.description || !taskToUpdate.responsable || !taskToUpdate.computer) {
            console.error("Dados da tarefa estão incompletos ou inválidos.");
            return;
        }

        const updatedTaskData = {
            description: taskToUpdate.description,
            responsable: taskToUpdate.responsable,
            computer: taskToUpdate.computer,
            status: newStatus,
        };

        await updateTaskStatus(taskId, updatedTaskData);

        const updatedTasks = tasks.map((task) =>
            task.id === taskId ? { ...task, status: newStatus } : task
        );
        setTasks(updatedTasks);
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleNewTaskSubmit = async (task: { description: string; responsable: string; status: 'todo' | 'doing' | 'done' }) => {
        try {
            await insertTask(task);
            const updatedTasks = await getTasks();
            setTasks(updatedTasks);
            handleCloseModal();
        } catch (error) {
            console.error("Erro ao adicionar tarefa:", error);
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <Grid2 container spacing={2} justifyContent="space-around">
                <Grid item xs={12} sm={3}>
                    <Column
                        status="todo"
                        tasks={tasks.filter((task) => task.status === 'todo')}
                        onTaskDrop={handleTaskUpdate}
                    />
                </Grid>
                <Grid item>
                    <IconButton>
                        <SwapHoriz />
                    </IconButton>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Column
                        status="doing"
                        tasks={tasks.filter((task) => task.status === 'doing')}
                        onTaskDrop={handleTaskUpdate}
                    />
                </Grid>
                <Grid item>
                    <IconButton>
                        <SwapHoriz />
                    </IconButton>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Column
                        status="done"
                        tasks={tasks.filter((task) => task.status === 'done')}
                        onTaskDrop={handleTaskUpdate}
                    />
                </Grid>
            </Grid2>
            <Fab color="primary" onClick={handleOpenModal}>
                <AddIcon />
            </Fab>
            <NewTaskModal
                open={openModal}
                onClose={handleCloseModal}
                onSubmit={handleNewTaskSubmit}
            />
        </DndProvider>
    );
};

export default Dashboard;
