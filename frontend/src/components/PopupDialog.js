import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function PopupDialog(props) {
    const {
        callbacks: {
            handleOkAction,
        },
    } = props

    // dialog handlers
    const [open, setOpen] = useState(true);

    // not needed due to open using set state boolean
    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {props.DialogTitleText}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {props.DialogContentText}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button 
                variant="contained" 
                onClick={handleClose}
                sx={{ background: '#7a7a7a' , '&:hover': {backgroundColor: '#bbbbbb'}}}
            >
                Cancel
            </Button>
            <Button 
                sx={{ background: '#357a38' , '&:hover': {backgroundColor: '#bbbbbb'}}}
                variant="contained" 
                onClick={() => {
                    handleOkAction();
                    handleClose();
                }}
                autoFocus
            >
                OK
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}