import React, { useEffect, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Container, Box } from '@material-ui/core';
import axios from 'axios'


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
    return (
    <Container className={classes.pageWrapper} maxWidth="lg">
        <h1 className={classes.heroText} >ALL USERS</h1>
        {/* user list here */}
        <Box sx={{ bgcolor: 'none', height:'3rem' }} component="footer"></Box>
    </Container>
    )
}
