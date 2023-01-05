import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import GetStartedButton from '../components/GetStartedButton';
import { useNavigate } from 'react-router-dom';

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
        fontSize: '2rem',
    },
}));


export default function Home() {
    let navigate = useNavigate();
    const classes = useStyles();
    const currentUserString = localStorage.getItem('currentUser');
    const currentUser = JSON.parse(currentUserString);


    return (
        <>
                    <h1 className={classes.heroText} >TRAVEL CARBON EMISSIONS CALCULATOR</h1>
                    {currentUser ? <GetStartedButton buttonText={"go to profile"} buttonFunc={() => {navigate('/profile')}} className={classes.GetStartedButton}/>
                    : <GetStartedButton buttonText={"LOGIN / CREATE ACCOUNT"} buttonFunc={() => {navigate('/login')}} className={classes.GetStartedButton}/>}
                    <Box sx={{ bgcolor: 'none', height:'3rem' }} component="footer"></Box>
        </>
        )
}