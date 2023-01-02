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

    const navigate = useNavigate();
    const location = useLocation();
    const {from} = location.state
    const tableData = location.state.data;
    // console.log("table data in results" , tableData);

    let grams = tableData.co2e_gm
    let kilo = tableData.co2e_kg
    let tonnes = tableData.co2e_mt
    let distance= tableData.distance_value
    let units = tableData.distance_unit
    let origin = ' '
    let origin_name = ' '
    let vehicle = tableData.vehicle_type

    // tableData looks like
    // type:"estimate-vehicle-usage"
    // vehicle_type:"Bus-LocalAverage"
    // fuel_type:"Unknown"
    // distance_value:5
    // distance_unit:"km"
    // include_wtt:"Y"
    // co2e_gm:607.2
    // co2e_kg:0.61
    // co2e_mt:0
    // co2e_lb:1.34
    // success:true
    // status:200

    const handleShowButton = () => {
        setShowButton(true)
    }

    const saveJourney = (()=> {
        console.log('submitting journey information')
        // set state with journey as object to use in axios 
        setjourneySaved(false)
        axios.post('http://localhost:4000/journeys/addJourney', {
            userID: currentUser.user_id,
            nickname: nickname,
            g_CO2: grams,
            distance: distance,
            vehicle_type: vehicle,
        })
        .then(response=> {console.log("save success", response); 
            alert(`Saved ${nickname} to ${currentUser.username}'s profile.`)
            navigate('/profile')})
        .catch(error => {console.log(error)})
        .finally(setjourneySaved(true))
        })

        /// for formatting the axios post request
    //     let userID = req.body.userID
    // let nickname = req.body.nickname
    // let origin = req.body.origin
    // let origin_name = req.body.origin_name
    // let destination = req.body.destination
    // let destination_name = req.body.destination_name
    // let emissions = req.body.g_CO2
    // let distance = req.body.distance
    // let vehicle_type = req.body.vehicle_type

    return (
        <ErrorBoundary>
        <div className={classes.pageWrapper}>
            <Card sx={{ minWidth: 275 }} className={classes.card} style={{backgroundColor: "#fafbed"}}>
        <CardContent >
        <table className={classes.resultsTable}>
                <thead>
                <tr className={classes.tableHeadRow}>
                    <th>Distance</th>
                    <th>Distance Unit</th>
                    <th>Vehicle Type</th>
                    <th>g CO<sub>2e</sub></th>
                    <th>kg CO<sub>2e</sub></th>
                    <th>tonnes CO<sub>2e</sub></th>
                    <th>Global Average Annual tonnes CO<sub>2e</sub></th>
                    <th>Billionaire Average Annual tonnes CO<sub>2e</sub></th>
                </tr>
                </thead>
                <tbody>
                <tr className={classes.tableDataRow}>
                    <td>{distance}</td>
                    <td>{units}</td>
                    {vehicle === 'Car-Size-Average'? <td>Average Car</td>
                    : vehicle === 'Bus-LocalAverage' ? <td>Average Bus</td>
                    : vehicle === 'Train-National' ? <td>Average Train</td>
                    : <td>Average Airplane Flight</td>}
                    <td>{grams}</td>
                    <td>{kilo}</td>
                    <td>{tonnes}</td>
                    <td>2.76 *</td>
                    <td>3.1 million *</td>
                </tr>
                </tbody>
            </table>
            <p className={classes.noteText}>* source: Oxfam 2022, <a href="https://oxfamilibrary.openrepository.com/bitstream/handle/10546/621446/bn-carbon-billlionaires-071122-en.pdf?sequence=14">"Carbon Billionaires: The investment emissions of the worlds richest people"</a></p>

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
        </div>
        </ErrorBoundary>
    )
}
