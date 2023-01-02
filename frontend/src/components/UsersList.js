import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

import JourneyListItem from './JourneyListItem';

//-----styling
import { makeStyles } from '@material-ui/core/styles';
import GetStartedButton from './GetStartedButton';

// -----------styling
const useStyles = makeStyles((theme) => ({
    userList: {
        margin: '0 auto'
    },
    detailButton: {
        background: '#357a38',
        color: '#FAFAFA',
        width: '50%',
        height: '3rem'
    },
    titleText: {
        color: '#357a38',
        fontFamily: 'Unbounded',
        fontWeight: '200',
        fontSize: '1.5rem',
        margin: 0
    }
}));

export default function UsersList() {
    const classes = useStyles();
    const navigate = useNavigate();
    const {allUsers, setAllUsers} = useState({});

     //get & set the users
    useEffect(()=> {
        // check state here in dependency []
        axios.get(`http://localhost:4000/users/all`)
        .then(response=> {setAllUsers(response.data);})
        .catch(error => {console.log(error)})
        },[allUsers])
    
    // get journey context


    /// ----------
    return (
    <Box sx={{ flexGrow: 1, maxWidth: '100%' }}>
        
        <Grid container spacing={12}>
            <Grid item xs={12} md={12}>
            <h6 className={classes.titleText}>
                ALL USERS
            </h6>
            
                <List className={classes.userList}>
                    {allUsers.map(user => (
                        <JourneyListItem 
                            key={user.user_id}
                            callbacks={setUsers}
                            user={user}
                        />
                    ))}
                </List>
            </Grid>
        </Grid>
        </Box>
    );
}
