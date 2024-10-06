import React, { useEffect, useState } from 'react';
import Column from '../../components/column';
import useTasksApi from './hooks/useTasksApi.hook';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ITask } from './interfaces/task.interface';
import { Fab, Grid, IconButton, Paper, Tooltip, Typography } from '@mui/material';
import { Add as AddIcon, SwapHoriz } from '@mui/icons-material';
import NewTaskModal from '../../components/taskmodal/newtaskmodal';

const Dashboard: React.FC = () => {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const { getTasks, updateTaskStatus, insertTask, deleteTask } = useTasksApi();

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

    const handleNewTaskSubmit = async (task: ITask) => {
        try {
            await insertTask(task);
            const updatedTasks = await getTasks();
            setTasks(updatedTasks);
            handleCloseModal();
        } catch (error) {
            console.error("Erro ao adicionar tarefa:", error);
        }
    };

    const handleTaskDelete = async (taskId: string) => {
        try {
            await deleteTask(taskId);
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        } catch (error) {
            console.error('Erro ao remover a tarefa:', error);
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <Paper
                elevation={3}
                sx={{
                    padding: '20px',
                    margin: '20px auto',
                    maxWidth: '90vw',
                    height: '80vh',
                    backgroundColor: '#f5f5f5',
                    display: 'flex',
                    flexDirection: 'column',
                    overflowY: 'auto',
                }}
            >
                <Typography variant="h4" align="center" gutterBottom>
                    Quadro de Tarefas
                </Typography>

                <Grid container spacing={2} justifyContent="space-between" sx={{ flexGrow: 1 }}>
                    <Grid item xs={12} md={3}>
                        <Column
                            status="todo"
                            tasks={tasks.filter((task) => task.status === 'todo')}
                            onTaskDrop={handleTaskUpdate}
                            onDelete={handleTaskDelete}
                        />
                    </Grid>
                    <Grid item sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        width: '40px',
                        '@media (max-width: 900px)': {
                            width: '100%',
                            height: 'auto',
                            padding: '8px 0',
                        },
                    }}>
                        <IconButton>
                            <SwapHoriz />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Column
                            status="doing"
                            tasks={tasks.filter((task) => task.status === 'doing')}
                            onTaskDrop={handleTaskUpdate}
                            onDelete={handleTaskDelete}
                        />
                    </Grid>
                    <Grid item sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        width: '40px',
                        '@media (max-width: 900px)': {
                            width: '100%',
                            height: 'auto',
                            padding: '8px 0',
                        },
                    }}>
                        <IconButton>
                            <SwapHoriz />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Column
                            status="done"
                            tasks={tasks.filter((task) => task.status === 'done')}
                            onTaskDrop={handleTaskUpdate}
                            onDelete={handleTaskDelete}
                        />
                    </Grid>
                </Grid>
            </Paper>
            <Tooltip title="Cadastrar nova tarefa" placement="left">
                <Fab color="primary" onClick={handleOpenModal} sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 16,
                }}>
                    <AddIcon />
                </Fab>
            </Tooltip>
            <NewTaskModal
                open={openModal}
                onClose={handleCloseModal}
                onSubmit={handleNewTaskSubmit}
            />
        </DndProvider>
    );
};

export default Dashboard;
