import React from 'react';
import { useDrag } from 'react-dnd';
import { Card, CardContent, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

interface TaskProps {
    task: {
        id: string;
        description: string;
        responsable: string;
        status: 'todo' | 'doing' | 'done';
    };
}

const useStyles = makeStyles<Theme>((theme) => ({
    taskCard: {
        margin: theme.spacing(3),
        cursor: 'move',
    },
    description: {
        fontWeight: 'bold',
    },
    responsable: {
        color: theme.palette.text.secondary,
    },
}));

const Task: React.FC<TaskProps> = ({ task }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'TASK',
        item: { id: task.id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const classes = useStyles({ isDragging });

    return (
        <Card className={classes.taskCard} ref={drag} raised>
            <CardContent>
                <Typography className={classes.description} variant="body1">
                    {task.description}
                </Typography>
                <Typography className={classes.responsable} variant="body2">
                    {task.responsable}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default Task;
