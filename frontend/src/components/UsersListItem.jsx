import React, { useContext } from 'react'
import { ListItem } from '@material-ui/core';
import ListItemAvatar from '@mui/material/ListItemAvatar';
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import AlertDialog from './Dialog';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

import { UsersContext } from '../App';

//delete the user from DB, then update state/context to refresh frontend 

// const deleteJourney = ((contextPayload, journey, navigate)=> {
//     const { journeys, setJourneys } = contextPayload
//     const updatedJourneysArray = journeys.filter((jou) => jou.journey_id !== journey.journey_id)

const deleteUser = ((UsersContextPayload, user, navigate)=> {
    
    const { users, setUsers} = UsersContextPayload // gets users from login form
    const updatedUsersArray = users.filter((users) => users.user_id !== user.user_id)

    axios.delete(`http://localhost:4000/users/deleteOneUser/${user.user_id}`)
    .then(navigate('/admin'))
    .catch(error => {console.log(error)})
    .finally(setUsers(updatedUsersArray))
    })

function UserListItem(props) {
    const { user } = props
    console.log(user.user_id);
    const navigate = useNavigate();
    

    // get journey context
    const UsersContextPayload = useContext(UsersContext)
    const { users, setUsers } = UsersContextPayload 

    //set variables for functions
    let DialogTitleText = "Delete this user?"
    let DialogContentText = "If you proceed, this information will be lost. User will be required to register again."

    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar sx={{ bgcolor: '#357a38' }}>
                    <PersonIcon/>
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={user.username} 
                secondary={`User ID number: ${user.user_id} / email: ${user.email} / Admin: ${user.userAdmin === 1? "Yes" : "No"}`}
            />
            <AlertDialog 
                callbacks={{
                    handleOkAction: () => deleteUser(UsersContextPayload, user, navigate),
                }}
                DialogContentText={DialogContentText} 
                DialogTitleText={DialogTitleText}
            />

        </ListItem>
    )
}

export default UserListItem;