import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Box } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { TextField } from '@material-ui/core';
import axios from 'axios'

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

    // tableData looks like this
    // type:"estimate-travel-flight"
    // iata_airport_from:"auk"
    // airport_from:"Alakanuk Airport"
    // iata_airport_to:"syd"
    // airport_to:"Sydney Kingsford Smith International Airport"
    // flight_class:"Average"
    // round_trip:"Y"
    // add_rf:"Y"
    // include_wtt:"Y"
    // number_of_passengers:"1"
    // co2e_gm:4661253
    // co2e_kg:4661.25
    // co2e_mt:4.66
    // co2e_lb:10276.19
    // success:true
    // status:200

export default function ResultsFlight(props) {
    const currentUserString = localStorage.getItem('currentUser');
    const currentUser = JSON.parse(currentUserString);

    const [showButton, setShowButton] = useState(false)
    const [nickname, setNickname] = useState('My Trip')

    const classes= useStyles();
    const navigate = useNavigate();

    const location = useLocation();
    const {from} = location.state
    const tableData = location.state.data;

    let grams = tableData.co2e_gm
    let kilo = tableData.co2e_kg
    let tonnes = tableData.co2e_mt
    let start= tableData.airport_from
    let flight_class = tableData.flight_class
    let destination = tableData.airport_to

    //show save journey form with nickname entry
    const handleShowButton = () => {
        setShowButton(true)
    }

    //save journey to database with user_id
    const saveJourney = (()=> {
        // set state with journey as object to use in axios 
        axios.post('http://localhost:4000/journeys/addJourney', {
            userID: currentUser.user_id,
            nickname: nickname,
            g_CO2: grams,
            origin_name: start,
            destination_name: destination,
            vehicle_type: 'airplane',
            distance: 0
        })
        .then(response=> {console.log("save success", response); 
            alert(`Saved ${nickname} to ${currentUser.username}'s profile.`)})
            .then(navigate('/profile'))
        .catch(error => {console.log(error)})
        })

        // when save journey loading false; loading boolean 

    return (
        <div className={classes.pageWrapper}>
            
            <Card sx={{ minWidth: 275 }} className={classes.card} style={{backgroundColor: "#fafbed"}}>
        <CardContent>
        <table className={classes.resultsTable}>
                <thead>
                <tr className={classes.tableHeadRow}>
                    <th>Start</th>
                    <th>Destination</th>
                    <th>Flight Class</th>
                    <th>g CO<sub>2e</sub></th>
                    <th>kg CO<sub>2e</sub></th>
                    <th>tonnes CO<sub>2e</sub></th>
                    <th>Global Average Annual tonnes CO<sub>2e</sub></th>
                    <th>Billionaire Average Annual tonnes CO<sub>2e</sub></th>
                </tr>
                </thead>
                <tbody>
                <tr className={classes.tableDataRow}>
                    <td>{start}</td>
                    <td>{destination}</td>
                    <td>{flight_class}</td>
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
                disableripple= "true"
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
    )
}
