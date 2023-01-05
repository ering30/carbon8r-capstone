import React, { useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import { Button, Box } from '@material-ui/core';
import List from '@mui/material/List';
import { ListItem } from '@material-ui/core';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import axios from 'axios'
import ErrorBoundary from '../components/ErrorBoundary';
import { journeySavedContext } from '../App';
import PopupDialog from '../components/PopupDialog';
import { Stack } from '@mui/system';
import { TextField } from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
        main: '#357a38'
        }
    },
});

const useStyles = makeStyles((theme) => ({
    herotext: {
        color: '#357a38',
        fontFamily: 'Unbounded',
        fontWeight: '200',
        fontSize: '2rem',
        textAlign: 'center',
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
    },
    textInput: {
        padding: '2%'
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
        <ThemeProvider theme={theme}>
        <ErrorBoundary>
        <>
            <h2 className={classes.herotext}>RESULTS</h2>
            <Card sx={{ maxWidth: '80%', margin: '0 auto'}} className={classes.card} style={{backgroundColor: "#fafbed"}}>
                <CardContent >
                    <List>
                        <ListItem>
                            <ListItemText
                                primary="Origin" 
                                secondary={origin_name}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Destination" 
                                secondary={destination_name}
                            />
                        </ListItem>
                        {vehicle !== 'airplane' ? 
                        <ListItem>
                            <ListItemText
                                primary="Distance" 
                                secondary={`${distance}km`}
                            />
                        </ListItem>
                        : null }
                        <ListItem>
                            <ListItemText
                                primary="Vehicle Type" 
                                secondary={vehicle === 'Car-Size-Average'? "Average Car"
                                : vehicle === 'Bus-LocalAverage' ? "Average Bus"
                                : vehicle === 'Train-National' ? "Average Train"
                                : "Average Airplane Flight"}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Emissions: grams CO2-e" 
                                secondary={grams}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Emissions: Kilograms CO2-e" 
                                secondary={kilo}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Emissions: Tonnes CO2-e" 
                                secondary={tonnes}
                            />
                        </ListItem>
                    </List>
                </CardContent>
                <CardActions>
                    <Button className={classes.resultButton} variant="contained" onClick={handleShowButton} 
                    >
                        save to profile
                    </Button>
                </CardActions>
                        {showButton === true ? 
                        <CardActions >
                        <Stack className={classes.saveDiv}>
                        <TextField
                            autoFocus
                            className={classes.textInput}
                            variant="filled"
                            type="text"
                            name="journey-nickname"
                            placeholder='My Trip'
                            defaultValue='My Trip'
                            helperText="Enter a name for your journey or click 'Save'"
                            value={nickname}
                            onChange={e=>setNickname(e.target.value)}
                        />
                        <Button 
                            disableRipple 
                            className={classes.resultButton} 
                            variant="contained" 
                            onClick={saveJourney} 
                            >
                            Save
                        </Button> 
                        </Stack>
                        </CardActions>
                    : null }
                <CardActions>
                    <Button className={classes.resultButton} variant="contained" onClick={()=> navigate(-1)}>Try Again</Button>
                </CardActions>
                <p className={classes.noteText}>
                    Note: You will lose the current data.
                </p>
            </Card>
            <Box sx={{ bgcolor: 'none', height:'3rem' }} 
            component="footer">
            </Box>
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
        </ThemeProvider>
    )
}
