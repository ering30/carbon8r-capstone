import React from 'react'
import Login from '../components/LoginForm'
import { Container, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    pageWrapper: {
        width: '80%',
        margin: '0 auto',
        paddingTop: '10%',
        textAlign: 'center'
    },
    titleInfo: {
        color: '#357a38',
        fontFamily: 'Unbounded',
        fontWeight: '300',
        fontSize: '1.5rem',
    },
}));

export default function LoginPage() {
    const classes = useStyles();
    return (
        <Container className={classes.pageWrapper} maxWidth="lg">
                    <h1 className={classes.titleInfo}>LOGIN OR REGISTER TO GET STARTED</h1>
                    <Login/>
                    <Box sx={{ bgcolor: 'none', height:'3rem' }} component="footer"></Box>
        </Container>
    )
}
