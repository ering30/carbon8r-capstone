import React, { useEffect, useContext, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Container, Box } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import Card from '@mui/material/Card';
import axios from 'axios'
import UsersList from '../components/UsersList';

import { UsersContext } from '../App';
export const AllUsersContext = React.createContext();

const useStyles = makeStyles((theme) => ({
    pageWrapper: {
        width: '80%',
        margin: '0 auto',
        paddingTop: '10%',
        textAlign: 'center'
    },
    heroText: {
        color: '#357a38',
        fontFamily: 'Unbounded',
        fontWeight: '200'
    },
}));

export default function Admin() {
    const classes = useStyles();
    const {users, setUsers} = useContext(UsersContext)
    console.log("users from userContext", users);

    //get & set the users
    useEffect(()=> {
        // check state here in dependency []
        axios.get(`http://localhost:4000/users/all`)
        .then(response=> {setUsers(response.data); console.log("users", response.data)})
        .catch(error => {console.log(error)})
    },[UsersContext])


    return (
    <Container className={classes.pageWrapper} maxWidth="lg">
            <h1 className={classes.heroText}>ADMIN UTILITIES</h1>
                <Card elevation={4} 
                sx={{
                    bgcolor: '#fafbed',
                    pt: 3,
                    pb: 3,
                    borderRadius: 3,
                    minWidth: 275,
                    maxWidth: '100%',
                    margin: '0 auto'
                }}
                >
                <CardContent >
                <UsersList />    
                </CardContent>
                </Card>
        <Box sx={{ bgcolor: 'none', height:'3rem' }} component="footer"></Box>
    </Container>
    )
}
