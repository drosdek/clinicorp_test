import React, { useState } from 'react';
import { Modal, Paper, TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

interface NewTaskModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (task: { description: string; responsable: string; status: 'todo' | 'doing' | 'done' }) => void;
}

const useStyles = makeStyles((theme: any) => ({
    modalPaper: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(4),
        boxShadow: theme.shadows[5],
    },
    formControl: {
        marginBottom: theme.spacing(2),
    },
}));

const NewTaskModal: React.FC<NewTaskModalProps> = ({ open, onClose, onSubmit }) => {
    const classes = useStyles();
    const [newTask, setNewTask] = useState<{ description: string; responsable: string; status: 'todo' | 'doing' | 'done' }>({
        description: '',
        responsable: '',
        status: 'todo',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewTask((prevTask) => ({
            ...prevTask,
            [name]: value as 'todo' | 'doing' | 'done', // Forçando o valor para o tipo correto
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(newTask);
        setNewTask({ description: '', responsable: '', status: 'todo' }); // Limpa o formulário após envio
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Paper className={classes.modalPaper}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Descrição"
                        name="description"
                        fullWidth
                        className={classes.formControl}
                        value={newTask.description}
                        onChange={handleInputChange}
                        margin='normal'
                    />
                    <TextField
                        label="Responsável"
                        name="responsable"
                        fullWidth
                        className={classes.formControl}
                        value={newTask.responsable}
                        onChange={handleInputChange}
                        margin='normal'
                    />
                    <TextField
                        label="Status"
                        name="status"
                        fullWidth
                        select
                        SelectProps={{
                            native: true,
                        }}
                        className={classes.formControl}
                        value={newTask.status}
                        onChange={handleInputChange}
                        margin='normal'
                    >
                        <option value="todo">To Do</option>
                        <option value="doing">Doing</option>
                        <option value="done">Done</option>
                    </TextField>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Adicionar Tarefa
                    </Button>
                </form>
            </Paper>
        </Modal>
    );
};

export default NewTaskModal;
