import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { ITask } from '../../pages/dashboard/interfaces/task.interface';
import { Close as CloseIcon } from "@mui/icons-material";
import ConfirmationDialog from '../confirmationdialog';

interface TaskProps {
    task: ITask;
    onDelete: (taskId: string) => void;
}

const useStyles = makeStyles<Theme>((theme) => ({
    taskCard: {
        width: '90%',
        minHeight: 120,
        margin: theme.spacing(2),
        cursor: 'move',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
    },
    description: {
        fontWeight: 'bold',
    },
    responsable: {
        color: theme.palette.text.secondary,
    },
    deleteButton: {
        position: 'absolute',
        top: theme.spacing(1), // Alinha ao topo
        right: theme.spacing(1),
    },
}));

const Task: React.FC<TaskProps> = ({ task, onDelete }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [{ isDragging }, drag] = useDrag({
        type: 'TASK',
        item: { id: task.id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const formattedDate = task.createdAt ? new Date(task.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }) : 'Data não disponível';


    const classes = useStyles({ isDragging });

    const handleDelete = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleConfirmDelete = () => {
        if (task.id) {
            onDelete(task.id);
        }
        setOpenDialog(false);
    };

    return (
        <Card className={classes.taskCard} ref={drag} raised>
            <CardHeader
                action={
                    <IconButton className={classes.deleteButton} onClick={handleDelete}>
                        <CloseIcon />
                    </IconButton>
                }
                subheader={`Created At: ${formattedDate}`}
            />

            <CardContent>
                <Typography className={classes.description} variant="body1">
                    Description: {task.description}
                </Typography>
                <Typography className={classes.responsable} variant="body2">
                    Responsable: {task.responsable}
                </Typography>
            </CardContent>

            <ConfirmationDialog
                open={openDialog}
                title="Confirm Delete"
                content="Are you sure you want to delete this task?"
                onClose={handleCloseDialog}
                onConfirm={handleConfirmDelete}
                confirmText="Delete"
                cancelText="Cancel"
            />
        </Card>
    );
};

export default Task;
