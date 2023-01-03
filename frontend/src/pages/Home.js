import React from 'react'


// import ErrorBoundary from '../components/ErrorBoundary';

import { makeStyles } from '@material-ui/core/styles';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Container, Box } from '@material-ui/core';
import GetStartedButton from '../components/GetStartedButton';
import { useNavigate } from 'react-router-dom';

// import Login from '../components/LoginForm';

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
        fontWeight: '200',
        fontSize: '3rem',
    },
}));



// const buttonFuncLogin = () => {
//     navigate('/login')
// }

// const buttonFuncProfile = () => {
//     navigate('/profile')
// }

export default function Home() {
    let navigate = useNavigate();
    const classes = useStyles();
    const currentUserString = localStorage.getItem('currentUser');
    const currentUser = JSON.parse(currentUserString);


    return (
        <Container className={classes.pageWrapper} maxWidth="lg">
                    <h1 className={classes.heroText} >TRAVEL CARBON EMISSIONS CALCULATOR</h1>
                    {currentUser ? <GetStartedButton buttonText={"go to profile"} buttonFunc={() => {navigate('/profile')}} className={classes.GetStartedButton}/>
                    : <GetStartedButton buttonText={"LOGIN / CREATE ACCOUNT"} buttonFunc={() => {navigate('/login')}} className={classes.GetStartedButton}/>}
                    <Box sx={{ bgcolor: 'none', height:'3rem' }} component="footer"></Box>
        </Container>
        )
}