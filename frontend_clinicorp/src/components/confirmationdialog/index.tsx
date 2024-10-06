import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

interface ConfirmationDialogProps {
    open: boolean;
    title: string;
    content: string;
    onClose: () => void;
    onConfirm: () => void;
    confirmText?: string;
    cancelText?: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
    open,
    title,
    content,
    onClose,
    onConfirm,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    {cancelText}
                </Button>
                <Button onClick={onConfirm} color="secondary">
                    {confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;
