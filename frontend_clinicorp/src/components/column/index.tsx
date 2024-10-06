import React from 'react';
import { useDrop } from 'react-dnd';
import Task from '../task';
import { Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ITask } from '../../pages/dashboard/interfaces/task.interface';

interface ColumnProps {
    status: 'todo' | 'doing' | 'done';
    tasks: ITask[];
    onTaskDrop: (taskId: string, newStatus: 'todo' | 'doing' | 'done') => void;
    onDelete: (taskId: string) => void;
}

const useStyles = makeStyles((theme: any) => ({
    column: {
        padding: theme.spacing(2),
        backgroundColor: '#f4f4f4',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: "80vh",
        overflowY: 'auto',
        justifyContent: 'flex-start',
        alignItems: 'center',
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

const Column: React.FC<ColumnProps> = ({ status, tasks, onTaskDrop, onDelete }) => {
    const classes = useStyles();

    const [{ isOver }, drop] = useDrop({
        accept: 'TASK',
        drop: (item: { id: string }) => onTaskDrop(item.id, status),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    return (
        <Paper className={classes.column} ref={drop} >
            <Typography variant="h6" align="center">
                {status.toUpperCase()}
            </Typography>
            {tasks.map((task) => (
                <Task key={task.id} task={task} onDelete={onDelete} />
            ))}
            {isOver && <div className={classes.hoverOverlay} />}
        </Paper>
    );
};

export default Column;
