import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';

import { UsersContext } from '../App';
import UserListItem from './UsersListItem';

//-----styling
import { makeStyles } from '@material-ui/core/styles';

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

    // get users context
    const usersContextPayload = useContext(UsersContext)
    const { users, setUsers } = usersContextPayload
    console.log(users);

    /// ----------
    return (
    <Box sx={{ flexGrow: 1, maxWidth: '100%' }}>
        
        <Grid container spacing={12}>
            <Grid item xs={12} md={12}>
            <h6 className={classes.titleText}>
                ALL USERS
            </h6>
            
                <List className={classes.userList}>
                    {users.map(user => (
                        <UserListItem 
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
