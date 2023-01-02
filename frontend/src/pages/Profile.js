import React, { useState, useEffect, useContext } from 'react'
import { Container, Box, CardContent } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@mui/material/Card';
import { Button } from '@material-ui/core'
import axios from 'axios'
import JourneyList from '../components/JourneyList';
import { journeySavedContext } from '../App';
// import { useParams } from 'react-router-dom';

export const UserJourneysContext = React.createContext();

const useStyles = makeStyles((theme) => ({
    pageWrapper: {
        width: '80%',
        margin: '0 auto',
        paddingTop: '5%',
        textAlign: 'center',
        color: '#357a38',
        fontFamily: 'Unbounded',
    },
    heroText: {
        fontWeight: '200',
        fontSize: '3rem',
    },
    h3: {
        fontWeight: '200',
        fontSize: '2rem',
    },
    h4: {
        fontWeight: '200',
        fontSize: '1.5rem',
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
    // const params = useParams();
    // const [showForm, setShowForm] = useState(false)
    const [journeys, setJourneys] = useState([])
    const journeyContextPayload = useContext(journeySavedContext)
    const { journeySaved } = journeyContextPayload

    const currentUserString = localStorage.getItem('currentUser');
    const currentUser = JSON.parse(currentUserString);
    const id= currentUser.user_id
    

    //get the journeys
    useEffect(()=> {
        // console.log(currentUser.user_id, "current user id before axios") //correct
        // console.log('Fetching user journeys')
        // check state here in dependency []
        axios.get(`http://localhost:4000/journeys/allUserJourneys/${id}`)
        .then(response=> {setJourneys(response.data);})
        .catch(error => {console.log(error)})
        },[journeySaved])

    return (
        <Container className={classes.pageWrapper} maxWidth="lg">
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
                {/* <CardContent >
                    <h4>SETTINGS</h4>
                    <Button variant="contained" onClick={() => setShowForm(true)}>Update Password</Button>
                    password update form ---- to be conditionally rendered using button
                </CardContent> */}
                <CardContent >
                    {journeys.length !== 0 ? <UserJourneysContext.Provider value={{journeys, setJourneys}}>
                    <JourneyList />
                </UserJourneysContext.Provider > : 
                <>
                <h3 className={classes.h3}>You haven't saved any journeys yet!</h3>
                <h4 className={classes.h4}>Go to the calculator to get started.</h4>
                <Button disableripple="true" className={classes.detailButton} variant="contained" onClick={() => navigate('/calculator')}>go to calculator</Button>
                </>
                }
                </CardContent>
            </Card>
            <Box sx={{ bgcolor: 'none', height:'3rem' }} component="footer"></Box>
        </Container>
    )
}

