import React from 'react';
import { useDrop } from 'react-dnd';
import Task from '../task';
import { Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

interface Task {
    id: string;
    description: string;
    responsable: string;
    status: 'todo' | 'doing' | 'done';
}

interface ColumnProps {
    status: 'todo' | 'doing' | 'done';
    tasks: Task[];
    onTaskDrop: (taskId: string, newStatus: 'todo' | 'doing' | 'done') => void;
}

const useStyles = makeStyles((theme: any) => ({
    column: {
        padding: theme.spacing(2),
        minHeight: '100%',
        minWidth: '100%',
        backgroundColor: '#f4f4f4',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
    },
    hoverOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        zIndex: 1,
    },
}));

const Column: React.FC<ColumnProps> = ({ status, tasks, onTaskDrop }) => {
    const classes = useStyles();

    const [{ isOver }, drop] = useDrop({
        accept: 'TASK',
        drop: (item: { id: string }) => onTaskDrop(item.id, status),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    return (
        <Paper className={classes.column} ref={drop} elevation={3}>
            <Typography variant="h6" align="center">
                {status.toUpperCase()}
            </Typography>
            {tasks.map((task) => (
                <Task key={task.id} task={task} />
            ))}
            {isOver && <div className={classes.hoverOverlay} />}
        </Paper>
    );
};

export default Column;
