import React, { useState, useEffect, useContext } from 'react'
import { Box, CardContent } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@mui/material/Card';
import { Button } from '@material-ui/core'
import axios from 'axios'
import JourneyList from '../components/JourneyList';
import { journeySavedContext } from '../App';

export const UserJourneysContext = React.createContext();

const useStyles = makeStyles((theme) => ({
    pageWrapper: {
        width: '80%',
        margin: '0 auto',
        paddingTop: '10%',
        textAlign: 'center',
        color: '#357a38',
        fontFamily: 'Unbounded',
    },
    heroText: {
        fontWeight: '200',
        fontSize: '3rem',
        fontFamily: 'Unbounded',
        color: '#357a38',
    },
    h3: {
        fontWeight: '200',
        fontSize: '2rem',
        fontFamily: 'Unbounded',
        color: '#357a38',
    },
    h4: {
        fontWeight: '200',
        fontSize: '1.5rem',
        fontFamily: 'Unbounded',
        color: '#357a38',
    },
    detailButton: {
        background: '#357a38',
        color: '#FAFAFA',
        width: '50%',
        height: '3rem'
    },
    mainCard: {
        backgroundColor: '#fafbed',
    }
}));


export default function Profile() {
    let navigate = useNavigate();
    const classes = useStyles();

    //get journeys context
    const [journeys, setJourneys] = useState([])
    const journeyContextPayload = useContext(journeySavedContext)
    const { journeySaved } = journeyContextPayload

    // get current user
    const currentUserString = localStorage.getItem('currentUser');
    const currentUser = JSON.parse(currentUserString);
    const id= currentUser.user_id
    
    //get the journeys
    useEffect(()=> {
        // check state here in dependency []
        axios.get(`http://localhost:4000/journeys/allUserJourneys/${id}`)
        .then(response=> {setJourneys(response.data);})
        .catch(error => {console.log(error)})
        },[journeySaved])

    return (
        <>
            <h1 className={classes.heroText}>PROFILE</h1>
            <h3 className={classes.h3}>Welcome, {currentUser.username}</h3>
            <Card elevation={4} className={classes.mainCard}
                sx={{
                    bgcolor: '#fafbed',
                    pt: 3,
                    pb: 3,
                    borderRadius: 3,
                    minWidth: 275,
                    maxWidth: '100%',
                    margin: '0 auto'
                }}>
                <CardContent >
                    {journeys.length !== 0 ? 
                    <>
                    <UserJourneysContext.Provider 
                        value={{journeys, setJourneys}}
                    >
                        <JourneyList />
                    </UserJourneysContext.Provider > 
                    </>
                : 
                <>
                <h3 className={classes.h3}>You haven't saved any journeys yet!</h3>
                <h4 className={classes.h4}>Go to the calculator to get started.</h4>
                <Button disableripple="true" className={classes.detailButton} variant="contained" onClick={() => navigate('/calculator')}>go to calculator</Button>
                </>
                }
                </CardContent>
            </Card>
            <Box sx={{ bgcolor: 'none', height:'3rem' }} component="footer"></Box>
        </>
    )
}

