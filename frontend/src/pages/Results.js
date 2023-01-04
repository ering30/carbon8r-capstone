import React, { useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Box } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { TextField } from '@material-ui/core';
import axios from 'axios'
import ErrorBoundary from '../components/ErrorBoundary';
import { journeySavedContext } from '../App';
import PopupDialog from '../components/PopupDialog';

const useStyles = makeStyles((theme) => ({
    pageWrapper: {
        width: '80%',
        margin: '0 auto',
        paddingTop: '15%',
        textAlign: 'center',
    },
    resultsTable:{
        color: '#357a38',
        width: '100%'
    },
    resultButton:{
        margin: '0 auto',
        background: '#357a38',
        color: '#FAFAFA'
    },
    noteText:{
        margin: '1%',
        color: '#357a38',
    },
    saveDiv: {
        padding: 2,
        textAlign: 'center',
        margin: '0 auto'
    }
}));

export default function Results(props) {
    const journeyContextPayload = useContext(journeySavedContext)
    const { journeySaved, setjourneySaved } = journeyContextPayload

    const currentUserString = localStorage.getItem('currentUser');
    const currentUser = JSON.parse(currentUserString);
    const classes= useStyles();

    const [showButton, setShowButton] = useState(false)
    const [nickname, setNickname] = useState('My Trip')

    const [showSaveDialog, setShowSaveDialog] = useState(false) // sets show/hide for save confirmation

    const navigate = useNavigate();
    const location = useLocation();
    const {from} = location.state
    const tableData = location.state.data;

    let grams = tableData.co2e_gm
    let kilo = tableData.co2e_kg
    let tonnes = tableData.co2e_mt
    let distance= tableData.distance_value
    let units = tableData.distance_unit
    let origin_name = location.state.origin
    let destination_name = location.state.destination
    let vehicle = location.state.vehicle

    const handleShowButton = () => {
        setShowButton(true)
    }

    const handleShowSaveDialog = () => {
        setjourneySaved(true)
        setShowSaveDialog(true)
    }

    const saveJourney = (()=> {
        console.log('submitting journey information')
        // set state with journey as object to use in axios 
        if (vehicle === 'airplane') {
            distance =0
        }
        setjourneySaved(false)
        axios.post('http://localhost:4000/journeys/addJourney', {
            userID: currentUser.user_id,
            nickname: nickname,
            g_CO2: grams,
            origin_name: origin_name,
            destination_name: destination_name,
            distance: distance,
            vehicle_type: vehicle,
        })
        .then(response=> {console.log("save success", response); })
        .catch(error => {console.log(error)})
        .finally(handleShowSaveDialog())
        })

        const DialogContentText = `Click OK to go to your profile.`
        const DialogTitleText = `Saved ${nickname} to ${currentUser.username}'s profile.`

    return (
        <ErrorBoundary>
        <>
            <Card sx={{ minWidth: 275 }} className={classes.card} style={{backgroundColor: "#fafbed"}}>
        <CardContent >
        <table className={classes.resultsTable}>
                <thead>
                <tr className={classes.tableHeadRow}>
                    <th>Origin</th>
                    <th>Destination</th>
                    {vehicle !== 'airplane' ? 
                    <>
                    <th>Distance</th>
                    <th>Distance Unit</th>
                    </>
                    : null }
                    <th>Vehicle Type</th>
                    <th>g CO<sub>2e</sub></th>
                    <th>kg CO<sub>2e</sub></th>
                    <th>tonnes CO<sub>2e</sub></th>
                </tr>
                </thead>
                <tbody>
                <tr className={classes.tableDataRow}>
                    <td>{origin_name}</td>
                    <td>{destination_name}</td>
                    {vehicle !== 'airplane' ? 
                    <>
                    <td>{distance}</td>
                    <td>{units}</td>
                    </> 
                    : null }
                    {vehicle === 'Car-Size-Average'? <td>Average Car</td>
                    : vehicle === 'Bus-LocalAverage' ? <td>Average Bus</td>
                    : vehicle === 'Train-National' ? <td>Average Train</td>
                    : <td>Average Airplane Flight</td>}
                    <td>{grams}</td>
                    <td>{kilo}</td>
                    <td>{tonnes}</td>
                </tr>
                </tbody>
            </table>
        </CardContent>
        <CardActions>
            <div className={classes.saveDiv}>
            <Button className={classes.resultButton} variant="contained" onClick={handleShowButton} 
                >
                save to profile
            </Button>
            </div>
            {showButton === true ? 
            <div className={classes.saveDiv}>
                Enter a name for your journey or click 'save'
                <TextField
                    autoFocus
                    className={classes.textInput}
                    variant="filled"
                    type="text"
                    name="journey-nickname"
                    placeholder='My Trip'
                    defaultValue='My Trip'
                    value={nickname}
                    onChange={e=>setNickname(e.target.value)}
                    color="primary"
                />
            <Button 
                disableRipple 
                className={classes.resultButton} 
                variant="contained" 
                onClick={saveJourney} 
                >
                Save
            </Button> 
            </div>
            : null }
        </CardActions>
        <CardActions>
        <Button className={classes.resultButton} variant="contained" onClick={()=> navigate(-1)}>Try Again</Button>
        </CardActions>
        <p className={classes.noteText}>
            Note: You will lose the current data.
            </p>
        </Card>
        <Box sx={{ bgcolor: 'none', height:'3rem' }} component="footer"></Box>
        </>
        {showSaveDialog === true ? 
            <PopupDialog 
                callbacks={{
                    handleOkAction: () => navigate('/profile'),
                }}
                // journeyID={journey.journey_id} //entity id
                DialogContentText={DialogContentText} 
                DialogTitleText={DialogTitleText}
            /> 
        : null}
        </ErrorBoundary>
    )
}
