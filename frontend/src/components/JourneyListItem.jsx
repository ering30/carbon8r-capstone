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
import PopupDialog from './PopupDialog';


function JourneyListItem(props) {
    const navigate = useNavigate();
    const [showDialog, setShowDialog] = useState(false)
    const { journey } = props

    // get journey context
    const contextPayload = useContext(UserJourneysContext)
    const { journeys, setJourneys } = contextPayload // gets user journeys from profile useEffect

    // get current logged in user
    const currentUserString = localStorage.getItem('currentUser');
    const currentUser = JSON.parse(currentUserString);
    const userID= currentUser.user_id

    //set variables for functions
    let kgEmissions = journey.g_CO2 / 1000

    //delete the journey from DB, in handleDelete inside Dialog 
    const deleteJourney = ((contextPayload, journey, navigate)=> {
    const { journeys, setJourneys } = contextPayload
    const updatedJourneysArray = journeys.filter((jou) => jou.journey_id !== journey.journey_id)

    axios.delete(`http://localhost:4000/journeys/deleteOneJourney/${journey.journey_id}`)
    .then(
        setShowDialog(true))
    .catch(error => {console.log(error)})
    .finally(setJourneys(updatedJourneysArray))
    })

    // navigate('/profile')

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
                    journey.vehicle_type !== 'airplane' ? `${journey.origin_name} to ${journey.destination_name}: ${journey.tot_distance}km` 
                    : journey.vehicle_type === 'airplane' ? `${journey.origin_name} to ${journey.destination_name}`
                    : ' '}
            />
            <AlertDialog 
                callbacks={{
                    handleOkAction: () => deleteJourney(contextPayload, journey, navigate),
                }}
                DialogContentText={"If you proceed, you will lose this information. You can add new journeys using the calculator."} 
                DialogTitleText={"Delete this journey?"}
            />
            { showDialog === true ? 
            <PopupDialog 
                callbacks={{
                    handleOkAction: () => navigate('/profile'),
                }}
                DialogContentText={"Click OK to return to your profile."} 
                DialogTitleText={"Delete successful"}
            />
            : null}

        </ListItem>
    )
}


export default JourneyListItem;