import React, { useState, useContext } from 'react'
import { Dialog, ListItem } from '@material-ui/core';
import ListItemAvatar from '@mui/material/ListItemAvatar';
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
// import Checkbox from '@mui/material/Checkbox';
import DirectionsIcon from '@mui/icons-material/Directions';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TrainIcon from '@mui/icons-material/Train';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import AlertDialog from './Dialog';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { UserJourneysContext } from '../pages/Profile';

//delete the journey from DB, in handleDelete inside Dialog 
const deleteJourney = ((contextPayload, journey, navigate)=> {
    const { journeys, setJourneys } = contextPayload
    const updatedJourneysArray = journeys.filter((jou) => jou.journey_id !== journey.journey_id)

    axios.delete(`http://localhost:4000/journeys/deleteOneJourney/${journey.journey_id}`)
    .then(navigate('/profile'))
    .catch(error => {console.log(error)})
    .finally(setJourneys(updatedJourneysArray))
    })


function JourneyListItem(props) {
    const navigate = useNavigate();
    const { journey } = props

    // get journey context
    const contextPayload = useContext(UserJourneysContext)
    const { journeys, setJourneys } = contextPayload // gets user journeys from profile useEffect

    // get current logged in user
    const currentUserString = localStorage.getItem('currentUser');
    const currentUser = JSON.parse(currentUserString);
    const userID= currentUser.user_id

    //set variables for functions
    let DialogTitleText = "Delete this journey?"
    let DialogContentText = "If you proceed, you will lose this information. You can add new journeys using the calculator."

    let kgEmissions = journey.g_CO2 / 1000

    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar sx={{ bgcolor: '#357a38' }}>
                    {journey.vehicle_type === 'airplane' ? <FlightTakeoffIcon /> :
                    journey.vehicle_type === 'Car-Size-Average' ? <DirectionsCarIcon /> :
                    journey.vehicle_type === 'Bus-LocalAverage' ? <DirectionsBusIcon /> :
                    journey.vehicle_type === 'Train-National' ? <TrainIcon /> :
                    <DirectionsIcon />}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={`${journey.nickname} : ${kgEmissions} kgCO2`} 
                secondary={
                    journey.vehicle_type !== 'airplane' && journey.origin !== 'undefined' ? `${journey.origin_name} to ${journey.destination_name}: ${journey.tot_distance}km` 
                    : journey.vehicle_type !== 'airplane' && journey.origin === 'undefined' ? `${journey.tot_distance}km`
                    : journey.vehicle_type === 'airplane' ? `${journey.origin_name} to ${journey.destination_name}`
                    : ' '}
            />
            <AlertDialog 
                callbacks={{
                    handleOkAction: () => deleteJourney(contextPayload, journey, navigate),
                }}
                // journeyID={journey.journey_id} //entity id
                DialogContentText={DialogContentText} 
                DialogTitleText={DialogTitleText}
            />

        </ListItem>
    )
}


export default JourneyListItem;