import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';

import { UserJourneysContext } from '../pages/Profile';
import JourneyListItem from './JourneyListItem';
import GetStartedButton from './GetStartedButton';

//-----styling
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    journeyList: {
        margin: '0 auto'
    },
    detailButton: {
        background: '#357a38',
        color: '#FAFAFA',
        width: '50%',
        height: '3rem'
    },
    journeyText: {
        color: '#357a38',
        fontFamily: 'Unbounded',
        fontWeight: '200',
        fontSize: '1.5rem',
        margin: 0
    },
    subscript: {
        verticalAlign: 'sub',
        color: '#357a38',
        fontFamily: 'Unbounded',
        fontWeight: '200',
        fontSize: '1rem',
        margin: 0
    },
    totalText: {
        color: '#357a38',
        fontFamily: 'Unbounded',
        fontWeight: '200',
        fontSize: '1rem',
        margin: 0
    },
    endText: {
        color: '#357a38',
        fontFamily: 'Unbounded',
        fontWeight: '200',
        fontSize: '0.8rem',
        margin: 0
    },
    endDiv: {
        marginTop: '1rem',
        marginBottom: '1rem',
    },
}));

export default function JourneyList() {
    const classes = useStyles();
    const navigate = useNavigate();

    // get journey context
    const contextPayload = useContext(UserJourneysContext)
    const { journeys, setJourneys } = contextPayload

    // ---- summing total emissions in tonnes CO2, to 3 decimal places
    function getSumEmissions(total, num) {
        return total + Math.round(num);
    }

    let emissionsArray = []

    for (let i=0; i<journeys.length; i++){
        emissionsArray.push(journeys[i].g_CO2)
    }
    let total = (emissionsArray.reduce(getSumEmissions,0)/1000000).toFixed(3)

    let percentage = (total/3100000)/100
    let roundedPercent= percentage.toFixed(12)

    /// ----------
    return (
    <Box sx={{ flexGrow: 1, maxWidth: '100%' }}>
        
        <Grid container spacing={12}>
            <Grid item xs={12} md={12}>
                <h6 className={classes.journeyText}>
                    YOUR SAVED JOURNEYS
                </h6>
                <h6 className={classes.totalText}>Your total travel emissions: </h6>
                <h6 className={classes.totalText}>{total} tonnes CO<span className={classes.subscript}>2</span>-e</h6>
                <List className={classes.journeyList}>
                    {journeys.map(journey => (
                        <JourneyListItem 
                            key={journey.journey_id}
                            callbacks={setJourneys}
                            journey={journey}
                        />
                    ))}
                </List>
                <div className={classes.endDiv}>
                    <h6 className={classes.endText}>psst -</h6>
                    <h6 className={classes.endText}>The average billionare's carbon footprint is 3.1 million tonnes CO<sub>2e</sub> per year.</h6>
                    <h6 className={classes.endText}>Your total is approximately {roundedPercent}&#37; of that.</h6>
                </div>
                <GetStartedButton buttonText={"learn more"} buttonFunc={() => {navigate('/info')}}/>
            </Grid>
        </Grid>
        </Box>
    );
}
