import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';


export default function AlertDialog(props) {
    const {
        callbacks: {
            handleOkAction,
        },
    } = props

    // get logged in user info
    const currentUserString = localStorage.getItem('currentUser');
    const currentUser = JSON.parse(currentUserString);
    const id= currentUser.user_id
    

    // dialog handlers
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // // onClick function
    // const handleDelete = () => {
    //     console.log("journey id", props.journeyID);
    //     deleteJourney()
    //     refreshJourneys();
    // }

    // //delete the journey from DB, in handleDelete
    // const deleteJourney = (()=> {
    //     axios.delete(`http://localhost:4000/journeys/deleteOneJourney/${props.journeyID}`)
    //     .then(navigate('/profile'))
    //     .catch(error => {console.log(error)})
    //     })

    // // update context after delete, in handleDelete
    // const refreshJourneys = () => {
    //     axios.get(`http://localhost:4000/journeys/allUserJourneys/${id}`)
    //         .then(response=> {setJourneys(response.data);})
    //         .catch(error => {console.log(error)})
    // }

    return (
        <div>
        <IconButton 
                edge="end" 
                aria-label="delete" 
                sx={{ color: '#357a38' }} 
                onClick={handleClickOpen}
                disableripple="true"
        >
            <DeleteIcon />
        </IconButton>
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